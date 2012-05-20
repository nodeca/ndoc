ROOT        := $(shell pwd)
PATH        := ${ROOT}/node_modules/.bin:${PATH}

NPM_PACKAGE := $(shell node -e 'console.log(require("./package.json").name)')
NPM_VERSION := $(shell node -e 'console.log(require("./package.json").version)')

TMP_PATH    := /tmp/${NPM_PACKAGE}-$(shell date +%s)

REMOTE_NAME ?= origin
REMOTE_REPO ?= $(shell git config --get remote.${REMOTE_NAME}.url)

CURR_HEAD   := $(firstword $(shell git show-ref --hash HEAD | cut --bytes=-6) master)
GITHUB_PROJ := nodeca/${NPM_PACKAGE}
SRC_URL_FMT := https://github.com/${GITHUB_PROJ}/blob/${CURR_HEAD}/{file}\#L{line}


help:
	echo "make help       - Print this help"
	echo "make lint       - Lint sources with JSHint"
	echo "make test       - Lint sources and run all tests"
	echo "make doc        - Build API docs"
	echo "make dev-deps   - Install developer dependencies"
	echo "make gh-pages   - Build and push API docs into gh-pages branch"
	echo "make publish    - Set new version tag and publish npm package"
	echo "make todo       - Find and list all TODOs"


lint:
	if test ! `which jshint` ; then \
		echo "You need 'jshint' installed in order to run lint." >&2 ; \
		echo "  $ make dev-deps" >&2 ; \
		exit 128 ; \
		fi
	jshint . --show-non-errors


dev-deps:
	@if test ! `which npm` ; then \
		echo "You need 'npm' installed." >&2 ; \
		echo "  See: http://npmjs.org/" >&2 ; \
		exit 128 ; \
		fi
	npm install jshint -g
	npm install --dev


publish:
	@if test 0 -ne `git status --porcelain | wc -l` ; then \
		echo "Unclean working tree. Commit or stash changes first." >&2 ; \
		exit 128 ; \
		fi
	@if test 0 -ne `git tag -l ${NPM_VERSION} | wc -l` ; then \
		echo "Tag ${NPM_VERSION} exists. Update package.json" >&2 ; \
		exit 128 ; \
		fi
	git tag ${NPM_VERSION} && git push origin ${NPM_VERSION}
	npm publish https://github.com/${GITHUB_PROJ}/tarball/${NPM_VERSION}


lib/ndoc/parsers/javascript.js:
	@if test ! `which jison` ; then \
		echo "You need 'jison' installed in order to compile parsers." >&2 ; \
		echo "  $ make dev-deps" >&2 ; \
		exit 128 ; \
		fi
	jison src/js-parser.y && mv js-parser.js lib/ndoc/parsers/javascript.js


compile-parsers:
	mkdir -p lib/ndoc/parsers/
	rm -f lib/ndoc/parsers/javascript.js
	$(MAKE) lib/ndoc/parsers/javascript.js


todo:
	grep 'TODO' -n -r ./lib 2>/dev/null || test true


.PHONY: publish lint test doc dev-deps gh-pages todo playground redo $(DOCS)
.SILENT: help lint test doc todo


DIRS         = $(addprefix playground/,$(shell ls playground 2>/dev/null | sed '/index.html/d'))
LIBS         = $(addsuffix /lib,$(DIRS))
DOCS         = $(addsuffix /doc,$(DIRS))


playground: $(DOCS)
	echo Indexing
	echo $(DOCS) | sed -r 's~playground/(\S+)/doc~<li><a href="\1/doc/index.html">\1</a></li>~g' | sed 'i<html><body><ul>' | sed 'a</ul></body></html>' >$@/index.html
	echo Open playground/index.html

doc: doc/index.html
doc/index.html: lib
	rm -fr $(@D)
	bin/ndoc.js $^

skin:
	# rebuild stylesheets
	node_modules/.bin/stylus -o $(ROOT)/skins/default/skeleton/stylesheets/ $(ROOT)/skins/default/templates/styles/main.styl

test-prototype:
	rm -fr ./tests/prototype-doc
	$(ROOT)/bin/ndoc.js -o ./tests/prototype-doc -b show -i README.markdown \
		-l 'https://github.com/sstephenson/prototype/blob/master/{file}#L{line}' \
		-t "Prototype v1.7" \
		./tests/prototype/src

test-features:
	#rm -f lib/parser.js
	rm -fr ./tests/features-doc
	$(ROOT)/bin/ndoc.js -o ./tests/features-doc -b show -t "NDoc new features" \
		./tests/features

test: lint test-prototype test-features

$(DOCS): $(LIBS)
	echo Compiling documentation for $(@D)
	#rm -f lib/parser.js
	rm -rf $@
	cd $(@D) && $(ROOT)/bin/ndoc.js -o doc -i README.md --package-json=package.json lib

proto-pages:
	@if test -z ${REMOTE_REPO} ; then \
		echo 'Remote repo URL not found' >&2 ; \
		exit 128 ; \
		fi
	mkdir ${TMP_DIR}
	touch ${TMP_DIR}/.nojekyll
	mkdir -p ${TMP_DIR}/tests/doc \
		&& cp -r tests/prototype-doc/* ${TMP_DIR}/tests/doc
	cd ${TMP_DIR} && \
		git init && \
		git add . && \
		git commit -q -m 'Recreated docs'
	cd ${TMP_DIR} && \
		git remote add remote ${REMOTE_REPO} && \
		git push --force remote +master:gh-pages 
	rm -rf ${TMP_DIR}
	@echo
	@echo 'URL: http://nodeca.github.com/ndoc/tests/doc/'

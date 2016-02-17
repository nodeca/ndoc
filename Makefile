ROOT        := $(shell pwd)

PATH        := ${ROOT}/node_modules/.bin:${PATH}

NPM_PACKAGE := $(shell node -e 'process.stdout.write(require("./package.json").name)')
NPM_VERSION := $(shell node -e 'process.stdout.write(require("./package.json").version)')

TMP_PATH    := /tmp/${NPM_PACKAGE}-$(shell date +%s)

REMOTE_NAME ?= origin
REMOTE_REPO ?= $(shell git config --get remote.${REMOTE_NAME}.url)

CURR_HEAD   := $(firstword $(shell git show-ref --hash HEAD | cut -b -6) master)
GITHUB_PROJ := nodeca/${NPM_PACKAGE}


help:
	echo "make help       - Print this help"
	echo "make lint       - Lint sources with JSHint"
	echo "make test       - Lint sources and run all tests"
	echo "make doc        - Build API docs"
	echo "make gh-pages   - Build and push API docs into gh-pages branch"
	echo "make publish    - Set new version tag and publish npm package"
	echo "make todo       - Find and list all TODOs"


lint:
	./node_modules/.bin/eslint .


publish:
	@if test 0 -ne `git status --porcelain | wc -l` ; then \
		echo "Unclean working tree. Commit or stash changes first." >&2 ; \
		exit 128 ; \
		fi
	@if test 0 -ne `git fetch ; git status | grep '^# Your branch' | wc -l` ; then \
		echo "Local/Remote history differs. Please push/pull changes." >&2 ; \
		exit 128 ; \
		fi
	@if test 0 -ne `git tag -l ${NPM_VERSION} | wc -l` ; then \
		echo "Tag ${NPM_VERSION} exists. Update package.json" >&2 ; \
		exit 128 ; \
		fi
	git tag ${NPM_VERSION} && git push origin ${NPM_VERSION}
	npm publish https://github.com/${GITHUB_PROJ}/tarball/${NPM_VERSION}


parser:
	rm -f lib/ndoc/plugins/parsers/javascript/parser.js
	./node_modules/.bin/pegjs --track-line-and-column src/js-parser.peg lib/ndoc/plugins/parsers/javascript/parser.js


todo:
	grep 'TODO' -n -r ./lib 2>/dev/null || test true


.PHONY: publish lint test doc gh-pages todo playground redo $(DOCS)
.SILENT: help lint test doc todo


DIRS = $(addprefix playground/,$(shell ls playground 2>/dev/null | sed '/index.html/d'))
LIBS = $(addsuffix /lib,$(DIRS))
DOCS = $(addsuffix /doc,$(DIRS))


playground: $(DOCS)
	echo Indexing
	echo $(DOCS) | sed -r 's~playground/(\S+)/doc~<li><a href="\1/doc/index.html">\1</a></li>~g' | sed 'i<html><body><ul>' | sed 'a</ul></body></html>' >$@/index.html
	echo Open playground/index.html

doc: lib
	rm -fr doc
	$(ROOT)/bin/ndoc.js --link-format "https://github.com/{package.repository}/blob/${CURR_HEAD}/{file}#L{line}"

test-prototype:
	rm -fr ./tests/prototype-doc
	$(ROOT)/bin/ndoc.js --noenv -o ./tests/prototype-doc --broken-links show \
		--index ./tests/prototype/README.markdown \
		--link-format 'https://github.com/sstephenson/prototype/blob/1.7/{file}#L{line}' \
		--title "Prototype v1.7" \
		./tests/prototype/src

test-features:
	rm -fr ./tests/features-doc
	$(ROOT)/bin/ndoc.js --noenv -o ./tests/features-doc --broken-links show -t "NDoc new features" \
		--gh-ribbon 'https://github.com/{package.repository}' ./tests/features

test: lint test-prototype test-features

$(DOCS): $(LIBS)
	echo Compiling documentation for $(@D)
	#rm -f lib/parser.js
	rm -rf $@
	cd $(@D) && $(ROOT)/bin/ndoc.js -o doc -i README.md --package ./package.json lib

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


gh-pages:
	@if test -z ${REMOTE_REPO} ; then \
		echo 'Remote repo URL not found' >&2 ; \
		exit 128 ; \
		fi
	$(MAKE) doc && \
		cp -r ./doc ${TMP_PATH} && \
		touch ${TMP_PATH}/.nojekyll
	#
	# Building test docs
	#
	$(MAKE) test-prototype test-features
	mkdir ${TMP_PATH}/tests
	cp -r tests/prototype-doc ${TMP_PATH}/tests/prototype
	cp -r tests/features-doc ${TMP_PATH}/tests/features
	#
	# Push changes
	#
	cd ${TMP_PATH} && \
		git init && \
		git add . && \
		git commit -q -m 'Recreated docs'
	cd ${TMP_PATH} && \
		git remote add remote ${REMOTE_REPO} && \
		git push --force remote +master:gh-pages 
	rm -rf ${TMP_PATH}
	@echo
	@echo 'gh-pages updated...'
	@echo 'Main URL:      http://nodeca.github.com/ndoc'
	@echo 'Prototype URL: http://nodeca.github.com/ndoc/tests/prototype'
	@echo 'Features URL:  http://nodeca.github.com/ndoc/tests/features'


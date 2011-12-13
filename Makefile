ROOT = $(shell pwd)

PATH := $(ROOT)/node_modules/.bin:$(PATH)

DIRS = $(addprefix playground/,$(shell ls playground | sed '/index.html/d'))
LIBS = $(addsuffix /lib,$(DIRS))
DOCS = $(addsuffix /doc,$(DIRS))

lint:
	@if test ! `which jslint` ; then \
		echo "You need 'jslint' installed in order to run lint." >&2 ; \
		echo "  $ make dev-deps" >&2 ; \
		exit 128 ; \
		fi
	# (node)    -> Node.JS compatibility mode
	# (indent)  -> indentation level (2 spaces)
	# (nomen)   -> tolerate underscores in identifiers (e.g. `var _val = 1`)
	node_modules/.bin/jslint --node --nomen --regexp --indent=2 ./lib/index.js ./lib/util.js ./bin/ndoc

playground: $(DOCS)
	echo Indexing
	echo $(DOCS) | sed -r 's~playground/(\S+)/doc~<li><a href="\1/doc/index.html">\1</a></li>~g' | sed 'i<html><body><ul>' | sed 'a</ul></body></html>' >$@/index.html
	echo Open playground/index.html

doc: doc/index.html
doc/index.html: lib
	rm -fr $(@D)
	bin/ndoc $^

skin:
	# rebuild stylesheets
	node_modules/.bin/stylus -o $(ROOT)/skins/default/skeleton/stylesheets/ $(ROOT)/skins/default/templates/styles/main.styl

test-prototype:
	rm -fr ./tests/prototype-doc
	$(ROOT)/bin/ndoc -o ./tests/prototype-doc -b show -i README.markdown \
		-l 'https://github.com/sstephenson/prototype/blob/master/{file}#L{line}' \
		-t "Prototype v1.7" \
		./tests/prototype/src

test-features:
	rm -fr ./tests/features-doc
	$(ROOT)/bin/ndoc -o ./tests/features-doc -b show -t "NDoc new features" \
		./tests/features

test: test-prototype test-features

$(DOCS): $(LIBS)
	echo Compiling documentation for $(@D)
	#rm lib/parser.js
	rm -rf $@
	cd $(@D) && $(ROOT)/bin/ndoc -o doc -i README.md --package-json=package.json lib

PROJECT =  $(notdir ${PWD})
TMP_DIR = /tmp/${PROJECT}-$(shell date +%s)

REMOTE_NAME ?= origin
REMOTE_REPO ?= $(shell git config --get remote.${REMOTE_NAME}.url)

proto-pages:
	@if test -z ${REMOTE_REPO} ; then \
		echo 'Remote repo URL not found' >&2 ; \
		exit 128 ; \
		fi
	mkdir ${TMP_DIR}
	touch ${TMP_DIR}/.nojekyll
	mkdir -p ${TMP_DIR}/tests/doc \
		&& cp -r tests/doc/* ${TMP_DIR}/tests/doc
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

.SILENT:
.PHONY: playground redo doc $(DOCS)

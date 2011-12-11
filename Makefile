PATH        := ./node_modules/.bin:${PATH}

ROOT = $(shell pwd)

DIRS = $(addprefix playground/,$(shell ls playground | sed '/index.html/d'))
LIBS = $(addsuffix /lib,$(DIRS))
DOCS = $(addsuffix /doc,$(DIRS))

lint:
	@if test ! `which jslint` ; then \
		echo "You need 'jslint' installed in order to generate docs." >&2 ; \
		echo "  $ make dev-deps" >&2 ; \
		exit 128 ; \
		fi
	# (node)    -> Node.JS compatibility mode
	# (indent)  -> indentation level (2 spaces)
	# (nomen)   -> tolerate underscores in identifiers (e.g. `var _val = 1`)
	jslint --node --nomen --indent=2 ./lib/index.js ./lib/util.js ./bin/ndoc

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

prototest:
	# make bundled prototype doc
	rm -fr ./tests/doc
	cd tests/prototype && $(ROOT)/bin/ndoc -o ../doc -b show -i README.markdown -l 'https://github.com/sstephenson/prototype/blob/master/{file}#L{line}' -t "Prototype v1.7" src
#	bin/ndoc -o ./tests/doc ./tests

$(DOCS): $(LIBS)
	echo Compiling documentation for $(@D)
	#rm lib/parser.js
	rm -fr $@
	cd $(@D) && $(ROOT)/bin/ndoc -o doc -i README.md --package-json=package.json lib
	#mkdir -p $@ && cd $(@D) && $(ROOT)/bin/ndoc -o doc/tree.json -f json -i README.md -l '{url}/{file}#L{line}' --package-json=package.json lib
	#mkdir -p $@ && cd $(@D) && $(ROOT)/bin/ndoc -o doc/tree.js -f js -i README.md -l '{url}/{file}#L{line}' --package-json=package.json lib

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

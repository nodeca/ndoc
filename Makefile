ROOT = $(shell pwd)

DIRS = $(addprefix playground/,$(shell ls playground | sed '/index.html/d'))
LIBS = $(addsuffix /lib,$(DIRS))
DOCS = $(addsuffix /doc,$(DIRS))

playground: $(DOCS)
	echo Indexing
	echo $(DOCS) | sed -r 's~playground/(\S+)/doc~<li><a href="\1/doc/index.html">\1</a></li>~g' | sed 'i<html><body><ul>' | sed 'a</ul></body></html>' >$@/index.html
	echo Open playground/index.html

skin:
	# rebuild stylesheets
	node_modules/.bin/stylus -l -o $(ROOT)/skins/default/skeleton/stylesheets/ $(ROOT)/skins/default/templates/styles/main.styl

prototest:
	# make bundled prototype doc
	rm -fr ./tests/doc
	.bin/ndoc -o ./tests/doc ./tests

$(DOCS): $(LIBS)
	echo Compiling documentation for $(@D)
	rm -fr $@
	cd $(@D) && $(ROOT)/.bin/ndoc -o doc -i README.md -l '{url}/{file}#L{line}' --package-json=package.json lib
	#mkdir -p $@ && cd $(@D) && $(ROOT)/.bin/ndoc -o doc/tree.json -f json -i README.md -l '{url}/{file}#L{line}' --package-json=package.json lib
	#mkdir -p $@ && cd $(@D) && $(ROOT)/.bin/ndoc -o doc/tree.js -f js -i README.md -l '{url}/{file}#L{line}' --package-json=package.json lib

.SILENT:
.PHONY: playground redo $(DOCS)

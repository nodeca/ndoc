ROOT = $(shell pwd)

DIRS = $(addprefix playground/,$(shell ls playground | sed '/index.html/d'))
LIBS = $(addsuffix /lib,$(DIRS))
DOCS = $(addsuffix /doc,$(DIRS))

playground: redo $(DOCS)
	echo Indexing
	echo $(DOCS) | sed -r 's~playground/(\S+)/doc~<li><a href="\1/doc/index.html">\1</a></li>~g' | sed 'i<html><body><ul>' | sed 'a</ul></body></html>' >$@/index.html
	echo Open playground/index.html

redo:
	# force rebuild parser
	rm -fr lib/parser.js
	# rebuild stylesheets
	#echo "require('stylus')(require('fs').readFileSync('$(ROOT)/skins/html5/templates/styles/api1.styl','utf8')).render({filename: 'bundle.css'}, function(err, css){err && console.error(err) || console.log(css)})" | node >$(ROOT)/skins/html5/skeleton/stylesheets/bundle.css
	#echo "require('stylus')(require('fs').readFileSync('$(ROOT)/skins/html5/templates/styles/api1.styl','utf8')).set('filename', 'bundle.css').render(function(err, css){err && console.error(err) || console.log(css)})" | node >$(ROOT)/skins/html5/skeleton/stylesheets/bundle.css

$(DOCS): $(LIBS)
	echo Compiling documentation for $(@D)
	rm -fr $@
	#$(ROOT)/bin/ndoc -o $@ -i $(@D)/README.md -l '{url}/../../../../{file}#L{line}' --package-json=$(@D)/package.json --skin=$(ROOT)/skins/html5 $(@D)/lib
	cd $(@D) && $(ROOT)/bin/ndoc -o doc -i README.md -l '{url}/{file}#L{line}' --package-json=package.json --skin=$(ROOT)/skins/html5 lib

.SILENT:
.PHONY: playground redo $(DOCS)

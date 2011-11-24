ROOT = $(shell pwd)

DIRS = $(addprefix playground/,$(shell ls playground | sed '/index.html/d'))
LIBS = $(addsuffix /lib,$(DIRS))
DOCS = $(addsuffix /doc,$(DIRS))

playground: $(DOCS)
	echo Indexing
	echo $(DOCS) | sed -r 's~playground/(\S+)/doc~<li><a href="\1/doc/index.html">\1</a></li>~g' | sed 'i<html><body><ul>' | sed 'a</ul></body></html>' >$@/index.html
	echo Open playground/index.html

$(DOCS): $(LIBS)
	echo Compiling documentation for $(@D)
	rm -fr $@
	$(ROOT)/bin/ndoc -o $@ -i $(@D)/README.md -l '../../../{file}' --skin=$(ROOT)/skins/html5 $(@D)/lib

.SILENT:
.PHONY: playground $(DOCS)

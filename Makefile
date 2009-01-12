
all: minify-info minify-keys


minify-info: org-info.js
	java -jar ~/bin/yuicompressor-2.4.2.jar org-info.js > org-info-minified.js

minify-info: org-keys.js
	java -jar ~/bin/yuicompressor-2.4.2.jar org-keys.js > org-keys-minified.js
update:
	hugo -d ../gopasspw.github.io/
	cd ../gopasspw.github.io/ && git add . && git commit -am'Update website' && git push origin master

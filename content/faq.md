+++
date = "2017-02-01T17:39:42+01:00"
title = "faq"

+++

# FAQ

## error: gpg failed to sign the data

On macOS upgrading gnupg can lead to Git commit signing [breaking](https://nathanielhoag.com/blog/2016/09/05/signing-commits-in-git/).

Be sure to have `pinentry-mac` installed, set gpg.program to gpg2 and add the `no-tty` option
to your gpg.conf.

```
brew install pinentry-mac
git config --global gpg.program $(which gpg2)
echo "no-tty" >>~/.gnupg/gpg.conf
```

## What's up with the cute gopher?

Our [gopher](https://blog.golang.org/gopher) was made by [Vincent Leinweber](http://vincentleinweber.net/) while the original gopher is created by [Renee French](http://reneefrench.blogspot.com).  
And our gopher is tilting around when you hover over it thanks to [tilt.js](http://gijsroge.github.io/tilt.js/)!
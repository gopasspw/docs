# gopass website

**This document contains the static website sources for gopass and instructions for contributors on how to create new releases**.

## Releasing gopass

### Overview

* Preparation (install goreleaser, clone repos)
* Update CHANGELOG.md/VERSION
* Commit/Tag - DO NOT PUSH YET
* Test build (`goreleaser --skip-publish`)
* Push git changes
* Final build (`goreleaser`)
* Update and deploy website

### Preparation (only once)

```bash
# Install our modified version of goreleaser
go get -u github.com/goreleaser/goreleaser
cd $GOPATH/src/github.com/goreleaser/goreleaser
git remote add gopass git@github.com:gopasspw/goreleaser.git
git fetch gopass
git checkout gopass
git pull gopass gopass
go install
```

### Releasing a major/minor release (i.e. increasing X or Y in X.Y.Z)

This is the regular release process.
We develop new feature and fixes in feature branches (usually called `feature/some-fancy-feature`
for features or `fix/issue-XYZ` where XYZ matches the number of an existing issue)
IN YOUR OWN FORK OF THE REPO. Please DO NOT push any branches to the main gopass
repo except `release-X.Y` branches.

```bash
cd $GOPATH/src/github.com/gopasspw/gopass
# update the CHANGELOG.md
echo v1.X.Y > VERSION
git tag -s v1.X.Y
make completion
goreleaser --skip-publish
git push origin v1.X.Y
GITHUB_TOKEN=XXX goreleaser
# add `--prerelease` for any RC / pre-release
# update gopass website
```

Afterwards you should update the release description on GitHub to match the
current CHANGELOG entry. Go to https://github.com/gopasspw/gopass/releases/tag/v1.X.Y
edit it.

### Releasing a patch release (i.e. increasing Z in X.Y.Z)

If we need to release a patch release and can't base this upon master because
there have been changes which should not be included in the patch release
(e.g. new features) we need to summon a new release branch from a past release
tag. Then we'd cherry-pick or port the required fixes to this branch and create
a release from there.

General rule for cherry-picking:
* Keep the changes small and self contained
* Squashed commits per Feature help very much (one commit per fix/feature)
* Keep the order

```
git checkout vX.Y.Z
git checkout -b release-X.Y
git cherry-pick ABC
git cherry-pick DEF
git cherry-pick FFF
go build && make tests && make test-integration
# update CHANGELOG.md and VERSION in ONE COMMIT
git commit -am'Tag X.Y.Z+1'
git tag -s vX.Y.Z+1
goreleaser --skip-publish
git push origin vX.Y.Z+1
GITHUB_TOKEN=abc... goreleaser
git push origin release-X.Y
# update gopass website
```

Afterwards you should update the release description on GitHub to match the
current CHANGELOG entry. Go to https://github.com/gopasspw/gopass/releases/tag/v1.X.Y
edit it.

## Theme Development

- Go to `/themes/gopass`,
- install dependencies via `npm install`
- run `gulp watch` to develop locally (with auto-reload)
- start a server via `make dev` (`hugo serve -b localhost:1313`) (in the root dir)

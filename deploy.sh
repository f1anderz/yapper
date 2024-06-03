#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'release 1.0'

git push -f git@github.com:f1anderz/yapper.git master:dev

cd -
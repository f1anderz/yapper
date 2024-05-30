#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'gitHubAuth, emoji and calendar auto close'

git push -f git@github.com:f1anderz/yapper.git master:dev

cd -
#!/bin/sh

MESSAGE=$1

git pull --rebase --autostash

ng build --prod

git add -A
git commit -am "$MESSAGE"
git push


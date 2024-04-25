#!/bin/bash
rm -rf ./dist

mkdir ./dist
mkdir ./dist/vue
mkdir ./dist/react

# main-project 主应用
cp -r ./app/main-project/dist/ ./dist/

# vue-project 子应用
cp -r ./app/vue-project/dist/ ./dist/vue/

# react-project 子应用
cp -r ./app/react-project/dist/ ./dist/react/

echo 'bundle.sh execute success.'

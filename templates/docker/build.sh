#!/usr/bin/env bash

echo 开始构建
npm config set @auto:registry http://r.npm.corpautohome.com/
npm install
echo 构建成功

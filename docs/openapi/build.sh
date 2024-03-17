#!/bin/sh
#
# 公式 openapi-generator イメージを用いてローカルで openapi-ts/ 以下に TypeScript ファイルのビルドを行う。
# 生成物を typescript/openapi にコピーする。
#

set -eu

DOCKER_IMAGE=openapitools/openapi-generator-cli:v6.2.1

rm -rf openapi-ts ../../typescript/openapi

# 分割された yaml を統合
docker run \
  --rm \
  --volume ${PWD}/src:/src:ro \
  --volume ${PWD}/openapi:/openapi \
  ${DOCKER_IMAGE} \
    generate -i /src/api-v1.yaml -g openapi-yaml -o /openapi/

cp openapi/openapi/openapi.yaml dist/api-v1.yaml

# 統合された yaml から ts ファイルの作成
docker run \
  --rm \
  --volume ${PWD}/dist:/dist:ro \
  --volume ${PWD}/openapi-ts:/openapi-ts \
  ${DOCKER_IMAGE} \
    generate -i /dist/api-v1.yaml -g typescript-axios -o /openapi-ts/

rm `find openapi-ts -type f -not -name "*.ts"`
rmdir `find openapi-ts -type d -empty`
cp -R openapi-ts ../../typescript/openapi

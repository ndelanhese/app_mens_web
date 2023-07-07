#!/bin/bash

set -e

source ../.env

if [ "$CURRENT_BUILD" == "$BUILD" ]; then
  echo "The pointer is up to date."
else
  PREVIOUS_BUILD=$CURRENT_BUILD
  CURRENT_BUILD=$BUILD

  docker stop "mens_modas_$PREVIOUS_BUILD"
fi

docker start "mens_modas_$CURRENT_BUILD"

echo "BUILD=${BUILD}
CURRENT_BUILD=${CURRENT_BUILD}
PREVIOUS_BUILD=${PREVIOUS_BUILD}" > ../.env

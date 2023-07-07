#!/bin/bash

set -e

source ../.env

if [ "$CURRENT_BUILD" == "$BUILD" ]; then
  echo "The next build does not exist."
else
  PREVIOUS_BUILD=$CURRENT_BUILD
  CURRENT_BUILD=$((CURRENT_BUILD + 1))

  docker stop "mens_modas_$PREVIOUS_BUILD"
fi

docker start "mens_modas_$CURRENT_BUILD"

echo "BUILD=${BUILD}
CURRENT_BUILD=${CURRENT_BUILD}
PREVIOUS_BUILD=${PREVIOUS_BUILD}" > ../.env

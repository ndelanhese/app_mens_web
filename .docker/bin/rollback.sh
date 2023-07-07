#!/bin/bash

set -e

source ../.env

if [ "$PREVIOUS_BUILD" == "0" ]; then
  echo "The previous build does not exist."
else
  docker stop "mens_modas_$CURRENT_BUILD"

  CURRENT_BUILD=$PREVIOUS_BUILD
  PREVIOUS_BUILD=$((PREVIOUS_BUILD - 1))
fi

docker start "mens_modas_$CURRENT_BUILD"

echo "BUILD=${BUILD}
CURRENT_BUILD=${CURRENT_BUILD}
PREVIOUS_BUILD=${PREVIOUS_BUILD}" > ../.env

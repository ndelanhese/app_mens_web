#!/bin/bash

set -e

source ../.env

docker exec -it "mens_modas_$CURRENT_BUILD" sh

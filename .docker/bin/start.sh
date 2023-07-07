#!/bin/bash

set -e

source ../.env

docker start "mens_modas_$CURRENT_BUILD"

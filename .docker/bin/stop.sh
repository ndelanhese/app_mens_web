#!/bin/bash

set -e

source ../.env

docker stop "mens_modas_$CURRENT_BUILD"

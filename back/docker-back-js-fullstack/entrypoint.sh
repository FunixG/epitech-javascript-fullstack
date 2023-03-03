#!/bin/bash

cd "$HOME" || exit 1

npm run migration:run
npm run start:prod

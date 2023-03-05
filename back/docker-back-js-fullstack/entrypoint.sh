#!/bin/bash

cd "$HOME" || exit 1

npm run typeorm:run-migrations
npm run start:prod

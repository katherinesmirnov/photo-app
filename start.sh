#!/bin/sh
set -ex

npx prisma migrate deploy
exec /sbin/tini -- node server.js
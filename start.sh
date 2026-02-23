#!/bin/sh
set -ex

npx prisma migrate deploy
npx prisma db seed
exec /sbin/tini -- node server.js
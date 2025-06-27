#!/bin/sh

echo "Waiting for the database at db:5432..."
for i in $(seq 1 5); do
  if nc -z db 5432; then
    echo "Database is up"
    break
  fi
  echo "Still waiting ($i/5)..."
  sleep 1
done

if ! nc -z db 5432; then
  echo "Database never became available"
  exit 1
fi

export $(grep -v '^#' .env | xargs)

npx prisma generate

if [ "$RESET_DB" = "true" ]; then
  echo "⚠️ RESET_DB is true — dropping and reinitializing the database..."

  npx prisma db push --force-reset
else
  if [ "$NODE_ENV" = "development" ]; then
    npx prisma migrate dev --name init
  else 
    npx prisma migrate deploy
  fi
fi

node dist/main

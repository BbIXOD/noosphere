if [ "NODE_ENV" = "development" ]; then
  for i in $(seq 1 5); do
    if nc -db 5432; then
      break
    fi
    sleep 1
  done
  
  npx prisma migrate dev
fi

if [ "NODE_ENV" = "production" ]; then
  npx prisma migrate deploy
fi

node dist/main

if [ "NODE_ENV" = "development" ]; then
  for i in $(seq 1 5); do
    if nc -db 5432; then
      break
    fi
    sleep 1
  done
  
  npx prisma migrate dev
else 
  npx prisma migrate deploy
fi

npx prisma generate

node dist/main

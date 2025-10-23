#!/bin/sh

echo "🔄 Waiting for MySQL to be ready..."
# Đợi MySQL sẵn sàng
until nc -z mysql 3306; do
  echo "⏳ MySQL is unavailable - sleeping"
  sleep 2
done

echo "✅ MySQL is ready!"

echo "🌱 Running database seed..."
yarn seed

echo "🚀 Starting application..."
node dist/apps/app/main

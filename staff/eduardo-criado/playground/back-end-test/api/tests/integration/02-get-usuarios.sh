#!/bin/bash

echo "=========================================="
echo "TEST 2: GET /api/usuarios"
echo "=========================================="

RESPONSE=$(curl -s -w "\nSTATUS:%{http_code}" http://localhost:3000/api/usuarios)
STATUS=$(echo "$RESPONSE" | grep "STATUS:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "STATUS:")

echo "Status Code: $STATUS"
echo "Response: $BODY" | jq '.'

if [ "$STATUS" -eq 200 ]; then
  echo "✅ TEST PASSED - Usuarios obtenidos correctamente"
else
  echo "❌ TEST FAILED"
  exit 1
fi

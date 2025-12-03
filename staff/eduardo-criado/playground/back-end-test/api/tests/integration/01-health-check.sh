#!/bin/bash

echo "=========================================="
echo "TEST 1: Health Check"
echo "=========================================="

RESPONSE=$(curl -s -w "\nSTATUS:%{http_code}" http://localhost:3000/health)
STATUS=$(echo "$RESPONSE" | grep "STATUS:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "STATUS:")

echo "Status Code: $STATUS"
echo "Response: $BODY"

if [ "$STATUS" -eq 200 ]; then
  echo "✅ TEST PASSED"
else
  echo "❌ TEST FAILED"
  exit 1
fi

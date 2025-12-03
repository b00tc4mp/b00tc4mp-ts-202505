#!/bin/bash

echo "=========================================="
echo "TEST 7: GET /api/usuarios/:id/vehiculos"
echo "=========================================="

# Obtener primer usuario
USUARIO_ID=$(curl -s http://localhost:3000/api/usuarios | jq -r '.[0].id')
USUARIO_NOMBRE=$(curl -s http://localhost:3000/api/usuarios | jq -r '.[0].nombre')

echo "Usuario: $USUARIO_NOMBRE (ID: $USUARIO_ID)"

RESPONSE=$(curl -s -w "\nSTATUS:%{http_code}" "http://localhost:3000/api/usuarios/$USUARIO_ID/vehiculos")
STATUS=$(echo "$RESPONSE" | grep "STATUS:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "STATUS:")

echo "Status Code: $STATUS"
echo "Response: $BODY" | jq '.'

if [ "$STATUS" -eq 200 ]; then
  echo "✅ TEST PASSED - Vehículos del usuario obtenidos"
else
  echo "❌ TEST FAILED"
  exit 1
fi

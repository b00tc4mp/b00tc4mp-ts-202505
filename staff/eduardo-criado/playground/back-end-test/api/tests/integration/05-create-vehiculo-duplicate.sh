#!/bin/bash

echo "=========================================="
echo "TEST 5: POST /api/vehiculos - Matrícula duplicada (409)"
echo "=========================================="

# Obtener un vehículo existente
echo "Obteniendo matrícula existente..."
MATRICULA_EXISTENTE=$(curl -s http://localhost:3000/api/vehiculos | jq -r '.[0].matricula')
USUARIO_ID=$(curl -s http://localhost:3000/api/usuarios | jq -r '.[] | select(.tipo_permiso == "B") | .id' | head -1)

echo "Matrícula existente: $MATRICULA_EXISTENTE"

RESPONSE=$(curl -s -w "\nSTATUS:%{http_code}" -X POST http://localhost:3000/api/vehiculos \
  -H "Content-Type: application/json" \
  -d '{
    "marca": "Ford",
    "modelo": "Focus",
    "matricula": "'$MATRICULA_EXISTENTE'",
    "tipo": "coche",
    "propietario_id": "'$USUARIO_ID'"
  }')

STATUS=$(echo "$RESPONSE" | grep "STATUS:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "STATUS:")

echo "Status Code: $STATUS"
echo "Response: $BODY" | jq '.'

if [ "$STATUS" -eq 409 ]; then
  echo "✅ TEST PASSED - Error 409 devuelto correctamente"
else
  echo "❌ TEST FAILED - Expected 409, got $STATUS"
  exit 1
fi

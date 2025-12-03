#!/bin/bash

echo "=========================================="
echo "TEST 6: POST /api/vehiculos - Permiso inadecuado (400)"
echo "=========================================="

# Obtener usuario con permiso B (coche) e intentar crear moto
echo "Obteniendo usuario con permiso B (coche)..."
USUARIO_ID=$(curl -s http://localhost:3000/api/usuarios | jq -r '.[] | select(.tipo_permiso == "B") | .id' | head -1)

echo "Usuario ID: $USUARIO_ID (Permiso B - solo coches)"

MATRICULA="MOTO$(date +%s)"

RESPONSE=$(curl -s -w "\nSTATUS:%{http_code}" -X POST http://localhost:3000/api/vehiculos \
  -H "Content-Type: application/json" \
  -d '{
    "marca": "Suzuki",
    "modelo": "GSX-R",
    "matricula": "'$MATRICULA'",
    "tipo": "moto",
    "propietario_id": "'$USUARIO_ID'"
  }')

STATUS=$(echo "$RESPONSE" | grep "STATUS:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "STATUS:")

echo "Status Code: $STATUS"
echo "Response: $BODY" | jq '.'

if [ "$STATUS" -eq 400 ]; then
  echo "✅ TEST PASSED - Error 400 devuelto correctamente"
else
  echo "❌ TEST FAILED - Expected 400, got $STATUS"
  exit 1
fi

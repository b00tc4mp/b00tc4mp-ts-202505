#!/bin/bash

echo "=========================================="
echo "TEST 4: POST /api/vehiculos - Crear vehículo (ÉXITO)"
echo "=========================================="

# Primero obtener un usuario válido
echo "Obteniendo usuario con permiso B..."
USUARIO_ID=$(curl -s http://localhost:3000/api/usuarios | jq -r '.[] | select(.tipo_permiso == "B") | .id' | head -1)

if [ -z "$USUARIO_ID" ]; then
  echo "❌ No se encontró usuario con permiso B"
  exit 1
fi

echo "Usuario ID: $USUARIO_ID"

# Crear vehículo con matrícula única
MATRICULA="TEST$(date +%s)"

RESPONSE=$(curl -s -w "\nSTATUS:%{http_code}" -X POST http://localhost:3000/api/vehiculos \
  -H "Content-Type: application/json" \
  -d '{
    "marca": "Mazda",
    "modelo": "3",
    "matricula": "'$MATRICULA'",
    "tipo": "coche",
    "propietario_id": "'$USUARIO_ID'"
  }')

STATUS=$(echo "$RESPONSE" | grep "STATUS:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "STATUS:")

echo "Status Code: $STATUS"
echo "Response: $BODY" | jq '.'

if [ "$STATUS" -eq 201 ]; then
  echo "✅ TEST PASSED - Vehículo creado exitosamente"
else
  echo "❌ TEST FAILED - Expected 201, got $STATUS"
  exit 1
fi

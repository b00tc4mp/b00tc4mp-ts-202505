#!/bin/bash

echo "=========================================="
echo "TEST 8: PUT /api/vehiculos/:id/propietario - Transferir propiedad"
echo "=========================================="

# Obtener un vehículo tipo coche
VEHICULO=$(curl -s http://localhost:3000/api/vehiculos | jq -r '.[] | select(.tipo == "coche") | {id, propietario_id} | @json' | head -1)
VEHICULO_ID=$(echo $VEHICULO | jq -r '.id')
PROPIETARIO_ACTUAL=$(echo $VEHICULO | jq -r '.propietario_id')

# Obtener otro usuario con permiso B diferente al actual
# Seleccionar un nuevo propietario con permiso tipo B y permiso vigente
NOW=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
NUEVO_PROPIETARIO=$(curl -s http://localhost:3000/api/usuarios | jq -r '.[] | select(.tipo_permiso == "B" and .id != "'$PROPIETARIO_ACTUAL'" and .permiso_valido_hasta > "'$NOW'") | .id' | head -1)

if [ -z "$NUEVO_PROPIETARIO" ]; then
  echo "⚠️  No hay otro usuario con permiso B para transferir"
  echo "⏭️  SKIPPING TEST"
  exit 0
fi

echo "Vehículo ID: $VEHICULO_ID"
echo "Propietario actual: $PROPIETARIO_ACTUAL"
echo "Nuevo propietario: $NUEVO_PROPIETARIO"

RESPONSE=$(curl -s -w "\nSTATUS:%{http_code}" -X PUT "http://localhost:3000/api/vehiculos/$VEHICULO_ID/propietario" \
  -H "Content-Type: application/json" \
  -d '{
    "nuevo_propietario_id": "'$NUEVO_PROPIETARIO'"
  }')

STATUS=$(echo "$RESPONSE" | grep "STATUS:" | cut -d':' -f2)
BODY=$(echo "$RESPONSE" | grep -v "STATUS:")

echo "Status Code: $STATUS"
echo "Response: $BODY" | jq '.'

if [ "$STATUS" -eq 200 ]; then
  echo "✅ TEST PASSED - Propiedad transferida exitosamente"
else
  echo "❌ TEST FAILED - Expected 200, got $STATUS"
  exit 1
fi

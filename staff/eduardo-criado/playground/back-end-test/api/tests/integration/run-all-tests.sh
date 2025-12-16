#!/bin/bash

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   EJECUTANDO SUITE DE TESTS DE API    ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Contador de tests
TOTAL=0
PASSED=0
FAILED=0

# Directorio de tests
TEST_DIR="$(dirname "$0")"

# Ejecutar cada test
for test_file in "$TEST_DIR"/[0-9]*.sh; do
  if [ -f "$test_file" ]; then
    TOTAL=$((TOTAL + 1))

    echo ""
    bash "$test_file"

    if [ $? -eq 0 ]; then
      PASSED=$((PASSED + 1))
    else
      FAILED=$((FAILED + 1))
    fi

    echo ""
    sleep 1
  fi
done

echo "╔════════════════════════════════════════╗"
echo "║           RESUMEN DE TESTS             ║"
echo "╚════════════════════════════════════════╝"
echo "Total:  $TOTAL tests"
echo "✅ Passed: $PASSED"
echo "❌ Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
  echo "🎉 TODOS LOS TESTS PASARON"
  exit 0
else
  echo "⚠️  ALGUNOS TESTS FALLARON"
  exit 1
fi

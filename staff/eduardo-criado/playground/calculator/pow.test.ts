import { pow } from "./pow";

console.info("TEST pow");

console.info("CASE num is 2 and exp is 3, then r is 8");

{
  const r: number = pow(2, 3);

  console.assert(r === 8, "r is 8");
}

console.info("CASE num is -2 and exp is 3, then r is -8");

{
  const r: number = pow(-2, 3); // -8

  console.assert(r === -8, "r is -8");
}

console.info("CASE num is -2 and exp is -2, then r is 0.25");

{
  const r: number = pow(-2, -2);
  // pow(-2, -2) es equivalente a 1 / ((-2) ** 2)

  //   (-2) ** 2 = 4

  //   1 / 4 = 0.25

  //   r 0.25

  console.assert(r === 0.25, "r is 0.25");
}

console.info("CASE num is -4 and exp is -1, then r is -0.25");
{
  const r: number = pow(-4, -1);

  // pow(-4, -1) es equivalente a 1 / ((-4) ** -1)

  console.assert(r === -0.25, "r is -0.25");
}

console.info("CASE num is -4 and exp is 2, then r is 16");
{
  const r: number = pow(-4, 2);

  // pow(-4, -2) es equivalente a ((-4) ** (-2))

  console.assert(r === 16, "r is 16");
}

console.info("CASE num is 2 and exp is -2, then r is 0.25");
{
  const r: number = pow(2, -2);

  console.assert(r === 0.25, "r is 0.25");

  //Exponente positivo: multiplica la base por sí misma.

  // Exponente negativo: divide 1 entre la base multiplicada por sí misma tantas veces como indique el exponente (pero en positivo)
}

console.info("CASE num is NaN and exp is 3, then r is NaN");

{
  const r: number = pow(NaN, 3); // NaN

  console.assert(isNaN(r), "r is NaN");
}

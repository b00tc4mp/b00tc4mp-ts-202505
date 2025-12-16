import { mul } from "./mul";

console.info("TEST mult");

console.info("CASE a is 10 and b is 5, then r is 50");

{
  const r: number = mul(10, 5);

  console.assert(r === 50, "r is 50");
}

console.info("CASE a is -10 and b is 2, then r is -20");

{
  const r: number = mul(-10, 2);

  console.assert(r === -20, "r is -20");
}

console.info("CASE a is 10 and b is -2, then r is -20");

{
  const r: number = mul(10, -2);

  console.assert(r === -20, "r is -20");
}

console.info("CASE a is -10 and b is -2, then r is 20");

{
  const r: number = mul(-10, -2);

  console.assert(r === 20, "r is 20");
}

console.info("CASE a is NaN and b is 2, then r is NaN");

{
  const r: number = mul(NaN, 2);

  console.assert(isNaN(r), "r is NaN");
}

console.info("CASE a is 10 and b is NaN, then r is NaN");

{
  const r: number = mul(10, NaN);

  console.assert(isNaN(r), "r is NaN");
}

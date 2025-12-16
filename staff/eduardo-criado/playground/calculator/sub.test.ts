import { sub } from "./sub";

console.info("TEST sub");

console.info("CASE a is 10 and b is 5, then r is 5");

{
  const r: number = sub(10, 5);

  console.assert(r === 5, "r is 5");
}

console.info("CASE a is -5 and b is 20, then r is -25");

{
  const r: number = sub(-5, 20);

  console.assert(r === -25, "r is -25");
}

console.info("CASE a is 10 and b is 20, then r is -10");

{
  const r: number = sub(10, 20);

  console.assert(r === -10, "r is -10");
}

console.info("CASE a is -10 and b is 20, then r is -30");

{
  const r: number = sub(-10, 20);

  console.assert(r === -30, "r is -30");
}

console.info("CASE a is NaN and b is 20, then r is NaN");

{
  const r: number = sub(NaN, 20);

  console.assert(isNaN(r), "r is NaN");
}

console.info("CASE a is 5 and b is NaN, then r is NaN");

{
  const r: number = sub(5, NaN);

  console.assert(isNaN(r), "r is NaN");
}

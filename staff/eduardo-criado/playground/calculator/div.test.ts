import { div } from "./div";

console.info("TEST div");

console.info("CASE a is 10 and b is 5, then r is 2");

{
  const r: number = div(10, 5); // 2

  console.assert(r === 2, "r is 2");
}

console.info("CASE a is -10 and b is 2, then r is -5");

{
  const r: number = div(-10, 2); // -5

  console.assert(r === -5, "r is -5");
}

console.info("CASE a is 10 and b is -2, then r is -5");

{
  const r: number = div(10, -2);

  console.assert(r === -5, "r is -5");
}

console.info("CASE a is -10 and b is -2, then r is 5");

{
  const r: number = div(-10, -2);

  console.assert(r === 5, "r is 5");
}

console.info("CASE a is 10 and b is 0, then r is Infinity");

{
  const r: number = div(10, 0);

  //   console.assert(r === Infinity, "r is Infinity");

  console.assert(!isFinite(r), "r is Infinity");
}

console.info("CASE a is -10 and b is NaN, then r is NaN");

{
  const r: number = div(-10, NaN);

  console.assert(isNaN(r), "r is NaN");
}

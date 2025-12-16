import { sqrt } from "./sqrt";

console.info("TEST sqrt");

console.info("CASE num is 4, then r is 2");

{
  const r: number = sqrt(4);

  console.assert(r === 2, "r is 2");
}

console.info("CASE num is 9, then r is 3");

{
  const r: number = sqrt(9);

  console.assert(r === 3, "r is 3");
}

console.info("CASE num is 0, then r is 0");
{
  const r: number = sqrt(0);
  console.assert(r === 0, "r is 0");
}

console.info("CASE num is 1, then r is 1");
{
  const r: number = sqrt(1);
  console.assert(r === 1, "r is 1");
}

console.info("CASE num is -16, then r NaN");

{
  const r: number = sqrt(-16);

  console.assert(isNaN(r), "r is NaN");
}

console.info("CASE num is NaN, then r is NaN");

{
  const r: number = sqrt(NaN);

  console.assert(isNaN(r), "r is NaN");
}

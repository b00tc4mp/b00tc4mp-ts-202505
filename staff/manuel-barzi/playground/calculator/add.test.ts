import { add } from "./add"

console.info("TEST add")


console.info("CASE a is 10 and b is 20 then r 30")

{
    const r = add(10, 20)

    console.assert(r === 30, "r is 30")
}


console.info("CASE a is -10 and b is 20 then r 10")

{
    const r = add(-10, 20)

    console.assert(r === 10, "r is 10")
}

console.info("CASE a is -10 and b is -20 then r -30")

{
    const r = add(-10, -20)

    console.assert(r === -30, "rs is -30")
}

console.info("CASE a is NaN and b is 20 then r NaN")

{
    const r = add(NaN, 20)

    console.assert(isNaN(r), "r is NaN")
}
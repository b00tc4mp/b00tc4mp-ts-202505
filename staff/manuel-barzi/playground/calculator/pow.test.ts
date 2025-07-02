import { pow } from "./pow"

console.info("TEST pow")


console.info("CASE num is 2 and exp is 3 then r is 8")

{
    const r = pow(2, 3)

    console.assert(r === 8, "r is 8")
}


console.info("CASE num is 10 and exp is 2 then r is 100")

{
    const r = pow(10, 2)

    console.assert(r === 100, "r is 100")
}
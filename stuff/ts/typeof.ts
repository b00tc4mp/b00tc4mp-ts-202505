const peter = { name: "Peter", age: 23, maritalStatus: false }

type Person = typeof peter

let petra: Person

petra = {
    name: "Petra",
    age: 22,
    maritalStatus: false
}
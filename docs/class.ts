// ECMAScript Private Fields
class Animal1 {
  #name: string

  constructor(theName: string) {
    this.#name = theName
  }
}
// ❌ Property '#name' is not accessible outside class 'Animal1' because it has a private identifier.ts(18013)
// new Animal1('Cat').#name

// Understanding TypeScript's private
class Animal2 {
  private name: string

  constructor(theName: string) {
    this.name = theName
  }
}
// ❌ Property 'name' is private and only accessible within class 'Animal2'.ts(2341)
// new Animal2('Cat').name

// Readonly modifier
class Octopus1 {
  readonly name: string
  readonly numberOfLegs: number = 8
  constructor(theName: string) {
    this.name = theName
  }
}
const dad1 = new Octopus1('Man with the 8 strong legs')
// ❌ Cannot assign to 'name' because it is a read-only property.ts(2540)
// dad.name = 'Man with the 3-piece suit'

//  Parameter properties
class Octopus2 {
  readonly numberOfLegs: number = 8
  constructor(readonly name: string) {}
}
const dad2 = new Octopus2('Man with the 8 strong legs')
dad2.name

// Using a class as an interface
class Point {
  x: number
  y: number
}
interface Point3d extends Point {
  z: number
}
const point3d: Point3d = { x: 1, y: 2, z: 3 }

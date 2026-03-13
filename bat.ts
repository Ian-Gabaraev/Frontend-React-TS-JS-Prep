"use strict";

type BatCategory = "microbat" | "macrobat";
type EcholocationLevel = "subultrasonic" | "ultrasonic";

class Bat {
  name: string;
  category: BatCategory;
  echolocation: EcholocationLevel;
  weight: number;
  color?: string;

  constructor(
    name: string,
    category: BatCategory,
    echolocation: EcholocationLevel,
    weight: number,
    color?: string,
  ) {
    this.name = name;
    this.category = category;
    this.echolocation = echolocation;
    this.weight = weight;
    this.color = color;
  }

  describe() {
    console.log(
      "Bat name: " + this.name,
      "Bat category: " + this.category,
      "Bat echolocation: " + this.echolocation,
    );
  }

  looks() {
    console.log("Bat " + this.name + " is " + (this.color ?? "unknown color"));
  }
}

const taphozous: Bat = new Bat(
  "taphozous",
  "microbat",
  "ultrasonic",
  5,
  "brown",
);
const pippistrelle: Bat = new Bat("pippistrelle", "microbat", "ultrasonic", 5);
const myotis: Bat = new Bat("myotis", "microbat", "ultrasonic", 5);
const flyingFox: Bat = new Bat(
  "flying fox",
  "macrobat",
  "subultrasonic",
  1000,
  "black",
);

const currentBats: Array<Bat> = [taphozous, pippistrelle, myotis, flyingFox];

console.log("---First showing all bats and colors---");
currentBats.map((bat) => bat.looks());

console.log("---Now showing all bats with known colors---");
currentBats.filter((bat) => bat.color).map((bat) => bat.looks());

console.log("---Now showing all names---");
currentBats.forEach((bat) => console.log(bat.name));

console.log("---Now let's calculate total weight of the group---");
const totalWeight: number = currentBats.reduce(
  (total, bat) => total + bat.weight,
  0,
);
console.log("Total weight of all bats is " + totalWeight + " g");

function closure(): Function {
  let idx: number = -1;

  return function innner() {
    idx++;
    console.log(currentBats[idx].name);
  };
}

const fn: Function = closure();
fn();
fn();
fn();
fn();

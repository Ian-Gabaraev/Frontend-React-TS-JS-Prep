# Frontend Interview Prep: JavaScript & TypeScript

> A comprehensive guide to JavaScript and TypeScript concepts commonly asked in frontend interviews.

---

## Table of Contents

- [Quick Reference](#quick-reference)
- [JavaScript Gotchas](#javascript-gotchas)
  - [typeof null](#typeof-null)
  - [Empty Array Addition](#empty-array-addition)
  - [Event Loop](#event-loop)
  - [this in Arrow Functions](#this-in-arrow-functions)
  - [Timeout with var](#timeout-with-var)
  - [Closures](#closures)
  - [Object Reference Assignment](#object-reference-assignment)
- [Core JavaScript Concepts](#core-javascript-concepts)
  - [Arrow Functions](#arrow-functions)
  - [Single-Threaded Nature](#is-js-single-threaded)
  - [Microtasks vs Macrotasks](#microtasks-and-macrotasks)
  - [Pass by Value vs Reference](#are-objects-passed-by-value-or-reference)
  - [Equality Operators](#equality-operators--vs-)
  - [Nullish Coalescing](#nullish-coalescing)
- [Array Methods](#array-iteration-methods)
- [TypeScript Essentials](#typescript-essentials)
  - [All TypeScript Types](#all-typescript-types)
  - [Variable Declarations](#variable-declarations)
  - [Destructuring](#destructuring)
  - [Interfaces](#interfaces)
  - [Composing Types](#composing-types)
  - [Type vs Interface](#type-vs-interface)
- [TypeScript Utility Types](#typescript-utility-types)
  - [Omit](#omittype-keys)
  - [Record](#recordk-v)
  - [Pick](#pickt-k)
  - [Partial](#partialt)

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install a package (e.g., `npm create vite@latest`) |
| `npx` | Run a command (e.g., `npx create-react-app .`) |

---

## JavaScript Gotchas

### typeof null

**Question:** What does this return?

```ts
console.log(typeof null)
```

**Answer:** `"object"`

**Why?** This is a historical bug in JavaScript that was never fixed for backward compatibility. `null` is a primitive, but `typeof null` returns `"object"`.

---

### Empty Array Addition

**Question:** What does this return?

```ts
console.log([] + [])
```

**Answer:** `""`

**Why?** The `+` operator tries to convert arrays to primitives. Arrays convert to strings via `.toString()`, which returns `""` for empty arrays. So `"" + ""` equals `""`.

---

### Event Loop

**Question:** What is the output?

```ts
console.log("A")

setTimeout(() => {
  console.log("B")
}, 0)

console.log("C")
```

**Answer:** `A C B`

**Explanation:** The `setTimeout` callback goes into the event loop and executes last, even with a 0ms delay.

---

### this in Arrow Functions

```ts
const obj = {
  value: 10,
  print: () => {
    console.log(this.value)
  }
}

obj.print() // undefined
```

**Why?** Arrow functions capture `this` from their surrounding lexical scope (global scope here), which has no `value` property.

**Fix:** Use a regular function:

```ts
const obj = {
  value: 10,
  print() {
    console.log(this.value)
  }
}

obj.print() // 10
```

---

### Timeout with var

**Question:** What will this output?

```ts
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
```

**Answer:** `3 3 3` (not `2 2 2`!)

**Why this happens:**

1. `var` is **function-scoped**, not block-scoped
2. `setTimeout` runs **after** the loop finishes (event loop)
3. When callbacks execute, `i === 3` (loop ended at `3 < 3 === false`)

**Fix:** Use `let` (creates new `i` each iteration):

```ts
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// Output: 0 1 2
```

---

### Closures

```ts
function outer() {
  let count = 0

  return function() {
    count++
    return count
  }
}

const fn = outer()

console.log(fn()) // 1
console.log(fn()) // 2
console.log(fn()) // 3
```

**Key Concept:** The inner function **remembers** variables from its surrounding scope. This is a **closure** — the returned function retains access to `count` even after `outer()` finishes.

---

### Object Reference Assignment

```ts
let a = { value: 0 }
let b = a
b.value = 5

console.log(a.value) // 5
```

**Why?** JavaScript doesn't copy objects — it copies the **reference**. Both `a` and `b` point to the same object in memory.

---

## Core JavaScript Concepts

### Arrow Functions

These three are equivalent:

```ts
// Traditional function
function add(a, b) {
  return a + b
}

// Arrow function (implicit return)
const add = (a, b) => a + b

// Arrow function (explicit return)
const add = (a, b) => {
  return a + b
}
```

---

### Is JS Single-Threaded?

**Yes.** JavaScript uses an **event loop** to handle asynchronous operations while remaining single-threaded.

---

### Microtasks and Macrotasks

Microtasks run **before** macrotasks after the current call stack is empty.

```ts
console.log("A")                                    // 1st
setTimeout(() => console.log("B"), 0)               // 4th (macrotask)
Promise.resolve().then(() => console.log("C"))      // 3rd (microtask)
console.log("D")                                    // 2nd

// Output: A D C B
```

---

### Are Objects Passed by Value or Reference?

Objects are passed **by value**, but the value is a **reference** to the object.

| Type | What's Copied |
|------|---------------|
| Primitives | The value itself |
| Objects | A reference to the object |

---

### Equality Operators (== vs ===)

| Operator | Name | Behavior |
|----------|------|----------|
| `===` | Strict equality | Compares value **and** type |
| `==` | Loose equality | Coerces types before comparing |

```ts
// Strict equality
5 === 5              // true
5 === "5"            // false
null === undefined   // false

// Loose equality (with coercion)
5 == "5"             // true
true == 1            // true
null == undefined    // true
```

**Gotcha:** Reference comparison

```ts
[] === []  // false (different references)
{} === {}  // false (different references)
```

---

### Nullish Coalescing

```ts
const value = null
console.log(value ?? "default") // "default"
```

| Operator | Checks for |
|----------|------------|
| `??` | `null` or `undefined` only |
| `\|\|` | All falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`) |

---

## Array Iteration Methods

### for...of

```ts
const numbers = [1, 2, 3, 4]

for (const n of numbers) {
  console.log(n)
}
```

### map

```ts
const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2) // [2, 4, 6]
```

### reduce

```ts
const numbers = [1, 2, 3]
const sum = numbers.reduce((acc, n) => acc + n, 0) // 6
```

### forEach

```ts
numbers.forEach(n => console.log(n))
```

### entries

```ts
for (const [index, value] of numbers.entries()) {
  console.log(index, value)
}
```

### find

Returns the **first** matching element:

```ts
const result = numbers.find(n => n > 2) // 3
```

### filter

Returns **all** matching elements:

```ts
const numbers = [1, 2, 3, 4, 5]
const even = numbers.filter(n => n % 2 === 0) // [2, 4]
```

### Chaining: filter + map

```ts
const result = users
  .filter(user => user.active)
  .map(user => user.name)
```

---

## TypeScript Essentials

### All TypeScript Types

| Type | Description |
|------|-------------|
| `number` | Numeric values |
| `bigint` | Large integers |
| `boolean` | `true` or `false` |
| `string` | Text values |
| `array` | `T[]` or `Array<T>` |
| `tuple` | Fixed-length arrays with specific types |
| `enum` | Named constants |
| `unknown` | Type-safe `any` |
| `any` | Opt out of type checking |
| `void` | No return value |
| `null` | Intentional absence |
| `undefined` | Uninitialized |
| `never` | Never returns (throws/infinite loop) |
| `object` | Non-primitive type |

---

### Variable Declarations

| Keyword | Scope | Reassignable | Hoisted |
|---------|-------|--------------|---------|
| `var` | Function | Yes | Yes (initialized as `undefined`) |
| `let` | Block | Yes | No (temporal dead zone) |
| `const` | Block | No | No (temporal dead zone) |

> **Note:** `const` prevents reassignment, not mutation. Object properties can still be changed unless marked `readonly`.

---

### Destructuring

#### Array Destructuring

```ts
const input = [1, 2, 3]
const [first, second] = input

// Skip elements
const [first, , third] = [10, 20, 30]

// Swap variables
[first, second] = [second, first]
```

#### Object Destructuring

```ts
const user = { name: "Ian", age: 30 }
const { name } = user // "Ian"
```

#### Default Values

```ts
function greet({ name, greeting = "Hello" }: { name: string; greeting?: string }) {
  return `${greeting}, ${name}!`
}
```

#### Spread Operator

```ts
const arr = [1, 2, 3]
const newArr = [...arr, 4] // [1, 2, 3, 4]

const obj = { a: 1 }
const newObj = { ...obj, b: 2 } // { a: 1, b: 2 }
```

---

### Interfaces

Define object shapes:

```ts
interface User {
  name: string
  id: number
}

const user: User = {
  name: "Hayes",
  id: 0
}
```

---

### Composing Types

#### Union Types

```ts
type Status = "loading" | "success" | "error"
type StringOrNumber = string | number
```

#### Generics

```ts
type StringArray = Array<string>
type NumberArray = Array<number>

// Generic function
function identity<T>(value: T): T {
  return value
}
```

---

## TypeScript Utility Types

### Omit<Type, Keys>

Creates a new type by **excluding** specific properties.

```ts
type User = {
  id: number
  name: string
  email: string
}

type PublicUser = Omit<User, "email">
// Result: { id: number; name: string }
```

---

### Record<K, V>

Creates a dictionary/map type with keys of type `K` and values of type `V`.

```ts
type Scores = Record<string, number>

const scores: Scores = {
  alice: 10,
  bob: 15
}
```

Equivalent to:

```ts
type Scores = {
  [key: string]: number
}
```

---

### Pick<T, K>

Creates a new type by **selecting** specific properties.

```ts
type User = {
  id: number
  name: string
  email: string
}

type UserPreview = Pick<User, "id" | "name">
// Result: { id: number; name: string }
```

---

### Partial<T>

Makes **all properties optional**.

```ts
type User = {
  id: number
  name: string
}

type PartialUser = Partial<User>
// Result: { id?: number; name?: string }
```

**Use case:** Useful for update functions where you only want to modify some fields.

---

### Type vs Interface

| Feature | `type` | `interface` |
|---------|--------|-------------|
| Union types | ✅ | ❌ |
| Declaration merging | ❌ | ✅ |
| Extends | ✅ (via `&`) | ✅ (via `extends`) |
| Computed properties | ✅ | ❌ |

#### Interface Extension

```ts
interface Person {
  name: string
}

interface Employee extends Person {
  salary: number
}
```

#### Type Intersection

```ts
type Point = { x: number; y: number }
type NamedPoint = Point & { name: string }
```

#### Declaration Merging (Interface only)

```ts
interface User {
  name: string
}

interface User {
  age: number
}

// Result: User has both name and age
```

---

## License

MIT

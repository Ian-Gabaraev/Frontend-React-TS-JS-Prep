# Frontend Interview Prep: JavaScript & TypeScript

> A comprehensive guide to JavaScript and TypeScript concepts commonly asked in frontend interviews.

---

## Table of Contents

- [Quick Reference](#quick-reference)
- [JavaScript Gotchas](#javascript-gotchas)
  - [typeof null](#typeof-null)
  - [typeof Array](#typeof-array)
  - [Empty Array Addition](#empty-array-addition)
  - [Event Loop](#event-loop)
  - [this in Arrow Functions](#this-in-arrow-functions)
  - [Timeout with var](#timeout-with-var)
  - [Closures](#closures)
  - [Object Reference Assignment](#object-reference-assignment)
- [Core JavaScript Concepts](#core-javascript-concepts)
  - [OOP in JavaScript](#oop-in-javascript)
  - [Data Types](#data-types)
  - [Promises](#promises)
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
- [Node.js & Package Management](#nodejs--package-management)
  - [What is Node.js?](#what-is-nodejs)
  - [npm vs npx vs yarn vs pnpm](#npm-vs-npx-vs-yarn-vs-pnpm)
  - [package.json](#packagejson)
  - [Dependencies vs DevDependencies](#dependencies-vs-devdependencies)
  - [Semantic Versioning](#semantic-versioning-semver)
  - [package-lock.json](#package-lockjson)
  - [node_modules](#node_modules)
  - [Common npm Commands](#common-npm-commands)
  - [ES Modules vs CommonJS](#es-modules-vs-commonjs)
  - [Environment Variables](#environment-variables)

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

### typeof Array

**Question:** What does this return?

```ts
console.log(typeof [])
```

**Answer:** `"object"` (not `"array"`!)

**Why?** Arrays are objects in JavaScript. Use `Array.isArray([])` to check for arrays.

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

### OOP in JavaScript

#### Basic Class Syntax

```ts
class User {
  constructor(name) {
    this.name = name
  }

  greet() {
    return "Hello " + this.name
  }
}

const u = new User("Ian")
```

#### Inheritance

```ts
class Animal {
  speak() {
    console.log("sound")
  }
}

class Dog extends Animal {
  speak() {
    console.log("bark")
  }
}
```

#### super Keyword

Calls the parent class constructor or methods:

```ts
class Animal {
  constructor(name) {
    this.name = name
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name) // Call parent constructor
  }
}
```

#### Encapsulation (Private Fields)

Use `#` prefix for private fields:

```ts
class Counter {
  #count = 0

  inc() {
    this.#count++
  }

  get value() {
    return this.#count
  }
}
```

---

### Data Types

#### Primitives

| Type | Example |
|------|------|
| `string` | `"hello"` |
| `number` | `42` |
| `boolean` | `true` |
| `undefined` | `undefined` |
| `null` | `null` |
| `symbol` | `Symbol("id")` |
| `bigint` | `123n` |

#### Reference Types (Objects)

| Type | Example |
|------|------|
| `Object` | `{ name: "Ian" }` |
| `Array` | `[1, 2, 3]` |
| `Function` | `function() {}` |
| `Date` | `new Date()` |
| `Map` | `new Map()` |
| `Set` | `new Set()` |
| `Promise` | `new Promise(...)` |

---

### Promises

A Promise represents the result of an asynchronous operation.

#### States

| State | Description |
|-------|-------------|
| `pending` | Initial state, operation in progress |
| `fulfilled` | Operation completed successfully |
| `rejected` | Operation failed |

#### Creating a Promise

```ts
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("done")
  }, 1000)
})
```

#### Consuming with `.then()`

```ts
promise.then(result => {
  console.log(result)
})
```

#### Modern async/await Syntax

```ts
async function run() {
  const result = await promise
  console.log(result)
}
```

#### Real-World Example

```ts
const res = await fetch("/api/users")
const data = await res.json()
```

#### Chaining

```ts
Promise.resolve(5)
  .then(x => x * 2)
  .then(console.log) // 10
```

---

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

## Node.js & Package Management

### What is Node.js?

Node.js is a **JavaScript runtime** built on Chrome's V8 engine. It allows you to run JavaScript **outside the browser** (on servers, CLI tools, etc.).

| Feature | Browser JS | Node.js |
|---------|-----------|---------||
| DOM access | ✅ | ❌ |
| `window` object | ✅ | ❌ |
| `document` object | ✅ | ❌ |
| File system access | ❌ | ✅ |
| `process` object | ❌ | ✅ |
| `require`/`import` modules | ✅ (ESM) | ✅ (both) |

**Key Point:** Node.js is **single-threaded** but uses an **event loop** for async I/O (same concept as browser JS).

---

### npm vs npx vs yarn vs pnpm

| Tool | Purpose |
|------|---------||
| `npm` | **Node Package Manager** — installs, manages, and publishes packages |
| `npx` | **Executes** packages without installing globally (e.g., `npx create-react-app`) |
| `yarn` | Alternative to npm (faster, deterministic installs, by Facebook) |
| `pnpm` | Performant npm — uses symlinks, saves disk space |

**Interview Tip:** Know that `npx` is useful for running one-off commands without polluting global installs.

```bash
# npm - install then run
npm install -g create-react-app
create-react-app my-app

# npx - run directly without global install
npx create-react-app my-app
```

---

### package.json

The **manifest file** for your project. Contains metadata, dependencies, and scripts.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "jest": "^29.0.0"
  }
}
```

| Field | Description |
|-------|-------------|
| `name` | Package name (must be unique if publishing) |
| `version` | Current version (semver) |
| `main` | Entry point for CommonJS |
| `module` | Entry point for ES Modules |
| `type` | `"module"` for ESM, `"commonjs"` (default) for CJS |
| `scripts` | Custom commands run via `npm run <name>` |
| `dependencies` | Production packages |
| `devDependencies` | Development-only packages |

---

### Dependencies vs DevDependencies

| Type | Install Command | Purpose | Included in Production? |
|------|-----------------|---------|------------------------|
| `dependencies` | `npm install lodash` | Required at runtime | ✅ Yes |
| `devDependencies` | `npm install -D jest` | Development/build tools | ❌ No |

**Examples:**

| dependencies | devDependencies |
|--------------|------------------|
| react, express, axios | typescript, jest, eslint |
| lodash, moment | webpack, vite, prettier |

**Interview Question:** "Why separate them?"
- Smaller production bundles
- Faster installs in CI/CD (`npm install --production`)
- Clear distinction of what's needed at runtime

---

### Semantic Versioning (SemVer)

Format: `MAJOR.MINOR.PATCH` (e.g., `4.18.2`)

| Part | When to Increment | Example |
|------|-------------------|----------|
| **MAJOR** | Breaking changes | `4.0.0` → `5.0.0` |
| **MINOR** | New features (backward compatible) | `4.18.0` → `4.19.0` |
| **PATCH** | Bug fixes (backward compatible) | `4.18.2` → `4.18.3` |

#### Version Ranges in package.json

| Symbol | Meaning | Example | Matches |
|--------|---------|---------|----------|
| `^` (caret) | Compatible with version | `^4.18.0` | `4.18.0` to `<5.0.0` |
| `~` (tilde) | Approximately equivalent | `~4.18.0` | `4.18.0` to `<4.19.0` |
| `*` | Any version | `*` | Latest |
| `>=`, `<` | Range | `>=4.0.0 <5.0.0` | Explicit range |
| (none) | Exact version | `4.18.2` | Only `4.18.2` |

**Interview Tip:** `^` is the default when you `npm install`. It allows minor and patch updates.

---

### package-lock.json

**Purpose:** Locks the **exact versions** of all dependencies (including nested ones).

| package.json | package-lock.json |
|--------------|-------------------|
| `"express": "^4.18.0"` | `"express": "4.18.2"` (exact) |
| Version ranges | Exact resolved versions |
| Human-editable | Auto-generated |
| Commit? Yes | Commit? **Yes** |

**Why commit it?**
- Ensures everyone gets the **same versions**
- Reproducible builds across machines/CI
- Prevents "works on my machine" issues

**Interview Question:** "What happens if you delete `package-lock.json`?"
- npm will resolve versions again based on `package.json` ranges
- You might get different (newer) versions
- Could introduce bugs or breaking changes

---

### node_modules

The folder where all installed packages live.

**Key Points:**
- **Never commit to git** (add to `.gitignore`)
- Can be **huge** (hundreds of MB)
- Recreated with `npm install`
- Contains all dependencies AND their dependencies (nested)

```bash
# Typical .gitignore
node_modules/
.env
dist/
```

**Interview Question:** "Why not commit node_modules?"
- Too large
- Platform-specific binaries
- `package-lock.json` already guarantees reproducibility

---

### Common npm Commands

| Command | Description |
|---------|-------------|
| `npm init` | Create `package.json` interactively |
| `npm init -y` | Create `package.json` with defaults |
| `npm install` | Install all dependencies from `package.json` |
| `npm install <pkg>` | Install and add to `dependencies` |
| `npm install -D <pkg>` | Install and add to `devDependencies` |
| `npm install -g <pkg>` | Install globally |
| `npm uninstall <pkg>` | Remove a package |
| `npm update` | Update packages to latest allowed version |
| `npm outdated` | Check for outdated packages |
| `npm run <script>` | Run a script from `package.json` |
| `npm start` | Run the `start` script (shortcut) |
| `npm test` | Run the `test` script (shortcut) |
| `npm ls` | List installed packages |
| `npm cache clean --force` | Clear npm cache |

---

### ES Modules vs CommonJS

| Feature | CommonJS (CJS) | ES Modules (ESM) |
|---------|----------------|------------------|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| File extension | `.js` (default) | `.mjs` or `.js` with `"type": "module"` |
| Top-level await | ❌ | ✅ |
| Browser support | ❌ | ✅ |
| Tree-shaking | ❌ | ✅ |

#### CommonJS (older, Node.js default)

```js
// Exporting
module.exports = { add, subtract }
module.exports.add = (a, b) => a + b

// Importing
const { add } = require('./math')
const express = require('express')
```

#### ES Modules (modern, recommended)

```js
// Exporting
export const add = (a, b) => a + b
export default function subtract(a, b) { return a - b }

// Importing
import { add } from './math.js'
import subtract from './math.js'
import * as math from './math.js'
```

**Interview Tip:** Know the difference! ESM is the future, but many Node.js projects still use CommonJS.

---

### Environment Variables

Used to store configuration, secrets, and environment-specific values.

#### Accessing in Node.js

```js
const port = process.env.PORT || 3000
const apiKey = process.env.API_KEY
```

#### .env Files

Use `dotenv` package to load `.env` files:

```bash
# .env file
PORT=3000
API_KEY=secret123
DATABASE_URL=postgres://localhost/db
```

```js
import 'dotenv/config'
// or
require('dotenv').config()

console.log(process.env.PORT) // "3000"
```

**Security Rules:**
- **Never commit `.env`** to git (add to `.gitignore`)
- Use `.env.example` to document required variables (without values)
- Different `.env` files for different environments (`.env.local`, `.env.production`)

---

## License

MIT

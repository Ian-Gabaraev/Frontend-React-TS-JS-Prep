# Frontend Interview Prep: JavaScript & TypeScript

> A comprehensive guide to JavaScript and TypeScript concepts commonly asked in frontend interviews.

### 🧠 [Take the Interactive Quiz →](quiz.html)

Test your knowledge with the interactive quiz! Multiple choice questions covering JS gotchas, TypeScript, React, and Node.js.

---

## Table of Contents

- [Quick Reference](#quick-reference)
- [React Gotchas](#react-gotchas)
  - [Reconciliation & Virtual DOM](#reconciliation--virtual-dom)
  - [setState Batching & Stale State](#setstate-batching--stale-state)
  - [Props vs State](#props-vs-state)
  - [Controlled Components](#controlled-components)
  - [Lifting State Up](#lifting-state-up)
  - [Mutating State Reference](#mutating-state-reference)
  - [useEffect Dependencies](#useeffect-dependencies)
  - [useEffect Cleanup](#useeffect-cleanup)
  - [Keys in Lists](#keys-in-lists)
  - [Rules of Hooks](#rules-of-hooks)
  - [Async in useEffect](#async-in-useeffect)
- [JavaScript Gotchas](#javascript-gotchas)
  - [[] == ![]](#---)
  - [Arrow Function Block Body](#arrow-function-block-body)
  - [typeof null](#typeof-null)
  - [typeof Array](#typeof-array)
  - [Empty Array Addition](#empty-array-addition)
  - [Event Loop](#event-loop)
  - [Spread and Shallow Copy](#spread-and-shallow-copy)
  - [this in Arrow Functions](#this-in-arrow-functions)
  - [Timeout with var](#timeout-with-var)
  - [Closures](#closures)
  - [Object Reference Assignment](#object-reference-assignment)
  - [Array.sort() Default Behavior](#arraysort-default-behavior)
  - [NaN Comparisons](#nan-comparisons)
  - [Floating Point Precision](#floating-point-precision)
  - [const with Objects](#const-with-objects)
  - [Temporal Dead Zone](#temporal-dead-zone-tdz)
  - [parseInt Radix](#parseint-radix)
  - [Hoisting Differences](#hoisting-differences)
  - [delete Keyword](#delete-keyword)
- [Core JavaScript Concepts](#core-javascript-concepts)
  - [OOP in JavaScript](#oop-in-javascript)
  - [Data Types](#data-types)
  - [Promises](#promises)
  - [Hoisting](#hoisting)
  - [this Binding](#this-binding)
  - [Prototype Chain](#prototype-chain)
  - [Event Bubbling and Capturing](#event-bubbling-and-capturing)
  - [Debounce and Throttle](#debounce-and-throttle)
  - [Error Handling](#error-handling)
  - [Optional Chaining](#optional-chaining-)
  - [Arrow Functions](#arrow-functions)
  - [Single-Threaded Nature](#is-js-single-threaded)
  - [Microtasks vs Macrotasks](#microtasks-and-macrotasks)
  - [Pass by Value vs Reference](#are-objects-passed-by-value-or-reference)
  - [Equality Operators](#equality-operators--vs-)
  - [Nullish Coalescing](#nullish-coalescing)
- [Common Methods Quick Reference](#common-methods-quick-reference)
  - [Array Methods](#array-methods)
  - [String Methods](#string-methods)
  - [Object Methods](#object-methods)
  - [Promise Methods](#promise-methods)
  - [Set & Map](#set--map)
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
  - [Required](#requiredt)
  - [Readonly](#readonlyt)
  - [ReturnType](#returntypet)
  - [Parameters](#parameterst)
  - [Type Guards](#type-guards)
  - [as const Assertions](#as-const-assertions)
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
- [React](#react)
  - [The React Mental Model](#the-react-mental-model)
  - [State In-Depth](#state-in-depth)
  - [Props In-Depth](#props-in-depth)
  - [Re-rendering In-Depth](#re-rendering-in-depth)
  - [What is React?](#what-is-react)
  - [JSX](#jsx)
  - [Components](#components)
  - [Props](#props)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useRef](#useref)
  - [useMemo and useCallback](#usememo-and-usecallback)
  - [useContext](#usecontext)
  - [Custom Hooks](#custom-hooks)
  - [Controlled vs Uncontrolled](#controlled-vs-uncontrolled-components)
  - [Keys in Lists](#keys-in-lists)
  - [Virtual DOM](#virtual-dom)
  - [Component Lifecycle](#component-lifecycle)
  - [React.memo](#reactmemo)
  - [Fragments](#fragments)
  - [Higher-Order Components](#higher-order-components-hoc)
  - [Error Boundaries](#error-boundaries)
  - [Suspense and Lazy Loading](#suspense-and-lazy-loading)
  - [Portals](#portals)
  - [Strict Mode](#strict-mode)
  - [Common Interview Questions](#common-react-interview-questions)

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install a package (e.g., `npm create vite@latest`) |
| `npx` | Run a command (e.g., `npx create-react-app .`) |

---

## React Gotchas

### Reconciliation & Virtual DOM

React uses a **Virtual DOM** — a lightweight in-memory representation of the actual DOM.

**How it works:**

```
State/Props change
       ↓
React creates NEW virtual DOM tree
       ↓
Diffing: Compare new vs old virtual DOM
       ↓
Calculate minimal set of changes
       ↓
Batch update real DOM (reconciliation)
```

**Why?** Direct DOM manipulation is expensive. React's **diffing algorithm** compares virtual DOM trees and updates only what changed.

| Concept | Description |
|---------|-------------|
| **Virtual DOM** | JavaScript object mirroring DOM structure |
| **Diffing** | Algorithm comparing two virtual DOM trees |
| **Reconciliation** | Process of updating real DOM with minimal changes |

> **Key insight:** React assumes elements with the same `key` are the same element. That's why stable keys matter for lists!

---

### setState Batching & Stale State

**Problem:** Multiple `setState` calls using the current state value don't accumulate.

```ts
const [items, setItems] = useState([])

function addItem(item) {
  setItems([...items, item])  // items = []
  setItems([...items, item])  // items = [] (still!)
}
// Result: Only ONE item added, not two!
```

**Why?** Inside a single render, `items` is a **snapshot** — it doesn't change mid-function. Both calls use the same stale `[]` value.

| What Happens | Value of `items` |
|--------------|------------------|
| First `setItems` | `[]` → schedules `[item]` |
| Second `setItems` | `[]` → schedules `[item]` (overwrites!) |
| After re-render | `[item]` (only one) |

**Solution:** Use **functional updates** to access the latest state:

```ts
function addItem(item) {
  setItems(prev => [...prev, item])  // prev = []
  setItems(prev => [...prev, item])  // prev = [item] ✓
}
// Result: TWO items added correctly!
```

> **Rule:** When new state depends on previous state, always use `setState(prev => newValue)`.

---

### Props vs State

| Aspect | Props | State |
|--------|-------|-------|
| **Source** | Passed from parent | Managed inside component |
| **Mutability** | Read-only (immutable) | Can change via `setState` |
| **On Change** | Parent re-renders child | Component re-renders |
| **Ownership** | Parent owns | Component owns |

```tsx
// Props: received from parent
function Greeting({ name }) {        // ← props
  return <h1>Hello, {name}!</h1>
}

// State: managed internally  
function Counter() {
  const [count, setCount] = useState(0)  // ← state
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

> **Key insight:** Props flow **down**, events flow **up**. State triggers re-renders when it changes.

---

### Controlled Components

A **controlled component** is a form input whose value is controlled by React state.

```tsx
const [species, setSpecies] = useState("")

<input
  value={species}                          // ← value FROM state
  onChange={(e) => setSpecies(e.target.value)}  // ← updates state
/>
```

**Data Flow:**

```
User types → onChange fires → setState updates → React re-renders → input shows new value
```

| Type | Source of Truth | Example |
|------|-----------------|---------|
| **Controlled** | React state | `<input value={state} onChange={...} />` |
| **Uncontrolled** | DOM | `<input ref={inputRef} />` |

> **Best practice:** Use controlled components for form validation, conditional disabling, and enforcing input formats.

---

### Lifting State Up

**Question:** Why does state live in `App` and not in child components like `BatLogForm` or `ActivityTable`?

**Answer:** Both components need access to the same data.

React uses **unidirectional (top-down) data flow**:
- State lives in the **nearest common ancestor**
- Data flows down via **props**
- Events flow up via **callbacks**

```
BatLogForm ──callback──→ App (state) ──props──→ ActivityTable
```

This pattern is called **"lifting state up"** — move state to the component that needs to share it with others.

---

### Mutating State Reference

Why will this not make React re-render the component?

```ts
logs.push("D")
setLogs(logs)
```

Because react does not care about the content, it cares about references.

Internally, react does this:

```ts
if (oldState === newState)
    skip render
else
    render
```

So when you do this

```ts
setLogs(logs)
```

Logs is still the same array object in memory. `You mutated it`, but the `reference didn't change`.

---

### useEffect Dependencies

**Question:** What's the difference between these?

```tsx
// 1. No dependency array
useEffect(() => {
  console.log("runs")
})

// 2. Empty dependency array
useEffect(() => {
  console.log("runs")
}, [])

// 3. With dependencies
useEffect(() => {
  console.log("runs")
}, [count])
```

**Answer:**

| Syntax | When it runs |
|--------|--------------|
| No array | **Every render** |
| `[]` | **Mount only** (once) |
| `[count]` | **Mount + when count changes** |

**Common mistake:** Forgetting dependencies causes stale closures:

```tsx
// ❌ Bug: always logs initial count
useEffect(() => {
  setInterval(() => console.log(count), 1000)
}, [])  // count is stale!

// ✅ Fix: include count in deps
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000)
  return () => clearInterval(id)
}, [count])
```

---

### useEffect Cleanup

**Question:** When does the cleanup function run?

```tsx
useEffect(() => {
  const subscription = subscribe()
  
  return () => {
    subscription.unsubscribe()  // Cleanup
  }
}, [])
```

**Answer:** 
- On **unmount** (component removed from DOM)
- **Before** the next effect runs (if deps changed)

**Why cleanup matters:**

```tsx
// ❌ Memory leak - timer keeps running after unmount
useEffect(() => {
  setInterval(() => setCount(c => c + 1), 1000)
}, [])

// ✅ Proper cleanup
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(id)
}, [])
```

---

### Keys in Lists

**Question:** Why is using array index as key problematic?

```tsx
// ❌ Bad: index as key
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// ✅ Good: unique stable ID
{items.map(item => (
  <Item key={item.id} data={item} />
))}
```

**Answer:** When items are reordered/removed, React matches by key. Index-based keys cause:

| Problem | What Happens |
|---------|--------------|
| **Wrong component reused** | State gets mixed up |
| **Incorrect animations** | Wrong elements animate |
| **Input values lost** | Focus jumps, values reset |

**Rule:** Keys should be **stable, unique, and derived from data**, not position.

---

### Rules of Hooks

**Question:** What's wrong with this code?

```tsx
function Component({ showExtra }) {
  const [count, setCount] = useState(0)
  
  if (showExtra) {
    const [extra, setExtra] = useState('')  // ❌ ERROR!
  }
  
  return <div>{count}</div>
}
```

**Answer:** Hooks called conditionally breaks React!

**Rules of Hooks:**

1. ✅ Only call hooks at the **top level** (not in loops, conditions, nested functions)
2. ✅ Only call hooks from **React functions** (components or custom hooks)

**Why?** React relies on hook **call order** to track state. Conditional hooks change the order.

**Fix:**

```tsx
function Component({ showExtra }) {
  const [count, setCount] = useState(0)
  const [extra, setExtra] = useState('')  // Always called
  
  // Use the value conditionally instead
  return (
    <div>
      {count}
      {showExtra && <input value={extra} onChange={...} />}
    </div>
  )
}
```

---

### Async in useEffect

**Question:** Why doesn't this work?

```tsx
// ❌ Wrong
useEffect(async () => {
  const data = await fetchData()
  setData(data)
}, [])
```

**Answer:** `useEffect` expects the callback to return nothing or a cleanup function. `async` functions return a Promise.

**Fix:** Define the async function inside:

```tsx
// ✅ Correct
useEffect(() => {
  async function loadData() {
    const data = await fetchData()
    setData(data)
  }
  loadData()
}, [])

// ✅ Or use IIFE
useEffect(() => {
  (async () => {
    const data = await fetchData()
    setData(data)
  })()
}, [])
```

---

## JavaScript Gotchas

### [] == ![]

What is the output?

```ts
console.log([] == ![])
```

Surprisingly, it is `true`. In JavaScript, all objects are truthy, including arrays. So `![]` is the same as `!true`. Then coercion happens. And now `[] == !true`. Now `[]` is considered `0`. So `0 == false`. And that is true. JS is insane.

### Arrow Function Block Body

**Question:** What does this output?

```ts
const nums = [1, 2, 3]

const result = nums.map(n => {
  n * 2
})

console.log(result)
```

**Answer:** `[undefined, undefined, undefined]` (not `[2, 4, 6]`!)

**Why?** Arrow functions with `{}` have a **block body**, not an expression body. You must explicitly `return` a value.

```ts
// ❌ Block body without return
n => {
  n * 2
}

// ✅ Block body with return
n => {
  return n * 2
}

// ✅ Expression body (implicit return)
n => n * 2
```

---

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

### Spread and Shallow Copy

**Question:** What does this output?

```ts
const user = {
  name: "Ian",
  skills: ["JS"]
}

const copy = { ...user }
copy.skills.push("React")

console.log(user.skills)
```

**Answer:** `["JS", "React"]`

**Why?** Spread (`...`) creates a **shallow copy**. Nested objects/arrays are still references to the original.

| Level | Copied? |
|-------|--------|
| Top-level primitives | ✅ Yes (by value) |
| Nested objects/arrays | ❌ No (same reference) |

**Fix:** Deep clone for nested objects:

```ts
// Using structuredClone (modern)
const deepCopy = structuredClone(user)

// Using JSON (has limitations)
const deepCopy = JSON.parse(JSON.stringify(user))
```

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

**Key Point:** Arrow functions **do NOT have their own `this`**. They inherit it from the enclosing scope.

#### When Arrow Functions Work for `this`

```ts
const user = {
  name: "Ian",
  greet() {
    // Arrow function inherits `this` from greet()
    return () => {
      console.log(this.name) // "Ian"
    }
  }
}

const fn = user.greet()
fn() // Works! Prints "Ian"
```

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

### Array.sort() Default Behavior

**Question:** What does this output?

```ts
const nums = [10, 5, 40, 25, 100]
console.log(nums.sort())
```

**Answer:** `[10, 100, 25, 40, 5]` (not `[5, 10, 25, 40, 100]`!)

**Why?** `sort()` converts elements to **strings** and sorts lexicographically by default.

**Fix:** Always provide a compare function for numbers:

```ts
nums.sort((a, b) => a - b)  // Ascending: [5, 10, 25, 40, 100]
nums.sort((a, b) => b - a)  // Descending: [100, 40, 25, 10, 5]
```

---

### NaN Comparisons

**Question:** What does this output?

```ts
console.log(NaN === NaN)
console.log(NaN == NaN)
```

**Answer:** Both are `false`!

**Why?** `NaN` is the **only** JavaScript value not equal to itself. This is by IEEE 754 floating-point spec.

**How to check for NaN:**

```ts
// ❌ Don't use
x === NaN  // Always false

// ✅ Use these
Number.isNaN(x)     // Recommended (strict)
isNaN(x)            // Coerces to number first
Object.is(x, NaN)   // Also works
```

---

### Floating Point Precision

**Question:** What does this output?

```ts
console.log(0.1 + 0.2 === 0.3)
```

**Answer:** `false`!

**Why?** `0.1 + 0.2` equals `0.30000000000000004` due to binary floating-point representation.

**Fix:** Compare with tolerance:

```ts
const isEqual = Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON
```

---

### const with Objects

**Question:** Does this throw an error?

```ts
const user = { name: "Ian" }
user.name = "John"
```

**Answer:** No! It works fine.

**Why?** `const` prevents **reassignment**, not **mutation**. The binding is constant, but the object's properties can change.

```ts
const user = { name: "Ian" }
user.name = "John"     // ✅ OK - mutating property
user = { name: "Bob" } // ❌ TypeError - reassigning const
```

**To make object immutable:**

```ts
const user = Object.freeze({ name: "Ian" })
user.name = "John"  // Silently fails (or throws in strict mode)
```

---

### Temporal Dead Zone (TDZ)

**Question:** What does this output?

```ts
console.log(x)
let x = 5
```

**Answer:** `ReferenceError: Cannot access 'x' before initialization`

**Why?** `let` and `const` are hoisted but **not initialized**. The time between entering scope and declaration is the **Temporal Dead Zone**.

| Declaration | Hoisted? | Initialized? | TDZ? |
|-------------|----------|--------------|------|
| `var` | ✅ | ✅ (as `undefined`) | ❌ |
| `let` | ✅ | ❌ | ✅ |
| `const` | ✅ | ❌ | ✅ |
| `function` | ✅ | ✅ (full function) | ❌ |

---

### parseInt Radix

**Question:** What does this output?

```ts
console.log(parseInt("08"))
console.log(parseInt("08", 10))
```

**Answer:** Both return `8` in modern browsers, but historically `parseInt("08")` could return `0` (octal parsing).

**Best practice:** Always specify the radix:

```ts
parseInt("08", 10)   // 8 - explicitly base 10
parseInt("1010", 2)  // 10 - binary
parseInt("ff", 16)   // 255 - hexadecimal
```

---

### Hoisting Differences

**Question:** What's the difference?

```ts
// Function Declaration - fully hoisted
sayHi()  // ✅ Works!
function sayHi() { console.log("Hi") }

// Function Expression - only variable hoisted
sayBye() // ❌ TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye") }
```

**Summary:**

| Type | Hoisted | Usable Before Declaration |
|------|---------|---------------------------|
| Function Declaration | ✅ Whole function | ✅ Yes |
| Function Expression (var) | ✅ Variable only (as `undefined`) | ❌ No |
| Function Expression (let/const) | ✅ Variable only | ❌ No (TDZ) |
| Arrow Function | Same as expression | ❌ No |

---

### delete Keyword

**Question:** What does this output?

```ts
const obj = { a: 1 }
console.log(delete obj.a)
console.log(obj.a)

let x = 5
console.log(delete x)
```

**Answer:** `true`, `undefined`, `false`

**Why?** 
- `delete` removes object properties and returns `true`
- `delete` on variables returns `false` (doesn't work)
- After deletion, accessing the property returns `undefined`

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

### Hoisting

**Hoisting** moves declarations to the top of their scope during compilation.

```ts
console.log(x) // undefined (not ReferenceError)
var x = 5

console.log(y) // ReferenceError: Cannot access 'y' before initialization
let y = 5
```

| Declaration | Hoisted? | Initialized? |
|-------------|----------|-------------|
| `var` | ✅ | As `undefined` |
| `let` / `const` | ✅ | ❌ (TDZ) |
| `function` | ✅ | ✅ (fully) |
| `class` | ✅ | ❌ (TDZ) |

**Temporal Dead Zone (TDZ):** The period between entering a scope and the variable being declared. Accessing `let`/`const` in TDZ throws an error.

---

### this Binding

`this` depends on **how** a function is called, not where it's defined.

| Context | `this` Value |
|---------|-------------|
| Global (non-strict) | `window` / `global` |
| Global (strict) | `undefined` |
| Object method | The object |
| Arrow function | Lexical (inherited) |
| `new` constructor | The new instance |
| `call`/`apply`/`bind` | Explicitly set |

#### call, apply, bind

```ts
function greet(greeting) {
  return `${greeting}, ${this.name}`
}

const user = { name: "Ian" }

// call - invoke immediately, args as list
greet.call(user, "Hello")        // "Hello, Ian"

// apply - invoke immediately, args as array
greet.apply(user, ["Hi"])        // "Hi, Ian"

// bind - returns new function with bound `this`
const boundGreet = greet.bind(user)
boundGreet("Hey")                // "Hey, Ian"
```

---

### Prototype Chain

Every object has a hidden `[[Prototype]]` link to another object.

```ts
const animal = { eats: true }
const dog = Object.create(animal)
dog.barks = true

console.log(dog.eats)   // true (inherited from animal)
console.log(dog.barks)  // true (own property)
```

**Prototype Chain:**
```
dog -> animal -> Object.prototype -> null
```

**Interview Question:** "How does inheritance work in JavaScript?"
- JS uses **prototypal inheritance**, not classical
- Objects inherit directly from other objects
- `class` syntax is just syntactic sugar over prototypes

---

### Event Bubbling and Capturing

When an event occurs on a nested element:

1. **Capturing phase:** Event travels DOWN from `window` to target
2. **Target phase:** Event reaches the target element
3. **Bubbling phase:** Event travels UP from target to `window`

```ts
// Bubbling (default)
element.addEventListener('click', handler)

// Capturing
element.addEventListener('click', handler, true)
// or
element.addEventListener('click', handler, { capture: true })
```

#### Event Delegation

Attach one listener to a parent instead of many to children:

```ts
// Instead of adding listener to each <li>
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent)
  }
})
```

#### stopPropagation vs preventDefault

| Method | Purpose |
|--------|--------|
| `e.stopPropagation()` | Stops event from bubbling/capturing further |
| `e.preventDefault()` | Prevents default browser action (form submit, link navigation) |

---

### Debounce and Throttle

Both limit how often a function executes.

| Technique | Behavior | Use Case |
|-----------|----------|----------|
| **Debounce** | Wait until X ms of inactivity | Search input, resize |
| **Throttle** | Execute at most once per X ms | Scroll, mousemove |

#### Debounce Implementation

```ts
function debounce(fn, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const search = debounce((query) => {
  console.log('Searching:', query)
}, 300)
```

#### Throttle Implementation

```ts
function throttle(fn, limit) {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
```

---

### Error Handling

```ts
try {
  throw new Error("Something went wrong")
} catch (error) {
  console.error(error.message)
} finally {
  console.log("Always runs") // Cleanup code
}
```

#### Async Error Handling

```ts
// With promises
fetch('/api')
  .then(res => res.json())
  .catch(err => console.error(err))

// With async/await
async function fetchData() {
  try {
    const res = await fetch('/api')
    return await res.json()
  } catch (error) {
    console.error('Fetch failed:', error)
  }
}
```

---

### Optional Chaining (?.)

Safely access nested properties without checking each level:

```ts
const user = { profile: { name: "Ian" } }

// Without optional chaining
const name = user && user.profile && user.profile.name

// With optional chaining
const name = user?.profile?.name // "Ian"

// Works with methods and arrays
user?.getAddress?.()
users?.[0]?.name
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

## Common Methods Quick Reference

Quick syntax reference for frequently used JavaScript/TypeScript methods.

### Array Methods

#### map - Transform each element

```ts
const nums = [1, 2, 3]
const doubled = nums.map(n => n * 2)
// [2, 4, 6]

// With index
const indexed = nums.map((n, i) => `${i}: ${n}`)
// ["0: 1", "1: 2", "2: 3"]
```

#### filter - Keep matching elements

```ts
const nums = [1, 2, 3, 4, 5]
const even = nums.filter(n => n % 2 === 0)
// [2, 4]

// With type guard
const strings = mixed.filter((x): x is string => typeof x === 'string')
```

#### reduce - Accumulate to single value

```ts
const nums = [1, 2, 3]
// Sum
const sum = nums.reduce((acc, n) => acc + n, 0) // 6

// Object from array
const users = [{id: 1, name: 'Ian'}, {id: 2, name: 'Ana'}]
const byId = users.reduce((acc, u) => ({ ...acc, [u.id]: u }), {})
// { 1: {id: 1, name: 'Ian'}, 2: {id: 2, name: 'Ana'} }

// Group by
const grouped = items.reduce((acc, item) => {
  const key = item.category
  acc[key] = [...(acc[key] || []), item]
  return acc
}, {})
```

#### find / findIndex - Get first match

```ts
const users = [{id: 1, name: 'Ian'}, {id: 2, name: 'Ana'}]

const user = users.find(u => u.id === 2)       // {id: 2, name: 'Ana'}
const index = users.findIndex(u => u.id === 2) // 1
```

#### some / every - Test conditions

```ts
const nums = [1, 2, 3, 4, 5]

nums.some(n => n > 3)  // true (at least one)
nums.every(n => n > 0) // true (all match)
```

#### includes - Check existence

```ts
const nums = [1, 2, 3]
nums.includes(2)  // true
nums.includes(99) // false
```

#### sort - Sort in place (mutates!)

```ts
const nums = [3, 1, 2]

// Numbers (default sort is alphabetical!)
nums.sort((a, b) => a - b) // [1, 2, 3] ascending
nums.sort((a, b) => b - a) // [3, 2, 1] descending

// Strings
names.sort((a, b) => a.localeCompare(b))

// Objects
users.sort((a, b) => a.age - b.age)
```

#### slice - Copy portion (non-mutating)

```ts
const arr = [1, 2, 3, 4, 5]
arr.slice(1, 3)  // [2, 3] (from index 1 to 3, exclusive)
arr.slice(-2)    // [4, 5] (last 2)
arr.slice()      // [1, 2, 3, 4, 5] (shallow copy)
```

#### splice - Remove/insert (mutates!)

```ts
const arr = [1, 2, 3, 4, 5]
arr.splice(2, 1)        // removes 1 element at index 2 → arr is [1, 2, 4, 5]
arr.splice(2, 0, 'new') // inserts 'new' at index 2
arr.splice(1, 2, 'a', 'b') // replaces 2 elements starting at index 1
```

#### flat / flatMap - Flatten nested arrays

```ts
const nested = [[1, 2], [3, 4]]
nested.flat()      // [1, 2, 3, 4]

const nums = [1, 2, 3]
nums.flatMap(n => [n, n * 2]) // [1, 2, 2, 4, 3, 6]
```

#### concat / spread - Combine arrays

```ts
const a = [1, 2]
const b = [3, 4]

a.concat(b)  // [1, 2, 3, 4]
[...a, ...b] // [1, 2, 3, 4] (preferred)
```

---

### String Methods

#### split / join

```ts
'a,b,c'.split(',')        // ['a', 'b', 'c']
['a', 'b', 'c'].join('-') // 'a-b-c'
```

#### substring / slice

```ts
const str = 'Hello World'
str.substring(0, 5) // 'Hello'
str.slice(-5)       // 'World' (negative = from end)
```

#### includes / startsWith / endsWith

```ts
const str = 'Hello World'
str.includes('World')    // true
str.startsWith('Hello')  // true
str.endsWith('World')    // true
```

#### replace / replaceAll

```ts
'foo bar foo'.replace('foo', 'baz')    // 'baz bar foo' (first only)
'foo bar foo'.replaceAll('foo', 'baz') // 'baz bar baz' (all)
'foo bar foo'.replace(/foo/g, 'baz')   // 'baz bar baz' (regex)
```

#### trim / padStart / padEnd

```ts
'  hello  '.trim()      // 'hello'
'5'.padStart(3, '0')    // '005'
'5'.padEnd(3, '0')      // '500'
```

#### toUpperCase / toLowerCase

```ts
'Hello'.toUpperCase() // 'HELLO'
'Hello'.toLowerCase() // 'hello'
```

---

### Object Methods

#### Object.keys / values / entries

```ts
const user = { name: 'Ian', age: 30 }

Object.keys(user)    // ['name', 'age']
Object.values(user)  // ['Ian', 30]
Object.entries(user) // [['name', 'Ian'], ['age', 30]]
```

#### Object.fromEntries

```ts
const entries = [['name', 'Ian'], ['age', 30]]
Object.fromEntries(entries) // { name: 'Ian', age: 30 }

// Transform object
const doubled = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 2])
)
```

#### Object.assign / spread

```ts
// Merge objects (later wins)
Object.assign({}, objA, objB)
{ ...objA, ...objB } // preferred

// Shallow copy
const copy = { ...original }
```

#### Destructuring with defaults

```ts
const { name, age = 25 } = user
const { name: userName } = user // rename
const { a, ...rest } = obj      // rest
```

---

### Promise Methods

```ts
// Wait for all (fails if any fails)
const results = await Promise.all([fetch(a), fetch(b), fetch(c)])

// Wait for all (never fails, returns status)
const results = await Promise.allSettled([p1, p2, p3])
// [{status: 'fulfilled', value: ...}, {status: 'rejected', reason: ...}]

// First to resolve
const fastest = await Promise.race([p1, p2, p3])

// First to succeed (ignores rejections)
const first = await Promise.any([p1, p2, p3])
```

---

### Set & Map

```ts
// Set - unique values
const set = new Set([1, 2, 2, 3]) // {1, 2, 3}
set.add(4)
set.has(2)    // true
set.delete(2)
[...set]      // convert to array

// Remove duplicates from array
const unique = [...new Set(arr)]

// Map - key-value pairs (any key type)
const map = new Map()
map.set('key', 'value')
map.set(obj, 'works!')  // objects as keys!
map.get('key')          // 'value'
map.has('key')          // true
map.delete('key')

// Iterate
for (const [key, value] of map) { }
```

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

### Required<T>

Makes **all properties required** (opposite of Partial).

```ts
type User = {
  id?: number
  name?: string
}

type RequiredUser = Required<User>
// Result: { id: number; name: string }
```

---

### Readonly<T>

Makes **all properties readonly**.

```ts
type User = {
  id: number
  name: string
}

type ReadonlyUser = Readonly<User>
// Cannot modify properties after creation
```

---

### ReturnType<T>

Extracts the **return type** of a function.

```ts
function getUser() {
  return { id: 1, name: "Ian" }
}

type User = ReturnType<typeof getUser>
// Result: { id: number; name: string }
```

---

### Parameters<T>

Extracts function **parameter types** as a tuple.

```ts
function greet(name: string, age: number) {}

type GreetParams = Parameters<typeof greet>
// Result: [string, number]
```

---

### Type Guards

Narrow types at runtime using type predicates:

```ts
function isString(value: unknown): value is string {
  return typeof value === "string"
}

function process(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase()) // TS knows it's string
  }
}
```

#### Common Type Guards

```ts
// typeof
if (typeof x === "string") { }

// instanceof
if (error instanceof Error) { }

// in operator
if ("name" in obj) { }

// Array.isArray
if (Array.isArray(items)) { }
```

---

### as const Assertions

Makes values **deeply readonly** and infers **literal types**:

```ts
const colors = ["red", "green", "blue"] as const
// Type: readonly ["red", "green", "blue"]
// Without: string[]

const config = {
  endpoint: "/api",
  timeout: 3000
} as const
// All properties are readonly and literal typed
```

**Use case:** Creating union types from arrays:

```ts
const statuses = ["pending", "active", "done"] as const
type Status = typeof statuses[number] // "pending" | "active" | "done"
```

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

## React

### The React Mental Model

Understanding React's core philosophy is crucial for interviews.

#### Declarative vs Imperative

```tsx
// ❌ Imperative (jQuery style) - HOW to do it
const button = document.getElementById('btn')
button.textContent = 'Clicked!'
button.classList.add('active')

// ✅ Declarative (React) - WHAT should be shown
function Button({ isActive }: { isActive: boolean }) {
  return (
    <button className={isActive ? 'active' : ''}>
      {isActive ? 'Clicked!' : 'Click me'}
    </button>
  )
}
```

**Key Insight:** In React, you describe the **end state** of your UI based on data. React figures out how to update the DOM.

#### The Component Tree

```
       App
      /   \
   Header  Main
            |
         UserList
         /   |   \
      User User User
```

- Data flows **DOWN** (parent → child via props)
- Events flow **UP** (child → parent via callbacks)
- Each component is an **isolated unit** with its own state

#### UI = f(state)

The most important formula in React:

```
UI = f(state)
```

- Your UI is a **function of your state**
- When state changes, the UI **automatically** reflects it
- You never manually update the DOM

---

### State In-Depth

State is **data that changes over time** and triggers re-renders.

#### When to Use State

| Use State For | Don't Use State For |
|---------------|---------------------|
| User input | Constant values |
| API responses | Props (use them directly) |
| UI toggles (open/closed) | Derived/computed values |
| Form data | Refs (no re-render needed) |

#### Derived State Anti-Pattern

```tsx
// ❌ BAD: Storing derived state
function UserList({ users }) {
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    setFilteredUsers(users.filter(u => u.name.includes(search)))
  }, [users, search])
  
  return /* ... */
}

// ✅ GOOD: Compute during render
function UserList({ users }) {
  const [search, setSearch] = useState('')
  
  // Derived value - no state needed!
  const filteredUsers = users.filter(u => u.name.includes(search))
  
  return /* ... */
}
```

**Rule:** If you can calculate something from existing state/props, don't store it in state.

#### State Batching

React batches multiple state updates into a single re-render:

```tsx
function handleClick() {
  setCount(c => c + 1)  // Does NOT re-render yet
  setFlag(f => !f)      // Does NOT re-render yet
  setName('Ian')        // NOW React re-renders once
}
```

**Interview Question:** "How many times does this component re-render?"
```tsx
function handleClick() {
  setCount(1)
  setCount(2)
  setCount(3)
}
```
**Answer:** Once! React batches all three into a single re-render with count = 3.

#### State Updates are Asynchronous

```tsx
const [count, setCount] = useState(0)

function handleClick() {
  setCount(count + 1)
  console.log(count) // Still 0! State hasn't updated yet
}
```

**Fix:** Use functional updates or useEffect:

```tsx
// Option 1: Functional update for next value
setCount(prev => {
  console.log(prev + 1)  // Correct value
  return prev + 1
})

// Option 2: useEffect to react to state changes
useEffect(() => {
  console.log(count)  // Runs after count updates
}, [count])
```

#### State vs Ref

| Feature | useState | useRef |
|---------|----------|--------|
| Triggers re-render | ✅ Yes | ❌ No |
| Persists across renders | ✅ Yes | ✅ Yes |
| Use for | UI data | DOM refs, timers, previous values |

---

### Props In-Depth

Props are **read-only data** passed from parent to child.

#### Props are Immutable

```tsx
// ❌ NEVER do this
function Child({ user }) {
  user.name = 'Modified'  // Mutating props!
}

// ✅ Lift state up or use callbacks
function Child({ user, onUpdate }) {
  const handleClick = () => {
    onUpdate({ ...user, name: 'Modified' })
  }
}
```

#### Passing Functions as Props

```tsx
// Parent
function Parent() {
  const [count, setCount] = useState(0)
  
  return <Child onIncrement={() => setCount(c => c + 1)} />
}

// Child
function Child({ onIncrement }: { onIncrement: () => void }) {
  return <button onClick={onIncrement}>Add</button>
}
```

This is how children communicate with parents (events flow up).

#### Prop Types with TypeScript

```tsx
// Define prop types
interface UserCardProps {
  name: string
  age: number
  email?: string  // Optional
  onDelete: (id: string) => void
  children?: React.ReactNode
}

function UserCard({ name, age, email = 'N/A', onDelete, children }: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      {children}
    </div>
  )
}
```

#### Spreading Props

```tsx
// Pass all props to a child
function Button({ className, ...rest }: ButtonProps) {
  return <button className={`btn ${className}`} {...rest} />
}

// Usage
<Button className="primary" onClick={handleClick} disabled>
  Click me
</Button>
```

#### Children Patterns

```tsx
// 1. Simple children
<Card>
  <p>Content</p>
</Card>

// 2. Render props (function as children)
<DataFetcher url="/api/users">
  {(data, loading) => loading ? <Spinner /> : <UserList users={data} />}
</DataFetcher>

// 3. Compound components
<Tabs>
  <Tabs.Tab>Tab 1</Tabs.Tab>
  <Tabs.Panel>Content 1</Tabs.Panel>
</Tabs>
```

---

### Re-rendering In-Depth

Understanding when and why React re-renders is critical for performance.

#### What Triggers a Re-render?

| Trigger | Example |
|---------|---------|
| **State change** | `setState(newValue)` |
| **Props change** | Parent passes new props |
| **Parent re-renders** | Parent re-renders → children re-render |
| **Context change** | Provider value changes |

**Common Misconception:** Changing a variable does NOT trigger a re-render:

```tsx
let count = 0

function Counter() {
  const handleClick = () => {
    count++  // ❌ This does NOT re-render!
    console.log(count)  // Value changes, but UI doesn't update
  }
  
  return <button onClick={handleClick}>{count}</button>
}
```

#### The Re-render Cascade

When a component re-renders, **all its children re-render too** (by default):

```
     App (state changes)
      ↓ re-renders
    Header ← re-renders (even if props didn't change!)
      ↓
    Logo ← re-renders
```

#### Preventing Unnecessary Re-renders

**1. React.memo** - Skip re-render if props unchanged:

```tsx
const ExpensiveChild = React.memo(function ExpensiveChild({ data }) {
  console.log('Rendering...')  // Only logs when 'data' changes
  return <div>{/* expensive render */}</div>
})
```

**2. useCallback** - Stable function reference:

```tsx
// ❌ New function every render → child re-renders
<Child onClick={() => doSomething()} />

// ✅ Stable reference → child can be memoized
const handleClick = useCallback(() => doSomething(), [])
<MemoizedChild onClick={handleClick} />
```

**3. useMemo** - Stable object/array reference:

```tsx
// ❌ New object every render
<Child style={{ color: 'red' }} />

// ✅ Stable reference
const style = useMemo(() => ({ color: 'red' }), [])
<Child style={style} />
```

#### Common Re-render Pitfalls

**Pitfall 1: Inline objects/arrays**

```tsx
// ❌ Creates new array every render
<List items={items.filter(i => i.active)} />

// ✅ Memoize the filtered list
const activeItems = useMemo(() => items.filter(i => i.active), [items])
<List items={activeItems} />
```

**Pitfall 2: Inline functions**

```tsx
// ❌ Creates new function every render
<Button onClick={() => handleClick(id)} />

// ✅ Use useCallback
const handleButtonClick = useCallback(() => handleClick(id), [id])
<Button onClick={handleButtonClick} />
```

**Pitfall 3: Context causes all consumers to re-render**

```tsx
// ❌ All consumers re-render when ANY value changes
const AppContext = createContext({ user: null, theme: 'light', settings: {} })

// ✅ Split contexts by update frequency
const UserContext = createContext(null)
const ThemeContext = createContext('light')
```

#### How to Debug Re-renders

```tsx
// 1. Add console.log in component body
function MyComponent() {
  console.log('MyComponent rendering')
  return <div>...</div>
}

// 2. Use React DevTools Profiler

// 3. Use why-did-you-render library
```

---

### What is React?

React is a **JavaScript library** for building user interfaces, created by Facebook.

| Feature | Description |
|---------|-------------|
| **Component-based** | Build encapsulated components that manage their own state |
| **Declarative** | Describe what UI should look like, React handles the DOM |
| **Virtual DOM** | Efficient updates through diffing algorithm |
| **Unidirectional** | Data flows one way (parent → child) |

**React is a library, not a framework.** It handles only the view layer. You need additional libraries for routing, state management, etc.

---

### JSX

JSX is a **syntax extension** that looks like HTML but compiles to JavaScript.

```tsx
// JSX
const element = <h1 className="title">Hello, {name}!</h1>

// Compiles to
const element = React.createElement('h1', { className: 'title' }, `Hello, ${name}!`)
```

#### JSX Rules

| Rule | Example |
|------|---------|
| Return single root element | Wrap in `<div>` or `<>...</>` |
| Close all tags | `<img />`, `<br />` |
| camelCase attributes | `className`, `onClick`, `htmlFor` |
| JavaScript in curly braces | `{variable}`, `{2 + 2}` |

---

### Components

#### Functional Components (Modern)

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}

// Arrow function
const Greeting = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>
}
```

#### Class Components (Legacy)

```tsx
class Greeting extends React.Component<{ name: string }> {
  render() {
    return <h1>Hello, {this.props.name}!</h1>
  }
}
```

**Interview Tip:** Know both, but functional components with hooks are the modern standard.

---

### Props

Props are **read-only** inputs passed from parent to child.

```tsx
// Parent
<UserCard name="Ian" age={30} isAdmin={true} />

// Child
function UserCard({ name, age, isAdmin }: Props) {
  return <div>{name} is {age} years old</div>
}
```

#### children Prop

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>
}

// Usage
<Card>
  <h1>Title</h1>
  <p>Content</p>
</Card>
```

#### Default Props

```tsx
function Button({ variant = "primary" }: { variant?: string }) {
  return <button className={variant}>Click</button>
}
```

---

### useState

Adds **state** to functional components.

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

#### Important Rules

```tsx
// ✅ Functional update (when new state depends on old)
setCount(prev => prev + 1)

// ❌ Direct mutation (won't trigger re-render)
state.push(item)

// ✅ Create new reference
setItems([...items, newItem])
setUser({ ...user, name: "New Name" })
```

**Interview Question:** "Why can't you mutate state directly?"
- React uses **reference equality** to detect changes
- Mutating doesn't change the reference
- Component won't re-render

---

### useEffect

Handles **side effects**: data fetching, subscriptions, DOM manipulation.

```tsx
import { useEffect, useState } from 'react'

function User({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser)
  }, [userId]) // Re-run when userId changes

  return <div>{user?.name}</div>
}
```

#### Dependency Array

| Dependency | Behavior |
|------------|----------|
| `[]` (empty) | Run once on mount |
| `[a, b]` | Run when `a` or `b` changes |
| No array | Run on every render (avoid!) |

#### Cleanup Function

```tsx
useEffect(() => {
  const subscription = api.subscribe()
  
  return () => {
    subscription.unsubscribe() // Cleanup on unmount
  }
}, [])
```

---

### useRef

Creates a **mutable reference** that persists across renders without causing re-renders.

#### When to Use useRef

| Use Case | Example |
|----------|---------|
| **DOM access** | Focus input, scroll to element, measure size |
| **Store mutable value** | Previous state, timer IDs, counters |
| **Avoid re-renders** | Values that change but don't need UI update |
| **Integration with external libraries** | Store instance of third-party lib |

#### DOM Access

```tsx
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  const focus = () => {
    inputRef.current?.focus()
  }

  return <input ref={inputRef} />
}
```

#### Store Previous Value

```tsx
function Counter() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef<number>()

  useEffect(() => {
    prevCountRef.current = count  // Update after render
  })

  return (
    <div>
      Now: {count}, Before: {prevCountRef.current}
    </div>
  )
}
```

#### Store Timer/Interval IDs

```tsx
function Timer() {
  const intervalRef = useRef<number | null>(null)

  const start = () => {
    intervalRef.current = setInterval(() => console.log('tick'), 1000)
  }

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    return () => stop()  // Cleanup on unmount
  }, [])
}
```

#### Mutable Value (no re-render)

```tsx
function ClickTracker() {
  const countRef = useRef(0)

  const handleClick = () => {
    countRef.current++  // Doesn't trigger re-render!
    console.log(`Clicked ${countRef.current} times`)
  }

  return <button onClick={handleClick}>Click me</button>
}
```

#### useRef vs useState

| Feature | useState | useRef |
|---------|----------|--------|
| **Triggers re-render** | ✅ Yes | ❌ No |
| **Persists across renders** | ✅ Yes | ✅ Yes |
| **Access pattern** | `value` | `ref.current` |
| **Use for** | UI state | DOM refs, timers, previous values |

**Interview Question:** "What's the difference between useRef and useState?"
- `useState`: triggers re-render on change, for data that affects UI
- `useRef`: does NOT trigger re-render, for DOM access or values that shouldn't cause updates

> **Key insight:** If you need to store a value that changes but shouldn't trigger a re-render, use `useRef`. If the value should update the UI, use `useState`.

---

### useMemo and useCallback

Both are for **performance optimization** — memoize values/functions.

#### useMemo - Memoize Values

```tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b]) // Recompute only when a or b changes
```

#### useCallback - Memoize Functions

```tsx
const handleClick = useCallback(() => {
  console.log('Clicked', id)
}, [id]) // New function only when id changes
```

**When to use:**
- `useMemo`: Expensive calculations
- `useCallback`: Passing callbacks to optimized child components

**Interview Tip:** Don't overuse! Premature optimization can hurt performance.

---

### useContext

Share data without prop drilling.

```tsx
// 1. Create context
const ThemeContext = React.createContext('light')

// 2. Provide value
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Navbar />
    </ThemeContext.Provider>
  )
}

// 3. Consume (anywhere in tree)
function Navbar() {
  const theme = useContext(ThemeContext)
  return <nav className={theme}>...</nav>
}
```

---

### Custom Hooks

Extract reusable logic into custom hooks (must start with `use`).

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// Usage
const [name, setName] = useLocalStorage('name', '')
```

---

### Controlled vs Uncontrolled Components

| Type | State Location | Example |
|------|---------------|---------|
| **Controlled** | React state | `<input value={value} onChange={...} />` |
| **Uncontrolled** | DOM (ref) | `<input ref={inputRef} />` |

#### Controlled (Recommended)

```tsx
function Form() {
  const [value, setValue] = useState('')

  return (
    <input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  )
}
```

#### Uncontrolled

```tsx
function Form() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    console.log(inputRef.current?.value)
  }

  return <input ref={inputRef} defaultValue="" />
}
```

---

### Keys in Lists

Keys help React identify which items changed, added, or removed.

```tsx
// ✅ Unique, stable ID
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

// ❌ Index as key (avoid if list can reorder)
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}
```

**Interview Question:** "Why not use index as key?"
- Causes bugs when items are reordered, added, or removed
- React may reuse wrong component instances
- State can get mixed up

---

### Virtual DOM

React maintains a **lightweight copy** of the real DOM in memory.

**Reconciliation Process:**
1. State changes → new Virtual DOM tree created
2. React **diffs** new tree with previous
3. Only changed elements are updated in real DOM

**Why it's fast:**
- Batch updates
- Minimal DOM manipulation
- Efficient diffing algorithm (O(n) complexity)

---

### Component Lifecycle

#### Class Component Lifecycle

| Phase | Methods |
|-------|---------|
| **Mounting** | `constructor` → `render` → `componentDidMount` |
| **Updating** | `render` → `componentDidUpdate` |
| **Unmounting** | `componentWillUnmount` |

#### Hooks Equivalents

| Lifecycle | Hook |
|-----------|------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect(() => () => cleanup, [])` |

---

### React.memo

Prevents re-renders if props haven't changed (shallow comparison).

```tsx
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{/* expensive render */}</div>
})

// Custom comparison
const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id
})
```

---

### Fragments

Group elements without adding extra DOM nodes.

```tsx
// Short syntax
<>
  <Header />
  <Main />
  <Footer />
</>

// With keys (required in loops)
<React.Fragment key={item.id}>
  <dt>{item.term}</dt>
  <dd>{item.description}</dd>
</React.Fragment>
```

---

### Higher-Order Components (HOC)

A function that takes a component and returns an enhanced component.

```tsx
function withLoading<P>(Component: React.ComponentType<P>) {
  return function WithLoadingComponent({ isLoading, ...props }: P & { isLoading: boolean }) {
    if (isLoading) return <div>Loading...</div>
    return <Component {...props as P} />
  }
}

// Usage
const UserListWithLoading = withLoading(UserList)
```

**Note:** Hooks have largely replaced HOCs in modern React.

---

### Error Boundaries

Catch JavaScript errors in child components (class components only).

```tsx
class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

---

### Suspense and Lazy Loading

Load components lazily to reduce bundle size.

```tsx
import { Suspense, lazy } from 'react'

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

---

### Portals

Render children outside the parent DOM hierarchy.

```tsx
import { createPortal } from 'react-dom'

function Modal({ children }: { children: React.ReactNode }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')!
  )
}
```

**Use cases:** Modals, tooltips, dropdowns that need to escape overflow/z-index.

---

### Strict Mode

Development tool that highlights potential problems.

```tsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

**What it does:**
- Double-invokes functions to detect side effects
- Warns about deprecated lifecycle methods
- Warns about legacy string refs
- Detects unexpected side effects

---

### Common React Interview Questions

#### 1. What is the difference between state and props?

| Props | State |
|-------|-------|
| Passed from parent | Local to component |
| Read-only | Mutable via setter |
| Used for configuration | Used for dynamic data |

#### 2. What causes a re-render?

- State change
- Props change
- Parent re-renders
- Context change

#### 3. What is prop drilling and how to avoid it?

**Prop drilling:** Passing props through many levels of components.

**Solutions:**
- Context API
- State management (Redux, Zustand)
- Component composition

#### 4. What are the rules of hooks?

1. Only call hooks at the **top level** (not in loops, conditions)
2. Only call hooks from **React functions** (components or custom hooks)

#### 5. Explain the useEffect cleanup function

```tsx
useEffect(() => {
  const subscription = api.subscribe()
  
  return () => subscription.unsubscribe() // Runs before effect re-runs or unmount
}, [])
```

#### 6. How do you optimize React performance?

- `React.memo` for expensive components
- `useMemo` / `useCallback` for expensive computations
- Lazy loading with `Suspense`
- Virtualization for long lists
- Avoid inline objects/functions as props
- Use production builds

---

## License

MIT

# Destructuring Field Guide

Name: Your Full Name  
Student number: 0000000000

## Run

```sh
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

The starter outputs come from the recorded [`npm run all` session](../outputs.md). The Form 2 output comes from running `js/arrays.mjs` directly. Both parameter files were run for Forms 11, 11b, and 12 and produced matching output.

## Field guide

### Form 1 — Array destructuring by position

**Syntax** `const [lowest, highest] = minMax([4, 9, 2])`

**Example** from [js/arrays.mjs](js/arrays.mjs)

```js
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}

const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest)
```

**Output** `form 1: 2 9`

**Use it when** a function returns several values in a known order.

**Watch out for position.** Each name receives the value at its position in the pattern. A missing item in the returned array gives `undefined`.

### Form 2 — Skipping a position and collecting the rest

**Syntax** `const [, second, ...others] = list`

**Example** from [js/arrays.mjs](js/arrays.mjs)

```js
const [, second, ...others] = [4, 9, 2, 10, 1, 0]
console.log('form 2:', second, others)
```

**Output** `form 2: 9 [ 2, 10, 1, 0 ]`

**Use it when** you need a value at a specific position and all the values after it.

**Watch out for short arrays.** The leading comma skips the first position. If the array ends at the second position, `others` is `[]`.

### Form 5 — Object destructuring by property name

**Syntax** `const { title, status } = task`

**Example** from [js/objects.mjs](js/objects.mjs)

```js
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status)
```

**Output** `form 5: Buy milk todo`

**Use it when** you need a few named properties from a larger object.

**Watch out for misspelled keys.** The names in the pattern are property keys. A misspelled key in JavaScript can give you `undefined`.

### Form 11 — Destructuring a function parameter

**Syntax** `function createTask({ title, status = 'todo' } = {})`

**Example** from [js/params.mjs](js/params.mjs)

```js
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}

const tasks = {
  brew: createTask({ title: 'Brew’i güncelle' }),
  appStore: createTask({ title: 'App Store’u güncelle', status: 'done' })
}

console.log('form 11:', tasks.brew)
console.log('form 11:', tasks.appStore)
```

**Output**

```text
form 11: { title: 'Brew’i güncelle', status: 'todo' }
form 11: { title: 'App Store’u güncelle', status: 'done' }
```

**Use it when** a function takes named options and some fields have defaults.

**Watch out for the two defaults.** The outer `= {}` supplies an options object if the argument is omitted. The inner `= 'todo'` supplies the value for `status`. With no argument, `status` becomes `'todo'` and `title` is `undefined`.

In [ts/params.ts](ts/params.ts), `: TaskInput` follows the entire parameter pattern. The type requires a `title` and allows the caller to omit `status`.

#### Form 11b — Destructuring an array parameter

```js
function formatTask([title, status]) {
  return `${title} (${status})`
}

console.log('form 11b:', formatTask([tasks.brew.title, tasks.brew.status]))
```

**Output** `form 11b: Brew’i güncelle (todo)`

The first tuple position supplies `title` and the second supplies `status`. TypeScript describes the two positions with `[title: string, status: TaskStatus]`.

### Form 12 — Destructuring entries in a loop

**Syntax** `for (const [id, task] of entries)`

**Example** using the `tasks` from Form 11 in [js/params.mjs](js/params.mjs)

```js
for (const [id, task] of Object.entries(tasks)) {
  console.log('form 12 (object):', id, task.title, task.status)
}

const taskMap = new Map(Object.entries(tasks))
for (const [id, task] of taskMap) {
  console.log('form 12 (map):', id, task.title, task.status)
}
```

**Output**

```text
form 12 (object): brew Brew’i güncelle todo
form 12 (object): appStore App Store’u güncelle done
form 12 (map): brew Brew’i güncelle todo
form 12 (map): appStore App Store’u güncelle done
```

**Use it when** a loop needs both the key and the value for each item.

**Watch out for the source of the pairs.** Use `Object.entries()` to get the entry pairs from a plain object. A `Map` yields its entry pairs when you iterate it directly. In both cases, the key comes first and the value comes second.

## TypeScript topics

### T1 — Renaming a property and annotating the pattern

In [ts/types.ts](ts/types.ts), `const { x: horizontal } = point` reads `point.x` into a variable named `horizontal`. A type annotation follows the whole pattern, as in `const { x: horizontal }: { x: number } = point`.

**Output** `T1: 1`

## Pitfalls

### Pitfall 1 — Destructuring `undefined`

In [js/pitfalls.mjs](js/pitfalls.mjs), `const { a } = undefined` throws when JavaScript tries to read a property from `undefined`. The `catch` block prints the type of the error.

**Output** `pitfall 1: TypeError`

## Props and children

### P1 — A component receives one props object

In [js/props.jsx](js/props.jsx), `CardA` reads `props.title` and `props.children`. `CardB` binds the same two properties in its parameter list, combining the object pattern from Form 5 with the parameter pattern from Form 11. In both JSX calls, `title="Hi"` supplies the title and the text between the tags supplies `children`.

```text
A: <section><h2>Hi</h2>text</section>
B: <section><h2>Hi</h2>text</section>
```

The [TypeScript Card](ts/props.tsx) uses `CardProps` with a string `title` and an optional `children?: ReactNode`. Its rendered output is `<section><h2>Hi</h2>text</section>`.

## JavaScript vs TypeScript

| Form | Shared pattern | TypeScript in the starter |
| --- | --- | --- |
| 1 | Bind values by position with `[lowest, highest]`. | [`minMax`](ts/arrays.ts) returns `[number, number]`, so both bindings are inferred as `number`. |
| 5 | Pick fields by name with `{ title, status }`. | [`Task`](ts/objects.ts) defines a string `title` and the allowed `status` values. |
| 11 | Destructure options in the parameter and default `status` to `'todo'`. | [`TaskInput`](ts/params.ts) requires a `title` and makes `status` optional. |
| 12 | Bind the key and value with `[id, task]` on each loop iteration. | [`Object.entries` and `Map`](ts/params.ts) infer a string key and a task with a string `title` and a `TaskStatus`. |

## My own log

- **Running `npm run dev`.** The terminal printed `npm error Missing script: "dev"`. In this project, the `all` script runs both sets of examples.
- **Installing dependencies.** `npm install` added 13 packages and printed `npm warn install-scripts 2 packages have install scripts not yet covered by allowScripts:` for `esbuild` and `fsevents`. The later `npm run all` output includes both the JavaScript and TypeScript examples.
- **Using `*` with `npm install-scripts approve`.** The terminal printed `npm error code ENOMATCH` and `npm error No installed packages match: js, node_modules, package-lock.json, package.json, README.md, ts, tsconfig.json`. The shell expanded `*` into filenames before npm received the arguments.
- **Getting an empty rest array in Form 2.** `minMax([4, 9, 2])` returned `[2, 9]`, so the console printed `form 2: 9 []`. The pattern skipped `2` and bound `9` to `second`, leaving the rest array empty.
- **Swapping values after `console.log`.** The run stopped with `TypeError: Cannot set properties of undefined (setting '2')`. JavaScript read the leading `[` on the swap line as property access on the return value of `console.log`. Starting the swap line with `;` separated the statements in a test run, which printed `form 3p2: 2 1`.

<!-- Add what you expected and learned from each observation in your own words. -->

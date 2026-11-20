# Destructuring Field Guide

## Run

```sh
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

Run these commands from the folder that contains `package.json`. The full console output is in [output.txt](output.txt). The React warning in P3 is printed to standard error.

## Field guide

### Form 1 — Array destructuring by position

**Syntax** `const [quickestUpdate, longestUpdate] = minMax(updateMinutes)`

**Example** from [js/arrays.mjs](js/arrays.mjs)

```js
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}

const updateMinutes = [12, 7, 18]
const [quickestUpdate, longestUpdate] = minMax(updateMinutes)
console.log('form 1 update minutes:', quickestUpdate, longestUpdate)
```

**Output** `form 1 update minutes: 7 18`

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

### Form 3 — Swapping variables

**Syntax** `[a, b] = [b, a]`

**Example** from [js/arrays.mjs](js/arrays.mjs)

```js
let a = 1
let b = 2
console.log('form 3p1:', a, b);
[a, b] = [b, a]
console.log('form 3p2:', a, b)
```

**Output**

```text
form 3p1: 1 2
form 3p2: 2 1
```

**Use it when** two existing variables need to exchange values. The right-hand array captures both old values before the pattern assigns them in order.

**Watch out for statement boundaries.** A line that starts with `[` can continue the previous expression. The terminator after `console.log` makes the swap a separate statement. Both variables must be reassignable.

### Form 4 — Defaults for array positions

**Syntax** `const [c = 1, d = 2] = []`

**Example** from [js/arrays.mjs](js/arrays.mjs)

```js
const [c = 1, d = 2] = []
console.log('form 4:', c, d)
```

**Output** `form 4: 1 2`

**Use it when** optional positions in a sequence have sensible fallback values.

**Watch out for `null`.** An absent position or an explicit `undefined` activates its default. An explicit `null` is kept as the value.

### Form 5 — Object destructuring by property name

**Syntax** `const { title, status } = task`

**Example** from [js/objects.mjs](js/objects.mjs)

```js
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status)

{
  const updateTask = { id: 'brew', title: 'Brew’i güncelle', status: 'todo' }
  const { title, status } = updateTask
  console.log('form 5 update task:', title, status)
}
```

**Output**

```text
form 5: Buy milk todo
form 5 update task: Brew’i güncelle todo
```

**Use it when** you need a few named properties from a larger object.

**Watch out for misspelled keys.** The names in the pattern are property keys. A misspelled key in JavaScript can give you `undefined`.

### Form 6 — Giving a property a local name

**Syntax** `const { title: heading, status: status2 } = task`

**Example** from [js/objects.mjs](js/objects.mjs), using `task` from Form 5

```js
const { title: heading, status: status2 } = task
console.log('form 6:', heading, status2)
```

**Output** `form 6: Buy milk todo`

**Use it when** a property needs a clearer local name or its name is already used in the scope.

**Watch out for the direction.** `title: heading` reads `task.title` into `heading`. The key is on the left and the local variable is on the right.

### Form 7 — Defaults for object properties

**Syntax** `const { priority = 'normal' } = task`

**Example** from [js/objects.mjs](js/objects.mjs)

```js
const { title: title3, priority = 'normal', status: status3 } = task
console.log('form 7:', title3, priority, status3)
```

**Output** `form 7: Buy milk normal todo`

**Use it when** an optional setting has a standard value, such as tasks starting at normal priority.

**Watch out for where the default applies.** `task` has no `priority` key, so the local variable receives `'normal'`. Adding a default to the pattern creates a local binding without adding a property to `task`.

### Form 8 — Collecting the remaining object properties

**Syntax** `const { id, ...others } = task`

**Example** from [js/objects.mjs](js/objects.mjs)

```js
const { id, ...others } = task
console.log('form 8:', id, others)
```

**Output** `form 8: t1 { title: 'Buy milk', status: 'todo' }`

**Use it when** one field needs separate handling and the remaining fields should travel together.

**Watch out for shallow copies.** `others` holds the remaining own enumerable properties in a new object. Nested objects are shared with the original. The `...` collects values in a binding pattern and expands them in an expression such as `{ ...others }`.

### Form 9 — Nested objects and arrays

**Syntax** `const { owner: { name: owner }, os: [os1] } = details`

**Example** from [js/objects.mjs](js/objects.mjs)

```js
const details = {
  owner: { name: 'deniz' },
  os: ['mac', 'windows', 'ubuntu']
}

const { owner: { name: owner }, os: [os1], os: [...os] } = details
console.log('form 9:', owner, os1)
console.log('form 9 all os:', owner, os)
```

**Output**

```text
form 9: deniz mac
form 9 all os: deniz [ 'mac', 'windows', 'ubuntu' ]
```

**Use it when** a nested value and an array item are both needed. This pattern reads `details.owner.name` and `details.os[0]`. Its second read of `os` collects the whole list into a separate array.

**Watch out for missing containers.** The inner object pattern needs `details.owner`. The array patterns need an iterable `details.os`. An existing empty `os` array would give `os1` the value `undefined`.

### Form 10 — Reading a computed key

**Syntax** `const { [key]: value } = task`

**Example** from [js/objects.mjs](js/objects.mjs)

```js
const key = 'status'
const { [key]: value } = task
console.log('form 10:', value)
```

**Output** `form 10: todo`

**Use it when** an expression selects the property at runtime. Here the pattern reads the same value as `task[key]`.

**Watch out for valid keys.** A missing key yields `undefined` in JavaScript. In the typed example, `keyof Task` limits the accepted names to properties declared on `Task`.

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

In [ts/types.ts](ts/types.ts), `const { x: horizontal } = point` reads `point.x` into a variable named `horizontal`. The typed example puts its annotation after the entire pattern with `const { x: typedHorizontal }: { x: number } = point`. Both statements bind the same number under their respective local names.

```text
T1: 1
T1 typed: 1
```

### T2 — Tuples and `as const`

`taskEntry()` returns `[number, string]`, so destructuring gives `taskId` a number type and `taskTitle` a string type. The expression `[2, 'App Store’u güncelle'] as const` creates a readonly tuple type with the literal types `2` and `'App Store’u güncelle'` at those positions.

```text
T2 tuple: 1 Brew’i güncelle
T2 as const: 2 App Store’u güncelle
```

### T3 — Missing array items with `noUncheckedIndexedAccess`

`const [firstTask] = pendingTasks` infers `firstTask` as `string | undefined` because `pendingTasks` is a `string[]` and may be empty. In this example it is empty, so `firstTask ?? 'No task queued'` uses the fallback.

```text
T3: undefined No task queued
```

### T4 — Optional fields and defaults

`TaskOptions` declares `priority?: string`. Reading that property into `rawPriority` gives it the type `string | undefined`. Reading it with `priority = 'normal'` gives the local `priority` the type `string`, since the default handles `undefined`.

```text
T4: undefined normal
```

### T5 — Destructuring a missing property

The line `const { z } = point` tries to read a property outside the declared shape of `point`. A compiler run with the `@ts-expect-error` directive omitted produced this diagnostic.

```text
TS2339 Property 'z' does not exist on type '{ x: number; y: number; }'.
```

The example uses the directive on that line to keep the invalid case visible while still type-checking the project. The fix is `const { y: vertical } = point`, which reads a declared property. At runtime the missing property produces `undefined` and the corrected binding contains `2`.

```text
T5 invalid: undefined
T5 fixed: 2
```

## Pitfalls

### Pitfall 1 — Destructuring `undefined`

In [js/pitfalls.mjs](js/pitfalls.mjs), `const { a } = undefined` throws when JavaScript tries to read a property from `undefined`. The `catch` block prints the type of the error.

**Output** `pitfall 1: TypeError`

### Pitfall 2 — Defaults and `null`

The two object patterns read `priority` from `{ priority: undefined }` and `{ priority: null }`. The first value activates the default `'normal'`. The second is already a value, so the binding receives `null`.

```text
pitfall 2: normal null
```

### Pitfall 3 — Parentheses around an object assignment

At the start of a statement, `{ status }` is parsed as a block. The following `=` then causes a syntax error. The example uses `new Function` to capture that syntax error from a short string. `({ status } = { status: 'done' })` is parsed as an assignment expression and updates the existing variable.

```text
pitfall 3: SyntaxError: Unexpected token '='
pitfall 3 fixed: done
```

### Pitfall 4 — Shared nested objects

`const { owner } = task` copies the reference to the owner object. The identity check `owner === task.owner` prints `true`. Assigning `owner.name = 'Ada'` changes the same object reachable through `task.owner`.

```text
pitfall 4: true Ada
```

### Pitfall 5 — Property names and array positions

The object pattern lists `status` before `title` and still binds each property by its key. The array pattern uses the same names in the same order, so `indexedStatus` receives the title at position zero and `indexedTitle` receives the status at position one. Logging the title variable first exposes the swapped values.

```text
pitfall 5 object: Brew’i güncelle todo
pitfall 5 array: todo Brew’i güncelle
```

## Props and children

### P1 — A component receives one props object

In [js/props.jsx](js/props.jsx), `CardA` reads `props.title` and `props.children`. `CardB` binds the same two properties in its parameter list, combining the object pattern from Form 5 with the parameter pattern from Form 11. In both JSX calls, `title="Hi"` supplies the title and the text between the tags supplies `children`.

```text
A: <section><h2>Hi</h2>text</section>
B: <section><h2>Hi</h2>text</section>
```

In [ts/props.tsx](ts/props.tsx), both `Card` and `CardFromProps` use `CardProps` with a string `title` and an optional `children?: ReactNode`. The destructured component prints first, then the one that reads from the props object.

```text
<section><h2>Hi</h2>text</section>
P1 props object: <section><h2>Hi</h2>text</section>
```

### P2 — JSX content and the `children` prop

The text between `<Card title="Updates">` and `</Card>` arrives in `props.children`. Passing `children="Brew"` explicitly gives the component the same value. Both source files render these cases.

```text
P2 nested: <section><h2>Updates</h2>Brew</section>
P2 explicit: <section><h2>Updates</h2>Brew</section>
```

### P3 — What React renders as children

Strings and numbers render as text. One element becomes one HTML element, and the array in this example renders both elements in order. The `undefined`, `null`, and `false` samples leave the section with just its heading.

```text
P3 string: <section><h2>Child</h2>Brew</section>
P3 number: <section><h2>Child</h2>2</section>
P3 element: <section><h2>Child</h2><strong>Brew</strong></section>
P3 elements: <section><h2>Child</h2><strong>Brew</strong><em>App Store</em></section>
P3 undefined: <section><h2>Child</h2></section>
P3 null: <section><h2>Child</h2></section>
P3 false: <section><h2>Child</h2></section>
```

The JavaScript example passes `renderBrew` directly to `CardB`. React emits `Functions are not valid as a React child.` and leaves the content after the heading empty. In both files, `RenderChild` calls the function and passes its returned element to the card component. The TypeScript version declares the callback as `children: () => ReactNode`.

```text
P3 function direct: <section><h2>Child</h2></section>
P3 function called: <section><h2>Child</h2><strong>Brew</strong></section>
```

### P4 — Forwarding the remaining props

`ForwardedCard` takes `title` and `children` out of the props object. It forwards `rest`, including `aria-label` and the caller's `className`, to each `<section>`. In the first section, `className="task-card"` comes after the spread and wins. In the second, the spread comes last and supplies `className="highlight"`.

```text
P4: <section class="task-card" aria-label="Update task"><h2>Updates</h2>Brew</section><section class="highlight" aria-label="Update task"><h2>Updates</h2>Brew</section>
```

### P5 — Named slots and children

`SlotPanel` puts `header` and `footer` props in fixed positions and uses `children` for the body. Choose named slots when the component owns the placement and markup. `ChildrenPanel` wraps the supplied children in an article. Choose that API when the caller should decide what goes inside the article and in what order.

```text
P5 slots: <article><header>Updates</header><div>Brew</div><footer>Two tasks</footer></article>
P5 children: <article><header>Updates</header><div>Brew</div><footer>Two tasks</footer></article>
```

### P6 — A default value for a prop

`Banner` uses `{ label = 'Updates' }`. An explicit `undefined` activates the default and shows `Updates`. An explicit `null` is kept by destructuring, so React renders the paragraph with empty content.

```text
P6 undefined: <p>Updates</p>
P6 null: <p></p>
```

### P7 — Types for children and forwarded props

- `CardProps` declares `children?: ReactNode`, so a card can omit its children or accept values such as text and JSX elements.
- `PropsWithChildren` adds optional `children` to `SlotPanelProps`. `header` and `footer` are still required by the slot type.
- `ComponentProps<'button'>` gives `TaskButton` native button props. The example forwards `disabled` and `aria-label` and defaults `type` to `'button'`.

```text
P7 optional child: <section><h2>Updates</h2></section>
P7 slots without child: <article><header>Updates</header><div></div><footer>Two tasks</footer></article>
P7 button: <button type="button" disabled="" aria-label="Run updates">Run</button>
```

A separate compiler run tested a function passed directly to `Card`, a `SlotPanel` call with just `header="Updates"`, and a `TaskButton` call with `type="link"`, in that order.

```text
TS2322 Type '() => React.JSX.Element' is not assignable to type 'ReactNode'.
TS2741 Property 'footer' is missing in type '{ header: string; }' but required in type '{ header: ReactNode; footer: ReactNode; }'.
TS2322 Type '"link"' is not assignable to type '"button" | "submit" | "reset" | undefined'.
```

## JavaScript vs TypeScript

The diagnostics below were checked by compiling invalid variations with the project's strict settings.

| Form | Shared pattern | TypeScript type | Example diagnostic |
| --- | --- | --- | --- |
| 1 | Bind values by position with `[quickestUpdate, longestUpdate]`. | [`minMax`](ts/arrays.ts) returns `[number, number]`. | Annotating the result as `[string, number]` gives `TS2322` because the first position is a number. |
| 2 | Skip the first position and collect the rest. | The `number[]` annotation lets `second` be undefined. `others` is a `number[]`. | `second.toFixed()` gives `TS18048`. `'second' is possibly 'undefined'.` |
| 3 | Assign `[b, a]` into `[a, b]`. | `let a = 1` and `let b = 2` infer `number` for both variables. | `[a, b] = [b, 'done']` gives `TS2322`. `Type 'string' is not assignable to type 'number'.` |
| 4 | Fill absent positions using defaults. | `number[]` supplies the element type, and the numeric defaults make each binding a number. | A `'normal'` default in the numeric pattern gives `TS2322`. `Type 'string' is not assignable to type 'number'.` |
| 5 | Pick fields by name with `{ title, status }`. | [`Task`](ts/objects.ts) defines a string `title` and the allowed `status` values. | Picking `description` gives `TS2339`. `Property 'description' does not exist on type 'Task'.` |
| 6 | Read one property into a local variable with a different name. | `heading` has the type of `Task.title`, which is `string`. | Assigning `heading` to a `number` gives `TS2322`. `Type 'string' is not assignable to type 'number'.` |
| 7 | Supply `'normal'` as a fallback. | `priority?: string` allows omission. The default gives the binding type `string`. | Calling `.toUpperCase()` on the optional property without a fallback or guard gives `TS18048`. |
| 8 | Collect the fields left after binding `id`. | TypeScript infers the rest object from the remaining `Task` keys. | `others.id` gives `TS2339` because `id` is absent from the inferred rest type. |
| 9 | Read a nested `name` and the first OS. | `owner` is a string. The array read `os1` may also be undefined. | `os1.toUpperCase()` gives `TS18048`. `'os1' is possibly 'undefined'.` |
| 10 | Use `[key]` to look up the selected property. | `keyof Task` limits the key to the declared fields. | Assigning `'state'` to a `keyof Task` variable gives `TS2322`. `Type '"state"' is not assignable to type 'keyof Task'.` |
| 11 | Destructure options in the parameter and default `status` to `'todo'`. | [`TaskInput`](ts/params.ts) requires a `title` and makes `status` optional. | `createTask({ status: 'todo' })` gives `TS2345` because the required `title` is missing. |
| 12 | Bind the key and value with `[id, task]` on each loop iteration. | [`Object.entries` and `Map`](ts/params.ts) infer a string key and a task with a string `title` and a `TaskStatus`. | Iterating the plain `tasks` object with `for...of` gives `TS2488` because it has no `[Symbol.iterator]()` method. |

## Bonus 4: Git repository

[GitHub repository](https://github.com/Ahmetdoesreal/advanced_web_hw4)

Run the project commands from `starter/` in the cloned repository.

## My own log

- **Running `npm run dev`.** The terminal printed `npm error Missing script: "dev"`. The `scripts` field in `package.json` tells me which names this project supports. Here `all` runs both sets of examples.
- **Installing dependencies.** `npm install` added 13 packages and printed `npm warn install-scripts 2 packages have install scripts not yet covered by allowScripts:` for `esbuild` and `fsevents`. The later `npm run all` output includes both the JavaScript and TypeScript examples. I can check the install result and run the examples to tell whether a warning affects the project.
- **Using `*` with `npm install-scripts approve`.** The terminal printed `npm error code ENOMATCH` and `npm error No installed packages match: js, node_modules, package-lock.json, package.json, README.md, ts, tsconfig.json`. The shell expanded `*` into filenames before npm received the arguments.
- **Getting an empty rest array in Form 2.** `minMax([4, 9, 2])` returned `[2, 9]`, so the console printed `form 2: 9 []`. The pattern skipped `2` and bound `9` to `second`, leaving the rest array empty.
- **Swapping values after `console.log`.** The run stopped with `TypeError: Cannot set properties of undefined (setting '2')`. JavaScript read the leading `[` on the swap line as property access on the return value of `console.log`. Starting the swap line with `;` separated the statements in a test run, which printed `form 3p2: 2 1`. The final example terminates the preceding `console.log` explicitly as well.

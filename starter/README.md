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

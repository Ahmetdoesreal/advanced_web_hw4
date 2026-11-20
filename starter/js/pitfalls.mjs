// Your Name, student number
// Things that surprise people. Run with `node js/pitfalls.mjs`.

// Pitfall 1 (worked example): destructuring undefined or null throws a TypeError.
try {
  const { a } = undefined
  console.log(a)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name) // pitfall 1: TypeError
}

// Pitfall 2: a default only applies to undefined, not to null
const { priority: undefinedPriority = 'normal' } = { priority: undefined }
const { priority: nullPriority = 'normal' } = { priority: null }
console.log('pitfall 2:', undefinedPriority, nullPriority)

// Pitfall 3: assigning without const/let needs parentheses, ({ a } = obj)
try {
  new Function('let status\n{ status } = { status: "done" }')
} catch (error) {
  console.log('pitfall 3:', `${error.name}: ${error.message}`)
}
let status
;({ status } = { status: 'done' })
console.log('pitfall 3 fixed:', status)

// Pitfall 4: it copies references, not deep copies (nested objects are shared)
const task = { owner: { name: 'Deniz' } }
const { owner } = task
owner.name = 'Ada'
console.log('pitfall 4:', owner === task.owner, task.owner.name)

// Pitfall 5: in objects the order does not matter, in arrays it does
const values = { title: 'Brew’i güncelle', status: 'todo' }
const { status: namedStatus, title: namedTitle } = values
const [indexedStatus, indexedTitle] = [values.title, values.status]
console.log('pitfall 5 object:', namedTitle, namedStatus)
console.log('pitfall 5 array:', indexedTitle, indexedStatus)

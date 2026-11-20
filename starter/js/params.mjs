// Your Name, student number
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11 (worked example): an options object in the parameter list, with defaults.
function createTask({ title, status = 'todo' } = {}) {
  return { title, status }
}

const tasks = {
  brew: createTask({ title: 'Brew’i güncelle' }),
  appStore: createTask({ title: 'App Store’u güncelle', status: 'done' })
}

console.log('form 11:', tasks.brew)
console.log('form 11:', tasks.appStore)

// Form 11b: the same idea with an array parameter, ([x, y]) => ...
function formatTask([title, status]) {
  return `${title} (${status})`
}

console.log('form 11b:', formatTask([tasks.brew.title, tasks.brew.status]))

// Form 12: loops over entries, for (const [key, value] of Object.entries(obj)) and a Map
for (const [id, task] of Object.entries(tasks)) {
  console.log('form 12 (object):', id, task.title, task.status)
}

const taskMap = new Map(Object.entries(tasks))
for (const [id, task] of taskMap) {
  console.log('form 12 (map):', id, task.title, task.status)
}

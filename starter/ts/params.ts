// Your Name, student number
// Forms 11 and 12 in TypeScript, and the typing rules for patterns in parameters.

type TaskStatus = 'todo' | 'done'
type TaskInput = { title: string; status?: TaskStatus }

// Form 11 (worked example): the type goes after the whole pattern.
function createTask({ title, status = 'todo' }: TaskInput) {
  return { title, status }
}

const tasks = {
  brew: createTask({ title: 'Brew’i güncelle' }),
  appStore: createTask({ title: 'App Store’u güncelle', status: 'done' })
}

console.log('form 11:', tasks.brew)
console.log('form 11:', tasks.appStore)

// Form 11b
function formatTask([title, status]: [title: string, status: TaskStatus]) {
  return `${title} (${status})`
}

console.log('form 11b:', formatTask([tasks.brew.title, tasks.brew.status]))

// Form 12
for (const [id, task] of Object.entries(tasks)) {
  console.log('form 12 (object):', id, task.title, task.status)
}

const taskMap = new Map(Object.entries(tasks))
for (const [id, task] of taskMap) {
  console.log('form 12 (map):', id, task.title, task.status)
}

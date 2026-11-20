// Your Name, student number
// What only TypeScript adds (topics T1 to T5). See the handout.

// T1 (worked example): `{ a: string }` inside a pattern is a RENAME, not a type.
const point = { x: 1, y: 2 }
const { x: horizontal } = point // x is renamed to horizontal; there is no variable x
console.log('T1:', horizontal) // T1: 1

// T2
function taskEntry(): [number, string] {
  return [1, 'Brew’i güncelle']
}

const [taskId, taskTitle] = taskEntry()
const appStoreEntry = [2, 'App Store’u güncelle'] as const
const [appStoreId, appStoreTitle] = appStoreEntry
console.log('T2 tuple:', taskId, taskTitle)
console.log('T2 as const:', appStoreId, appStoreTitle)

// T3
const pendingTasks: string[] = []
const [firstTask] = pendingTasks
console.log('T3:', firstTask, firstTask ?? 'No task queued')

// T4
type TaskOptions = { priority?: string }
const options: TaskOptions = {}
const { priority: rawPriority, priority = 'normal' } = options
console.log('T4:', rawPriority, priority)

// T5
// @ts-expect-error Property 'z' does not exist on the point object.
const { z } = point
const { y: vertical } = point
console.log('T5 invalid:', z)
console.log('T5 fixed:', vertical)

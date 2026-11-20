// Your Name, student number
// The same six object forms as js/objects.mjs, now typed.

type Task = {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
  priority?: string
}

// Form 5 (worked example)
const task: Task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

{
  const updateTask: Task = { id: 'brew', title: 'Brew’i güncelle', status: 'todo' }
  const { title, status } = updateTask
  console.log('form 5 update task:', title, status)
}

// Form 6
const { title: heading, status: status2 } = task
console.log('form 6:', heading, status2)

// Form 7
const { title: title3, priority = 'normal', status: status3 } = task
console.log('form 7:', title3, priority, status3)

// Form 8
const { id, ...others } = task
console.log('form 8:', id, others)

// Form 9
const details: { owner: { name: string }; os: string[] } = {
  owner: { name: 'deniz' },
  os: ['mac', 'windows', 'ubuntu']
}

const { owner: { name: owner }, os: [os1], os: [...os] } = details
console.log('form 9:', owner, os1)
console.log('form 9 all os:', owner, os)

// Form 10
const key: keyof Task = 'status'
const { [key]: value } = task
console.log('form 10:', value)

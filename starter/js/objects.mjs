// Your Name, student number
// Object destructuring (forms 5 to 10). Run with `node js/objects.mjs`.

// Form 5 (worked example): take properties out of an object by name.
const task = { id: 't1', title: 'Buy milk', status: 'todo' }
const { title, status } = task
console.log('form 5:', title, status) // form 5: Buy milk todo

// Form 6: rename while you take it, { title: heading }
// TODO
const { title:heading, status: status2 } = task
console.log('form 6:',heading,status2)


// Form 7: default values, { priority = 'normal' }
// TODO
const { title:title3,priority='normal',status:status3 } = task
console.log('form 7:',title3,priority,status3)

// Form 8: rest, { id, ...others }
// TODO
const { id, ...others } = task
console.log('form 8:', id, others)

// Form 9: nested patterns, { owner: { name } } and arrays inside objects
// TODO
const details = {
  owner: { name: 'deniz' },
  os: ['mac', 'windows','ubuntu']
}

const { owner: { name: owner }, os: [os1],os:[...os]} = details
console.log('form 9:', owner, os1)
console.log('form 9 all os:', owner, os)

// Form 10: computed key, { [key]: value }
// TODO
const key = 'status'
const { [key]: value } = task
console.log('form 10:', value) // form 10: todo
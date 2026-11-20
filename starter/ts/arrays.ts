// Your Name, student number
// The same four array forms as js/arrays.mjs, now typed. Run with `npx tsx ts/arrays.ts`.

// Form 1 (worked example): the return type of the function is a tuple.
function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

const updateMinutes: number[] = [12, 7, 18]
const [quickestUpdate, longestUpdate] = minMax(updateMinutes)
console.log('form 1 update minutes:', quickestUpdate, longestUpdate)

// Form 2
const [, second, ...others]: number[] = [4, 9, 2, 10, 1, 0]
console.log('form 2:', second, others)

// Form 3
let a = 1
let b = 2
console.log('form 3p1:', a, b);
[a, b] = [b, a]
console.log('form 3p2:', a, b)

// Form 4
const [c = 1, d = 2]: number[] = []
console.log('form 4:', c, d)

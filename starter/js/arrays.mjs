// Your Name, student number
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

// Form 1 (worked example): take values out of an array by position.
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const [lowest, highest] = minMax([4, 9, 2])
console.log('form 1:', lowest, highest) // form 1: 2 9

const updateMinutes = [12, 7, 18]
const [quickestUpdate, longestUpdate] = minMax(updateMinutes)
console.log('form 1 update minutes:', quickestUpdate, longestUpdate)

// Form 2: skip an item and collect the rest, [, second, ...others]
// TODO
const [,second,...others]= [4,9,2,10,1,0]
console.log('form 2:', second, others)


// Form 3: swap two variables without a temporary, [a, b] = [b, a]
// TODO
let a=1
let b=2
console.log('form 3p1:',a,b);
[a,b]=[b,a]
console.log('form 3p2:',a,b)

// Form 4: default values, const [a = 1] = []
// TODO

const [c=1,d=2] = []
console.log('form 4:',c,d)

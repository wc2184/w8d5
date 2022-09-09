function sum() {
    let total = 0
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i]
    }
    return total
}

function sum2(...args) {  //rest operator with the ... like the splat operator on args *args
    let total = 0   
    args.forEach(num => { 
        total += num

    })  
    return total
}

Function.prototype.myBindWrong = function(ctx) { //ctx would be like cat
    // console.log('hi')
    // console.log(arguments)
   //if it was an actually array [1,2,3,3,4].slice() -> this should duplicate the array, in the case where it is like an array, it wont duplicate.
    // let args = Array.from(arguments) //this is another way to copy the array
    // console.log(args)
//    return function() {this.apply(ctx, args.slice(1))} //slice will take the given index and index til the end of the array
    // when it is just the singular 1 in the bracket fro slice it will take it to the very end.
  // Array.slice(1, 6) in ruby it is like the range from the first index to the 6th exclusive of the 6th.

    const fn = this;
    const bindArgs = Array.from(arguments).slice(1); 
    return function _boundFn() {
        const callArgs = Array.from(arguments)
        return fn.apply(ctx, bindArgs.concat(callArgs))
    }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

Function.prototype.myBind = function(ctx) { 
    const fn = this;
    const bindArgs = Array.from(arguments).slice(1);
    // 
    return function() {
        const callArgs = Array.from(arguments)
        return fn.apply(ctx, bindArgs.concat(callArgs))
    }
}
let hi = 'hi'
function addNum(x) {
 
    return function(y){

       return x + y 
    }
}
let addByTwo = addNum(2) //make your own function that you want to pass into addNum()
// console.log(addByTwo(7))

// ------------------------------

function multiplyX(x){

    return function(y){

        return function(z){ 


          return  x * y * z
        }

    }



}

let multiplyFirst = multiplyX(4)
let multiplySecond = multiplyFirst(5)
let multiplyThird = multiplySecond(9)
// console.log(multiplyFirst)



// let multiplyby8 = multiplyX(8)
// // console.log(multiplyTwice(5))

// console.log(multiplyX(3)(4)(5))




// ------------------------------

Function.prototype.curryWRONG = function(x) {
    return function(y) { 

        return function(z) {

            return function(a) {

                return x + y + z + a 

            }

        }
    }
}
let myCurry = () => {}
myCurry = myCurry.curryWRONG(3)
myCurry = myCurry(4)
myCurry = myCurry(2)
myCurry = myCurry(8)

// console.log(myCurry)


// ------------------------------
function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;


}

sumThree(4,20,6)

// let f1 = sumThree.curry(3)
    // f1 = f1(4)(20)(6)

   
// Function.prototype.curry = function(){
//     return function(x){

//         return function(y){


//             return function(z){


//                return x + y + z

//             }
//         }
//     }

// }


//  sumThree.curry(3)(4)(20)(6)
//  console.log(sumThree.curry(3)(4)(20)(6))
//  console.log(sumThree.curry(4)(4)(20)(6)(34))
//  console.log(sumThree.curry(4)(4)(20)(6)(34))










 
 Function.prototype.curry = function(numargs) {
     let args = []
     let fn = this
     
     function myCurry(arg){
         args.push(arg)
         if (args.length == numargs){
             return fn(...args)
            }
            else {
                return myCurry
                
            }
        }
        return myCurry
        
    }
    
    
    console.log(sumThree.curry(4)(4)(20)(6)(34))


















// ------------------------------

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true

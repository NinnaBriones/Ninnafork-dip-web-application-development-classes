// Challenge 6 Starter
// Initialise the array
let numbers = [1, 2, 3, 4, 5];

// Define the arrow function doubleNumbers

const doubleNumbers = (array) => {
let double = array.map(number => number * 2);
return double;

}

// Call the function with the numbers array

let result = doubleNumbers(numbers);


// Console log the new array
console.log(result);

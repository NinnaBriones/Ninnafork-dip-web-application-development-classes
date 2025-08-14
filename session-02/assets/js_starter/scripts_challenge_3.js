// Initialise the array
let numbers = [1, 2, 3, 4, 5, 6];

// Check if the array includes the number 5

if (numbers.includes(5)) {

console.log("true");




// If true, filter out numbers less than 5

let oneToFour = numbers.filter(n => n < 5);
console.log(oneToFour);

// Then square each number in the resulting array

let [first,second,third,fourth] = oneToFour;
let newArray = [first*first,second*second,third*third,fourth*fourth];

// better approach, suggested by chat gpt after me using deconstructing let newArray = oneToFour.map(n => n * n);

// Output the final array
console.log(newArray);


// Output a message if the number 5 is not in the array'

} else {
console.log("The number 5 is not in the array.");
}

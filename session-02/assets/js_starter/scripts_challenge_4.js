// Challenge 4 Starter
// Initialise the array
let numbers = [1, 2, 3, 4, 5, 6];

// Find the index of the number 5 in the array

let five = numbers.findIndex(n => n === 5);
console.log(five);


// If the number 5 is found in the array

  // Console log each number in the array up to and including 5

  if (numbers.includes(5)) {

    let oneToFive = numbers.filter(n => n <= 5);
console.log(oneToFive);


  // Output a message if the number 5 is not in the array
  }
    else
  {
  console.log("Number not in array")
  }


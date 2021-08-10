// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word = input.question("Enter a word to score: ");
  return word;
};

function simpleScore(word) {
  word = word.toLowerCase()
  return word.length; 
}

function vowelBonusScore(word) {
  let total = 0;
  word = word.toLowerCase()

  for (let i = 0; i < word.length; i++) {
   
    if (["a","e","i","o","u"].includes(word[i])) {
      total += 3;
    } else if (!["a", "e", "i", "o", "u"].includes(word[i])) {
      total += 1
    } else {
      total += 0
    }
  }
  return total;
}

function scrabbleScore(word) {
  	word = word.toLowerCase();
	let total = 0;
  for (let i = 0; i < word.length; i++) {
    total += Number(newPointStructure[word[i]]) 
	 
	
  }
 return total
};



let simpleScoreObject = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: simpleScore
};

let vowelBonusScoreObject = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: vowelBonusScore
};

let scrabbleScoreObject = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction: scrabbleScore
};

const scoringAlgorithms = [simpleScoreObject, vowelBonusScoreObject , scrabbleScoreObject];

function scorerPrompt() {
  let scorerSelection

while (!["0","1","2"].includes(scorerSelection)){
  scorerSelection = input.question(
  `Which scoring algorithm would you like to use? \n 
  0 - Simple: One point per character\n
  1 - Vowel Bonus: Vowels are worth 3 points\n
  2 - Scrabble: Uses scrabble point system\n
  Enter 0, 1, or 2: `)
}
  return scoringAlgorithms[Number(scorerSelection)];
}

function transform() {
  let returnObject = {}
  for(pointValues in oldPointStructure) {
    for (i=0; i < oldPointStructure[pointValues].length; i++){
    let letter = (oldPointStructure[pointValues][i]);

    returnObject[letter.toLowerCase()] = pointValues;
    }
  }
  returnObject[" "] = 0;
  return returnObject
};


  
let newPointStructure = transform(oldPointStructure)


function runProgram() {
 let word = initialPrompt();
  let scoringObject = scorerPrompt();
  console.log(`Score For ${word}: ${scoringObject.scoreFunction(word)}`)
}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
  

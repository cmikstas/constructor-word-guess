var fs = require("fs");
var inquirer = require("inquirer");
var Word = require("./word");
var guessesLeft = 9;
var wins = 0;
var losses = 0;
var correctGuess = [];
var incorrectGuess = [];

wordGenerator();

function wordGenerator()
{
    fs.readFile("./word-guess.txt", "utf8", function(error, data)
    {
        // If the code experiences any errors it will log the error to the console.
        if (error)
        {
            return console.log(error);
        }

        var dataArray = data.split("\r\n");
        //console.log(dataArray);
    
        var randomWord = dataArray[Math.floor(Math.random()*dataArray.length)];
        console.log(randomWord);

        var wordToGuess = new Word(randomWord);

        console.log("\n" + "-------------------------------------------" + "\n");
        console.log(wordToGuess.grabWord());
        console.log("\n" + "-------------------------------------------" + "\n");
        //wordToGuess.letterGuess("a");
        //console.log(wordToGuess.grabWord());

        var gamePlay = function()
        {
            inquirer.prompt([
            {
                name: "guess",
                message: "Guess a letter!",
                validate: function(value)
                {
                    var alphArray =  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

                    if (value.toLowerCase() === "quit")
                    {
                        process.exit(0);
                    }
                    
                    if (value.length !== 1)
                    {
                        return false;
                    }

                    if (alphArray.includes(value.toLowerCase()))
                    {
                        return true;
                    }

                    return false;
                }
            },
            ]).then(function(guess)
            {
                //console.log("valid guess");

                var letterGuessed = guess.guess.toLowerCase();

                wordToGuess.letterGuess(letterGuessed);
                console.log(wordToGuess.grabWord());

                if (randomWord.includes(letterGuessed) && correctGuess.includes(letterGuessed))
                {   
                    console.log("\n");
                    console.log("Selection already made. Please guess again");
                    console.log("\n" + "-------------------------------------------" + "\n");
                    console.log("Guesses remaining: " + guessesLeft);
                    console.log("Letters guessed: " + incorrectGuess);
                    console.log("\n" + "-------------------------------------------" + "\n");
                }

                else if (randomWord.includes(letterGuessed) && !correctGuess.includes(letterGuessed))
                {
                    correctGuess.push(letterGuessed);
                    console.log("\n");
                    console.log("Good Guess! Please guess again.");
                    console.log("\n" + "-------------------------------------------" + "\n");
                    console.log("Guesses remaining: " + guessesLeft);
                    console.log("Letters guessed: " + incorrectGuess);
                    console.log("\n" + "-------------------------------------------" + "\n");
                }

                else if (!randomWord.includes(letterGuessed) && incorrectGuess.includes(letterGuessed))
                {
                    console.log("\n");
                    console.log("Selection already made. Please guess again");
                    console.log("\n" + "-------------------------------------------" + "\n");
                    console.log("Guesses remaining: " + guessesLeft);
                    console.log("Letters guessed: " + incorrectGuess);
                    console.log("\n" + "-------------------------------------------" + "\n");
                }

                else
                {
                    incorrectGuess.push(letterGuessed);
                    console.log("\n");
                    console.log("Incorrect Guess! Please guess again.");
                    console.log("\n" + "-------------------------------------------" + "\n");
                    guessesLeft--;
                    console.log("Guesses remaining: " + guessesLeft);
                    console.log("Letters guessed: " + incorrectGuess);
                    console.log("\n" + "-------------------------------------------" + "\n");
                }

                var isGameWon = true;

                for (var i = 0; i < randomWord.length; i++)
                {
                    if (!correctGuess.includes(randomWord[i]))
                    {
                        isGameWon = false;
                    }
                }

                if (isGameWon)
                {
                    console.log("\n");
                    console.log("You won! Great Job.");
                    console.log("\n" + "-------------------------------------------" + "\n");
                    wins++;
                    console.log("Wins: " + wins);
                    console.log("loses: " + losses);
                    console.log("\n" + "-------------------------------------------" + "\n");
                    guessesLeft = 9;
                    incorrectGuess = [];
                    correctGuess = [];
                    wordGenerator();
                }

                else if (guessesLeft <= 0)
                {
                    console.log("\n");
                    console.log("You lost! You suck.");
                    console.log("\n" + "-------------------------------------------" + "\n");
                    losses++;
                    console.log("Wins: " + wins);
                    console.log("loses: " + losses);
                    console.log("\n" + "-------------------------------------------" + "\n");
                    guessesLeft = 9;
                    incorrectGuess = [];
                    correctGuess = [];
                    wordGenerator();
                }

                else
                {
                    // Using setTimeout will prevent memory leak by popping the stack.
                    setTimeout(gamePlay, 0);
                }

            })
        }

        gamePlay();

    })

}

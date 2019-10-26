var fs = require("fs");
var inquirer = require("inquirer");
var Word = require("./word");

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
        console.log(wordToGuess.grabWord());
        wordToGuess.letterGuess("a");
        console.log(wordToGuess.grabWord());
    });
}

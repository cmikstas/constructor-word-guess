var fs = require("fs");


var wordGenerator = function()
{
    fs.readFile("./word-guess.txt", "utf8", function(error, data)
    {
        this.dataArray;
        // If the code experiences any errors it will log the error to the console.
        if (error)
        {
            return console.log(error);
        }

        this.dataArray = data.split("\r\n");
        //console.log(dataArray);
    
        var randomWord = this.dataArray[Math.floor(Math.random()*dataArray.length)];
        console.log(randomWord);

        var wordToGuess = new Word(randomWord);
        console.log(wordToGuess.grabWord());
        //wordToGuess.letterGuess("a");
        //console.log(wordToGuess.grabWord());
    });
}

module.exports = WordGenerator;
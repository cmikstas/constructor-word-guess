var Letter = require("./letter");

var Word = function(word)
{
    this.lettersArray = [];

    var charArray = word.split("");

    for (var i = 0; i < charArray.length; i++)
    {
        this.lettersArray.push(new Letter(charArray[i]))
    }

    console.log(this.lettersArray.length);

    this.grabWord = function()
    {
        var wordString = "";

        for (var i = 0; i < this.lettersArray.length; i++)
        {
            wordString += this.lettersArray[i].grabLetter() + " ";
        }

        return wordString;
    }

    this.letterGuess = function(letter)
    {
        for (var i = 0; i < this.lettersArray.length; i++)
        {
            this.lettersArray[i].guessedLetter(letter);
        }
    }
}

module.exports = Word;
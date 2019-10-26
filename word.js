var letterFile = require("./letter");

var Word = function(word)
{
    this.lettersArray = [];

    var charArray = word.split("");

    for (var i = 0; i < charArray.length; i++)
    {
        this.lettersArray.push(new Letter(charArray[i]))
    }

    var wordString = "";

    this.grabWord = function()
    {
        for (var i = 0; i < lettersArray.length; i++)
        {
            wordString += lettersArray[i].grabLetter() + " ";
            return wordString;
        }
    }

    this.letterGuess = function(letter)
    {
        for (var i = 0; i < lettersArray.length; i++)
        {
            lettersArray[i].guessedLetter(letter);
        }
    }
}
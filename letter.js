var Letter = function(letter)
{
    this.letter = letter.toLowerCase();
    this.isGuessed = false;

    this.grabLetter = function()
    {
        if(this.isGuessed)
        {
            return this.letter;
        }

        else
        {
            return "_";
        }
    }

    this.guessedLetter = function(letter)
    {
        if(letter.toLowerCase() === this.letter)
        {
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;
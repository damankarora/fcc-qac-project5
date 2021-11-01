const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

let britishToAmericanSpelling = {};

let britishToAmericanTitles = {};

(function () {
    for (let american in americanToBritishSpelling) {
        britishToAmericanSpelling[americanToBritishSpelling[american]] = american;
    }

    for (let americanTitle in americanToBritishTitles) {
        britishToAmericanTitles[americanTitle] = americanToBritishTitles[americanTitle];
    }
})();


class Translator {

    // Tested for words. Not numbers.
    toBritish(text) {
        
        let words = text.split(" ");
        words = this.toBritishTimeFormat(words);
        words = this.toBritishTitles(words);
        words = this.toBritishSpellings(words);
        words = this.toBritishOnly(words);

        return words.join(" ");

    }

    toBritishTimeFormat(words){
        for(let i = 0 ; i < words.length; i ++){
            if(words[i].includes(":")){
                let indexOfSign = words[i].indexOf(':');
                let checkAhead = false;
                let checkBehind = false;

                if(indexOfSign + 1 < words[i].length){
                    checkAhead = !isNaN(parseInt(words[i].charAt(indexOfSign + 1)));
                }

                if( indexOfSign - 1 >= 0){
                    checkBehind = !isNaN(parseInt(words[i].charAt(indexOfSign - 1)));
                }

                if(checkBehind && checkBehind){
                    words[i] = words[i].replace(':', '.');
                }
            }
        }
        return words;
    }

    
    toBritishOnly(words){

        
        // Three word check
        for(let i = 0 ; i < words.length - 2; i ++){
            let word = words[i] + " " + words[i + 1]+ " " + words[i + 2];

            let result = this.toBritishOnlyWord(word, words);

            if(result){
                
                return this.toBritishOnly(result);
            }
        }

        // Check for two words combination
        for(let i = 0 ; i < words.length - 1; i ++){
            let word = words[i] + " " + words[i + 1];

            let result = this.toBritishOnlyWord(word, words);

            if (result) {
                
                return this.toBritishOnly(result);
            }
        }

        // Check for single word.

        for(let i = 0 ; i < words.length; i ++){
            let word = words[i];

            let result = this.toBritishOnlyWord(word, words);

            if (result) {
                
                return this.toBritishOnly(result);
            }
        }

        return words;
    }


    // Tested - OK
    toBritishOnlyWord(word, words){

        
        let loweredWord = word.toLowerCase();
        let lastCharacter = word.charAt(loweredWord.length - 1);

        let punctuations = ['.', ',', '!', ';', '?'];
        let punctuationPresent = false;

        if (punctuations.includes(lastCharacter)) {
            punctuationPresent = true;
            loweredWord = loweredWord.slice(0, -1);
        }

        let replacement = null;
        if (americanOnly[loweredWord]) {
            
            replacement = americanOnly[loweredWord];
        }


        if (replacement && punctuationPresent) {
            replacement += lastCharacter;
        }

        let outcome = null;
        if (replacement) {
            outcome = words.join(" ").replace(word, replacement);
            words = outcome.split(" ");

            return words;
        }
        return null;
    }

    // Tested - ok
    toBritishTitles(words){
        for(let i = 0 ; i < words.length; i ++){
            let word = words[i].toLowerCase();

            if(americanToBritishTitles[word]){
                word = americanToBritishTitles[word];
                words[i] = word.charAt(0).toUpperCase() + word.slice(1);
            }

            
        }

        return words;
    }


    // Tested - ok
    toBritishSpellings(words){
        for(let i = 0 ; i < words.length; i ++){
            let word = words[i];

            let isUppercase = word.charAt(0) === word.charAt(0).toUpperCase() && i === 0;

            word = word.toLowerCase();

            // Check for last character.

            let lastCharacter = word.charAt(word.length - 1);

            let punctuations = ['.', ',', '!', ';', '?'];
            let punctuationPresent = false;

            if(punctuations.includes(lastCharacter)){
                punctuationPresent = true;
                word = word.slice(0, -1);                
            }

            if(americanToBritishSpelling[word]){
                word = americanToBritishSpelling[word];
            }

            if(punctuationPresent){
                word+=lastCharacter;
            }

            if(isUppercase){
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }

            if(words[i].toLowerCase() !== word)
            words[i] = word;
            
        }        

        return words;
    }


    toAmerican(text) {
        
    }
}

module.exports = Translator;

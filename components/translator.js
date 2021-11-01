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
        britishToAmericanTitles[americanToBritishTitles[americanTitle]] = americanTitle;
    }
})();




class Translator {

    // Tested - ok
    toBritish(text, highlight) {
        return this.convertText(text, 0, highlight);
    }


    toAmerican(text, highlight) {
        return this.convertText(text, 1, highlight);
    }
    

    convertText(text, mode, highlight) {
        let words = text.split(" ");
        words = this.convertTimeFormat(words, mode, highlight);
        words = this.convertTitles(words, mode, highlight);
        words = this.convertSpellings(words, mode, highlight);
        words = this.convertAllWords(words, mode, highlight);
        return words.join(" ");
    }

    convertTimeFormat(words, mode, highlight){

        let characterToLook = (mode === 0)?':':'.';
        let characterWeWant = (mode === 0)?'.':':';
        
        for(let i = 0 ; i < words.length; i ++){
            if(words[i].includes(characterToLook)){
                let indexOfSign = words[i].indexOf(characterToLook);
                let checkAhead = false;
                let checkBehind = false;

                if(indexOfSign + 1 < words[i].length){
                    checkAhead = !isNaN(parseInt(words[i].charAt(indexOfSign + 1)));
                }

                if( indexOfSign - 1 >= 0){
                    checkBehind = !isNaN(parseInt(words[i].charAt(indexOfSign - 1)));
                }

                if(checkBehind && checkBehind){
                    words[i] = words[i].replace(characterToLook, characterWeWant);

                    if(highlight){
                        words[i] = `<span class="highlight">${words[i]}</span>`
                    }
                }
            }
        }
        return words;
    }

    
    convertAllWords(words, mode, highlight){
        
        
        // Three word check
        for(let i = 0 ; i < words.length - 2; i ++){
            let word = words[i] + " " + words[i + 1]+ " " + words[i + 2];

            let result = this.convertWord(word, words, mode, highlight);

            if(result){
                
                return this.convertAllWords(result, mode, highlight);
            }
        }

        // Check for two words combination
        for(let i = 0 ; i < words.length - 1; i ++){
            let word = words[i] + " " + words[i + 1];

            let result = this.convertWord(word, words, mode, highlight);

            if (result) {                
                return this.convertAllWords(result, mode, highlight);
            }
        }

        // Check for single word.

        for(let i = 0 ; i < words.length; i ++){
            let word = words[i];

            let result = this.convertWord(word, words, mode, highlight);

            if (result) {
                
                return this.convertAllWords(result, mode, highlight);
            }
        }

        return words;
    }


    // Tested - OK
    convertWord(word, words, mode, highlight){
  

        let dictionary = (mode === 0)?americanOnly:britishOnly;
        
        let loweredWord = word.toLowerCase();
        let lastCharacter = word.charAt(loweredWord.length - 1);

        let punctuations = ['.', ',', '!', ';', '?'];
        let punctuationPresent = false;

        if (punctuations.includes(lastCharacter)) {
            punctuationPresent = true;
            loweredWord = loweredWord.slice(0, -1);
        }

        let replacement = null;
        if (dictionary[loweredWord]) {
            
            replacement = dictionary[loweredWord];
        }


        if (replacement && punctuationPresent) {
            replacement += lastCharacter;
        }


        if(highlight && replacement){
            replacement = `<span class="highlight">${replacement}</span>`;
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
    convertTitles(words, mode, highlight){
        let dictionary = (mode === 0)?americanToBritishTitles:britishToAmericanTitles;        
        for(let i = 0 ; i < words.length; i ++){
            let word = words[i].toLowerCase();

            if(dictionary[word]){
                word = dictionary[word];
                words[i] = word.charAt(0).toUpperCase() + word.slice(1);

                if(highlight){
                    words[i] = `<span class="highlight">${words[i]}</span>`;
                }
            }

            
        }

        return words;
    }


    // Tested - ok
    // mode: 0 for American to British, 1 for British to american.
    convertSpellings(words, mode, highlight){

        let dictionary = mode===0?americanToBritishSpelling:britishToAmericanSpelling;
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

            if(dictionary[word]){
                word = dictionary[word];
            }

            if(punctuationPresent){
                word+=lastCharacter;
            }

            

            if(words[i].toLowerCase() !== word)
            {
                if (isUppercase) {
                    word = word.charAt(0).toUpperCase() + word.slice(1);
                }
                words[i] = (highlight)?`<span class="highlight">${word}</span>`:word;
            }
            
        }        

        return words;
    }
}

module.exports = Translator;

const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

    suite("Testing convertWord method", ()=>{
        test("Test 1 without punctuation", ()=>{
            assert.deepEqual(translator.convertWord("play hooky", ["let", "us", "play", "hooky"], 0),
             ["let", "us", "bunk", "off"]);
        });

        test("Test 2 without punctuation", ()=>{
            assert.deepEqual(translator.convertWord("Rube Goldberg device",
             ["I", "love", "Rube", "Goldberg", "device"], 0), ["I", "love", "Heath", "Robinson", "device"]);
        })

        test("Test 3 with punctuation", () => {
            assert.deepEqual(translator.convertWord("popsicle",
                ["I", "love", "popsicle.", "They", "are", "amazing."], 0), "I love ice lolly. They are amazing.".split(" "));
        });

        test("When no change is present", ()=>{
            assert.isNull(translator.convertWord("I love ice", "I love ice lolly. They are amazing.".split(" "), 0))
        })
    })

    suite("Testing method convertTitles", ()=>{
        test("Title in capitals", ()=>{
            assert.deepEqual(translator.convertTitles(["Mr.", "Daman"], 0), ["Mr", "Daman"]);
        });

        test("Title in lowercase", ()=>{
            assert.deepEqual(translator.convertTitles("prof. Daman is good. He does a good job.".split(" "), 0), "Prof Daman is good. He does a good job.".split(" "))
        });
    });

    suite("Testing method convertSpellings", ()=>{
        test("Lowercase test", ()=>{
            assert.deepEqual(translator.convertSpellings(["The" , "labor", "is", "working"], 0), "The labour is working".split(" "));
        });

        test("Uppercase test", ()=>{
            assert.deepEqual(translator.convertSpellings("The Labor is working".split(" "), 0), "The labour is working".split(" "));
        });

        test("Uppercase test", () => {
            assert.deepEqual(translator.convertSpellings("The Labor is working. Daman is a good boy.".split(" "), 0), "The labour is working. Daman is a good boy.".split(" "));
        });
    });

    suite("Testing convertAllWords method", ()=>{
        test("With lowercase string", ()=>{
            assert.deepEqual(translator.convertAllWords("I hate nightcrawler. They scare me.".split(" "), 0), "I hate earthworm. They scare me.".split(" "));
        });

        test("With Uppercase word", ()=>{
            assert.deepEqual(translator.convertAllWords("I hate Nightcrawler. They scare me.".split(" "), 0), "I hate earthworm. They scare me.".split(" "))
        });

        test("When a combo of 2 words are being translated", ()=>{
            assert.deepEqual(translator.convertAllWords("I hate Nightcrawler. They scare me.".split(" "), 0), "I hate earthworm. They scare me.".split(" "))
        });

        test("When a combo of 3 to be replaced", ()=>{
            assert.deepEqual(translator.convertAllWords("I hate rube goldberg device. They scare me.".split(" "), 0), "I hate Heath Robinson device. They scare me.".split(" "))
        })

        test("When a combo 3 is to be replaced having uppercase", ()=>{
            assert.deepEqual(translator.convertAllWords("I hate Rube Goldberg device. They scare me.".split(" "), 0), "I hate Heath Robinson device. They scare me.".split(" "))
        })
    });

    suite("Testing convertTimeFormat", ()=>{
        test("Test 1", ()=>{
            assert.deepEqual(translator.convertTimeFormat("We will meet at 4:30".split(" "), 0), "We will meet at 4.30".split(" "));
        });

        test("Test 2", ()=>{
            assert.deepEqual(translator.convertTimeFormat("We will meet at 4:30.".split(" "), 0), "We will meet at 4.30.".split(" "));
        })
    })

    suite('Testing American to British Translator', () => {
        test('Mangoes are my favorite fruit.', () => {
            assert.equal(translator.toBritish("Mangoes are my favorite fruit."), "Mangoes are my favourite fruit.");
        });

        test('I ate yogurt for breakfast.', () => {
            assert.equal(translator.toBritish("I ate yogurt for breakfast."), "I ate yoghurt for breakfast.");
        })

        test("We had a party at my friend's condo.", () => {
            assert.equal(translator.toBritish("We had a party at my friend's condo."), "We had a party at my friend's flat.");
        })

        test("Can you toss this in the trashcan for me?", () => {
            assert.equal(translator.toBritish("Can you toss this in the trashcan for me?"), "Can you toss this in the bin for me?");
        })

        test("The parking lot was full.", () => {
            assert.equal(translator.toBritish("The parking lot was full."), "The car park was full.");
        })

        test("Like a high tech Rube Goldberg machine.", () => {
            assert.equal(translator.toBritish("Like a high tech Rube Goldberg machine."), "Like a high tech Heath Robinson device.");
        })

        test("To play hooky means to skip class or work.", () => {
            assert.equal(translator.toBritish("To play hooky means to skip class or work."), "To bunk off means to skip class or work.");
        })

        test("No Mr. Bond, I expect you to die.", () => {
            assert.equal(translator.toBritish("No Mr. Bond, I expect you to die."), "No Mr Bond, I expect you to die.");
        })

        test("Dr. Grosh will see you now.", () => {
            assert.equal(translator.toBritish("Dr. Grosh will see you now."), "Dr Grosh will see you now.");
        })

        test("Lunch is at 12:15 today.", () => {
            assert.equal(translator.toBritish("Lunch is at 12:15 today."), "Lunch is at 12.15 today.");
        })

        test("Test 3 word combo + 1 spell", () => {
            assert.equal(translator.toBritish("I hate Rube Goldberg device. They scare me and the labor."), "I hate Heath Robinson device. They scare me and the labour.");
        });

    });

    suite("Testing British to American Translator", ()=>{
        test("We watched the footie match for a while.", ()=>{
            assert.equal(translator.toAmerican("We watched the footie match for a while."), "We watched the soccer match for a while.");
        })

        test("Paracetamol takes up to an hour to work.", ()=>{
            assert.equal(translator.toAmerican("Paracetamol takes up to an hour to work."), "Tylenol takes up to an hour to work.");
        })

        test("First, caramelise the onions.", ()=>{
            assert.equal(translator.toAmerican("First, caramelise the onions."), "First, caramelize the onions.");
        })

        test("I spent the bank holiday at the funfair.", ()=>{
            assert.equal(translator.toAmerican("I spent the bank holiday at the funfair."), "I spent the public holiday at the carnival.");            
        })

        test("I had a bicky then went to the chippy.", ()=>{
            assert.equal(translator.toAmerican("I had a bicky then went to the chippy."), "I had a cookie then went to the fish-and-chip shop.")
        })

        test("I've just got bits and bobs in my bum bag.", ()=>{
            assert.equal(translator.toAmerican("I've just got bits and bobs in my bum bag."), "I've just got odds and ends in my fanny pack.");
        })

        test("The car boot sale at Boxted Airfield was called off.", ()=>{
            assert.equal(translator.toAmerican("The car boot sale at Boxted Airfield was called off."), "The swap meet at Boxted Airfield was called off.")            
        })

        test("Have you met Mrs Kalyani?", ()=>{
            assert.equal(translator.toAmerican("Have you met Mrs Kalyani?"), "Have you met Mrs. Kalyani?");
        })

        test("Prof Joyner of King's College, London.",  ()=>{
            assert.equal(translator.toAmerican("Prof Joyner of King's College, London."), "Prof. Joyner of King's College, London.");
        })

        test("Tea time is usually around 4 or 4.30.", ()=>{
            assert.equal(translator.toAmerican("Tea time is usually around 4 or 4.30."), "Tea time is usually around 4 or 4:30.");
        })

    })

    suite("Testing highlight", () => {
        test("American to British", () => {
            assert.equal(translator.toBritish("Mangoes are my favorite fruit.", true), "Mangoes are my <span class=\"highlight\">favourite</span> fruit.");
        })

        test("I ate yogurt for breakfast.", () => {
            assert.equal(translator.toBritish("I ate yogurt for breakfast.", true), "I ate <span class=\"highlight\">yoghurt</span> for breakfast.");
        })

        test("We watched the footie match for a while.", ()=>{
            assert.equal(translator.toAmerican("We watched the footie match for a while.", true), "We watched the <span class=\"highlight\">soccer</span> match for a while.")
        })

        test("Paracetamol takes up to an hour to work.", ()=>{
            assert.equal(translator.toAmerican("Paracetamol takes up to an hour to work.", true), "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.")
        })

        test("Tylenol takes up to an hour to work.", ()=>{
            assert.equal(translator.toAmerican("Tylenol takes up to an hour to work."), "Tylenol takes up to an hour to work.");
        })
    })
   
});

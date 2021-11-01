const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

    suite("Testing toBritishOnlyWord method", ()=>{
        test("Test 1 without punctuation", ()=>{
            assert.deepEqual(translator.toBritishOnlyWord("play hooky", ["let", "us", "play", "hooky"]),
             ["let", "us", "bunk", "off"]);
        });

        test("Test 2 without punctuation", ()=>{
            assert.deepEqual(translator.toBritishOnlyWord("Rube Goldberg device",
             ["I", "love", "Rube", "Goldberg", "device"]), ["I", "love", "Heath", "Robinson", "device"]);
        })

        test("Test 3 with punctuation", () => {
            assert.deepEqual(translator.toBritishOnlyWord("popsicle",
                ["I", "love", "popsicle.", "They", "are", "amazing."]), "I love ice lolly. They are amazing.".split(" "));
        });

        test("When no change is present", ()=>{
            assert.isNull(translator.toBritishOnlyWord("I love ice", "I love ice lolly. They are amazing.".split(" ")))
        })
    })

    suite("Testing method toBritishTitles", ()=>{
        test("Title in capitals", ()=>{
            assert.deepEqual(translator.toBritishTitles(["Mr.", "Daman"]), ["Mr", "Daman"]);
        });

        test("Title in lowercase", ()=>{
            assert.deepEqual(translator.toBritishTitles("prof. Daman is good. He does a good job.".split(" ")), "Prof Daman is good. He does a good job.".split(" "))
        });
    });

    suite("Testing method toBritishSpellings", ()=>{
        test("Lowercase test", ()=>{
            assert.deepEqual(translator.toBritishSpellings(["The" , "labor", "is", "working"]), "The labour is working".split(" "));
        });

        test("Uppercase test", ()=>{
            assert.deepEqual(translator.toBritishSpellings("The Labor is working".split(" ")), "The labour is working".split(" "));
        });

        test("Uppercase test", () => {
            assert.deepEqual(translator.toBritishSpellings("The Labor is working. Daman is a good boy.".split(" ")), "The labour is working. Daman is a good boy.".split(" "));
        });
    });

    suite("Testing toBritishOnly method", ()=>{
        test("With lowercase string", ()=>{
            assert.deepEqual(translator.toBritishOnly("I hate nightcrawler. They scare me.".split(" ")), "I hate earthworm. They scare me.".split(" "));
        });

        test("With Uppercase word", ()=>{
            assert.deepEqual(translator.toBritishOnly("I hate Nightcrawler. They scare me.".split(" ")), "I hate earthworm. They scare me.".split(" "))
        });

        test("When a combo of 2 words are being translated", ()=>{
            assert.deepEqual(translator.toBritishOnly("I hate Nightcrawler. They scare me.".split(" ")), "I hate earthworm. They scare me.".split(" "))
        });

        test("When a combo of 3 to be replaced", ()=>{
            assert.deepEqual(translator.toBritishOnly("I hate rube goldberg device. They scare me.".split(" ")), "I hate Heath Robinson device. They scare me.".split(" "))
        })

        test("When a combo 3 is to be replaced having uppercase", ()=>{
            assert.deepEqual(translator.toBritishOnly("I hate Rube Goldberg device. They scare me.".split(" ")), "I hate Heath Robinson device. They scare me.".split(" "))
        })
    });

    suite("Testing toBritishTimeFormat", ()=>{
        test("Test 1", ()=>{
            assert.deepEqual(translator.toBritishTimeFormat("We will meet at 4:30".split(" ")), "We will meet at 4.30".split(" "));
        });

        test("Test 2", ()=>{
            assert.deepEqual(translator.toBritishTimeFormat("We will meet at 4:30.".split(" ")), "We will meet at 4.30.".split(" "));
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

    })
   
});

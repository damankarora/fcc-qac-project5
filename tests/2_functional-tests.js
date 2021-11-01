const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test("Translation with text and locale fields: POST request to /api/translate", (done)=>{
        chai.request(server)
        .post("/api/translate")
        .send({
            text: "Paracetamol takes up to an hour to work.",
            locale: "british-to-american"
        })
        .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.property(res.body, "text");
            assert.property(res.body, "translation");
            assert.equal(res.body.translation, "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.")
            done();
        })
    });

    test("Translation with text and invalid locale field: POST request to /api/translate", (done)=>{
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "Paracetamol takes up to an hour to work.",
                locale: "I am invalid locale"
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.property(res.body, "error");
                assert.deepEqual(res.body, { error: 'Invalid value for locale field' });
                done();
            })
    })

    test("Translation with missing text field: POST request to /api/translate", (done)=>{
        chai.request(server)
            .post("/api/translate")
            .send({                
                locale: "british-to-american"
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.property(res.body, "error");
                assert.deepEqual(res.body, { error: 'Required field(s) missing' });                
                done();
            })
    })

    test("Translation with missing locale field: POST request to /api/translate", (done)=>{
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "Paracetamol takes up to an hour to work."                
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.property(res.body, "error");
                assert.deepEqual(res.body, { error: 'Required field(s) missing' });
                done();
            })
    });

    test("Translation with empty text: POST request to /api/translate", (done)=>{
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "",
                locale: "british-to-american"
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.property(res.body, "error");
                assert.deepEqual(res.body, { error: 'No text to translate' });
                done();
            })
    });

    test("Translation with text that needs no translation: POST request to /api/translate", (done)=>{
        chai.request(server)
            .post("/api/translate")
            .send({
                text: "Tylenol takes up to an hour to work.",
                locale: "british-to-american"
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, "text");
                assert.property(res.body, "translation");
                assert.equal(res.body.translation, "Everything looks good to me!")
                done();
            })
    })
});

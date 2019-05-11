//delete this
const assert = require('chai').assert;
const sayHello = require('../../server/first').sayHello;

describe('Testi pealkiri: hello test', function(){
    it('kirjeldus: peaks tagastama hello', function(){
        let result = sayHello();
        assert.equal(result, 'hello');
    });
});
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

//const app = require('../../server/server').app;

describe('Node Enviroment', function(){
    it('Process environment should be test', function(){
        chai.assert.equal(process.env.NODE_ENV,'test');
    });
});
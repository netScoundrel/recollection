process.env.NODE_ENV = 'test';
const express = require ("express");
const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

mongoose.connect("mongodb+srv://Allener:K7xAkLCP87DiUw8_@tripper-xnz5n.mongodb.net/test?retryWrites=true");

chai.use(chaiHttp);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const app = require('../../server/server').app;

describe('Node Enviroment', function(){
    it('Process environment should be test', function(){
        chai.assert.equal(process.env.NODE_ENV,'test');
    });
});
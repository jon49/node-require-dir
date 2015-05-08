var expect = require('chai').expect;

var path = require('path');
var requiredir = require('../node-require-dir');
var TEST_DIR = path.join(__dirname, 'example');

describe('node-require-dir()', function () {

    it('should require a directory', function () {
       expect(requiredir(TEST_DIR)).to.deep.equal({ 'first.js': {} });
    });

    it('should recursively require a directory', function () {
       expect(requiredir(TEST_DIR, null, true)).to.deep.equal(
          { 'first.js': {}, dir: { 'second.js': {}, 'third.json': {} } }
       );
    });

    it('should accept a name predicate', function () {
      var controllerPredicate = function(name) {
        return path.basename(name, path.extname(name)) + 'Controller';
      };
      expect(requiredir(TEST_DIR, controllerPredicate)).to.deep.equal({ 'firstController': {} });
    });

    it('should ommit a file if predicate returns false', function () {
      var notJsonPredicate = function(name) {
        if(path.extname(name) !== '.json') return name;
        else return false;
      };
      expect(requiredir(TEST_DIR, notJsonPredicate, true)).to.deep.equal(
         { 'first.js': {}, dir: { 'second.js': {} } }
      );
    });

});

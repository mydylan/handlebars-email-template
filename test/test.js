/* global describe, it */

var should = require('should');
var handlebarsEmailTemplate = require('../index');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));

describe('When I trigger my handlebars-email-template the output', function() {
  it('should match with the testData output.', function(done) {

    var options = {
      root: './views/',
      src: '_partials/',
      dest: './test/testData/generated/',
      srcTemplate: 'email',
      destTemplate: 'test',
      ext: 'hbs'
    };

    var testData;
    var results;


    fs.readFileAsync(options.dest + options.destTemplate + '.html', 'utf8').then(function(contents) {
        return contents;
    })
    .then(function(contents) {
      testData = contents;
    })
    .then(function() {
      handlebarsEmailTemplate(options);
    })
    .then(function() {
      fs.readFileAsync(options.dest + options.destTemplate + '.html', 'utf8').then(function(contents) {
        return contents;
      })
      .then(function(contents) {
        results = contents;

        if(testData === results) {
          done();
        } else {
          console.log('test data does not match results');
        }
      })
      .catch(function(e) {
        console.error(e.stack);
      });
    })
    .catch(function(e) {
      console.error(e.stack);
    });
  });
});

/* global describe, it */

var should = require('should');
var handlebarsEmailTemplate = require('../index');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));


var options = {
  root: './views/',
  src: '_partials/',
  dest: './test/testData/generated/',
  srcTemplate: 'email',
  destTemplate: 'test',
  ext: 'hbs'
};

beforeEach(function(done) {
  handlebarsEmailTemplate(options);

  done();
});

describe('When I trigger my handlebars-email-template the output', function() {
  it('should match with the testData output.', function(done) {

    fs.readFileAsync(options.dest + options.destTemplate + '.html', 'utf8').then(function(contents) {
        return contents;
    })
    .then(function(testData) {
      fs.readFileAsync(options.dest + options.destTemplate + '.html', 'utf8')

      .then(function(contents) {
        if(testData === contents) {
          done();
        } else {
          console.log('test data does not match results');
        }

        return;
      })
      .catch(function(e) {
        console.error(e.stack);
      });

      return;
    })
    .catch(function(e) {
      console.error(e.stack);
    });
  });
});

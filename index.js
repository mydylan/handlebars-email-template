'use strict';
var handlebars = require('handlebars');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var objectAssign = require('object-assign');

var data = require('./data/data.json');

function handlebarsEmailTemplate(options) {
  var template; // Where we compile the email.html page.

  var defaults = {
    root: './views/',
    src: '_partials/',
    dest: './compiled/',
    srcTemplate: 'email',
    destTemplate: 'email',
    ext: 'hbs'
  };

  var config = objectAssign(defaults, options);

  function handleError(error) {
    console.error(error.stack);
  }

  function createTemplate(html) {
      fs.outputFileAsync(config.dest + config.destTemplate + '.html', html)
      .then(outputResultMessage)
      .catch(handleError);

      return;
  }

  function compileTemplate(hbs) {
      template = handlebars.compile(hbs)(data);

      return template;
  }

  function setupTemplate() {
    fs.readFileAsync(config.root + config.srcTemplate + '.' + config.ext, 'utf8')
    .then(compileTemplate)
    .then(createTemplate)
    .catch(handleError);

    return;
  }

  function registerPartial(partialObj) {
    handlebars.registerPartial(partialObj.partialName, partialObj.contents);
  }

  function getPartialContents(partialPath) {
    fs.readFileAsync(config.root + config.src + partialPath, 'utf8')
    .then(function passDownPartialPath(contents) {
        registerPartial({
          partialName: partialPath.replace('.' + config.ext, ''),
          contents: contents
        });

        return;
    })
    .then(setupTemplate)
    .catch(handleError);
  }

  function outputResultMessage() {
    console.log(config.destTemplate + '.html Generated');

    return;
  }

  function readPartialDirectory(filePathArr) {

    filePathArr.forEach(getPartialContents);

    return;

  }
  // Get an array of partials from the partials directory by reading for every hbs file.
  function init() {
    fs.readdirAsync(config.root + config.src)
    .then(readPartialDirectory)
    .catch(handleError);
  }

  init();

}

module.exports = handlebarsEmailTemplate;

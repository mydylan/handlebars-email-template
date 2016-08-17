# Handlebars Email Template

[![Build Status](https://img.shields.io/travis/code-computerlove/HTML-Snippets.svg?branch=master&style=flat-square)](https://travis-ci.org/code-computerlove/HTML-Snippets)

> Using handlebars to create your email templates with ease.

## Setup
`npm install handlebars-email-template`

## Usage

```js
var handlebarsEmailTemplate = require('handlebars-email-template');

var options {
	root: './views/', // This is the root of your templates folder
	src: '_partials/', // Partials folder
	dest: './compiled/', // Destination directory
	srcTemplate: 'email', // Src Template
	destTemplate: 'email', // Destination Template Name
	ext: 'hbs'
};

handlebarsEmailTemplate(options);

// Expected output

//- compiled
//	- email.html

```

## Options

- `root` - This is the root of your templates directory
- `src` -  Partials directory
- `dest` - Output directory
- `srcTemplate` - Name of the template eg: `email.hbs`
- `destTemplate` - Name of output file.

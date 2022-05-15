/* eslint-disable no-magic-numbers */
const { createTag } = require('../createElement.js');
const fs = require('fs');

const zero = () => {
  const innerDiv = createTag('div', '', ['zero-inner']);

  return createTag('div', innerDiv, ['zero-outer']);
};

const one = () => {
  return createTag('div', '', ['one']);
};

const generateHtml = (binaryNum) => {
  const html = +binaryNum === 0 ? zero() : one();
  return html;
};

const main = (template, number) => {
  const binaryNumber = number.toString(2);
  const html = binaryNumber.split('').map(generateHtml).join('');
  let htmlStr = fs.readFileSync(template, 'utf-8');
  htmlStr = htmlStr.replace(/__CONTENT__/, html);
  fs.writeFileSync('index.html', htmlStr, 'utf-8');
};

main('template.html', +process.argv[2]);

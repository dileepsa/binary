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

const generateDiv = (binaryDigit) => {
  const div = +binaryDigit === 0 ? zero() : one();
  return div;
};

const generateHtml = (binaryNum) => {
  const heading = createTag('div', 'Decimal-Binary', ['heading']);
  const divs = binaryNum.map(generateDiv).join('');
  const binaryWrapper = createTag('div', divs, ['binary-wrapper']);

  return heading + binaryWrapper;
};

const main = (template, number) => {
  const binaryNumber = number.toString(2);
  const html = generateHtml(binaryNumber.split(''));

  let htmlStr = fs.readFileSync(template, 'utf-8');
  htmlStr = htmlStr.replace(/__CONTENT__/, html);
  fs.writeFileSync('index.html', htmlStr, 'utf-8');
};

main('template.html', +process.argv[2]);

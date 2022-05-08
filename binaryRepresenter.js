const { createElement, createLink } = require('../generateHtml.js');
const fs = require('fs');

const binaryRepresenter = (binaryNum) => {
  const color = +binaryNum === 0 ? 'red' : 'green';
  return createElement({ element: 'div', content: '', classes: [color] })
};

const main = (template, number) => {
  const binaryNumber = number.toString(2);
  const binaryHtml = binaryNumber.split('').map(binaryRepresenter).join('');
  let htmlStr = fs.readFileSync(template, 'utf-8');
  htmlStr = htmlStr.replace(/__CONTENT__/, binaryHtml);
  fs.writeFileSync('index.html', htmlStr, 'utf-8');
};

main('template.html', +process.argv[2]);

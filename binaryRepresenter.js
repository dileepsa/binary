const { createElement, createLink } = require('../createElement.js');
const fs = require('fs');

const zero = () => {
  const innerDiv = createElement({
    element: 'div',
    content: '',
    classes: ['zero-inner']
  });

  return createElement({
    element: 'div',
    content: innerDiv,
    classes: ['zero-outer']
  });
};

const one = () => {
  const base = createElement({ element: 'div', content: '', classes: ['one-base'] });
  const pole = createElement({ element: 'div', content: '', classes: ['one-pole'] })
  const wrapper = createElement(
    {
      element: 'div',
      content: pole + base,
      classes: ['one-wrapper']
    });
  return wrapper;
}

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

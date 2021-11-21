'use strict';
const $horizontal = document.querySelector('.horizontal');
const $vertical = document.querySelector('.vertical');
const $target = document.querySelector('.target');
const $tag = document.querySelector('.tag');

addEventListener('load', () => {
  const targetRect = $target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;
  
  function elmentsMove(e) {
    const x = e.clientX;
    const y = e.clientY;
  
    // line elements move
    $vertical.style.transform = `translateX(${x}px)`;
    $horizontal.style.transform = `translateY(${y}px)`;
  
    // target elements move
    $target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
  
    // tag elements move & assign coordinate value
    $tag.style.transform = `translate(${x + 20}px, ${y + 20}px)`;
    coordinateValue(x, y);
  }
  function coordinateValue(x, y){
    $tag.innerHTML = `${x}px, ${y}px`;
  }
  
  document.addEventListener('mousemove', (e) => {
    elmentsMove(e);
  })
})

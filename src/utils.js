'use strict';

export const getElementSize = el => {
  let display = el.style.display;
  if (display === 'none' && el.offsetHeight === 0) {
    el.style.display = 'block';
  }
  let size = {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
  el.style.display = display;
  return size;
}

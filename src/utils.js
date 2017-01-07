'use strict';

import slugify from 'slugify'

const specialCharsRegex = /[\/|\&\?<>]/g

const removeSpecial = s => s.trim().replace(specialCharsRegex, '')

export { removeSpecial }

export const getSlug = s => slugify(removeSpecial(s))

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

export const findDuplicate = (data, title, path) => {
  path.split('.').forEach(step => data = data[step])
  return data ? data.find(item =>
    // item.title.toLowerCase() === title.toLowerCase()
    item.slug.toLowerCase() === title.toLowerCase()
  ) : false;
}

/* =============  Immutability helpers  ================== */

export const pushItem = (collection, item) => collection.concat(item)

export const updateItemById = (collection, _id, set) =>
  collection.map(item =>
    item._id === _id ? Object.assign(item, set) : item
  )

export const deleteItemById = (collection, _id) =>
  collection.filter(item => item._id !== _id)

// function update(collection, element, key, set) {
//   let value = element[key]
//   return collection.map(item =>
//     item[key] === value ? Object.assign(item, set) : item
//   )
// }

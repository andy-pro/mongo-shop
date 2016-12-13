'use strict';

const apiKey = 'apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD';
const rootURL = 'https://api.mlab.com/api/1/databases/shop/collections/';
const usersURL = rootURL + 'users';
const purchasesURL = rootURL + 'purchases';

const getUsers = id =>
  // fetch(usersURL + '?f={firstName:1,lastName:1}&' + apiKey)
  /*
    single document: GET /databases/{database}/collections/{collection}/{_id}
    all documents:   GET /databases/{database}/collections/{collection}
    View, update or delete a single document
    http://docs.mlab.com/data-api/#view-edit-delete-document
  */
  fetch(usersURL + (id ? '/' + id : '') + '?' + apiKey)
    .then(r => r.json())
    .then(r => normalize(r))

const getPurchases = (id) =>
  fetch(purchasesURL + '?q=' + denormalize({userId:id}) + '&' + apiKey)
    .then(r => r.json())
    .then(r => normalize(r))

// set current user from 'admin panel'
export const setUser = (user) =>
  Promise.all([user, getPurchases(user._id)])

export const getUserData = (id) =>
  Promise.all([getUsers(id), getPurchases(id)])

export const addPurchase = (purchase) =>
  fetch(purchasesURL + '?' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: denormalize(purchase)
  })
    .then(r => r.json())
    .then(r => normalize(r))

export const delPurchase = (purchase) =>
  fetch(purchasesURL + '/' + purchase._id + '?' + apiKey, { method: 'DELETE' })
    .then(r => r.json())
    .then(r => normalize(r))


export const addCategory = (category) =>
  fetch(usersURL + '/' + category.userId + '?' + apiKey, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    // body: JSON.stringify( { "$set" : { "x" : 3 } } )
    body: JSON.stringify( { $addToSet : { [category.path] : { title : category.title } } }  )
  })
    .then(r => r.json())
    // .then(r => normalize(r))

export const addSubCategory = (category) => {
  let path = 'categories.0.sub'
  return fetch(usersURL + '/' + category.userId + '?' + apiKey, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    // body: JSON.stringify( { $addToSet : { categories : { title : category.title } } }  )
    // body: JSON.stringify( { $addToSet : { categories : {0: { title : category.title } } } }  )
    // body: JSON.stringify( { categories : { 0 : { $addToSet : { title : category.title } } } } )
    // body: JSON.stringify( { $addToSet : { categories : { 0 : { $addToSet : { title : category.title } } } } } )

    // body: JSON.stringify( { $set : { categories : { 0 : { $addToSet : { title : category.title } } } } } )
    // body: JSON.stringify( { $addToSet : { [path] : { $addToSet : { title : category.title } } } } )
    body: JSON.stringify( { $addToSet : { [path] : { title : category.title } } } )
  })
    .then(r => r.json())
    // .then(r => normalize(r))
}



export { getUsers, getPurchases }

//=======================================================================
/* utils for normalize & denormalize data */

const mongodb_rules = [
/*  rules for normalize:
      _id: {$oid: "xxxxxxxxxx"}    -> _id
      userId: {$oid: "xxxxxxxxxx"} -> userId
      date: {$date: "xxxxxxxxxx"}  -> date
    rules for denormalize:
      _id    -> _id: {$oid: "xxxxxxxxxx"}
      userId -> userId: {$oid: "xxxxxxxxxx"}
      date   -> date: {$date: "xxxxxxxxxx"}
*/
  ['_id', '$oid'],
  ['userId', '$oid'],
  ['date', '$date']
];

function normalize(data) {
/* normalize object or collection after receive from Mongo */
  const object_normalizer = item => {
    mongodb_rules.forEach(rule => {
      let key = rule[0]
      if (item.hasOwnProperty(key)) {
        item[key] = item[key][rule[1]]
      }
    })
  }
  if (data instanceof Array) data.forEach(object_normalizer)
  else object_normalizer(data)
  return data
}

function denormalize(data, stringify=true) {
/* format & optional stringify object before send to MongoDB */
  mongodb_rules.forEach(rule => {
    var key = rule[0]
    if (data.hasOwnProperty(key)) {
      data[key] = {[rule[1]]: data[key]}
    }
  })
  return stringify ? JSON.stringify(data) : data
}

//=======================================================================

var api = new XMLHttpRequest();
api.call = function (method, resource, data, callback) {
    this.onreadystatechange = function () {
        if (this.readyState != 4 || this.status != 200) return;
        return (callback instanceof Function) ? callback(JSON.parse(this.responseText)) : null;
    };
    this.open(method, 'https://api.mongolab.com/api/1/' + resource + '?' + apiKey);
    this.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    console.log(JSON.stringify(data));
    this.send(data ? JSON.stringify(data) : null);
};
/** код ниже выглядит намного удобнее и его можно вызывать несколько раз */
// api.call('GET', 'databases', null, function (databases) {
//     console.log(databases);
// });

// Внести новую запись в коллекцию demo с title: test

var test = {
    title: 'testuische'
};

// var test1 = { purchases: { "$set": {"0": { "y" : 5 } } } } ;
var purchase = {
  product: 'tratata',
  cost: 100,
  userId: '584565afec910a0db4fb8ef5'
}

export const postUser1 = (purchase) => {
  // api.call('POST', 'databases/shop/collections/users/584565afec910a0db4fb8ef5', test1, function (result) {
  api.call('POST', 'databases/shop/collections/purchases', purchase, function (result) {
      // test = result; // получить ID из базы после добавления
      console.log('urra:', result);
  });
}

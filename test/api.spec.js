var colors = require('colors');

var fetch = require('isomorphic-fetch');

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var assert = chai.assert;
chai.use(chaiAsPromised);
global.fetch = fetch;
var api = require('../src/api');

var testCategories = require('./test-categories');

// var print = console.log.bind(console, '>');
var print = function() {
  arguments[0] = arguments[0].bold.bgYellow;
  console.log.apply(console, arguments);
}

describe("API test", function() {
  this.timeout(10000);
  var user = {
    firstName: 'Test',
    lastName: 'User',
    categories: [
      { title: 'Products', slug: 'products' }
    ]
  };

  xit("Test User API: create, read, update, delete", function() {

    // create new user
    var promise = api.addUser(user)
    // read user data
    .then(data => api.getUser(data._id))
    // update user data, e.g. change firstName
    .then(data => api.updateUser(data._id, {firstName: 'Update'}))
    // delete user
    .then(data => api.delUser(data._id))
    // extract firstName
    .then(data => data.firstName)
    return assert.eventually.equal(
      // promise.firstName + promise.lastName,
      promise,
      'Update'
    );
  });

  it("Test Purchase API: create user, create category,\
   add category, delete category, delete user", function() {

    // create new user
    var user1 = Object.assign({}, user);
    user1.categories = testCategories;
    // print('new user', JSON.stringify(user1));

    user.categories=testCategories;

    var promise = api.addUser(user)
    // .then(data => {
    //   print('user', data);
    //   var category = {
    //     userId: data._id,
    //     title: 'Test category',
    //     slug: 'test-category',
    //     path: 'root-path'
    //   }
    //   return  api.addCategory(category)
    // })
    .then(data => {
      print('user+categories', JSON.stringify(data));
      return api.delCategory({userId: data._id})
    })
    .then(data => api.delUser(data._id))
    .then(data => {
      print('user and delete categories', JSON.stringify(data));
      return data.firstName;
    })

    return assert.eventually.equal(
      // promise.firstName + promise.lastName,
      promise,
      'Test'
    );
  });

});

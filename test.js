var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://andy.pro.shop:andy.pro.shop@ds119548.mlab.com:19548/shop';

var findUser = function(db, callback) {
  var cursor =db.collection('users').find( );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  findUser(db, function() {
    db.close();
  });
});

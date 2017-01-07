var assert = require('assert');
describe('Array + 1', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present one more time', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

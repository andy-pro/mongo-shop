/* utils for normalize & denormalize data */

const mongodb_rules = [
/*  rules for normalize (from server to client):
      _id: {$oid: "xxxxxxxxxx"}    -> _id
      userId: {$oid: "xxxxxxxxxx"} -> userId
      date: {$date: "xxxxxxxxxx"}  -> date
    rules for denormalize (from client to server):
      _id    -> _id: {$oid: "xxxxxxxxxx"}
      userId -> userId: {$oid: "xxxxxxxxxx"}
      date   -> date: {$date: "xxxxxxxxxx"}
*/
  ['_id', '$oid'],
  ['userId', '$oid'],
  ['date', '$date']
];

const convert = function(data, convertItem) {
  const object_convert = item => {
    mongodb_rules.forEach(rule => {
      let key = rule[0]
      if (item.hasOwnProperty(key)) {
        item[key] = convertItem(rule[1], item[key])
      }
    })
  }
  if (data instanceof Array) data.forEach(object_convert)
  else object_convert(data)
  return data
}

export const normalize = function(data) {
/* normalize object or collection after receive from Mongo */
  return convert(data, (key, obj) => obj[key])
}

export const denormalize = function(data, stringify=true) {
/* denormalize & optional stringify object
   or collection before send to MongoDB */
  convert(data, (key, value) => ({[key]: value}))
  return stringify ? JSON.stringify(data) : data
}

export const convertCategoryPath = function(path, sub='') {
  path = isNaN(parseInt(path)) ? '' : '.' + path.split(',').join('.sub.');
  if (!path) {
    sub = '';
  }
  return 'categories' + path + sub;
}

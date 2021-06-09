print('Start #################################################################')
// https://holycoders.com/mongodb-schema-validation/
// Successfully added user: {
//       "user" : "root",
//       "roles" : [
//               {
//                       "role" : "root",
//                       "db" : "admin"
//               }
//       ]
// }
// db = db.getSiblingDB('api_prod_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_prod_db' }],
//   },
// );
// db.createCollection('users');

// db = db.getSiblingDB('api_dev_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_dev_db' }],
//   },
// );
// db.createCollection('users');

// db = db.getSiblingDB('api_test_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_test_db' }],
//   },
// );
// db.createCollection('users');

db.createUser({
  user: 'root',
  pwd: 'secret',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
})

db.createCollection('test', { capped: false })
db.test.insert([{ item: 1 }])

db.createCollection('listings', { capped: false })
db.listings.insert([
  {
    title: 'Clean and fully furnished apartment. 5 min away from CN Tower',
    image:
      'https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg',
    address: '3210 Scotchmere Dr W, Toronto, ON, CA',
    price: 10000,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 2,
    rating: 5
  },
  {
    title: 'Luxurious home with private pool',
    image:
      'https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg',
    address: '100 Hollywood Hills Dr, Los Angeles, California',
    price: 15000,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 1,
    rating: 4
  },
  {
    title: 'Single bedroom located in the heart of downtown San Fransisco',
    image:
      'https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg',
    address: '200 Sunnyside Rd, San Fransisco, California',
    price: 25000,
    numOfGuests: 3,
    numOfBeds: 2,
    numOfBaths: 2,
    rating: 3
  }
])

// https://docs.mongodb.com/manual/reference/bson-types/
// db.createCollection('users', {
//   storageEngine: {
//     wiredTiger: {}
//   },
//   capped: false,
//   validationLevel: 'strict',
//   validationAction: 'error',
//   validator: {
//     $jsonSchema: {
//       title: 'users',
//       bsonType: 'object',
//       additionalProperties: false,
//       required: ['name', 'email', 'password'],
//       properties: {
//         _id: {
//           bsonType: 'objectId'
//         },
//         name: {
//           bsonType: 'string'
//         },
//         email: {
//           bsonType: 'string',
//           // pattern: '',
//           description: 'must be a email and is required'
//         },
//         password: {
//           bsonType: 'string',
//           description: 'must be a string and is required'
//         }
//       }
//     }
//   }
// })
// // make each column uique .
// db.users.createIndex({ email: 1 }, { unique: true })

print('END #################################################################')

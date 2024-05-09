const db = require('./connection');
const { User, Part, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {

  await cleanDB('Category', 'categories');
  await cleanDB('User', 'users');
  await cleanDB('Part', 'parts');


  const categories = await Category.insertMany([
    { name: 'Motherboard' },
    { name: 'CPU' },
    { name: 'GPU' },
    { name: 'RAM' },
    { name: 'PSU' },
    { name: 'Case' },
  ]);

  const parts = await Part.insertMany([
    {
      name: 'RTX 4070',
      description:
        'Runs games',
      image: 'RTX4070.jpg',
      category: categories[0]._id,
      price: 2000,
      
    },
  ]);

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
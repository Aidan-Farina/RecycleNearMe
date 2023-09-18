const db = require('../config/connection');
const { Tag } = require('../models');
const cleanDB = require('./cleanDB');

const tagData = require('./tag.json'); 

db.once('open', async () => {
  await cleanDB('Tag', 'tags'); 

  await Tag.insertMany(tagData);

  console.log('Tags seeded!');
  process.exit(0);
});

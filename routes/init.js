const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcrypt');
const db = require('../models');

async function getRoles() {
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ];
  for (const role of roles) {
    await db.Role.findOrCreate({ where: { id: role.id }, defaults: role });
  }
}

async function getMemberships() {
  const memberships = [
    { name: 'Bronze', discount: 0, minPurchases: 0 },
    { name: 'Silver', minPurchases: 15, maxPurchases: 30, discount: 15 },
    { name: 'Gold', minPurchases: 30, discount: 30 }
  ];
  for (const membership of memberships) {
    await db.Membership.findOrCreate({ where: { name: membership.name }, defaults: membership });
  }
}

async function createAdmin() {
  const admin = await db.User.findOne({ where: { email: 'admin@noroff.no' } });
  if (!admin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('P@ssword2023', salt);
    await db.User.create({
      username: 'Admin',
      firstName: 'Admin',
      lastName: 'Support',
      address: 'Online',
      telephoneNumber: 911,
      email: 'admin@noroff.no',
      encryptedPassword: hashedPassword,
      salt: salt,
      RoleId: 1,
      MembershipId: 1,
      purchases: 0
    });
  }
}

async function insertProductsFromAPI() {
// I had to use ChatHPT a little bit here, because I had some issues retrieving the data after I changed something
  try {
    const res = await axios.get('http://backend.restapi.co.za/items/products');
    const { data } = res;
    console.log('API Response:', data);

    for (const product of data.data) {
      try {
        const [brand] = await db.Brand.findOrCreate({ where: { name: product.brand } });
        const [category] = await db.Category.findOrCreate({ where: { name: product.category } });
        console.log('Inserting product:', product);

        await db.Product.findOrCreate({
          where: { name: product.name },
          defaults: {
            description: product.description,
            unitprice: product.price,
            discount: 0,
            date_added: new Date(),
            imgurl: product.imgurl,
            quantity: product.quantity,
            brandId: brand.id,
            categoryId: category.id
          }
        });
      } catch (err) {
        console.error('Error inserting product:', err.message, 'Product:', product);
      }
    }
  } catch (err) {
    console.error('Error fetching products from API:', err.message);
  }
}

router.post('/', async function (req, res, next) {
  try {
    // await db.sequelize.sync({ force: true });

    await getRoles();
    await getMemberships();
    await createAdmin();
    await insertProductsFromAPI();

    res.status(200).json({ status: 'success', message: 'Database populated' });
  } catch (err) {
    console.error('Error populating the database:', err.message);
    res.status(500).json({ status: 'error', message: 'Error populating database', error: err.message });
  }
});

module.exports = router;
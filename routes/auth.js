const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);
const RoleService = require('../services/RoleService');
const roleService = new RoleService(db);
const MembershipService = require('../services/MembershipService');
const membershipService = new MembershipService(db);
const router = express.Router();
const jsonParser = bodyParser.json();

// validation for email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/register', jsonParser, async (req, res) => {
   // #swagger.tags = ['Register']
  try {
      const {username, password, email, firstName, lastName, address, telephoneNumber} = req.body;
      const necessaryFields = {username, password, email, firstName, lastName, address, telephoneNumber};

      for(const [key, value] of Object.entries(necessaryFields)) {
          if (!value || value.trim() === '') {
              return res.status(400).json({ status: 'error', error: `${key} is required`});
          }
      }

      if(!emailRegex.test(email)) {
          return res.status(400).json({status: 'error', error: 'Email must be in the following format: johndoe@gmail.com'});
      }
      if(isNaN(telephoneNumber)) {
          return res.status(400).json({status: 'error', error: 'Telephone number must be a number'});
      }

      const userEmailAddress = await userService.fetchUserByEmail(email);
      if(userEmailAddress) {
          return res.status(400).json({ status: 'error', error: 'The provided email is already in use' });
      }
      const userUsername = await userService.fetchUserByUsername(username);
      if(userUsername) {
          return res.status(400).json({ status: 'error', error: 'The provided username is already in use' });
      }
      const membership = await membershipService.fetchMembershipByName('Bronze');
      if (!membership) {
          return res.status(500).json({status: 'error',error: 'Standard membership level was not found'});
      }
      const role = await roleService.fetchRoleByName('User');
      if(!role) {
          return res.status(500).json({status: 'error', error: 'role: User was not found'});
      }
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
          if (err) return nextTick(err);

          await userService.generateUser({
              username,
              firstName,
              lastName,
              address,
              telephoneNumber,
              email,
              encryptedPassword: hashedPassword,
              salt: salt,
              MembershipId: membership.id,
              RoleId: role.id
          })
      });
      res.status(201).json({status: 'success', message: 'You created an acount', user: username});
  }catch(err) {
      console.error('Error during registration', err.message);
      res.status(500).json({status: 'error', message: 'Error creating account', error: err.message});
  }
});

/* Code before I used chatGPT to fix the test for an invalid login, I couldn't get the correct status code I needed  */
// router.post('/login', jsonParser, async function(req, res) {
//   const { userCredential, password } = req.body;

//   if (!userCredential || !password) {
//     return res.status(400).json({ status: 'error', error: 'Username/Email and password required' });
//   }

//   try {
//     const user = userCredential.includes('@')
//       ? await userService.fetchUserByEmail(userCredential)
//       : await userService.fetchUserByUsername(userCredential);

//     if (!user) {
//       return res.status(401).json({ status: 'error', error: 'Incorrect username/email or password' });
//     }

//     const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');
//     if (!crypto.timingSafeEqual(Buffer.from(user.encryptedPassword, 'hex'), hashedPassword)) {
//       return res.status(400).json({ status: 'error', error: 'Incorrect username/email or password' });
//     }

//     if (!process.env.TOKEN_SECRET) {
//       console.error('Token secret not set');
//       return res.status(500).json({ status: 'error', error: 'Token secret not set' });
//     }

//     // Fetch the user's role from the database if not already done
//     const role = await user.getRole(); // Assuming user.getRole() method is defined in your user model

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: role.name },
//       process.env.TOKEN_SECRET,
//       { expiresIn: '2h' }
//     );

//     res.status(200).json({ status: 'success', message: 'You are logged in', token });
//   } catch (err) {
//     console.error('Error generating token:', err);
//     res.status(500).json({ status: 'error', error: 'Error generating token' });
//   }
// });
router.post('/login', jsonParser, async function(req, res) {
   // #swagger.tags = ['Login']
  const { userCredential, password } = req.body;

  if (!userCredential || !password) {
    return res.status(400).json({ status: 'error', data: { msg: 'Username/Email and password required' } });
  }

  try {
    const user = userCredential.includes('@')
      ? await userService.fetchUserByEmail(userCredential)
      : await userService.fetchUserByUsername(userCredential);

    if (!user) {
      return res.status(401).json({ status: 'error', data: { msg: 'Incorrect username/email or password' } });
    }

    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(Buffer.from(user.encryptedPassword, 'hex'), hashedPassword)) {
      return res.status(401).json({ status: 'error', data: { msg: 'Incorrect username/email or password' } });
    }

    if (!process.env.TOKEN_SECRET) {
      console.error('Token secret not set');
      return res.status(500).json({ status: 'error', data: { msg: 'Token secret not set' } });
    }

    
    const role = await user.getRole();

    const token = jwt.sign(
      { id: user.id, email: user.email, role: role.name },
      process.env.TOKEN_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ status: 'success', message: 'You are logged in', token });
  } catch (err) {
    console.error('Error generating token:', err);
    res.status(500).json({ status: 'error', data: { msg: 'Error generating token' } });
  }
});


module.exports = router;
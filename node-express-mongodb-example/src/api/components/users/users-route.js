const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const usersControllers = require('./users-controller');
const usersValidator = require('./users-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', authenticationMiddleware, usersControllers.getUsers);

  // Create user
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(usersValidator.createUser),
    usersControllers.createUser
  );

  // Get user detail
  route.get('/:id', authenticationMiddleware, usersControllers.getUser);

  // Update user
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(usersValidator.updateUser),
    usersControllers.updateUser
  );

  route.get(
    '/:changePassword',
    authenticationMiddleware,
    usersControllers.getUser
  );

  //Change Password
  route.patch(
    '/:id/change-password',
    authenticationMiddleware,
    celebrate(usersValidator.changePasword),
    usersControllers.changePassword
  );

  // Delete user
  route.delete('/:id', authenticationMiddleware, usersControllers.deleteUser);

  // Pagination Function
  app.get('/users', (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const IndexAwal = (page - 1) * limit; //StartIndex nya dibuat page-1 karena array dimulai 0. (page 1 - 0 = page 0)
    const IndexAkhir = page * limit; //tidak diperlukan -1 karena ingin membuatnya menjadi end page atau page terakhir.

    const resultUsers = users.slice(IndexAwal, IndexAkhir);
    res.json(resultUsers);
  });
};

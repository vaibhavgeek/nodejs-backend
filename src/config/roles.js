const roles = ['user', 'admin'];

const roleRights = new Map();

roleRights.set(roles[0], ['addRides', 'getUsers', 'manageUsers']);
roleRights.set(roles[1], ['addRides', 'getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};

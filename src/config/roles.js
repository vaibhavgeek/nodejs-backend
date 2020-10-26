const roles = ['user', 'admin'];

const roleRights = new Map();

roleRights.set(roles[0], ['manageRides', 'getUsers', 'manageUsers']);
roleRights.set(roles[1], ['manageRides', 'getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};

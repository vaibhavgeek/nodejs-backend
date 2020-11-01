const roles = ['user', 'admin'];

const roleRights = new Map();

roleRights.set(roles[0], ['useRewards', 'manageRides', 'getUsers', 'manageUsers']);
roleRights.set(roles[1], ['useRewards', 'manageRewards', 'manageRides', 'getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};

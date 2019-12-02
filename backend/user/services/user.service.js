const userDao = require('../daos/user.dao');

function findAll() {
    return userDao.select('*');
}

function findActive() {
    return userDao.select('*', {
        deletedAt : 'NULL'
    });
}

function find(user) {
    return userDao.select('*', {
        username : user
    });
}

function getUserBy(info, user) {
    return userDao.select(info, user)
}

function add(user) {
    return userDao.insert(user);
}

function remove(username) {
    return userDao.update(username, {
        deletedAt : Date.now()
    });
}

function put(username, user) {
    return userDao.update(username, {
        email : user.email,
        password : user.password,
    });
}

function patch(username, updates) {
    return userDao.update(username, updates);
}

module.exports = {
    find,findAll, getUserBy,findActive, add, remove, put, patch
}
const query = require("../../components/sql/query");

function insert(user) {
    return query(`INSERT into users values('${user.username}', '${user.email}', '${user.password}', NULL, NULL, 'user');`);
}

function update(username, updates) {
    let ups = '';
    for (let key in updates) 
        ups += `${key} = '${updates[key]}', `;
    return query(`UPDATE users SET ${ups.substring(0, ups.length - 2)} WHERE username = '${username}'`);
}

function select(selection, condition) {
    console.log('at select!');
    let conditions = 'WHERE ';
    for (let key in condition) 
        conditions += `${key} = '${condition[key]}' AND`;
    return query(`SELECT ${selection} from users ${conditions.substring(0, conditions.length - 4)}`);
}

module.exports = {
    insert, update, select
}
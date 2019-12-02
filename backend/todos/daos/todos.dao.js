const query = require('../../components/sql/query');

function insert(todo, tags) {
    return query(`INSERT into todos values(NULL , '${todo}', NULL, '${tags}');`);
}

function update(todo_id, updates) {
    let ups = '';
    for (let key in updates) 
        ups += `${key} = '${updates[key]}', `;
    return query(`UPDATE todos SET ${ups.substring(0, ups.length - 2)} WHERE todo_id = '${todo_id}'`);
}

function select(selection, condition) {
    console.log(selection, condition);
    let ups = 'WHERE ';
    for (let key in condition) 
        ups += `${key} = '${condition[key]}' AND`;
    return query(`SELECT ${selection} from todos ${ups.substring(0, ups.length - 4)}`);
}

function insertLink(username, todo_id) {
    return query(`INSERT into link values ('${username}', '${todo_id}')`);
}

function selectJoin(selection, condition, ...tables) {
    let joins = '';
    for (let i = 0; i < tables.length; i++) {
        let prevTable = (i == 0) ? 'todos' : tables[i - 1].tableName;
        joins += `JOIN ${tables[i].tableName} ON ${prevTable}.${tables[i].condition} = ${tables[i].tableName}.${tables[i].condition} `;
    }
    let conditions = 'WHERE ';
    for (let key in condition) {
        let conn = key.split('_');
        conditions += `${conn[0]}.${conn[1]} = '${condition[key]}' AND`;
    }
    return query(`SELECT ${selection} FROM todos ${joins + conditions.substring(0, conditions.length - 4)}`);
}

module.exports = {
    insert, insertLink, update, select, selectJoin
}
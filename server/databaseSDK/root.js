var mysql = require('mysql');
const config = require('../../config');
var con = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
});

function buildTableCreationQuery(json) {
  let processedJSONToStringQyeryList = [];
  json.forEach((subQ) => {
    processedJSONToStringQyeryList.push(
      `${subQ.name} ${subQ.type}(${subQ.length})`
    );
  });
  return processedJSONToStringQyeryList.join(',');
}
function createTable(tableName, callback) {
  var sql = `CREATE TABLE IF NOT EXISTS ${tableName} (id int(11) NOT NULL auto_increment,inserted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,PRIMARY KEY  (id))`;

  con.query(sql, function (err, result) {
    if (err) {
      callback(false);
    } else {
      insertData(
        'system',
        {
          structure: JSON.stringify([]),
          name: tableName,
          label: tableName,
        },
        (d) => {
          callback(result);
        }
      );
    }
  });
}
function addField(table, field, callback) {
  let sql = `ALTER TABLE ${table} ADD COLUMN ${field.name} ${field.type}`;
  if (field.length) {
    sql += '(' + field.length + ') ';
  }

  if (field.extra) {
    sql += field.extra;
  }

  sql += ';';
  con.query(sql, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function removeField(table, field, callback) {
  //ALTER TABLE "table_name" DROP COLUMN "column_name"
  let sql = `ALTER TABLE ${table} DROP COLUMN ${field.name}`;
  sql += ';';
  con.query(sql, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function processJSONdata(data) {
  let values = [];
  Object.values(data).forEach((d) => {
    switch (typeof d) {
      case 'number':
      case 'boolean':
        values.push(d);
        break;
      default:
        values.push("'" + d + "'");
    }
  });
  return ` (${Object.keys(data).join(',')}) VALUES (${values.join(',')})`;
}

function deleteTable(tableName, callback) {
  var sql = `DROP TABLE IF EXISTS ${tableName}`;
  con.query(sql, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function insertData(tableName, data, callback) {
  var sql = `INSERT INTO ${tableName} ${processJSONdata(data)}`;
  con.query(sql, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function selectAllData(tableName, callback) {
  con.query('SELECT * FROM ' + tableName, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function useRawQuery(query, callback) {
  con.query(query, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function deleteAllWithQuery(tableName, callback) {
  con.query(`DELETE * FROM ${tableName}`, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function deleteWithQuery(tableName, query, callback) {
  con.query(`DELETE FROM ${tableName} ${query}`, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function updateData(tableName, data, query, callback) {
  let dataSet = [];
  let keys = Object.keys(data);
  keys.forEach((key) => {
    if (typeof data[key] == 'number') {
      dataSet.push(`${key} = ${data[key]}`);
    } else {
      dataSet.push(`${key} = '${data[key]}'`);
    }
  });
  dataSet = dataSet.join(',');
  var sql = `UPDATE ${tableName} SET ${dataSet} ${query}`;
  con.query(sql, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
}

function bulkInsert(tableName, data, callback) {
  let keys = data[0];
  let d = Object.keys(keys);
  var values = [];
  data.forEach((dataVal) => {
    values.push(Object.values(dataVal));
  });
  var sql = 'INSERT INTO ' + tableName + ' (' + d.join(',') + ') VALUES ?';
  con.query(sql, [values], function (err) {
    if (err) {
      callback(fasle);
    } else {
      callback(true);
    }
  });
}

module.exports = {
  updateData,
  deleteTable,
  deleteWithQuery,
  deleteAllWithQuery,
  useRawQuery,
  selectAllData,
  insertData,
  createTable,
  addField,
  removeField,
  bulkInsert,
};

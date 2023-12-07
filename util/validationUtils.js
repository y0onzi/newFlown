const db = require('../config/database').db;

const validateId = async (tableName, idName, id) => {
  try {
    const query = `SELECT * FROM ${tableName} WHERE ${idName} = ?`;
    const [rows] = await db.query(query, [id]);

    const isValid = rows.length > 0;
    return isValid;
  } catch (error) {
    console.error(`Error validating ${tableName} ID:`, error);
    throw error;
  }
};

module.exports = {
  validateId
};
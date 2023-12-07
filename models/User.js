const db = require('../config/database').db;

const User = {
    registerBuyer: async(id, password, name, phoneNumber)=>{
        let sql = 'INSERT INTO buyer_info VALUES(?,?,?,?);';
        await db.query(sql, [id, password, name, phoneNumber]);
    },

    registerSeller: async(id, password, storeName, ownerName, businessNumber, storePhoneNumber,address_city, address_district, address_dong, address_detail)=>{
        let sql = 'INSERT INTO seller_info(seller_id, password, storeName, ownerName, businessNumber, storePhoneNumber,address_city, address_district, address_dong, address_detail) VALUES(?,?,?,?,?,?,?,?,?,?);';
        await db.query(sql, [id, password, storeName, ownerName, businessNumber, storePhoneNumber,address_city, address_district, address_dong, address_detail]);
    },

    checkBuyerIdDuplicate: async(buyer_id)=>{
        let sql = 'SELECT COUNT(*) as count FROM buyer_info WHERE buyer_id = ?';
        const [rows] = await db.query(sql, [buyer_id]);
        return rows[0].count;
    },

    checkSellerIdDuplicate: async(buyer_id)=>{
        let sql = 'SELECT COUNT(*) as count FROM seller_info WHERE seller_id = ?';
        const [rows] = await db.query(sql, [buyer_id]);
        return rows[0].count;
    },

    loginBuyer: async(id)=>{
        let sql = 'SELECT password from buyer_info WHERE buyer_id = ?'
        const [rows] = await db.query(sql, [id]);
        return rows[0].password;
    },

    loginSeller: async(id)=>{
        let sql = 'SELECT password from seller_info WHERE seller_id = ?'
        const [rows] = await db.query(sql, [id]);
        console.log(rows[0]);
        return rows[0].password;
    }
}

module.exports = User;
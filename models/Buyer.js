const db = require('../config/database').db;

const Buyer = {
    getBuyer: async(id)=>{
      let sql = "SELECT buyer_id, name, phoneNumber FROM buyer_info WHERE buyer_id=?";
      const [rows] = await db.query(sql,[id]);
        return rows[0];
    },

    updateBuyer: async(req,res)=>{
        
    },

    createReview: async(content, date, rating, buyer_id, seller_id)=>{

        let sql = "INSERT INTO review VALUES(?,?,?,?,?,?)"
        await db.query(sql , [0, content, date, rating, buyer_id, seller_id]);
    },

    getReviews: async(req,res)=>{
    },

    getMyOrder: async(id)=>{
        let sql = "SELECT o.order_id, bouquetPrice, orderDate, pickUpDate, orderStatus FROM FLOWN.order o INNER JOIN orderItem i ON o.order_id = i.order_id WHERE buyer_id=?";
        const [rows] = await db.query(sql,[id]);
        return rows;
    },

    getMyOrderDetail: async(id)=>{
        let sql = "SELECT name, color, price FROM flower WHERE flower_id IN (SELECT flower_id FROM FLOWN.orderItem i INNER JOIN bouquet_configuration c ON i.bouquet_id = c.bouquet_id WHERE i.order_id=?);";
        const [rows] = await db.query(sql,[id]);
        return rows;
    },
}

module.exports = Buyer;
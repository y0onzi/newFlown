const db = require('../config/database').db;

const Orders = {
    getOrdersheet: async (id) => {

        let sql = `SELECT b.price AS totalprice, name, flowerAmount, f.price, seller_id FROM FLOWN.bouquet b INNER JOIN bouquet_configuration c ON b.bouquet_id = c.bouquet_id
        INNER JOIN flower f ON c.flower_id = f.flower_id WHERE b.bouquet_id=${id};`

        const [rows] = await db.query(sql);
        return rows;
    },

    createOrdersheet: async (buyerId, user, name, pickupDate, phoneNumber, memo, bouquetId, totalPrice) => {
        //구매자아이디, 판매자아이디, 이름, 주문일자, 픽업일자, 폰넘버, 메모
        let sql = "INSERT INTO FLOWN.order values(0,?,?,?,?,?,?,?,?)";
        const [rows] = await db.query(sql, [buyerId, user, name, new Date(), pickupDate, 'waiting', phoneNumber, memo]);
        let sql2 = "INSERT INTO FLOWN.orderItem VALUES(0,?,?,?)";
       // console.log("===================/n 주문 모델 : " + totalPrice)
        await db.query(sql2, [rows.insertId, bouquetId, totalPrice]);
        //console.log(rows.insertId);

        // 꽃다발 테이블의 is_new 값을 2로 변경하여 주문 완료 상태로 표시
        const completeOrderQuery = 'UPDATE bouquet SET is_new = 2 WHERE bouquet_id = ?';
        await db.query(completeOrderQuery, [bouquetId]);
        console.log('꽃다발 주문 완료 처리 완료!');
    },

    completeOrder: async (bouquetId) => {
        try {
            // 꽃다발 테이블의 is_new 값을 2로 변경하여 주문 완료 상태로 표시
            const completeOrderQuery = 'UPDATE bouquet SET is_new = 2 WHERE bouquet_id = ?';
            await db.query(completeOrderQuery, [bouquetId]);
            console.log('꽃다발 주문 완료 처리 완료!');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = Orders;
const db = require('../config/database').db;

exports.getStoreById = async (sellerId) => {
    try{
        const queryStr = 'SELECT storeName, storePhoneNumber, address_city, address_district, address_dong, address_detail, storeRating, storeStatus FROM seller_info WHERE seller_id = ?'
        //console.log(db.query(queryStr, [sellerId]));
        const result = await db.query(queryStr, [sellerId]);
        console.log("1)models/index 조회 : " + result[0]);
        console.log(JSON.stringify(result[0]));// JSON 형식으로 출력
        //console.log(JSON.stringify(result[1])); 

        return result[0];
        //return  db.query(queryStr, [sellerId]);
    } catch(err){
        console.log("가게 조회 중 에러 발생", err)
    }    
}

exports.getFlowersByStoreId = async (sellerId) => {
    try{
        const queryStr = 'SELECT flower_id, name, color, price, photo, isSoldOut FROM flower WHERE seller_id = ?';
        const results = await db.query(queryStr, [sellerId]);
        console.log("2)models/index 조회 : " + results);
        console.log(JSON.stringify(results[0]));
        // for (let i = 0; i <= results.length; i++) {
        //     console.log(JSON.stringify(results[0])); // 전체 레코드를 JSON 형식으로 출력
        // }
        return results;
    } catch(err){
        console.log("상품 조회 중 에러 발생", err)
    }    
}
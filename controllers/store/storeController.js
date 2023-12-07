const storeModel = require("../../models/store");

module.exports = {
    //index : async(req, res, next) => {
    showStore : async(req, res) => {
        try {
             //가게 정보 조회'
            
            const sellerId = req.params.sellerId;
            //console.log("1스토어 부케 판매자아이디 세션 확인: " + sellerId);
            req.session.sellerId = sellerId;
            //이후에 꽃다발 생성 + 주문 생성시 필요!!  
            console.log("==2스토어 부케 판매자아이디 세션 확인: " + sellerId);
            //saveSellerIdToSession(sellerId);
            
            const store = await storeModel.getStoreById(sellerId);
            console.log("컨트롤러 결과 조회: " + JSON.stringify(store[0].storeName));
            
            if(!store){
                return res.status(404).send('Store not found');
            }
            
            //가게 정보 추출하기
            //const storeName = store[0].storeName;
            //const storePhoneNumber = store[0].storePhoneNumber;
            const storeAddress = store[0].address_city +" "+  store[0].address_district + " " + store[0].address_dong + " "+  store[0].address_detail;
            //const storeRating = store[0].storeRating;
            //const storeStatus = store[0].storeStatus;

            //꽃 정보 조회
            const flowers = await storeModel.getFlowersByStoreId(sellerId);
            //console.log(flowers[0][0].name);
            //res.local.flowers = flowers

            //const { storeName, storePhoneNumber, storeAddress } = store;
            res.render("store/index",  {
                storeName: store[0].storeName,
                storePhoneNumber: store[0].storePhoneNumber,
                storeAddress: storeAddress,
                storeRating: store[0].storeRating,
                storeStatus: store[0].storeStatus,
                flowers : flowers[0]
              });
        } catch(err){
            console.error(err);
        }
    }

    // saveSellerIdToSession: (sellerId) => {
    //     //const sellerId = req.params.sellerId; // 판매자 ID 값
    //     req.session.sellerId = sellerId; // sellerId를 세션에 저장
    //     console.log("저장된 셀러아이디 확인: " + sellerId);
        
    //     //res.send('Seller ID saved to session');
    //   }

}
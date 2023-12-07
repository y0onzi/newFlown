const ordersDao = require('../../models/Orders')
const bouquetModel = require('../../models/bouquet')

const ordersController = {

    getOrdersheet: async (req, res) => {
        try {
            const bouquetId = req.session.bouquetId;
            const sellerId = req.session.sellerId;
            //console.log("=======주문컨트롤러=======\n");
            //console.log(bouquetId);
            //console.log(sellerId);
            const rows = await bouquetModel.getBouquetItems(bouquetId, sellerId);

            //console.log("=======주문컨트롤러=======/n" + rows);
            //res.render('orders/orderSheet', { orders: rows, id: id });
            res.render('orders/orderSheet', { orders: rows, sellerId, bouquetId});
        } catch (error) {
            console.log(error);
            res.render('error', { message: '오류가 발생했습니다.' });
        }
    },

    createOrdersheet: async (req, res) => {
        try {
            const buyerId = req.session.user.id;
            const { name, phoneNumber, pickupDate, memo, user, id, totalPrice } = req.body;

            console.log(req.body);
            await ordersDao.createOrdersheet(buyerId, user, name, pickupDate, phoneNumber, memo, id, totalPrice);
            
            res.render('user/loginSuccess');

        } catch (error) {
            console.log(error);
            res.render('error', { message: '오류가 발생했습니다.' });
        }
    }

}
module.exports = ordersController;
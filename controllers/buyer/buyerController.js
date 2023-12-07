const buyerDao = require('../../models/Buyer');

const buyerController = {

    getBuyer: async (req, res) => {
        const id = req.session.user.id;

        const buyer = await buyerDao.getBuyer(id);
        res.render('buyer/buyerMypage', { buyer: buyer });
    },

    getMyOrder: async (req, res) => {
        if (req.session) {
            const id = req.session.user.id;

            const orders = await buyerDao.getMyOrder(id);
            console.log(orders);
            res.render('orders/myorder', { orders: orders });
        }
    },

    getMyOrderDetail: async (req, res) => {
        console.log(req.params.id);

        const id = req.params.id;
        const orderDetail = await buyerDao.getMyOrderDetail(id);
        console.log(orderDetail);
        res.render('orders/myorderDetail', { orders: orderDetail });
    }
}

module.exports = buyerController;
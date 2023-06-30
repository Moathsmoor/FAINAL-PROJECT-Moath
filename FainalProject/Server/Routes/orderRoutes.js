import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";
const orderRouter = express.Router();
//create order
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    console.log(req.User);
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error(" No order items");
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.User._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  })
);

// get order by id
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(400);
      throw new Error("Order Not Found");
    }
  })
);

//user Login order
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findBy({ user: req.user._id }).sort({ _id: -1 });

    res.json(order);
  })
);
// order is paid
orderRouter.post(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.PaidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_addriss: req.body.email_addriss,
      };

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(400);
      throw new Error("Order Not Found");
    }
  })
);

export default orderRouter;

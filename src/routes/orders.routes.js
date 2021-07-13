import { Router } from 'express';
import {placeOrder} from "../models/order.model.js";
import {editOrder} from "../models/order.model.js";
import {orderList} from "../models/order.model.js";
import { check } from "express-validator";

let router = Router();

router.post('/', [
    check('simid')
    .notEmpty()
    .withMessage('simid must not be empty')
    .isNumeric()
    .withMessage('simid must be a number')
    .exists(),
    check('customerId')
    .notEmpty()
    .withMessage('customerId must not be empty')
    .isNumeric()
    .withMessage('customerId must be a number')
    .exists()
], placeOrder);

router.patch('/:id', [
    check('status')
    .notEmpty()
    .withMessage('status must not be empty')
    .isAlpha()
    .withMessage('status must be a string')
    .exists()
], editOrder);

router.get('/', [
    check('page')
    .isNumeric()
    .withMessage('page must be a number'),
    check('limit')
    .isNumeric()
    .withMessage('limit must be a number')
], orderList);

export default router; 











// import { Router } from 'express';
// import Orders from "../models/order.model.js"

// let router = Router();

// router.post('/', placeOrders);
// // router.patch('/:id', takeOrder);
// // router.get('/', orderList);

// export default router;

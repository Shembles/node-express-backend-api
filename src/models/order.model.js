import pool from "../db/db-connection.js";
import { validationResult } from "express-validator";
import geoip from "geoip-lite";


export const placeOrder = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }

    ip = geoip.pretty(ip);
    var geo = geoip.lookup(ip);

    console.log("geolog >>",geo);
    console.log("ip >>",ip);
    
    const simid = req.body.simid;
    const customerId = req.body.customerId;
    const deliveryAddress = JSON.stringify(req.body.deliveryAddress);
    const geoAddress = geo ? JSON.stringify({geo}) : JSON.stringify({ip});

    console.log("body >>", req.body)
    // console.log("user >>", user)


    let sql = "INSERT INTO `orders` (`sim_card_simid`, `customer_customerId`, `deliveryAddress`, `geoAddress`) VALUES ?";
            
    let values = [[simid, customerId, deliveryAddress, geoAddress]]
           
    pool.query(sql, [values], function (err, data) {
        console.log("err >>", err)
        if (err) {
            console.log("no >>") 
            res.status(500).json({success: false, error: err})
        } else {
            console.log("yes >>")
            console.log("data >>", data)
            res.status(200).json({success: true, orderId: data.insertId, status: "Pending"})
        }
    });
};


export const editOrder = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const orderId = req.params.id;
    const orderStatus = req.body.status;
    console.log("body >>", req.body)
    console.log("orderid >>", orderId)
    pool.query("SELECT status FROM `orders` WHERE orderId = ? FOR SHARE", [orderId], function (err, result) {
        console.log("err >>", err)
        
        if (err) {
            console.log("no >>") 
            res.status(500).json({success: false, error: err})
        } else if (result[0].status === "Pending" && orderStatus === "Processing") {
            let sql = "UPDATE `orders` SET status = ? WHERE orderId= ?";
           
            pool.query(sql, [orderStatus, orderId], function (err, data) {
                console.log("err >>", err)
                if (err) {
                    console.log("no >>") 
                    res.status(500).json({success: false, error: err})
                } else {
                    console.log("yes >>")
                    console.log("data >>", data)
                    res.status(200).json({success: true})
                }
            });
            
        } else if (result[0].status === "Pending" && orderStatus === "Complete") {
            let sql = "UPDATE `orders` SET status = ? WHERE orderId= ?";
           
            pool.query(sql, [orderStatus, orderId], function (err, data) {
                console.log("err >>", err)
                if (err) {
                    console.log("no >>") 
                    res.status(500).json({success: false, error: err})
                } else {
                    console.log("yes >>")
                    console.log("data >>", data)
                    res.status(200).json({success: true})
                }
            });
            
        } else if (result[0].status === "Processing" && orderStatus === "Complete") {
            let sql = "UPDATE `orders` SET status = ? WHERE orderId= ?";
           
            pool.query(sql, [orderStatus, orderId], function (err, data) {
                console.log("err >>", err)
                if (err) {
                    console.log("no >>") 
                    res.status(500).json({success: false, error: err})
                } else {
                    console.log("yes >>")
                    console.log("data >>", data)
                    res.status(200).json({success: true})
                }
            });
            
        } else {
            res.status(500).json({success: false, error: "The order is already taken."})
        }

        
    })
};

export const orderList = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        if (!page || page < 1) {
            page = 1
        }
        if (!limit || limit < 1) {
            limit = 10
        }

        const size = limit
        const skip = (page - 1) * limit

        var sql = 'SELECT orderId AS id, customer_customerId AS customerId, status, created_at AS createdAt from orders limit ' + size + ' offset ' + skip;

        console.log("limit :" + limit + "\n req.query : " + req.query + "\n page : " + page + "\n skip : " + skip);

        pool.query(sql, function(err, rows, fields) {
            if (err) {
                res.status(500).json({success: false, error: err})
            }
            if (rows || fields) {
                res.status(200).json(rows);
            } else {
                res.json({});
            }
            
        });
    } catch (ex) {
        res.status(500).json({success: false, error: ex})
    }
};

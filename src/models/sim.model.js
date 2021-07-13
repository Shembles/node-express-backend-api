import pool from "../db/db-connection.js";

// get all sim cards
const getAllSimCards = async (req, res) => {
    try {
        const [rows] = await pool.promise().query(`SELECT * FROM sim_card`);
        res.status(200).json({success: true, data: rows})
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }

};

export default getAllSimCards;
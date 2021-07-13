import { Router } from 'express';
import getAllSimCards from "../models/sim.model.js"

let router = Router();

router.get('/', getAllSimCards);

export default router; 
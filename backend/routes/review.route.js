import express from 'express'
import {getReviewsForRoom, addReview} from '../controllers/review.controller.js'
import JWTVerify from '../middlewares/auth.middleware.js';


const router = express.Router();

router.get('/:roomId', getReviewsForRoom)
router.post('/add-review/:roomId', JWTVerify, addReview)

export default router;
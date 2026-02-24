import express from 'express'
import {getAllRooms, getRoomById, uploadRoom, getOwnerRoom, deleteRoom, getSearchedRoom} from '../controllers/room.controller.js'
import { upload } from '../middlewares/multer.middleware.js';
import JWTVerify from '../middlewares/auth.middleware.js';

const router=express.Router();


router.get("/",getAllRooms);
router.get("/getroom/:roomId",getRoomById);
router.post("/uploadroom", JWTVerify, upload.array("images",10), uploadRoom);
router.get("/owner-room", JWTVerify, getOwnerRoom);
router.get("/deleteRoom/:roomId",deleteRoom);
router.get("/search",getSearchedRoom);

export default router;
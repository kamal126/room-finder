import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '3h' })
    console.log("token-> ",token);
         res.cookie("jwt",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
        sameSite: process.env.SAME_SITE, // Allows the cookie to be sent with cross-origin requests
        maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
    })
}

export default generateTokenAndSetCookie;
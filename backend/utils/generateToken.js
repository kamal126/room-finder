import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  console.log("token-> ", token);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,           // 🔥 MUST true in production
    sameSite: "None",       // 🔥 MUST for Vercel + Render
    maxAge: 3 * 60 * 60 * 1000
  });
};

export default generateTokenAndSetCookie;
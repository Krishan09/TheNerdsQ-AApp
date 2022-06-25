import jwt from "jsonwebtoken";

export default async function JwtTokenCreator(data, expiresIn = "2h") {
  try {
    const tokenData = {
        userId: data.id,
        username: data.username,
        email: data.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn });
    return token;
  } catch (err) {
    return err;
  }
}
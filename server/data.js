import { useResolvedPath } from "react-router-dom";
import db from "./db";

 export async function registerUsers (email, username, password) {
    const query = `INSERT INTO users(email, username, passwd)
    VALUES ($1, $2, $3)
    RETURNING *`;
    const result = await db.query(query,[email, username, password]);
    return result;

}

export async function loginUser (email, username, password){
    const query = "SELECT * FROM users WHERE email= $1";
    const result  = await db.query(query,[email]);
    if (result.rows.length==0){
    return null;
    }else{
     return result.rows[0];
}
 }

export default { registerUsers };
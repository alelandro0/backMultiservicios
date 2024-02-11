import getTokenFromHeader from "../auth/getTokenFromHeader.mjs";
import Token from "../models/token.mjs";
import {jsonResponse} from "../lib/jsonResponse.mjs";

const deleteSignout= async(req, res)=>{
    try {
        const refreshToken = getTokenFromHeader(req.headers);
        if(refreshToken){
            await Token.findOneAndRemove({token: refreshToken});
            res.status(200).json(jsonResponse(500, { message: "Server error" }));
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(jsonResponse(500, {error: "Error del server"}))
    }

}
export default deleteSignout
import  jwt  from "jsonwebtoken";

function jwtToken({user_id, user_name, user_email}) {
    const user = {user_id, user_name, user_email};
    console.log(user);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRETS, {expiresIn: '20s'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRETS, {expiresIn: '5m'});

    return ({accessToken,refreshToken});
}


export default jwtToken;
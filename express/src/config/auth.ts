const auth_config = {
    cookie_name: "jid",
    refresh_token_key: process.env.REFRESH_TOKEN_KEY || "refresh_token_key",
    access_token_key: process.env.ACCESS_TOKEN_KEY || "access_token_key",
    rtk_exp: "7d",
    atk_exp: "15m",
};

export default auth_config;

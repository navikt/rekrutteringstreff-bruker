import "./envConfig";

const hentServerConfigMap = () => ({
    loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL,
});

export const serverConfig = hentServerConfigMap();


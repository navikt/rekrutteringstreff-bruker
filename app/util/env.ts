export function getServerEnv(): {
    SESSION_URL: string,
    LOGIN_URL: string,
} {
    if (process.env.NEXT_PUBLIC_SESSION_URL == null) {
        throw new Error("Miljøvariabelen NEXT_PUBLIC_SESSION_URL er ikke satt");
    }

    if (process.env.NEXT_PUBLIC_LOGIN_URL == null) {
        throw new Error("Miljøvariabelen NEXT_PUBLIC_LOGIN_URL er ikke satt");
    }

    return {
        SESSION_URL: process.env.NEXT_PUBLIC_SESSION_URL as string,
        LOGIN_URL: process.env.NEXT_PUBLIC_LOGIN_URL as string,
    }
}

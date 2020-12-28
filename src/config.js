export function getConfig() {
    return {
        server: {
            url: process.env.SERVER_URL,
            token: process.env.AUTH_TOKEN,
        }
    }
}

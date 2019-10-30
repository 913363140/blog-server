'use staict'

let config = {
    // port: parseInt(process.env.PORT, 10) || 8001,
    port: 8888,
    url: 'mongodb://127.0.0.1:27017/blog',
    session: {
        name: 'SID',
        secret: 'SID',    
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000
        }
    }
}

export default config
class Util {
    static getAppEnv() {
        return process.env.NODE_ENV;
    }

    static isDevEnv() {
        return this.getAppEnv() === 'development';
    }

    static getSuccessApiResponse(data) {
        return {
            statusCode: 200,
            data,
        };
    }

    static getErrorApiResponse(statusCode, message) {
        return {
            error: true,
            statusCode,
            message,
        };
    }

    static parseBearerToken(bearerToken) {
        const [type, token] = bearerToken.split(' ');
        
        if (type.toLowerCase() !== 'bearer') {
            throw new Error('Token should be of type "Bearer"');
        }
        
        return token;
    }
}

module.exports = Util;

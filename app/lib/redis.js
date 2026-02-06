import Redis from "ioredis";

let redis;

if (process.env.REDIS_URL){
    redis = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        retryStrategy(times){
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
    });


    redis.on('error', (err) => {
        console.error('Redis client error', err);
    });

    redis.on('connect', () => {
        console.log('Redis Client Connected');
    });
} else{
    console.warn('Redis URL not configured, caching disabled');
}

// Cache helper functions
export const cache = {
    async get(key){
        if (!redis) return null;

        try {
            const data = await redis.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Redis GET error:", error);
            return null;
        }
    },

    async set(key, value, expirationInSeconds = 300){
        if (!redis) return false;
        try {
            await redis.setex(key, expirationInSeconds, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Redis SET error', error);
            return false;
        }
    },

    async del(key){
        if (!redis) return false;
        try {
            await redis.del(key);
            return true;
        } catch (error) {
            console.error('Redis DEL error', error);
            return false;
        }
    },

    async delPattern(pattern){
        if (!redis) return false;
        try {
            const keys = await redis.keys(pattern);
            if(keys.length > 0){
                await redis.del(...keys);
            }
            return true;
        } catch (error) {
         console.error('Redis DEL PATTERN error:', error);
         return false;   
        }
    },
};

export default redis;
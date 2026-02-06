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
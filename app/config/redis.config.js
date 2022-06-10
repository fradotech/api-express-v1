const host = process.env.REDIS_HOST
const port = parseInt(process.env.REDIS_PORT)
const password = process.env.REDIS_PASSWORD

const redis = require('ioredis')
const client = redis.createClient({
  host,
  port,
  password
})

client.on('error', (error) => {
  console.log('Redis connection error :', error)
})

client.on('connect', () => {
  console.log('Connected to redis successfully!')
})

const redisConnet = async () => {
  await client.auth(process.env.REDIS_PASSWORD)
  .catch(err => { console.log('Redis auth error: ' + err.message) });
}

redisConnet()

module.exports = client
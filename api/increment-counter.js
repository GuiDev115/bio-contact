// api/increment-counter.js
import { Redis } from '@upstash/redis'
require('dotenv').config()

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  try {
    const counter = await redis.incr('pageviews')
    res.status(200).json({ pageviews: counter })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao incrementar contador' })
  }
}
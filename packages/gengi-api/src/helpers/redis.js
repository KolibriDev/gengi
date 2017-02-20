import redis from 'redis'
import { getExpirytime } from './time'

class Redis {
  constructor() {
    this.client = redis.createClient(process.env.REDIS_URL || '')

    this.ready = false
    this.error = ''
    this.cacheKey = 'mastercard-gengi'

    this.clientEvents()
  }

  set(data) {
    this.isReady((err) => {
      if (!err) {
        this.client.setex(this.cacheKey, getExpirytime(data.currencyDate), JSON.stringify(data))
      }
    })
  }

  get(callback) {
    this.isReady((err) => {
      if (err) {
        callback(err)
      } else {
        this.client.get(this.cacheKey, (error, results) => {
          if (error) {
            callback(error)
          } else {
            callback(null, JSON.parse(results))
          }
        })
      }
    })
  }

  clear() {
    this.isReady((err) => {
      if (!err) {
        this.client.del(this.cacheKey)
      }
    })
  }

  isReady(callback) {
    if (this.ready) {
      callback()
    } else {
      callback({ error: this.error })
    }
  }

  clientEvents() {
    this.client.on('error', (err) => {
      this.error = err
      this.ready = false
    })
    this.client.on('ready', () => {
      this.error = ''
      this.ready = true
    })
  }
}

export default new Redis()

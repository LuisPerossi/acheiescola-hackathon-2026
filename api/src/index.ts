import { Hono } from 'hono'
import waitlistRouter from './routes/waitlist'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

app.route('/waitlist', waitlistRouter)

app.onError((err, c) => {
    console.log(err)
    return c.json({ success: false, message: "Internal server error" }, 500)
})

export default app

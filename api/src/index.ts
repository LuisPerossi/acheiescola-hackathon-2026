import { Hono } from 'hono'
import waitlistRouter from './routes/waitlist'

const app = new Hono()

app.route('/waitlist', waitlistRouter)

app.onError((err, c) => {
    console.log(err)
    return c.json({ success: false, message: "Internal server error" }, 500)
})

export default app

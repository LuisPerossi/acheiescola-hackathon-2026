import { Hono } from 'hono'
import waitlistRouter from './routes/waitlist'

const app = new Hono()

app.route('/waitlist', waitlistRouter)

export default app
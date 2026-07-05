import { Hono } from "hono";

const router = new Hono()

router.get('/', (c) => {
    return c.text("Hello world!")
})

export default router
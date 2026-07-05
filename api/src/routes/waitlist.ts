import { Hono } from "hono";

const router = new Hono<{ Bindings: CloudflareBindings }>()

router.get('/', async (c) => {
    const { req, env } = c
    const { db } = env
    
    const json = await req.json().catch((err) => (null))

    const { cpf } = json

    //Implement proper validation later
    if (!cpf) {
        return c.json({ success: false, message: "Invalid json" })
    }

    const data = await db.prepare("SELECT * FROM waitlist ORDER BY points DESC")
        .all()

    const result = data.results.map((row, index) => ({
        position: index + 1,
        name: (row.cpf === cpf) ? row.name : "******",
        points: row.points
    }))

    return c.json({ success: true, message: "Successfully retrieved waitlist!", data: result})
})

router.post('/', async (c) => {
    const { req, env } = c
    const { db } = env
    
    const json = await req.json().catch((err) => (null))

    const { cpf, name, points } = json

    //Implement proper validation later
    if (!cpf || !name || !points) {
        return c.json({ success: false, message: "Invalid json" })
    }

    await db.prepare("INSERT INTO waitlist(cpf, name, points) VALUES (?, ?, ?)")
        .bind(cpf, name, points)
        .run()

    return c.json({ success: true, message: "Waitlist entry created successfully!" })
})


export default router
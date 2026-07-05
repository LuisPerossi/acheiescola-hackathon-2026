import { Hono } from "hono";

const router = new Hono<{ Bindings: CloudflareBindings }>()

router.get('/:cpf?', async (c) => {
    const { req, env } = c
    const { db } = env
  
    const cpf = req.param('cpf')

    const data = await db.prepare("SELECT * FROM waitlist ORDER BY points DESC")
        .all()

    const result = data.results.map((row, index) => ({
        position: index + 1,
        name: (row.cpf === cpf) ? row.name : "******",
        points: row.points
    }))

    return c.json({ success: true, message: "Successfully retrieved waitlist!", data: result}, 200)
})

router.post('/', async (c) => {
    const { req, env } = c
    const { db } = env
    
    const json = await req.json().catch((err) => (null))

    const { cpf, name, points } = json

    //Implement proper validation later
    if (!cpf || !name || !points) {
        return c.json({ success: false, message: "Invalid json" }, 400)
    }

    await db.prepare("INSERT INTO waitlist(cpf, name, points) VALUES (?, ?, ?)")
        .bind(cpf, name, points)
        .run()

    return c.json({ success: true, message: "Waitlist entry created successfully!" }, 200)
})

router.delete('/:cpf', async (c) => {
    const { req, env } = c
    const { db } = env
  
    const cpf = req.param('cpf')

    const res = await db.prepare("DELETE FROM waitlist WHERE cpf = ?")
        .bind(cpf)
        .run()

    if (res.meta.changes == 0) {
        return c.json({ success: false, message: "Unable to find entry for deletion!" }, 404)
    }

    return c.json({ success: true, message: "Waitlist entry deleted successfully!" }, 200)
})

router.patch(':/cpf', async (c) => {
    const { req, env } = c
    const { db } = env
    
    const json = await req.json().catch((err) => (null))

    const { cpf, name, points } = json

    if (!cpf || !name || !points) {
        return c.json({ success: false, message: "Invalid json" }, 400)
    }

    const res = await db.prepare("UPDATE waitlist SET name = ?, points = ? WHERE cpf = ?")
        .bind(name, points, cpf)
        .run()
    
    if (res.meta.changes == 0) {
        return c.json({ success: false, message: "Unable to find entry for update!" }, 404)
    }

    return c.json({ success: true, message: "Waitlist entry updated successfully!" }, 200)
})


export default router
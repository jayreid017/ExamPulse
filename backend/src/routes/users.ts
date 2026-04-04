import { Router } from "express";
import { getAllUsers } from "../users";

const router = Router();

router.get("/", async (req, res) => {
    const data = await getAllUsers();

    if (!data) {
        return res.status(500).json({ error: "Error fetching users" });
    }

    res.json(data);
});

export default router;

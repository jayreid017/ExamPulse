import { Router } from "express";
import { registerUser, loginUser, getUserRole } from "../users";
import { authenticate } from "../middleware/middleware";
import type { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, name } = req.body;
    const result = await registerUser(email, password, name);
    if (result.error) return res.status(400).json({ error: result.error });
    res.json({ message: "User registered successfully", user: { email, name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ error: "Request body is missing" });

    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const result = await loginUser(email, password);

    if (result.error) return res.status(401).json({ error: result.error });

    res.json({ message: "Login successful", session: result.data?.session });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});



router.get("/me", authenticate, async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  console.log(user);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
    
  }

  const role = await getUserRole(user.id);
  res.json({ user, role });
});

export default router;

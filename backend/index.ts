import express from "express";
import cors from "cors";


import authRoutes from "./src/routes/auth";
import userRoutes from "./src/routes/users";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main App Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
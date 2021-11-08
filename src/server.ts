import dotenv from "dotenv";

dotenv.config();

import { app } from "./app";

import "./database/connection";

// Constants
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

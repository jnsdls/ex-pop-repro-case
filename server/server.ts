import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import express from "express";
import cors from "cors";

const PORT = 8089;
const app = express();

const { authRouter, authMiddleware, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  thirdwebAuthOptions: {
    secretKey: process.env.THIRDWEB_AUTH_SECRET_KEY,
  },
});

// allow cors from the frontend
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Add the auth router to our app to set up the /auth/* endpoints
app.use("/auth", authRouter);

// Add the auth middleware to the rest of our app to allow user authentication on other endpoints
app.use(authMiddleware);

app.use("/test", async (req, res) => {
  const user = await getUser(req);

  console.log("user", user);

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  res.json({
    message: "Hello from the server!",
    user: user,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

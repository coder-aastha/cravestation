import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import fs from "fs";
import helmet from "helmet";
import http from "http";
import https from "https";
import path from "path";
import connectDB from "./db/connectDB";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import restaurantRoute from "./routes/restaurant.route";
import userRoute from "./routes/user.route";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
const HTTP_PORT = 3000;
const DIRNAME = path.resolve();

// ✅ Security Middleware (Helmet)
app.use(helmet());
app.use(helmet.hsts({ maxAge: 63072000, includeSubDomains: true }));
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.noSniff());

app.use((req, res, next) => {
  // Fallback for missing nosniff header
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.disable("x-powered-by");

// ✅ CSP (Content Security Policy)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://localhost:5173"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "https://localhost:5173"],
    },
  })
);

// ✅ Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
  message: "Too many requests, please try again later.",
});
app.use(globalLimiter);

// Login-specific limiter
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again later.",
});

// ✅ Apply login limiter **inside user route** (don't duplicate)
app.use("/api/v1/user/login", loginLimiter);

// ✅ Middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.static(path.join(DIRNAME, "public")));

// ✅ Routes
app.use("/api/v1/user", userRoute); // loginLimiter is already scoped above
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// ✅ SSL
const sslOptions = {
  key: fs.readFileSync(path.join(DIRNAME, "server", "certs", "key.pem")),
  cert: fs.readFileSync(path.join(DIRNAME, "server", "certs", "cert.pem")),
};

// ✅ HTTPS Server
https.createServer(sslOptions, app).listen(PORT, () => {
  connectDB();
  console.log(`🚀 Secure server running at https://localhost:${PORT}`);
});

// ✅ HTTP → HTTPS redirect
http
  .createServer((req, res) => {
    const host = req.headers.host?.replace(/:\d+$/, `:${PORT}`);
    if (!host) {
      res.writeHead(400);
      res.end("Bad Request");
      return;
    }
    res.writeHead(301, { Location: `https://${host}${req.url}` });
    res.end();
  })
  .listen(HTTP_PORT, () => {
    console.log(
      `🌐 Redirecting http://localhost:${HTTP_PORT} → https://localhost:${PORT}`
    );
  });

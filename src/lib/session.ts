import { SessionOptions } from "iron-session";

export interface SessionData {
  agent?: {
    id: string;
    email: string;
    agentType: "agency" | "individual";
    name?: string;
  };
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD || "your-secret-password-here",
  cookieName: "ticketagent-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

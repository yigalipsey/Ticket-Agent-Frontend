import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(request, NextResponse.next(), sessionOptions);

    if (!session.agent) {
      return NextResponse.json(
        { success: false, error: "AUTH_TOKEN_REQUIRED" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: session.agent,
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { success: false, error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}

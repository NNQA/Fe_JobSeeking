import { toActionErrorsAsync } from "@/lib/error.server";
import { ApiClient } from "@/lib/service/api-client.server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return NextResponse.json({
        status: "success",
        statusCode: 200,
        scheduled_day: "asdkhagskdghkh",
      })
  
}
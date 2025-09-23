import { NextResponse } from "next/server";
import { ApiClient } from "@/lib/service/api-client.server";
import { JobCategory } from "@/lib/models/Categories";
import { TypeResponseSuccess } from "@/lib/models/response-type";

export async function GET() {
    try {
        const res = await ApiClient.instance.get("/api/category/get-list-category", {
            cache: "default",
        });

        if (res.isOk()) {
            const data = await res.value.json() as TypeResponseSuccess<JobCategory[]>;
            return NextResponse.json(data, { status: 200 });
        }

        return NextResponse.json({ error: "Failed to fetch dependencies" }, { status: 500 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

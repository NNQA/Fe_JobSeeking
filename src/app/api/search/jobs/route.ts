import { NextRequest, NextResponse } from "next/server";
import { JobDocument } from "@/lib/models/Document/JobDocument";
import { PageResponseSearch } from "@/lib/models/PageResponseSearch";
import { ApiClient } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";

export const dynamic = 'force-dynamic';
export type SearchJobResponse = PageResponseSearch<JobDocument>;

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.toString();

        const result = await ApiClient.instance.get(`/api/search/jobs?${query}`, {
            cache: "no-store",
        });

        if (result.isOk()) {
            const data: SearchJobResponse = await result.value.json();


            return NextResponse.json(data, { status: 200 });
        } else {
            console.error('API Client Error:', result.error);

            const errorDetails = await toActionErrorsAsync(result.error);
            return NextResponse.json(errorDetails, { status: 400 });
        }
    } catch (err) {
        console.error('Unexpected error in GET /api/search/jobs:', err);

        const errorDetails = await toActionErrorsAsync(err);
        return NextResponse.json(errorDetails, { status: 400 });

    }
}
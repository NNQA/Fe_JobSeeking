"use server"

import { toActionErrorsAsync } from "@/lib/error.server";
import { ServerActionResponse } from "@/lib/models/TypeResponseSuccess";
import { ERole } from "@/lib/models/User";
import { ApiClient } from "@/lib/service/api-client.server";
import { getErrorMessage } from "@/lib/utils";


export async function signUpActionForm(email: string, password: string, role: ERole): Promise<ServerActionResponse<null>> {
    try {
        const result = await ApiClient.instance.post("api/auth/signup", {
            body: {
                email: email,
                password: password,
                role: role,
            },
        });
        if (result.isOk()) {
            return {
                body: null,
                message: "Email sent successfully",
                status: 200,
                success: true
            };
        }
        const errAfterActionAs = await toActionErrorsAsync(result.error);
        return {
            success: false,
            error: getErrorMessage(errAfterActionAs),
            status: 400
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "An unexpected error occurred",
            status: 500
        };
    }
}   
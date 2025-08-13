"use server"
import { toActionErrorsAsync } from "@/lib/error.server";
import { ServerActionResponse } from "@/lib/models/TypeResponseSuccess";
import { ApiClient } from "@/lib/service/api-client.server";
import { getErrorMessage } from "@/lib/utils";
export async function sendEmailServerAction(email: string): Promise<ServerActionResponse<any>> {
  try {
    const result = await ApiClient.instance.post(
      "api/auth/request-token-email",
      {
        body: { email },
      }
    );
    if (result.isOk()) {
      return {
        body: result.value,
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
    return { 
      success: false,
      error: "An unexpected error occurred",
      status: 500
    };
  }
}   
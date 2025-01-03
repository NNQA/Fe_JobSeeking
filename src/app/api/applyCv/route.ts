import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { initializeApp } from "firebase/app";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { firebaseConfig } from "@/lib/firebase-setup";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";
import { toActionErrorsAsync } from "@/lib/error.server";
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const formData = await req.formData();

    const idJob = formData.get("idJob");
    if (!idJob) {
      return new Response(JSON.stringify({ message: "IdJob cannot be null" }), {
        status: 500,
      });
    }

    const file: any = formData.get("resume");

    if (!file) {
      return new Response(JSON.stringify({ message: "File cannot be null" }), {
        status: 500,
      });
    }
    const { name } = file;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const fileId = uuidv4();
    const storageRef = ref(storage, `uploads/${fileId}/${name}`);

    const { metadata } = await uploadBytes(storageRef, buffer);
    const { fullPath } = metadata;

    if (!fullPath) {
      return new Response(
        JSON.stringify({
          error: "There was some error while uploading the file.",
        }),
        { status: 500 }
      );
    }
    const downloadURL = await getDownloadURL(storageRef);

    const api = SessionApi.from(cookies());

    const result = await api.post("api/applicant/createApplicant", {
      body: {
        jobId: idJob,
        resumeUrl: downloadURL,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    result.match(
      (ok) => {
        return new Response(
          JSON.stringify({ message: "Uploaded Successfully" }),
          { status: 200 }
        );
      },
      (err) => {
        return new Response(JSON.stringify({ message: err.message }), {
          status: 200,
        });
      }
    );
    return new Response(JSON.stringify({ message: "Uploaded Successfully" }), {
      status: 200,
    });
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({
        error: "Server Error",
      }),
      { status: 500 }
    );
  }
}

export const experimental_ppr = true

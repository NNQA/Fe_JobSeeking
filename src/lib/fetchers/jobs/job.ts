export async function fetchJobDependencies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/jobs/dependencies`, {
        method: "GET",
        cache: "default"

    });
    if (!res.ok) throw new Error("Failed to fetch job dependencies");

    return res.json();
}

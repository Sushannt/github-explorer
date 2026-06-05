export { GITHUB_API_BASE_URL as API_BASE_URL } from "./constants";

export const JSONResponse = <T>(data: T, status = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export async function unwrap<T>(
  promise: Promise<T>,
): Promise<[T | null, Error | null]> {
  try {
    return [await promise, null];
  } catch (error) {
    return [
      null,
      error instanceof Error ? error : new Error("Unknown error occurred"),
    ];
  }
}

export type JsonBody =
  | { ok: true; value: unknown }
  | { ok: false; reason: "too-large" | "invalid" };

/**
 * Reads a request body as JSON, giving up once it passes `maxBytes`. Using
 * `request.json()` here would buffer the whole body first: a chunked request
 * has no Content-Length, so nothing else can stop it from growing memory.
 */
export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<JsonBody> {
  const reader = request.body?.getReader();
  if (!reader) return { ok: false, reason: "invalid" };

  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        // Already over the limit, so a failed cancel doesn't change the answer.
        await reader.cancel().catch(() => {});
        return { ok: false, reason: "too-large" };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "invalid" };
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, value: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}

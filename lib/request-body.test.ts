import { describe, expect, it } from "vitest";
import { readJsonBody } from "./request-body";

function post(body: BodyInit) {
  return new Request("http://localhost/api/contact", { method: "POST", body });
}

describe("readJsonBody", () => {
  it("parses a JSON object", async () => {
    const body = JSON.stringify({ name: "A", message: "hi" });
    await expect(readJsonBody(post(body), 1024)).resolves.toEqual({
      ok: true,
      value: { name: "A", message: "hi" },
    });
  });

  it("accepts a body exactly at the limit", async () => {
    const body = JSON.stringify({ a: "x" });
    const result = await readJsonBody(post(body), body.length);
    expect(result.ok).toBe(true);
  });

  it("rejects a body over the limit", async () => {
    const body = JSON.stringify({ message: "x".repeat(100) });
    await expect(readJsonBody(post(body), 50)).resolves.toEqual({
      ok: false,
      reason: "too-large",
    });
  });

  it("rejects invalid JSON", async () => {
    await expect(readJsonBody(post("{"), 1024)).resolves.toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it("rejects an empty body", async () => {
    await expect(readJsonBody(post(""), 1024)).resolves.toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it("rejects a request with no body", async () => {
    const request = new Request("http://localhost/api/contact", { method: "POST" });
    await expect(readJsonBody(request, 1024)).resolves.toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it("stops reading a chunked body once it passes the limit", async () => {
    let pulled = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulled += 1;
        controller.enqueue(new Uint8Array(32));
      },
    });
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: stream,
      duplex: "half",
    } as RequestInit);
    await expect(readJsonBody(request, 100)).resolves.toEqual({
      ok: false,
      reason: "too-large",
    });
    // An endless stream, so finishing at all means it gave up early.
    expect(pulled).toBeLessThan(10);
  });
});

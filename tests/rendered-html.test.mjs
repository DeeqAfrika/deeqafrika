import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://campaign.test${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("redirects the root to the English campaign", async () => {
  const response = await render("/");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.equal(new URL(response.headers.get("location"), "https://campaign.test").pathname, "/en");
});

test("server-renders the English campaign home page", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="en"/i);
  assert.match(html, /<title>Deeq M Afrika \| Rebuild Somali Football<\/title>/i);
  assert.match(html, /Rebuild Somali Football/);
  assert.match(html, /Xiriir Furan/);
  assert.match(html, /Fursad Siman/);
  assert.match(html, /\/so/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("server-renders the Somali campaign plan", async () => {
  const response = await render("/so/plan");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="so"/i);
  assert.match(html, /Qorshaha/);
  assert.match(html, /Maamul/);
  assert.match(html, /href="\/en\/plan"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/i);
});

import { Router } from "express";
import { exec } from "child_process";
import { promisify } from "util";
import { existsSync, readFileSync } from "fs";
import path from "path";

const execAsync = promisify(exec);
const router = Router();

const WORKSPACE_ROOT = path.resolve(import.meta.dirname, "..", "..", "..", "..");
const DIST_PATH = path.join(WORKSPACE_ROOT, "artifacts", "omni-dash", "dist", "single", "index.html");

router.get("/export/omni-dash", async (req, res) => {
  try {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Transfer-Encoding": "chunked",
    });

    const sendEvent = (msg: string) => {
      res.write(`data: ${JSON.stringify({ msg })}\n\n`);
    };

    sendEvent("Starting build…");

    await execAsync(
      `pnpm --filter @workspace/omni-dash exec vite build --config vite.single.config.ts`,
      { cwd: WORKSPACE_ROOT, timeout: 120000 }
    );

    sendEvent("Build complete!");

    if (!existsSync(DIST_PATH)) {
      res.write(`data: ${JSON.stringify({ error: "Build output not found" })}\n\n`);
      res.end();
      return;
    }

    const html = readFileSync(DIST_PATH, "utf8");
    const b64 = Buffer.from(html).toString("base64");
    res.write(`data: ${JSON.stringify({ done: true, b64 })}\n\n`);
    res.end();
  } catch (err: any) {
    res.write(`data: ${JSON.stringify({ error: err.message ?? "Build failed" })}\n\n`);
    res.end();
  }
});

export default router;

import { Router } from "express";
import { exec } from "child_process";
import { promisify } from "util";
import { existsSync, readFileSync, statSync } from "fs";
import path from "path";

const execAsync = promisify(exec);
const router = Router();

const WORKSPACE_ROOT = path.resolve(import.meta.dirname, "..", "..", "..", "..");
const DIST_PATH = path.join(WORKSPACE_ROOT, "artifacts", "omni-dash", "dist", "single", "index.html");

// POST /api/export/omni-dash — builds & returns the file as an octet-stream
// Using application/octet-stream prevents any proxy from injecting extra content.
router.post("/export/omni-dash", async (req, res) => {
  try {
    await execAsync(
      `pnpm --filter @workspace/omni-dash exec vite build --config vite.single.config.ts`,
      { cwd: WORKSPACE_ROOT, timeout: 120000 }
    );

    if (!existsSync(DIST_PATH)) {
      res.status(500).json({ error: "Build output not found" });
      return;
    }

    // Read and strip any Replit-injected banner scripts (defensive cleanup)
    let html = readFileSync(DIST_PATH, "utf-8");
    html = html.replace(/<script[^>]*replit[^>]*>[\s\S]*?<\/script>/gi, "");
    html = html.replace(/<div[^>]*data-replit[^>]*>[\s\S]*?<\/div>/gi, "");

    const buf = Buffer.from(html, "utf-8");

    // Send as octet-stream so Replit's proxy doesn't treat this as an HTML
    // page and won't inject its dev-banner or "Made with Replit" badge.
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", 'attachment; filename="omni-dash.html"');
    res.setHeader("Content-Length", buf.byteLength);
    res.setHeader("Cache-Control", "no-store");
    res.end(buf);
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message ?? "Build failed" });
    }
  }
});

export default router;

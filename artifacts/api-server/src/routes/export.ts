import { Router } from "express";
import { exec } from "child_process";
import { promisify } from "util";
import { existsSync, createReadStream, statSync } from "fs";
import path from "path";

const execAsync = promisify(exec);
const router = Router();

const WORKSPACE_ROOT = path.resolve(import.meta.dirname, "..", "..", "..", "..");
const DIST_PATH = path.join(WORKSPACE_ROOT, "artifacts", "omni-dash", "dist", "single", "index.html");

// POST /api/export/omni-dash — builds & streams the file directly (no JSON wrapper)
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

    const stat = statSync(DIST_PATH);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="omni-dash.html"');
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Cache-Control", "no-store");
    createReadStream(DIST_PATH).pipe(res);
  } catch (err: any) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message ?? "Build failed" });
    }
  }
});

export default router;

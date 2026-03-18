console.log("Build started...");

// Agar backend bo'lsa (Express)
import { execSync } from "child_process";

try {
  execSync("tsc", { stdio: "inherit" });
  console.log("Build finished successfully");
} catch (error) {
  console.error("Build failed");
  process.exit(1);
}
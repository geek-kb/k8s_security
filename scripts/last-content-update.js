const {execSync} = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Gets the last commit date for the docs/ directory
 * This only considers changes to actual documentation content
 */
function getLastContentUpdate() {
  try {
    // Get the last commit date for the docs/ directory
    const lastCommitDate = execSync(
      'git log -1 --format="%ci" -- docs/',
      {encoding: "utf-8", cwd: path.resolve(__dirname, "..")}
    ).trim();

    if (!lastCommitDate) {
      console.log("No commits found for docs/ directory");
      return null;
    }

    // Parse and format the date
    const date = new Date(lastCommitDate);
    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Also get ISO format for structured data
    const iso = date.toISOString().split("T")[0];

    return {
      formatted,
      iso,
      timestamp: date.getTime(),
    };
  } catch (error) {
    console.error("Error getting last content update:", error.message);
    return null;
  }
}

// Get the update date
const updateInfo = getLastContentUpdate();

if (updateInfo) {
  const outputPath = path.resolve(__dirname, "../src/data/last-update.json");
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  fs.writeFileSync(outputPath, JSON.stringify(updateInfo, null, 2));
  console.log(`Last content update: ${updateInfo.formatted}`);
  console.log(`Written to: ${outputPath}`);
} else {
  console.log("Could not determine last content update date");
}

const fs = require("fs-extra");
const exec = require("sync-exec");
const pkg = require("../package.json");
const chalk = require("chalk");
function shell(cmd, ignore = false) {
  let result = exec(cmd);
  if (!result.stderr) {
    !ignore && console.log(result.stdout);
  } else {
    if (!ignore) {
      console.error(result.stderr);
      throw new Error(result.stderr);
    }
  }
  return result.stdout;
}

const version = pkg.version;
const isRcBranch = /\d+\.\d+\.\d+-rc/.test(version);
const hasUpstream = (function() {
  const result = shell("git remote show", true);
  return !!~result.split("\n").indexOf("upstream");
})();
const hasDistfolder = (function() {
  const result = fs.readFileSync(__dirname + "/../.gitignore",{encoding: "utf8"});
  return !!~result.split("\n").indexOf("dist/") || !!~result.split("\n").indexOf("dist");
})();

if (isRcBranch && hasUpstream && hasDistfolder) {
  const gitid = shell("git rev-parse HEAD");
  const newVersion = version.substring(0, version.indexOf("-rc"));
  try {
      pkg.version = newVersion;

      console.log(chalk.green(`1. Change package.json version to '${newVersion}'`));
      fs.writeJsonSync(__dirname + "/../package.json", pkg, {spaces: "\t"});
      
      console.log(chalk.green("2. Build"));
      console.log(chalk.gray(`  # npm run build`));
      shell("npm run build");

      console.log(chalk.green("3. Commit"));
      console.log(chalk.gray("  # git add --all"));
      shell(`git add --all`);
      console.log(chalk.gray(`  # git commit -m "chore(release): Release ${newVersion}"`));
      shell(`git commit -m "chore(release): Release ${newVersion}"`);

      console.log(chalk.green(`4. Create local tag '${newVersion}'`));
      console.log(chalk.gray(`  # git tag -d ${newVersion}`));
      shell(`git tag -d ${newVersion}`, true);
      console.log(chalk.gray(`  # git tag ${newVersion}`));
      shell(`git tag ${newVersion}`);
      
      console.log(chalk.green(`5. Push tag '${newVersion}'`));
      console.log(chalk.gray(`  # git push upstream :${newVersion}`));
      shell(`git push upstream :${newVersion}`, true);
      console.log(chalk.gray(`  # git push upstream ${newVersion}`));
      shell(`git push upstream ${newVersion}`);
      
      console.log(chalk.green(`6. Deploy demo: '${newVersion}'`));
      console.log(chalk.gray(`  # npm run demo:deploy`));
      shell(`npm run demo:deploy`);
      
      console.log(chalk.green(`7. Register npm with ${newVersion}. The registration procedure is as follows.`));
      console.log(chalk.greenBright(`  # npm login`));
      console.log(chalk.greenBright(`  # npm publish --access public`) + "\n");
      console.log(chalk.redBright(`* Use 'npm unpublish ${pkg.name}#${newVersion}' if you want to erase deployed version.`));
  } catch(e) {
    pkg.version = version;
    console.log(chalk.redBright("** Restore Tasks ** "));
    console.log(chalk.red("- Restore package.json version"));
    fs.writeJsonSync(__dirname + "/../package.json", pkg, {spaces: "\t"});
    if (shell("git rev-parse HEAD") !== gitid) {
      console.log(chalk.red("- Restore git log"));
      shell("git reset HEAD^1");
    }
    console.log(chalk.red("- Remove remote version"));
    shell(`git push upstream : ${newVersion}`, true);
  }
} else {
  !isRcBranch && console.log("The version of 'package.json' must be named by X.X.X-rc to deploy. " + chalk.redBright("Change package.version"));
  !hasUpstream && console.log("You can deploy when you have an 'upstream' remote repository. " + chalk.redBright("Add 'upstream' remote repository"));
  !hasDistfolder && console.log("You can deploy when you include 'dist' folder." + chalk.redBright("Remove 'dist' folder in .gitignore"));
}

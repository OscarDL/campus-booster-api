require("@dulysse1/better-node");
const { readFileSync, writeFileSync } = require("fs");
const { join: joinPaths } = require("node:path");
const dotenv = readFileSync(joinPaths(process.cwd(), '.env'), 'utf-8');
const { exec } = require("node:child_process");

async function execShell(cmd) {
    return new Promise((resolve, reject) => exec(cmd, (err, out) => err ? reject(err) : resolve(out)));
}

(async() => {
    try {
        await execShell("docker-compose up -d");
    } catch (err) {
        if(err instanceof Error) {
            console.log(err.message.red.bold);
        }
        process.kill(process.pid);
    }
})();
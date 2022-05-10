import rimraf from "rimraf";
import path from "path";

console.log(path.join(process.cwd(), 'node_modules'))
rimraf.sync(
  path.join(process.cwd(), 'node_modules')
);
console.log("NODE MODULES REMOVED.");

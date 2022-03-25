import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

if(fs.existsSync(path.join(process.cwd(), '.env'))) {
  dotenv.config();
} else {
  console.log(".env file required!");
  process.kill(process.pid);
}
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

if(fs.existsSync(path.join(process.cwd(), '.env'))) {
  dotenv.config();
} else if(process.env.NODE_ENV !== 'production') {
  console.log(".env file required!");
  process.kill(process.pid);
}
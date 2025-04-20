import { execSync } from 'child_process';
import * as fs from 'fs';
import { createHash } from 'crypto';

const lockfile = 'package-lock.json';
const pkgFile = 'package.json';
const hashFile = '.package-hash';

function computeHash(files: string[]): string {
  const hash = createHash('sha256');
  files.forEach((file) => {
    const content = fs.readFileSync(file);
    hash.update(content);
  });
  return hash.digest('hex');
}

let oldHash = '';
if (fs.existsSync(hashFile)) {
  oldHash = fs.readFileSync(hashFile, 'utf8').trim();
}

const newHash = computeHash([pkgFile, lockfile]);

if (oldHash !== newHash) {
  console.log('📦 변경사항 감지됨 - npm install 실행 중...');
  execSync('npm install', { stdio: 'inherit' });
  fs.writeFileSync(hashFile, newHash);
} else {
  console.log('✅ package.json & lockfile에 변경사항 없음');
}

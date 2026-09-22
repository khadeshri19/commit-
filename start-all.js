import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log('🚀 Launching commit:// Full-Stack Development Workspace');
console.log('   - Backend API: http://localhost:5000');
console.log('   - Frontend UI:  http://localhost:5173');
console.log('====================================================\n');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';
const nodeCmd = isWin ? 'node.exe' : 'node';

// 1. Start Backend Server
const serverProc = spawn(nodeCmd, ['src/server.js'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: isWin
});

// 2. Start Frontend Vite Server
const frontendProc = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: isWin
});

function handleExit(code) {
  serverProc.kill();
  frontendProc.kill();
  process.exit(code || 0);
}

process.on('SIGINT', () => handleExit(0));
process.on('SIGTERM', () => handleExit(0));
process.on('exit', () => handleExit(0));

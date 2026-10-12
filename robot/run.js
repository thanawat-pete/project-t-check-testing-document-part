const path = require('node:path');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');
const dotenv = require('dotenv');

const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(rootDir, '.env.test') });

const localRobot = path.join(
  rootDir,
  'venv',
  process.platform === 'win32' ? 'Scripts' : 'bin',
  process.platform === 'win32' ? 'robot.exe' : 'robot'
);
const robotCommand = fs.existsSync(localRobot) ? localRobot : 'robot';
const result = spawnSync(
  robotCommand,
  [
    '--outputdir',
    path.join(__dirname, 'results'),
    ...process.argv.slice(2),
    path.join(__dirname, 'tests'),
  ],
  {
    cwd: rootDir,
    env: process.env,
    stdio: 'inherit',
    shell: robotCommand === 'robot' && process.platform === 'win32',
  }
);

if (result.error) {
  console.error(`Could not start Robot Framework: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);

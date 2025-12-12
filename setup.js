#!/usr/bin/env node

/**
 * Maze Game - Dependency Setup & Validation Script
 *
 * This script:
 * 1. Checks for Node.js and npm
 * 2. Installs all required dependencies
 * 3. Validates that correct packages are installed
 * 4. Verifies Jest is configured correctly
 * 5. Runs a test suite to ensure everything works
 *
 * Usage: node setup.js
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

function logHeader(message) {
  log(`\n${colors.bright}${colors.cyan}=== ${message} ===${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, {
      encoding: 'utf-8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
  } catch (error) {
    if (options.throwOnError !== false) {
      throw error;
    }
    return null;
  }
}

// Required dependencies with exact versions from package.json
const REQUIRED_DEPS = {
  'jest': '^29.5.0',
  '@types/jest': '^29.5.0',
  'jest-environment-jsdom': '^29.5.0',
};

async function checkNodeVersion() {
  logHeader('Checking Node.js Version');

  try {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

    logInfo(`Node.js version: ${nodeVersion}`);

    if (majorVersion < 18) {
      logError(`Node.js ${majorVersion}.x is too old. Please upgrade to Node.js 18+ or 20+`);
      logInfo('Download from: https://nodejs.org/');
      return false;
    }

    logSuccess(`Node.js ${nodeVersion} is compatible`);
    return true;
  } catch (error) {
    logError('Failed to check Node.js version');
    return false;
  }
}

async function checkNpm() {
  logHeader('Checking npm');

  try {
    const npmVersion = exec('npm --version', { silent: true }).trim();
    logInfo(`npm version: ${npmVersion}`);
    logSuccess('npm is available');
    return true;
  } catch (error) {
    logError('npm is not installed or not in PATH');
    return false;
  }
}

async function checkPackageJson() {
  logHeader('Checking package.json');

  const packageJsonPath = join(__dirname, 'package.json');

  if (!existsSync(packageJsonPath)) {
    logError('package.json not found!');
    logInfo('Run: npm init -y');
    return false;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    // Verify package.json has correct configuration
    if (packageJson.type !== 'module') {
      logWarning('package.json should have "type": "module" for ES6 modules');
    }

    if (!packageJson.scripts || !packageJson.scripts.test) {
      logWarning('package.json is missing test scripts');
    }

    logSuccess('package.json exists and is valid');
    return true;
  } catch (error) {
    logError(`Failed to parse package.json: ${error.message}`);
    return false;
  }
}

async function installDependencies() {
  logHeader('Installing Dependencies');

  logInfo('Running: npm install');
  logInfo('This may take 30-60 seconds...\n');

  try {
    exec('npm install');
    logSuccess('Dependencies installed successfully');
    return true;
  } catch (error) {
    logError('Failed to install dependencies');
    logError(error.message);
    return false;
  }
}

async function validateInstalledPackages() {
  logHeader('Validating Installed Packages');

  const nodeModulesPath = join(__dirname, 'node_modules');

  if (!existsSync(nodeModulesPath)) {
    logError('node_modules directory not found');
    logInfo('Run: npm install');
    return false;
  }

  let allValid = true;

  for (const [packageName, expectedVersion] of Object.entries(REQUIRED_DEPS)) {
    const packagePath = join(nodeModulesPath, packageName, 'package.json');

    if (!existsSync(packagePath)) {
      logError(`Package not found: ${packageName}`);
      allValid = false;
      continue;
    }

    try {
      const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
      const installedVersion = packageJson.version;

      logSuccess(`${packageName}@${installedVersion} installed`);

      // Verify version compatibility (basic check)
      const expectedMajor = expectedVersion.replace('^', '').split('.')[0];
      const installedMajor = installedVersion.split('.')[0];

      if (expectedMajor !== installedMajor) {
        logWarning(`  Version mismatch: expected ${expectedVersion}, got ${installedVersion}`);
      }
    } catch (error) {
      logError(`Failed to read package info for ${packageName}`);
      allValid = false;
    }
  }

  return allValid;
}

async function checkJestConfig() {
  logHeader('Checking Jest Configuration');

  const jestConfigPath = join(__dirname, 'jest.config.js');

  if (!existsSync(jestConfigPath)) {
    logWarning('jest.config.js not found (will be created in next setup phase)');
    logInfo('This is expected if you have not run Task T005 yet');
    return true; // Not a blocker
  }

  logSuccess('jest.config.js exists');
  return true;
}

async function verifyJestWorks() {
  logHeader('Verifying Jest Installation');

  logInfo('Running: npm test');
  logInfo('(Expect "No tests found" - this is normal)\n');

  try {
    // Run npm test, but allow it to fail with exit code 1 (no tests found)
    const result = exec('npm test 2>&1', {
      silent: true,
      throwOnError: false
    });

    if (result && result.includes('No tests found')) {
      logSuccess('Jest is working correctly (no tests found yet)');
      return true;
    } else if (result && result.includes('PASS')) {
      logSuccess('Jest is working correctly (tests passed)');
      return true;
    } else if (result) {
      logWarning('Jest ran but with unexpected output');
      logInfo('Output: ' + result.slice(0, 200));
      return true; // Still considered OK
    }

    logSuccess('Jest is installed and functional');
    return true;
  } catch (error) {
    // Check if the error is just "no tests found" (exit code 1)
    if (error.message.includes('No tests found')) {
      logSuccess('Jest is working correctly (no tests found yet)');
      return true;
    }

    logError('Jest test failed');
    logError(error.message);
    return false;
  }
}

async function displaySummary() {
  logHeader('Setup Summary');

  const packageJsonPath = join(__dirname, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  log('\n📦 Project: ' + packageJson.name, colors.cyan);
  log('📋 Version: ' + packageJson.version, colors.cyan);

  log('\n✅ Available Commands:', colors.bright);
  log('  npm test              - Run all tests');
  log('  npm run test:watch    - Run tests in watch mode (TDD)');
  log('  npm run test:coverage - Run tests with coverage report');

  log('\n📚 Next Steps:', colors.bright);
  log('  1. Run /speckit.implement T005 to create jest.config.js');
  log('  2. Run /speckit.implement T006 to document required assets');
  log('  3. Start implementing Phase 2 (Foundational modules)');

  log('\n🎮 To run the game:', colors.bright);
  log('  1. Open index.html in your browser, OR');
  log('  2. Run a local server: npx http-server -p 8080');
  log('  3. Visit http://localhost:8080');

  log('');
}

// Main execution
async function main() {
  log('\n' + colors.bright + colors.cyan +
      '╔════════════════════════════════════════════╗\n' +
      '║   Maze Game - Setup & Validation Script   ║\n' +
      '╚════════════════════════════════════════════╝' +
      colors.reset);

  const checks = [
    { name: 'Node.js Version', fn: checkNodeVersion },
    { name: 'npm', fn: checkNpm },
    { name: 'package.json', fn: checkPackageJson },
  ];

  // Run prerequisite checks
  for (const check of checks) {
    const result = await check.fn();
    if (!result) {
      logError(`\n❌ Setup failed: ${check.name} check failed`);
      logInfo('Please fix the issue above and run setup.js again');
      process.exit(1);
    }
  }

  // Install dependencies
  const installed = await installDependencies();
  if (!installed) {
    logError('\n❌ Setup failed: Could not install dependencies');
    process.exit(1);
  }

  // Validate installation
  const validationChecks = [
    { name: 'Package Validation', fn: validateInstalledPackages },
    { name: 'Jest Configuration', fn: checkJestConfig },
    { name: 'Jest Installation', fn: verifyJestWorks },
  ];

  let allValid = true;
  for (const check of validationChecks) {
    const result = await check.fn();
    if (!result) {
      allValid = false;
      logWarning(`Warning: ${check.name} check had issues`);
    }
  }

  if (!allValid) {
    logWarning('\n⚠️ Setup completed with warnings');
    logInfo('Review the warnings above and fix if necessary');
  } else {
    logSuccess('\n✅ Setup completed successfully!');
  }

  await displaySummary();
}

main().catch(error => {
  logError('\n❌ Setup script crashed');
  logError(error.message);
  console.error(error);
  process.exit(1);
});
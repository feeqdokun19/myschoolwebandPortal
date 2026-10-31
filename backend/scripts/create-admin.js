import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import { User } from '../src/modules/users/user.model.js';

function askHidden(question) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY || !stdin.setRawMode) {
      reject(new Error('Run this script directly in your terminal.'));
      return;
    }

    stdout.write(question);
    let value = '';

    const cleanup = () => {
      stdin.removeListener('data', onData);
      stdin.setRawMode(false);
      stdin.pause();
    };

    const onData = (key) => {
      if (key.toString() === '\u0003') {
        cleanup();
        stdout.write('\n');
        reject(new Error('Cancelled.'));
      } else if (key.toString() === '\r' || key.toString() === '\n') {
        cleanup();
        stdout.write('\n');
        resolve(value);
      } else if (key.toString() === '\u007f') {
        value = value.slice(0, -1);
      } else if (key.toString().length === 1) {
        value += key.toString();
      }
    };

    stdin.setRawMode(true);
    stdin.resume();
    stdin.on('data', onData);
  });
}

async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const email = (await rl.question('Administrator email: '))
      .trim()
      .toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }

    rl.close();

    const password = await askHidden('Administrator password (minimum 12 characters): ');

    if (password.length < 12) {
      throw new Error('Password must contain at least 12 characters.');
    }

    const confirmation = await askHidden('Confirm password: ');

    if (password !== confirmation) {
      throw new Error('Passwords do not match.');
    }

    await connectDB();

    const existingAdmin = await User.exists({ roles: { $in: ['ADMIN', 'SUPER_ADMIN'] } });

    if (existingAdmin) {
      throw new Error('An administrator already exists. This first-admin setup can only be used once.');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error(
        'An account with this email already exists. No changes were made.'
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      passwordHash,
      roles: ['ADMIN'],
      status: 'ACTIVE',
      emailVerified: true,
      emailVerifiedAt: new Date(),
    });

    console.log('\nAdministrator account created successfully.');
    console.log(`Email: ${email}`);
    console.log('You can now sign in using the existing login API.');
  } finally {
    if (!rl.closed) rl.close();
    await mongoose.disconnect().catch(() => {});
  }
}

main().catch((error) => {
  console.error('\nSetup failed:', error.message);
  process.exitCode = 1;
});

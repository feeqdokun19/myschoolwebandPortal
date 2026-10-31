import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../src/config/env.js';
import { User } from '../src/modules/users/user.model.js';

const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.SUPER_ADMIN_PASSWORD;

async function createSuperAdmin() {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('A valid SUPER_ADMIN_EMAIL is required.');
  }

  if (!password || password.length < 12) {
    throw new Error('Password must contain at least 12 characters.');
  }

  await mongoose.connect(env.mongoUri);

  const existingSuperAdmin = await User.findOne({
    roles: 'SUPER_ADMIN',
  });

  if (existingSuperAdmin) {
    throw new Error(
      `A Super Admin already exists: ${existingSuperAdmin.email}. Bootstrap refused.`
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error(
      'This email already belongs to an existing account. Bootstrap refused.'
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    passwordHash,
    roles: ['SUPER_ADMIN'],
    status: 'ACTIVE',
    emailVerified: true,
    emailVerifiedAt: new Date(),
  });

  console.log('\nSuper Admin created successfully.');
  console.log(`Email: ${user.email}`);
  console.log(`Role: ${user.roles.join(', ')}`);
  console.log(`Status: ${user.status}`);
}

try {
  await createSuperAdmin();
} catch (error) {
  console.error('\nSuper Admin setup failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect().catch(() => {});
}

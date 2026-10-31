import { sendVerificationEmail } from './modules/auth/email.service.js';

const to = process.env.SES_TEST_TO;

if (!to) {
throw new Error(
'Set SES_TEST_TO to an email address verified in Amazon SES.'
);
}

try {
const result = await sendVerificationEmail({
to,
verificationUrl:
'http://localhost:3000/api/auth/verify-email?token=ses-test',
});

console.log('SES test email accepted successfully.');
console.log('Message ID:', result.MessageId);
} catch (error) {
console.error('SES test failed.');
console.error('Error:', error.name);
console.error('Message:', error.message);
process.exitCode = 1;
}

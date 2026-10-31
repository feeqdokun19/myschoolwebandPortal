
import {
  SESClient,
  SendEmailCommand,
} from '@aws-sdk/client-ses';

import { env } from '../../config/env.js';

const sesClient = new SESClient({
  region: env.awsRegion,
});

export const sendVerificationEmail = async ({
  to,
  verificationUrl,
  purpose = 'verification',
}) => {
  if (!env.sesFromEmail) {
    throw new Error('SES_FROM_EMAIL is not configured');
  }

  const isPasswordReset = purpose === 'password-reset';

  const subject = isPasswordReset
    ? 'Reset your AUD Islamic Secondary School password'
    : 'Verify your AUD Islamic Secondary School account';

  const heading = isPasswordReset
    ? 'Reset your password'
    : 'Verify your email address';

  const message = isPasswordReset
    ? 'We received a request to reset your password. Use the button below to choose a new password. This link expires in 15 minutes.'
    : 'Thank you for creating your school portal account. Please verify your email address to continue.';

  const buttonText = isPasswordReset
    ? 'Reset Password'
    : 'Verify Email Address';

  const plainText = isPasswordReset
    ? `Reset your AUD Islamic Secondary School password: ${verificationUrl}`
    : `Verify your AUD Islamic Secondary School account: ${verificationUrl}`;

  const command = new SendEmailCommand({
    Source: env.sesFromEmail,

    Destination: {
      ToAddresses: [to],
    },

    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },

      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <!DOCTYPE html>
            <html>
              <body style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 32px;">
                  <h1 style="color: #1d4ed8;">
                    AUD Islamic Secondary School
                  </h1>

                  <h2>${heading}</h2>

                  <p>${message}</p>

                  <p style="margin: 28px 0;">
                    <a
                      href="${verificationUrl}"
                      style="background: #0c951c; color: #ffffff; padding: 14px 22px; text-decoration: none; border-radius: 8px; display: inline-block;"
                    >
                      ${buttonText}
                    </a>
                  </p>

                  ${
                    isPasswordReset
                      ? `
                        <p>
                          If you did not request a password reset, you can
                          safely ignore this email. Your password will not
                          change unless you use the reset link.
                        </p>
                      `
                      : `
                        <p>
                          If you did not create this account, you can
                          ignore this email.
                        </p>
                      `
                  }

                  <p style="font-size: 12px; color: #64748b;">
                    AUD Islamic Secondary School Portal
                  </p>
                </div>
              </body>
            </html>
          `,
        },

        Text: {
          Charset: 'UTF-8',
          Data: plainText,
        },
      },
    },
  });

  return sesClient.send(command);
};

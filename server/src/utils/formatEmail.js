export const registerEmail = (payload) => {
  const subject = "Kilimboga Account Verification";
  const body = `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center; }
            .container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
            .code { font-size: 24px; font-weight: bold; color: #007bff; margin: 10px 0; }
            .footer { margin-top: 20px; font-size: 14px; color: #555; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Welcome to the Kilimboga Platform! 🌱</h2>
            <p>Hello <b>${payload.name}</b>,</p>
            <p>We're excited to have you join our community! 🚀 Our platform is designed to help you optimize your greenhouse farming.</p>
            <p>Enter this code to complete your registration.</p>
            <p>verification code:</p>
            <div class="code">
                ${payload.authCode}
            </div>
            <p>If you didn’t sign up, please ignore this email.</p>
            <div class="footer">
                <p>Regards,</p>
                <p><b>Kilimboga Team</b></p>
            </div>
        </div>
    </body>
    </html>`;
  return { subject, body };
};

export const accountApprovalEmail = (payload) => {
  const subject = "Kilimboga Account Approved";
  const body = `<!DOCTYPE html>
  <html>
  <head>
  <style>
  body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center; }
  .container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
  .header { color: #28a745; }
  .message { font-size: 16px; line-height: 1.5; margin: 15px 0; }
  .cta-button { background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 15px 0; }
  .details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; text-align: left; }
  .footer { margin-top: 20px; font-size: 14px; color: #555; }
  </style>
  </head>
  <body>
  <div class="container">
    <h2 class="header">Your Kilimboga Account Has Been Approved! ✅</h2>
    <p>Hello <b>${payload.firstName}</b>,</p>
    <div class="message">
      <p>Great news! We've reviewed your application and are pleased to inform you that your account has been approved as a <b>${payload.role}</b> on the Kilimboga Platform.</p>
      <p>You can now sign in to your account and access all the features designed for ${payload.role}s in our greenhouse farming community.</p>
    </div>
    <a href="${payload.loginUrl}" class="cta-button">Sign In Now</a>
    <div class="details">
      <p><b>Account Details:</b></p>
      <ul style="list-style-type: none; padding-left: 0;">
        <li>• FullName: ${payload.name}</li>
        <li>• Email: ${payload.email}</li>
        <li>• Role: ${payload.role}</li>
        <li>• Approval Date: ${payload.approvalDate}</li>
      </ul>
    </div>
    <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
    <div class="footer">
      <p>We look forward to your valuable contributions to our platform!</p>
      <p>Regards,</p>
      <p><b>Kilimboga Team</b></p>
    </div>
  </div>
  </body>
  </html>`;
  return { subject, body };
};

export const actionRequiredEmail = (name, actions) => {
  const subject = "Kilimboga IoT Alert: Action Required 🚨";
  const body = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body {font-family: 'Inter', Arial, sans-serif;background-color: #f4f7fa;margin: 0;padding: 20px;line-height: 1.6;
        }
        .container {background-color: #ffffff;border-radius: 12px;box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);max-width: 600px;margin: 0 auto;overflow: hidden;
        }.header {background-color: #ff6b6b;color: white;padding: 20px;text-align: center;
        }
        .header h2 {margin: 0;font-size: 24px;
        }
        .content {padding: 25px;
        }
        .alert-section {background-color: #fff5f5;border-left: 5px solid #ff6b6b;padding: 15px;margin-bottom: 20px;
        }
        .actions-list {list-style: none;padding: 0;
        }
        .actions-list li {background-color: #f9f9f9;border-radius: 6px;padding: 12px 15px;margin-bottom: 10px;display: flex;align-items: center;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        .actions-list li::before {content: '⚠️';margin-right: 10px;font-size: 20px;
        }
        .footer {background-color: #f1f3f5;padding: 15px;text-align: center;color: #666;font-size: 14px;
        }
        .logo {max-width: 150px;margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🚜 Kilimboga IoT Alert</h2>
        </div>
        
        <div class="content">
            <p>Hello <b>${name}</b>,</p>
            
            <div class="alert-section">
                <p><strong>Important:</strong> Our IoT monitoring system has detected critical conditions in your greenhouse.</p>
            </div>

            <p>The following actions are Being taken:</p>
            
            <ul class="actions-list">
                ${actions.map((action) => `<li>${action}</li>`).join("")}
            </ul>
        </div>

        <div class="footer">
            <p>© 2025 Kilimboga Technologies | Smart Farming Solutions</p>
            <p>Need help? Contact our support team</p>
        </div>
    </div>
</body>
</html>
`;
  return { subject, body };
};


export const accountSuspensionEmail = (payload) => {
  const subject = "Important: Kilimboga Account Suspended";
  const body = `<!DOCTYPE html>
  <html>
  <head>
  <style>
  body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center; }
  .container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
  .header { color: #dc3545; }
  .message { font-size: 16px; line-height: 1.5; margin: 15px 0; }
  .cta-button { background-color: #5a6268; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 15px 0; }
  .details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; text-align: left; }
  .footer { margin-top: 20px; font-size: 14px; color: #555; }
  </style>
  </head>
  <body>
  <div class="container">
  <h2 class="header">Your Kilimboga Account Has Been Suspended ⚠️</h2>
  <p>Hello <b>${payload.firstName}</b>,</p>
  <div class="message">
  <p>We regret to inform you that your account has been temporarily suspended on the Kilimboga Platform due to a violation of our community guidelines or terms of service.</p>
  <p>During this suspension period, you will not be able to access your account or use any of the platform's features.</p>
  </div>
  <a href="${payload.supportUrl}" class="cta-button">Contact Support</a>
  <div class="details">
  <p><b>Suspension Details:</b></p>
  <ul style="list-style-type: none; padding-left: 0;">
  <li>• Account: ${payload.name}</li>
  <li>• Email: ${payload.email}</li>
  <li>• Role: ${payload.role}</li>
  <li>• Suspension Date: ${payload.suspensionDate}</li>
  <li>• Reason: ${payload.suspensionReason}</li>
  </ul>
  </div>
  <p>If you believe this suspension was made in error or would like to appeal this decision, please contact our support team using the button above.</p>
  <div class="footer">
  <p>We value your participation in our community and hope to resolve this matter promptly.</p>
  <p>Regards,</p>
  <p><b>Kilimboga Trust & Safety Team</b></p>
  </div>
  </div>
  </body>
  </html>`;
  return { subject, body };
};

export const accountRestorationEmail = (payload) => {
  const subject = "Good News: Your Kilimboga Account Has Been Restored";
  const body = `<!DOCTYPE html>
  <html>
  <head>
  <style>
  body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center; }
  .container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
  .header { color: #17a2b8; }
  .message { font-size: 16px; line-height: 1.5; margin: 15px 0; }
  .cta-button { background-color: #17a2b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 15px 0; }
  .details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; text-align: left; }
  .footer { margin-top: 20px; font-size: 14px; color: #555; }
  </style>
  </head>
  <body>
  <div class="container">
  <h2 class="header">Your Kilimboga Account Has Been Restored! 🎉</h2>
  <p>Hello <b>${payload.firstName}</b>,</p>
  <div class="message">
  <p>We're pleased to inform you that your Kilimboga account has been successfully restored and is now fully active again.</p>
  <p>You can now sign in to your account and resume all normal activities as a ${payload.role} on our greenhouse farming platform.</p>
  </div>
  <a href="${payload.loginUrl}" class="cta-button">Sign In Now</a>
  <div class="details">
  <p><b>Account Details:</b></p>
  <ul style="list-style-type: none; padding-left: 0;">
  <li>• Full Name: ${payload.name}</li>
  <li>• Email: ${payload.email}</li>
  <li>• Role: ${payload.role}</li>
  <li>• Restoration Date: ${payload.restorationDate}</li>
  </ul>
  </div>
  <p>Thank you for your patience during this process. We appreciate your cooperation in maintaining the quality and safety of our community.</p>
  <div class="footer">
  <p>If you have any questions or need assistance, our support team is always available to help.</p>
  <p>Regards,</p>
  <p><b>Kilimboga Team</b></p>
  </div>
  </div>
  </body>
  </html>`;
  return { subject, body };
};
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
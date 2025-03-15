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

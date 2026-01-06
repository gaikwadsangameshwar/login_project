import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        const mailOptions = {
            from: "sangamgaikwad@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `
              <p>
                Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a>
                to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
              </p>
            `,
        };

        return await transport.sendMail(mailOptions);
    } catch (error) {
        throw new Error(error.message);
    }
};

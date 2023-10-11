import { Router } from "express";
import { Request, Response } from "express";
import { sendVerificationEmail } from "../utils/email";
import { I_UserDocument, UserModel } from "../db/usersModel";
import jwt, { Secret } from "jsonwebtoken";
import { SECRET_KEY } from "../auth/authService";
import { HydratedDocument } from "mongoose";



const router = Router()



// Middleware for sending a verification email
router.post('/send-email', (req: Request, res: Response) => {
    // Implement email sending logic using nodemailer or any other email service
    // Generate a verification token and send it to the user's email
    // Save the token and user's email in a database
    // Send a response to the client
    try {
        const to = 'simonspinoro44@hotmail.com'
        sendVerificationEmail(to, 'hola123')
        res.status(200).send()
    } catch (error) {
        throw new Error("errorrrr");
    }
  });



  
  // Route for verifying the email using the token
  router.get('/verify', async (req: Request, res: Response) => {
    const {token} : any = req.query;
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const user: HydratedDocument<I_UserDocument> = await UserModel.findById( decoded._id).orFail();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    // Update user status to verified
    user.isVerified = true;
    await user.save();

    res.json({ message: 'Email verified successfully' });

    res.status(200).send('Email Verified')
    // Verify the token and mark the email as verified in your database
    // Respond to the client with the verification result
  });






export default router
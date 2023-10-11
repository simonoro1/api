import { Router } from "express";
import { Request, Response } from "express";
import { sendVerificationEmail } from "../utils/email";
import { error } from "console";
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
  router.get('/verify-email/:token', (req: Request, res: Response) => {
    const token = req.params.token;
    // Verify the token and mark the email as verified in your database
    // Respond to the client with the verification result
  });






export default router
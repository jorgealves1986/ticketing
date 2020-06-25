import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { PasswordManager } from '../services/password-manager';
import { User } from '../models/user';
import { validateRequest, BadRequestError } from '@jatickets/common';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    // Had to downgrade @types/cookie-session@2.0.40 to 2.0.39 to avoid a typescript error
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };

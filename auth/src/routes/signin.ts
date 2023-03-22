import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { validateRequest, BadRequestError } from '@mr-micro-tickets/common';
import { PasswordManager } from '../services/password';

const router = express.Router();

router.put(
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
			throw new BadRequestError('Invalid Credentials');
		}

		const passwordsMatch = await PasswordManager.compare(existingUser.password, password);

		if (!passwordsMatch) {
			throw new BadRequestError('Invalid Credentials');
		}

		// Generate JWT
		const userJwt = jwt.sign(
			{ id: existingUser.id, email: existingUser.email },
			process.env.JWT_KEY!
		);

		// Store it on the session object
		req.session = { jwt: userJwt };

		res.status(200).send(existingUser);
	}
);

export { router as signinRouter };

import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
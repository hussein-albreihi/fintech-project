import { Router } from 'express';
import prisma from '../utils/prisma';
import { createLoan, getLoanById } from '../services/loanService';

const router = Router();

/**
 * @swagger
 * /api/loans:
 *   get:
 *     summary: Get all loans
 *     responses:
 *       200:
 *         description: A list of loans
 */
router.get('/', async (_req, res) => {
  const loans = await prisma.loan.findMany({
    include: { user: true },
  });
  res.json(loans);
});

/**
 * @swagger
 * /api/loans:
 *   post:
 *     summary: Create a new loan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               amount:
 *                 type: number
 *               interestRate:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Loan created successfully
 */
router.post('/', async (req, res) => {
  const { userId, amount, interestRate, startDate, dueDate, status } = req.body;

  try {
    const loan = await prisma.loan.create({
      data: {
        userId,
        amount,
        interestRate,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        status,
      },
    });
    res.status(201).json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ error: 'Failed to create loan' });
  }
});


/**
 * @swagger
 * /api/loans:
 *   PUT:
 *     summary: Update an existing loan
 *    parameters:
 *      - in: path
 *       name: id
 *      required: true
 *      description: The ID of the loan to update
 *    schema:
 *      type: object
 *     properties:
 *      amount:
 *        type: number
 *      interestRate:
 *       type: number
 *     startDate:
 *      type: string
 *     format: date-time
 *     dueDate:
 *      type: string
 *     format: date-time
 *    status:
 *     type: string
 *  responses:
 *        200:
 *          description: Loan updated successfully
 *        404:
 *          description: Loan not found
 *        500:
 *          description: Server error
 * */
router.put('/:id', async (req, res) => {
  const loanId = parseInt(req.params.id);
  const { amount, interestRate, startDate, dueDate, status } = req.body;

  try {
    const updatedLoan = await prisma.loan.update({
      where: { id: loanId },
      data: {
        amount,
        interestRate,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        status,
      },
    });
    res.json(updatedLoan);
  } catch (error) {
    console.error('Error updating loan:', error);
    res.status(500).json({ error: 'Failed to update loan' });
  }
});

/**
 * @swagger
 * /api/loans/{id}:
 *   get:
 *     summary: Get a loan by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the loan to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A loan object
 *       404:
 *         description: Loan not found
 */
router.get('/:id', async (req, res) => {
  const loanId = parseInt(req.params.id);

  try {
    const loan = await getLoanById(loanId);

    if (!loan) {
      res.status(404).json({ message: 'No loan found!' })
    }

    res.json(loan);
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @swagger
 * /api/loans:
 *   post:
 *     summary: Create a new loan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               amount:
 *                 type: number
 *               interestRate:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Loan created successfully
 *       500:
 *         description: Failed to create loan
 */
router.post('/', async (req, res) => {
  const { userId, amount, interestRate, startDate, dueDate, status } = req.body;

  try {
    await createLoan({
      userId,
      amount,
      interestRate,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
      status,
    });

    res.status(201);
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ error: 'Failed to create loan' });
  }
});

export default router;

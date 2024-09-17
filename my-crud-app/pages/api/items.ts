import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    const item = await prisma.item.create({
      data: { name },
    });
    res.status(201).json(item);
  } else if (req.method === 'PUT') {
    const { id, name } = req.body;
    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(item);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
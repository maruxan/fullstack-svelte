import type { Request } from '@sveltejs/kit'
import PrismaClient from '$lib/client/prisma'

const prisma = new PrismaClient()

export const api = async (req: Request, data?: Record<string, unknown>) => {
  let status = 500 // defaults to internal server error
  let body = {}

  switch (req.method.toUpperCase()) {
    case 'GET':
      status = 200
      body = await prisma.todo.findMany()
      break

    case 'POST':
      body = await prisma.todo.create({ data: data as Todo })
      status = 201
      break

    case 'DELETE':
      body = await prisma.todo.delete({
        where: {
          uid: req.params.uid,
        },
      })
      status = 200
      break

    case 'PATCH':
      body = await prisma.todo.update({
        where: {
          uid: req.params.uid,
        },
        data: {
          done: data.done,
          text: data.text,
        },
      })
      status = 200
      break
  }

  // Redirects POST requests not handled by JavaScript
  return req.method.toUpperCase() !== 'GET' &&
    req.headers.accept !== 'application/json'
    ? { status: 303, headers: { location: '/' } }
    : { status, body }
}

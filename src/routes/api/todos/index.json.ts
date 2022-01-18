import type { RequestHandler } from '@sveltejs/kit'

const todos: Todo[] = []

export const get: RequestHandler = () => {
  return {
    status: 200,
    body: todos,
  }
}

export const post: RequestHandler<unknown, FormData> = (req) => {
  todos.push({
    created_at: new Date(),
    text: req.body.get('text'),
    done: false,
  })

  return {
    status: 303,
    headers: {
      location: '/',
    },
  }
}

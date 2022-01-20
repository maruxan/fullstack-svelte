import type { Request } from '@sveltejs/kit'

let todos: Todo[] = []

export const api = (req: Request, data?: Record<string, unknown>) => {
  let status = 500 // defaults to internal server error
  let body = {}

  switch (req.method.toUpperCase()) {
    case 'GET':
      status = 200
      body = todos
      break

    case 'POST':
      todos.push(data as Todo)
      status = 201
      body = data
      break

    case 'DELETE':
      todos = todos.filter((todo) => todo.uid !== req.params.uid)
      status = 200
      break

    case 'PATCH':
      todos = todos.map((todo) =>
        todo.uid === req.params.uid
          ? { ...todo, text: data.text as string }
          : todo
      )
      status = 200
      break
  }

  return req.method.toUpperCase() === 'GET'
    ? { status, body }
    : { status: 303, headers: { location: '/' } }
}

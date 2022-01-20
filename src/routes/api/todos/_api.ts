import type { Request } from '@sveltejs/kit'

let todos: Todo[] = []

export const api = (req: Request, todo?: Todo) => {
  let status = 500 // defaults to internal server error
  let body = {}

  switch (req.method.toUpperCase()) {
    case 'GET':
      status = 200
      body = todos
      break

    case 'POST':
      todos.push(todo)
      status = 201
      body = todo
      break

    case 'DELETE':
      todos = todos.filter((todo) => todo.uid !== req.params.uid)
      status = 200
      break
  }

  return req.method.toUpperCase() === 'GET'
    ? { status, body }
    : { status: 303, headers: { location: '/' } }
}
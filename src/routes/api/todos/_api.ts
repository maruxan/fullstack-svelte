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
      body = { deletedUserId: req.params.uid.toString() }
      break

    case 'PATCH':
      todos = todos.map((todo) => {
        if (todo.uid === req.params.uid) {
          // Either updates the todo text or done status
          data.text
            ? (todo.text = data.text as string)
            : (todo.done = data.done as boolean)

          body = todo
        }
        return todo
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

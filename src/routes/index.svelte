<!-- Pre-fetching data -->
<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { enhance } from '$lib/actions/form'

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/api/todos.json')

    if (res.ok) {
      const todos = await res.json()
      return {
        props: { todos },
      }
    }
    // else
    const { message } = await res.json()
    return {
      error: new Error(message),
    }
  }
</script>

<script lang="ts">
  import TodoItem from '$lib/components/TodoItem/todo-item.svelte'

  export let todos: Todo[]

  /**
   * UI updater functions
   */
  const handleCreateTodo = async (res: Response, form: HTMLFormElement) => {
    const newTodo = await res.json()
    todos = [...todos, newTodo]
    form.reset()
  }
  /**/
  const handleDeleteTodo = async (res: Response) => {
    const deletedTodo = await res.json()
    todos = todos.filter((todo) => todo.uid !== deletedTodo.uid)
  }
  /**/
  const handleUpdateTodo = async (res: Response) => {
    const updatedTodo = await res.json()
    todos = todos.map((todo) =>
      todo.uid === updatedTodo.uid ? updatedTodo : todo
    )
  }
</script>

<svelte:head>
  <title>Todos</title>
</svelte:head>

<div class="max-w-3xl mx-auto pt-12">
  <h1 class="mb-4 text-3xl">Todos</h1>
  <form
    action="/api/todos.json"
    method="post"
    class="grid mb-4"
    use:enhance={{ result: handleCreateTodo }}>
    <input
      type="text"
      name="text"
      aria-label="Add a todo"
      placeholder="+ type to add a todo"
      class="text-center" />
  </form>

  {#each todos as todo}
    <TodoItem {todo} {handleDeleteTodo} {handleUpdateTodo} />
  {/each}
</div>

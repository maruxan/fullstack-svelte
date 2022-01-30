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
  $: doneTodos = todos.filter((todo) => todo.done).reverse()
  $: notDoneTodos = todos.filter((todo) => !todo.done).reverse()

  // State
  let hideDone = false

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
  <h1 class="mb-4 text-3xl"><span class="text-blue-500">@</span>todos</h1>
  <form
    action="/api/todos.json"
    method="post"
    class="grid mb-4"
    use:enhance={{ result: handleCreateTodo }}>
    <input
      type="text"
      name="text"
      aria-label="Add a todo"
      placeholder="> what needs to be done?"
      class="bg-transparent text-green-500 border-0 border-b border-light-500 focus:border-green-500 focus:ring-0 placeholder:text-light-500" />
  </form>

  {#each notDoneTodos as todo}
    <TodoItem {todo} {handleDeleteTodo} {handleUpdateTodo} />
  {/each}
  <div class="mb-4 flex items-center">
    <div class="h-[1.5px] w-full bg-dark-500" />
    <button class="ml-3 text-dark-400" on:click={() => (hideDone = !hideDone)}
      >{hideDone ? 'show' : 'hide'}</button>
  </div>
  {#if !hideDone}
    {#each doneTodos as todo}
      <TodoItem {todo} {handleDeleteTodo} {handleUpdateTodo} />
    {/each}
  {/if}
</div>

<script lang="ts">
  import { enhance } from '$lib/actions/form'

  import MdClose from 'svelte-icons/md/MdClose.svelte'
  import GoKebabVertical from 'svelte-icons/go/GoKebabVertical.svelte'

  // Props
  export let todo: Todo
  export let handleDeleteTodo: (res: Response) => void
  export let handleUpdateTodo: (res: Response) => void

  const handleAction = (res, type) => {
    switch (type) {
      case 'UPDATE':
        handleUpdateTodo(res)
        break
      case 'DELETE':
        handleDeleteTodo(res)
        break
    }
    isEditing = false
    showOptions = false
  }

  // State
  let showOptions = false
  let isEditing = false

  // Reactive values
  $: if (isEditing) showOptions = false

  // Util fns
  let focusNode = (node) => {
    node.focus()
  }
</script>

<div
  class="mb-4 grid grid-cols-[3rem_1fr_auto] items-center place-items-center">
  <!-- Done/Not Done Checkbox -->
  <form
    action="/api/todos/{todo.uid}.json?_method=patch"
    method="post"
    use:enhance={{ result: (res) => handleAction(res, 'UPDATE') }}>
    <input type="hidden" name="done" value={todo.done ? '' : 'true'} />
    <button
      aria-label="Mark todo as {todo.done ? 'not done' : 'done'}"
      class="leading-4 h-10 w-10">
      {#if todo.done}
        <span class="text-green-500">done</span>
      {:else}
        <span class="text-red-500">todo</span>
      {/if}
    </button>
  </form>

  <!-- Todo Text Input -->
  <form
    action="/api/todos/{todo.uid}.json?_method=patch"
    method="post"
    class="relative w-full"
    use:enhance={{ result: (res) => handleAction(res, 'UPDATE') }}>
    {#if isEditing}
      <input
        type="text"
        name="text"
        class="peer w-full bg-transparent focus:ring-yellow-500 focus:border-yellow-500"
        on:blur={() => (isEditing = false)}
        use:focusNode
        value={todo.text} />
    {:else}
      <p class="py-2 px-3" class:text-dark-400={todo.done}>{todo.text}</p>
    {/if}
  </form>

  <!-- Options Todo Button -->
  <form
    action="/api/todos/{todo.uid}.json?_method=delete"
    method="post"
    use:enhance={{ result: (res) => handleAction(res, 'DELETE') }}>
    {#if showOptions}
      <div class="flex">
        <button
          aria-label="Edit todo"
          on:click|preventDefault={() => (isEditing = true)}
          class="mr-2">edit</button>
        <button type="submit" aria-label="Delete todo">delete</button>
        <button
          aria-label="Close todo options"
          class="h-10 w-10 p-2"
          on:click={() => (showOptions = false)}>
          <MdClose />
        </button>
      </div>
    {:else}
      <button
        aria-label="Open todo options"
        class="h-10 w-10 p-2"
        on:click={() => (showOptions = true)}>
        <GoKebabVertical />
      </button>
    {/if}
  </form>
</div>

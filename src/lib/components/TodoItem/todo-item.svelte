<script lang="ts">
  import GoCheck from 'svelte-icons/go/GoCheck.svelte'
  import GoThumbsup from 'svelte-icons/go/GoThumbsup.svelte'
  import GoTrashcan from 'svelte-icons/go/GoTrashcan.svelte'

  export let todo: Todo
</script>

<div
  class="mb-4 grid grid-cols-[3rem_1fr_3rem] items-center place-items-center">
  <!-- Done/Not Done Checkbox -->
  <form action="/api/todos/{todo.uid}.json?_method=patch" method="post">
    <input type="hidden" name="done" value={todo.done ? '' : 'true'} />
    <button
      aria-label="Mark todo as {todo.done ? 'not done' : 'done'}"
      class="h-10 w-10 p-2.5 rounded-full border border-light-900">
      {#if todo.done}
        <GoCheck />
      {/if}
    </button>
  </form>

  <!-- Todo Text Input -->
  <form
    action="/api/todos/{todo.uid}.json?_method=patch"
    method="post"
    class="relative w-full">
    <input type="text" name="text" class="w-full" value={todo.text} />
    <button
      aria-label="Save todo"
      class="h-10 w-10 p-2.5 absolute top-0 right-0">
      <GoThumbsup />
    </button>
  </form>

  <!-- Delete Todo Button -->
  <form action="/api/todos/{todo.uid}.json?_method=delete" method="post">
    <button aria-label="Delete todo" class="h-10 w-10 p-2">
      <GoTrashcan />
    </button>
  </form>
</div>

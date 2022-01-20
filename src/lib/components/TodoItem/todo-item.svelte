<script lang="ts">
  import GoCheck from 'svelte-icons/go/GoCheck.svelte'
  import GoThumbsup from 'svelte-icons/go/GoThumbsup.svelte'
  import GoTrashcan from 'svelte-icons/go/GoTrashcan.svelte'

  export let todo: Todo
</script>

<div
  class="mb-4 grid grid-cols-[3rem_1fr_3rem] items-center place-items-center">
  <!-- Done/Not Done Checkbox -->
  <form action="" method="">
    <input type="hidden" name="done" value="" />
    <button
      aria-label="Mark done/not done"
      class="h-10 w-10 p-2.5 rounded-full border border-light-900">
      {#if todo.done}
        <GoCheck />
      {/if}
    </button>
  </form>

  <!-- Todo Text Input -->
  <form action="" method="" class="relative w-full">
    <input type="text" class="w-full" value={todo.text} />
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

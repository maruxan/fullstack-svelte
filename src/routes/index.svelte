<script>
  import TodoItem from '$lib/components/TodoItem/todo-item.svelte'
</script>

<svelte:head>
  <title>Todos</title>
</svelte:head>

<div class="max-w-3xl mx-auto pt-12">
  <h1 class="mb-4 text-3xl">Todos</h1>
  <form action="" method="" class="grid mb-4">
    <input
      type="text"
      name="text"
      aria-label="Add a todo"
      placeholder="+ type to add a todo"
      class="text-center" />
  </form>
  <TodoItem />
</div>

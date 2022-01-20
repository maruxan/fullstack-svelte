export const enhance = (form: HTMLFormElement) => {
  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    console.log(form)
  }

  form.addEventListener('submit', handleSubmit)

  // cleanup function
  return {
    destroy() {
      form.removeEventListener('submit', handleSubmit)
    },
  }
}

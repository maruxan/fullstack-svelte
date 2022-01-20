export const enhance = (form: HTMLFormElement, { result }) => {
  /**
   * Form submit handler middleware that handles the submit event
   * with JavaScript if it's enabled in the browser
   */
  const handleSubmit = async (event: Event) => {
    event.preventDefault()

    const fetchConfig = {
      body: new FormData(form),
      method: form.method,
      headers: {
        accept: 'application/json',
      },
    }

    await fetch(form.action, fetchConfig)
      .then((res) => result(res, form))
      .catch((err) => console.error('Something went wrong...', err))
  }

  form.addEventListener('submit', handleSubmit)

  // cleanup function
  return {
    destroy() {
      form.removeEventListener('submit', handleSubmit)
    },
  }
}

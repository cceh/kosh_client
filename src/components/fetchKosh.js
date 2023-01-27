async function fetchKosh(spec_url, text) {
  const response = await fetch(spec_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text
    }),
  })

  return await response.json().catch(error => {
    console.error(error)
  })
}

export default fetchKosh
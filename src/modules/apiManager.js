const remoteURL = 'http://localhost:8000'
const headers = {
  Content-Type: "application/json",
  Authorization: `Token ${localStorage.getItem("skillchill_token")}`
}

export const getItem = async (entity, id) => {
  const r = await fetch(`${remoteURL}/${entity}/${id}`, { method: "GET", headers })
  return r.json()
}

export const getAll = async entity => {
  const r = await fetch(`${remoteURL}/${entity}`, { method: "GET", headers })
  return r.json()
}

export const deleteItem = async (entity, id) => {
  const r = await fetch(`${remoteURL}/${entity}/${id}`, { method: "DELETE", headers})
  return r.json()
}

export const postItem = async (entity, item) => {
  const r = await fetch(`${remoteURL}/${entity}`, { 
    method: 'POST', headers, body: JSON.stringify(item)
  })
  return r.json()
}

export const patchItem = (entity, item) => {
  const r = await fetch(`${remoteURL}/${entity}/${item.id}`, {
    method: 'PATCH', headers, body: JSON.stringify(item)
  })
  return r.json()
}
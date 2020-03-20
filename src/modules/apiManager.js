const remoteURL = 'http://localhost:8000'

export const getItem = (entity, id) =>
  fetch(`${remoteURL}/${entity}/${id}`).then(result => result.json())

export const getAll = entity => fetch(`${remoteURL}/${entity}`).then(result => result.json())

export const deleteItem = (entity, id) => {
  return fetch(`${remoteURL}/${entity}/${id}`, {
    method: 'DELETE',
  }).then(r => r.json())
}

export const postItem = (entity, item) => {
  return fetch(`${remoteURL}/${entity}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then(r => r.json())
}

export const patchItem = (entity, item) => {
  return fetch(`${remoteURL}/${entity}/${item.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then(r => r.json())
}
const remoteURL = "http://localhost:8000";

export const getItem = async (entity, id) => {
  const r = await fetch(`${remoteURL}/${entity}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("skillchill_token")}`
    }
  });
  return r.json();
};

export const getAll = async entity => {
  const r = await fetch(`${remoteURL}/${entity}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("skillchill_token")}`
    }
  });
  return r.json();
};

export const deleteItem = async (entity, id) => {
  const r = await fetch(`${remoteURL}/${entity}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("skillchill_token")}`
    }
  });
  return r;
};

export const postItem = async (entity, item) => {
  const r = await fetch(`${remoteURL}/${entity}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("skillchill_token")}`
    },
    body: JSON.stringify(item)
  });
  return r.json();
};

export const patchItem = async (entity, id, item) => {
  const r = await fetch(`${remoteURL}/${entity}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("skillchill_token")}`
    },
    body: JSON.stringify(item)
  });
  return r;
};

export function fetchServicesRequest() {
  return { type: 'FETCH_SERVICES_REQUEST' };
}

export function fetchServicesFailure(error) {
  return { type: 'FETCH_SERVICES_FAILURE', payload: { error } };
}

export function fetchServicesSuccess(items) {
  return { type: 'FETCH_SERVICES_SUCCESS', payload: { items } };
}

export function addServiceRequest(name, price, content) {
  return { type: 'ADD_SERVICE_REQUEST', payload: { name, price, content } };
}

export function addServiceFailure(error) {
  return { type: 'ADD_SERVICE_FAILURE', payload: { error } };
}

export function addServiceSuccess() {
  return { type: 'ADD_SERVICE_SUCCESS' };
}

export function removeServiceRequest(id) {
  return { type: 'REMOVE_SERVICE_REQUEST', payload: { id } };
}

export function removeServiceFailure(error, id) {
  return { type: 'REMOVE_SERVICE_FAILURE', payload: { error, id } };
}

export function removeServiceSuccess(id) {
  return { type: 'REMOVE_SERVICE_SUCCESS', payload: { id } };
}

export function getServiceRequest() {
  return { type: 'GET_SERVICE_REQUEST' };
}

export function getServiceFailure(error) {
  return { type: 'GET_SERVICE_FAILURE', payload: { error } };
}

export function getServiceSuccess(item) {
  return { type: 'GET_SERVICE_SUCCESS', payload: { item } };
}

export function changeServiceField(name, value) {
  return { type: 'CHANGE_SERVICE_FIELD', payload: { name, value } };
}

export function resetServiceFields() {
  return { type: 'RESET_SERVICE_FIELDS' };
}

export async function fetchServices(dispatch) {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
}

export async function addService(dispatch, name, price, content, id = 0) {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, price: Number(price), content }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (error) {
    dispatch(addServiceFailure(error.message));
  }
  fetchServices(dispatch);
}

export async function removeService(dispatch, id) {
  dispatch(removeServiceRequest(id));
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    dispatch(removeServiceFailure(error.message, id));
  }
  dispatch(removeServiceSuccess(id));
  fetchServices(dispatch);
}

export async function getService(dispatch, id) {
  dispatch(getServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(getServiceSuccess(data));
  } catch (error) {
    dispatch(getServiceFailure(error.message));
  }
}
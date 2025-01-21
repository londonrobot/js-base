const API = 'http://localhost:3000/';

export async function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export async function getUsers(param = '') {
  try {
    const response = await fetch(`${API}api/clients?search=${param}`);
    if (!response.ok) {
      return { status: response.status, message: response.statusText };
    }
    const data = await response.json();
    // await wait(1000);
    return data;
  } catch (error) {
    return { status: 'Error', message: error.message };
  }
}

export async function createUser({ name, surname, lastName, contacts }) {
  try {
    const response = await fetch(`${API}api/clients/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, surname, lastName, contacts })
    });

    if (!response.ok) {
      return { status: response.status, message: response.statusText };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    return { status: 'Error', message: error.message };
  }
}

export async function getUserById(id) {
  try {
    const response = await fetch(`${API}api/clients/${id}`);
    console.log(response);

    if (!response.ok) {
      return { status: response.status, message: response.statusText };
    }

    const data = await response.json();
    // await new Promise(resolve => setTimeout(resolve, 4000));
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    return { status: 'Error', message: error.message };
  }
}

export async function patchUserById(id, newData) {
  try {
    const response = await fetch(`${API}api/clients/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newData)
    });

    if (!response.ok) {
      console.log(response.status, response.statusText);

      return { status: response.status, message: response.statusText };
    }


    const data = await response.json();
    // await new Promise(resolve => setTimeout(resolve, 4000));

    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    return { status: 'Error', message: error.message };
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${API}api/clients/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    });
    if (!response.ok) {
      console.log(response);

      return { status: response.status, message: response.statusText };
    }
    const data = await response.json();

    // console.log('Успешно:', data);
    // await new Promise(resolve => setTimeout(resolve, 4000));
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    return { status: 'Error', message: error.message };
  }
}

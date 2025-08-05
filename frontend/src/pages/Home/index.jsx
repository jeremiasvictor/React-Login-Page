// react hooks
import { useEffect, useState, useRef } from "react";

import "./style.css";
import api from "../../services/api";

import Trash from "../../assets/trash.png";

function Home() {
  // variable to store the users
  // useState is a hook that allows you to add state to functional components
  // the first element is the state variable, the second is the function to update it
  let [users, setUsers] = useState([]);

  // useRef is a hook that allows you to get the data from the input fields
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    users = await api.get("/users");

    setUsers(users.data);
  }

  async function createUser() {
    // post request to create a new user
    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();
  }

  async function deleteUser(id) {
    await api.delete(`/users/${id}`);
  }

  // execute the getUsers function when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder="Nome" name="name" type="text" ref={inputName} />
        <input placeholder="Idade" name="age" type="number" ref={inputAge} />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
        />
        {/* onclick event to call the createUser function */}
        <button type="button" onClick={createUser}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>

          {/* button to delete the user */}
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;

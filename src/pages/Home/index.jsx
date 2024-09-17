import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUser(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    
  }

  async function deleteUser(id){
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de usuarios</h1>
        <input type="text" name="nome" placeholder="Nome" ref={inputName}/>
        <input type="number" name="idade" placeholder="Idade" ref={inputAge}/>
        <input type="email" name="email" placeholder="Email" ref={inputEmail}/>
        <button type="button" onClick={createUser}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;

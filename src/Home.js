import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import './loginandregister.css';
import URL from "./App";

function Home() {
  const userInfo = useContext(UserContext);
  const [inputVal, setInputVal] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('uncompleted');

  useEffect(() => {
    axios.get(`${URL}/todos`, { withCredentials: true })
      .then(response => {
        setTodos(response.data);
      })
  }, []);

  if (!userInfo.email) {
    return <div style={{ textAlign: "center", margin: "50px" }}><h3 style={{ fontSize: "30px", color: "white" }}>You need to be logged in to see this page</h3></div>
  }


  function addTodo(e) {
    e.preventDefault();
    axios.put(`${URL}/todos`, { text: inputVal }, { withCredentials: true })
      .then(response => {
        setTodos([...todos, response.data]);
        setInputVal('');
      })

  }

  function updateTodo(todo) {
    const data = { id: todo._id, done: !todo.done };
    axios.post(`${URL}/todos`, data, { withCredentials: true })
      .then(() => {
        const newTodos = todos.map(t => {
          if (t._id === todo._id) {
            t.done = !t.done;
          }
          return t;
        });
        setTodos([...newTodos]);
      });
  }

  const getTodos = () => {
    return todos.filter(todo => filter === 'completed' ? todo.done : !todo.done);
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };


  return <div className="login-box">
    <form class="user-box" onSubmit={e => addTodo(e)}>
      <input placeholder={'What do you want to do?'}
        value={inputVal}
        onChange={e => setInputVal(e.target.value)} />
      {/* <select class="box" onChange={(e)=>changeFilter(e.target.value)}>
        <option value='completed'>Completed</option>
        <option value='uncompleted'>Uncompleted</option>
       </select>   */}
    </form>
    <div className="box">
      <select id="standard-select" onChange={(e) => changeFilter(e.target.value)}>
        <option value='completed'>Completed</option>
        <option value='uncompleted'>Uncompleted</option>
      </select>
    </div>
    <div className="checked">
      <ul>
        {getTodos().map(todo => (
          <li className="text">
            <input className='checkbox' type='checkbox'
              checked={todo.done}
              onClick={() => updateTodo(todo)}
            />
            {todo.done ? <del>{todo.text}</del> : todo.text}
          </li>
        ))}

      </ul>
    </div>
  </div>
}

export default Home;
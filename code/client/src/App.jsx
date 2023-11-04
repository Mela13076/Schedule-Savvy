import './App.css';
import { useState, useEffect } from 'react';
import { useRoutes} from 'react-router-dom'
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import ViewTask from './pages/ViewTask';
import EditTask from './pages/EditTask';
import Calendar from './pages/calendar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Nav from './componets/nav';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3001/tasks')
      const data = await response.json()
      setTasks(data)
    }
    fetchTasks()
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/users')
      const data = await response.json()
      setUsers(data)
    }
    fetchUsers()
  }, []);


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Home data={tasks}/>
    },
    {
      path:"/new-task",
      element: <CreateTask />
    },
    {
      path:"/edit/:id",
      element: <EditTask data={tasks} />
    },
    {
      path:"/task/:id",
      element: <ViewTask data={tasks} />
    },
    {
      path:"/calendar",
      element: <Calendar data={tasks} />
    },
    {
      path:"/sign-in",
      element: <SignIn data={users} />
    },
    {
      path:"/sign-up",
      element: <SignUp />
    }
  ]);


  return ( 

    <div className="App">

      <div className="header">
        <Nav />
      </div>
      <div className="content">
        {element}
      </div>
        
    </div>

  );
}

export default App;
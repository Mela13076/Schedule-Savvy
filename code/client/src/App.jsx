import './App.css';
import { useState, useEffect } from 'react';
import { useRoutes} from 'react-router-dom'
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import ViewTask from './pages/ViewTask';
import EditTask from './pages/EditTask';
import Calendar from './pages/Calendar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Nav from './componets/nav';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  const API_URL = process.env.NODE_ENV === 'production' ? 'https://server-production-a3bc.up.railway.app' : 'http://localhost:3001'

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3001/tasks')
      const data = await response.json()
      setTasks(data)
    }

    const fetchCategories = async () => {
      const response = await fetch('http://localhost:3001/categories')
      const data = await response.json()
      setCategories(data)
    }



    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/users')
      const data = await response.json()
      setUsers(data)
    } 

    fetchUsers()
    fetchTasks()
    fetchCategories()
    
  }, []);
  // console.log(tasks)
  // console.log(categories)


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Home data={tasks} categories={categories}/>
    },
    {
      path:"/new-task",
      element: <CreateTask api_url={API_URL} categories={categories}/>
    },
    {
      path:"/edit/:id",
      element: <EditTask data={tasks} categories={categories}/>
    },
    {
      path:"/task/:id",
      element: <ViewTask data={tasks} categories={categories} api_url={API_URL}/>
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
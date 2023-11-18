// import React, { useState, useEffect } from "react";
// import Spinner from "react-bootstrap/Spinner";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";
// import "./Home.css";
// import TaskCard from "../componets/TaskCard";

// function Home(props) {
//   const [tasks, setTasks] = useState([]);
//   const [order, setOrder] = useState("task_id");
//   const [subtasks, setSubtasks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [categoryOfs, setCategoryOfs] = useState([]);
//   const [filters, setFilters] = useState({
//     high: true,
//     medium: true,
//     low: true,
//   });
// console.log(props)
//   useEffect(() => { 
//     if (props.data.length > 0) {
//       setTasks(props.data);
//     }

//   }, [props.data]);
  
//   const sortTasks = (property) => {
//     let sortedTasks = [];
//     switch (property) {
//       case 'title':
//         sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case 'task_id':
//         sortedTasks = [...tasks].sort((a, b) => a.task_id - b.task_id);
//         break;
//       case 'priority_level':
//         sortedTasks = [...tasks].sort((a, b) => a.priority_level.localeCompare(b.priority_level));
//         break;
//       default:
//         sortedTasks = tasks;
//     }
//     setTasks(sortedTasks);
//   };

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setFilters({ ...filters, [name]: checked });
//   };

//   const filteredTasks = tasks.filter((task) => {
//     if ((filters.high && task.priority_level == 'high') ||
//         (filters.medium && task.priority_level == 'medium') ||
//         (filters.low && task.priority_level == 'low')) {
//       return true;
//     }
//     return false;
//   });

  
//   return (
//     <div className="Home">
//       <div className="filter">
//         Sort by: 
//               <Button variant="secondary" type="submit" onClick={() => sortTasks('task_id')}>Date Created</Button>
//               <Button variant="secondary" type="submit" onClick={() => sortTasks('title')}>Title</Button>
//               <Button variant="secondary" type="submit" onClick={() => sortTasks('priority_level')}>Priority</Button>
//               <label>
//                 High Priority
//                 <input
//                   type="checkbox"
//                   name="high"
//                   checked={filters.high}
//                   onChange={handleCheckboxChange}
//                 />
//               </label>
//               <label>
//                 Medium Priority
//                 <input
//                   type="checkbox"
//                   name="medium"
//                   checked={filters.medium}
//                   onChange={handleCheckboxChange}
//                 />
//               </label>
//               <label>
//                 Low Priority
//                 <input
//                   type="checkbox"
//                   name="low"
//                   checked={filters.low}
//                   onChange={handleCheckboxChange}
//                 />
//               </label>


//       </div>
      
//       <div className="tasks-container">
//         {filteredTasks && filteredTasks.length > 0 ? (
//           filteredTasks.map((task, index) => (
//             <TaskCard id={task.task_id} data={props.data} categories={props.categories} key={index} api_url={props.api_url}/>
//           ))
//         ) : (
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./Home.css";
import TaskCard from '../componets/TaskCard'

function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [order, setOrder] = useState("task_id");
  const [subtasks, setSubtasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryOfs, setCategoryOfs] = useState([]);
  const [filters, setFilters] = useState({
    high: true,
    medium: true,
    low: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => { 
    if (props.data.length > 0) {
      setTasks(props.data);
    }
  }, [props.data]);
  
  const sortTasks = (property) => {
    let sortedTasks = [];
    switch (property) {
      case 'title':
        sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'task_id':
        sortedTasks = [...tasks].sort((a, b) => a.task_id - b.task_id);
        break;
      // case 'priority_level':
      //   sortedTasks = [...tasks].sort((a, b) => a.priority_level.localeCompare(b.priority_level));
      //   break;
      default:
        sortedTasks = tasks;
    }
    setTasks(sortedTasks);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  };

  const filteredTasks = tasks.filter((task) => {
    if ((filters.high && task.priority_level === 'high') ||
        (filters.medium && task.priority_level === 'medium') ||
        (filters.low && task.priority_level === 'low')) {
      return true;
    }
    return false;
  });

  const filteredAndSearchedTasks = filteredTasks.filter((task) => {
  if (searchTerm === "") {
    return true;
  }
  const searchLower = searchTerm.toLowerCase(); // Convert search term to lowercase
  const titleLower = task.title.toLowerCase(); // Convert title to lowercase
  const descriptionLower = task.description.toLowerCase(); // Convert description to lowercase
  return (
    titleLower.includes(searchLower) || // Compare lowercase values
    descriptionLower.includes(searchLower)
  );
});


  return (
    <div className="Home">
      <div className="filter">
        <Form>
          <Row className="mb-3">
            <Col xs={12} sm={12} md={3}>
              <Form.Group>
                <Form.Label>Sort by:</Form.Label>
                <Button variant="secondary" type="button" onClick={() => sortTasks('task_id')}>Date Created</Button>
                <Button variant="secondary" type="button" onClick={() => sortTasks('title')}>Title</Button>
                {/* <Button variant="secondary" type="button" onClick={() => sortTasks('priority_level')}>Priority</Button> */}
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={4}>
              <Form.Group>
                <Form.Label>Filter by Priority:</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="High Priority"
                  name="high"
                  checked={filters.high}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Medium Priority"
                  name="medium"
                  checked={filters.medium}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Low Priority"
                  name="low"
                  checked={filters.low}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={5}>
              <Form.Group>
                <Form.Label>Search:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search tasks"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      
      <div className="tasks-container">
        {filteredAndSearchedTasks && filteredAndSearchedTasks.length > 0 ? (
          filteredAndSearchedTasks.map((task, index) => (
            <TaskCard id={task.task_id} data={props.data} categories={props.categories} key={index} api_url={props.api_url}/>
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
    </div>
  );
}

export default Home;


import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [order, setOrder] = useState("task_id");
  const [filters, setFilters] = useState({
    high: true,
    medium: true,
    low: true,
  });

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
      case 'priority_level':
        sortedTasks = [...tasks].sort((a, b) => a.priority_level.localeCompare(b.priority_level));
        break;
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
    if ((filters.high && task.priority_level == 'high') ||
        (filters.medium && task.priority_level == 'medium') ||
        (filters.low && task.priority_level == 'low')) {
      return true;
    }
    return false;
  });

  
  return (
    <div className="Home">
      Sort by: 
      <Button variant="secondary" type="submit" onClick={() => sortTasks('task_id')}>Date Created</Button>
      <Button variant="secondary" type="submit" onClick={() => sortTasks('title')}>Title</Button>
      <Button variant="secondary" type="submit" onClick={() => sortTasks('priority_level')}>Priority</Button>
      <label>
        High Priority
        <input
          type="checkbox"
          name="high"
          checked={filters.high}
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        Medium Priority
        <input
          type="checkbox"
          name="medium"
          checked={filters.medium}
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        Low Priority
        <input
          type="checkbox"
          name="low"
          checked={filters.low}
          onChange={handleCheckboxChange}
        />
      </label>
      {filteredTasks && filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Link to={`/task/${task.id}`}>
                <Button variant="primary">Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default Home;

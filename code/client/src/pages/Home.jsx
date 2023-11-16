import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Home(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(props.data);
  }, [props]);

  return (
    <div className="Home">
      {tasks && tasks.length > 0 ? (
        tasks.map((task, index) => (
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

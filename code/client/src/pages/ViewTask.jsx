import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";



function ViewTask({ api_url }) {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`${api_url}/tasks/${id}`);
      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [id]);

  console.log(task)

  if (!task) {
    // Handle the case where the task details are still loading
    return <div>Loading...</div>;
  }

  // Format date and time using the provided functions
  const formattedDate = formatDate(task.due_date);
  const formattedTime = formatTime(task.due_time);

  // Function to format a date string as MM-DD-YYYY
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}-${year}`;
}

// Function to format a time string as AM/PM
function formatTime(inputTime) {
  const time = inputTime.split(':');
  let hours = parseInt(time[0]);
  const minutes = time[1];
  let period = 'AM';

  if (hours >= 12) {
    if (hours > 12) {
      hours -= 12;
    }
    period = 'PM';
  }

  return `${hours}:${minutes} ${period}`;
}

  const deleteTask = async (taskId) => {
    try {
      // First, delete associated records from the 'categoryof' table
      const deleteCategoryOfQuery = `
        DELETE FROM categoryof WHERE task_id = $1;
      `;
      await pool.query(deleteCategoryOfQuery, [taskId]);
  
      // Now, you can safely delete the task from the 'tasks' table
      const deleteTaskQuery = `
        DELETE FROM tasks WHERE task_id = $1;
      `;
      await pool.query(deleteTaskQuery, [taskId]);
  
      console.log(`Task with ID ${taskId} deleted successfully.`);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };
  

  const handleDelete = async () => {
    // Perform the delete operation here
    // You can add your delete API call logic here
    deleteTask(id)
    try {
      const response = await fetch(`${api_url}/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Task deleted successfully, you can handle the success case here
        console.log("Task deleted successfully");
        // Redirect to a different page or update the UI as needed
      } else {
        // Handle the case where the delete request failed
        console.error("Failed to delete task");
      }
    } catch (error) {
      // Handle errors, e.g., network errors, server errors, etc.
      console.error("There was a problem with the delete operation:", error);
    }

    window.location.href = '/'
    // Close the delete modal
    // setShowDeleteModal(false);

  };

  

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Card.Text>Date: {formattedDate}</Card.Text>
              <Card.Text>Time: {formattedTime}</Card.Text>
              <Card.Text>Priority: {task.priority_level}</Card.Text>
              <Card.Text>Status: {task.completed ? "Completed" : "Incomplete"}</Card.Text>
              <Button as={Link} to={`/edit/${id}`} variant="primary">
                Edit
              </Button>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ViewTask;



// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";

// // Function to format a date string as MM-DD-YYYY
// function formatDate(inputDate) {
//   const date = new Date(inputDate);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${month}-${day}-${year}`;
// }

// // Function to format a time string as AM/PM
// function formatTime(inputTime) {
//   const time = inputTime.split(':');
//   let hours = parseInt(time[0]);
//   const minutes = time[1];
//   let period = 'AM';

//   if (hours >= 12) {
//     if (hours > 12) {
//       hours -= 12;
//     }
//     period = 'PM';
//   }

//   return `${hours}:${minutes} ${period}`;
// }

// function ViewTask({ api_url }) {
//   const { id } = useParams();
//   const [task, setTask] = useState(null);

//   useEffect(() => {
//     const fetchTask = async () => {
//       const response = await fetch(`${api_url}/tasks/${id}`);
//       const data = await response.json();
//       setTask(data);
//     };

//     fetchTask();
//   }, [id]);

//   if (!task) {
//     // Handle the case where the task details are still loading
//     return <div>Loading...</div>;
//   }

//   // Format date and time using the provided functions
//   const formattedDate = formatDate(task.due_date);
//   const formattedTime = formatTime(task.due_time);

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <Card className="mt-3">
//             <Card.Body>
//               <Card.Title>{task.title}</Card.Title>
//               <Card.Text>{task.description}</Card.Text>
//               <Card.Text>Date: {formattedDate}</Card.Text>
//               <Card.Text>Time: {formattedTime}</Card.Text>
//               <Card.Text>Priority: {task.priority_level}</Card.Text>
//               <Card.Text>Status: {task.completed}</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ViewTask;




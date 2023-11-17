import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import CreatableSelect from "react-select/creatable";
import "react-datepicker/dist/react-datepicker.css";


function EditTask({data}) {

  const {id} = useParams();
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [task, setTask] = useState({
    id: 0,
    title: '',
    description: '',
    due_date: '',
    due_time: '',
    priority_level: '',
    completed: false,
    user_id: 1,
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setTask( (prev) => {
        return {
            ...prev,
            [name]:value,
        }
    })
}

const handleDateChange = (date) => {
  setSelectedDate(date);
  // Update the task object with the selected date
  setTask({ ...task, due_date: date });
};

const handleTimeChange = (e) => {
  const time = e.target.value;
  setSelectedTime(time);
  // Update the task object with the selected time
  setTask({ ...task, due_time: time });
};

const handleCategoryChange = (selectedOptions) => {
  setSelectedCategories(selectedOptions);
  // Update the task object with the selected categories
  setTask({ ...task, categories: selectedOptions });
};

const handleCreateCategory = (inputValue) => {
  const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
  setSelectedCategories([...selectedCategories, newCategory]);
  // Update the task object with the newly created category
  setTask({ ...task, categories: [...task.categories, newCategory] });
  return newCategory;
};


// const updateTask = async (event) => {
//     event.preventDefault();

//     const options = {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(task)
//     }
    
//     await fetch('/tasks/' + id, options)
//     window.location.href = '/'
// }

const handleSubmit = async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  if (form.checkValidity() === false) {
    event.stopPropagation();
    setValidated(true);
    return;
  }

  try {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };

    const response = await fetch(`/tasks/${id}`, options);

    if (response.ok) {
      // Task updated successfully, you can handle the success case here
      console.log("Task updated successfully");
      // Redirect to a different page or update the UI as needed
    } else {
      // Handle the case where the update request failed
      console.error("Failed to update task");
    }
  } catch (error) {
    // Handle errors, e.g., network errors, server errors, etc.
    console.error("There was a problem with the update operation:", error);
  }
};

const categoryOptions = [
  { value: 'category1', label: 'Category 1' },
  { value: 'category2', label: 'Category 2' },
  { value: 'category3', label: 'Category 3' },
  // Add more category options here
];


const deleteTask = async (event) => {
    event.preventDefault();

    const options = {
        method: 'DELETE'
    }
    
    await fetch('/tasks/' + id, options)
    window.location.href = '/'
}


    return (
      <div className="EditTask">
        <h1>Edit A Task</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Task"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
              <Form.Control.Feedback>Good Task!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Categories</Form.Label>
              <CreatableSelect
                isMulti
                options={categoryOptions}
                onChange={handleCategoryChange}
                onCreateOption={handleCreateCategory} // Enable creating new options
                value={selectedCategories}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="date" className="due-date">
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy" // Customize date format if needed
                className="date-picker"
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="time">
              <Form.Label>Due Time</Form.Label>
              <Form.Control
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="priority">
              <Form.Label>Priority Level</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={task.priority_level}
                onChange={(e) => setTask({ ...task, priority_level: e.target.value })}
              >
                <option value="low">!</option>
                <option value="medium">!!</option>
                <option value="high">!!!</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Button type="submit">Submit Form</Button>
        </Form>
      </div>
    )
  }
  
  export default EditTask
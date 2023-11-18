import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateTask.css';

function CreateTask({ api_url, categories }) {
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // const [category, setCategory] = useState({
  //   title: '',
  //   color_hex: 'ffffff'
  // })

  // const [categoryof, setCategoryOf] = useState({
  //   category_id: 0,
  //   task_id: 0
  // })

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



  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Update the task object with the selected date
    setTask({ ...task, due_date: date });
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);
    // Update the task object with the selected time
    setTask({ ...task, due_time: time });
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    // Update the task object with the selected categories
    // setTask({ ...task, categories: selectedOptions });
  };

  // Function to create a new category option
  // const handleCreateCategory = (inputValue) => {
  //   const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
  //   setSelectedCategories([...selectedCategories, newCategory]);
  //   // Update the task object with the newly created category
  //   setCategory({ ...category, title: [...task.categories, newCategory] });
  //   return newCategory;
  // };

  const handleCreateCategory = async (inputValue) => {
    // Create a new category with a POST request to your API
    const newCategory = {
      title: inputValue,
      color_hex: 'ffffff', // Default color
    };

    //   setSelectedCategories([...selectedCategories, newCategory]);
  //   // Update the task object with the newly created category
  //   setCategory({ ...category, title: [...task.categories, newCategory] });
  //   return newCategory;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    };

    const response = await fetch(`${api_url}/categories`, options);

    if (response.ok) {
      const data = await response.json();
      const newCategoryOption = { value: data.category_id.toString(), label: data.title };
  
      // Update the selectedCategories state to include the new category option
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        newCategoryOption,
      ]);
  
      return newCategoryOption;
    } else {
      console.error('Failed to create category');
      return null;
    }
  };

  // const createCategory = async(event) => {
  //   event.preventDefault();

  //   const newCategories ={
  //     title: task.categories.map((category) => category.value),
  //     color_hex: 'ffffff'
  //   }

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newCategories),
  //   };

  //   await fetch(`${api_url}/categories`, options);
  // }

  // const createCategoryOf = async(event) => {
  //   event.preventDefault();

  //   const newCategoriesOf ={
  //     category_id: 0,
  //     task_id: 0
  //   }

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newCategoriesOf),
  //   };

  //   await fetch(`${api_url}/categoryof`, options);
  // }

  // const createTask = async (event) => {
  //   createCategory()
  //   event.preventDefault();

  //   // Create a new task object to send to the server
  //   const newTask = {
  //     title: task.title,
  //     description: task.description,
  //     due_date: task.due_date,
  //     due_time: task.due_time,
  //     priority_level: task.priority_level,
  //     completed: task.completed,
  //     user_id: task.user_id
  //     // categories: task.categories.map((category) => category.value),
  //   };

    

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newTask),
  //   };

  //   await fetch(`${api_url}/tasks`, options);
  //   window.location.href = '/';

  // };

  const createTask = async (event) => {
    event.preventDefault();

    // 1. Create the task in the tasks table
    const newTask = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      due_time: task.due_time,
      priority_level: task.priority_level,
      completed: task.completed,
      user_id: task.user_id,
    };

    console.log(newTask)
    const taskOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    };

    const taskResponse = await fetch(`${api_url}/tasks`, taskOptions);

    if (!taskResponse.ok) {
      console.error('Failed to create task');
      return;
    }

    // createCategoryOf()

    // 2. Create or retrieve categories and establish connections in categoryOf
    for (const categoryOption of selectedCategories) {
      let categoryId = categoryOption.value;

      // Check if the category exists in the categories table based on its title
      const existingCategory = categories.find(
        (category) => category.title === categoryOption.label
      );

      if (!existingCategory) {
        // Create a new category and get its category_id
        const newCategoryOption = await handleCreateCategory(categoryOption.label);

        if (newCategoryOption) {
          categoryId = newCategoryOption.value;
        } else {
          console.error('Failed to create category');
          continue;
        }
      }

      // Establish a connection in the categoryOf table
      const categoryOf = {
        task_id: 25, // Use the newly created task_id
        category_id: 21,
      };

      const categoryOfOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryOf),
      };

      const categoryOfResponse = await fetch(`${api_url}/categoryOf`, categoryOfOptions);

      if (!categoryOfResponse.ok) {
        console.error('Failed to establish categoryOf connection');
      }
    }

    // window.location.href = '/';
  };

  // const createCategoryOf = async () => {
  //   for (const categoryOption of selectedCategories) {
  //     let categoryId = categoryOption.value;

  //     // Check if the category exists in the categories table based on its title
  //     const existingCategory = categories.find(
  //       (category) => category.title === categoryOption.label
  //     );

  //     if (!existingCategory) {
  //       // Create a new category and get its category_id
  //       const newCategoryOption = await handleCreateCategory(categoryOption.label);

  //       if (newCategoryOption) {
  //         categoryId = newCategoryOption.value;
  //       } else {
  //         console.error('Failed to create category');
  //         continue;
  //       }
  //     }

  //     // Establish a connection in the categoryOf table
  //     const categoryOf = {
  //       task_id: taskResponse.category_id, // Use the newly created task_id
  //       category_id: categoryId,
  //     };

  //     const categoryOfOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(categoryOf),
  //     };

  //     const categoryOfResponse = await fetch(`${api_url}/categoryOf`, categoryOfOptions);

  //     if (!categoryOfResponse.ok) {
  //       console.error('Failed to establish categoryOf connection');
  //     }
  //   }
  // }

  return (
    <div className="CreateTask">
      <h1>Create A New Task</h1>
      <Form noValidate validated={validated} onSubmit={createTask}>
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
              options={categories.map((category) => ({
                value: category.category_id.toString(), // Adjust to match your category data
                label: category.title,
              }))}
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
  );
}

export default CreateTask;



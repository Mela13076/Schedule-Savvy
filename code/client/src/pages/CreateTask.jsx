// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// import DatePicker from 'react-datepicker';
// import Select from 'react-select';
// import CreatableSelect from 'react-select/creatable';
// import 'react-datepicker/dist/react-datepicker.css';
// import './CreateTask.css'


// function CreateTask({api_url}) {
//   const [validated, setValidated] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);


//   const [task, setTask] = useState({
//     id: 0,
//     title: "",
//     description: "",
//     due_date: "",
//     due_time: "",
//     priority_level: "",
//     completed: false,
//     user_id: 1
// })

//   // Handle date selection
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   // Handle time selection
//   const handleTimeChange = (e) => {
//     setSelectedTime(e.target.value);
//   };


//   const handleCategoryChange = (selectedOptions) => {
//     setSelectedCategories(selectedOptions);
//   };

//   // Function to create a new category option
//   const handleCreateCategory = (inputValue) => {
//     const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
//     setSelectedCategories([...selectedCategories, newCategory]);
//     return newCategory;
//   };

//   const createTask = async (event) => {
//     event.preventDefault();

//     const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(post)
//     }

//     await fetch(`${api_url}/tasks`, options)
//     window.location.href = '/'
// }

  

//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

//   const categoryOptions = [
//     { value: 'category1', label: 'Category 1' },
//     { value: 'category2', label: 'Category 2' },
//     { value: 'category3', label: 'Category 3' },
//     // Add more category options here
//   ];

//     return (
//       <div className="CreateTask">
//         <h1>Create A New Task</h1>
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Row className="mb-3">
//             <Form.Group as={Col} md="6" controlId="validationCustom01">
//               <Form.Label>Task Title</Form.Label>
//               <Form.Control
//                 required
//                 type="text"
//                 placeholder="Task"
                
//               />
//               <Form.Control.Feedback>Good Task!</Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group as={Col} md="6" controlId="validationCustom02">
//               <Form.Label>Categories</Form.Label>
//               <CreatableSelect
//                 isMulti
//                 options={categoryOptions}
//                 onChange={handleCategoryChange}
//                 onCreateOption={handleCreateCategory} // Enable creating new options
//                 value={selectedCategories}
//               />
//             </Form.Group>

        
//           </Row>

//           <Row className="mb-3">
//             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//               <Form.Label>Description</Form.Label>
//               <Form.Control as="textarea" rows={4} />
//             </Form.Group>
//           </Row>

//           <Row className="mb-3 ">
//             <Form.Group as={Col} md="4" controlId="date" className='due-date'>
//               <Form.Label>Due Date</Form.Label>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={handleDateChange}
//                 dateFormat="MM/dd/yyyy" // Customize date format if needed
//                 className='date-picker'
//               />
//             </Form.Group>

//             <Form.Group as={Col} md="4" controlId="time" >
//               <Form.Label>Due Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 value={selectedTime}
//                 onChange={handleTimeChange}
//               />
//             </Form.Group>
              
//             <Form.Group as={Col} md="4" controlId="priority" >
//               <Form.Label>Priority Level</Form.Label>
//               <Form.Select aria-label="Default select example">
//                 <option value="1">!</option>
//                 <option value="2">!!</option>
//                 <option value="3">!!!</option>
//               </Form.Select>
//             </Form.Group>
//           </Row>
        
//         <Button type="submit">Submit Form</Button>
//       </Form>
//       </div>
//     )
//   }
  
//   export default CreateTask





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

function CreateTask({ api_url }) {
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
    setTask({ ...task, categories: selectedOptions });
  };

  // Function to create a new category option
  const handleCreateCategory = (inputValue) => {
    const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
    setSelectedCategories([...selectedCategories, newCategory]);
    // Update the task object with the newly created category
    setTask({ ...task, categories: [...task.categories, newCategory] });
    return newCategory;
  };

  const createTask = async (event) => {
    event.preventDefault();

    // Create a new task object to send to the server
    const newTask = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      due_time: task.due_time,
      priority_level: task.priority_level,
      completed: task.completed,
      user_id: task.user_id
      // categories: task.categories.map((category) => category.value),
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    };

    await fetch(`${api_url}/tasks`, options);
    window.location.href = '/';

  };

  const categoryOptions = [
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
    { value: 'category3', label: 'Category 3' },
    // Add more category options here
  ];

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
  );
}

export default CreateTask;

import { React, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import './TaskCard.css'
import { add, set } from 'date-fns';
import { Link } from 'react-router-dom';
import SubTask from './SubTask';

function TaskCard(props) {
    const [task, setTask] = useState({});
    const [taskId, setTaskId] = useState(props.id);
    const [subtasks, setSubtasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState(props.categories);
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        title: '',
        color_hex: ''
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [newSubtask, setNewSubtask] = useState({
        title: '',
        completed: false
    });
    const [showFormSubtask, setShowFormSubtask] = useState(false);
    const [api_url, setApiUrl] = useState(props.api_url);

    useEffect(() => {

        const fetchTask = async () => {
            const response = await fetch(`${api_url}/tasks/${taskId}`)
            const data = await response.json()
            setTask(data)
            setIsComplete(data.completed)
        }

        const fetchSubtasks = async () => {
            const response = await fetch(`${api_url}/subtasks/task/${taskId}`)
            const data = await response.json()
            setSubtasks(data)
        }
      
        const fetchCategories = async () => {
            let response = await fetch(`${api_url}/categoryof/task/${taskId}`)
            let catOfs = await response.json()
            let catOfsIds = catOfs.map(catOf => catOf.category_id)
            
            let cats = allCategories.filter(category => catOfsIds.includes(category.category_id))
            setCategories(cats)
        }
      
        fetchTask()
        fetchCategories()
        fetchSubtasks()
        
    }, []);

    const addCategory = async (event) => {
        event.preventDefault()

        const addCat = async () => {
            const response = await fetch(`${api_url}/categories`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: newCategory.title,
                    color_hex: newCategory.color_hex
                })
            })
            let data = await response.json()
            setCategories([...categories, data])
            return data.category_id
        }

        const addCatOf = async (category_id) => {
            const response2 = await fetch(`${api_url}/categoryof`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    category_id: category_id,
                    task_id: taskId
                })
            })

            const data = await response2.json()
            return data
        }

        const category_id = await addCat()
        await addCatOf(category_id)
        setShowForm(false);
    }

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleCompleteTask = async (event) => {
        const updatedTask = { ...task, completed: !isComplete }
        setTask(updatedTask)
        await fetch(`${api_url}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        setIsComplete(updatedTask.completed)
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}-${year}`;
      }
      
    // Function to format a time string as AM/PM
    function formatTime(inputTime) {
        if (!inputTime)
            return '';
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

    const addSubtask = async (event) => {
        event.preventDefault()

        const response = await fetch(`${api_url}/subtasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: newSubtask.title,
                completed: newSubtask.completed,
                task_id: taskId
            })
        })
        let data = await response.json()
        setSubtasks([...subtasks, data])
        setShowFormSubtask(false);
    }

    return (
      <div className="task-card">
        <Card className="m-3 task-card" style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title className="task-card-title">
                    <Link to={`/task/${task.task_id}`}>
                        {task.title}
                    </Link>
                    <span className='confetti-checkmark'>
                        {isComplete ? <div>🎉</div> : null}
                        <input
                            type="checkbox"
                            checked={isComplete}
                            onChange={handleCompleteTask}
                        />
                    </span>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Due: {formatDate(task.due_date)} at {formatTime(task.due_time)}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Details: {task.description}</Card.Subtitle>
                <hr />

                <Card.Subtitle className="mb-2 text-muted">Priority: {task.priority_level} </Card.Subtitle>
                <div className="task-categories-cont">      
                    <Card.Subtitle className="mb-2 text-muted">Categories:</Card.Subtitle>
                    {
                        categories.map((category, index) => (
                            <div key={index} 
                                className="category-cont"
                                style={{ backgroundColor: `#${category.color_hex}`}}>
                                    {category.title}
                            </div>
                        ))
                    }
                    <button onClick={toggleForm}>+</button>
                    {showForm && 
                        <div className="popup">
                            <form onSubmit={addCategory}>
                                Add new category:
                                <label>
                                    Title:
                                    <input
                                    type="text"
                                    onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                                    />
                                </label>
                                <label>
                                    Color Hex:
                                    <input
                                    type="text"
                                    onChange={(e) => setNewCategory({...newCategory, color_hex: e.target.value})}
                                    />
                                </label>
                                <button type="submit">Add</button>
                            </form>
                        </div>
                    }
                </div>

                <hr />
                <Card.Subtitle className="mb-2 text-muted">Subtasks</Card.Subtitle>
                {
                    subtasks.map((subtask, index) => (
                        <SubTask key={index} subtask={subtask} api_url={api_url}/>
                    ))
                }
                <button onClick={() => setShowFormSubtask(!showFormSubtask)}>Add Subtask</button>
                {
                    showFormSubtask && 
                    <form onSubmit={addSubtask}>
                        Add new subtask:
                        <label>
                            Title:
                            <input
                            type="text"
                            onChange={(e) => setNewSubtask({...newSubtask, title: e.target.value})}
                            />
                        </label>
                        <button type="submit">Add</button>
                    </form>
                }
              </Card.Body>
            </Card>
      </div>
    )
  }
  
  export default TaskCard
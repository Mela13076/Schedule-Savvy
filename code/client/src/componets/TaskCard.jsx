import { React, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import './TaskCard.css'
import { add, set } from 'date-fns';

function TaskCard(props) {
    const [task, setTask] = useState({});
    const [taskId, setTaskId] = useState(props.id);
    const [subtasks, setSubtasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        title: '',
        color_hex: ''
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    useEffect(() => {

        const fetchTask = async () => {
            const response = await fetch(`http://localhost:3001/tasks/${taskId}`)
            const data = await response.json()
            setTask(data)
        }

        const fetchSubtasks = async () => {
            const response = await fetch(`http://localhost:3001/subtasks/task/${taskId}`)
            const data = await response.json()
            setSubtasks(data)
        }
      
        const fetchCategories = async () => {
            let response = await fetch(`http://localhost:3001/categoryof/task/${taskId}`)
            let catOfs = await response.json()
            let catOfsIds = catOfs.map(catOf => catOf.category_id)
            
            response = await fetch(`http://localhost:3001/categories/`)
            let cats = await response.json()
            setAllCategories(cats)
            cats = cats.filter(category => catOfsIds.includes(category.category_id))
            setCategories(cats)
        }
      
        fetchTask()
        fetchSubtasks()
        fetchCategories()
        
    }, []);

    const addCategory = async (event) => {
        event.preventDefault()

        const addCat = async () => {
            const response = await fetch(`http://localhost:3001/categories`, {
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
            const response2 = await fetch(`http://localhost:3001/categoryof`, {
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
            // console.log("new data:", data)
            return data
        }

        const category_id = await addCat()
        await addCatOf(category_id)
        setShowForm(false);
    }

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // const handleNewCategory = (event) => {
    //     setSelectedCategoryId(event.target.value)
    //     console.log("new category:", event.target.value)
    //     const selectedCategory = categories.find(category => category.id == selectedCategoryId);
    //     setNewCategory(selectedCategory)
    // }

    return (
      <div className="task-card">
        <Card className="m-3 task-card" style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <hr />

                <div className="task-categories-cont">
                    Categories: 
                    {
                        categories.map((category, index) => (
                            <div key={index} 
                                className="category-cont"
                                style={{ backgroundColor: `#${category.color_hex}`}}>
                                    {category.title}
                            </div>
                        ))
                    }
                    {/* <div className="category_cont" onClick={() => console.log("Add category")}> */}
                    <button onClick={toggleForm}>+</button>
                    {showForm && 
                        <div className="popup">
                            {/* <select onChange={handleNewCategory}>
                                {allCategories.map((category, index) => (
                                    <option value={category.category_id} key={index}>
                                        {category.title}
                                    </option>
                                ))}
                            </select> */}
                            <form onSubmit={addCategory}>
                            Add new category:
                            <label>
                                Title:
                                <input
                                type="text"
                                // value={title}
                                onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                                />
                            </label>
                            <label>
                                Color Hex:
                                <input
                                type="text"
                                // value={colorHex}
                                onChange={(e) => setNewCategory({...newCategory, color_hex: e.target.value})}
                                />
                            </label>
                            <button type="submit">Add</button>
                            </form>
                        </div>
                    }
                </div>

                <hr />

                <Card.Text>{task.description}</Card.Text>
                <Card.Text>{task.priority_level}</Card.Text>
                {
                    subtasks.map((subtask, index) => (
                        <Card.Text key={index}>{subtask.title}</Card.Text>
                    ))
                }
              </Card.Body>
            </Card>
      </div>
    )
  }
  
  export default TaskCard
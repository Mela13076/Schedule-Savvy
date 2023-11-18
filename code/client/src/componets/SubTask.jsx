import React from 'react';
import { Card } from 'react-bootstrap';
import { useState } from 'react';

const SubTask = (props) => {
    const [isComplete, setIsComplete] = useState(props.subtask.completed);
    const [subtask, setSubtask] = useState(props.subtask);

    const handleCompleteSubTask = async (event) => {
        const updatedSubtask = { ...subtask, completed: !subtask.completed }
        setSubtask(updatedSubtask)
        await fetch(`http://localhost:3001/subtasks/${subtask.subtask_id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedSubtask)
        })
        setIsComplete(updatedSubtask.completed)
    }

    return (
        <div>
            <Card.Text>{props.subtask.title}</Card.Text>
            <input
                type="checkbox"
                checked={isComplete}
                onChange={handleCompleteSubTask}
            />
        </div>
    );
}

export default SubTask;
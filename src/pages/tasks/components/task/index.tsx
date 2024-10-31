import { Typography } from "@mui/material";

import { ITask } from "../../../../actions/task";

const Task = ({ task } : { task: ITask }) => {
    return (
        <div key={task.identificator} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <Typography variant="body1">{task.identificator} - {task.description}</Typography>
            <Typography variant="body2">Prioridade: {task.priority}</Typography>
            <Typography variant="body2">Status: {task.status}</Typography>
        </div>
    );
};

export default Task;
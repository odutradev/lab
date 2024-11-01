import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ITask, ITaskAndSubs } from "../../../../actions/task";
import { TaskStatus } from "../../types";
import { DraggableTask } from "./styles";
  
const Task = ({ task, isOverlay } : { task: ITask | ITaskAndSubs, isOverlay?: boolean}) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.identificator });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
        <DraggableTask isDragging={isDragging} isOverlay={isOverlay} ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card variant="outlined" sx={{ borderRadius: 2, mb: 2, p: 1 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" color="primary">
                            {task.identificator}
                        </Typography>
                        <Chip 
                            label={TaskStatus[task.status as keyof typeof TaskStatus].charAt(0).toUpperCase() + TaskStatus[task.status as keyof typeof TaskStatus].slice(1)} 
                            color={task.status === 'completed' ? 'success' : task.status === 'pending' ? 'warning' : 'default'}
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                    <Typography variant="body1" gutterBottom>
                        {task.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Prioridade: <strong>{task.priority}</strong>
                    </Typography>
                </CardContent>
            </Card>
        </DraggableTask>
    );
};

export default Task;

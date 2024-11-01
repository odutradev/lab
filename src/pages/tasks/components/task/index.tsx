import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { ITask, ITaskAndSubs } from "../../../../actions/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


  
const Task = ({ task } : { task: ITask | ITaskAndSubs }) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.identificator });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 1000 : "auto",
      boxShadow: isDragging ? "0 5px 15px rgba(0,0,0,0.2)" : "none",
      cursor: isDragging ? "grabbing" : "auto",
      width: '100%'
    };
  


    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>

        <Card variant="outlined" sx={{ 
            borderRadius: 2, 
            boxShadow: 1, 
            flex: 1,
            width: '100%',
            mb: 2, 
            p: 1,
            ':hover': { boxShadow: 3 }
        }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" color="primary">
                        {task.identificator}
                    </Typography>
                    <Chip 
                        label={task.status.charAt(0).toUpperCase() + task.status.slice(1)} 
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
        </div>
    );
};

export default Task;

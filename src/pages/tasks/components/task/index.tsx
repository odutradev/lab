import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { ITask } from "../../../../actions/task";

const Task = ({ task } : { task: ITask }) => {
    return (
        <Card variant="outlined" sx={{ 
            borderRadius: 2, 
            boxShadow: 1, 
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
    );
};

export default Task;

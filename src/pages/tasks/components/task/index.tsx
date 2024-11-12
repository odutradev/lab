import { Card, Typography, Chip, IconButton } from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { BoxContent, ChipsContainer, Content, DraggableTask, IconContainer, TitleContainer } from "./styles";
import { ITask, ITaskAndSubs } from "../../../../actions/task";
  
const Task = ({ task, isOverlay }: { task: ITask | ITaskAndSubs, isOverlay?: boolean}) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const priorityLabels: { [key: string]: string } = {
        high: "Alta",
        medium: "Média",
        low: "Baixa"
    };

    return (
        <DraggableTask isDragging={isDragging} isOverlay={isOverlay} ref={setNodeRef} style={style} {...attributes}>
            <Card variant="outlined" sx={{ borderRadius: 2, mb: 2, p: 2 }}>
                    <BoxContent>
                        <IconContainer>
                            <IconButton {...listeners} {...attributes} sx={{ mr: 1 }}>
                                <DragIndicatorIcon />
                            </IconButton>
                        </IconContainer>
                        <Content>
                            <TitleContainer>
                                    <Typography variant="h6" color="primary" sx={{ paddingRight: "15px"}}>
                                        {task.identificator}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {task.description}
                                    </Typography>
                            </TitleContainer>

                        <ChipsContainer>
                            <Chip 
                                label={priorityLabels[task.priority]} 
                                color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}
                                variant="outlined"
                                size="small"
                                />
                        </ChipsContainer>
                        </Content>

                </BoxContent>
            </Card>
        </DraggableTask>
    );
};

export default Task;

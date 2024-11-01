import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { getAllTasks, ITaskAndSubs } from "../../actions/task";
import DashboardLayout from "../../components/layout";
import useAction from "../../hooks/useAction";
import Task from "./components/task";

const Tasks = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [tasks, setTasks] = useState<ITaskAndSubs[]>([]);

    const getTasks = async () => {
        const response = await getAllTasks();
        if ("error" in response) return;
        setTasks(response);
    };

    const handleCreateTask = () => {
        useAction({
            action: async () => {
                await getTasks(); 
            },
            callback: () => {
                getTasks(); 
            },
            toastMessages: {
                pending: "Criando task",
                success: "Task criada",
                error: "Erro ao criar",
            },
        });
    };

    const filteredTasks = tasks.filter((task) =>
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statusCategories = ["active", "inactive", "completed", "pending", "blocked"];
    const tasksByStatus = statusCategories.map((status) => ({
        status,
        tasks: filteredTasks.filter((task) => task.status === status),
    }));

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const newStatus = over.data.current.sortable.containerId;

        setTasks((prevTasks) => {
            const activeTaskIndex = prevTasks.findIndex((task) => task.identificator === active.id);
            const overTaskIndex = prevTasks.findIndex((task) => task.identificator === over.id);

            if (prevTasks[activeTaskIndex].status === newStatus) {
                return arrayMove(prevTasks, activeTaskIndex, overTaskIndex);
            }

            return prevTasks.map((task) => {
                if (task.identificator === active.id) {
                    return { ...task, status: newStatus };
                }
                return task;
            });
        });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <DashboardLayout title="TAREFAS">
            <Grid container justifyContent="center" gap="1rem" style={{ marginTop: "25px", marginBottom: "25px" }}>
                <TextField
                    label="Pesquisar tarefa"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "80%" }}
                />
                <Button variant="contained" color="primary" sx={{ width: "15%" }} onClick={handleCreateTask}>
                    Criar Tarefa
                </Button>
            </Grid>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <Grid container spacing={2} justifyContent="space-around">
                    {tasksByStatus.map(({ status, tasks }) => (
                        <Grid item xs={12} sm={6} md={2.4} key={status}>
                            <Typography variant="h6" align="center" gutterBottom>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Typography>
                            <Card
                                variant="outlined"
                                sx={{
                                    padding: "10px",
                                    minHeight: "300px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <SortableContext
                                    items={tasks.map((task) => task.identificator)}
                                    id={status}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {tasks.length > 0 ? (
                                        tasks.map((task) => <DraggableTask key={task.identificator} task={task} />)
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            align="center"
                                            color="textSecondary"
                                            sx={{ pointerEvents: "none" }}
                                        >
                                            Sem tarefas
                                        </Typography>
                                    )}
                                </SortableContext>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DndContext>
        </DashboardLayout>
    );
};

const DraggableTask = ({ task }: { task: ITaskAndSubs }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.identificator });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1000 : "auto",
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.15)" : "none",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Task task={task} />
        </div>
    );
};

export default Tasks;
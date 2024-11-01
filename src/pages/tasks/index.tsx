import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
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

  const EmptyColumnDropTarget = ({ id }: { id: string }) => {
    const { attributes, listeners, setNodeRef } = useSortable({ id });
    return <div ref={setNodeRef} {...attributes} {...listeners} style={{ height: "100%" }} />;
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const oldIndex = tasks.findIndex((task) => task.identificator === active.id);
    const newStatus = over.data?.current?.sortable.containerId;

    if (newStatus && newStatus !== tasks[oldIndex].status) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.identificator === active.id ? { ...task, status: newStatus } : task
        );
        return updatedTasks;
      });
      return;
    }

    const newIndex = tasks.findIndex((task) => task.identificator === over.id);
    if (newIndex !== -1 && oldIndex !== newIndex) {
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(reorderedTasks.map((task, index) => ({
        ...task,
        order: index + 1,
      })));
    }
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
                  justifyContent: tasks.length ? "flex-start" : "center",
                  alignItems: "center",
                  backgroundColor: tasks.length ? "inherit" : "rgba(0, 0, 0, 0.05)",
                  borderStyle: tasks.length ? "solid" : "dashed",
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
                    <EmptyColumnDropTarget id={status} />
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
    boxShadow: isDragging ? "0 5px 15px rgba(0,0,0,0.2)" : "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task task={task} />
    </div>
  );
};

export default Tasks;

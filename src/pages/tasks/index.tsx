import {  Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";


import { getAllTasks, ITaskAndSubs } from "../../actions/task";
import DashboardLayout from "../../components/layout";
import Task from "./components/task";
import Header from "./components/header";

const Tasks = () => {
  const [tasks, setTasks] = useState<ITaskAndSubs[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const getTasks = async () => {
    const response = await getAllTasks();
    if ("error" in response) return;
    setTasks(response);
  };

  const statusCategories = ["active", "inactive", "completed", "pending", "blocked"];
  const tasksByStatus = statusCategories.map((status) => ({
    status,
    tasks: tasks.filter((task) => task.status === status),
  }));

  const EmptyColumnDropTarget = ({ id }: { id: string }) => {
    const { attributes, listeners, setNodeRef } = useSortable({ id });
    return <div ref={setNodeRef} {...attributes} {...listeners} style={{ height: "100%" }} />;
  };

  const handleDragStart = ({ active }: any) => {
    setActiveTaskId(active.id);
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

    setActiveTaskId(null);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <DashboardLayout title="TAREFAS">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Header/>
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
                  border: "none"
                }}
              >
                <SortableContext
                  items={tasks.map((task) => task.identificator)}
                  id={status}
                  strategy={verticalListSortingStrategy}
                >
                  {tasks.length > 0 ? (
                    tasks.map((task) => <Task key={task._id} task={task} />)
                  ) : (
                    <EmptyColumnDropTarget id={status} />
                  )}
                </SortableContext>
              </Card>
            </Grid>
          ))}
        </Grid>
        <DragOverlay>
          {activeTaskId ? (
            <Task
              task={tasks.find((task: ITaskAndSubs) => String(task.identificator) === String(activeTaskId)) as ITaskAndSubs}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </DashboardLayout>
  );
};

export default Tasks;

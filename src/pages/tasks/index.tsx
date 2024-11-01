import {  Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
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
import Column from "./components/column";
import { TaskStatus } from "./types";
import Overlay from "./components/overlay";

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
            <Column title={TaskStatus[status as keyof typeof TaskStatus]}>
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
            </Column>
          ))}
        </Grid>
        <Overlay tasks={tasks} activeTaskId={activeTaskId} />
      </DndContext>
    </DashboardLayout>
  );
};

export default Tasks;

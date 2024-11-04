import {  Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";


import { getAllTasks, ITaskAndSubs, updateAllTasks } from "../../actions/task";
import DashboardLayout from "../../components/layout";
import Task from "./components/task";
import Column from "./components/column";
import { TaskStatus, TaskStatusTypes } from "./types";
import Overlay from "./components/overlay";
import Empty from "./components/empty";

const Tasks = () => {
  const [tasks, setTasks] = useState<ITaskAndSubs[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const getTasks = async () => {
    const response = await getAllTasks();
    if ("error" in response) return;
    setTasks(response);
  };

  const statusCategories = ["inactive",, "blocked", "pending", "active", "completed"];
  const tasksByStatus = statusCategories.map((status) => ({
    status,
    tasks: tasks.filter((task) => task.status === status),
  }));

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
      tasksByStatus.forEach((item) => item.tasks.forEach((task, index) => {
        let taskIndex = tasks.findIndex(x => x._id == task._id);
        var reorderedTasks = tasks;
        tasks[taskIndex].order = index;
        tasks[taskIndex].status = item.status as TaskStatusTypes;
        setTasks(reorderedTasks)
        updateAllTasks(reorderedTasks);
      }))
  }, [tasksByStatus])



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
        <Grid container spacing={2} justifyContent="space-around">
          {tasksByStatus.map(({ status, tasks }) => (
            <Column title={TaskStatus[status as keyof typeof TaskStatus]}>
                <SortableContext
                  items={tasks.map((task) => task.identificator)}
                  id={status}
                  strategy={verticalListSortingStrategy}
                >
                  {tasks.length > 0 ? (
                    tasks.sort((a, b) => (a.order || 0) -(b.order || 0)).map((task) => <Task key={task._id} task={task} />)
                  ) : (
                    <Empty id={status as string} />
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

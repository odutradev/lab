import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Grid } from "@mui/material";

import Overlay from "../../components/overlay";
import Column from "../../components/column";
import Empty from "../../components/empty";
import Task from "../../components/task";
import { TaskStatus } from "../../types";
import useTasks from "../../hooks";
import Sortable from "../sortable";

const DragAndDrop = () => {
  const { tasks, updateState, updateTasksOrder, tasksByStatus } = useTasks();
  
  const handleDragStart = ({ active }: any) => {
    const activeOverlayTask = tasks.find(
      (task) => task._id == active.id
    );
    updateState({ activeOverlayTask });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const oldIndex = tasks.findIndex(
      (task) => task._id === active.id
    );
    const newStatus = over.data?.current?.sortable.containerId;

    if (newStatus && newStatus !== tasks[oldIndex].status) {
      const reorderedTasks = tasks.map((task) =>
        task._id === active.id
          ? { ...task, status: newStatus }
          : task
      );
      updateTasksOrder(reorderedTasks);
      return;
    }

    const newIndex = tasks.findIndex((task) => task._id === over.id);
    if (newIndex !== -1 && oldIndex !== newIndex) {
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex).map((task, index) => ({
        ...task,
        order: index + 1,
      }));

      updateTasksOrder(reorderedTasks);
    }

    updateState({ activeOverlayTask: undefined });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Grid container spacing={2} justifyContent="space-around">
        {tasksByStatus.map(({ status, tasks }) => (
          <Column title={TaskStatus[status as keyof typeof TaskStatus]} hasTasks={tasks.length > 0} key={status}>
            <Sortable id={status}>
              {tasks.length > 0 ? (
                tasks
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((task) => <Task key={task._id} task={task} />)
              ) : (
                <Empty id={status as string} />
              )}
            </Sortable>
          </Column>
        ))}
      </Grid>
      <Overlay />
    </DndContext>
  );
};

export default DragAndDrop;
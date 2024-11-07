import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Grid } from "@mui/material";

//import { updateAllTasks } from '../../../../actions/task';
import { statusCategories } from "./defaultValues";
import Overlay from "../../components/overlay";
import Column from "../../components/column";
import Empty from "../../components/empty";
import Task from "../../components/task";
import { TaskStatus } from "../../types";
import useTasks from "../../hooks";
import Sortable from "../sortable";

const DragAndDrop = () => {
  const { tasks, updateState } = useTasks();

  const tasksByStatus = statusCategories.map((status) => ({
    tasks: tasks.filter((task) => task.status === status),
    status,
  }));

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
      updateState({
        tasks: tasks.map((task) =>
          task._id === active.id
            ? { ...task, status: newStatus }
            : task
        ),
      });
      return;
    }

    const newIndex = tasks.findIndex((task) => task._id === over.id);
    if (newIndex !== -1 && oldIndex !== newIndex) {
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      updateState({
        tasks: reorderedTasks.map((task, index) => ({
          ...task,
          order: index + 1,
        })),
      });
    }

    updateState({ activeOverlayTask: undefined });
  };

  /*
  useEffect(() => {
    tasksByStatus.forEach((item) =>
      item.tasks.forEach((task, index) => {
        const taskIndex = tasks.findIndex((x) => x._id === task._id);
        tasks[taskIndex].order = index;
        tasks[taskIndex].status = item.status as TaskStatusTypes;
        updateState({ tasks });
        updateAllTasks(tasks);
      })
    );
  }, [tasksByStatus, updateState]);
  */

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Grid container spacing={2} justifyContent="space-around">
        {tasksByStatus.map(({ status, tasks }) => (
          <Column title={TaskStatus[status as keyof typeof TaskStatus]} key={status}>
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
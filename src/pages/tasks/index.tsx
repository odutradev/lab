import DashboardLayout from '../../components/layout';
import DragAndDrop from './components/dragAndDrop';
import { TasksProvider } from './hooks';

const Tasks = () => {
  return (
    <DashboardLayout title="TAREFAS">
      <TasksProvider>
        <DragAndDrop />
      </TasksProvider>
    </DashboardLayout>
  );
};

export default Tasks;
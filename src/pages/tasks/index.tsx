import DashboardLayout from '../../components/layout';
import DragAndDrop from './components/dragAndDrop';
import CreateModal from './modals/create';
import { TasksProvider } from './hooks';

const Tasks = () => {
  return (
    <DashboardLayout title="TAREFAS">
      <TasksProvider>
        <DragAndDrop />
        <CreateModal/>
      </TasksProvider>
    </DashboardLayout>
  );
};

export default Tasks;
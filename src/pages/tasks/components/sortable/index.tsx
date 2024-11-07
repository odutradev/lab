import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { SortableProps } from "./types";
import useTasks from '../../hooks';

const Sortable = ({ children, id }: SortableProps) => {
    const { tasks } = useTasks();

    return (
      <SortableContext
        items={tasks.map((task) => task.identificator)}
        strategy={verticalListSortingStrategy}
        id={id}
      >
        {children}
      </SortableContext>
        
    );
};

export default Sortable;
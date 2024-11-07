import {  DragOverlay } from "@dnd-kit/core";

import useTasks from "../../hooks";
import Task from "../task";

const Overlay = () => {
    const { activeOverlayTask } = useTasks();
    
    return (
        <DragOverlay>
            {activeOverlayTask ? (
                <Task
                    task={activeOverlayTask}
                    isOverlay
                />
            ) : null}
        </DragOverlay>
    );
};

export default Overlay;
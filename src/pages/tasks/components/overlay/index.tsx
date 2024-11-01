import {  DragOverlay } from "@dnd-kit/core";

import { ITaskAndSubs } from "../../../../actions/task";
import { OverlayProps } from "./types";
import Task from "../task";

const Overlay = ({ activeTaskId, tasks }: OverlayProps) => {
    return (
        <DragOverlay>
            {activeTaskId ? (
                <Task
                    task={tasks.find((task: ITaskAndSubs) => String(task.identificator) === String(activeTaskId)) as ITaskAndSubs}
                    isOverlay
                />
            ) : null}
        </DragOverlay>
    );
};

export default Overlay;
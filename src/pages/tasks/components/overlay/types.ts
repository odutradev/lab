import { ITaskAndSubs } from "../../../../actions/task";

export interface OverlayProps {
    activeTaskId: string | null;
    tasks: ITaskAndSubs[];
};
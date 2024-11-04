import { useSortable } from "@dnd-kit/sortable";
import { EmptyColumnDropTargetProps } from "./types";

const Empty = ({ id }: EmptyColumnDropTargetProps) => {
    const { attributes, listeners, setNodeRef } = useSortable({ id });
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={{ height: "100%" }} />
    );
};

export default Empty;
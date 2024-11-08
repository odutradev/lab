import { CreateButtonProps } from "./types";

const CreateButton = ({ status }: CreateButtonProps) => {
    return (
        <button>{status}</button>
    );
};

export default CreateButton;
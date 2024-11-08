import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

import { CreateButtonProps } from "./types";
import { StyledButton } from "./styles";
import useTasks from "../../hooks";

const CreateButton = ({ status }: CreateButtonProps) => {
    const { updateState } = useTasks();

    const handleCreate = () => {
        updateState({ createModal: true, createStatus: status });
    };

    return (
        <StyledButton
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={handleCreate}
        >
            <Typography variant="body2" align="center">
                Criar item
            </Typography>
        </StyledButton>
    );
};

export default CreateButton;

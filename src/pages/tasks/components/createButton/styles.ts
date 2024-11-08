import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)`
    justify-content: center;
    text-transform: none;
    opacity: 0.7;
    margin: 0.5rem 0;
    width: 100%;

    &:hover {
        opacity: 1;
    }
`;

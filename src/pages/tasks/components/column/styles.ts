import styled from "styled-components";
import { Card } from "@mui/material";

export const CustomColumn = styled(Card)`
    justify-content: flex-start;
    border: none !important;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
    padding: 10px;
    display: flex;
    height: 100%;
`;

export const CustomTitleCard = styled(Card)`
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    height: auto;
    padding: 4px;

    h6 {
        font-size: 16px;
        margin: 0;
    }
`;
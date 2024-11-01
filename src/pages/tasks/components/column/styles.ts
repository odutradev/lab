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
import styled from "styled-components";
import Paper from '@mui/material/Paper';

export const Image = styled.img`
    border-radius: 50%;
    height: 65px;
    width: 65px;
`;

export const BackgroudCover = styled.img`
    background-position: left;
    background-size: cover;
    overflow: hidden;
    height: 100vh;
    width: 100%;
`;

export const FormContainer = styled.div`
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
    height: 100vh;
    display: flex;
`;

export const CustomPaper = styled(Paper)`
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    height: 100vh;
    display: flex;
`;

export const FullHeightGrid = styled.div`
    overflow: hidden;
    height: 100vh;
`;
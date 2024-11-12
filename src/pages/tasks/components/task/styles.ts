import styled from "styled-components";

export const DraggableTask  = styled.div<{ isDragging: boolean, isOverlay?: boolean }>`
  z-index: ${({ isDragging, isOverlay }) => (isDragging ? isOverlay ? 1500 : 1000 : "auto")};
  opacity: ${({ isOverlay, isDragging}) => ((!isOverlay && isDragging) && 0.1)};
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "auto")};
  width: 100%;
`;

export const BoxContent = styled.div`
  flex-direction: row;
  align-items: center;
  display: flex;
  flex: 1;
`;

export const IconContainer = styled.div`
  height: 100%;
  width: auto;
`;

export const TitleContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 100%;
  `;

export const Content = styled.div`
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  display: flex;
  flex: 1;
`;

export const ChipsContainer = styled.div`
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  padding-top: 25px;
  display: flex;
  width: 100%;
  gap: 2.5px;
`;
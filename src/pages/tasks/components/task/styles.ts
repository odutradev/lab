import styled from "styled-components";

export const DraggableTask  = styled.div<{ isDragging: boolean, isOverlay?: boolean }>`
  z-index: ${({ isDragging, isOverlay }) => (isDragging ? isOverlay ? 1500 : 1000 : "auto")};
  opacity: ${({ isOverlay, isDragging}) => ((!isOverlay && isDragging) && 0.1)};
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "auto")};
  width: 100%;
`;
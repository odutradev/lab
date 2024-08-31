import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #121212;
    color: #e0e0e0;
    overflow: auto;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #333;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(255, 77, 77, 0.3); 
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: rgba(179, 54, 54, 0.9); 
  }
`;

export default GlobalStyles;

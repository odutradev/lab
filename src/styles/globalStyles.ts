import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100px #363636 inset !important;
    -webkit-text-fill-color: #e0e0e0 !important;
    background-color: #363636 !important; 
  }

  input:-webkit-autofill::placeholder {
    color: #e0e0e0 !important;
  }
`;

export default GlobalStyles;

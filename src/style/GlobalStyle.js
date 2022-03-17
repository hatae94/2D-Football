import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body  {
        font-family: 'IBM Plex Mono', 'IBM Plex Sans KR', Menlo, 'Courier New';
        margin: 0;
        padding: 0;
        height: 100vh;
        background-color: #5a8f3c;
      };

    li {
        list-style: none;
      };

    a {
        color: #000;
        text-decoration: none;
      };

    button {
      background-color: #ffe500;
      border-radius: 2rem;
      border-style: none;
      width: 10rem;
      height: 3rem;
      font-size: 1.5rem;
      font-weight: bold;
      box-shadow: 2px 2px 2px black;
      margin-bottom: 1rem;
    }

    input {
      width: 15rem;
      height: 5rem;
      font-size: 3rem;
      text-align: center;
      margin-bottom: 3rem;
      border: none;
      border-bottom: 3px solid #000;
      background-color: #5a8f3c;
    }

    input::placeholder {
      color: #000;
    }
`;

export default GlobalStyle;

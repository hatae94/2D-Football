import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body  {
        font-family: 'IBM Plex Mono', 'IBM Plex Sans KR', Menlo, 'Courier New';
        margin: 0;
        padding: 0;
        height: 100vh;
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
    }

    button:hover {
      background-color: #e1d462;
    }
`;

export default GlobalStyle;

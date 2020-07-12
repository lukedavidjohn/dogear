import { createGlobalStyle } from "styled-components";
import Quicksand from "./Quicksand-VariableFont_wght.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'Quicksand';
        src: local('Quicksand'), local('Quicksand'),
        url(${Quicksand}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;

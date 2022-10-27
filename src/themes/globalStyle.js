import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`

    :root {
        --background: radial-gradient(farthest-side ellipse at 10% 0,#333867 20%,#17193b);
        --heading-color: #F4F4F5F6;
        --cardBg: rgba(0,0,0,0.24);
        --btn-color: #323578;
        --cardFooterBg: #04062050;
        --cardBoxShadow: rgba(4,7,30,0.4);
        --color-gray: rgb(158, 158, 158);
    }

    html, body {
        scroll-behavior: smooth;
        height: 100%;
        transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    body {
        width: 100%;
        color: var(--text);
        font-display: block;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        display: block;
        transition: all 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
        line-height: 1.5;
    }

    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    #root {
        background: var(--background);

        h1,h2  {
            @media screen and (min-width: 767px) {
                font-size: 28px;
            }
        }

        .btn:hover {
            border-color: var(--btn-color);
        }

        .btn-primary {
            background-color: var(--btn-color);
        }

        .btn-outline-primary {
            --bs-btn-border-color: var(--btn-color);
            --bs-btn-color: var(--btn-color);

            &:hover {
                --bs-btn-hover-bg: var(--btn-color);
            }
        }
    }
`;

export default GlobalStyle;
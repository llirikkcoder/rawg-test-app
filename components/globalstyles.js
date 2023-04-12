import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html,
  body {
    font-family: 'Quicksand', sans-serif;
    color: white;
    background-color: #151515;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    .hero_image {
        clip-path: circle(0% at 50% 50%);
    }
    
    .event_container {
        clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
    }
  }
  
  .link {
    @apply active:scale-90 duration-200;
    }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

    /* width */
    ::-webkit-scrollbar {
    width: .5rem;
    height: .5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #2e2e2e;
    border-radius: 5px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #5c5c5c;
    border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`

export default GlobalStyle

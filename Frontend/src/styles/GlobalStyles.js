import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #1976d2;
    --primary-dark: #1565c0;
    --secondary: #f6f8fa;
    --accent: #e3f2fd;
    --danger: #e53935;
    --success: #43a047;
    --border-radius: 10px;
    --shadow: 0 2px 8px rgba(0,0,0,0.06);
    --max-width: 1200px;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    background: var(--secondary);
    color: #222;
    min-height: 100vh;
    line-height: 1.6;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s;
  }
  button {
    font-family: inherit;
    border: none;
    border-radius: var(--border-radius);
    padding: 0.6em 1.5em;
    background: var(--primary);
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: var(--shadow);
    transition: background 0.2s, box-shadow 0.2s;
  }
  button:hover, button:focus {
    background: var(--primary-dark);
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.12);
    outline: none;
  }
  input, select, textarea {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.6em 1em;
    border: 1px solid #cfd8dc;
    border-radius: var(--border-radius);
    margin-bottom: 1em;
    background: #fff;
    transition: border 0.2s;
  }
  input:focus, select:focus, textarea:focus {
    border-color: var(--primary);
    outline: none;
  }
  .card {
    background: #fff;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 2em;
    margin: 1em 0;
    max-width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    max-width: 400px;
    margin: 2em auto;
    background: #fff;
    padding: 2em;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
  }
  @media (max-width: 600px) {
    body {
      font-size: 1rem;
    }
    .card, form {
      padding: 1em;
      margin: 0.5em;
    }
    h1, h2, h3 {
      font-size: 1.2em;
    }
  }
`;

export default GlobalStyles; 
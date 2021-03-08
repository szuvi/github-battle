/* eslint-disable react/no-unused-state */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular';
import Battle from './components/Battle';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light',
        }));
      },
    };
  }

  render() {
    const { theme } = this.state;
    return (
      <ThemeProvider value={this.state}>
        <div className={theme}>
          <div className="container">
            <Nav />
            <Battle />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

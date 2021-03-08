import * as React from 'react';
import { ThemeConsumer } from '../contexts/theme';

export default function Nav(props) {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            type="button"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}

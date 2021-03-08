import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../contexts/theme';

export default function Card({ heading, subheading, avatar, name, href, children }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          <h4 className="header-lg center-text">{heading}</h4>
          <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
          {subheading && <h4 className="header-lg center-text">{subheading}</h4>}
          <h2 className="center-text">
            <a className="link" href={href}>
              {name}
            </a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  );
}

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.element,
};

Card.defaultProps = {
  subheading: null,
  children: null,
};

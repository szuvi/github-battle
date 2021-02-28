/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';
import fetchRepos from '../utils/api';
import Card from './Card';
import Loading from './Loading';

function LanguagesNav({ selected, updateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="flex-center">
      {languages.map((lang) => (
        <li key={lang}>
          <button
            type="button"
            onClick={() => updateLanguage(lang)}
            style={selected === lang ? { color: 'red' } : null}
            className="btn-clear nav-link"
          >
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};

function RepositoriesGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;

        return (
          <Card
            key={html_url}
            heading={`#${index + 1}`}
            avatar={avatar_url}
            href={html_url}
            name={name}
          >
            <ul className="card-list">
              <li>
                <FaUser color="rgb(255, 191, 116)" size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
              </li>
              <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues.toLocaleString()} open
              </li>
            </ul>
          </Card>
        );
      })}
    </ul>
  );
}

RepositoriesGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      error: null,
      repos: {},
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(language) {
    const { repos } = this.state;
    this.setState({
      selectedLanguage: language,
      error: null,
    });

    if (!repos[language]) {
      fetchRepos(language)
        .then((data) => {
          // eslint-disable-next-line no-shadow
          this.setState(({ repos }) => {
            return {
              repos: { ...repos, [language]: data },
            };
          });
        })
        .catch((error) => {
          console.warn('Error fetching repos: ', error);
          this.setState({
            error: `There was an error fetching the repositories.`,
          });
        });
    }
  }

  isLoading() {
    const { error, repos, selectedLanguage } = this.state;
    return !error && !repos[selectedLanguage];
  }

  render() {
    const { selectedLanguage, error, repos } = this.state;

    return (
      <>
        <LanguagesNav selected={selectedLanguage} updateLanguage={this.updateLanguage} />
        {this.isLoading() && <Loading text="Fetching Repos" />}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedLanguage] && <RepositoriesGrid repos={repos[selectedLanguage]} />}
      </>
    );
  }
}

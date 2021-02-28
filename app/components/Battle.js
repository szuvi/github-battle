/* eslint-disable max-classes-per-file */
import * as React from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import Results from './Results';

function Instructions() {
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends className="bg-light" color="rgb(255, 191, 116)" size={140} />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className="bg-light" color="#727272" size={140} />
        </li>
        <li>
          <h3 className="header-sm">See the winner</h3>
          <FaTrophy className="bg-light" color="rgb(255, 215, 0)" size={140} />
        </li>
      </ol>
    </div>
  );
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  render() {
    const { label } = this.props;
    const { username } = this.state;

    return (
      <form className="column player" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {label}
        </label>
        <div className="row player-inputs">
          <input
            type="text"
            id="username"
            className="input-light"
            placeholder="github username"
            autoComplete="off"
            value={username}
            onChange={this.handleInputChange}
          />
          <button className="btn dark-btn" type="submit" disabled={!username}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function PlayerCard({ label, username, onClose }) {
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className="row bg-light">
        <div className="player-info">
          <img
            className="avatar-small"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button type="button" className="btn-clear flex-center" onClick={onClose}>
          <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
        </button>
      </div>
    </div>
  );
}

PlayerCard.propTypes = {
  label: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false,
    };

    this.resetPlayer = this.resetPlayer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player,
    });
  }

  resetPlayer(id) {
    this.setState({
      [id]: null,
    });
  }

  render() {
    const { playerOne, playerTwo, battle } = this.state;

    if (battle) {
      return <Results playerOne={playerOne} playerTwo={playerTwo} />;
    }

    return (
      <>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={(player) => this.handleSubmit('playerOne', player)}
              />
            ) : (
              <PlayerCard
                label="Player One"
                username={playerOne}
                onClose={() => this.resetPlayer('playerOne')}
              />
            )}

            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
              />
            ) : (
              <PlayerCard
                label="Player Two"
                username={playerTwo}
                onClose={() => this.resetPlayer('playerTwo')}
              />
            )}
          </div>

          {playerOne && playerTwo && (
            <button
              type="button"
              className="btn dark-btn btn-space"
              onClick={() => this.setState({ battle: true })}
            >
              Battle
            </button>
          )}
        </div>
      </>
    );
  }
}

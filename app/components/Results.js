import * as React from 'react';
import PropTypes from 'prop-types';
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa';
import { battle } from '../utils/api';
import Card from './Card';

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then((results) =>
        this.setState({
          winner: results[0],
          loser: results[1],
          error: null,
          loading: false,
        }),
      )
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;
    if (loading === true) {
      return <p>LOADING</p>;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <div className="grid space-around container-sm">
        <Card
          heading={winner.score === loser.score ? 'Tie' : 'Winner'}
          avatar={winner.profile.avatar_url}
          subheading={`Score: ${winner.score.toLocaleString()}`}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ul className="card-list">
            <li>
              <FaUser color="rgb(239, 115, 115)" size={22} />
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FaCompass color="rgb(144, 115, 255)" size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color="#795548" size={22} />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color="rgb(129, 195, 245)" size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="rgb(64, 183, 95)" size={22} />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>

        <Card
          heading={winner.score === loser.score ? 'Tie' : 'Loser'}
          avatar={loser.profile.avatar_url}
          subheading={`Score: ${loser.score.toLocaleString()}`}
          href={loser.profile.html_url}
          name={loser.profile.login}
        >
          <ul className="card-list">
            <li>
              <FaUser color="rgb(239, 115, 115)" size={22} />
              {loser.profile.name}
            </li>
            {loser.profile.location && (
              <li>
                <FaCompass color="rgb(144, 115, 255)" size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color="#795548" size={22} />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color="rgb(129, 195, 245)" size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="rgb(64, 183, 95)" size={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
      </div>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
};

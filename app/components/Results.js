/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa';
import QueryString from 'query-string';
import { Link } from 'react-router-dom';
import { battle } from '../utils/api';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="Location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

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
    const {
      // eslint-disable-next-line react/prop-types
      location: { search },
    } = this.props;
    const { playerOne, playerTwo } = QueryString.parse(search);

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
      return <Loading />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <>
        <div className="grid space-around container-sm">
          <Card
            heading={winner.score === loser.score ? 'Tie' : 'Winner'}
            avatar={winner.profile.avatar_url}
            subheading={`Score: ${winner.score.toLocaleString()}`}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>

          <Card
            heading={winner.score === loser.score ? 'Tie' : 'Loser'}
            avatar={loser.profile.avatar_url}
            subheading={`Score: ${loser.score.toLocaleString()}`}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link className="btn dark-btn btn-space" to="/battle">
          Reset
        </Link>
      </>
    );
  }
}

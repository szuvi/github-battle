/* eslint-disable camelcase */
function getErrorMessage(message, username) {
  if (message === 'Not Found') {
    return `There is no user with name ${username}`;
  }
  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }
      return profile;
    });
}

function getUserRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMessage(repos.message, username));
      }
      return repos;
    });
}

function getStarCount(repos) {
  return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateUserScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(username) {
  return Promise.all([getProfile(username), getUserRepos(username)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateUserScore(profile.followers, repos),
    }),
  );
}

function sortByScore(playersData) {
  return playersData.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]).then((playersData) => sortByScore(playersData));
}

export default function fetchRepos(language) {
  const url = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`,
  );

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}

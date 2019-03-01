import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository, RepositoryActions } from './styles';

const CompareList = ({ repositories, removeRepository, updateRepository }) => (
  <Container>
    {repositories.map(repo => (
      <Repository key={repo.id}>
        <RepositoryActions>
          <button
            type="button"
            onClick={() => {
              updateRepository(repo);
            }}
          >
            <i className="fa fa-refresh" />
          </button>
          <button
            type="button"
            onClick={() => {
              removeRepository(repo);
            }}
          >
            <i className="fa fa-times" />
          </button>
        </RepositoryActions>
        <header>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <strong>{repo.name}</strong>
          <small>{repo.owner.login}</small>
        </header>

        <ul>
          <li>
            {repo.stargazers_count}
            {' '}
            <small>stars</small>
          </li>
          <li>
            {repo.forks_count}
            {' '}
            <small>forks</small>
          </li>
          <li>
            {repo.open_issues_count}
            {' '}
            <small>issues</small>
          </li>
          <li>
            {repo.lastCommit}
            {' '}
            <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  removeRepository: PropTypes.func.isRequired,
  updateRepository: PropTypes.func.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
};

export default CompareList;

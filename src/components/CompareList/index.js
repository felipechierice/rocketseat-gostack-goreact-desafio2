import React from 'react';

import { Container, Repository } from './styles';

const CompareList = ({ repositories }) => (
  <Container>
    {repositories.map(repo => (
      <Repository>
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
            {repo.pushed_at}
            {' '}
            <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
);

export default CompareList;

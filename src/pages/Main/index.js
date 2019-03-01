import React, { Component } from 'react';
import moment from 'moment';

import Api from '../../services/Api';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    let localRepos = [];

    try {
      localRepos = JSON.parse(localStorage.localRepos);
    } catch (err) {
      localStorage.setItem('localRepos', JSON.stringify([]));
    } finally {
      this.setState({ repositories: localRepos });
    }
  }

  removeRepository = async (repo) => {
    const { repositories } = this.state;
    const newRepositories = repositories.filter(rep => rep.id !== repo.id);
    await this.setState({ repositories: newRepositories });
    this.updateLocal();
  };

  updateRepository = async (repo) => {
    let { repositories } = this.state;
    const updatedRepo = await Api.get(`/repos/${repo.owner.login}/${repo.name}`);

    updatedRepo.data.lastCommit = moment(updatedRepo.data.pushed_at).fromNow();

    repositories = repositories.map((rep) => {
      if (rep.id === repo.id) return updatedRepo.data;
      return rep;
    });

    await this.setState({ repositories });
    this.updateLocal();
  };

  updateLocal = () => {
    const { repositories } = this.state;
    localStorage.setItem('localRepos', JSON.stringify(repositories));
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { repositoryInput } = this.state;
      const { data: repository } = await Api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      await this.setState(prevState => ({
        repositoryInput: '',
        repositories: [...prevState.repositories, repository],
        repositoryError: false,
      }));

      this.updateLocal();
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Logo" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="user/repo"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepository={this.removeRepository}
          updateRepository={this.updateRepository}
        />
      </Container>
    );
  }
}

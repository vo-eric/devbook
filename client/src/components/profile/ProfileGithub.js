import React, { Component } from "react";
import PropTypes from "prop-types";

import Loader from "../common/Loader";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      sort: "updated desc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort } = this.state;

    fetch(`/api/profile/github/${username}/${count}/${sort}`)
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    let repoItems;

    if (repos) {
      repoItems = repos.slice(0, 5).map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a
                  href={repo.html_url}
                  className="text-info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6 text-right">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    } else {
      repoItems = <Loader />;
    }
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos:</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;

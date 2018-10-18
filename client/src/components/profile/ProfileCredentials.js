import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCredentials extends Component {
  render() {
    const { experience, education } = this.props;
    const exp = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <strong>Duration: </strong>
          <span>
            <Moment format="MMM YYYY">{exp.from}</Moment> -
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format=" MMM YYYY">{exp.to}</Moment>
            )}
          </span>
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          <strong>Location: </strong>
          {exp.location === "" ? null : <span>{exp.location}</span>}
        </p>
        <p>
          <strong>Description:</strong>
          {exp.description === "" ? null : <span>{exp.description}</span>}
        </p>
      </li>
    ));

    const edu = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <strong>Duration: </strong>
          <span>
            <Moment format="MMM YYYY">{edu.from}</Moment> -
            {edu.to === null ? (
              " Now"
            ) : (
              <Moment format=" MMM YYYY">{edu.to}</Moment>
            )}
          </span>
        </p>
        <div>
          <strong>
            {edu.degree} in {edu.field}
          </strong>
          {edu.minor === "" ? null : (
            <p>
              <strong>Minor in {edu.minor}</strong>
            </p>
          )}
        </div>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>{edu.description}</strong>
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {exp.length > 0 ? (
            <ul className="list-group">{exp}</ul>
          ) : (
            <p className="text-center">No experience listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {edu.length > 0 ? (
            <ul className="list-group">{edu}</ul>
          ) : (
            <p className="text-center">No experience listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCredentials;

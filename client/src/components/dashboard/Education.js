import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";

import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.edu.map(education => (
      <tr key={education._id}>
        <td>{education.school}</td>
        <td>{education.degree}</td>
        <td>{education.field}</td>
        <td>
          <Moment format="YYYY/MM/DD">{education.from}</Moment> -
          {education.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{education.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onClick.bind(this, education._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(withRouter(Education));

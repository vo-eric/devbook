import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocial: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      github: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocial } = this.state;
    let socialInputs;

    if (displaySocial) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Instagram URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

          <InputGroup
            placeholder="LinkedIn URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    }

    const options = [
      {
        label: "* Professional Status",
        value: 0
      },
      {
        label: "Developer",
        value: "Developer"
      },
      {
        label: "Junior Developer",
        value: "Junior Developer"
      },
      {
        label: "Senior Developer",
        value: "Senior Developer"
      },
      {
        label: "Manager",
        value: "Manager"
      },
      {
        label: "Student",
        value: "Student"
      },
      {
        label: "Instructor",
        value: "Instructor"
      },
      {
        label: "Intern",
        value: "Intern"
      },
      {
        label: "Other",
        value: "Other"
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">
                Please enter the following information
              </p>
              <small className="d-block pb-3">* = required</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Your current status in your web development career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Your current company (if applicable)"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your personal website or portfolio"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your current city"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Languages and frameworks you know. Please separate by commas (JavaScript, React, Node, HTML, etc)"
                />

                <TextFieldGroup
                  placeholder="Github"
                  name="github"
                  value={this.state.github}
                  onChange={this.onChange}
                  error={errors.github}
                  info="Your github username"
                />

                <TextAreaFieldGroup
                  placeholder="About me..."
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell everyone about yourself"
                />

                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(previousState => ({
                        displaySocial: !previousState.displaySocial
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add any social media links
                  </button>
                  <span className="text-muted ml-2">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);

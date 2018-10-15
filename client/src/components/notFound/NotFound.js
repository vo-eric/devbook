import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/profiles" className="btn btn-light mb-3 float-left">
            Go to Profiles
          </Link>
        </div>
        <div className="col-md-6" />
        <div className="ml-3">
          <h1 className="display-4">Page not found</h1>
          <p>This page does not exist!</p>
        </div>
      </div>
    </div>
  );
};

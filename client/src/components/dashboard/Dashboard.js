import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentProfile } from '../../actions/profile';

function Dashboard(props) {
  const { getCurrentProfile, auth, profile } = props;
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return <div>Dashboard</div>;
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

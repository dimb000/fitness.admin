import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, QueryRenderer } from 'react-relay';

import Environment from '../Environment';

import BackgroundSpinner from '../components/framework/BackgroundSpinner';

import DashboardView from '../components/Dashboard';

const DashboardQuery = graphql`
  query DashboardQuery {
    viewer {
      ...Dashboard_viewer
    }
  }
`;

class Dashboard extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <QueryRenderer
        environment={Environment}
        query={DashboardQuery}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            if (!props.viewer) {
              this.props.history.push('/login');

              return null;
            }

            return (
              <DashboardView viewer={props.viewer} />
            );
          }
    
          return <BackgroundSpinner isShowing />;
        }}
      />
    );
  }
}

export default Dashboard;
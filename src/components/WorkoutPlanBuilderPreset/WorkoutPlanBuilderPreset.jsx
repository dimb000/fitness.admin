import './styles.css';

import {
  Card,
  CardMedia,
  CardTitle,
} from 'material-ui/Card';
import React, { Component } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import { createFragmentContainer, graphql } from 'react-relay';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SelectWorkoutPlanTemplateModal from './SelectWorkoutPlanTemplateModal';
import workoutPlanBuilderService from '../../services/workout-plan-builder.service';

class WorkoutPlanBuilderPreset extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    isSelectTemplateModalOpen: false,
  };

  onSelectWorkoutPlanTemplate = ({ node: template }) => {
    const { history } = this.props;

    workoutPlanBuilderService.complitePresetStep(template.id);
    this.setState({ isSelectTemplateModalOpen: false });
    history.push('/workout-plan-builder/creator');
  }

  closeSelectTemplateModal = () => {
    this.setState({ isSelectTemplateModalOpen: false });
  }

  goWithBlankTemplate = () => {
    const { history } = this.props;

    workoutPlanBuilderService.complitePresetStep();
    history.push('/workout-plan-builder/creator');
  };

  render() {
    const { viewer } = this.props;
    const { isSelectTemplateModalOpen } = this.state;

    return (
      <div className="workout-plan-builder-preset">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Workout Plan Builder" />
          </ToolbarGroup>
        </Toolbar>

        <div className="workout-plan-builder-preset__cards">
          <Card
            className="workout-plan-builder-preset__card"
            onClick={this.goWithBlankTemplate}
          >
            <CardMedia>
              <CardMedia>
                <img alt="Blank Plan logo" src="https://digwp.com/wp-content/uploads/2017/01/wp-theme-blank.gif" />
              </CardMedia>
            </CardMedia>

            <CardTitle title="Blank Plan" subtitle="Create plan from scratch" />
          </Card>

          <Card className="workout-plan-builder-preset__card" onClick={() => this.setState({ isSelectTemplateModalOpen: true })}>
            <CardMedia>
              <img alt="Templates Plan logo" src="https://media.gqindia.com/wp-content/uploads/2015/08/bad-fitness-rules_1.jpg" />
            </CardMedia>

            <CardTitle title="Plan From Template" subtitle="Create plan from template" />
          </Card>
        </div>

        <SelectWorkoutPlanTemplateModal
          viewer={viewer}
          open={isSelectTemplateModalOpen}
          onRequestClose={this.closeSelectTemplateModal}
          onSelectWorkoutPlanTemplate={this.onSelectWorkoutPlanTemplate}
        />
      </div>
    );
  }
}

export default createFragmentContainer(
  withRouter(WorkoutPlanBuilderPreset),
  graphql`
    fragment WorkoutPlanBuilderPreset_viewer on Viewer {
      ...SelectWorkoutPlanTemplateModal_viewer
    }
  `,
);

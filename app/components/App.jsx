import config from '../constants/config';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetch } from '../actions/topic';

import classnames from 'classnames';

import Map from './Map';
import Profile from './Profile';
import FacebookButton from './FacebookButton';
import CheckinButton from './CheckinButton';
import AjaxLoader from './AjaxLoader';
import SearchBox from './SearchBox';

const propTypes = {
  params: PropTypes.object,
  onTopicFetch: PropTypes.func,
};
const defaultProps = {};

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    onTopicFetch: (tag) => {
      if (tag) {
        dispatch(fetch(tag));
      }
    },
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component {

  propTypes: {
    params: React.PropTypes.object,
    onTopicFetch: React.PropTypes.func
  }

  componentWillMount() {
    const { params, onTopicFetch } = this.props;
    const { topic } = params;
    onTopicFetch(topic);
  }

  render = () => {
    const wrapperClasses = classnames('knots-wrapper');

    return (
      <div className={wrapperClasses}>
        <FacebookButton />
        <Profile />
        <SearchBox />
        <CheckinButton />
        <Map options={config.map.options} showFakeMarkers />
        <AjaxLoader />
      </div>
    );
  };
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;

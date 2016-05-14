import React from 'react';
import config from '../constants/config';
import { connect } from 'react-redux';
import classnames from 'classnames';
import FacebookLogin from 'react-facebook-login';
import { login } from '../actions/user';

function mapStateToProps({ user }) {
  return {
    isLogged: user.isLogged
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onLogin: (accessToken) => {
      dispatch(login(accessToken));
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FacebookButton extends React.Component {

  render = () => {

    const { isLogged } = this.props;
    const facebookAppId = config.facebook.appId || null;

    // defining element css classes
    const styles = {
      wrapper: classnames('facebook-button'),
      facebookLogin: classnames('facebook-button--facebook-login')
    };

    if (!isLogged) {
      return (
        <div className={styles.wrapper}>
          <FacebookLogin
            appId={facebookAppId}
            scope={'public_profile'}
            autoLoad={false}
            cssClass={styles.facebookLogin}
            callback={this.handleFacebookResponse}
            icon={'fa-facebook'} />
        </div>
      );
    } else {
      return null;
    }
  };

  handleFacebookResponse = (response) => {
    // retrieve relevant data from response
    const { status, accessToken } = response;
    const { onLogin } = this.props;

    if (!status || status !== 'not authorized') {
      onLogin(accessToken);
    }
  };

}

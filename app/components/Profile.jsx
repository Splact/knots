import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import FacebookLogin from 'react-facebook-login';
import { login, logout } from '../actions/user';

function mapStateToProps(state) {
  const { token, ...user } = state.user;

  return {
    bearerToken: token,
    ...user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onLogin: (accessToken) => {
      dispatch(login(accessToken));
    },
    onLogout: () => {
      dispatch(logout());
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends React.Component {

  render = () => {

    const { facebookOptions, defaultPicture, username, picture, isLogged, onLogout } = this.props;
    const facebookAppId = facebookOptions.appId || null;
    const pictureUrl = picture || defaultPicture;

    // defining element css classes
    const styles = {
      wrapper: classnames('profile'),
      facebookLogin: classnames('profile--facebook-login'),
      name: classnames('profile--display-name'),
      logoutButton: classnames('button'),
      picture: classnames('profile--picture')
    };

    if (isLogged) {
      return (
        <div className={styles.wrapper} data-username={username}>
          <div className={styles.picture}>
            <img src={pictureUrl}/>
          </div>
          <button className={styles.logoutButton} onClick={onLogout}>logout</button>
        </div>
      );
    } else {
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

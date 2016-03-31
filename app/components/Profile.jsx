import React from 'react';
import classnames from 'classnames';
import FacebookLogin from 'react-facebook-login';
import ProfileActions from '../actions/ProfileActions';

export default class Profile extends React.Component {

  state = {
    isLogged: false,
    isLoading: false
  };

  componentWillMount() {
    const { bearerToken, onLogin } = this.props;
    if (bearerToken) {
      this.setState({ isLogged: true });
      onLogin();
      ProfileActions.updateBearerToken(bearerToken);
    }
  }

  render = () => {

    const { facebookOptions, defaultPicture, username, picture } = this.props;
    const facebookAppId = facebookOptions.appId || null;
    const { isLogged } = this.state;
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
          <button className={styles.logoutButton} onClick={this.logout}>logout</button>
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
            callback={this.responseFacebook}
            icon={'fa-facebook'} />
        </div>
      );
    }
  };

  responseFacebook = (response) => {
    // retrieve relevant data from response
    const { status, accessToken } = response;

    if (!status || status !== 'not authorized') {
      ProfileActions.login(accessToken);
      this.setState({
        isLogged: true
      });
      this.props.onLogin();
    }
  };

  logout = () => {
    this.setState({
      isLogged: false
    });
    this.props.onLogout();
    ProfileActions.logout();
  };

}

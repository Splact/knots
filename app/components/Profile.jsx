import React from 'react';
import classnames from 'classnames';
import Avatar from './Avatar';
import FacebookLogin from 'react-facebook-login';
import ProfileActions from '../actions/ProfileActions';

export default class Profile extends React.Component {

  constructor({bearerToken, ...props}) {
    super(props);

    if (bearerToken) {
      this.state = { isLogged: true, isLoading: false };
    } else {
      this.state = { isLogged: false, isLoading: false };
    }

  }

  componentWillMount() {
    const { bearerToken } = this.props;
    if (bearerToken) {
      ProfileActions.updateBearerToken(bearerToken);
    }
  }

  render = () => {

    const { facebookOptions, defaultPicture, username, displayName, picture } = this.props;
    const facebookAppId = facebookOptions.appId || null;
    const { isLogged } = this.state;

    // defining element css classes
    const styles = {
      wrapper: classnames('profile'),
      bar: classnames('profile--bar'),
      facebookLogin: classnames('profile--facebook-login'),
      name: classnames('profile--display-name'),
      logoutButton: classnames('button')
    };

    if (isLogged) {
      return (
        <div className={styles.wrapper} data-username={username}>
          <div className={styles.bar}>
            <Avatar url={picture} defaultUrl={defaultPicture}/>
            <span className={styles.name}>{displayName}</span>
            <button className={styles.logoutButton} onClick={this.logout}>logout</button>
          </div>
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
    }
  };

  logout = () => {
    this.setState({
      isLogged: false
    });
    ProfileActions.logout();
  };

}

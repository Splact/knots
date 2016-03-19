import React from 'react';
import classnames from 'classnames';
import Avatar from './Avatar';
import FacebookLogin from 'react-facebook-login';
import ProfileActions from '../actions/ProfileActions';
import ProfileStore from '../stores/ProfileStore';

export default class Profile extends React.Component {

  constructor({id, ...props}) {
    super(props);

    if (id) {
      this.state = { isLogged: true };
    } else {
      this.state = { isLogged: false };
    }

  }

  componentWillMount() {
    ProfileStore.performFetch();
  }

  render = () => {

    const { facebookOptions, defaultPicture, id, name, picture } = this.props;
    const facebookAppId = facebookOptions.appId || null;
    const { isLogged } = this.state;

    // defining element css classes
    const styles = {
      wrapper: classnames('profile'),
      bar: classnames('profile--bar'),
      facebookLogin: classnames('profile--facebook-login'),
      name: classnames('profile--display-name')
    };

    if (isLogged) {
      return (
        <div className={styles.wrapper} data-id={id}>
          <div className={styles.bar}>
            <Avatar url={picture} defaultUrl={defaultPicture}/>
            <span className={styles.name}>{name}</span>
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
            fields={'name, picture'}
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
    const { status, accessToken, id, name, picture } = response;
    const pictureUrl = picture.data.url || null;

    if (!status || status !== 'not authorized') {
      ProfileActions.login({ id, name, picture: pictureUrl, accessToken });
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

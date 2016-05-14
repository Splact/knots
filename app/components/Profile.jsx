import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { logout } from '../actions/user';

function mapStateToProps(state) {
  const { token, ...user } = state.user;

  return {
    bearerToken: token,
    ...user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends React.Component {

  render = () => {

    const { defaultPicture, username, picture, isLogged, onLogout } = this.props;
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
      return null;
    }
  };

}

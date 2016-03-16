import React from 'react';
import classnames from 'classnames';
import Avatar from './Avatar';
import FacebookLogin from 'react-facebook-login';

export default class Profile extends React.Component {

  state = {
    isLogged: false
  };

  responseFacebook = (response) => {
    const { status, accessToken, id, name } = response;

    console.log({ response, status, accessToken, id, name });

    if (!status || status !== 'not authorized')
      this.setState({
        isLogged: true
      });
  };

  render = () => {

    const { facebookOptions } = this.props;
    const facebookAppId = facebookOptions.appId || null;
    const { isLogged } = this.state;

    let wrapperClasses = classnames('profile');
    let barClasses = classnames('profile--bar');
    let facebookLoginClasses = classnames('profile--facebook-login');

    if (isLogged) {
      return (
        <div className={wrapperClasses}>
          <div className={barClasses}>
            <Avatar/>
          </div>
        </div>
      );
    } else {
      return (
        <div className={wrapperClasses}>
          <FacebookLogin
            appId={facebookAppId}
            autoLoad={true}
            cssClass={facebookLoginClasses}
            callback={this.responseFacebook}
            icon={'fa-facebook'} />
        </div>
      );
    }
  };

}

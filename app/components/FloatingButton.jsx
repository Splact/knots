import React from 'react';
import classnames from 'classnames';

export default class FloatingButton extends React.Component {
  defaultIcon = 'plus';
  render = () => {
    let { icon, color, size, fixed, position, disabled } = this.props;

    if (!icon) {
      icon = this.defaultIcon;
    }

    let fbClasses = classnames('floating-button', {
      'floating-button--primary': color === 'primary',
      'floating-button--success': color === 'success',
      'floating-button--info': color === 'info',
      'floating-button--warning': color === 'warning',
      'floating-button--error': color === 'error',
      'floating-button--small': size === 'small',
      'floating-button--medium': size === 'medium',
      'floating-button--big': size === 'big',
      'floating-button--fixed': fixed,
      'floating-button--top-left': position === 'top-left',
      'floating-button--top-right': position === 'top-right',
      'floating-button--bottom-left': position === 'bottom-left',
      'floating-button--bottom-right': position === 'bottom-right',
      'floating-button--disabled': disabled === true
    });
    let iconClasses = classnames('fa', `fa-${icon}`);

    return (
      <div
        className={fbClasses}
        onClick={this.onClickHandle}>
        <link rel={'stylesheet'} href={'//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'} />
        <i className={iconClasses}></i>
      </div>
    );
  };

  onClickHandle = () => {
    const {onClick, disabled} = this.props;

    if (disabled === true) {
      return false;
    }

    onClick();
  };
}

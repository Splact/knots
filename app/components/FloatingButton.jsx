import React, { PropTypes } from 'react';
import classnames from 'classnames';

const propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  fixed: PropTypes.bool,
  position: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
const defaultProps = {};

class FloatingButton extends React.Component {
  onClickHandle = () => {
    const { onClick, disabled } = this.props;

    if (disabled === true) {
      return false;
    }

    return onClick();
  };
  defaultIcon = 'plus';
  render = () => {
    const { color, size, fixed, position, disabled } = this.props;

    const icon = this.props.icon || this.defaultIcon;

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
      'floating-button--disabled': disabled === true,
    });
    let iconClasses = classnames('fa', `fa-${icon}`);

    return (
      <div className={fbClasses} onClick={this.onClickHandle}>
        <link
          rel={'stylesheet'}
          href={'//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'}
        />
        <i className={iconClasses}></i>
      </div>
    );
  };
}

FloatingButton.propTypes = propTypes;
FloatingButton.defaultProps = defaultProps;

export default FloatingButton;

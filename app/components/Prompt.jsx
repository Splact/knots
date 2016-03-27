import React from 'react';
import classnames from 'classnames';

export default class Prompt extends React.Component {
  state = {
    text: ''
  };

  render = () => {
    let { icon, color, size, fixed, position, disabled, placeholder } = this.props;
    const { text } = this.state;

    if (!icon)
      icon = this.defaultIcon;

    let promptClasses = classnames('prompt', {
      'prompt--primary': color === 'primary',
      'prompt--success': color === 'success',
      'prompt--info': color === 'info',
      'prompt--warning': color === 'warning',
      'prompt--error': color === 'error',
      'prompt--small': size === 'small',
      'prompt--medium': size === 'medium',
      'prompt--big': size === 'big',
      'prompt--fixed': fixed,
      'prompt--top-left': position === 'top-left',
      'prompt--top-right': position === 'top-right',
      'prompt--bottom-left': position === 'bottom-left',
      'prompt--bottom-right': position === 'bottom-right',
      'prompt--disabled': disabled === true
    });

    let iconClasses = classnames('fa', `fa-${icon}`);

    return (
      <div
        className={promptClasses}
        onkeypress={this.handleKeyPress}>
        <link rel={'stylesheet'} href={'//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'} />
        <i className={iconClasses}></i>
        <input
          type={'text'}
          placeholder={placeholder}
          value={text}
          onChange={this.handleChange} />
      </div>
    );
  };

  handleChange = (event) => {
    this.setState({text: event.target.value});
  };

  handleKeyPress = ({ key }) => {
    const {onKeyPress, disabled} = this.props;
    const { text } = this.state;

    if (disabled === true) {
      return false;
    }

    onKeyPress(key, text);
  };
}

import React from 'react';
import classnames from 'classnames';

export default class Prompt extends React.Component {
  state = {
    text: ''
  };

  render = () => {
    let { icon, color, size, fixed, position, disabled, placeholder, empty } = this.props;
    const { text } = this.state;

    if (!icon) {
      icon = this.defaultIcon;
    }

    const styles = {
      prompt: classnames('prompt', {
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
      }),
      icon: classnames('fa', `fa-${icon}`),
      empty: classnames('fa', 'fa-times')
    };

    const faLink = (icon || empty) ? (<link
      rel={'stylesheet'} href={'//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'} />) : null;
    const iconElement = (icon) ? (<i className={styles.icon}></i>) : null;
    const emptyElement = (icon) ? (<i className={styles.empty} onClick={this.handleEmpty}></i>) : null;

    return (
      <div
        className={styles.prompt}>
        {faLink}
        {iconElement}
        <input
          type={'text'}
          placeholder={placeholder}
          value={text}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}/>
        {emptyElement}
      </div>
    );
  };

  handleChange = (event) => {
    const oldText = this.state.text;
    const newText = event.target.value;
    const { onChange } = this.props;

    this.setState({text: newText});

    onChange({ oldText, newText });
  };

  handleEmpty = () => {
    const oldText = this.state.text;
    const newText = '';
    const { onChange } = this.props;

    this.setState({ text: newText });

    onChange({ oldText, newText });
  };

  handleEnter = ({ charCode, target }) => {
    const { onEnter } = this.props;

    const oldText = this.state.text;
    const newText = target.value;

    if (charCode == 13) {
      onEnter({ oldText, newText });
    }
  };
}

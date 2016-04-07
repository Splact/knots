import React from 'react';
import classnames from 'classnames';

export default class AjaxLoader extends React.Component {
  render = () => {
    const { isLoading } = this.props;

    let loaderClasses = classnames('ajax-loader', {
      'ajax-loader--loading': isLoading === true
    });

    return (
      <div className={loaderClasses}></div>
    );
  };
}

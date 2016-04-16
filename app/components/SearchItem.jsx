import React from 'react';
import classnames from 'classnames';

export default class SearchItem extends React.Component {

  render = () => {

    const {tag, checkinsCount, isCreate, ...props} = this.props;

    // defining element css classes
    const styles = {
      topicResult: classnames('search-box--topic-result'),
      createTopic: classnames('search-box--create-topic')
    };

    if (!isCreate) {
      return (
        <li
          className={styles.topicResult}
          {...props}>#{tag} ({checkinsCount})</li>
      );
    } else {
      return (
        <li
          className={styles.createTopic}
          {...props}>Be the first on <strong>#{tag}</strong></li>
      );
    }
  };
}

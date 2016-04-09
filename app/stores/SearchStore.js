import alt from '../libs/alt';
import SearchActions from '../actions/SearchActions';
import { webApi, SEARCH_TOPICS } from '../libs/webApi';

class SearchStore {
  constructor() {
    this.bindActions(SearchActions);

    this.results = [];
    this.query = null;
    this.isPending = false;
  }

  searchTopics({ q }) {
    const { results, query } = this;
    if ((results.length > 0) || (!query) || (query.length > q.length)) {
      this.setState({
        results: [],
        query: q,
        isPending: true
      });
      webApi(SEARCH_TOPICS, { q });
    } else {
      this.setState({
        query: q
      });
    }
  }

  searchTopicsSuccess({ results }) {
    this.setState({
      results,
      isPending: false,
      reqId: null
    });

    return results;
  }

  emptyResults() {
    this.setState({
      results: [],
      query: null
    });
  }
}

export default alt.createStore(SearchStore, 'SearchStore');

import {mount} from 'enzyme';
import React from 'react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import ScrollToTop from '../../../components/scroll-to-top/ScrollToTop';

describe(`Component ScrollToTop should work correctly`, () => {
  it(`scroll window to top on redirect test`, () => {
    global.scrollTo = jest.fn();
    const history = createMemoryHistory();
    mount(
      <Router history={history}>
        <ScrollToTop />
      </Router>
    );
    history.push('/some-route1');
    expect(global.scrollTo).toHaveBeenCalledTimes(1);
    history.push('/some-route2');
    expect(global.scrollTo).toHaveBeenCalledTimes(2);
  });
});

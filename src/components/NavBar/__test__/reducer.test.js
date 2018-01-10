// import navBar, { INITIAL_STATE } from '../reducer';
import navBar from '../reducer';
import { openMenu, closeMenu } from '../action';

describe('NavBar reducer', () => {
  it('returns the same state on an unhandled action', () => {
    expect(navBar(false, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles OPEN_MENU action', () => {
    expect(navBar(true, openMenu())).toMatchSnapshot();
  });

  it('handles CLOSE_MENU action', () => {
    expect(navBar(false, closeMenu())).toMatchSnapshot();
  });
});

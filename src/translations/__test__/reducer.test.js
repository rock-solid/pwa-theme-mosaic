import translations, { INITIAL_STATE, getTranslations, getTranslationsFetching } from '../reducers';
import { requestTranslations, receiveTranslations } from '../actions';

describe('Translations reducer', () => {
  it('returns the same state on an unhandled action', () => {
    expect(translations(INITIAL_STATE, { type: '_NULL' })).toMatchSnapshot();
  });
  it('handles REQUEST_TRANSLATIONS action', () => {
    const translationsList = {
      isFetching: 0,
      items: {
        TEXTS: 'Some text',
        FORM: 'Some text',
      },
    };
    expect(translations(translationsList, requestTranslations())).toMatchSnapshot();
  });
  it('handles RECEIVE_TRANSLATIONS action', () => {
    const translationsState = {
      isFetching: 1,
      items: {
        TEXTS: 'Some text',
        FORM: 'Some text',
      },
    };
    const translationsList = {
      isFetching: 1,
      items: {
        TEXTS: 'Some text',
        FORM: 'Some text',
      },
    };
    expect(translations(translationsState, receiveTranslations(translationsList))).toMatchSnapshot();
  });

  // reducer functions
  it('getTranslationsFetching returns state.isFetching', () => {
    const state = {
      isFetching: 4,
    };
    expect(getTranslationsFetching(state)).toBe(4);
  });
  it('getTranslations returns state.items', () => {
    const state = {
      items: {
        TEXTS: 'Some text',
        FORM: 'Some text',
      },
    };
    expect(getTranslations(state)).toBe(state.items);
  });
});

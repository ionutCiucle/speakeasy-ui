import { createTabReducer, createTabInitialState } from '../reducer';
import { CreateTabActionType } from '../enums';

describe('createTabReducer', () => {
  describe('SubmitSuccess', () => {
    it('resets the state to initialState', () => {
      const populated = {
        ...createTabInitialState,
        tabName: 'Friday Drinks',
        venue: 'The Swan',
        members: [{ id: '1', name: 'Alice' }],
        isSubmitting: true,
      };

      const next = createTabReducer(populated, {
        type: CreateTabActionType.SubmitSuccess,
      });

      expect(next).toEqual(createTabInitialState);
    });

    it('clears tabName so createTabInProgress becomes false', () => {
      const state = { ...createTabInitialState, tabName: 'Night Out' };

      const next = createTabReducer(state, {
        type: CreateTabActionType.SubmitSuccess,
      });

      expect(next.tabName).toBe('');
    });
  });

  describe('SubmitFailure', () => {
    it('only clears isSubmitting, preserving all other fields', () => {
      const state = {
        ...createTabInitialState,
        tabName: 'Friday Drinks',
        isSubmitting: true,
      };

      const next = createTabReducer(state, {
        type: CreateTabActionType.SubmitFailure,
      });

      expect(next.isSubmitting).toBe(false);
      expect(next.tabName).toBe('Friday Drinks');
    });
  });
});

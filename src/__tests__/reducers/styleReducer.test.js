import styleReducer from '../../reducers/styleReducer';
describe('styleReducer', () => {
  test('Should return default state if no action type is recognized', () => {
    expect(styleReducer({}, { type: null })).toEqual({})
  });


  let action;
  const style = 5;

  test('Should return new style when setstyle is sent', () => {
    action = {
      type: 'SET_STYLE',
      style: style
    };
    expect(styleReducer({}, action)).toEqual(
      5
    );
  });
});
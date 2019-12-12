import svgStringReducer from '../../reducers/svgStringReducer';

describe('svgStringReducer', () => {
  test('Should return default state if no action type is recognized', () => {
    expect(svgStringReducer({}, { type: null })).toEqual({})
  });
  let action;
  const svgString = 'test string';

  test('Should return new svg string when setSvgString action is dispatched', () => {
    action = {
      type: 'SET_SVGSTRING',
      svgString: svgString
    };
    expect(svgStringReducer({}, action)).toEqual(
        'test string'
    );
  });
});
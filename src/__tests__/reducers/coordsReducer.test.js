import coordsReducer from '../../reducers/coordsReducer';

describe('coordsReducer', () => {
  test('Should return default state if no action type is recognized', () => {
    expect(coordsReducer({}, { type: null })).toEqual({})
  });


  let action;
  const coords = [0, 0];

  test('Should return new coords when setcoords is sent', () => {
    action = {
      type: 'SET_COORDINATES',
      coords: coords
    };
    expect(coordsReducer({}, action)).toEqual(
      [0, 0]
    );
  });
});
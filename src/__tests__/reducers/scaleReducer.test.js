import scaleReducer from '../../reducers/scaleReducer';
describe('scaleReducer', () => {
  test('Should return default state if no action type is recognized', () => {
    expect(scaleReducer({}, { type: null })).toEqual({})
  });


  let action;
  const scale = 5;

  test('Should return new scale when setscale is sent', () => {
    action = {
      type: 'SET_SCALE',
      scale: scale
    };
    expect(scaleReducer({}, action)).toEqual(
      5
    );
  });
});
import imageReducer from '../../reducers/imageReducer';

describe('imageReducer', () => {
    test('Should return default state if no action type is recognized', () => {
      expect(imageReducer({}, { type: null })).toEqual({})
    });
  
  
    let action;
    const image = 'lalalala';
  
    test('Should return new base64 image when SET_IMAGE action is dispatched', () => {
      action = {
        type: 'SET_IMAGE',
        image: image
      };
      expect(imageReducer({}, action)).toEqual(
        'lalalala'
      );
    });
  });
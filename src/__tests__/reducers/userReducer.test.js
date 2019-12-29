import userReducer from '../../reducers/userReducer';

describe('userReducer', () => {
    test('Should return default state if no action type is recognized', () => {
        expect(userReducer({}, { type: null })).toEqual({})
    });
    let action;
    const user = 'test string';

    test('Should return new svg string when setSvgString action is dispatched', () => {
        action = {
            type: 'SET_USER',
            user: user
        };
        expect(userReducer({}, action)).toEqual(
            'test string'
        );
    });
});
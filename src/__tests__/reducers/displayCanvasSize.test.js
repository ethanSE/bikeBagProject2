import displayCanvasSizeReducer from '../../reducers/displayCanvasSizeReducer';

describe('displayCanvasSizeReducer', () => {
    test('Should return default state if no action type is recognized', () => {
        expect(displayCanvasSizeReducer({}, { type: null })).toEqual({})
    });


    let action;
    const dimensions = [15, 20];

    test('Should return new dimensions when setDisplayCanvasSize is sent', () => {
        action = {
            type: 'SET_DISPLAY_CANVAS_SIZE',
            dimensions: dimensions
        };
        expect(displayCanvasSizeReducer({}, action)).toEqual(
            [15, 20]
        );
    });
});
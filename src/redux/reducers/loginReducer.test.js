import loginReducers from './loginReducer'

describe('testing login reducers', () => {
    test('the initial state should be what I expect',() => {
        let action = {}
        let returnedState = loginReducers(undefined, action);
        console.log(returnedState);
        
        //assert that it is what I want

        expect(returnedState).toEqual({isLoading: false, message: ''});
    })

})
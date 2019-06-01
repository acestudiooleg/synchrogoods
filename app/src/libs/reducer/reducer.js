import R from 'ramda';

export default R.uncurryN(4, (initialState, rules) => R.cond(R.pipe(
  // transform our own format reducer rules into R.cond rules
  // from:
  // [
  //     ["ACTION_TYPE", ({valueFromAction}, state) => ({
  //         newStateValue: valueFromAction
  //     })]
  // ]
  // to:
  // [
  //     [
  //         (state, action) => action.type === "ACTION_TYPE",
  //         (state = initialState, {valueFromAction}) => ({
  //             ...state,
  //             newStateValue: valueFromAction
  //         })
  //     ]
  // ]
  R.map(R.pipe(
    // make a check function from an action type constant
    R.over(R.lensIndex(0), actionType => (_, action) =>
      actionType === action.type
    ),
    // wrap rule's function to take action as an argument
    // and update state with it's result
    R.over(R.lensIndex(1), f => (state = initialState, action) => ({
      ...state,
      ...f(R.omit(['type'], action), state)
    }))
  )),
  // add a default rule
  R.append([R.T, (state = initialState) => state])
)(rules)));

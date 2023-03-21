import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { decreaseCounter } from '../../services/counter/decreaseCounter';
import { increaseCounter } from '../../services/counter/increaseCounter';
import { counterSelectors } from '../../store/counter';
import { SystemState } from '../../store/storeTypes';

const Home = () => {
  const dispatch =
    useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();
  const counterState = useSelector(counterSelectors.getCounterstate);
  return (
    <div className="App">
      <Button onClick={() => dispatch(increaseCounter())} variant="primary">
        +
      </Button>
      <h1>{counterState.number}</h1>
      <Button onClick={() => dispatch(decreaseCounter())} variant="primary">
        -
      </Button>
    </div>
  );
};

export default Home;

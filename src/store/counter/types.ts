import { DECREASE_COUNTER, INCREASE_COUNTER } from "./actionTypes";

interface IncreaseCounter {
  type: typeof INCREASE_COUNTER;
}

export interface DecreaseCounter {
  type: typeof DECREASE_COUNTER;
}

export type CounterActionTypes = IncreaseCounter | DecreaseCounter;

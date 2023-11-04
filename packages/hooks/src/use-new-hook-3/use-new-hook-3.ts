import { useState } from "react";

export function useNewHook3() {
  const [state, setState] = useState(0);
  const increase = () => setState(state + 1);
  const decrease = () => setState(state - 1);
  return { state, increase, decrease };
}

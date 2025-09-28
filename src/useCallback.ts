import {useCallback as originalUseCallback, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useCallback<T extends Function, D extends DependencyList>(factory: T, deps: D, comparison: Strategy|Comparator<D> = "deep"): T {
    const changedDeps = useStableValue(deps, comparison);

    return originalUseCallback(factory, changedDeps);
}

export function useCallbackDeep<T extends Function>(factory: T, deps: DependencyList): T {
    return useCallback(factory, deps, "deep");
}
export function useCallbackShallow<T extends Function>(factory: T, deps: DependencyList): T {
    return useCallback(factory, deps, "shallow");
}
export function useCallbackIdentity<T extends Function>(factory: T, deps: DependencyList): T {
    return useCallback(factory, deps, "identity");
}

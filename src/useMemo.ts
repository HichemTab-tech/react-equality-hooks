import {useMemo as originalUseMemo, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useMemo<T, D extends DependencyList>(factory: () => T, deps: D, comparison: Strategy|Comparator<D> = "deep"): T {
    const changedDeps = useStableValue(deps, comparison);

    return originalUseMemo(factory, changedDeps);
}

export function useMemoDeep<T>(factory: () => T, deps: DependencyList): T {
    return useMemo(factory, deps, "deep");
}
export function useMemoShallow<T>(factory: () => T, deps: DependencyList): T {
    return useMemo(factory, deps, "shallow");
}
export function useMemoIdentity<T>(factory: () => T, deps: DependencyList): T {
    return useMemo(factory, deps, "identity");
}

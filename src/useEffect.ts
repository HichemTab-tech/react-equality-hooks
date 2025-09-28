import {useEffect as originalUseEffect, type EffectCallback, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useEffect<D extends DependencyList>(effect: EffectCallback, deps?: D, comparison: Strategy|Comparator<D> = "deep") {
    const changedDeps = useStableValue(deps as D, comparison);

    return originalUseEffect(effect, changedDeps);
}

export function useEffectDeep(effect: EffectCallback, deps?: DependencyList) {
    return useEffect(effect, deps, "deep");
}
export function useEffectShallow(effect: EffectCallback, deps?: DependencyList) {
    return useEffect(effect, deps, "shallow");
}
export function useEffectIdentity(effect: EffectCallback, deps?: DependencyList) {
    return useEffect(effect, deps, "identity");
}

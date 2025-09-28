import {useLayoutEffect as originalUseLayoutEffect, type EffectCallback, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useLayoutEffect<D extends DependencyList | undefined>(effect: EffectCallback, deps?: DependencyList, comparison: Strategy|Comparator<D> = "deep") {
    const changedDeps = useStableValue(deps as D, comparison);

    return originalUseLayoutEffect(effect, changedDeps);
}

export function useLayoutEffectDeep(effect: EffectCallback, deps?: DependencyList) {
    return useLayoutEffect(effect, deps, "deep");
}
export function useLayoutEffectShallow(effect: EffectCallback, deps?: DependencyList) {
    return useLayoutEffect(effect, deps, "shallow");
}
export function useLayoutEffectIdentity(effect: EffectCallback, deps?: DependencyList) {
    return useLayoutEffect(effect, deps, "identity");
}

import {useLayoutEffect as originalUseLayoutEffect, type EffectCallback, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useLayoutEffect(effect: EffectCallback, deps?: DependencyList, comparison: Strategy|Comparator = "deep") {
    const changedDeps = useStableValue(deps, comparison);

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

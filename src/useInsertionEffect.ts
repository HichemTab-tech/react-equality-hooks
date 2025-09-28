import {useInsertionEffect as originalUseInsertionEffect, type EffectCallback, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useInsertionEffect(effect: EffectCallback, deps?: DependencyList, comparison: Strategy|Comparator = "deep") {
    const changedDeps = useStableValue(deps, comparison);

    return originalUseInsertionEffect(effect, changedDeps);
}

export function useInsertionEffectDeep(effect: EffectCallback, deps?: DependencyList) {
    return useInsertionEffect(effect, deps, "deep");
}
export function useInsertionEffectShallow(effect: EffectCallback, deps?: DependencyList) {
    return useInsertionEffect(effect, deps, "shallow");
}
export function useInsertionEffectIdentity(effect: EffectCallback, deps?: DependencyList) {
    return useInsertionEffect(effect, deps, "identity");
}

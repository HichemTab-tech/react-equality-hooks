import {useInsertionEffect as originalUseInsertionEffect, type EffectCallback, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useInsertionEffect<D extends DependencyList | undefined>(effect: EffectCallback, deps?: D, comparison: Strategy|Comparator<D> = "deep") {
    const changedDeps = useStableValue(deps as D, comparison);

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

import {useImperativeHandle as originalUseImperativeHandle, type Ref, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useImperativeHandle<T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList, comparison: Strategy|Comparator = "deep") {
    const changedDeps = useStableValue(deps, comparison);

    return originalUseImperativeHandle(ref, init, changedDeps);
}

export function useImperativeHandleDeep<T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList) {
    return useImperativeHandle(ref, init, deps, "deep");
}
export function useImperativeHandleShallow<T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList) {
    return useImperativeHandle(ref, init, deps, "shallow");
}
export function useImperativeHandleIdentity<T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList) {
    return useImperativeHandle(ref, init, deps, "identity");
}

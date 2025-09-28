import {useImperativeHandle as originalUseImperativeHandle, type Ref, type DependencyList} from "react";
import useStableValue, {type Comparator, type Strategy} from "./hooks/useStableValue";

export function useImperativeHandle<T, R extends T, D extends DependencyList | undefined>(ref: Ref<T> | undefined, createHandle: () => R, deps?: D, comparison: Strategy|Comparator<D> = "deep") {
    const changedDeps = useStableValue(deps as D, comparison);

    return originalUseImperativeHandle(ref, createHandle, changedDeps);
}

export function useImperativeHandleDeep<T, R extends T>(ref: Ref<T>|undefined, createHandle: () => R, deps?: DependencyList) {
    return useImperativeHandle(ref, createHandle, deps, "deep");
}
export function useImperativeHandleShallow<T, R extends T>(ref: Ref<T>|undefined, createHandle: () => R, deps?: DependencyList) {
    return useImperativeHandle(ref, createHandle, deps, "shallow");
}
export function useImperativeHandleIdentity<T, R extends T>(ref: Ref<T>|undefined, createHandle: () => R, deps?: DependencyList) {
    return useImperativeHandle(ref, createHandle, deps, "identity");
}

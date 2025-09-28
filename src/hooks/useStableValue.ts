import {useMemo, useRef, type DependencyList} from "react";
import isEqual from "react-fast-compare";

export type Strategy = 'identity' | 'shallow' | 'deep';
export type Comparator = (
    prevDeps: DependencyList,
    nextDeps: DependencyList
) => boolean;

const useStableValue = <D extends DependencyList|undefined>(deps: D, comparison: Strategy|Comparator) => {
    const cachedDeps = useRef(deps);

    const isEqualFn = useMemo<Comparator>(() => {

        switch (comparison) {
            case "identity":
                return (prevDeps, nextDeps) => prevDeps.length === nextDeps.length && prevDeps.every((v, i) => Object.is(v, nextDeps[i]));
            case "deep":
                return (prevDeps, nextDeps) => prevDeps.length === nextDeps.length && prevDeps.every((v, i) => isEqual(v, nextDeps[i]));
            case "shallow":
                return (prevDeps, nextDeps) => prevDeps.length === nextDeps.length && prevDeps.every((v, i) => {
                    if (Object.is(v, nextDeps[i])) return true;
                    if (!v || !nextDeps[i] || typeof v !== 'object' || typeof nextDeps[i] !== 'object') return false;
                    const vKeys = Object.keys(v);
                    const nextKeys = Object.keys(nextDeps[i] as object);
                    return vKeys.length === nextKeys.length && vKeys.every(key => Object.is((v as any)[key], (nextDeps[i] as any)[key]));
                });
            default:
                return comparison;
        }
    }, [comparison]);

    if (!deps) return deps;

    if (!isEqualFn(cachedDeps.current!, deps)) {
        cachedDeps.current = deps;
    }

    return cachedDeps.current;
};

export default useStableValue;

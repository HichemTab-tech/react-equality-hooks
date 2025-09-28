import {useMemo, useRef, type DependencyList} from "react";
import isEqual from "react-fast-compare";

export type Strategy = 'identity' | 'shallow' | 'deep';
export type Comparator<D extends DependencyList | undefined> = (
    prevDeps: D,
    nextDeps: D
) => boolean;

const useStableValue = <D extends DependencyList | undefined>(deps: D, comparison: Strategy | Comparator<D>) => {
    const cachedDeps = useRef(deps);

    const isEqualFn = useMemo<Comparator<NonNullable<D>>>(() => {

        switch (comparison) {
            case "identity":
                return (prevDeps, nextDeps) => prevDeps.length === nextDeps.length && prevDeps.every((v, i) => Object.is(v, nextDeps[i]));
            case "deep":
                return (prevDeps, nextDeps) => prevDeps.length === nextDeps.length && prevDeps.every((v, i) => isEqual(v, nextDeps[i]));
            case "shallow":
                return (prevDeps, nextDeps) => {
                    if (Object.is(prevDeps, nextDeps)) return true;
                    if (
                        typeof prevDeps !== 'object' || prevDeps === null ||
                        typeof nextDeps !== 'object' || nextDeps === null
                    ) {
                        return false;
                    }
                    const keysA = Object.keys(prevDeps);
                    const keysB = Object.keys(nextDeps);
                    if (keysA.length !== keysB.length) return false;
                    for (let key of keysA) {
                        if (!Object.prototype.hasOwnProperty.call(nextDeps, key) ||
                            !Object.is((prevDeps as any)[key], (nextDeps as any)[key])) {
                            return false;
                        }
                    }
                    return true;
                };
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

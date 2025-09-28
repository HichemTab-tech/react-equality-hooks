import {renderHook} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import {useCallback, useCallbackDeep, useCallbackIdentity, useCallbackShallow} from "../src";

describe('useCallback', () => {
    it('should return the same function with deep comparison', () => {
        const {result, rerender} = renderHook(
            ({value}) => useCallback(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).toBe(firstResult);
    });

    it('should return a new function with deep comparison when the value changes', () => {
        const {result, rerender} = renderHook(
            ({value}) => useCallback(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 2}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return a new function with shallow comparison when a property changes', () => {
        const {result, rerender} = renderHook(
            ({value}) => useCallback(() => ({...value}), [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 2}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return a new function with shallow comparison when properties are the same', () => {
        const {result, rerender} = renderHook(
            ({value}) => useCallback(() => ({...value}), [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return a new function with identity comparison', () => {
        const {result, rerender} = renderHook(
            ({value}) => useCallback(() => ({...value}), [value], 'identity'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should work with useCallbackDeep', () => {
        const {result, rerender} = renderHook(
            ({value}) => useCallbackDeep(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).toBe(firstResult);
    });

    it('should work with useCallbackShallow', () => {
        const {result, rerender} = renderHook(
            ({value}) => useCallbackShallow(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should work with useCallbackIdentity', () => {
        const {result, rerender} = renderHook(
            ({value}) => useCallbackIdentity(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });
});

import {renderHook} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import {useMemo, useMemoDeep, useMemoIdentity, useMemoShallow} from "../src";

describe('useMemo', () => {
    it('should return the same value with deep comparison', () => {
        const {result, rerender} = renderHook(
            ({value}) => useMemo(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).toBe(firstResult);
    });

    it('should return a new value with deep comparison when the value changes', () => {
        const {result, rerender} = renderHook(
            ({value}) => useMemo(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 2}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return a new value with shallow comparison when a property changes', () => {
        const {result, rerender} = renderHook(
            ({value}) => useMemo(() => ({...value}), [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 2}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return the same value with shallow comparison when properties are the same', () => {
        const {result, rerender} = renderHook(
            ({value}) => useMemo(() => ({...value}), [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return a new value with identity comparison', () => {
        const {result, rerender} = renderHook(
            ({value}) => useMemo(() => ({...value}), [value], 'identity'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should work with useMemoDeep', () => {
        const {result, rerender} = renderHook(
            ({value}) => useMemoDeep(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).toBe(firstResult);
    });

    it('should work with useMemoShallow', () => {
        const {result, rerender} = renderHook(
            ({value}) => useMemoShallow(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should work with useMemoIdentity', () => {
        const {result, rerender} = renderHook(
            ({value}) => useMemoIdentity(() => ({...value}), [value]),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });
});

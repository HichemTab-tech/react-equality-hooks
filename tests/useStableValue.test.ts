import {renderHook} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import {useStableValue} from "../src";

describe('useStableValue', () => {
    it('should return the same value with deep comparison', () => {
        const {result, rerender} = renderHook(
            ({value}) => useStableValue([value], 'deep'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).toBe(firstResult);
    });

    it('should return a new value with deep comparison when the value changes', () => {
        const {result, rerender} = renderHook(
            ({value}) => useStableValue([value], 'deep'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 2}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return a new value with shallow comparison when a property changes', () => {
        const {result, rerender} = renderHook(
            ({value}) => useStableValue([value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 2}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return a new value with shallow comparison when properties are the same', () => {
        const {result, rerender} = renderHook(
            ({value}) => useStableValue([value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });

    it('should return a new value with identity comparison', () => {
        const {result, rerender} = renderHook(
            ({value}) => useStableValue([value], 'identity'),
            {initialProps: {value: {a: 1}}}
        );
        const firstResult = result.current;
        rerender({value: {a: 1}});
        expect(result.current).not.toBe(firstResult);
    });
});

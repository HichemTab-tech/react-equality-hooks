import {renderHook} from "@testing-library/react";
import {
    useLayoutEffect,
    useLayoutEffectDeep,
    useLayoutEffectIdentity,
    useLayoutEffectShallow
} from "../src";
import {describe, it, expect, vi} from "vitest";

describe('useLayoutEffect', () => {
    it('should run effect only once with deep comparison', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useLayoutEffect(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should run effect twice with deep comparison when the value changes', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useLayoutEffect(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 2}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with shallow comparison when a property changes', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useLayoutEffect(effect, [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 2}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with shallow comparison when properties are the same', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useLayoutEffect(effect, [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with identity comparison', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useLayoutEffect(effect, [value], 'identity'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should work with useLayoutEffectDeep', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useLayoutEffectDeep(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should work with useLayoutEffectShallow', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useLayoutEffectShallow(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should work with useLayoutEffectIdentity', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useLayoutEffectIdentity(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });
});

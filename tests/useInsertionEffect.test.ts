import {renderHook} from "@testing-library/react";
import {
    useInsertionEffect,
    useInsertionEffectDeep,
    useInsertionEffectIdentity,
    useInsertionEffectShallow
} from "../src";
import {describe, it, expect, vi} from "vitest";

describe('useInsertionEffect', () => {
    it('should run effect only once with deep comparison', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useInsertionEffect(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should run effect twice with deep comparison when the value changes', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useInsertionEffect(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 2}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with shallow comparison when a property changes', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useInsertionEffect(effect, [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 2}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with shallow comparison when properties are the same', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useInsertionEffect(effect, [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with identity comparison', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useInsertionEffect(effect, [value], 'identity'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should work with useInsertionEffectDeep', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useInsertionEffectDeep(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should work with useInsertionEffectShallow', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useInsertionEffectShallow(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should work with useInsertionEffectIdentity', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useInsertionEffectIdentity(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });
});

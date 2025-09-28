import {renderHook} from "@testing-library/react";
import {useEffect, useEffectDeep, useEffectIdentity, useEffectShallow} from "../src";
import {describe, it, expect, vi} from "vitest";

describe('useEffect', () => {
    it('should run effect only once with deep comparison', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useEffect(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should run effect twice with deep comparison when the value changes', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useEffect(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 2}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with shallow comparison when a property changes', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useEffect(effect, [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 2}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with shallow comparison when properties are the same', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useEffect(effect, [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with identity comparison', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useEffect(effect, [value], 'identity'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should work with useEffectDeep', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useEffectDeep(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should work with useEffectShallow', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useEffectShallow(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should work with useEffectIdentity', () => {
        const effect = vi.fn();
        const {rerender} = renderHook(
            ({value}) => useEffectIdentity(effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });
});

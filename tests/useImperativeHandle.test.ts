import {renderHook} from "@testing-library/react";
import {
    useImperativeHandle,
    useImperativeHandleDeep,
    useImperativeHandleIdentity,
    useImperativeHandleShallow
} from "../src";
import {describe, it, expect, vi} from "vitest";
import {createRef} from "react";

describe('useImperativeHandle', () => {
    it('should run effect only once with deep comparison', () => {
        const effect = vi.fn();
        const ref = createRef();
        const {rerender} = renderHook(
            ({value}) => useImperativeHandle(ref, effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should run effect twice with deep comparison when the value changes', () => {
        const effect = vi.fn();
        const ref = createRef();
        const {rerender} = renderHook(
            ({value}) => useImperativeHandle(ref, effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 2}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with shallow comparison when a property changes', () => {
        const effect = vi.fn();
        const ref = createRef();
        const {rerender} = renderHook(
            ({value}) => useImperativeHandle(ref, effect, [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 2}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with shallow comparison when properties are the same', () => {
        const effect = vi.fn();
        const ref = createRef();
        const {rerender} = renderHook(
            ({value}) => useImperativeHandle(ref, effect, [value], 'shallow'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should run effect twice with identity comparison', () => {
        const effect = vi.fn();
        const ref = createRef();
        const {rerender} = renderHook(
            ({value}) => useImperativeHandle(ref, effect, [value], 'identity'),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should work with useImperativeHandleDeep', () => {
        const effect = vi.fn();
        const ref = createRef();
        const {rerender} = renderHook(
            ({value}) => useImperativeHandleDeep(ref, effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(1);
    });

    it('should work with useImperativeHandleShallow', () => {
        const effect = vi.fn();
        const ref = createRef();
        const {rerender} = renderHook(
            ({value}) => useImperativeHandleShallow(ref, effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('should work with useImperativeHandleIdentity', () => {
        const effect = vi.fn();
        const ref = createRef();
        const {rerender} = renderHook(
            ({value}) => useImperativeHandleIdentity(ref, effect, [value]),
            {initialProps: {value: {a: 1}}}
        );
        rerender({value: {a: 1}});
        expect(effect).toHaveBeenCalledTimes(2);
    });
});

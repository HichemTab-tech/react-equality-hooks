# react-equality-hooks

*Drop-in React hooks with pluggable dependency equality.*
Choose how deps are compared: **identity** (`Object.is`), **shallow**,
**deep** (default), or **custom**, for `useMemo`, `useCallback`, `useEffect`, and friends.

---

## Getting Started

Install with your preferred package manager:

```sh
npm install react-equality-hooks
```

or, if using pnpm:

```sh
pnpm add react-equality-hooks
```

---

## ☕ 60-Second TL;DR

Minimal example you can paste into a component:

```tsx
import { useMemo, useCallback } from 'react-equality-hooks';

function heavy(user: { name: string; age: number }) {
  // pretend this is expensive
  return `${user.name} (${user.age})`;
}

export default function Demo() {
  const user = { name: 'Alice', age: 30 }; // recreated each render

  // Deep (structural) compare is the default → won't recompute unless user "value" changes
  const label = useMemo(() => heavy(user), [user]);

  // Pick a strategy explicitly
  const labelShallow = useMemo(() => heavy(user), [user], 'shallow');

  // You can always use the old behavior of standar useMemo
  const labelIdentity = useMemo(() => heavy(user), [user], 'identity');

  // Or provide a custom comparator for deps
  const handler = useCallback(
    () => console.log('submit for', user.name),
    [user],
    (prev, next) => prev[0].name === next[0].name // only react to name changes
  );

  return (
    <div>
      <div>{label}</div>
      <div>{labelShallow}</div>
      <button onClick={handler}>Submit</button>
    </div>
  );
}
```

---

## Usage

A more detailed example across hooks:

```tsx
import {
  useMemo,
  useCallback,
  useEffect,
  // optional parity hooks:
  useLayoutEffect,
  useInsertionEffect,
  useImperativeHandle,
} from 'react-equality-hooks';

// 1) Default: deep compare (structural)
const data = useMemo(() => build(userProfile), [userProfile]);

// 2) Shallow: top-level only for objects/arrays
const onChange = useCallback(() => save(form), [form], 'shallow');

// 3) Identity: same as React’s default (Object.is per dep)
useEffect(() => {
  const sub = api.subscribe(params);
  return () => sub.unsubscribe();
}, [params], 'identity');

// 4) Custom: compare deps arrays however you like
useLayoutEffect(() => {
  doLayout(layout);
}, [layout], (prev, next) => prev[0].version === next[0].version);
```

> Tip: If you need both the React built-ins and these, you can alias:
> `import { useMemo as useMemoBy } from 'react-equality-hooks'`.

---

## API Reference

### Comparison strategies

* **`'identity'`** – per-dependency check via `Object.is(a, b)` (React’s semantics).
* **`'shallow'`** – compare only the **first level** of objects/arrays; nested values by identity.
* **`'deep'`** – structural/value compare (recursive). **Default.**

You can also pass a **custom comparator**:

```ts
type Comparator = (prevDeps: readonly unknown[], nextDeps: readonly unknown[]) => boolean;
// Return true → "equal" (skip); false → "changed" (re-run)
```

### Hooks

#### `useMemo<T>(factory, deps, compare?)`

Compute a memoized value based on deps and the chosen equality.

**Parameters:**

| Parameter | Type                                              | Description                                        |
|-----------|---------------------------------------------------|----------------------------------------------------|
| `factory` | `() => T`                                         | Function that produces the value.                  |
| `deps`    | `readonly unknown[]`                              | Dependency array.                                  |
| `compare` | `'identity' \| 'shallow' \| 'deep' \| Comparator` | Strategy or custom comparator. (Default: `'deep'`) |

**Returns:** `T`

#### `useCallback(fn, deps, compare?)`

Returns a memoized callback; same parameters/compare semantics as `useMemo`.

#### `useEffect(effect, deps, compare?)`

Runs the effect when deps “change” under the chosen equality.
**Note:** If your comparator deems deps “equal,” the effect **won’t re-run and its cleanup won’t run**. Choose comparators carefully for subscriptions/timers.

#### Parity hooks

All accept the same `compare?` third parameter:

* `useLayoutEffect(effect, deps, compare?)`
* `useInsertionEffect(effect, deps, compare?)`
* `useImperativeHandle(ref, createHandle, deps, compare?)`

#### Ergonomic shortcuts (optional exports)

```
useMemoDeep / useMemoShallow / useMemoIdentity
useCallbackDeep / useCallbackShallow / useCallbackIdentity
useEffectDeep / useEffectShallow / useEffectIdentity
useLayoutEffectDeep / useLayoutEffectShallow / useLayoutEffectIdentity
useInsertionEffectDeep / useInsertionEffectShallow / useInsertionEffectIdentity
useImperativeHandleDeep / useImperativeHandleShallow / useImperativeHandleIdentity
```

#### Helpers

```ts
import { useStableValue } from 'react-equality-hooks';

// Stabilize a single value by chosen equality (useful for prop objects)
const stableOptions = useStableValue(options, 'shallow'); // or custom (prev, next) => boolean
```

---

## 🤝 Contributions

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please follow existing coding styles and clearly state your changes in the pull request.

## ❓ FAQ

**Why not always use deep?**
Deep compares are convenient but can be CPU-heavy.
Prefer `identity`/`shallow` on hot paths or stabilize inputs upstream.

**Does this replace `React.useMemo`?**
No, but it complements it.
You can stabilize props with these hooks or export useMemo helpers
(`useMemoDeep`/`useMemoShallow`) if you choose.

## Issues

If you encounter any issue, please open an issue [here](https://github.com/HichemTab-tech/react-equality-hooks/issues).

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

© 2025 [Hichem Taboukouyout](mailto:hichem.taboukouyout@hichemtab-tech.me)

---

*If this package helped you, a star would be awesome! ⭐️*

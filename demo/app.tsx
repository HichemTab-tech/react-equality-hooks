import * as React from 'react';
import {useMemo} from 'react-equality-hooks';
import {useState, useMemo as originalUseMemo} from "react";

const App = () => {

    const [dep, setDep] = useState({
        v: 0,
    });

    const [trigger, setTrigger] = useState(0);

    const value = useMemo(() => Math.random(), [dep]);

    const secondValue = originalUseMemo(() => Math.random(), [dep]);

    const handle = (change: boolean) => {
        if (change) {
            setDep({
                ...dep,
                v: dep.v+1
            })
        }
        else{
            setDep({...dep})
        }
    }

    return (
        <div>
            <h1>Smart useMemo</h1>
            <h3>Deps: {JSON.stringify(dep)}</h3>
            <h4>Value using react-equality-hooks's useMemo: {value}</h4>
            <h4>Value using react useMemo: {secondValue}</h4>
            <br/>
            <h4>Normal value: {Math.random()}</h4>
            <br/>
            <button onClick={() => handle(true)}>Change object</button>
            <button onClick={() => handle(false)}>refresh object</button>
            <button onClick={() => setTrigger(trigger+1)}>trigger re-render</button>
        </div>
    )
};

export default App;

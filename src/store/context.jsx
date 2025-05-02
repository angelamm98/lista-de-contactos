import React, { useState, useEffect } from "react";
import getState from "./store.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(() => {
            const initialState = getState({
                getStore: () => initialState.store,
                getActions: () => initialState.actions,
                setStore: updatedStore => {
                    setState(prevState => ({
                        store: Object.assign({}, prevState.store, updatedStore),
                        actions: { ...prevState.actions }
                    }));
                }
            });
            return initialState;
        });

        useEffect(() => {
            state.actions.getContacts();
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;

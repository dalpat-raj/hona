'use client';
import { AppStore, makeStore } from '@/lib/store/store';
import React, { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>(undefined);


    if (!storeRef.current) {
        storeRef.current = makeStore();
        
        // Add initial state
        // storeRef.current!.dispatch(addToCart(initialState));
 

    }
    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;



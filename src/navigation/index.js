import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes.js';


const Providers = () => {
    return(
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default Providers;
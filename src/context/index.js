// BUTI DINERS, INC. All right Reserved ©

import React from "react";

const MerchantInterfaceContext = React.createContext({});
const AuthInterfaceContext = React.createContext({});

export const MerchantInterfaceProvider = MerchantInterfaceContext.Provider;
export const MerchantInterfaceConsumer = MerchantInterfaceContext.Consumer;

export const AuthInterfaceProvider = AuthInterfaceContext.Provider;
export const AuthInterfaceConsumer = AuthInterfaceContext.Consumer;

export const withContext = Consumer => Component => props => (
  <Consumer>{context => <Component {...props} context={context} />}</Consumer>
);

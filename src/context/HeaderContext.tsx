import React, { createContext, useContext } from 'react';

const HeaderContext = createContext<any>({});

interface Props {
  children: any;
  screenName: string;

}

export const HeaderProvider: React.FC<Props> = ({ children, screenName }: any) => {
  return (
    <HeaderContext.Provider
      value={{
        screenName
      }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);

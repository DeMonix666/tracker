import React, { createContext, useContext, useState } from 'react';

const DeviceContext = createContext<any>({});

interface Props {
  children: any;
}

export const DeviceProvider: React.FC<Props> = ({ children, }: any) => {
  const [deviceId, setDeviceId] = useState('');
  return (
    <DeviceContext.Provider
      value={{
        deviceId,
        setDeviceId
      }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => useContext(DeviceContext);

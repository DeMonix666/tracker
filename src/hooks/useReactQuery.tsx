import React from 'react';
import { useQuery, useQueryClient, } from '@tanstack/react-query';
import { database } from 'core';
const PERMISSION_DENIED_STATUS_CODE = 'PERMISSION_DENIED';

export const useReactQuery = (
  path: string
) => {
  const queryClient = useQueryClient();

  const handleAuthenticationErrors = (error: any) => {
    if (error.code === PERMISSION_DENIED_STATUS_CODE) {

    }
  }

  React.useEffect(() => {
    const ref = database.ref(path);
    const cb = async (snapshot: any) => {
      const val = snapshot.val();
      await queryClient.setQueryData([path], val);
    };

    ref.on('value', cb, handleAuthenticationErrors);

    return () => {
      ref.off('value', cb);
    };
  }, [queryClient, path]);

  return useQuery({ queryKey: [path] }, queryClient);
};

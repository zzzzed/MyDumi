import useReactive from '@/hooks/useReactive';
import { Button } from 'antd';
import React from 'react';

const useReactiveHook = () => {
  const state = useReactive({
    name: 'a',
    num: 0,
  });

  return (
    <>
      {state.name}
      {state.num}
      <Button onClick={() => state.num++}>change num</Button>
    </>
  );
};
export default useReactiveHook;

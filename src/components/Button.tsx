import { FC, ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';

interface IButtonProps extends ButtonProps {
  children: ReactNode;
}
const ButtonC: FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      sx={{
        backgroundColor: '#3B21DA',
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonC;

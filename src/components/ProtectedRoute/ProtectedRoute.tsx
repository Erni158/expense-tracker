import React, { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Content from '../Content/Content';
import Menu from '../Menu/Menu';

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (isAuthenticated) {
    return (
      <>
        <Menu />
        <Content>
          {children}
        </Content>
      </>
    )
  } else {
    return <Navigate to="/" replace state={{ from: location }} />
  }
}

export default ProtectedRoute;
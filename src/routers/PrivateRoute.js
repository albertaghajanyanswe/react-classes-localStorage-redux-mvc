import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { MSpinner } from '../components/spinner/MSpinner';
import MLoggedInPage from './MLoggedInPage';
import { getStorageData } from '../utils/helper';


const PrivateRoute = ({component: Component, ...rest}) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const user = getStorageData('user') || {};
      setLoading(Object.keys(user).length ? false : true);

      if(!Object.keys(user).length) {
        navigateToLogin();
      } else {
        setLoading(false);
      }
    }, 700)
  }, []);

  const navigateToLogin = () => {
    history.push({
        pathname: '/login',
        state: {url: ''}
    });
  };

  return (
    <MSpinner size='large' isLoading={loading}>
      <Route
        {...rest}
        render={props => {
            return <MLoggedInPage content={<Component {...props} />} />;
        }}
      />
    </MSpinner>
  );
};

export {PrivateRoute};
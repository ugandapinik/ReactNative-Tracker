import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from "../context/AutContext";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  // not returning anything since just waiting to check the token
  // will transition to signin or signup very quickly
  return null;
};

export default ResolveAuthScreen;

import * as React from 'react';

import Login from './login.components';
import image from './../Login/collaborate.jpg';

function LoginCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Login />
      {/* Login Picture */}
      <img src={image} alt="Trees" height="600" width={820} style={{ marginTop: 70, marginRight: 10 }} />
    </div>
  );
}

export default LoginCard;
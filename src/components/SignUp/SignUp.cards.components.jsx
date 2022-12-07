import * as React from 'react';

import SignUp from './SignUp.components.jsx';
import image from './../SignUp/interview.jpg';
function SignUpCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* SignUp Picture */}
      <img src={image} alt="Trees" height="500" style={{ marginTop: 150, marginLeft: 40 }} />

      <SignUp />
    </div>

  );
}

export default SignUpCard;
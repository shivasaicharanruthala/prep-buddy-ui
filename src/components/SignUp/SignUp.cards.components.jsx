import * as React from 'react';

// imports components to be rendered.
import SignUp from './SignUp.components.jsx';
import image from './../SignUp/interview.jpg';


function SignUpCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row',marginTop:50 }}>
      {/* SignUp Picture */}
      <img src={image} alt="Trees" height="500" style={{ marginTop: 150, marginLeft: 40 }} />

      <SignUp />
    </div>

  );
}

export default SignUpCard;
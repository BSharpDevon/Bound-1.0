// src/components/bind.jsx

import { useState } from "react";

//need to create a function/callback which invites a friend to bind - 'inviteFriend'

function BindPage() {
  return (
    <div>
      <h1>Welcome to the Bind Page</h1>
      <h2>READY TO BIND?</h2>
      <p>Choose a friend or group to create a bind with - get a personalised book recommendation based on your shared literary tastes</p>
     
    <button onClick={inviteFriend }>Invite</button>   
    </div>
  );
}

export default BindPage;


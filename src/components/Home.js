import React from 'react';
import {Link} from 'react-router-dom';
function Home() {
  return (
    <div>
      <Link to="/reactjs">
          <h1>React JS Course</h1>
      </Link>
      <Link to="/nodejs">
          <h1>Node JS Course</h1>
      </Link>
    </div>
  );
}

export default Home;
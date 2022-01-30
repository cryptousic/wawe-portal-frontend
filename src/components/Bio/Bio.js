import React from 'react';
import './Bio.css';

const Bio = () => (
  <div className="Bio">
      <div className="header">
          👋 Hey there!
      </div>

      <div className="bio">
          My name is Natan and I want to make money by building awesome stuff.
          Connect your Ethereum wallet and wave at me,
          and you just might earn some Ether!
      </div>
  </div>
);

Bio.propTypes = {};

Bio.defaultProps = {};

export default Bio;

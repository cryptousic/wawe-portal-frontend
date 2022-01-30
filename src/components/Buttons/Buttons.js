import React from 'react';
import './Buttons.css'

const Buttons = (props) => (
  <div className="Buttons">

      <div className="waveButtonDiv">
          <button className="custom-btn btn-9" onClick={props.wave}>
              <span>Wave at Me</span>
          </button>
      </div>

      {!props.currentAccount && (
          <div className="waveButtonDiv">
              <button className="custom-btn btn-9" onClick={props.connectWallet}>
                  <span>Wallet </span>
              </button>
          </div>
      )}

      <div className="buttons">
          <button onClick={props.handleClickWavers}
                  className="custom-btn btn-11">Wavers
              <div className="dot"/>
          </button>

          <button onClick={props.handleClickWinners}
                  className="custom-btn btn-11">Winners
              <div className="dot"/>
          </button>
      </div>
  </div>
);

Buttons.propTypes = {};

Buttons.defaultProps = {};

export default Buttons;

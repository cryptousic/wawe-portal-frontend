import React from 'react';
import {Alert, CircularProgress} from "@mui/material";

const Notifications = (props) => (
  <div className="Notifications">
      { props.mining ? <div style={{display: 'flex', justifyContent: 'center'}}>
          <CircularProgress color="secondary"/>
      </div> : null }

      { props.win ? <Alert variant="filled" severity="success">
          You WON!
      </Alert> : null }
  </div>
);

export default Notifications;

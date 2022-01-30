import React from 'react';
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import avatar from "../../assets/avatar.png";

    const Winners = (props) => {
        const listWinners = props.allWinners.map((winner, index) =>
              <List key={index} sx={{ width: '100%', color: 'white'}}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="avatar" src={avatar} />
                  </ListItemAvatar>
                  <ListItemText
                      primary={winner.address}
                      secondary={
                        <React.Fragment>
                          <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="white"
                          >
                          </Typography>
                          <div className="timestamp">
                            {winner.timestamp.toString()}
                          </div>
                        </React.Fragment>
                      }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            );
        return (
          <div>{listWinners}</div>
        );
        }

Winners.propTypes = {};

Winners.defaultProps = {};

export default Winners;

import React from 'react';
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import avatar from "../../assets/avatar.png";

const Wavers = (props) => {
    const listWaves = props.allWaves.map((waver, index) =>
        <List key={index} sx={{
            width: '100%', color: 'white'}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="avatar" src={avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={waver.address}
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
                                {waver.timestamp.toString()}
                            </div>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
    return (
        <div>{listWaves}</div>
    );
}

Wavers.propTypes = {};

Wavers.defaultProps = {};

export default Wavers;

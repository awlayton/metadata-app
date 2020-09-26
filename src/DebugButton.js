import React from 'react';
import { connect } from '@cerebral/react';
import { state, sequences } from 'cerebral/tags';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function DebugButton(props) {
    let button = (
        <Button
            aria-owns="debug-menu"
            aria-haspopup="true"
            onClick={() => props.setState({ open: true })}
            color="inherit"
        >
            {process.env.REACT_APP_GIT}
        </Button>
    );
    return (
        <div>
            {button}
            <Menu
                id="debug-menu"
                //anchorEl={button}
                open={props.open || false}
                onClose={() => props.setState({ open: false })}
            >
                <MenuItem onClick={() => props.submitResults()}>
                    Force Submit
                </MenuItem>
                <MenuItem onClick={() => props.disconnect()}>
                    Disconnect Google
                </MenuItem>
            </Menu>
        </div>
    );
}

export default connect(
    {
        open: state`debugMenuOpen`,
        setState: sequences`setDebugMenuOpen`,
        submitResults: sequences`submitResults`,
        disconnect: sequences`disconnectGoogle`,
    },
    DebugButton
);

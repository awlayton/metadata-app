import React from 'react';
import { connect } from '@cerebral/react';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import QrReader from 'react-qr-reader';

function QRDialog(props) {
    return (
        <Dialog fullScreen open={props.open}>
            <AppBar>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={props.onClose}
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Scan QR code
                    </Typography>
                </Toolbar>
            </AppBar>
            <QrReader
                style={{ width: '100%' }}
                onScan={(data) => {
                    if (!data) {
                        return;
                    }

                    props.onData(data);
                    props.onClose();
                }}
            />
        </Dialog>
    );
}

export default connect({}, QRDialog);

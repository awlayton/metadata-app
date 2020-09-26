import React from 'react';
import { connect, ConnectedProps } from '@cerebral/react';
import { state, sequences } from 'cerebral';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';

import { styles } from './styles';
import { withStyles } from '@material-ui/styles';

export const ConfirmSubmitDialog = withStyles(styles)(
    (props: typeof deps & ConnectedProps) => {
        const handleClose = props.confirm;
        return (
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Successfully submitted metadata
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {'Your metadata have been uploaded '}
                        <Link target="_blank" href={props.resultsUrl}>
                            here.
                        </Link>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
);

const deps = {
    open: state`confirmSubmitOpen`,
    resultsUrl: state`resultsUrl`,
    confirm: sequences`confirmSubmit`,
};
export default connect(deps, ConfirmSubmitDialog);

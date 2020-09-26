import React from 'react';
import classNames from 'classnames';
import { connect } from '@cerebral/react';
import { state, sequences } from 'cerebral/tags';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

function ErrorDisplay({ classes = {}, error, close }) {
    return (
        <Snackbar
            open={!!error}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <SnackbarContent
                className={classes.error}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.root}>
                        <ErrorIcon
                            className={classNames(
                                classes.iconVariant,
                                classes.icon
                            )}
                        />
                        {error && error.name + ': ' + error.message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={close}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}

export default connect(
    {
        error: state`error`,
        close: sequences`clearError`,
    },
    ErrorDisplay
);

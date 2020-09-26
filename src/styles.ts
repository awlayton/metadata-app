// MUI styles for all the things
// TODO: Is this a good way to do this stuff??

import { createStyles, Theme } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';

const drawerWidth = 240;

export type Styles = WithStyles<typeof styles>;

export const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            textAlign: 'center',
            flexGrow: 1,
            alignSelf: 'center',
            maxWidth: 800,
        },
        appBar: {
            top: 0,
            bottom: 'auto',
            marginLeft: drawerWidth,
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        toolbar: theme.mixins.toolbar,
        bottomBar: {
            bottom: 0,
            top: 'auto',
            marginLeft: drawerWidth,
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {
            width: drawerWidth,
        },
        icon: {
            fontSize: 20,
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: theme.spacing(1),
        },
        error: {
            backgroundColor: theme.palette.error.dark,
        },
        ssPreview: {
            width: '95%',
        },
    });

export default styles;

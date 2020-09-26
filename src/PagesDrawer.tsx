import React from 'react';
import { connect, ConnectedProps } from '@cerebral/react';
import { state, sequences } from 'cerebral';

import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/styles';

import { styles, Styles } from './styles';

interface Props extends ExternalProps, Deps, ConnectedProps, Styles {}
export const PagesDrawer = withStyles(styles)((props: Props) => {
    const { classes } = props;

    const contents = (
        <div>
            <Toolbar>
                <Typography
                    variant="h6"
                    color="primary"
                    align="center"
                    className={classes.grow}
                    noWrap
                >
                    Pages
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {
                    // @ts-ignore
                    props.pages.map(({ name, title, error }, pageNum) => (
                        <ListItem
                            key={name}
                            button
                            selected={pageNum === props.pageNum}
                            className={error ? 'page-err' : 'page-complete'}
                            onClick={() => props.setSurveyPage({ pageNum })}
                        >
                            <ListItemIcon>
                                {error ? (
                                    <WarningIcon color="error" />
                                ) : (
                                    <DoneIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                primary={title}
                                secondary={error ? 'Incomplete' : 'Complete'}
                                secondaryTypographyProps={{
                                    color: error ? 'error' : 'textSecondary',
                                }}
                            />
                        </ListItem>
                    ))
                }
                {props.readme && (
                    <>
                        <Divider />
                        <ListItem
                            component={Link}
                            target="_blank"
                            href={props.readme}
                        >
                            <ListItemText primary="Readme" />
                        </ListItem>
                    </>
                )}
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer}>
            <Hidden {...props.permScreens} implementation="js">
                <SwipeableDrawer
                    open={props.navigationOpen}
                    onOpen={() => props.showNavigation()}
                    onClose={() => props.hideNavigation()}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {contents}
                </SwipeableDrawer>
            </Hidden>
            <Hidden {...props.tempScreens} implementation="js">
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {contents}
                </Drawer>
            </Hidden>
        </nav>
    );
});

type Deps = typeof deps;
const deps = {
    navigationOpen: state`navigationOpen`,
    showNavigation: sequences`showNavigation`,
    hideNavigation: sequences`hideNavigation`,
    setSurveyPage: sequences`setSurveyPage`,
    pages: state`pages`,
    pageNum: state`pageNum`,
};
type ExternalProps = {
    readme: string;
    permScreens: any;
    tempScreens: any;
};
export default connect<ExternalProps, Deps>(deps, PagesDrawer);

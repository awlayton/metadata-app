import React, {Component} from 'react';
import {connect} from '@cerebral/react';
import {state, sequences} from 'cerebral/tags';

import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MobileStepper from '@material-ui/core/MobileStepper';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SendIcon from '@material-ui/icons/Send';
import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import queryString from 'query-string';

import './App.css';
import QRDialog from './QRDialog';
import Questions from './Questions';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import gold from '@material-ui/core/colors/amber';

// Parse query string
const params = queryString.parse(window.location.search);

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
    palette: {
        type: params.theme || 'dark',
        primary: gold,
    },
});

const styles = {
    root: {
        flexGrow: 1,
    },
    appBar: {
        top: 0,
        bottom: 'auto',
    },
    bottomBar: {
        bottom: 0,
        top: 'auto',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    //deferredPrompt = e;
    if (params.install !== undefined) {
        e.prompt(); // TODO: Don't show prompt immediately?
    }
});

class App extends Component {

    componentWillMount() {
        this.props.init();
    }

    render() {
        let props = this.props;
        const {classes} = props;
        return (
            <MuiThemeProvider theme={theme}>
            <React.Fragment>
            <CssBaseline />
            <div className='App'>
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color='inherit'
                            onClick={() => props.showNavigation()}
                            aria-label='Menu'>
                            <MenuIcon
                            />
                        </IconButton>
                        <Button
                            color='inherit'
                            disabled={props.pages.some(page => page.error)}
                            onClick={() => props.submit()}>
                            Submit
                            <SendIcon />
                        </Button>
                        <div className={classes.grow} />
                        <div className="g-signin2" data-theme='dark' />
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={props.navigationOpen}
                    onOpen={()=>props.showNavigation()}
                    onClose={()=>props.hideNavigation()}
                >
                    <List>
                        {props.pages.map(({name, title, error}, pageNum) => (
                            <ListItem
                                key={name}
                                button
                                selected={pageNum === props.pageNum}
                                className={error ? 'page-err' : 'page-complete'}
                                onClick={()=>props.setSurveyPage({pageNum})}>
                                <ListItemIcon>
                                    {error ? <WarningIcon /> : <DoneIcon />}
                                </ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <QRDialog
                    open={props.droneQRScannerActive}
                    onClose={props.hideDroneQRScanner}
                />
                <QRDialog
                    open={props.sensorQRScannerActive}
                    onClose={props.hideSensorQRScanner}
                />
                <Paper square>
                    <Questions
                        isSinglePage={params.singlePage !== undefined}
                        completedHtml={
                            (<div> woo done!</div>)
                        }
                        onComplete={({data}) => props.submitResults()}
                    />
                </Paper>
                <AppBar position='fixed' className={classes.bottomBar}>
                    <MobileStepper
                        steps={props.pages.length}
                        position='static'
                        activeStep={props.pageNum}
                        className={classes.mobileStepper}
                        nextButton={
                            <Button
                                color='primary'
                                disabled={props.pageNum === props.pages.length - 1}
                                onClick={() => props.goNextPage()}>
                                Next
                                <NavigateNextIcon />
                            </Button>
                        }
                        backButton={
                            <Button
                                color='primary'
                                disabled={props.pageNum === 0}
                                onClick={() => props.goPreviousPage()}>
                                <NavigateBeforeIcon />
                                Previous
                            </Button>
                        }
                    />
                </AppBar>
            </div>
            </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default connect({
    navigationOpen: state`navigationOpen`,
    showNavigation: sequences`showNavigation`,
    hideNavigation: sequences`hideNavigation`,
    setSurveyPage: sequences`setSurveyPage`,
    pages: state`pages`,
    pageNum: state`pageNum`,
    goNextPage: sequences`goNextPage`,
    goPreviousPage: sequences`goPreviousPage`,
    submit: sequences`completeSurvey`,
    questions: state`questions`,
    droneQRScannerActive: state`droneQRScannerActive`,
    sensorQRScannerActive: state`sensorQRScannerActive`,
    showDroneQRScanner: sequences`showDroneQRScanner`,
    showSensorQRScanner: sequences`showSensorQRScanner`,
    hideDroneQRScanner: sequences`hideDroneQRScanner`,
    hideSensorQRScanner: sequences`hideSensorQRScanner`,
    init: sequences`init`,
    login: sequences`login`,
    logout: sequences`logout`,
    google: state`google`,
    createSheet: sequences`createSheet`,
    submitResults: sequences`submitResults`,
}, withStyles(styles)(App));

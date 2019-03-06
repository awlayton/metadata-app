import React, {Component} from 'react';
import {connect} from '@cerebral/react';
import {state, sequences} from 'cerebral/tags';

import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MobileStepper from '@material-ui/core/MobileStepper';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SendIcon from '@material-ui/icons/Send';

import queryString from 'query-string';

import './App.css';
import QRDialog from './QRDialog';
import Questions from './Questions';
import PagesDrawer from './PagesDrawer';
import ConfirmSubmitDialog from './ConfirmSubmitDialog';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import gold from '@material-ui/core/colors/amber';

// Parse query string
const params = queryString.parse(window.location.search);

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: params.theme || 'dark',
        primary: gold,
    },
});

const drawerWidth = 240;
const styles = (theme) => ({
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
});

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
        let {props} = this;
        const {classes} = props;

        return (
            <MuiThemeProvider theme={theme}>
            <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <PagesDrawer
                    classes={classes}
                    // Screens sizes to show permanent drawer
                    permScreens={{smUp: true}}
                    // Screens sizes to show temporary drawer
                    tempScreens={{xsDown: true}}
                />
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar>
                        {params.debug !== undefined &&
                            // Super secret debug button
                            <Button
                                color='inherit'
                                onClick={() => props.submitResults()}>
                                {process.env.REACT_APP_GIT}
                            </Button>
                        }
                        <IconButton
                            className={classes.menuButton}
                            color='inherit'
                            onClick={() => props.showNavigation()}
                            aria-label='Pages'>
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
                        <div className='g-signin2' data-theme='dark' />
                    </Toolbar>
                </AppBar>
                <QRDialog
                    open={props.droneQRScannerActive}
                    onClose={props.hideDroneQRScanner}
                />
                <QRDialog
                    open={props.sensorQRScannerActive}
                    onClose={props.hideSensorQRScanner}
                />
                <ConfirmSubmitDialog />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Questions
                        isSinglePage={params.singlePage !== undefined}
                        completedHtml={
                            (<div> woo done!</div>)
                        }
                        onComplete={({data}) => props.submitResults()}
                    />
                    <div className={classes.toolbar} />
                </main>
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

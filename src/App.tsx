import React, { Component } from 'react';
import { connect, ConnectedProps } from '@cerebral/react';
import { state, sequences } from 'cerebral';

import { withStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import CircularProgress from '@material-ui/core/CircularProgress';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import gold from '@material-ui/core/colors/amber';

// Has to be last mui import
import Box from '@material-ui/core/Box';

import DocumentMeta from 'react-document-meta';
// @ts-ignore
import HttpsRedirect from 'react-https-redirect';
import queryString from 'query-string';

import './App.css';
//import QRDialog from './QRDialog';
import Questions from './Questions';
import PagesDrawer from './PagesDrawer';
import ConfirmSubmitDialog from './ConfirmSubmitDialog';
import DebugButton from './DebugButton';
import ErrorDisplay from './ErrorDisplay';

import { styles, Styles } from './styles';
import scope from './googleScopes';
import describe from './describe';

import { State } from './main/types';

const version = describe.semverString;
const meta = {
    title: `${process.env.REACT_APP_NAME} ${version}`,
    meta: {
        'ui-version': version,
    },
};

// Parse query string
const params = queryString.parse(window.location.search);

// All the following keys are optional.
// We try our best to provide a great default value.
export const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            // Default to dark theme
            type: params.theme === 'light' ? 'light' : 'dark',
            primary: gold,
        },
    })
);

const README_URL =
    'https://docs.google.com/document/d/' +
    '1wkG-bEYFyqxV-SmYoQmgLTJ1m1pvPvXlnTTnjh60ZFY/edit?usp=sharing';

/**
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    //deferredPrompt = e;
    if (params.install !== undefined) {
        e.prompt(); // TODO: Don't show prompt immediately?
    }
});
*/

interface AppProps extends Deps, ConnectedProps, Styles {}

const App = withStyles(styles)(
    class App extends Component<AppProps> {
        componentWillMount() {
            this.props.init();
        }

        render() {
            const { props } = this;
            const { classes } = props;

            return (
                <div className={classes.root}>
                    <PagesDrawer
                        // Screens sizes to show permanent drawer
                        permScreens={{ smUp: true }}
                        // Screens sizes to show temporary drawer
                        tempScreens={{ xsDown: true }}
                        readme={README_URL}
                    />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            {params.debug !== undefined && (
                                // Super secret debug button
                                <DebugButton />
                            )}
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                onClick={() => props.showNavigation()}
                                aria-label="Pages"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Button
                                color="inherit"
                                disabled={!props.canSubmit}
                                onClick={() => props.submit()}
                            >
                                Submit
                                <SendIcon />
                            </Button>
                            <div className={classes.grow} />
                            <div
                                className="g-signin2"
                                data-theme="dark"
                                data-scope={scope}
                            />
                        </Toolbar>
                    </AppBar>
                    {/*}
                    <QRDialog
                        open={props.droneQRScannerActive}
                        onClose={props.hideDroneQRScanner}
                    />
                    <QRDialog
                        open={props.sensorQRScannerActive}
                        onClose={props.hideSensorQRScanner}
                    />
                    {*/}
                    <ConfirmSubmitDialog />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {props.initialized &&
                            (props.loggedin ? (
                                <Questions
                                    isSinglePage={
                                        params.singlePage !== undefined
                                    }
                                    completedHtml={
                                        <div>
                                            <Typography color="inherit">
                                                Submitting Metadata
                                            </Typography>
                                            <Box p={4}>
                                                <CircularProgress size={100} />
                                            </Box>
                                        </div>
                                    }
                                    onComplete={() => props.submitResults()}
                                />
                            ) : (
                                <Box p={4}>
                                    <Typography color="inherit">
                                        Please sign in to continue.
                                    </Typography>
                                </Box>
                            ))}
                        <div className={classes.toolbar} />
                    </main>
                    <ErrorDisplay />
                    <AppBar position="fixed" className={classes.bottomBar}>
                        <MobileStepper
                            steps={props.pages.length}
                            position="static"
                            activeStep={props.pageNum}
                            // @ts-ignore
                            className={classes.mobileStepper}
                            nextButton={
                                props.pageNum === props.pages.length - 1 ? (
                                    <Button
                                        color="primary"
                                        disabled={!props.canSubmit}
                                        onClick={() => props.submit()}
                                    >
                                        Sumbit
                                        <SendIcon />
                                    </Button>
                                ) : (
                                    <Button
                                        color="primary"
                                        disabled={!props.canNext}
                                        onClick={() => props.goNextPage()}
                                    >
                                        Next
                                        <NavigateNextIcon />
                                    </Button>
                                )
                            }
                            backButton={
                                <Button
                                    color="primary"
                                    disabled={!props.canPrev}
                                    onClick={() => props.goPreviousPage()}
                                >
                                    <NavigateBeforeIcon />
                                    Previous
                                </Button>
                            }
                        />
                    </AppBar>
                </div>
            );
        }
    }
);

const deps = {
    initialized: state`initialized` as State['initialized'],
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
    loggedin: state`loggedin`,
    login: sequences`login`,
    logout: sequences`logout`,
    google: state`google`,
    createSheet: sequences`createSheet`,
    submitResults: sequences`submitResults`,
    canSubmit: state`canSubmit`,
    canNext: state`canNext`,
    canPrev: state`canPrev`,
};
type Deps = typeof deps;

export const AppContainer: React.FunctionComponent<
    typeof deps & ConnectedProps
> = (props) => {
    return (
        <HttpsRedirect>
            <ThemeProvider theme={theme}>
                <DocumentMeta {...meta} />
                <React.Fragment>
                    <CssBaseline />
                    <App {...props} />
                </React.Fragment>
            </ThemeProvider>
        </HttpsRedirect>
    );
};

export default connect(deps, AppContainer);

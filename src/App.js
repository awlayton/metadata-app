import React, {Component} from 'react';
import {connect} from '@cerebral/react';
import {state, sequences} from 'cerebral/tags';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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

import './App.css';
import QRDialog from './QRDialog';
import Questions from './Questions';

class App extends Component {

    componentWillMount() {
        this.props.init();
    }

    render() {
        let props = this.props;
        return (
            <React.Fragment>
            <CssBaseline />
            <div className='App'>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            onClick={() => props.showNavigation()}
                            aria-label='Menu'>
                            <MenuIcon
                            />
                        </IconButton>
                        <Button
                            disabled={props.pageNum === 0}
                            onClick={() => props.goPreviousPage()}>
                            <NavigateBeforeIcon />
                            Previous
                        </Button>
                        <Button
                            disabled={props.pageNum === props.pages.length - 1}
                            onClick={() => props.goNextPage()}>
                            Next
                            <NavigateNextIcon />
                        </Button>
                        <Button
                            disabled={props.pages.some(page => page.error)}
                            onClick={() => props.submit()}>
                            Submit
                            <SendIcon />
                        </Button>
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
                <Questions
                    isSinglePage={false}
                    completedHtml={
                        (<div> woo done!</div>)
                    }
                    onComplete={({data}) => console.log(JSON.stringify(data))}
                />
            </div>
            </React.Fragment>
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
}, App);

import React, {Component} from 'react';
import {connect} from '@cerebral/react';
import {state, sequences} from 'cerebral/tags';

import CssBaseline from '@material-ui/core/CssBaseline';
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
                <Drawer
                  open={props.navigationOpen}
                  onOpen={()=>props.showNavigation()}
                  onClose={()=>props.hideNavigation()}
                >
                    <List>
                        {props.questions.pages.map((page, pageNum) => (
							<ListItem
								button
								onClick={()=>props.setSurveyPage({pageNum})}>
                                <ListItemText primary={page.title} />
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
                    onValueChanged={({data}) => props.setSurveyData({data})}
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
    questions: state`questions`,
    droneQRScannerActive: state`droneQRScannerActive`,
    sensorQRScannerActive: state`sensorQRScannerActive`,
    showDroneQRScanner: sequences`showDroneQRScanner`,
    showSensorQRScanner: sequences`showSensorQRScanner`,
    hideDroneQRScanner: sequences`hideDroneQRScanner`,
    hideSensorQRScanner: sequences`hideSensorQRScanner`,
    setSurveyData: sequences`setSurveyData`,
    init: sequences`init`,
}, App);

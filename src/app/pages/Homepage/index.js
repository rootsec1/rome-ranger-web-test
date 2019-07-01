import React from 'react';
import Lottie from 'react-lottie';
import {
    List,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from '@material-ui/core';
import {
    withStyles
} from '@material-ui/styles';
import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import {
    purple
} from '@material-ui/core/colors';
//LOCAL
import config from '../../config';
import castelAnimation from '../../assets/lottie/castel.json';
import FamilyMember from '../../components/FamilyMember';
import MainAppBar from '../../components/MainAppBar';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: purple[400],
            main: purple[500],
            dark: purple[500]
        },
        text: {
            primary: config.COLOR_TEXT_DARK
        }
    },
    typography: {
        fontFamily: ['Segoe UI', 'Roboto']
    }
});

class Homepage extends React.Component {
    state = {
        snackbarOpen: true,
        modalOpen: false,
        family: [
            {
                name: 'Abhishek',
                alive: false,
                dob: new Date('1998-10-02'),
                occupation: 'Developer',
                relationship: 'Brother'
            },
            {
                name: 'Darshan',
                alive: true,
                dob: new Date('1997-03-04'),
                occupation: 'Developer',
                relationship: 'Brother'
            },
            {
                name: 'Aditya',
                alive: false,
                dob: new Date('1998-10-13'),
                occupation: 'Developer',
                relationship: 'Brother'
            },
            {
                name: 'Boopathi',
                alive: true,
                dob: new Date('1997-10-17'),
                occupation: 'Builder',
                relationship: 'Brother'
            }
        ],
        dataToDisplay: []
    };

    constructor(props) {
        super(props);
        this.filterFamilyArray = this.filterFamilyArray.bind(this);
        this.modifyMemberInfo = this.modifyMemberInfo.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        this.setState({ dataToDisplay: this.state.family });
    }

    modifyMemberInfo(newPerson, index) {
        let tempMemberArray = this.state.family;
        tempMemberArray[index] = newPerson;
        this.setState({ family: tempMemberArray });
    }

    filterFamilyArray(filterSequence) {
        let filteredArray = [];
        if(filterSequence===null || filterSequence===undefined || filterSequence.toString().trim().length===0) {
            filteredArray = this.state.family;
            this.setState({ dataToDisplay: filteredArray });
        }
        else {
            filterSequence = filterSequence.toLowerCase().trim();
            filteredArray = this.state.dataToDisplay.filter((person) => 
                person.name.toLowerCase().includes(filterSequence) ||
                person.occupation.toLowerCase().includes(filterSequence) ||
                person.relationship.toLowerCase().includes(filterSequence)
            );
            this.setState({ dataToDisplay: filteredArray });
        }
    }

    showModal() {
        this.setState({ modalOpen: true });
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <MainAppBar filter={this.filterFamilyArray} onAddButtonPress={this.showModal}/>
                    <Container>
                        {
                            this.state.family.length===0?
                                <Lottie
                                    options={ {loop: true, autoplay: true, animationData: castelAnimation} }
                                    height={400}
                                    width={400}
                                />
                            :
                            <div>
                                <List>
                                    {
                                        this.state.dataToDisplay.map((person,index) =>
                                            <FamilyMember key={index} person={person} modifyMemberInfo={this.modifyMemberInfo} />
                                        )
                                    }
                                </List>
                            </div>
                        }
                        <Dialog open={this.state.modalOpen}>
                            <DialogTitle>Create new Ancient Family Member!</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Name"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={()=>this.setState({ modalOpen: false })} color="secondary">
                                    Cancel
                                </Button>
                                <Button color="primary">
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </div>
            </MuiThemeProvider>
        );
    }
};

const styles = {
    root: {
        backgroundColor: '#F5F5F5',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default withStyles(styles)(Homepage);
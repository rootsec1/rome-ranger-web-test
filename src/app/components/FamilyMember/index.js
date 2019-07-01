import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Button,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@material-ui/core';
import {
    Edit,
    Delete 
} from '@material-ui/icons';
import {
    withStyles
} from '@material-ui/core/styles';
//LOCAL
import config from '../../config';

const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];

class FamilyMember extends React.Component {
    render() {
        const { classes, key, person } = this.props;
        let dob = person.dob;
        dob = dob.getDate()+' '+months[dob.getMonth()]+' '+dob.getFullYear();
        const aliveOrDead = person.alive?<span style={{color: 'green'}}>Alive</span>:<span style={{color: 'red'}}>Deceased</span>;

        return (
            <div className={classes.content}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<Edit />}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt='Avatar' className={classes.avatar} src={require('../../assets/images/avatar.png')} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={ 
                                    <Typography variant='h5' color="textPrimary">
                                        <b>{ person.name }</b> ({person.relationship})
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant='subtitle1' color="textSecondary">
                                        { <span className={classes.dob}>{ dob }</span> } - { aliveOrDead }
                                        <br/>
                                        { person.occupation }
                                    </Typography>
                                }
                            />
                        </ListItem>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FormControl>
                            <FormLabel className={classes.formLabel} component="legend">Edit Member Info</FormLabel>
                            <TextField
                                className={ classes.textField }
                                label="Name"
                                value={ person.name }
                                onChange={event => {
                                    person.name = event.target.value;
                                    this.props.modifyMemberInfo(person, key);
                                }}
                            />
                            <br />
                            <TextField
                                className={ classes.textField }
                                label="Occupation"
                                value={ person.occupation }
                                onChange={event => {
                                    person.occupation = event.target.value;
                                    this.props.modifyMemberInfo(person, key);
                                }}
                            />
                            <br />
                            <TextField
                                className={ classes.textField }
                                label="Relationship with Head"
                                value={ person.relationship }
                                onChange={(event) => {
                                    person.relationship = event.target.value;
                                    this.props.modifyMemberInfo(person, key);
                                }}
                            />
                            <br />
                            <RadioGroup
                                className={classes.group}
                                name='AliveOrDeceased'
                                value={ person.alive?'Alive':'Deceased' }
                                onChange={(event) => {
                                    person.alive = event.target.value.toString()==='Alive';
                                    this.props.modifyMemberInfo(person, key);
                                }}
                            >
                                    <FormControlLabel
                                        value='Alive'
                                        control={<Radio color="primary" />}
                                        label="Alive"
                                    />
                                    <FormControlLabel
                                        value='Deceased'
                                        control={<Radio color="primary" />}
                                        label="Deceased"
                                    />
                            </RadioGroup>
                            <Button variant="contained" color="secondary" onClick={() => this.props.deleteFunction(key)}>
                                <Delete />
                                Delete
                            </Button>
                        </FormControl>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
};

const styles = {
    avatar: {
        height: 64,
        width: 64,
        marginRight: 16
    },
    content: {
        marginTop: 10
    },
    dob: {
        marginTop: 8,
        color: config.COLOR_PRIMARY
    },
    textField: {
        width: '200%'
    },
    formLabel: {
        marginBottom: 8
    }
};

export default withStyles(styles)(FamilyMember);
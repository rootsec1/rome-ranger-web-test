import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
//LOCAL
import config from '../../config';

const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];

class FamilyMember extends React.PureComponent {
    render() {
        const person = this.props.person;
        let dob = person.dob;
        dob = dob.getDate()+' '+months[dob.getMonth()]+' '+dob.getFullYear();
        const aliveOrDead = person.alive?<span style={{color: 'green'}}>Alive</span>:<span style={{color: 'red'}}>Deceased</span>;

        const {
            avatarStyle,
            contentStyle,
            dobStyle
        } = styles;

        return (
            <div style={contentStyle}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<EditIcon />}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt='Avatar' style={avatarStyle} src={require('../../assets/images/avatar.png')} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={ 
                                    <Typography variant='h5' color="textPrimary">
                                        { person.name } ({person.relationship})
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant='subtitle1' color="textSecondary">
                                        { <span style={dobStyle}>{ dob }</span> } - { aliveOrDead }
                                        <br/>
                                        { person.occupation }
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
};

const styles = {
    avatarStyle: {
        height: 64,
        width: 64,
        marginRight: 16
    },
    contentStyle: {
        marginTop: 10
    },
    dobStyle: {
        marginTop: 8,
        color: config.COLOR_PRIMARY
    }
};

export default FamilyMember;
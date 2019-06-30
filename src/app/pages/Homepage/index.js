import React from 'react';
import Lottie from 'react-lottie';
import {
    List,
    Container,
    Snackbar
} from '@material-ui/core'
//LOCAL
import MainAppBar from '../../components/MainAppBar'
import castelAnimation from '../../assets/lottie/castel.json';
import FamilyMember from '../../components/FamilyMember';

class Homepage extends React.Component {
    state = {
        snackbarOpen: true,
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
                occupation: 'Developer',
                relationship: 'Brother'
            }
        ]
    };

    componentDidMount() {
        setTimeout(() => this.setState({ snackbarOpen: false }), 5000);
    }

    render() {
        return (
            <main>
                <MainAppBar />
                <Container fluid>
                    {
                        this.state.family.length===0?
                            <Lottie
                                options={ {loop: true, autoplay: true, animationData: castelAnimation} }
                                height={400}
                                width={400}
                            />
                        :
                        <div>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.snackbarOpen}
                                message={"Tap on the edit icon to modify the information"}
                            />
                            <List>
                                {
                                    this.state.family.map((person,index) =>
                                        <FamilyMember
                                            key={index}
                                            person={ person }
                                        />)
                                }
                            </List>
                        </div>
                    }
                </Container>
            </main>
        );
    }
};

export default Homepage;
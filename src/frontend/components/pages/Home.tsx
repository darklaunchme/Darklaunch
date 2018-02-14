import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import { Header, Input, InputOnChangeData } from 'semantic-ui-react';

import Navbar from '../Navbar';

import DomainStore from '../../stores/DomainStore';

interface Darklaunch {
    code: string;
    enabled: boolean;
}

interface State {
    darklaunches: Darklaunch[];
    filter: string;
    addingCode: boolean;
}

class Home extends Component<{}, State> {
    state = {
        addingCode: false,
        darklaunches: [],
        filter: ''
    };

    async componentDidMount() {
        const darklaunchResponse = await DomainStore.getDarklaunches();
        this.setState({ darklaunches: darklaunchResponse });
    }

    updateFilter = (e: SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        this.setState({ filter: data.value });
    };

    search = (darklaunch: Darklaunch) => {
        return darklaunch.code.indexOf(this.state.filter) > -1;
    };

    renderCodes = () => {
        return this.state.darklaunches.filter(this.search).map((darklaunch: Darklaunch, i: number) => (
            <div key={i}>
                {darklaunch.code} is {darklaunch.enabled ? 'Enabled' : 'Disabled'}
            </div>
        ));
    };

    render() {
        return (
            <div className="home">
                <Navbar />
                <Input placeholder="Search..." onChange={this.updateFilter} />
                {this.renderCodes()}
            </div>
        );
    }
}

export default Home;

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import ListItem from './ListItem';
import { employeesFetch } from '../actions';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeesFetch();
    }

    componentDidUpdate(prevProps) {
       if (prevProps.employees.length !== this.props.employees.length) {
           this.props.employeesFetch();
       }
    }

    render() { 
        return (
            <FlatList 
                data={this.props.employees}
                renderItem={ ({item}) => <ListItem employee={item} />}
                keyExtractor={item => item.uid}
            />
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });

    return { employees }
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
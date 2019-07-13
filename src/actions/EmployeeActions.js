import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS
} from './types';

const getFirebaseUserReference = (employeeId) => {
    const { currentUser } = firebase.auth();
    if (employeeId) {
        return firebase.database().ref(`/users/${currentUser.uid}/employees/${employeeId}`);
    }
    return firebase.database().ref(`/users/${currentUser.uid}/employees`);
}

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    }
};

export const employeeCreate = ({ name, phone, shift }) => {
    return (dispatch) => {
        getFirebaseUserReference()
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.employeeList({ type: 'reset' });
            });
    };
};

export const employeesFetch = () => {
    return (dispatch) => {
        getFirebaseUserReference()
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
    return (dispatch) => {
        getFirebaseUserReference(uid)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                Actions.employeeList({ type: 'reset' });
            });
    };
};

export const employeeDelete = ({ uid }) => {
    return () => {
        getFirebaseUserReference(uid)
            .remove()
            .then(() => {
                Actions.employeeList({ type: 'reset' });
            }); 
    };
};
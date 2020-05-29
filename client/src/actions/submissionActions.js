import { GET_SUBMISSIONS, ADD_SUBMISSION, DELETE_SUBMISSION, SUBMISSIONS_LOADING } from './types';
import axios from 'axios';

export const getSubmissions = () => dispatch => {
    dispatch(setSubmissionsLoading);
    axios
        .get('/api/submissions')
        .then(res => 
            dispatch({
                type: GET_SUBMISSIONS,
                payload: res.data
            })
        )
};

export const addSubmission = submission => dispatch => {
    axios
        .post('/api/submissions', submission)
        .then(res => 
            dispatch({
                type: ADD_SUBMISSION,
                payload: res.data
            })
        )
};


export const deleteSubmission = id => dispatch => {
    axios.delete(`/api/submissions/${id}`).then(res =>
        dispatch({
            type: DELETE_SUBMISSION,
            payload: id
        })
    )
};


export const setSubmissionsLoading = () => {
    return {
        type: SUBMISSIONS_LOADING
    }
}
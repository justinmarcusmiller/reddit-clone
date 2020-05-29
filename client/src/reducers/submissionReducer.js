import { GET_SUBMISSIONS, ADD_SUBMISSION, DELETE_SUBMISSION, SUBMISSIONS_LOADING } from '../actions/types';

const inititalState = {
    submissions: [],
    loading: false
}

export default function (state = inititalState, action) {
    switch (action.type) {
        case GET_SUBMISSIONS:
            return {
                ...state,
                submissions: action.payload,
                loading: false
            }
        case DELETE_SUBMISSION:
            return {
                ...state,
                submissions: state.submissions.filter(submission => submission._id !== action.payload)
            }
        case ADD_SUBMISSION:
            return {
                ...state,
                submissions: [action.payload, ...state.submissions]
            }
        case SUBMISSIONS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
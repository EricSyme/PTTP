import * as ActionTypes from './ActionTypes';

export const addComment = (recordingId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        recordingId: recordingId,
        rating: rating,
        author: author,
        comment: comment
    }
});
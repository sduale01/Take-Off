import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRequests() {
    try {
        const serverResponse = yield axios.get('api/admin/request');
        yield put({ type: 'SET_REQUESTS', payload: serverResponse.data });
    } catch (error) {
        console.log('Error in axios GET:', error);
    }
}

function* approveRequest(action) {
    try {
        const batchID = action.payload;
        yield axios.put(`api/admin/request/${batchID}`, { requestStatus: 2 });
        yield put({ type: 'FETCH_REQUESTS' });
    } catch (error) {
        console.log('Error in POST:', error);
    }
}

function* denyRequest(action) {
    try {
      const batchID = action.payload;
      yield axios.put(`api/admin/request/${batchID}`, { requestStatus: 3 });
      yield put({ type: 'FETCH_REQUESTS' });
    } catch (error) {
        console.log('Error in DELETE:', error);
    }
}

function* withdrawRequest(action) {
  try {
    const batchID = action.payload;
    yield axios.delete(`api/admin/request/${batchID}`);
    yield put({ type: 'FETCH_REQUESTS' });
  } catch (error) {
    console.log('Error in DELETE:', error);
  }
}

function* requestsSaga() {
    yield takeLatest('FETCH_REQUESTS', fetchRequests);
    yield takeLatest('APPROVE_REQUEST', approveRequest);
    yield takeLatest('DENY_REQUEST', denyRequest);
    yield takeLatest('WITHDRAW_REQUEST', withdrawRequest);
}

export default requestsSaga;

// import api from '../utils/api';
import axios from 'axios'

// Save winner's data
export const saveWinnerData =  (data) => async dispatch => {
	console.log(data);
	const response = await axios.post('/api/game/saveWinnerData', data)
	console.log('response=> ', response.data)
	const { top_winners, total_payout } = response.data

	dispatch({
		type: 'SET_TOP_WINNERS',
		payload: top_winners
	})

	dispatch({
		type: 'SET_TOTAL_PAYOUT',
		payload: total_payout
	})
};

// Get top winners
export const getTopWinners =  () => async dispatch => {
	console.log("action is called")
	const response = await axios.post('/api/game/getTopWinners', {})
	const {top_winners} = response.data
	console.log('topwinners=>', top_winners)
	dispatch({
		type: 'SET_TOP_WINNERS',
		payload: top_winners
	})
};

// Get total payout
export const getTotalPayout =  () => async dispatch => {
	const response = await axios.post('/api/game/getTotalPayout', {})
	const {total_payout} = response.data
	console.log('total_payout=>', response.data )
	dispatch({
		type: 'SET_TOTAL_PAYOUT',
		payload: total_payout
	})
};
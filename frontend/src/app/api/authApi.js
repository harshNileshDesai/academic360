import { API, handleApiError } from '../../utils/api'

export const getLogin = async ({email, password}) => {
    try {
        const response = await API.post('/api/auth/v1/login', {email, password}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { error: null, data: response.data }
    } catch (error) {
        return handleApiError(error);
    }
}
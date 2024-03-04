import { API, handleApiError } from '../../utils/api';


// GET THE TOTAL MARKSHEET STATS
export const getTotalMarksheetStats = async () => {
    try {
        const response = await API.get('/api/marksheet/v2/get-total');
        console.log(response)
        return { error: null, data: response.data }
    } catch (error) {
        return handleApiError(error);
    }
}

// GET THE TOTAL MARKSHEET STATS BY YEAR
export const getMarksheetsStatsByYearWise = async () => {
    try {
        const response = await API.get('/api/marksheet/v1/get-stats-by-year');
        console.log(response)
        return { error: null, data: response.data }
    } catch (error) {
        return handleApiError(error);
    }
}

// GET THE TOTAL MARKSHEET STATS BY Course And SEMESTER
export const getMarksheetsStatsByCourseSemester = async (course, semester) => {
    try {
        const response = await API.get(`/api/marksheet/v1/get-stats-by-course?course=${course}&semester=${semester}`);
        console.log(response)
        return { error: null, data: response.data }
    } catch (error) {
        return handleApiError(error);
    }
}

// GET THE PASSING PERCENTAGE YEAR AND STREAM
export const getPassingPercentageStats = async () => {
    try {
        const response = await API.get('/api/marksheet/v1/get-passing');
        return { error: null, data: response.data }
    } catch (error) {
        return handleApiError(error);
    }
}

// GET THE META MARKSHEET DATA USING SEARCH
export const getMarksheetsDataBySearch = async (search) => {
    try {
        const response = await API.get(`/api/marksheet/v2/get-documents/?search=${search}`);
        return { error: null, data: response.data }
    } catch (error) {
        return handleApiError(error);
    }
}

// GET THE FILTERED MARKSHEET
export const getFilteredMarksheet = async (filteredCriteria) => {
    console.log(filteredCriteria)
    try {
        const response = await API.post(`/api/marksheet/v2/filter`, filteredCriteria);
        return { error: null, data: response.data }
    } catch (error) {
        return handleApiError(error);
    }
}

// DELETE THE MARKSHEET
export const deleteMarksheetById = async (_id, year) => {
    try {
        const response = await API.delete(`/api/marksheet/v2/delete/?year=${year}&_id=${_id}`);
        return { error: null, data: response.data }
    } catch (error) {
        return handleApiError(error);
    }
}
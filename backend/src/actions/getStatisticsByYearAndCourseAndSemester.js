export const getStatisticsByYearAndCourseAndSemester = async (MarksheetModel, year, course, semester) => {
    const streamCounts = await MarksheetModel.aggregate([
        {
            $match: {
                course: course,
                semester
            },
        },
        {
            $group: {
                _id: "$stream",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                stream: "$_id",
                count: 1,
                _id: 0
            }
        }
    ]);

    const obj = {
        year: year,
        totalMarksheets: streamCounts.reduce((total, stream) => total + stream.count, 0)
    };

    streamCounts.forEach(stream => {
        obj[stream.stream.toLowerCase()] = stream.count;
    });

    return obj;
};
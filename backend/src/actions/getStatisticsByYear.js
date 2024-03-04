export const getStatisticsByYear = async (MarksheetModel, year) => {
    const streamCounts = await MarksheetModel.aggregate([
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
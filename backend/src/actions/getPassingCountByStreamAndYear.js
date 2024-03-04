// import initializeMarksheetModel from "../models/marksheet.model.js";

// export const getPassingPercentageByStreamAndYear = async () => {
//     try {
//         const arr = [];
//         const streamArr = ["BA", "BSC", "BCOM", "M.A", "M.COM"];

//         // Iterate over all years
//         for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
//             let MarksheetModel = await initializeMarksheetModel(y);

//             // Initialize object for the current year
//             const yearObj = {
//                 year: y,
//                 totalDocuments: 0,
//             };

//             // Iterate over streams
//             for (let s = 0; s < streamArr.length; s++) {
//                 const stream = streamArr[s];

//                 // Get the total number of marksheets and the passing marksheets based on stream
//                 const streamStats = await MarksheetModel.aggregate([
//                     {
//                         $match: {
//                             stream: stream,
//                             subjects: {
//                                 $not: {
//                                     $elemMatch: {
//                                         status: { $ne: "P" }
//                                     }
//                                 }
//                             }
//                         }
//                     },
//                     {
//                         $group: {
//                             _id: null,
//                             totalDocuments: { $sum: 1 },
//                         }
//                     }
//                 ]);

//                 // Add passing stats for the current stream
//                 yearObj[`${stream.toLowerCase()}Passing`] = streamStats.length > 0 ? streamStats[0].totalDocuments : 0;
//             }

//             // Add the year object to the array
//             arr.push(yearObj);
//         }

//         return arr;
//     } catch (error) {
//         console.error("Error in calculating passing stats by year: -\n", error);
//         throw error;
//     }
// };



import initializeMarksheetModel from "../models/marksheet.model.js";

export const getPassingCountByStreamAndYear = async () => {
    try {
        const arr = [];
        const streamArr = ["BA", "BSC", "BCOM", "BBA", "M.A", "M.COM"];

        // Iterate over all years
        for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
            let MarksheetModel = await initializeMarksheetModel(y);

            // Initialize object for the current year
            const yearObj = {
                year: y,
            };

            // Iterate over streams
            for (let s = 0; s < streamArr.length; s++) {
                const stream = streamArr[s];

                // Get the total number of passing marksheets based on stream
                const streamStats = await MarksheetModel.countDocuments({
                    stream: stream,
                    sgpa: { $gt: 3 },
                    "subjects.status": "P"
                });

                // Sum the total documents for the current stream and add it to the year object
                yearObj[`${stream.toLowerCase()}Passing`] = streamStats;
            }

            // Add the year object to the array
            arr.push(yearObj);
        }

        return arr;
    } catch (error) {
        console.error("Error in calculating passing stats by year: -\n", error);
        throw error;
    }
};

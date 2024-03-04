import { Schema } from "mongoose";
import { DB_MARKSHEET } from "../constants.js";
import { connectToDB } from "../db/db.js";

let connectionInstance;

const subjectSchema = new Schema({
    fullMarks: {
        type: Number,
        required: true,
    },
    year1: {
        type: Number,
        required: true,
    },
    year2: {
        type: Number,
        required: true,
    },
    ngp: {
        type: Number,
    },
    credit: {
        type: Number,
        required: true,
    },
    tgp: {
        type: Number,
        default: 0,
    },
    subjectName: {
        type: String,
        required: true,
    },
    internalMarks: {
        type: Number,
        required: true,
    },
    theoryMarks: {
        type: Number,
        required: true,
    },
    practicalMarks: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    letterGrade: {
        type: String,
        required: true,
    }
})

const initializeMarksheetModel = async (year) => {
    if (!connectionInstance) {
        connectionInstance = await connectToDB(DB_MARKSHEET);
    }
    // console.log("connection done")

    const collectionName = `${year}_marksheet`;
    // console.log(collectionName)


    // Check if the collection already exist
    // console.log(connectionInstance.models[collectionName])
    if (!connectionInstance.models[collectionName]) {
        // Marksheet Structure
        const marksheetSchema = new Schema(
            {
                _id: {
                    type: String,
                    required: true,
                    unique: true,
                },
                name: {
                    type: String,
                    default: '',
                    required: true
                },
                registrationNo: {
                    type: String,
                    default: '',
                    required: true
                },
                rollNo: {
                    type: String,
                    default: '',
                    required: true
                },
                uid: {
                    type: String,
                    default: '',
                },
                stream: {
                    type: String,
                    default: '',
                    required: true
                },
                course: {
                    type: String,
                    default: '',
                    required: true
                },
                semester: {
                    type: Number,
                    default: 0,
                    required: true
                },
                sgpa: {
                    type: Number,
                    default: 0,
                    required: true
                },
                remarks: {
                    type: String,
                    default: '',
                },
                totalMarksObtained: {
                    type: Number,
                    default: 0,
                    required: true
                },
                fullMarksSum: {
                    type: Number,
                    default: 100,
                    required: true
                },
                totalCredit: {
                    type: Number,
                    default: 0,
                    required: true
                },
                marksheetPercentage: {
                    type: Number,
                    default: 0,
                    required: true
                },
                classifications: {
                    type: String,
                    default: '',
                },
                cgpa: {
                    type: Number,
                    default: 0,
                },
                subjects: {
                    type: [subjectSchema],
                }
            },
            { timestamps: true }
        );
        // console.log("collectionName: ", collectionName)
        return connectionInstance.model(collectionName, marksheetSchema);
    }
    else {
        // Collection already exists, return the existing model
        return connectionInstance.model(collectionName);
    }
};

export default initializeMarksheetModel;
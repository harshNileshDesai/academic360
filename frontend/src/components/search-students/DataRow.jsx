import React from 'react'
import { PiCertificate } from 'react-icons/pi';
import { HiMiniNewspaper } from "react-icons/hi2";
import { RiFilePaper2Line } from "react-icons/ri";
import { PiNewspaper } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import FunctionButton from './FunctionButton';

const DataRow = ({ year, yearObj }) => {

    const semesterCount = Array.from({ length: 6 });

    const handleDegreeCertificate = async () => {
        console.log("Fetching degree certificate...");
    }

    const handleRcsiMarksheet = async () => {
        console.log("Fetching rcsi marksheet...");
    }

    const handleMarksheet = async () => {
        console.log("Fetching marksheet...");
    }

    const handleEditMarksheet = async () => {
        console.log(`Fetching db data for ${year}...`);
    }

    const handleRegistrationCertificate = async () => {
        console.log("Fetching registration certificate...");
    }

    return (
        <>
            <tr className=''>
                <td className='py-2 border border-black text-center space-x-2'>{year}</td>
                {
                    semesterCount.map((ele, index) => {

                        let degreeDoc = false;
                        let rcsiDoc = false;
                        let mksDoc = false;
                        let registrationDoc = false;
                        console.log(yearObj.degreeDoc)
                        if (yearObj.degreeDoc !== null) { degreeDoc = true; }
                        if (yearObj.rcsiDocs.find((ele) => ele.semester == index + 1 && ele.year === year)) { rcsiDoc = true; }
                        if (yearObj.marksheetDocs.some((ele) => ele.semester == index + 1)) {
                            console.log("check mksDoc: ", year, yearObj, index + 1);
                            mksDoc = true;
                        }
                        if (yearObj.registrationDocs.some((ele) => ele.semester == index + 1)) { registrationDoc = true; }



                        return (
                            <td className='py-2 border border-black text-center space-x-2'>


                                {/* DEGREE CERTIFICATE */}
                                {degreeDoc && <FunctionButton
                                    buttonText={<PiCertificate />}
                                    bgColor={'bg-red'}
                                    onClick={() => handleDegreeCertificate()}
                                />}
                                {/* RCSI MARKSHEET */}
                                {rcsiDoc && <FunctionButton
                                    buttonText={<RiFilePaper2Line />}
                                    bgColor={'bg-yellow'}
                                    onClick={() => handleRcsiMarksheet()}
                                />}
                                {/* MARKSHEET */}
                                {mksDoc && <FunctionButton
                                    buttonText={<PiNewspaper />}
                                    bgColor={'bg-green'}
                                    onClick={() => handleMarksheet()}
                                />}
                                {/* EDIT MARKSHEET */}
                                {yearObj.dbDataYear.some(ele => ele.year === year && ele.semester === index + 1) && <FunctionButton
                                    buttonText={<FaRegEdit />}
                                    bgColor={'bg-blue'}
                                    onClick={() => handleEditMarksheet()}
                                />}
                                {/* REGISTRATION CERTIFICATES */}
                                {registrationDoc && <FunctionButton
                                    buttonText={<AiOutlineSafetyCertificate />}
                                    bgColor={'bg-purple'}
                                    onClick={() => handleRegistrationCertificate()}
                                />}
                            </td>

                        )

                    })
                }




            </tr>
        </>
    )
}

export default DataRow
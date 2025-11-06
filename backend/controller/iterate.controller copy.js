import axios from "axios";
import dotenv from 'dotenv';
import { asyncHandler } from "../error.middleware.js";

dotenv.config();

const requestData = asyncHandler (async (request, response) =>{
    const result = "Sample";

    response.status(200).send({
        data: result
    });
});

export { requestData }
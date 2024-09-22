import ErrorHandler from "../middleware/error.js";
import { catchasyncerror } from "../middleware/catchasyncerror.js";

export const get = catchasyncerror(async(req,res,next) => {
    res.status(200).json({
        operation_code: 1
    })
})

export const register = catchasyncerror(async(req,res,next) => {
    const {data  , file_b64} = req.body;

    // const user = {

    // }

    if(!data || !Array.isArray(data)){
        return res.status(400).json({
            is_success:false,
            message: "Invalid input format"
        })
    }

    const numbers = data.filter(d => !isNaN(d));
    const alphabets = data.filter(d => isNaN(d));

    const lowercaseAlphabets = alphabets.filter(ch => ch >= 'a' && ch <= 'z');
    const highestLowercase = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

    let file_valid = false, mime_type = null, file_size_kb = 0;
    if (file_b64) {
        try {
            const fileBuffer = Buffer.from(file_b64, 'base64');
            file_valid = true;
            file_size_kb = (fileBuffer.length / 1024).toFixed(2);
            mime_type = "application/octet-stream";  // Default MIME type
        } catch (err) {
            file_valid = false;
        }
    }

    res.status(200).json({
        is_success: true,
        user_id: "alok_garg_05092002",
        email: "ag0034@srmist.edu.in",
        roll_number: "RA2111003030397",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase,
        file_valid,
        file_mime_type: mime_type,
        file_size_kb
    });
})
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const countPdfPages = async (filePath) => {
    try {
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pageCount = pdfDoc.getPageCount();
        return pageCount;
    } catch (error) {
        console.error("Error reading PDF file:", error.message);
        return -1;
    }
};

const userController = {
    upload: async (req, res) => {
        try {
            const uploadedFiles = req.files;
            // if uploadedFiles is null or undefined or not an array, return 400
            if (
                !uploadedFiles ||
                // !Array.isArray(uploadedFiles) ||
                uploadedFiles.length === 0
            ) {
                return res
                    .status(400)
                    .json({ message: "No files were uploaded" });
            }
            // for each item in uploadedFiles, remove all properties except originalname, mimetype, size
            for (const item of uploadedFiles) {
                // if memetype is not application/pdf or name does not end with .pdf, return 400
                if (
                    item.mimetype !== "application/pdf" ||
                    !item.originalname.endsWith(".pdf" || ".PDF")
                ) {
                    return res
                        .status(400)
                        .json({ message: "Only pdf files are allowed" });
                }
                Object.keys(item).forEach((key) => {
                    if (
                        key !== "originalname" &&
                        key !== "size" &&
                        key !== "filename" &&
                        key !== "path"
                    ) {
                        delete item[key];
                    }
                });
                // check if the file saved to its path
                if (!fs.existsSync(item.path)) {
                    return res.status(500).json({
                        message: "Error while saving the file",
                    });
                } else {
                    console.log("File saved to: ", item.path);
                }
                // calculate the pages count for each pdf file
                item.total_pages = await countPdfPages(item.path);
                console.log("item.total_pages: ", item.total_pages);
                fee = 30000;
                // calculate the total price for each pdf file
                item.total_price = item.total_pages * fee;
            }
            console.log("uploadedFiles: ", uploadedFiles);
            res.status(200).json({
                message: "Upload successful",
                uploadedFiles,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    dashboard: async (req, res) => {
        try {
            // Read x-auth-token header, if it doesn't exist, return 401
            const token = req.header("x-auth-token");
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "No token, authorization denied" });
            }
            // first get user data inside the token and print it, without verifying, just read it
            const decoded_raw = jwt.decode(token);
            // if decoded_raw is null or undefined or not a valid json object, return 401
            if (
                !decoded_raw ||
                typeof decoded_raw !== "object" ||
                Object.keys(decoded_raw).length === 0
            ) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            console.log("decoded_raw: ", decoded_raw);
            // look up the user in the database based on the decoded_raw.user.id
            real_user = await User.findById(decoded_raw.id);
            // if the user is not found, return 401
            if (!real_user) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            console.log("real_user: ", real_user);
            // if the user is found, now verify the token with the secret key from user object found in the database
            const decoded = jwt.verify(token, real_user.jwtSecret);
            console.log("decoded: ", decoded);
            // console.log("decoded len: ", Object.keys(decoded).length);
            // console.log("decoded_raw len: ", Object.keys(decoded_raw).length);
            // console.log("type of decoded is: ", typeof decoded, " and type of decoded_raw is: ", typeof decoded_raw);
            // if stringified decoded is equal to decoded_raw, then the token is valid
            if (JSON.stringify(decoded) === JSON.stringify(decoded_raw)) {
                res.status(200).json({ message: "Token is valid" });
                console.log("Token is valid");
            } else {
                res.status(401).json({ message: "Token is not valid" });
                console.log("Token is not valid");
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
    getUsers: async (req, res) => {
        try {
            // x-auth-token header is required to get here
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    },
};

module.exports = userController;

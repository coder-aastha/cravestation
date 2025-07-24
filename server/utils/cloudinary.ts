import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    api_key:"968675826393594",
    api_secret:"I7BzbObHCZOnIB9S1kT1dCBMbeI",
    cloud_name:"dh23idqwi"
});

export default cloudinary;
import axios from "axios";
import { getMaxByField, tryCatch } from "../utils/utils.js";

export const getAddress = tryCatch(async (req, res, next) => {
    const { latitude, longitude } = req.query
    const address = (await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${process.env.OPENCAGE_API_KEY}`)).data
    const formattedAddress = Object.keys(address).length === 0 ? "" : getMaxByField(address.results, "confidence")?.formatted
    res.status(200).json(formattedAddress);
})

const validDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


const validateRequiredFields  = (fields) => {

    const missingFields  = Object.entries(fields).filter(([key, value]) => !value);

    if ( missingFields.length > 0 ) {
        return `Missing required fields: ${missingFields.map(([key]) => key).join(', ')}`;
    }

    return null;

}

const validateDays = (days) => {

    const invalidDays = days.filter( day => !validDays.includes(day.toLocaleLowerCase()))

    if (invalidDays.length > 0) {
        return res.status(400).json({ error: `Invalid day(s) provided: ${invalidDays.join(', ')}` });
    }

    return null;


}


module.exports = { validateRequiredFields, validDays, validateDays }
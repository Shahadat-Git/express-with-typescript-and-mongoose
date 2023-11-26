import Joi from "joi";

const userNameValicationSchema = Joi.object({
    firstName: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string()
});

const guardianValicationSchema = Joi.object({
    fatherName: Joi.string(),
    fatherOccupation: Joi.string(),
    fatherContactNo: Joi.string(),
    motherName: Joi.string(),
    motherContactNo: Joi.string(),
    motherOccupation: Joi.string(),
});

const localGuardianValicationSchema = Joi.object({
    name: Joi.string(),
    occupation: Joi.string(),
    contactNo: Joi.string(),
    address: Joi.string(),
});

const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValicationSchema.required(),
    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid(
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-'
    ),
    presentAddress: Joi.string(),
    permanentAddress: Joi.string(),
    guardian: guardianValicationSchema.required(),
    localGuardian: localGuardianValicationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'inactive')
});


// export default studentValidationSchema;
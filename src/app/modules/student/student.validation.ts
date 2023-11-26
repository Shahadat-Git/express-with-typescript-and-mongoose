import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string()
        .min(1)
        .max(20)
        .refine(value => value.trim().length > 0, { message: 'First Name Required' }),
    middleName: z.string(),
    lastName: z.string()
        .min(1)
        .max(20)
        .refine(value => value.trim().length > 0, { message: 'Last Name Required' }),
});

const guardianValidatonSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherContactNo: z.string(),
    motherOccupation: z.string(),
});

const localGuardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
});

const studentValidationSchema = z.object({
    id: z.string().min(1).refine(value => value.trim().length > 0, { message: 'ID Required' }),
    name: userNameValidationSchema,
    password: z.string().max(20),
    gender: z.enum(['male', 'female', 'other']).refine(value => value.trim().length > 0, { message: 'Gender Required' }),
    dateOfBirth: z.string(),
    email: z.string().email({ message: 'Invalid email format' }).refine(value => value.trim().length > 0, { message: 'Email Required' }),
    contactNo: z.string().min(1).refine(value => value.trim().length > 0, { message: 'Contact Number Required' }),
    emergencyContactNo: z.string().min(1).refine(value => value.trim().length > 0, { message: 'Emergency Contact Number Required' }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidatonSchema.refine(value => Object.values(value).some(val => val.trim().length > 0), { message: 'Guardian details are required' }),
    localGuardian: localGuardianValidationSchema.refine(value => Object.values(value).some(val => val.trim().length > 0), { message: 'Local Guardian details are required' }),
    profileImg: z.string(),
    isActive: z.enum(['active', 'inactive']).default('active'),
    isDeleted: z.boolean(),
});


export default studentValidationSchema;

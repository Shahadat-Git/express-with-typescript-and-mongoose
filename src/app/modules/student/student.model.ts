import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethod,
  // StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from "bcrypt";
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name Required'],
    maxlength: [20, 'Max length 20 character'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: 'Wrong format'
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (value: string) {
    //     // console.log(value);
    //     return value.length <= 20;
    //   },
    //   message: 'Max length 20 character for last name'
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  fatherContactNo: {
    type: String,
  },
  motherName: {
    type: String,
  },
  motherContactNo: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
  },
  occupation: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  address: {
    type: String,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "{VALUE} is incorrect"
    },
    required: [true, 'Gender Required'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, {
  toJSON: {
    virtuals: true,
  }
});

// virtual 
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + " " + this.name.middleName + " " + this.name.lastName;
})



// pre save middleware / hook : will work on create() save()
studentSchema.pre('save', async function (next) {

  // bcrypt used 
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc 
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

  next();
})


// post save middleware / hook
studentSchema.post('save', function (doc, next) {

  doc.password = ''
  next();
})


// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  // console.log(this)
  next()
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  // console.log(this)
  next()
});



studentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline());
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  // console.log(this.pipeline());
  next()
});






// creating  a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser;
}



// creating a custom instance method

// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

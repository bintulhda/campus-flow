const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clubUserSchema = new mongoose.Schema(
  {
    clubName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: String,
    contactPerson: String,
  },
  { timestamps: true }
);

// Hash password before saving
clubUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
clubUserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('ClubUser', clubUserSchema);

import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  petType: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  location: { type: String, required: true },
  ptraits: { type: String, required: true },
  photo: { type: String, required: true },
});

export default mongoose.models.Pet || mongoose.model('Pet', PetSchema);

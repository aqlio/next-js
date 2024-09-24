// src/lib/models/Lecture.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { ILecture } from '@/lib/interfaces/ILecture';

export interface ILectureDocument extends ILecture, Document {
  id: string; // Virtual field
}

const LectureSchema: Schema<ILectureDocument> = new Schema(
  {
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    orgId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: String, required: true }, // Keeping date as string
    attendance: [{ type: Schema.Types.Mixed }], // Define a specific schema if possible
  },
  { timestamps: true }
);

// Virtual for 'id'
LectureSchema.virtual('id').get(function (this: ILectureDocument) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
LectureSchema.set('toJSON', {
  virtuals: true,
});
LectureSchema.set('toObject', {
  virtuals: true,
});

const Lecture: Model<ILectureDocument> = mongoose.models.Lecture || mongoose.model<ILectureDocument>('Lecture', LectureSchema);

export default Lecture;

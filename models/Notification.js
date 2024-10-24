import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'general',
        'exam_timetable',
        'faculty_change',
        'exam_gate_pass',
        'circular',
      ],
      required: true,
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // For student-specific notifications like exam gate pass
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);

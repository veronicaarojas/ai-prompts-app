import mongoose, { Schema, model, models } from 'mongoose';

const FavoriteSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'userId is required']
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
    required: [true, 'Prompt is required']
  }
});

const Favorite = models.Favorite || model('Favorite', FavoriteSchema);

export default Favorite;
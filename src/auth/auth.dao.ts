import mongoose from 'mongoose';
import authSchema from './auth.model';

authSchema.statics = {
  login: function (query: any, cb: any) {
    this.find(query, cb);
  }
}

const authModel = mongoose.model('Users', authSchema);

export default authModel;
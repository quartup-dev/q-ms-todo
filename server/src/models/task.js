import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const task = new Schema({

  // created_by: Object,
  title: { type: String, required: true },
  description: { type: String, required: false, default:null },
  completed: { type: Boolean, default: false },
  user_id: { type: String,index:true, default: "1a" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  // Assign a function to the "query" object of our animalSchema through schema options.
  // By following this approach, there is no need to create a separate TS type to define the type of the query functions. 
  query: {
    byKey(key) {
      return this.where({ key: key })
    },

    simpleSearch(obj) {
      const { by, search } = obj
      let or = []
      by.forEach(c => {
        let o = {}
        o[c] = new RegExp(search, 'i')
        or.push(o)
      })
      const que = { $or: or }
      return this.where(que)
    }

  }

});

// Convertir a modelo
const Task = mongoose.model('tasks', task);

export default Task;
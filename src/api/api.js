import axios from 'axios'

export default axios.create({
  baseURL: `https://vue-taskmanager-4dabc.firebaseio.com/tasks/`
})
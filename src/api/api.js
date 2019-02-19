import axios from 'axios'

export default axios.create({
  baseURL: `https://softonix-crud-test.firebaseio.com/to-do-list/`
})
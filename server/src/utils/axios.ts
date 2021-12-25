import axios from 'axios';
import dummyAPIConfig from '../configs/dummyAPIConfig';

const dummyAPI = axios.create(dummyAPIConfig);
export default dummyAPI;

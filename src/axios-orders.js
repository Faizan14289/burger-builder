import axios from "axios";

const  instance  = axios.create({
                       baseURL: 'https://react-my-burger-208e5-default-rtdb.firebaseio.com/'
                    });

export default instance;
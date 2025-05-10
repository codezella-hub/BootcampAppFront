import axios from "axios";
const API_URL = "http://localhost:3000/api";
const certificasApi = {
    checkCertificas: (Iduser,couseId) => {
        return axios.post(`${API_URL}/getCertificate`, { idUser:Iduser ,idCourse:couseId});
      },
};
export default certificasApi;
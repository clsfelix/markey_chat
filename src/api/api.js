import _getEstablishmentService from "./getEstablishmentService";
import _getAvaliabledSchedules from './getAvaliabledSchedules';
import _createSchedule from "./createSchedule";


const url = 'http://192.168.0.15:5001/marcaai-a6efb/southamerica-east1/newchatbot/';

const getEstablishmentService = (hash) => _getEstablishmentService(url, hash);

const getAvaliabledSchedules = (uidProfessional, serviceID, data) => _getAvaliabledSchedules(url, {uidProfessional, serviceID, data})

const createSchedule = (appointment) => _createSchedule(url, appointment);

export {
    getEstablishmentService,
    getAvaliabledSchedules,
    createSchedule    
}
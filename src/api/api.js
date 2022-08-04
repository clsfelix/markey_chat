import _getEstablishmentService from "./getEstablishmentService";
import _getAvaliabledSchedules from './getAvaliabledSchedules';
import _createSchedule from "./createSchedule";


const url = 'https://southamerica-east1-marcaai-a6efb.cloudfunctions.net/newchatbot/';

const getEstablishmentService = (hash) => _getEstablishmentService(url, hash);

const getAvaliabledSchedules = (uidProfessional, serviceID, data) => _getAvaliabledSchedules(url, {uidProfessional, serviceID, data})

const createSchedule = (appointment) => _createSchedule(url, appointment);

export {
    getEstablishmentService,
    getAvaliabledSchedules,
    createSchedule    
}
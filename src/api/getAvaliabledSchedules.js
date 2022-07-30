
const _getAvaliabledSchedules = async(url, {uidProfessional, serviceID, data }) => {
    try {
        
        const response = await fetch(url + 'getAvaliabledSchedules?' + new URLSearchParams({
            uidProfessional,
            serviceID, 
            data
        }));
        return response.json();
    }
    catch(e) {
        console.error(e);
    }
}

export default _getAvaliabledSchedules;
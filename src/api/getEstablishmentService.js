
const _getEstablishmentService = async(url, hash) => {
    try {
        let h = window.location.pathname.substring(1);
        const response = await fetch(url + 'getStore?hash=' + h);
        return response.json();
    }
    catch(e) {
        console.error(e);
    }
}

export default _getEstablishmentService;
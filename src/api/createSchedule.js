const _createSchedule = (url, appointment) => {
    return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        fetch(url + '/newSchedule',{
            body:JSON.stringify(appointment),
            method: 'POST',
            headers:headers
        })
        .then(async(response) => {
            resolve(response);
        })
        .catch((err)=>{
            console.error(err);
            reject(err)
        })
    } )
}

export default _createSchedule;
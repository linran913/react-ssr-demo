export const FETCH_PERSONAL_DATA = 'fetch_personal_data';

export const fetchPersonalData = async (dispath) => {
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                userInfo: {
                    username: 'Tim',
                    job: 'developer',
                }
            })
        }, 2000)
    });
    
    dispath({
        type: FETCH_PERSONAL_DATA,
        payload: data,
    })
}
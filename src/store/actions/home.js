export const FETCH_HOME_DATA = 'fetch_home_data';

export const fetchHomeData = async ( dispath) => {
    
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                articles: [
                    {
                        id: 1,
                        title: 'article title 1',
                        content: 'article content 1',
                    },
                    {
                        id: 2,
                        title: 'article title 2',
                        content: 'article content 2',
                    },
                    {
                        id: 3,
                        title: 'article title 3',
                        content: 'article content 3',
                    },
                    {
                        id: 4,
                        title: 'article title 4',
                        content: 'article content 4',
                    }
                ],
            });
        }, 2000);
    });

    dispath({
        type: FETCH_HOME_DATA,
        payload: data,
    });
}
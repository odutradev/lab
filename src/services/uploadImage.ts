import axios from 'axios';

interface ResponseError {
    error: string;
}

const uploadImage = async (image: File | string): Promise<string | ResponseError> => {
    try {
        console.log(image)
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.imgur.com/3/image',
            headers: { 
                'Authorization': 'Client-ID c6e822b79325f86', 
                'Content-Type': 'text/plain'
            },
            data: image
        };

        if (typeof image === 'string') {
            return image;
        }

        const response = await axios(config);
        return response.data.data.link;
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.error || 'Erro desconhecido' };
        }
        return { error: 'Erro na requisição' };
    }
};

export default uploadImage;

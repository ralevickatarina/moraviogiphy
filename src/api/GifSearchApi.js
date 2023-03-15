import axios from "axios";

export async function searchGifs(url, searchParams) {
    const response = await axios.get(url, {
        params: searchParams
    });

    if(response.status !== 200) {
        throw new Error(response.status);
    }
    else {
        const data = response.data.data;
        const pagination = response.data.pagination;
        return { data, pagination };
    }
}

export function createURLParams(api_key, searchTerm, offset = 0, limit = 10) {
    // validate the values
    const searchParams = new URLSearchParams();
    
    searchParams.append("api_key", api_key);
    searchParams.append("q", searchTerm);
    searchParams.append("limit", limit);
    searchParams.append("offset", offset);
    
    return searchParams;
}
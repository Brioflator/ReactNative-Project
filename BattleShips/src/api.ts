// const baseUrl = 'https://malamute-enabled-yak.ngrok-free.app';
const baseUrl = 'http://163.172.177.98:8081';

const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<string> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    console.log(data.accessToken)

    return data.accessToken
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    return data.accessToken
};

export const getUser = async (token: string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`,
        },
    })

    const data = await result.json()

    return data
};

export const getGames = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`,
        },
    })

     const data = await result.json()

    return data
};

export const joinGame = async (token: string, gameId: string) => {
    const result = await fetch(`${baseUrl}/game/join/${gameId}`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`,
        },
    })

    const data = await result.json()

    return data
};

export const createGame = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`,
        },
    })
    const data = await result.json()
    return data
};

export const getGameDetails = async (token: string, gameId: string) => {
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`,
        },
    })

     const data = await result.json()

    return data
};

interface Ship {
    x: string;
    y: number;
    size: number;
    direction: string;
}

export const patchGameConfig = async (token: string, gameId: string, ships: Ship[]) => {
    const response = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'PATCH',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(
            {"ships": ships}
        )
    })

    const result = await response.json();
    return result;
};
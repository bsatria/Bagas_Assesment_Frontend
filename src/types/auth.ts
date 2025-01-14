export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthResponse {
    data: {
        token: string;
        id_user: string;
        nama_lengkap: string;
        username: string;
    }
}
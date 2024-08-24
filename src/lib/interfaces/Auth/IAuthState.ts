export default interface IAuthState {
    user: any | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}
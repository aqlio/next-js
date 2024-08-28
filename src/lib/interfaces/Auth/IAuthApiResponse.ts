export default interface IAuthApiResponse {
	email: string;
	provider: string;
	orgId: string;
	emailVerified: boolean;
}
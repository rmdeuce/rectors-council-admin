import { AuthProvider } from 'react-admin';
import { jwtDecode } from 'jwt-decode';

const decodeToken = (token: any) => {
	const decoded = jwtDecode(token);
	return decoded;
}

export const authProvider: AuthProvider = {
	login: ({ username, password }) => {
		const data = new URLSearchParams();
		data.append("username", username);
		data.append("password", password);
		data.append("grant_type", "password");
		data.append("client_id", "rectors_council");

		const request = new Request("https://auth.tgmu.ru/token", {
			method: 'POST',
			body: data,
			headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
		});

		async function fetchToken()
		{
			try {
				const response = await fetch(request);

				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				
				const data = await response.json();
				localStorage.setItem('auth', JSON.stringify(data));
				console.log(localStorage.getItem('auth'));

			} catch(error) {
				console.error(error);
			}
		}

		const tokens = fetchToken();
		return tokens;
	},
	checkAuth: () => {
		return localStorage.getItem('auth')
			? Promise.resolve(console.log("Проверка авторизации успешна"))
			: Promise.reject(console.log("Проверка авторизации неуспешна"));
	},
	logout: () => {
		localStorage.removeItem('auth');
		return Promise.resolve();
	},
	getIdentity: () => {
		
		const authString = localStorage.getItem('auth');
		const authStringObj = JSON.parse(authString);
		const accessToken = authStringObj.access_token;
		
		const userData = decodeToken(accessToken);
		
		return Promise.resolve({
			fullName: userData.name,
			email: userData.email
		});
	},
	getPermissions: () => Promise.resolve(''),
	checkError: (error: any) => {
		const status = error.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem('auth');
			return Promise.reject();
		}
		return Promise.resolve();
	}
};

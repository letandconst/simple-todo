import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthProps {
	isLoggedIn: boolean;

	login: (userId: string) => void;
	logout: () => void;
}

const Auth = createContext<AuthProps | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const storedValue = localStorage.getItem('isLoggedIn');
		return storedValue ? JSON.parse(storedValue) : false;
	});

	const login = (userId: string) => {
		try {
			const usersString = localStorage.getItem('users') ?? '[]';
			const users = JSON.parse(usersString);

			const loggedInUser = users.find((user: { id: string }) => user.id === userId);

			if (loggedInUser) {
				setIsLoggedIn(true);
			}
		} catch (error) {
			console.error('Error while logging in:', error);
		}
	};

	const logout = () => {
		setIsLoggedIn(false);

		localStorage.setItem('currentUser', '');
		window.location.href = '/';
	};

	useEffect(() => {
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
	}, [isLoggedIn]);

	return <Auth.Provider value={{ isLoggedIn, login, logout }}>{children}</Auth.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthProps => {
	const context = useContext(Auth);
	if (!context) {
		throw new Error('useAuth must be used within a ModeProvider');
	}
	return context;
};

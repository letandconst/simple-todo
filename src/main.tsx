import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';

const theme = extendTheme({
	fonts: {
		body: 'Figtree-Regular,sans-serif',
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ChakraProvider theme={theme}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ChakraProvider>
);

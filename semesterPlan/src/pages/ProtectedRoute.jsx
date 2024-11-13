import { Navigate } from 'react-router-dom';
import { useAppContext } from '../AppProvider';

export default function ProtectedRoute ({ element })  {
    const { token } = useAppContext();

    // If the user is not authenticated (no token), redirect to login
    if (!token) {
        return <Navigate to="/" />;
    }

    return element;
};
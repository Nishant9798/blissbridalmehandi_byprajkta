import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProtectedRoute from '../components/admin/ProtectedRoute';

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}

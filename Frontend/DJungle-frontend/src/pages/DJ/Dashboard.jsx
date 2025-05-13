import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDJProfile } from '../../features/dj/djSlice';
import ProfileSection from '../../components/dj/ProfileSection';
import PortfolioSection from '../../components/dj/PortfolioSection';
import StatsSection from '../../components/dj/StatsSection';

const DJDashboard = () => {
  const dispatch = useDispatch();
  const { profile, status } = useSelector((state) => state.dj);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'DJ') {
      dispatch(getDJProfile());
    }
  }, [dispatch, user]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de DJ</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileSection profile={profile} />
        </div>
        
        <div className="lg:col-span-2 space-y-8">
          <StatsSection />
          <PortfolioSection posts={profile?.posts || []} />
        </div>
      </div>
    </div>
  );
};

export default DJDashboard;
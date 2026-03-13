import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Home as HomeIcon, Users, Shield, UserCircle, LogIn, LogOut, Code, MonitorSmartphone, Cloud, Database, Cpu, TrendingUp, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { auth, db, signInWithGoogle, logout } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, collection, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore';

// --- Types ---
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'member' | 'admin';
  createdAt: any;
}

// --- Context ---
const AuthContext = React.createContext<{ user: User | null; profile: UserProfile | null; loading: boolean }>({
  user: null,
  profile: null,
  loading: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, profile, loading }}>{children}</AuthContext.Provider>;
};

// --- Layout ---
const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { profile } = React.useContext(AuthContext);
  
  const navItems = [
    { path: '/', icon: <HomeIcon size={24} />, label: 'Home' },
    { path: '/members', icon: <Users size={24} />, label: 'Members' },
    ...(profile?.role === 'admin' ? [{ path: '/admin', icon: <Shield size={24} />, label: 'Admin' }] : []),
    { path: '/profile', icon: <UserCircle size={24} />, label: 'Profile' },
  ];

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white h-screen flex flex-col relative shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="bg-indigo-600 text-white p-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain bg-white rounded-md p-1" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="font-bold text-lg tracking-tight">SajiloProjectHub</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 bg-gray-50">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center pb-safe pt-2 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// --- Pages ---

const Home = () => {
  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="bg-slate-900 text-white p-6 pt-10 pb-12 rounded-b-3xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
        <h1 className="text-3xl font-bold mb-3 relative z-10">Digital Reality <br/><span className="text-indigo-400">Starts Here</span></h1>
        <p className="text-gray-300 text-sm mb-6 relative z-10">Your trusted IT partner for software solutions and digital transformation.</p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg shadow-indigo-600/30 flex items-center gap-2">
          Get Started <ChevronRight size={16} />
        </button>
      </div>

      {/* Services */}
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Our Services</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Code size={20}/>, title: 'Web Dev' },
            { icon: <MonitorSmartphone size={20}/>, title: 'Mobile Apps' },
            { icon: <Cloud size={20}/>, title: 'Cloud' },
            { icon: <Database size={20}/>, title: 'Data' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-2">
                {s.icon}
              </div>
              <span className="text-xs font-semibold text-gray-800">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Contact Us</h2>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail size={16} className="text-indigo-500" /> sajiloprojecthub@gmail.com
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone size={16} className="text-indigo-500" /> +977-9708547685
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={16} className="text-indigo-500" /> Kathmandu, Nepal
          </div>
        </div>
      </div>
    </div>
  );
};

const Members = () => {
  const { user, profile } = React.useContext(AuthContext);
  const [members, setMembers] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const m: UserProfile[] = [];
      snap.forEach(doc => m.push(doc.data() as UserProfile));
      setMembers(m);
    });
    return () => unsub();
  }, [user]);

  const handlePromote = async (uid: string) => {
    try {
      await updateDoc(doc(db, 'users', uid), { role: 'admin' });
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("Failed to promote user. Only the super admin can do this.");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Users size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Members Area</h2>
        <p className="text-gray-500 text-sm mb-6">Please sign in to view and connect with other members of Sajilo Project Hub.</p>
        <Link to="/profile" className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium">Go to Sign In</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Members</h2>
      <div className="space-y-4">
        {members.map((m) => (
          <div key={m.uid} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            {m.photoURL ? (
              <img src={m.photoURL} alt={m.displayName} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                {m.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{m.displayName}</h3>
              <p className="text-xs text-gray-500 capitalize">{m.role}</p>
            </div>
            {profile?.email === 'sajiloprojecthub@gmail.com' && m.role === 'member' && (
              <button 
                onClick={() => handlePromote(m.uid)}
                className="ml-auto bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-indigo-200"
              >
                Make Admin
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Admin = () => {
  const { profile } = React.useContext(AuthContext);

  if (profile?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Personalized greeting based on known admins
  const name = profile.displayName.toLowerCase();
  let greeting = "Admin Dashboard";
  if (name.includes('priya')) greeting = "Welcome back, Priya!";
  if (name.includes('karuna')) greeting = "Welcome back, Karuna!";
  if (name.includes('nipesh')) greeting = "Welcome back, Nipesh!";

  return (
    <div className="p-6">
      <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-6">
        <Shield size={32} className="mb-4 opacity-80" />
        <h2 className="text-2xl font-bold mb-1">{greeting}</h2>
        <p className="text-indigo-100 text-sm">Manage the Sajilo Project Hub platform.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1">Total Members</p>
          <p className="text-2xl font-bold text-gray-900">--</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1">Active Projects</p>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left font-medium text-sm flex justify-between items-center">
          Manage Users <ChevronRight size={16} className="text-gray-400" />
        </button>
        <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left font-medium text-sm flex justify-between items-center">
          View Inquiries <ChevronRight size={16} className="text-gray-400" />
        </button>
        <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left font-medium text-sm flex justify-between items-center">
          System Settings <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, profile, loading } = React.useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <UserCircle size={40} className="text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Hub</h2>
        <p className="text-gray-500 text-sm mb-8">Sign in or register to connect with other members and access exclusive features.</p>
        
        <button 
          onClick={handleLogin}
          className="w-full bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center mb-6">
        {profile?.photoURL ? (
          <img src={profile.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-indigo-50 mb-4 shadow-sm" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-3xl mb-4">
            {profile?.displayName?.charAt(0).toUpperCase()}
          </div>
        )}
        <h2 className="text-xl font-bold text-gray-900">{profile?.displayName}</h2>
        <p className="text-sm text-gray-500 mb-2">{profile?.email}</p>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${profile?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
          {profile?.role}
        </span>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left font-medium text-sm flex items-center gap-3">
          <UserCircle size={20} className="text-gray-400" /> Edit Profile
        </button>
        <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left font-medium text-sm flex items-center gap-3">
          <Shield size={20} className="text-gray-400" /> Privacy & Security
        </button>
        <button onClick={logout} className="w-full bg-red-50 p-4 rounded-xl shadow-sm border border-red-100 text-left font-medium text-sm text-red-600 flex items-center gap-3 mt-6">
          <LogOut size={20} /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MobileLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MobileLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {
  Users,
  ShoppingBag,
  Package,
  TrendingUp,
  Calendar,
  DollarSign,
  LineChart,
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const [stats, setStats] = useState({
    products: 78,
    users: 123,
    orders: 45,
    revenue: 18230,
    growth: 12.5,
  });

  
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/unauthorized");
        }
      } catch (error) {
        console.error("Admin check error:", error);
        navigate("/unauthorized");
      }
    };

    checkAdminRole();
  }, [user, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👑</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <DashboardCard
            title="Total Users"
            value={stats.users}
            icon={<Users className="w-7 h-7 text-white" />}
            percent="+12%"
            color="blue"
            subtitle="Active customers"
          />
          <DashboardCard
            title="Total Orders"
            value={stats.orders}
            icon={<ShoppingBag className="w-7 h-7 text-white" />}
            percent="+8%"
            color="green"
            subtitle="This month"
          />
          <DashboardCard
            title="Total Products"
            value={stats.products}
            icon={<Package className="w-7 h-7 text-white" />}
            percent="+5%"
            color="yellow"
            subtitle="In inventory"
          />
        </div>

        {/* Sales Summary + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Summary */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <SectionHeader title="Sales Summary" icon={<LineChart />} />
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Monthly Revenue</p>
                  <h2 className="text-3xl font-bold text-green-600">
                    ${stats.revenue.toLocaleString()}
                  </h2>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-green-600" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Growth Rate</p>
                  <h2 className="text-2xl font-bold text-blue-600">
                    +{stats.growth}%
                  </h2>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <SectionHeader title="Recent Activity" icon={<Calendar />} />
            <div className="space-y-4">
              <RecentActivity
                dotColor="green"
                title="New order received"
                desc="Order #12345 - $299.99"
                time="2 minutes ago"
              />
              <RecentActivity
                dotColor="blue"
                title="New user registered"
                desc="john.doe@example.com"
                time="15 minutes ago"
              />
              <RecentActivity
                dotColor="yellow"
                title="Product updated"
                desc="iPhone 15 Pro Max - Stock updated"
                time="1 hour ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function DashboardCard({ title, value, icon, percent, color, subtitle }) {
  const bg = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    yellow: "from-yellow-400 to-orange-500",
  }[color];

  const fg = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
  }[color];

  return (
    <div
      className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-${color}-200 overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bg} rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:opacity-20 transition-opacity`}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-14 h-14 bg-gradient-to-r ${bg} rounded-2xl flex items-center justify-center shadow-lg`}
          >
            {icon}
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>{percent}</span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className={`text-4xl font-bold ${fg} mb-2`}>
          {value.toLocaleString()}
        </p>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function RecentActivity({ dotColor, title, desc, time }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
      <div className={`w-3 h-3 bg-${dotColor}-500 rounded-full mt-2`} />
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-600">{desc}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
        {React.cloneElement(icon, { className: "w-5 h-5 text-white" })}
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
  );
}

export default AdminDashboard;

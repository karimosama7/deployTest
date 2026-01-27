import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, FileText, BarChart2, Plus, Calendar, Clock, Loader, Play, Square, CheckCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { teacherService } from '../../services/teacherService';
import { ClassSessionResponse } from '../../types/api';
import { useToast } from '../../context/ToastContext';

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<ClassSessionResponse[]>([]);

  // Recording Modal State removed as requested for Dashboard

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await teacherService.getClasses();
        setClasses(classData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        addToast('فشل تحميل بيانات اللوحة', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addToast]);

  const loadData = async () => {
    try {
      const classData = await teacherService.getClasses();
      setClasses(classData);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  const handleStartClass = async (classId: number) => {
    // Removed confirmation as requested
    try {
      await teacherService.startClass(classId);
      addToast('تم بدء الحصة بنجاح', 'success');
      loadData();
    } catch (error) {
      console.error('Failed to start class', error);
      addToast('فشل بدء الحصة', 'error');
    }
  };

  const handleEndClass = async (classId: number) => {
    // Removed confirmation as requested
    try {
      await teacherService.endClass(classId);
      addToast('تم إنهاء الحصة بنجاح', 'success');
      loadData();
    } catch (error) {
      console.error('Failed to end class', error);
      addToast('فشل إنهاء الحصة', 'error');
    }
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Compute Stats (Real + Placeholder for missing APIs)
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await teacherService.getDashboardStats();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'إجمالي الفصول', value: statsData?.totalClasses?.toString() || classes.length.toString(), icon: BookOpen, color: 'bg-indigo-100 text-indigo-600', link: '/teacher/classes' },
    { label: 'إجمالي الطلاب', value: statsData?.totalStudents?.toString() || '-', icon: Users, color: 'bg-blue-100 text-blue-600', link: '/teacher/students' },
    { label: 'واجبات جديدة', value: statsData?.activeHomework?.toString() || '-', icon: FileText, color: 'bg-yellow-100 text-yellow-600', link: '/teacher/homework' },
    { label: 'تصحيح معلق', value: statsData?.pendingGrading?.toString() || '-', icon: BarChart2, color: 'bg-red-100 text-red-600', link: '/teacher/exams' },
  ];

  // Filter Today's Classes
  const today = new Date().toISOString().split('T')[0];
  const todayClasses = classes.filter(c => c.scheduledTime.startsWith(today));

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مرحباً، أ. {user?.fullName} 👋</h1>
          <p className="mt-1 text-gray-500">إليك نظرة عامة على جدولك وطلابك اليوم.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/teacher/classes')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>حصة جديدة</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md transition-all border-none shadow-sm"
            onClick={() => navigate(stat.link)}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Classes */}
        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              جدول حصص اليوم
            </h2>
          </div>

          <div className="space-y-4">
            {todayClasses.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-indigo-600 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-4">
                    <div className="bg-indigo-50 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-indigo-600">
                      <span className="text-xs font-bold">اليوم</span>
                      <span className="text-lg font-bold">
                        {new Date(item.scheduledTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.gradeName} - {item.subjectName}</h3>
                      <p className="text-gray-500">{item.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* Only show Start/End buttons if NOT Completed */}
                    {item.status !== 'COMPLETED' ? (
                      <>
                        <button
                          onClick={() => handleStartClass(item.id)}
                          className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${item.status === 'LIVE' ? 'bg-green-100 text-green-700 cursor-default' : 'bg-green-600 text-white hover:bg-green-700'}`}
                          disabled={item.status === 'LIVE'}
                        >
                          <Play className="w-4 h-4" />
                          {item.status === 'LIVE' ? 'مباشر' : 'بدء'}
                        </button>

                        <button
                          onClick={() => handleEndClass(item.id)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-1"
                        >
                          <Square className="w-4 h-4" />
                          إنهاء
                        </button>
                      </>
                    ) : (
                      <div className="px-3 py-2 bg-gray-100 text-gray-500 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>منتهية</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {todayClasses.length === 0 && (
              <div className="text-center py-10 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                <p className="text-gray-500">لا توجد حصص مجدولة لهذا اليوم.</p>
                <button
                  onClick={() => navigate('/teacher/classes')}
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                >
                  عرض كل الحصص
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions / Recent Activity */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            مهام عاجلة
          </h2>

          {/* Placeholder for future "Urgent Tasks" implementation */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
            <p className="text-gray-400 text-sm">لا توجد مهام عاجلة حالياً</p>
          </div>

          {/* 
          <Card className="bg-orange-50 border-orange-100">
            <h3 className="font-bold text-orange-800 mb-2">تصحيح واجب الرياضيات</h3>
            <p className="text-sm text-orange-700 mb-4">يوجد 5 طلاب سلموا الواجب أمس.</p>
            <button className="w-full py-2 bg-white text-orange-600 rounded-lg font-bold text-sm hover:bg-orange-100 transition-colors border border-orange-200">
              مراجعة الحلول
            </button>
          </Card>
          */}
        </motion.div>
      </div>
    </motion.div>
  );
};
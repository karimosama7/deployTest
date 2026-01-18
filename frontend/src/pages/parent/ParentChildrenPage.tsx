import { motion } from 'framer-motion';
import { Card } from '../../components/common/Card';
import { User, BookOpen, AlertCircle, FileText, CheckCircle } from 'lucide-react';

const CHILDREN_DATA = [
    {
        id: 1,
        name: 'أحمد محمد',
        grade: 'الصف السادس الابتدائي',
        stats: {
            attendance: '95%',
            assignments: '12/15',
            average: '92%'
        },
        recentActivity: [
            { type: 'grade', subject: 'الرياضيات', score: '18/20', date: '2026-01-14' },
            { type: 'homework', subject: 'اللغة العربية', status: 'completed', date: '2026-01-13' }
        ]
    },
    {
        id: 2,
        name: 'سارة محمد',
        grade: 'الصف الرابع الابتدائي',
        stats: {
            attendance: '98%',
            assignments: '10/10',
            average: '88%'
        },
        recentActivity: [
            { type: 'grade', subject: 'العلوم', score: '15/20', date: '2026-01-14' },
            { type: 'absent', subject: 'الرياضيات', date: '2026-01-10' }
        ]
    }
];

export const ParentChildrenPage = () => {
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

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">أبنائي</h1>
                <p className="mt-1 text-gray-500">تفاصيل الأداء الأكاديمي للأبناء</p>
            </div>

            <div className="space-y-8">
                {CHILDREN_DATA.map((child) => (
                    <motion.div key={child.id} variants={itemVariants}>
                        <Card className="border border-indigo-50 shadow-sm overflow-hidden">
                            <div className="bg-indigo-50/50 p-4 border-b border-indigo-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{child.name}</h3>
                                    <p className="text-sm text-gray-500">{child.grade}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-gray-500 text-sm mb-1">نسبة الحضور</p>
                                        <p className="text-2xl font-bold text-gray-900">{child.stats.attendance}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-gray-500 text-sm mb-1">تسليم الواجبات</p>
                                        <p className="text-2xl font-bold text-gray-900">{child.stats.assignments}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-gray-500 text-sm mb-1">المعدل التراكمي</p>
                                        <p className={`text-2xl font-bold ${parseInt(child.stats.average) >= 90 ? 'text-green-600' : 'text-blue-600'}`}>
                                            {child.stats.average}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-gray-400" />
                                        النشاط الأخير
                                    </h4>
                                    <div className="space-y-3">
                                        {child.recentActivity.map((activity, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    {activity.type === 'grade' && <FileText className="w-5 h-5 text-indigo-500" />}
                                                    {activity.type === 'homework' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                                    {activity.type === 'absent' && <AlertCircle className="w-5 h-5 text-red-500" />}

                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {activity.type === 'grade' && `نتيجة اختبار ${activity.subject}`}
                                                            {activity.type === 'homework' && `واجب ${activity.subject}`}
                                                            {activity.type === 'absent' && `غياب في حصة ${activity.subject}`}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{activity.date}</p>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-bold">
                                                    {activity.score && <span className="text-indigo-600">{activity.score}</span>}
                                                    {'status' in activity && activity.status === 'completed' && <span className="text-green-600">تم التسليم</span>}
                                                    {activity.type === 'absent' && <span className="text-red-600">غياب</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

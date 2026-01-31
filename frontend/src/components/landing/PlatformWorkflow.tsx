import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
    UserPlus,
    LayoutDashboard,
    Video,
    FileCheck,
    Users,
    Check
} from 'lucide-react'

interface WorkflowStep {
    id: number;
    icon: React.ElementType;
    title: string;
    color: string;
    features: string[];
}

const workflowSteps: WorkflowStep[] = [
    {
        id: 1,
        icon: UserPlus,
        title: "تسجيل الطالب",
        color: "blue",
        features: ["إنشاء حساب", "اختيار المرحلة", "تحديد المواد"]
    },
    {
        id: 2,
        icon: LayoutDashboard,
        title: "واجهة الطالب",
        color: "emerald",
        features: ["الجدول الأسبوعي", "الحصص المباشرة", "الإشعارات"]
    },
    {
        id: 3,
        icon: Video,
        title: "حضور الحصص",
        color: "purple",
        features: ["شرح مباشر", "أنشطة تفاعلية", "متابعة فورية"]
    },
    {
        id: 4,
        icon: FileCheck,
        title: "الواجبات والاختبارات",
        color: "orange",
        features: ["تصحيح تلقائي", "نتائج فورية", "تقييم مستمر"]
    },
    {
        id: 5,
        icon: Users,
        title: "متابعة ولي الأمر",
        color: "pink",
        features: ["تقارير الأداء", "إشعارات المواعيد", "مراجعة الإجابات"]
    }
];

const colorClasses: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
    blue: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-600", gradient: "from-blue-500 to-blue-600" },
    emerald: { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-600", gradient: "from-emerald-500 to-emerald-600" },
    purple: { bg: "bg-purple-50", border: "border-purple-300", text: "text-purple-600", gradient: "from-purple-500 to-purple-600" },
    orange: { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-600", gradient: "from-orange-500 to-orange-600" },
    pink: { bg: "bg-pink-50", border: "border-pink-300", text: "text-pink-600", gradient: "from-pink-500 to-pink-600" },
};

export function PlatformWorkflow() {
    const [activeStep, setActiveStep] = useState<number>(1);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden" dir="rtl" ref={ref}>
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        مراحل استخدام المنصة
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        خطوات بسيطة من التسجيل للتميز
                    </p>
                </motion.div>

                {/* Zigzag Ladder Style */}
                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 hidden md:block" />

                    {workflowSteps.map((step, index) => {
                        const Icon = step.icon;
                        const colors = colorClasses[step.color];
                        const isActive = activeStep === step.id;
                        const isLeft = index % 2 === 0; // Alternate left/right

                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className={`relative flex items-center mb-6 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                {/* Step Number Circle on Center Line */}
                                <motion.div
                                    className={`hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full items-center justify-center font-bold text-sm shadow-md ${isActive
                                            ? `bg-gradient-to-r ${colors.gradient} text-white`
                                            : 'bg-white border-2 border-gray-200 text-gray-400'
                                        }`}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {step.id}
                                </motion.div>

                                {/* Card */}
                                <motion.button
                                    onClick={() => setActiveStep(step.id)}
                                    className={`w-full md:w-[45%] flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-right ${isActive
                                            ? `${colors.bg} ${colors.border} shadow-lg`
                                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Icon */}
                                    <motion.div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isActive ? `bg-gradient-to-r ${colors.gradient}` : 'bg-gray-100'
                                            }`}
                                        animate={isActive ? { rotate: [0, -5, 5, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className={`md:hidden text-xs font-bold ${isActive ? colors.text : 'text-gray-400'}`}>
                                                {step.id}
                                            </span>
                                            <h3 className={`font-bold ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                                                {step.title}
                                            </h3>
                                        </div>

                                        {/* Features - Only show when active */}
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="flex flex-wrap gap-2 mt-2"
                                            >
                                                {step.features.map((feature, i) => (
                                                    <motion.span
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}
                                                    >
                                                        <Check className="w-3 h-3" />
                                                        {feature}
                                                    </motion.span>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

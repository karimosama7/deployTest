import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, BookOpen, Clock, Download } from 'lucide-react'

type GradeData = {
    id: string
    name: string
    schedule: {
        day: string
        subjects: string[]
    }[]
    books: {
        name: string
        type: string
    }[]
}

const grades: GradeData[] = [
    {
        id: 'g1',
        name: 'الصف الأول',
        schedule: [
            { day: 'الأحد', subjects: ['عربي', 'Math'] },
            { day: 'الاثنين', subjects: ['English', 'Discover'] },
            { day: 'الثلاثاء', subjects: ['دين', 'عربي'] },
            { day: 'الأربعاء', subjects: ['Math', 'English'] },
            { day: 'الخميس', subjects: ['نشاط', 'مراجعة'] },
        ],
        books: [
            { name: 'لغتي الجميلة', type: 'كتاب الوزارة' },
            { name: 'Mathematics', type: 'School Book' },
            { name: 'Connect Plus', type: 'Language Book' },
            { name: 'Discover', type: 'Activity Book' },
        ],
    },
    {
        id: 'g2',
        name: 'الصف الثاني',
        schedule: [
            { day: 'الأحد', subjects: ['عربي', 'Math'] },
            { day: 'الاثنين', subjects: ['English', 'Discover'] },
            { day: 'الثلاثاء', subjects: ['دين', 'عربي'] },
            { day: 'الأربعاء', subjects: ['Math', 'English'] },
            { day: 'الخميس', subjects: ['نشاط', 'مراجعة'] },
        ],
        books: [
            { name: 'لغتي الجميلة', type: 'كتاب الوزارة' },
            { name: 'Mathematics', type: 'School Book' },
            { name: 'Connect Plus', type: 'Language Book' },
            { name: 'Discover', type: 'Activity Book' },
        ],
    },
    {
        id: 'g3',
        name: 'الصف الثالث',
        schedule: [
            { day: 'الأحد', subjects: ['عربي', 'Math', 'Science'] },
            { day: 'الاثنين', subjects: ['English', 'Social Studies'] },
            { day: 'الثلاثاء', subjects: ['دين', 'عربي', 'Math'] },
            { day: 'الأربعاء', subjects: ['English', 'Science'] },
            { day: 'الخميس', subjects: ['Social Studies', 'ICT'] },
        ],
        books: [
            { name: 'لغتي الجميلة', type: 'كتاب الوزارة' },
            { name: 'Mathematics', type: 'School Book' },
            { name: 'Connect Plus', type: 'Language Book' },
            { name: 'Science', type: 'Scientific Book' },
            { name: 'Social Studies', type: 'History & Geo' },
        ],
    },
    {
        id: 'g4',
        name: 'الصف الرابع',
        schedule: [
            { day: 'الأحد', subjects: ['عربي', 'Math', 'Science'] },
            { day: 'الاثنين', subjects: ['English', 'Social Studies'] },
            { day: 'الثلاثاء', subjects: ['دين', 'عربي', 'Math'] },
            { day: 'الأربعاء', subjects: ['English', 'Science'] },
            { day: 'الخميس', subjects: ['Social Studies', 'ICT'] },
        ],
        books: [
            { name: 'لغتي الجميلة', type: 'كتاب الوزارة' },
            { name: 'Mathematics', type: 'School Book' },
            { name: 'Connect Plus', type: 'Language Book' },
            { name: 'Science', type: 'Scientific Book' },
            { name: 'Social Studies', type: 'History & Geo' },
        ],
    },
    {
        id: 'g5',
        name: 'الصف الخامس',
        schedule: [
            { day: 'الأحد', subjects: ['عربي', 'Math', 'Science'] },
            { day: 'الاثنين', subjects: ['English', 'Social Studies', 'ICT'] },
            { day: 'الثلاثاء', subjects: ['دين', 'عربي', 'Math'] },
            { day: 'الأربعاء', subjects: ['English', 'Science', 'Skills'] },
            { day: 'الخميس', subjects: ['Social Studies', 'ICT', 'مراجعة'] },
        ],
        books: [
            { name: 'لغتي الجميلة', type: 'كتاب الوزارة' },
            { name: 'Mathematics', type: 'School Book' },
            { name: 'Connect Plus', type: 'Language Book' },
            { name: 'Science', type: 'Scientific Book' },
            { name: 'Social Studies', type: 'History & Geo' },
            { name: 'ICT', type: 'Technology' },
        ],
    },
    {
        id: 'g6',
        name: 'الصف السادس',
        schedule: [
            { day: 'الأحد', subjects: ['عربي', 'Math', 'Science'] },
            { day: 'الاثنين', subjects: ['English', 'Social Studies', 'ICT'] },
            { day: 'الثلاثاء', subjects: ['دين', 'عربي', 'Math'] },
            { day: 'الأربعاء', subjects: ['English', 'Science', 'Skills'] },
            { day: 'الخميس', subjects: ['Social Studies', 'ICT', 'مراجعة'] },
        ],
        books: [
            { name: 'لغتي الجميلة', type: 'كتاب الوزارة' },
            { name: 'Mathematics', type: 'School Book' },
            { name: 'Connect Plus', type: 'Language Book' },
            { name: 'Science', type: 'Scientific Book' },
            { name: 'Social Studies', type: 'History & Geo' },
            { name: 'ICT', type: 'Technology' },
        ],
    },
]

export function ClassroomSection() {
    const [activeTab, setActiveTab] = useState(grades[0].id)
    const activeGrade = grades.find((g) => g.id === activeTab) || grades[0]

    return (
        <section className="py-20 bg-white" id="classes">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        الفصول الدراسية والمناهج
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        بيئة تعليمية منظمة تحاكي المدرسة الحقيقية، مع جداول ومناهج واضحة لكل
                        صف
                    </p>
                </div>

                {/* Grade Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12" dir="rtl">
                    {grades.map((grade) => (
                        <button
                            key={grade.id}
                            onClick={() => setActiveTab(grade.id)}
                            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ease-in-out ${activeTab === grade.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                            {grade.name}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="grid lg:grid-cols-3 gap-8"
                    >
                        {/* Schedule Column */}
                        <div className="lg:col-span-2 bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        الجدول الأسبوعي
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        مواعيد الحصص المباشرة بتوقيت الدوحة
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {activeGrade.schedule.map((day, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeInOut' }}
                                        className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow duration-300 border border-gray-100/50"
                                    >
                                        <div className="w-24 font-bold text-gray-900 shrink-0 border-r-4 border-blue-200 pr-3">
                                            {day.day}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {day.subjects.map((subject, sIdx) => (
                                                <span
                                                    key={sIdx}
                                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mr-auto text-gray-400">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Books Column */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        الكتب والمناهج
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        المواد الدراسية المقررة
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {activeGrade.books.map((book, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeInOut' }}
                                        className="bg-gray-50 p-4 rounded-xl flex items-center justify-between group hover:bg-blue-50 transition-colors duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{book.name}</h4>
                                                <p className="text-xs text-gray-500">{book.type}</p>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
                                <p className="text-sm text-gray-600 font-medium">
                                    جميع الكتب متوفرة بصيغة PDF للتحميل المباشر بعد الاشتراك
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

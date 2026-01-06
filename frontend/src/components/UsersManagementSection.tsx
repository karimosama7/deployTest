import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
interface UsersManagementSectionProps {
  lang: 'ar' | 'en';
}
export function UsersManagementSection({
  lang
}: UsersManagementSectionProps) {
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'students' | 'parents' | 'teachers'>('students');
  // Mock Data
  const students = [{
    id: 1,
    name: 'Ahmed Mohamed',
    username: 'st_ahmed',
    grade: 'Grade 6',
    status: 'active'
  }, {
    id: 2,
    name: 'Sara Ali',
    username: 'st_sara',
    grade: 'Grade 4',
    status: 'inactive'
  }];
  return <div className="space-y-6">
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === 'ar' ? 'إدارة المستخدمين' : 'User Management'}
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>
            {lang === 'ar' ? activeTab === 'students' ? 'إضافة طالب' : activeTab === 'parents' ? 'إضافة ولي أمر' : 'إضافة مدرس' : activeTab === 'students' ? 'Add Student' : activeTab === 'parents' ? 'Add Parent' : 'Add Teacher'}
          </span>
        </button>
      </div>

      {/* Tabs */}
      <div className={`flex border-b border-slate-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {(['students', 'parents', 'teachers'] as const).map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`
              px-6 py-3 font-medium text-sm transition-colors border-b-2 
              ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}
            `}>
            {lang === 'ar' ? tab === 'students' ? 'الطلاب' : tab === 'parents' ? 'أولياء الأمور' : 'المدرسين' : tab === 'students' ? 'Students' : tab === 'parents' ? 'Parents' : 'Teachers'}
          </button>)}
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 ${isRTL ? 'right-3' : 'left-3'}`} />
          <input type="text" placeholder={lang === 'ar' ? 'بحث...' : 'Search...'} className={`w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${isRTL ? 'pr-10 pl-4' : ''}`} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`w-full text-sm text-left ${isRTL ? 'text-right' : ''}`}>
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الاسم' : 'Name'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'اسم المستخدم' : 'Username'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الصف/المادة' : 'Grade/Subject'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'الحالة' : 'Status'}
                </th>
                <th className="px-6 py-4">
                  {lang === 'ar' ? 'إجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map(user => <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.username}</td>
                  <td className="px-6 py-4 text-slate-500">{user.grade}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status === 'active' ? lang === 'ar' ? 'نشط' : 'Active' : lang === 'ar' ? 'غير نشط' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
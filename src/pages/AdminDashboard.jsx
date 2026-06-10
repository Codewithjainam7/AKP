import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, LogIn, Save, LogOut, Download, Plus, Trash2, Edit2, Check, X,
  FileText, Award, Briefcase, GraduationCap, BookOpen, ShieldCheck, RefreshCw, AlertTriangle,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, User, Image, Type, Link2, BarChart2, ArrowUp, ArrowDown
} from 'lucide-react';
import { getDatabase, saveDatabase } from '../data/dbHelper';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [database, setDatabase] = useState(null);
  const [activeTab, setActiveTab] = useState('researchPapers'); // hero, researchPapers, patents, copyrights, certifications, experiences

  // Hero section specific state
  const [heroData, setHeroData] = useState(null);
  const [heroSaving, setHeroSaving] = useState(false);
  
  // CRUD states
  const [editingItem, setEditingItem] = useState(null); // The item currently being edited
  const [editIndex, setEditIndex] = useState(-1); // Index of item being edited
  const [isAdding, setIsAdding] = useState(false); // Whether we are adding a new item
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' }); // success, error, loading
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [warningPopup, setWarningPopup] = useState({ show: false, title: '', message: '' });
  const [certUploadType, setCertUploadType] = useState('image'); // 'image' or 'pdf' for certifications

  const defaultPassword = 'Amit@2026';

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      const db = getDatabase();
      setDatabase(db);
      if (db && db.hero) {
        setHeroData({ ...db.hero });
      } else {
        setHeroData({
          name: 'Amit',
          roleLabel: 'Academic Innovator',
          subtitle: 'Bridging the gap between cutting-edge <strong>Machine Learning</strong> research and scalable practical solutions.',
          profileImage: '/amit_sir_photo.png',
          ctaLabel: 'View Research',
          ctaLink: '/research',
          stats: [
            { value: '10', suffix: '+', label: 'Publications' },
            { value: '7', suffix: '+', label: 'Patents' }
          ]
        });
      }
    }
  }, []);

  // Reset page to 1 when changing tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Adjust page if it exceeds bounds (e.g. after deletion)
  useEffect(() => {
    if (database && database[activeTab]) {
      const items = database[activeTab] || [];
      const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }
  }, [database, activeTab, currentPage]);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const requiredPassword = envPassword || defaultPassword;

    if (password === requiredPassword) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setDatabase(getDatabase());
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Form templates for adding items
  const getEmptyItem = (type) => {
    switch (type) {
      case 'researchPapers':
        return {
          title: '',
          paperId: '',
          authors: 'Amit Kumar Pandey',
          date: '',
          category: 'Deep Learning',
          volume: 'Vol. 8, Issue 1',
          pages: '',
          description: '',
          pdf: '',
          link: ''
        };
      case 'patents':
        return {
          title: '',
          patentNo: '',
          date: new Date().getFullYear().toString(),
          status: 'Granted',
          category: 'Deep Learning',
          description: '',
          pdf: ''
        };
      case 'copyrights':
        return {
          title: '',
          regNo: '',
          date: new Date().getFullYear().toString(),
          category: 'Deep Learning',
          description: '',
          pdf: ''
        };
      case 'certifications':
        return {
          title: '',
          issuer: '',
          date: new Date().getFullYear().toString(),
          category: 'Deep Learning',
          description: '',
          image: 'https://placehold.co/800x600/1e293b/f97316?font=montserrat&text=Certification',
          pdf: null
        };
      case 'experiences':
        return {
          id: Date.now(),
          type: 'work',
          company: '',
          role: '',
          date: '',
          desc: '',
          current: false,
          tags: []
        };
      default:
        return {};
    }
  };

  // Start adding a new item
  const handleStartAdd = () => {
    setEditingItem(getEmptyItem(activeTab));
    setEditIndex(-1);
    setIsAdding(true);
    setCertUploadType('image'); // default to image for new certs
  };

  // Start editing an existing item
  const handleStartEdit = (item, index) => {
    // For tags input in experience, convert array to comma-separated string for easier editing
    let itemToEdit = { ...item };
    if (activeTab === 'experiences' && Array.isArray(item.tags)) {
      itemToEdit.tagsString = item.tags.join(', ');
    }
    setEditingItem(itemToEdit);
    setEditIndex(index);
    setIsAdding(false);
    
    // Set upload type based on whether pdf is present
    if (activeTab === 'certifications') {
      if (item.pdf) {
        setCertUploadType('pdf');
      } else {
        setCertUploadType('image');
      }
    }
  };

  // Handle input changes in the editing form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'image' && typeof value === 'string') {
      if (value.startsWith('data:')) {
        const base64Content = value.substring(value.indexOf(',') + 1);
        const sizeInBytes = Math.round((base64Content.length * 3) / 4);
        const MAX_SIZE = 5 * 1024 * 1024;
        if (sizeInBytes > MAX_SIZE) {
          const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
          setValidationError(`Image size must be less than 5MB. (Current size: ${sizeMB}MB)`);
          setWarningPopup({
            show: true,
            title: 'Image Too Large',
            message: `The pasted image is approx. ${sizeMB}MB, which exceeds the 5MB limit. Please compress your image or choose a smaller file.`
          });
        } else {
          setValidationError('');
        }
      } else {
        setValidationError('');
      }
    }

    if (name === 'pdf' && typeof value === 'string') {
      if (value.startsWith('data:')) {
        const base64Content = value.substring(value.indexOf(',') + 1);
        const sizeInBytes = Math.round((base64Content.length * 3) / 4);
        const MAX_SIZE = 5 * 1024 * 1024;
        if (sizeInBytes > MAX_SIZE) {
          const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
          setValidationError(`Document size must be less than 5MB. (Current size: ${sizeMB}MB)`);
          setWarningPopup({
            show: true,
            title: 'Document Too Large',
            message: `The pasted document is approx. ${sizeMB}MB, which exceeds the 5MB limit. Please compress your document or choose a smaller file.`
          });
        } else {
          setValidationError('');
        }
      } else {
        setValidationError('');
      }
    }

    setEditingItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle image upload with size limit check (5MB)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 5MB (5 * 1024 * 1024 bytes)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setValidationError(`Image size must be less than 5MB. (Selected file: ${sizeMB}MB)`);
      setWarningPopup({
        show: true,
        title: 'Image Too Large',
        message: `The selected image is ${sizeMB}MB, which exceeds the 5MB limit. Please compress your image or select a smaller file.`
      });
      e.target.value = ''; // Reset input
      return;
    }

    setValidationError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingItem(prev => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle PDF upload with size limit check (5MB)
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 5MB (5 * 1024 * 1024 bytes)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setValidationError(`Document size must be less than 5MB. (Selected file: ${sizeMB}MB)`);
      setWarningPopup({
        show: true,
        title: 'Document Too Large',
        message: `The selected document is ${sizeMB}MB, which exceeds the 5MB limit. Please compress your document or select a smaller file.`
      });
      e.target.value = ''; // Reset input
      return;
    }

    setValidationError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingItem(prev => ({
        ...prev,
        pdf: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Save item (update local state and auto-publish to disk/localStorage)
  const handleSaveItem = async (e) => {
    e.preventDefault();
    
    // Additional validation check on save
    if (editingItem) {
      if (editingItem.image && typeof editingItem.image === 'string' && editingItem.image.startsWith('data:')) {
        const base64Content = editingItem.image.substring(editingItem.image.indexOf(',') + 1);
        const sizeInBytes = Math.round((base64Content.length * 3) / 4);
        const MAX_SIZE = 5 * 1024 * 1024;
        if (sizeInBytes > MAX_SIZE) {
          const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
          setValidationError(`Image size must be less than 5MB. (Current size: ${sizeMB}MB)`);
          setWarningPopup({
            show: true,
            title: 'Image Too Large',
            message: `The current image is approx. ${sizeMB}MB, which exceeds the 5MB limit. Please compress your image or choose a smaller file.`
          });
          return;
        }
      }
      if (editingItem.pdf && typeof editingItem.pdf === 'string' && editingItem.pdf.startsWith('data:')) {
        const base64Content = editingItem.pdf.substring(editingItem.pdf.indexOf(',') + 1);
        const sizeInBytes = Math.round((base64Content.length * 3) / 4);
        const MAX_SIZE = 5 * 1024 * 1024;
        if (sizeInBytes > MAX_SIZE) {
          const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
          setValidationError(`Document size must be less than 5MB. (Current size: ${sizeMB}MB)`);
          setWarningPopup({
            show: true,
            title: 'Document Too Large',
            message: `The current document is approx. ${sizeMB}MB, which exceeds the 5MB limit. Please compress your document or choose a smaller file.`
          });
          return;
        }
      }
    }

    if (validationError) return;
    if (!database) return;

    const updatedList = [...(database[activeTab] || [])];
    let finalItem = { ...editingItem };

    // Post-process certifications based on active upload type (Image or PDF)
    if (activeTab === 'certifications') {
      if (certUploadType === 'image') {
        finalItem.pdf = null;
        if (!finalItem.image || finalItem.image === 'https://placehold.co/800x600/1e293b/f97316?font=montserrat&text=PDF\\nDocument') {
          finalItem.image = 'https://placehold.co/800x600/1e293b/f97316?font=montserrat&text=Certification';
        }
      } else {
        finalItem.image = 'https://placehold.co/800x600/1e293b/f97316?font=montserrat&text=PDF\\nDocument';
        if (!finalItem.pdf) {
          setValidationError('Please select or upload a PDF document.');
          setWarningPopup({
            show: true,
            title: 'Missing Document',
            message: 'You have selected PDF Document type but no PDF link or file has been uploaded. Please add a PDF to save.'
          });
          return;
        }
      }
    }

    // Post-process experience tags
    if (activeTab === 'experiences') {
      if (finalItem.tagsString !== undefined) {
        finalItem.tags = finalItem.tagsString
          .split(',')
          .map(t => t.trim())
          .filter(t => t.length > 0);
        delete finalItem.tagsString;
      }
    }

    if (isAdding) {
      updatedList.push(finalItem);
    } else {
      updatedList[editIndex] = finalItem;
    }

    const updatedDb = {
      ...database,
      [activeTab]: updatedList
    };

    setDatabase(updatedDb);
    setEditingItem(null);
    setEditIndex(-1);
    setIsAdding(false);
    setHasUnsavedChanges(false);

    // Auto-save changes immediately
    setSaveStatus({ type: 'loading', message: 'Publishing changes...' });
    try {
      const result = await saveDatabase(updatedDb);
      if (result.method === 'disk') {
        setSaveStatus({ type: 'success', message: 'Changes saved and published to disk!' });
      } else {
        setSaveStatus({ type: 'success', message: 'Changes saved locally! Download JSON to backup.' });
      }
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 4000);
    } catch (err) {
      setSaveStatus({ type: 'error', message: `Auto-save failed: ${err.message}` });
    }
  };

  // Delete item and auto-publish
  const handleDeleteItem = async (index) => {
    if (!database) return;
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    const updatedList = [...(database[activeTab] || [])];
    updatedList.splice(index, 1);

    const updatedDb = {
      ...database,
      [activeTab]: updatedList
    };

    setDatabase(updatedDb);
    setHasUnsavedChanges(false);

    // Auto-save changes immediately
    setSaveStatus({ type: 'loading', message: 'Deleting entry...' });
    try {
      const result = await saveDatabase(updatedDb);
      if (result.method === 'disk') {
        setSaveStatus({ type: 'success', message: 'Entry deleted and saved to disk!' });
      } else {
        setSaveStatus({ type: 'success', message: 'Entry deleted locally! Download JSON to backup.' });
      }
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 4000);
    } catch (err) {
      setSaveStatus({ type: 'error', message: `Delete failed to save: ${err.message}` });
    }
  };

  // Reorder item (move up or down) and auto-save
  const handleReorderItem = async (index, direction) => {
    if (!database) return;
    const list = [...(database[activeTab] || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    // Swap
    [list[index], list[targetIndex]] = [list[targetIndex], list[index]];

    const updatedDb = { ...database, [activeTab]: list };
    setDatabase(updatedDb);

    try {
      await saveDatabase(updatedDb);
      setSaveStatus({ type: 'success', message: 'Order updated!' });
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 2500);
    } catch (err) {
      setSaveStatus({ type: 'error', message: `Reorder failed: ${err.message}` });
    }
  };

  // Cancel edit/add
  const handleCancel = () => {
    setEditingItem(null);
    setEditIndex(-1);
    setIsAdding(false);
    setValidationError('');
  };

  // Publish changes (save to disk/localStorage)
  const handlePublish = async () => {
    if (!database) return;
    setSaveStatus({ type: 'loading', message: 'Publishing changes...' });
    
    try {
      const result = await saveDatabase(database);
      setHasUnsavedChanges(false);
      
      if (result.method === 'disk') {
        setSaveStatus({ 
          type: 'success', 
          message: 'Changes published successfully! Saved directly to db.json.' 
        });
      } else {
        setSaveStatus({ 
          type: 'success', 
          message: 'Changes saved locally! Download the file below to commit back to Git.' 
        });
      }

      setTimeout(() => setSaveStatus({ type: '', message: '' }), 5000);
    } catch (err) {
      setSaveStatus({ 
        type: 'error', 
        message: `Failed to save: ${err.message}` 
      });
    }
  };

  // Download DB as JSON backup
  const handleDownloadBackup = () => {
    if (!database) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(database, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "db.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center px-4 relative overflow-hidden font-sans">
        {/* Colorful background blobs with floating animations */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary-600/10 blur-[150px] rounded-full animate-blob pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-primary-500/5 blur-[120px] rounded-full animate-blob animation-delay-4000 pointer-events-none" />
        
        <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-8 md:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.8)] relative z-10 text-white transition-all duration-500 hover:border-white/[0.09]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-primary-600 to-orange-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-primary-600/20 relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
              <Lock size={26} className="text-white relative z-10 transition-transform duration-350 group-hover:scale-110" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent" style={{ fontFamily: 'Syne, sans-serif' }}>
              Admin Portal
            </h1>
            <p className="text-slate-400 text-sm text-center mt-2.5 leading-relaxed">
              Enter your authentication password to update the portfolio.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                Secret Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] focus:border-primary-500 focus:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-primary-500/15 text-white font-medium transition-all placeholder-slate-600 text-sm"
                required
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2.5 text-red-400 bg-red-950/20 border border-red-500/20 rounded-xl p-3.5 text-xs font-medium">
                <AlertTriangle size={15} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-orange-600 hover:from-primary-500 hover:to-orange-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 hover:shadow-primary-600/30 font-sans"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <LogIn size={18} />
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-[#070709] text-slate-100 font-sans pb-20 pt-28">
      {/* Background elements with subtle float animations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 blur-[120px] rounded-full pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none animate-blob animation-delay-2000" />
      <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] bg-primary-500/3 blur-[130px] rounded-full pointer-events-none animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header Bar */}
        <div className="bg-[#111115]/50 backdrop-blur-xl border border-white/[0.05] rounded-[28px] p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-extrabold uppercase tracking-widest">
                Secure Access
              </span>
              {hasUnsavedChanges && (
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                  <AlertTriangle size={11} /> Unsaved Changes
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mt-2 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Portfolio Console
            </h1>
            <p className="text-slate-400 text-sm mt-1.5">
              Add, update or remove items from the academic showcase.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full sm:flex sm:flex-wrap sm:items-center sm:w-auto">
            <button
              disabled
              title="Backup JSON is disabled"
              className="col-span-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-600 font-semibold text-xs sm:text-sm w-full sm:w-auto order-3 sm:order-1 opacity-25 cursor-not-allowed pointer-events-none"
            >
              <Download size={16} />
              Backup JSON (Disabled)
            </button>
            <button
              onClick={handlePublish}
              disabled={saveStatus.type === 'loading'}
              className="flex items-center justify-center gap-1.5 px-3 py-3 sm:px-6 rounded-xl bg-gradient-to-r from-primary-600 to-orange-600 hover:from-primary-500 hover:to-orange-500 disabled:opacity-50 disabled:pointer-events-none text-white font-bold text-xs sm:text-sm shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 transition-all active:scale-95 transform hover:-translate-y-0.5 w-full sm:w-auto order-1 sm:order-2"
            >
              {saveStatus.type === 'loading' ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              Publish Changes
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-3 py-3 sm:px-5 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/15 hover:border-red-500/25 text-red-400 hover:text-red-300 font-semibold text-xs sm:text-sm transition-all active:scale-95 w-full sm:w-auto order-2 sm:order-3"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        {/* Save status Toast Popup */}
        {saveStatus.message && (
          <div className="fixed top-24 right-4 sm:right-6 max-w-sm w-[calc(100%-32px)] sm:w-[360px] z-[100] animate-toast-right">
            <div className={`p-4.5 rounded-2xl border backdrop-blur-xl flex items-center justify-between gap-4 shadow-2xl transition-all duration-300 ${
              saveStatus.type === 'success' 
                ? 'bg-[#062016]/90 border-emerald-500/30 text-emerald-400 shadow-[0_20px_50px_rgba(16,185,129,0.15)]' 
                : saveStatus.type === 'error'
                ? 'bg-[#22070c]/90 border-red-500/30 text-red-400 shadow-[0_20px_50px_rgba(239,68,68,0.15)]'
                : 'bg-[#061022]/90 border-blue-500/30 text-blue-400 shadow-[0_20px_50px_rgba(59,130,246,0.15)]'
            }`}>
              <div className="flex items-center gap-3">
                {saveStatus.type === 'success' ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check size={16} />
                  </div>
                ) : saveStatus.type === 'loading' ? (
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <RefreshCw size={16} className="animate-spin" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                )}
                <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {saveStatus.message}
                </span>
              </div>
              
              {saveStatus.type !== 'loading' && (
                <button 
                  onClick={() => setSaveStatus({ type: '', message: '' })}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all active:scale-95 shrink-0"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Side Tabs Navigation */}
          <div className="space-y-4 lg:space-y-2 lg:block w-full">
            {/* Mobile / Tablet Tab Selector Dropdown Toggle */}
            <div className="lg:hidden relative">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                Active Category
              </label>
              {(() => {
                const tabs = [
                  { id: 'hero', label: 'Hero Section', icon: User },
                  { id: 'researchPapers', label: 'Research Papers', icon: BookOpen },
                  { id: 'patents', label: 'Design Patents', icon: FileText },
                  { id: 'copyrights', label: 'Copyrights', icon: ShieldCheck },
                  { id: 'certifications', label: 'Certifications', icon: Award },
                  { id: 'experiences', label: 'Experiences', icon: Briefcase }
                ];
                const active = tabs.find(t => t.id === activeTab);
                const ActiveIcon = active.icon;
                const count = active.id === 'hero' ? 1 : (database ? (database[active.id] || []).length : 0);
                
                return (
                  <>
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl text-left font-bold text-sm tracking-wide bg-[#121216]/60 backdrop-blur-xl text-white border border-white/[0.08] transition-all shadow-lg active:scale-[0.99] hover:bg-[#121216]/80"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      <div className="flex items-center gap-3">
                        <ActiveIcon size={18} className="text-primary-500 animate-pulse" />
                        <span>{active.label}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-black bg-primary-600/20 text-primary-400 border border-primary-500/10">
                          {count}
                        </span>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180 text-white' : ''}`} />
                      </div>
                    </button>
                    
                    {/* Dropdown Options List Menu */}
                    {isMobileMenuOpen && (
                      <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#111116]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-2 shadow-2xl z-50 space-y-1.5 animate-dropdown-open">
                        {tabs.map(tab => {
                          const Icon = tab.icon;
                          const isActive = activeTab === tab.id;
                          const tabCount = tab.id === 'hero' ? 1 : (database ? (database[tab.id] || []).length : 0);
                          return (
                            <button
                              key={tab.id}
                              onClick={() => {
                                setActiveTab(tab.id);
                                handleCancel();
                                setIsMobileMenuOpen(false);
                              }}
                              className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left font-bold text-xs tracking-wide transition-all border ${
                                isActive
                                  ? 'bg-gradient-to-r from-primary-600/20 to-orange-600/20 text-primary-400 border-primary-500/30'
                                  : 'bg-transparent text-slate-400 border-transparent hover:bg-white/[0.03] hover:text-white'
                              }`}
                              style={{ fontFamily: 'Syne, sans-serif' }}
                            >
                              <div className="flex items-center gap-3">
                                <Icon size={16} className={isActive ? 'text-primary-400' : 'text-slate-500'} />
                                <span>{tab.label}</span>
                              </div>
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${isActive ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20' : 'bg-slate-900/60 text-slate-500'}`}>
                                {tabCount}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Desktop Tab Sidebar (Hidden on mobile/tablet) */}
            <div className="hidden lg:flex lg:flex-col gap-2">
              {[
                { id: 'hero', label: 'Hero Section', icon: User },
                { id: 'researchPapers', label: 'Research Papers', icon: BookOpen },
                { id: 'patents', label: 'Design Patents', icon: FileText },
                { id: 'copyrights', label: 'Copyrights', icon: ShieldCheck },
                { id: 'certifications', label: 'Certifications', icon: Award },
                { id: 'experiences', label: 'Experiences', icon: Briefcase }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const count = tab.id === 'hero' ? 1 : (database ? (database[tab.id] || []).length : 0);
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      handleCancel();
                    }}
                    className={`flex items-center justify-between p-4 rounded-2xl text-left font-bold text-sm tracking-wide transition-all border w-full ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary-600 to-orange-600 text-white border-primary-500 shadow-lg shadow-primary-600/15 scale-[1.02]' 
                        : 'bg-[#121216]/40 backdrop-blur-md text-slate-400 border-white/[0.04] hover:border-white/[0.08] hover:bg-[#121216]/70 hover:text-white'
                    }`}
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-white animate-pulse' : 'text-slate-500'} />
                      <span>{tab.label}</span>
                    </div>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black transition-all ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800/80 text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Workspace */}
          <div className="lg:col-span-3 space-y-8">

            {/* ═══════════════════════════════════════════════════════ */}
            {/* HERO SECTION EDITOR */}
            {/* ═══════════════════════════════════════════════════════ */}
            {activeTab === 'hero' && heroData && (
              <div className="bg-[#121216]/50 backdrop-blur-xl border border-white/[0.05] rounded-[32px] p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-orange-500 flex items-center justify-center shadow-lg shadow-primary-600/20">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Hero Section</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Edit the main landing section of the portfolio.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Profile Image */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                      <Image size={12} /> Profile Picture
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {/* Preview */}
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5 shrink-0 flex items-center justify-center">
                        {heroData.profileImage ? (
                          <img src={heroData.profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                        ) : (
                          <User size={32} className="text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-3 w-full">
                        <input
                          type="text"
                          value={heroData.profileImage || ''}
                          onChange={(e) => setHeroData(prev => ({ ...prev, profileImage: e.target.value }))}
                          placeholder="/path/to/image.png or https://..."
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:outline-none text-white text-sm transition-all placeholder-slate-500"
                        />
                        <label className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] text-slate-300 hover:text-white font-semibold text-sm transition-all cursor-pointer active:scale-95">
                          <span>Upload Image (max 5MB)</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (file.size > 5 * 1024 * 1024) {
                                setWarningPopup({ show: true, title: 'File Too Large', message: 'Profile image must be under 5MB. Please choose a smaller file.' });
                                e.target.value = '';
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setHeroData(prev => ({ ...prev, profileImage: ev.target.result }));
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                      <Type size={12} /> Display Name
                    </label>
                    <input
                      type="text"
                      value={heroData.name || ''}
                      onChange={(e) => setHeroData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Amit"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:outline-none text-white text-sm transition-all placeholder-slate-500"
                    />
                    <p className="text-slate-500 text-[11px] mt-1.5">Shown as: I'm <strong className="text-slate-300">{heroData.name}</strong>,</p>
                  </div>

                  {/* Role Label */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                      <Type size={12} /> Role / Title Label
                    </label>
                    <input
                      type="text"
                      value={heroData.roleLabel || ''}
                      onChange={(e) => setHeroData(prev => ({ ...prev, roleLabel: e.target.value }))}
                      placeholder="e.g. Academic Innovator"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:outline-none text-white text-sm transition-all placeholder-slate-500"
                    />
                    <p className="text-slate-500 text-[11px] mt-1.5">The last word gets the orange underline accent.</p>
                  </div>

                  {/* Subtitle */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                      <Type size={12} /> Subtitle / Description
                    </label>
                    <textarea
                      rows={3}
                      value={heroData.subtitle || ''}
                      onChange={(e) => setHeroData(prev => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="Short description shown below the title..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:outline-none text-white text-sm transition-all placeholder-slate-500 resize-none"
                    />
                    <p className="text-slate-500 text-[11px] mt-1.5">HTML is supported, e.g. &lt;strong&gt;Machine Learning&lt;/strong&gt;</p>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                      <Link2 size={12} /> CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={heroData.ctaLabel || ''}
                      onChange={(e) => setHeroData(prev => ({ ...prev, ctaLabel: e.target.value }))}
                      placeholder="e.g. View Research"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:outline-none text-white text-sm transition-all placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                      <Link2 size={12} /> CTA Button Link
                    </label>
                    <input
                      type="text"
                      value={heroData.ctaLink || ''}
                      onChange={(e) => setHeroData(prev => ({ ...prev, ctaLink: e.target.value }))}
                      placeholder="e.g. /research or https://..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:outline-none text-white text-sm transition-all placeholder-slate-500"
                    />
                  </div>

                  {/* Auto Stats Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart2 size={12} className="text-slate-400" />
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Stats Counters</label>
                      <span className="ml-auto text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">Auto-Computed</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                        <span className="text-slate-400 text-sm">Publications</span>
                        <span className="text-white font-bold text-sm">{(database?.researchPapers || []).length}+</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                        <span className="text-slate-400 text-sm">Patents</span>
                        <span className="text-white font-bold text-sm">{(database?.patents || []).length}+</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-slate-400 text-sm">Certifications</span>
                        <span className="text-white font-bold text-sm">{(database?.certifications || []).length}+</span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-2">
                      These numbers update automatically when you add or remove research papers, patents, or certifications — no manual editing needed.
                    </p>
                  </div>

                </div>


                {/* Save Hero Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    disabled={heroSaving}
                    onClick={() => {
                      try {
                        setHeroSaving(true);
                        const updatedDb = { ...database, hero: heroData };
                        setDatabase(updatedDb);
                        saveDatabase(updatedDb);
                        setHasUnsavedChanges(false);
                        setSaveStatus({ type: 'success', message: 'Hero section saved! Changes are live.' });
                        setTimeout(() => setSaveStatus({ type: '', message: '' }), 5000);
                      } catch (err) {
                        setSaveStatus({ type: 'error', message: `Failed to save: ${err.message}` });
                      } finally {
                        setHeroSaving(false);
                      }
                    }}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-orange-600 hover:from-primary-500 hover:to-orange-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-primary-600/20 transition-all active:scale-95 transform hover:-translate-y-0.5"
                  >
                    {heroSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Hero Section
                  </button>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════ */}
            {/* REGULAR ITEM EDITOR FORM (only when NOT on hero tab) */}
            {/* ═══════════════════════════════════════════════════════ */}
            {activeTab !== 'hero' && editingItem && (
              <div className="bg-[#121216]/50 backdrop-blur-xl border border-white/[0.05] rounded-[32px] p-6 md:p-8 shadow-2xl relative">
                <button 
                  onClick={handleCancel}
                  className="absolute top-6 right-6 text-slate-450 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
                >
                  <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {isAdding ? <Plus size={20} /> : <Edit2 size={18} />}
                  {isAdding ? 'Add New Item' : 'Edit Item Details'}
                </h2>

                <form onSubmit={handleSaveItem} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Common fields (Title) */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editingItem.title || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                        required
                      />
                    </div>

                    {/* Research specific fields */}
                    {activeTab === 'researchPapers' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Paper ID</label>
                          <input
                            type="text"
                            name="paperId"
                            value={editingItem.paperId || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Authors</label>
                          <input
                            type="text"
                            name="authors"
                            value={editingItem.authors || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Date (e.g. December 2023)</label>
                          <input
                            type="text"
                            name="date"
                            value={editingItem.date || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category</label>
                          <input
                            type="text"
                            name="category"
                            value={editingItem.category || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Volume (e.g. Vol. 7, Issue 6)</label>
                          <input
                            type="text"
                            name="volume"
                            value={editingItem.volume || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pages (e.g. 159–163)</label>
                          <input
                            type="text"
                            name="pages"
                            value={editingItem.pages || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">PDF Document Link</label>
                          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-stretch">
                            <div className="flex-1 w-full">
                              <input
                                type="text"
                                name="pdf"
                                value={editingItem.pdf || ''}
                                onChange={handleInputChange}
                                placeholder="Paste PDF link or upload a file..."
                                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 font-sans"
                              />
                            </div>
                            <label className="relative flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] text-slate-300 hover:text-white font-semibold text-sm transition-all active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto text-center font-sans">
                              <span>Upload PDF</span>
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={handlePdfUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          {editingItem.pdf && editingItem.pdf.startsWith('data:') && (
                            <div className="mt-3 relative inline-block">
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-red-400 font-sans">
                                <span>PDF Document Uploaded</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingItem(prev => ({ ...prev, pdf: '' }));
                                    setValidationError('');
                                  }}
                                  className="bg-red-600 hover:bg-red-500 text-white rounded-full p-0.5 shadow-md transition-all active:scale-90"
                                >
                                  <X size={8} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Web Detail Link</label>
                          <input
                            type="text"
                            name="link"
                            value={editingItem.link || ''}
                            onChange={handleInputChange}
                            placeholder="https://..."
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Abstract / Description</label>
                          <textarea
                            name="description"
                            value={editingItem.description || ''}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 resize-none"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Patents specific fields */}
                    {activeTab === 'patents' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Patent Number</label>
                          <input
                            type="text"
                            name="patentNo"
                            value={editingItem.patentNo || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Filing Date (e.g. 2025)</label>
                          <input
                            type="text"
                            name="date"
                            value={editingItem.date || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Status</label>
                          <select
                            name="status"
                            value={editingItem.status || 'Granted'}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-[#121216] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 bg-[#121216]"
                          >
                            <option value="Granted">Granted</option>
                            <option value="Filed">Filed / Pending</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category</label>
                          <input
                            type="text"
                            name="category"
                            value={editingItem.category || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Certificate PDF File Path</label>
                          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-stretch">
                            <div className="flex-1 w-full">
                              <input
                                type="text"
                                name="pdf"
                                value={editingItem.pdf || ''}
                                onChange={handleInputChange}
                                placeholder="Paste PDF link or upload a file..."
                                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 font-sans"
                                required
                              />
                            </div>
                            <label className="relative flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] text-slate-300 hover:text-white font-semibold text-sm transition-all active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto text-center font-sans">
                              <span>Upload PDF</span>
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={handlePdfUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          {editingItem.pdf && editingItem.pdf.startsWith('data:') && (
                            <div className="mt-3 relative inline-block">
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-red-400 font-sans">
                                <span>PDF Document Uploaded</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingItem(prev => ({ ...prev, pdf: '' }));
                                    setValidationError('');
                                  }}
                                  className="bg-red-600 hover:bg-red-500 text-white rounded-full p-0.5 shadow-md transition-all active:scale-90"
                                >
                                  <X size={8} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</label>
                          <textarea
                            name="description"
                            value={editingItem.description || ''}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 resize-none"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Copyrights specific fields */}
                    {activeTab === 'copyrights' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Registration Number</label>
                          <input
                            type="text"
                            name="regNo"
                            value={editingItem.regNo || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Registration Date (e.g. 2024)</label>
                          <input
                            type="text"
                            name="date"
                            value={editingItem.date || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category</label>
                          <input
                            type="text"
                            name="category"
                            value={editingItem.category || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Certificate PDF File Path</label>
                          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-stretch">
                            <div className="flex-1 w-full">
                              <input
                                type="text"
                                name="pdf"
                                value={editingItem.pdf || ''}
                                onChange={handleInputChange}
                                placeholder="Paste PDF link or upload a file..."
                                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 font-sans"
                                required
                              />
                            </div>
                            <label className="relative flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] text-slate-300 hover:text-white font-semibold text-sm transition-all active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto text-center font-sans">
                              <span>Upload PDF</span>
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={handlePdfUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          {editingItem.pdf && editingItem.pdf.startsWith('data:') && (
                            <div className="mt-3 relative inline-block">
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-red-400 font-sans">
                                <span>PDF Document Uploaded</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingItem(prev => ({ ...prev, pdf: '' }));
                                    setValidationError('');
                                  }}
                                  className="bg-red-600 hover:bg-red-500 text-white rounded-full p-0.5 shadow-md transition-all active:scale-90"
                                >
                                  <X size={8} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</label>
                          <textarea
                            name="description"
                            value={editingItem.description || ''}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 resize-none"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Certifications specific fields */}
                    {activeTab === 'certifications' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Issuer</label>
                          <input
                            type="text"
                            name="issuer"
                            value={editingItem.issuer || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Year Earned (e.g. 2023)</label>
                          <input
                            type="text"
                            name="date"
                            value={editingItem.date || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category</label>
                          <input
                            type="text"
                            name="category"
                            value={editingItem.category || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Certification Format</label>
                          <div className="flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] max-w-xs">
                            <button
                              type="button"
                              onClick={() => {
                                setCertUploadType('image');
                                setValidationError('');
                              }}
                              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                                certUploadType === 'image'
                                  ? 'bg-gradient-to-r from-primary-600 to-orange-600 text-white shadow-md'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              Image / Image Link
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setCertUploadType('pdf');
                                setValidationError('');
                              }}
                              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                                certUploadType === 'pdf'
                                  ? 'bg-gradient-to-r from-primary-600 to-orange-600 text-white shadow-md'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              PDF Document
                            </button>
                          </div>
                        </div>

                        {certUploadType === 'image' ? (
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Certification Image / Thumbnail</label>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-stretch">
                              <div className="flex-1 w-full">
                                <input
                                  type="text"
                                  name="image"
                                  value={editingItem.image || ''}
                                  onChange={handleInputChange}
                                  placeholder="Paste image link or upload a file..."
                                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 font-sans"
                                  required={certUploadType === 'image'}
                                />
                              </div>
                              <label className="relative flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] text-slate-300 hover:text-white font-semibold text-sm transition-all active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto text-center font-sans">
                                <span>Upload Image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            
                            {editingItem.image && editingItem.image.startsWith('data:image/') && (
                              <div className="mt-3 relative inline-block">
                                <img 
                                  src={editingItem.image} 
                                  alt="Preview" 
                                  className="w-24 h-16 object-cover rounded-xl border border-white/[0.08]" 
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingItem(prev => ({ ...prev, image: '' }));
                                    setValidationError('');
                                  }}
                                  className="absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full p-1 shadow-md transition-all active:scale-90"
                                >
                                  <X size={10} />
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Optional PDF Link (for lightbox preview)</label>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-stretch">
                              <div className="flex-1 w-full">
                                <input
                                  type="text"
                                  name="pdf"
                                  value={editingItem.pdf || ''}
                                  onChange={handleInputChange}
                                  placeholder="Paste PDF link or upload a file..."
                                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 font-sans"
                                  required={certUploadType === 'pdf'}
                                />
                              </div>
                              <label className="relative flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] text-slate-300 hover:text-white font-semibold text-sm transition-all active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto text-center font-sans">
                                <span>Upload PDF</span>
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  onChange={handlePdfUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            {editingItem.pdf && editingItem.pdf.startsWith('data:') && (
                              <div className="mt-3 relative inline-block">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-red-400 font-sans">
                                  <span>PDF Document Uploaded</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingItem(prev => ({ ...prev, pdf: '' }));
                                      setValidationError('');
                                    }}
                                    className="bg-red-600 hover:bg-red-500 text-white rounded-full p-0.5 shadow-md transition-all active:scale-90"
                                  >
                                    <X size={8} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</label>
                          <textarea
                            name="description"
                            value={editingItem.description || ''}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 resize-none"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Experiences specific fields */}
                    {activeTab === 'experiences' && (
                      <>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Experience Type</label>
                          <select
                            name="type"
                            value={editingItem.type || 'work'}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-[#121216] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 bg-[#121216]"
                          >
                            <option value="work">Work (Professional)</option>
                            <option value="edu">Education (Academic)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Company / Institution</label>
                          <input
                            type="text"
                            name="company"
                            value={editingItem.company || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Role / Degree Title</label>
                          <input
                            type="text"
                            name="role"
                            value={editingItem.role || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Duration (e.g. 2024 – Present)</label>
                          <input
                            type="text"
                            name="date"
                            value={editingItem.date || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tags / Keywords (comma separated)</label>
                          <input
                            type="text"
                            name="tagsString"
                            value={editingItem.tagsString || ''}
                            onChange={handleInputChange}
                            placeholder="AI, ML, Research, Python"
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500"
                          />
                        </div>
                        <div className="flex items-center gap-2 md:col-span-2 py-2">
                          <input
                            type="checkbox"
                            name="current"
                            id="current"
                            checked={editingItem.current || false}
                            onChange={handleInputChange}
                            className="w-4 h-4 rounded border-slate-800 bg-white/5 text-primary-600 focus:ring-0"
                          />
                          <label htmlFor="current" className="text-sm font-semibold text-slate-300 select-none">
                            Mark as Currently Active
                          </label>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</label>
                          <textarea
                            name="desc"
                            value={editingItem.desc || ''}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-primary-500 focus:bg-white/[0.05] focus:outline-none text-white text-sm transition-all focus:ring-2 focus:ring-primary-500/10 placeholder-slate-500 resize-none"
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {validationError && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-500/30 rounded-xl p-3 text-xs mt-3 mb-2 font-sans">
                      <AlertTriangle size={14} className="shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-primary-600 to-orange-600 hover:from-primary-500 hover:to-orange-500 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-primary-600/15 transition-all active:scale-95 transform hover:-translate-y-0.5"
                    >
                      <Check size={16} />
                      Save Item
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12] text-slate-300 hover:text-white font-semibold rounded-xl text-sm flex items-center gap-2 transition-all active:scale-95"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
 
            {/* List and CRUD actions view */}
            {!editingItem && database && activeTab !== 'hero' && (
              <div className="bg-[#121216]/50 backdrop-blur-xl border border-white/[0.05] rounded-[32px] p-6 md:p-8 shadow-[0_24px_48px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Showcase Items
                    </h2>
                    <p className="text-xs text-slate-500 mt-1.5">
                      Manage listings displayed on your website
                    </p>
                  </div>
                  <button
                    onClick={handleStartAdd}
                    className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-gradient-to-r from-primary-600 to-orange-600 hover:from-primary-500 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-md shadow-primary-600/10 hover:shadow-primary-600/20 transform hover:-translate-y-0.5 self-start sm:self-auto shrink-0"
                  >
                    <Plus size={14} />
                    Add Entry
                  </button>
                </div>

                {/* Database List */}
                <div className="space-y-4">
                  {(database[activeTab] || []).length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
                      <AlertTriangle size={36} className="text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No items found in this section.</p>
                      <button 
                        onClick={handleStartAdd}
                        className="mt-3 text-xs text-primary-500 font-bold uppercase hover:underline"
                      >
                        Create the first entry
                      </button>
                    </div>
                  ) : (
                    (() => {
                      const items = database[activeTab] || [];
                      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                      const endIndex = startIndex + ITEMS_PER_PAGE;
                      const currentItems = items.slice(startIndex, endIndex);

                      return currentItems.map((item, i) => {
                        const originalIndex = startIndex + i;
                        return (
                          <div 
                            key={originalIndex} 
                            className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-[#17171d]/20 hover:bg-[#17171d]/50 border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 gap-5 shadow-sm hover:shadow-md hover:scale-[1.005]"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                                {/* Type / Category badge */}
                                <span className={`px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest border rounded-lg ${
                                  item.type === 'work'
                                    ? 'bg-primary-500/10 text-primary-400 border-primary-500/20'
                                    : item.type === 'edu'
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    : 'bg-primary-500/10 text-primary-400 border-primary-500/20'
                                }`}>
                                  {item.category || (item.type === 'work' ? '💼 Work' : item.type === 'edu' ? '🎓 Education' : 'Item')}
                                </span>
                                {item.current && (
                                  <span className="px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg animate-pulse">
                                    ● Active
                                  </span>
                                )}
                                {item.patentNo && (
                                  <span className="px-2 py-0.5 text-[9px] font-semibold text-slate-400 bg-slate-900/60 rounded-md border border-white/[0.04] font-mono">
                                    Patent: {item.patentNo}
                                  </span>
                                )}
                                {item.regNo && (
                                  <span className="px-2 py-0.5 text-[9px] font-semibold text-slate-400 bg-slate-900/60 rounded-md border border-white/[0.04] font-mono">
                                    Reg: {item.regNo}
                                  </span>
                                )}
                                {item.issuer && (
                                  <span className="px-2 py-0.5 text-[9px] font-semibold text-slate-400 bg-slate-900/60 rounded-md border border-white/[0.04]">
                                    {item.issuer}
                                  </span>
                                )}
                                {/* Date for experiences */}
                                {item.date && (item.type === 'work' || item.type === 'edu') && (
                                  <span className="px-2 py-0.5 text-[9px] font-semibold text-slate-500 bg-slate-900/40 rounded-md border border-white/[0.04]">
                                    {item.date}
                                  </span>
                                )}
                              </div>
                              
                              <h3 className="text-base font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                                {item.title || item.role || 'Untitled'}
                              </h3>
                              
                              {/* Company / Institution for experiences */}
                              {item.company && (
                                <p className="text-xs text-primary-500/70 font-semibold mt-0.5 line-clamp-1">
                                  {item.company}
                                </p>
                              )}
                              
                              <p className="text-xs text-slate-400 line-clamp-2 mt-1 max-w-2xl leading-relaxed">
                                {item.description || item.desc || 'No description provided.'}
                              </p>
                            </div>


                            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                              {/* Up / Down reorder — only for Experiences tab */}
                              {activeTab === 'experiences' && (
                                <div className="flex flex-col gap-1">
                                  <button
                                    onClick={() => handleReorderItem(originalIndex, 'up')}
                                    disabled={originalIndex === 0}
                                    className="p-1.5 bg-white/[0.03] hover:bg-white/[0.08] text-slate-500 hover:text-white rounded-lg border border-white/[0.05] hover:border-white/[0.12] transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none"
                                    title="Move up"
                                  >
                                    <ChevronUp size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleReorderItem(originalIndex, 'down')}
                                    disabled={originalIndex === (database[activeTab] || []).length - 1}
                                    className="p-1.5 bg-white/[0.03] hover:bg-white/[0.08] text-slate-500 hover:text-white rounded-lg border border-white/[0.05] hover:border-white/[0.12] transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none"
                                    title="Move down"
                                  >
                                    <ChevronDown size={13} />
                                  </button>
                                </div>
                              )}
                              <button
                                onClick={() => handleStartEdit(item, originalIndex)}
                                className="p-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all active:scale-95 shadow-sm"
                                title="Edit details"
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(originalIndex)}
                                className="p-2.5 bg-red-500/5 hover:bg-red-500/15 text-red-400 hover:text-red-300 rounded-xl border border-red-500/10 hover:border-red-500/20 transition-all active:scale-95 shadow-sm"
                                title="Delete entry"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        );
                      });
                    })()
                  )}
                </div>

                {/* Sliding Pagination Controls */}
                {(() => {
                  const items = database[activeTab] || [];
                  const totalItems = items.length;
                  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
                  
                  if (totalPages <= 1) return null;

                  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                  const endIndex = startIndex + ITEMS_PER_PAGE;

                  return (
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-800 mt-6 gap-4">
                      <div className="text-xs text-slate-500 font-medium order-2 sm:order-1">
                        Showing <span className="text-slate-300 font-bold">{startIndex + 1}</span> to{' '}
                        <span className="text-slate-300 font-bold">
                          {Math.min(endIndex, totalItems)}
                        </span>{' '}
                        of <span className="text-slate-300 font-bold">{totalItems}</span> entries
                      </div>
                      
                      <div className="flex items-center gap-2.5 order-1 sm:order-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800/80 disabled:pointer-events-none text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all flex items-center justify-center active:scale-95 group"
                          title="Previous Page"
                        >
                          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        </button>
                        
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: totalPages }).map((_, i) => {
                            const pageNum = i + 1;
                            const isActive = pageNum === currentPage;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all border ${
                                  isActive
                                    ? 'bg-primary-600 border-primary-500 text-white shadow-md shadow-primary-600/10 scale-105'
                                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:text-white text-slate-400 font-sans'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800/80 disabled:pointer-events-none text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all flex items-center justify-center active:scale-95 group"
                          title="Next Page"
                        >
                          <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Premium size validation error popup modal */}
      {warningPopup.show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0a0a0c]/80 backdrop-blur-md animate-popup-backdrop">
          <div className="bg-[#121216]/95 border border-red-500/20 rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-red-950/20 text-center relative animate-popup-scale font-sans">
            <button 
              onClick={() => setWarningPopup({ show: false, title: '', message: '' })}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-5 text-red-500 animate-pulse">
              <AlertTriangle size={28} />
            </div>

            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              {warningPopup.title}
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {warningPopup.message}
            </p>

            <button
              onClick={() => setWarningPopup({ show: false, title: '', message: '' })}
              className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-red-600/15"
            >
              Understand & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

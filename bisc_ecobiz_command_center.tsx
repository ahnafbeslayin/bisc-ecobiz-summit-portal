import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  DollarSign, 
  Calendar, 
  Timer, 
  AlertTriangle, 
  Search, 
  Plus, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Award, 
  TrendingUp, 
  Clock, 
  ChevronRight, 
  Filter, 
  Flame, 
  Zap, 
  CheckSquare, 
  Square, 
  Trash2,
  PieChart,
  ShieldCheck,
  FileSpreadsheet,
  Lock,
  Unlock,
  Key,
  LogOut,
  UserCheck,
  ShieldAlert,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';

// --- INITIAL DEFAULT ACCESS KEYS ---
const INITIAL_ACCESS_KEYS = [
  { code: 'BISC-EXEC-2027', role: 'General Secretary', assignedTo: 'Ahnaf Hossain (GS)', usesLeft: 999, active: true, type: 'Master' },
  { code: 'FACULTY-2027', role: 'Faculty Advisor', assignedTo: 'Mr. Shirajee / Ms. Anika', usesLeft: 999, active: true, type: 'Admin' },
  { code: 'JUDGE-2027', role: 'Judges Panel', assignedTo: 'Guest Judges', usesLeft: 50, active: true, type: 'Standard' },
  { code: 'ECOBIZ2027', role: 'Executive Board', assignedTo: 'Core Organizing Committee', usesLeft: 100, active: true, type: 'Standard' },
  { code: 'FINANCE-2027', role: 'Finance & Sponsor Lead', assignedTo: 'Finance Sub-committee', usesLeft: 20, active: true, type: 'Standard' },
];

// --- INITIAL MOCK DELEGATE DATA ---
const INITIAL_DELEGATES = [
  { id: 'DEL-101', teamName: 'Apex Capital', schoolName: 'Bangladesh International School & College', segment: 'sharkTank', mode: 'team', leadName: 'Ahnaf Hossain', leadEmail: 'ahnaf@bisc.edu.bd', leadPhone: '01312505447', memberCount: 3, paymentStatus: 'Verified', trxId: 'BK9283711', amount: 13500 },
  { id: 'DEL-102', teamName: 'Fiscal Titans', schoolName: 'Scholastica (Mirpur)', segment: 'fiscalFrontier', mode: 'team', leadName: 'Samiul Islam', leadEmail: 'samiul@gmail.com', leadPhone: '01711223344', memberCount: 3, paymentStatus: 'Verified', trxId: 'NG8821903', amount: 13500 },
  { id: 'DEL-103', teamName: 'Venture Catalyst', schoolName: 'Mastermind English Medium', segment: 'vcPitch', mode: 'team', leadName: 'Nabila Rahman', leadEmail: 'nabila@mastermind.edu', leadPhone: '01899887766', memberCount: 2, paymentStatus: 'Verified', trxId: 'BK1102934', amount: 10000 },
  { id: 'DEL-104', teamName: 'StratEdge Consulting', schoolName: 'DPS STS School Dhaka', segment: 'caseCrack', mode: 'team', leadName: 'Tanvir Ahmed', leadEmail: 'tanvir@dpssts.edu.bd', leadPhone: '01522334455', memberCount: 3, paymentStatus: 'Pending', trxId: 'BK7734190', amount: 13500 },
  { id: 'DEL-105', teamName: 'Macro Mindset', schoolName: 'Sunbeams School', segment: 'fiscalFrontier', mode: 'solo', leadName: 'Zara Khan', leadEmail: 'zara.k@sunbeams.edu', leadPhone: '01911882233', memberCount: 1, paymentStatus: 'Verified', trxId: 'NG4492019', amount: 6500 },
  { id: 'DEL-106', teamName: 'Green Innovators', schoolName: 'Manarat Dhaka International College', segment: 'sharkTank', mode: 'team', leadName: 'Ayman Chowdhury', leadEmail: 'ayman@manarat.edu', leadPhone: '01300998877', memberCount: 2, paymentStatus: 'Verified', trxId: 'BK9932011', amount: 10000 },
  { id: 'DEL-107', teamName: 'Vanguard Economics', schoolName: 'International Hope School Bangladesh', segment: 'caseCrack', mode: 'team', leadName: 'Farhan Kabir', leadEmail: 'farhan@ihsb.edu.bd', leadPhone: '01755443322', memberCount: 3, paymentStatus: 'Pending', trxId: 'BK4410928', amount: 13500 },
  { id: 'DEL-108', teamName: 'Solopreneur X', schoolName: 'Bangladesh International School & College', segment: 'sharkTank', mode: 'solo', leadName: 'Rayan Al-Mansoor', leadEmail: 'rayan@bisc.edu.bd', leadPhone: '01811223399', memberCount: 1, paymentStatus: 'Verified', trxId: 'NG1029384', amount: 6500 },
];

const INITIAL_SCORES = [
  { id: 'SC-1', teamName: 'Apex Capital', schoolName: 'Bangladesh International School & College', segment: 'sharkTank', analysis: 24, creativity: 23, feasibility: 22, presentation: 24, totalScore: 93 },
  { id: 'SC-2', teamName: 'Green Innovators', schoolName: 'Manarat Dhaka International College', segment: 'sharkTank', analysis: 20, creativity: 22, feasibility: 21, presentation: 23, totalScore: 86 },
  { id: 'SC-3', teamName: 'Fiscal Titans', schoolName: 'Scholastica (Mirpur)', segment: 'fiscalFrontier', analysis: 25, creativity: 22, feasibility: 24, presentation: 23, totalScore: 94 },
  { id: 'SC-4', teamName: 'Macro Mindset', schoolName: 'Sunbeams School', segment: 'fiscalFrontier', analysis: 22, creativity: 20, feasibility: 21, presentation: 22, totalScore: 85 },
  { id: 'SC-5', teamName: 'Venture Catalyst', schoolName: 'Mastermind English Medium', segment: 'vcPitch', analysis: 23, creativity: 24, feasibility: 23, presentation: 24, totalScore: 94 },
  { id: 'SC-6', teamName: 'StratEdge Consulting', schoolName: 'DPS STS School Dhaka', segment: 'caseCrack', analysis: 22, creativity: 21, feasibility: 23, presentation: 22, totalScore: 88 },
];

const SPONSORS_DATA = [
  { id: 'SP-1', name: 'Standard Chartered Bank', package: 'Title Sponsor', category: 'Cash', value: 130000, status: 'Secured', contact: 'Corporate Relations' },
  { id: 'SP-2', name: 'bKash Limited', package: 'Gold Sponsor', category: 'Cash', value: 85000, status: 'Secured', contact: 'Fintech Partnership' },
  { id: 'SP-3', name: 'BRAC Bank PLC', package: 'Silver Sponsor', category: 'Cash', value: 50000, status: 'In Negotiation', contact: 'SME Division' },
  { id: 'SP-4', name: 'Foodpanda Bangladesh', package: 'Catering Partner', category: 'In-Kind', value: 198000, status: 'Secured', contact: 'Events Team' },
  { id: 'SP-5', name: 'IDLC Finance', package: 'Prize Partner', category: 'In-Kind', value: 100000, status: 'Secured', contact: 'CSR Lead' },
  { id: 'SP-6', name: 'Paperfly Press', package: 'Kits & Printing Partner', category: 'In-Kind', value: 98000, status: 'Confirmed', contact: 'Print Ops' },
];

const LOGISTICS_TASKS = [
  { id: 'TK-1', day: 'Day 1', task: 'Setup Registration Desks & Delegate Badge Scanner at BISC Gate', assignee: 'Operations Team', status: true },
  { id: 'TK-2', day: 'Day 1', task: 'Distribute Delegate Kits & Case Briefs for Shark Tank & Fiscal Frontier', assignee: 'Academic Desk', status: true },
  { id: 'TK-3', day: 'Day 2', task: 'Coordinate Semi-Final Judges & Hospitality Lunch (220 Attendees)', assignee: 'Catering Team', status: false },
  { id: 'TK-4', day: 'Day 2', task: 'Publish Finalists List for Day 3 Hotel Ballroom Finale', assignee: 'Judges Panel', status: false },
  { id: 'TK-5', day: 'Day 3', task: 'Grand Ballroom Stage Audio/Visual & Sound Check in Dhaka Hotel', assignee: 'Production Lead', status: false },
  { id: 'TK-6', day: 'Day 3', task: 'Hand over Trophies & Prize Pool Cheques (BDT 100,000) during Closing', assignee: 'Executive Board', status: false },
];

const CRISIS_SCENARIOS = [
  {
    title: 'STAGFLATION SHOCK & INFLATION SURGE',
    severity: 'CRITICAL',
    inflation: '+14.2%',
    currency: '-18.5%',
    gdpGrowth: '-2.4%',
    description: 'A global energy price surge triggers double-digit domestic inflation while factory output plummets. Food and fuel prices reach record highs.',
    challenge: 'Draft a combined fiscal policy deck adjusting interest rates, tax incentives, and social safety nets without widening the budget deficit.'
  },
  {
    title: 'CHITTAGONG PORT SUPPLY CHAIN BLOCKADE',
    severity: 'HIGH',
    inflation: '+8.7%',
    currency: '-6.2%',
    gdpGrowth: '-1.1%',
    description: 'Major port disruption halts raw material imports for RMG exports and essential food staples, threatening trade balance.',
    challenge: 'Propose emergency trade rerouting, tariff waivers, and foreign exchange reserve interventions to stabilize essential commodity prices.'
  },
  {
    title: 'BANKING SYSTEM LIQUIDITY & DEBT CRISIS',
    severity: 'EXTREME',
    inflation: '+11.0%',
    currency: '-22.0%',
    gdpGrowth: '-3.8%',
    description: 'Non-performing loans hit critical levels, causing interbank credit to freeze up and severe liquidity strain on commercial banks.',
    challenge: 'Act as Central Bank & Treasury Cabinet to design a bank recapitalization package and restore public confidence.'
  },
  {
    title: 'FOREIGN DIRECT INVESTMENT (FDI) CAPITAL FLIGHT',
    severity: 'MODERATE',
    inflation: '+6.5%',
    currency: '-12.0%',
    gdpGrowth: '+0.5%',
    description: 'Global geopolitical tensions cause international investors to pull capital out of emerging market equities and sovereign bonds.',
    challenge: 'Present an emergency corporate tax incentive package and green-tech subsidy plan to retain institutional venture capital.'
  }
];

export default function App() {
  // --- AUTH STATE & LOCK SCREEN ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [currentUserSession, setCurrentUserSession] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [showKeyText, setShowKeyText] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // --- ACCESS KEYS MANAGEMENT ---
  const [accessKeys, setAccessKeys] = useState(INITIAL_ACCESS_KEYS);
  const [copiedCode, setCopiedCode] = useState(null);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyData, setNewKeyData] = useState({ code: '', role: 'Committee Member', assignedTo: '', usesLeft: 5, type: 'Standard' });

  // --- COMMAND CENTER APP STATES ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [delegates, setDelegates] = useState(INITIAL_DELEGATES);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [tasks, setTasks] = useState(LOGISTICS_TASKS);
  
  // Roster Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegmentFilter, setSelectedSegmentFilter] = useState('all');
  const [selectedModeFilter, setSelectedModeFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Manual Delegate Modal
  const [showAddDelegateModal, setShowAddDelegateModal] = useState(false);
  const [newDelegate, setNewDelegate] = useState({
    teamName: '', schoolName: '', segment: 'sharkTank', mode: 'team',
    leadName: '', leadEmail: '', leadPhone: '', memberCount: 3, trxId: ''
  });

  // Scoreboard Tab State
  const [selectedSegmentScore, setSelectedSegmentScore] = useState('sharkTank');

  // Pitch Timer & Crisis Simulator
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('pitch');
  const [activeCrisis, setActiveCrisis] = useState(CRISIS_SCENARIOS[0]);

  // Check saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem('bisc_ecobiz_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.code) {
          setIsAuthenticated(true);
          setCurrentUserSession(parsed);
        }
      } catch (e) {
        localStorage.removeItem('bisc_ecobiz_session');
      }
    }
  }, []);

  // Pitch Stopwatch tick logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // --- AUTH LOGIN HANDLER ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanInput = passkeyInput.trim().toUpperCase();

    const matchedKey = accessKeys.find(k => k.code.toUpperCase() === cleanInput && k.active);

    if (matchedKey) {
      if (matchedKey.usesLeft <= 0) {
        setAuthError('This invite key has exceeded its maximum usage limit.');
        triggerShake();
        return;
      }

      // Success
      const sessionData = {
        code: matchedKey.code,
        role: matchedKey.role,
        assignedTo: matchedKey.assignedTo,
        type: matchedKey.type,
        loginTime: new Date().toLocaleTimeString()
      };

      if (rememberMe) {
        localStorage.setItem('bisc_ecobiz_session', JSON.stringify(sessionData));
      }

      setCurrentUserSession(sessionData);
      setAuthSuccessMsg(`Access Granted • Welcome, ${matchedKey.assignedTo}`);
      
      setTimeout(() => {
        setIsAuthenticated(true);
        setPasskeyInput('');
        setAuthSuccessMsg('');
      }, 800);

    } else {
      setAuthError('Invalid Access Key. Contact General Secretary Ahnaf Hossain for an invite code.');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('bisc_ecobiz_session');
    setIsAuthenticated(false);
    setCurrentUserSession(null);
    setPasskeyInput('');
    setAuthError('');
  };

  // --- KEY GENERATOR HANDLER ---
  const handleGenerateRandomKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'ECOBIZ-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewKeyData(prev => ({ ...prev, code }));
  };

  const handleCreateKeySubmit = (e) => {
    e.preventDefault();
    if (!newKeyData.code) return;

    const keyObj = {
      code: newKeyData.code.trim().toUpperCase(),
      role: newKeyData.role,
      assignedTo: newKeyData.assignedTo || 'Unassigned Member',
      usesLeft: parseInt(newKeyData.usesLeft) || 1,
      active: true,
      type: newKeyData.type
    };

    setAccessKeys([keyObj, ...accessKeys]);
    setShowNewKeyModal(false);
    setNewKeyData({ code: '', role: 'Committee Member', assignedTo: '', usesLeft: 5, type: 'Standard' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleKeyActive = (code) => {
    setAccessKeys(accessKeys.map(k => k.code === code ? { ...k, active: !k.active } : k));
  };

  // --- DELEGATE MANAGEMENT ---
  const togglePaymentStatus = (id) => {
    setDelegates(prev => prev.map(d => d.id === id ? { ...d, paymentStatus: d.paymentStatus === 'Verified' ? 'Pending' : 'Verified' } : d));
  };

  const handleDeleteDelegate = (id) => {
    if (window.confirm('Delete this registration entry?')) {
      setDelegates(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleAddDelegateSubmit = (e) => {
    e.preventDefault();
    const newId = `DEL-${100 + delegates.length + 1}`;
    const amount = newDelegate.mode === 'team' ? (newDelegate.memberCount * 3500 + 3000) : 6500;
    
    setDelegates([{ id: newId, ...newDelegate, paymentStatus: 'Verified', amount }, ...delegates]);
    setShowAddDelegateModal(false);
    setNewDelegate({ teamName: '', schoolName: '', segment: 'sharkTank', mode: 'team', leadName: '', leadEmail: '', leadPhone: '', memberCount: 3, trxId: '' });
  };

  const exportRosterCSV = () => {
    const headers = ['ID,Team Name,School/Institution,Segment,Mode,Lead Name,Email,Phone,Members,Payment Status,Trx ID,Fee (BDT)'];
    const rows = delegates.map(d => 
      `"${d.id}","${d.teamName}","${d.schoolName}","${d.segment}","${d.mode}","${d.leadName}","${d.leadEmail}","${d.leadPhone}",${d.memberCount},"${d.paymentStatus}","${d.trxId}",${d.amount}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BISC_EcoBiz_Delegate_Roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScoreUpdate = (id, field, value) => {
    const val = Math.min(25, Math.max(0, parseInt(value) || 0));
    setScores(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, [field]: val };
        updated.totalScore = updated.analysis + updated.creativity + updated.feasibility + updated.presentation;
        return updated;
      }
      return s;
    }));
  };

  const handleTimerPreset = (mode, duration) => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimerSeconds(duration);
  };

  const handleGenerateCrisis = () => {
    const randomIndex = Math.floor(Math.random() * CRISIS_SCENARIOS.length);
    setActiveCrisis(CRISIS_SCENARIOS[randomIndex]);
  };

  // Calculations for Dashboard
  const totalVerifiedDelegates = delegates.filter(d => d.paymentStatus === 'Verified').reduce((acc, curr) => acc + curr.memberCount, 0);
  const totalSchoolsCount = new Set(delegates.map(d => d.schoolName)).size;
  const totalRegistrationRevenue = delegates.filter(d => d.paymentStatus === 'Verified').reduce((acc, curr) => acc + curr.amount, 0);
  const totalSponsorSecured = SPONSORS_DATA.filter(s => s.status === 'Secured' || s.status === 'Confirmed').reduce((acc, curr) => acc + curr.value, 0);
  const totalFundsSecured = totalRegistrationRevenue + totalSponsorSecured;

  const filteredDelegates = delegates.filter(d => {
    const matchesSearch = d.teamName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.trxId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = selectedSegmentFilter === 'all' || d.segment === selectedSegmentFilter;
    const matchesMode = selectedModeFilter === 'all' || d.mode === selectedModeFilter;
    const matchesStatus = selectedStatusFilter === 'all' || d.paymentStatus === selectedStatusFilter;
    return matchesSearch && matchesSegment && matchesMode && matchesStatus;
  });

  const schoolPoints = {};
  scores.forEach(s => {
    if (!schoolPoints[s.schoolName]) schoolPoints[s.schoolName] = 0;
    schoolPoints[s.schoolName] += s.totalScore;
  });
  const sortedSchoolStandings = Object.entries(schoolPoints)
    .map(([school, pts]) => ({ school, pts }))
    .sort((a, b) => b.pts - a.pts);

  // =========================================================================
  // VIEW 1: INVITE-ONLY GATE / ACCESS KEY LOCK SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D16] text-white font-sans antialiased flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden selection:bg-[#00F0FF] selection:text-black">
        
        {/* GLOWING AMBIENT BACKGROUND LIGHTS */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* TOP BRAND HEADER */}
        <div className="max-w-md w-full mx-auto text-center pt-8 space-y-3 z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0F172A] border border-[#00F0FF]/40 shadow-[0_0_40px_rgba(0,240,255,0.25)] mb-2">
            <Building2 className="w-10 h-10 text-[#00F0FF]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
            BISC ECOBIZ <span className="text-[#00F0FF]">SUMMIT I</span>
          </h1>
          <div className="flex items-center justify-center space-x-2 text-[10px] font-black tracking-[0.3em] text-cyan-200/70">
            <span>ORGANIZER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
            <span>COMMAND CENTER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
            <span>RESTRICTED</span>
          </div>
        </div>

        {/* LOCK CARD GATE */}
        <div className="max-w-md w-full mx-auto my-auto z-10">
          <div className={`bg-[#0F172A]/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden transition-transform ${isShaking ? 'animate-bounce border-red-500/50' : ''}`}>
            
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400">
                <Lock className="w-3 h-3 text-[#00F0FF]" />
                <span>INVITE-ONLY GATE</span>
              </span>
            </div>

            <div className="mb-8 space-y-2">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Key className="w-5 h-5 text-[#00F0FF]" />
                <span>Executive Access Key</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your authorized summit passkey to access live delegate rosters, scoreboards, and financial ledgers.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-wider">
                  Passkey / Invite Code
                </label>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#00F0FF] transition-colors">
                    <Key className="w-5 h-5" />
                  </div>

                  <input
                    type={showKeyText ? "text" : "password"}
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="e.g. ECOBIZ2027"
                    required
                    className="w-full bg-[#090D16] border border-slate-700/80 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-white font-mono tracking-widest placeholder:tracking-normal placeholder:font-sans focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all uppercase"
                  />

                  <button
                    type="button"
                    onClick={() => setShowKeyText(!showKeyText)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showKeyText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME TOGGLE */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2.5 cursor-pointer text-slate-400 hover:text-slate-200 transition">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-[#090D16] text-[#00F0FF] focus:ring-0 cursor-pointer"
                  />
                  <span>Keep Session Active</span>
                </label>

                <span className="text-[11px] text-cyan-400 font-mono">BISC-SECURE v1.4</span>
              </div>

              {/* ERROR STATE FEEDBACK */}
              {authError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start space-x-2.5 animate-fadeIn">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* SUCCESS STATE FEEDBACK */}
              {authSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold">{authSuccessMsg}</span>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#00F0FF] text-slate-950 font-black text-sm hover:bg-[#33F3FF] transition shadow-[0_0_25px_rgba(0,240,255,0.35)] flex items-center justify-center space-x-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Command Center</span>
              </button>
            </form>

            {/* PREDEFINED HINT CODES FOR QUICK DEMO */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block text-center">
                Authorized Executive Key Hints (Click to Copy):
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { code: 'BISC-EXEC-2027', label: 'Master GS' },
                  { code: 'ECOBIZ2027', label: 'Executive' },
                  { code: 'FACULTY-2027', label: 'Faculty' },
                  { code: 'JUDGE-2027', label: 'Judge' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setPasskeyInput(item.code); setAuthError(''); }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-200/80 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] transition"
                  >
                    {item.code} <span className="text-slate-500 text-[9px]">({item.label})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="max-w-md w-full mx-auto text-center pb-4 z-10 text-xs text-slate-500">
          Bangladesh International School & College (BISC) Business Club © 2027
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: UNLOCKED COMMAND CENTER DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans antialiased selection:bg-[#00F0FF] selection:text-black">
      
      {/* AMBIENT GLOW */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* EXECUTIVE HEADER */}
      <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-b border-[#00F0FF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* BRANDING */}
            <div className="flex items-center space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00F0FF] to-blue-600 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <div className="w-full h-full bg-[#090D16] rounded-[14px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#00F0FF]" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-black tracking-wider text-white">BISC ECOBIZ</h1>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF] font-mono border border-[#00F0FF]/30">SUMMIT I</span>
                </div>
                <p className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">Organizer Command Center</p>
              </div>
            </div>

            {/* SESSION USER INFO & LOCK BUTTON */}
            <div className="flex items-center space-x-4">
              
              {currentUserSession && (
                <div className="hidden sm:flex items-center space-x-3 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF]">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] uppercase font-bold text-[#00F0FF] tracking-wider">{currentUserSession.role}</span>
                    <span className="text-xs text-white font-medium truncate max-w-[140px] block">{currentUserSession.assignedTo}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition flex items-center space-x-2"
                title="Lock Command Center Session"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Lock Session</span>
              </button>
            </div>

          </div>

          {/* TAB NAVIGATION BAR */}
          <nav className="flex space-x-1 overflow-x-auto pb-3 pt-1 scrollbar-none">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'roster', label: `Roster (${delegates.length})`, icon: Users },
              { id: 'scoreboard', label: 'Scoreboard', icon: Trophy },
              { id: 'finance', label: 'Financials', icon: DollarSign },
              { id: 'schedule', label: 'Schedule & Tasks', icon: Calendar },
              { id: 'simulator', label: 'Pitch & Crisis Sim', icon: Timer },
              { id: 'keys', label: 'Access Keys', icon: Key },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#00F0FF] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* TOP METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-[#0F172A]/80 border border-[#00F0FF]/30 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Total Delegates</span>
                  <div className="p-2 bg-[#00F0FF]/10 rounded-xl border border-[#00F0FF]/20">
                    <Users className="w-5 h-5 text-[#00F0FF]" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-black text-white font-mono">{totalVerifiedDelegates} <span className="text-sm font-normal text-slate-400">/ 150 Target</span></div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#00F0FF] h-full rounded-full transition-all duration-500" style={{ width: `${(totalVerifiedDelegates / 150) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F172A]/80 border border-cyan-500/20 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Schools Participating</span>
                  <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Building2 className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-black text-white font-mono">{totalSchoolsCount} <span className="text-sm font-normal text-slate-400">/ 15 Schools</span></div>
                  <p className="text-xs text-cyan-200/60 mt-2 font-semibold">14 Visiting Schools + BISC Host</p>
                </div>
              </div>

              <div className="bg-[#0F172A]/80 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Total Funds Raised</span>
                  <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-black text-emerald-400 font-mono">BDT {(totalFundsSecured / 1000).toFixed(0)}k</div>
                  <p className="text-xs text-slate-400 mt-2">Target: <strong className="text-white">BDT 1,229,000</strong> ({((totalFundsSecured / 1229000) * 100).toFixed(0)}%)</p>
                </div>
              </div>

              <div className="bg-[#0F172A]/80 border border-purple-500/30 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Active Teams Scored</span>
                  <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <Trophy className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-black text-white font-mono">{scores.length} <span className="text-sm font-normal text-slate-400">Teams</span></div>
                  <p className="text-xs text-purple-300/70 mt-2 font-semibold">Across 4 Competition Segments</p>
                </div>
              </div>

            </div>

            {/* SEGMENT ENROLLMENT & SCHOOL STANDINGS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#00F0FF]" />
                    <span>Segment Enrollment & Capacity Tracker</span>
                  </h3>
                  <span className="text-xs text-slate-400">Single Open Track (Grade 7 - A Level)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Shark Tank', desc: 'Product & Invention Pitch', count: delegates.filter(d => d.segment === 'sharkTank').length, target: 12, color: 'from-[#00F0FF] to-blue-600' },
                    { title: 'BISC Fiscal Frontier', desc: 'Macro Policy Simulation', count: delegates.filter(d => d.segment === 'fiscalFrontier').length, target: 12, color: 'from-purple-500 to-indigo-600' },
                    { title: 'Venture Capital Pitch', desc: 'Unit Economics & Cash Flow', count: delegates.filter(d => d.segment === 'vcPitch').length, target: 12, color: 'from-emerald-500 to-teal-600' },
                    { title: 'Case Crack Strategy', desc: 'Corporate Strategy Deck', count: delegates.filter(d => d.segment === 'caseCrack').length, target: 12, color: 'from-amber-500 to-orange-600' },
                  ].map((seg, idx) => (
                    <div key={idx} className="bg-[#090D16] p-5 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-white text-base">{seg.title}</h4>
                          <p className="text-xs text-slate-400">{seg.desc}</p>
                        </div>
                        <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-800 rounded text-[#00F0FF]">
                          {seg.count} Teams
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${seg.color}`} style={{ width: `${Math.min(100, (seg.count / seg.target) * 100)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OVERALL SCHOOL CHAMPIONSHIP STANDINGS */}
              <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      <span>School Championship Points</span>
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {sortedSchoolStandings.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#090D16] border border-slate-800">
                        <div className="flex items-center space-x-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            idx === 0 ? 'bg-amber-400 text-slate-950' :
                            idx === 1 ? 'bg-slate-300 text-slate-950' :
                            idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-white truncate max-w-[160px]">{item.school}</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-[#00F0FF]">{item.pts} pts</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 text-center border-t border-slate-800 mt-4">
                  <p className="text-xs text-slate-400">Winning school earns the Overall BISC EcoBiz Trophy</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: DELEGATE & TEAM ROSTER */}
        {/* ========================================================= */}
        {activeTab === 'roster' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* CONTROL BAR */}
            <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-4">
              
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search team, lead name or TrxID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#090D16] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <select
                  value={selectedSegmentFilter}
                  onChange={(e) => setSelectedSegmentFilter(e.target.value)}
                  className="bg-[#090D16] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="all">All Segments</option>
                  <option value="sharkTank">Shark Tank</option>
                  <option value="fiscalFrontier">BISC Fiscal Frontier</option>
                  <option value="vcPitch">VC Pitch</option>
                  <option value="caseCrack">Corporate Case Crack</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="bg-[#090D16] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="all">All Payment Status</option>
                  <option value="Verified">Verified Only</option>
                  <option value="Pending">Pending Only</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 w-full lg:w-auto justify-end">
                <button
                  onClick={exportRosterCSV}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center space-x-2 border border-slate-700"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowAddDelegateModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#00F0FF] text-slate-950 text-xs font-black hover:bg-[#33F3FF] transition flex items-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Delegate Entry</span>
                </button>
              </div>

            </div>

            {/* ROSTER TABLE */}
            <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#090D16] border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">ID & Team Name</th>
                      <th className="px-6 py-4">Institution</th>
                      <th className="px-6 py-4">Segment & Mode</th>
                      <th className="px-6 py-4">Leader Contact</th>
                      <th className="px-6 py-4">TrxID & Fee</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredDelegates.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-mono text-[10px] text-[#00F0FF]">{d.id}</div>
                          <div className="font-bold text-white text-sm">{d.teamName}</div>
                          <span className="text-[10px] text-slate-400">{d.memberCount} Delegate(s)</span>
                        </td>
                        <td className="px-6 py-4 text-slate-300 max-w-[200px] truncate font-medium">
                          {d.schoolName}
                        </td>
                        <td className="px-6 py-4">
                          <span className="capitalize font-semibold text-white block">
                            {d.segment === 'sharkTank' ? 'Shark Tank' :
                             d.segment === 'fiscalFrontier' ? 'Fiscal Frontier' :
                             d.segment === 'vcPitch' ? 'VC Pitch' : 'Case Crack'}
                          </span>
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 mt-1 uppercase font-bold">
                            {d.mode}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{d.leadName}</div>
                          <div className="text-slate-400 text-[11px]">{d.leadPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-mono text-cyan-200">{d.trxId}</div>
                          <div className="text-emerald-400 font-mono font-bold">BDT {d.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => togglePaymentStatus(d.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 transition ${
                              d.paymentStatus === 'Verified'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {d.paymentStatus === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                            <span>{d.paymentStatus}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleDeleteDelegate(d.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ACCESS KEYS MANAGEMENT (NEW) */}
        {/* ========================================================= */}
        {activeTab === 'keys' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* HEADER */}
            <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center space-x-2">
                  <Key className="w-6 h-6 text-[#00F0FF]" />
                  <span>Invite Keys & Access Control Management</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Generate unique, role-based invite passkeys for organizing sub-committees and guest judges.
                </p>
              </div>

              <button
                onClick={() => { handleGenerateRandomKey(); setShowNewKeyModal(true); }}
                className="px-5 py-3 rounded-2xl bg-[#00F0FF] text-slate-950 font-black text-xs hover:bg-[#33F3FF] transition flex items-center space-x-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Generate New Passkey</span>
              </button>
            </div>

            {/* ACCESS KEYS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessKeys.map((k, idx) => (
                <div key={idx} className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4 relative overflow-hidden group hover:border-[#00F0FF]/40 transition-all">
                  
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                      {k.type} KEY
                    </span>

                    <button
                      onClick={() => toggleKeyActive(k.code)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition ${
                        k.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {k.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Passkey Code</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xl font-mono font-black text-[#00F0FF] tracking-wider">{k.code}</code>
                      <button
                        onClick={() => copyToClipboard(k.code)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                        title="Copy Code"
                      >
                        {copiedCode === k.code ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assigned Role:</span>
                      <span className="font-bold text-white">{k.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assignee:</span>
                      <span className="text-cyan-200">{k.assignedTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Allowed Uses:</span>
                      <span className="font-mono text-slate-300">{k.usesLeft} remaining</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: JUDGING SCOREBOARD */}
        {/* ========================================================= */}
        {activeTab === 'scoreboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="flex space-x-2 bg-[#0F172A]/80 p-2 rounded-2xl border border-slate-800 overflow-x-auto">
              {[
                { id: 'sharkTank', label: 'Shark Tank (Product Pitch)' },
                { id: 'fiscalFrontier', label: 'Fiscal Frontier (Macro Policy)' },
                { id: 'vcPitch', label: 'VC Pitch (Unit Economics)' },
                { id: 'caseCrack', label: 'Corporate Strategy Case Crack' },
              ].map(seg => (
                <button
                  key={seg.id}
                  onClick={() => setSelectedSegmentScore(seg.id)}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedSegmentScore === seg.id
                      ? 'bg-[#00F0FF] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>

            <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>Segment Leaderboard & Score Matrix</span>
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#090D16] text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-4 py-3">Rank</th>
                      <th className="px-4 py-3">Team Name</th>
                      <th className="px-4 py-3">Institution</th>
                      <th className="px-4 py-3 text-center">Analysis (/25)</th>
                      <th className="px-4 py-3 text-center">Creativity (/25)</th>
                      <th className="px-4 py-3 text-center">Feasibility (/25)</th>
                      <th className="px-4 py-3 text-center">Presentation (/25)</th>
                      <th className="px-4 py-3 text-right">Total Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {scores
                      .filter(s => s.segment === selectedSegmentScore)
                      .sort((a, b) => b.totalScore - a.totalScore)
                      .map((sc, rank) => (
                        <tr key={sc.id} className="hover:bg-slate-800/40">
                          <td className="px-4 py-4 font-bold">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono ${
                              rank === 0 ? 'bg-amber-400 text-slate-950 font-black' :
                              rank === 1 ? 'bg-slate-300 text-slate-950 font-black' :
                              rank === 2 ? 'bg-amber-700 text-white font-black' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {rank + 1}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-bold text-white text-sm">{sc.teamName}</td>
                          <td className="px-4 py-4 text-slate-300">{sc.schoolName}</td>
                          
                          <td className="px-4 py-4 text-center font-mono">
                            <input
                              type="number"
                              min="0"
                              max="25"
                              value={sc.analysis}
                              onChange={(e) => handleScoreUpdate(sc.id, 'analysis', e.target.value)}
                              className="w-14 bg-[#090D16] border border-slate-800 rounded px-2 py-1 text-center text-cyan-200 focus:outline-none focus:border-[#00F0FF]"
                            />
                          </td>

                          <td className="px-4 py-4 text-center font-mono">
                            <input
                              type="number"
                              min="0"
                              max="25"
                              value={sc.creativity}
                              onChange={(e) => handleScoreUpdate(sc.id, 'creativity', e.target.value)}
                              className="w-14 bg-[#090D16] border border-slate-800 rounded px-2 py-1 text-center text-cyan-200 focus:outline-none focus:border-[#00F0FF]"
                            />
                          </td>

                          <td className="px-4 py-4 text-center font-mono">
                            <input
                              type="number"
                              min="0"
                              max="25"
                              value={sc.feasibility}
                              onChange={(e) => handleScoreUpdate(sc.id, 'feasibility', e.target.value)}
                              className="w-14 bg-[#090D16] border border-slate-800 rounded px-2 py-1 text-center text-cyan-200 focus:outline-none focus:border-[#00F0FF]"
                            />
                          </td>

                          <td className="px-4 py-4 text-center font-mono">
                            <input
                              type="number"
                              min="0"
                              max="25"
                              value={sc.presentation}
                              onChange={(e) => handleScoreUpdate(sc.id, 'presentation', e.target.value)}
                              className="w-14 bg-[#090D16] border border-slate-800 rounded px-2 py-1 text-center text-cyan-200 focus:outline-none focus:border-[#00F0FF]"
                            />
                          </td>

                          <td className="px-4 py-4 text-right font-mono font-black text-base text-[#00F0FF]">
                            {sc.totalScore} pts
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: FINANCIAL LEDGER */}
        {/* ========================================================= */}
        {activeTab === 'finance' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                <span className="text-xs font-bold uppercase text-slate-400">Total Event Budget</span>
                <div className="text-3xl font-black text-white font-mono mt-2">BDT 1,229,000</div>
                <p className="text-xs text-slate-400 mt-2">Financially self-sustaining (0% school contribution)</p>
              </div>

              <div className="bg-[#0F172A]/80 border border-emerald-500/30 rounded-3xl p-6 backdrop-blur-xl">
                <span className="text-xs font-bold uppercase text-slate-400">Total Secured Income</span>
                <div className="text-3xl font-black text-emerald-400 font-mono mt-2">BDT {totalFundsSecured.toLocaleString()}</div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(totalFundsSecured / 1229000) * 100}%` }}></div>
                </div>
              </div>

              <div className="bg-[#0F172A]/80 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-xl">
                <span className="text-xs font-bold uppercase text-slate-400">Funding Target Remaining</span>
                <div className="text-3xl font-black text-amber-400 font-mono mt-2">BDT {Math.max(0, 1229000 - totalFundsSecured).toLocaleString()}</div>
                <p className="text-xs text-amber-200/60 mt-2 font-semibold">Checkpoint 70% reached (Spending unlocked)</p>
              </div>
            </div>

            <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-[#00F0FF]" />
                  <span>Sponsorship Target & In-Kind Partner Ledger</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SPONSORS_DATA.map(sp => (
                  <div key={sp.id} className="bg-[#090D16] p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00F0FF]">{sp.package}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        sp.status === 'Secured' || sp.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {sp.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white">{sp.name}</h4>
                      <p className="text-xs text-slate-400">{sp.contact}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-xs text-slate-400">{sp.category} Value</span>
                      <span className="font-mono font-bold text-white text-sm">BDT {sp.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SCHEDULE & LOGISTICS */}
        {/* ========================================================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-[#00F0FF] uppercase">Day 1 • Friday</span>
                  <span className="text-xs bg-slate-800 px-2.5 py-1 rounded text-white font-mono">BISC Campus</span>
                </div>
                <h4 className="text-base font-bold text-white">Opening & Preliminaries</h4>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                  <li>Delegate Check-in & Badge Issuance</li>
                  <li>Opening Keynote Speech</li>
                  <li>Shark Tank & Case Crack Prelims</li>
                </ul>
              </div>

              <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-[#00F0FF] uppercase">Day 2 • Saturday</span>
                  <span className="text-xs bg-slate-800 px-2.5 py-1 rounded text-white font-mono">BISC Campus</span>
                </div>
                <h4 className="text-base font-bold text-white">Semi-Finals & Crisis Sim</h4>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                  <li>BISC Fiscal Frontier Simulation</li>
                  <li>Venture Capital Pitch Semi-Finals</li>
                  <li>Finalist Announcement</li>
                </ul>
              </div>

              <div className="bg-[#0F172A]/80 border border-[#00F0FF]/30 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-[#00F0FF] uppercase">Day 3 • Sunday</span>
                  <span className="text-xs bg-[#00F0FF]/20 px-2.5 py-1 rounded text-[#00F0FF] font-mono">Dhaka Hotel Ballroom</span>
                </div>
                <h4 className="text-base font-bold text-white">Grand Finale & Awards</h4>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                  <li>Finalist Pitch Decks Defense</li>
                  <li>Keynote & Prize Pool (BDT 100k)</li>
                  <li>Overall School Championship Trophy</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
                <span>Executive Operations Task List</span>
              </h3>

              <div className="space-y-3">
                {tasks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, status: !x.status } : x))}
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-slate-700 cursor-pointer transition"
                  >
                    <div className="flex items-center space-x-3">
                      {t.status ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5 text-slate-600" />}
                      <span className={`text-sm font-semibold ${t.status ? 'line-through text-slate-500' : 'text-white'}`}>
                        {t.task}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-mono">{t.day}</span>
                      <span className="text-cyan-200/70 font-medium">{t.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: PITCH TIMER & CRISIS SIMULATOR */}
        {/* ========================================================= */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
            
            <div className="bg-[#0F172A]/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between items-center text-center space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-[#00F0FF] tracking-widest">Judging Timer</span>
                <h3 className="text-2xl font-black text-white">Segment Pitch Stopwatch</h3>
              </div>

              <div className={`w-64 h-64 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${
                timerSeconds <= 30 && timerSeconds > 0 ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_40px_rgba(251,191,36,0.3)] animate-pulse' :
                timerSeconds === 0 ? 'border-red-500 bg-red-500/10 shadow-[0_0_50px_rgba(239,68,68,0.4)]' :
                'border-[#00F0FF] bg-[#00F0FF]/5 shadow-[0_0_40px_rgba(0,240,255,0.2)]'
              }`}>
                <span className="text-6xl font-black font-mono tracking-tight text-white">{formatTime(timerSeconds)}</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-bold">{timerMode.toUpperCase()} MODE</span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-8 py-3.5 rounded-2xl font-black text-sm transition flex items-center space-x-2 ${
                    isTimerRunning
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : 'bg-[#00F0FF] text-slate-950 hover:bg-[#33F3FF] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                </button>

                <button
                  onClick={() => { setIsTimerRunning(false); setTimerSeconds(timerMode === 'pitch' ? 180 : timerMode === 'qa' ? 120 : 300); }}
                  className="p-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl border border-slate-700 transition"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-slate-800 w-full justify-center">
                <button onClick={() => handleTimerPreset('pitch', 180)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white">3m Pitch</button>
                <button onClick={() => handleTimerPreset('qa', 120)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white">2m Q&A</button>
                <button onClick={() => handleTimerPreset('case', 300)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white">5m Case Presentation</button>
              </div>
            </div>

            <div className="bg-[#0F172A]/80 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-purple-400 tracking-widest">BISC Fiscal Frontier</span>
                  <h3 className="text-2xl font-black text-white">Macroeconomic Crisis Simulator</h3>
                </div>
                <button
                  onClick={handleGenerateCrisis}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Generate Crisis</span>
                </button>
              </div>

              <div className="bg-[#090D16] p-6 rounded-2xl border border-purple-500/30 space-y-5">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-black text-amber-400 tracking-wide">{activeCrisis.title}</h4>
                  <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 text-[10px] font-bold font-mono border border-red-500/30">
                    {activeCrisis.severity}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{activeCrisis.description}</p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Inflation</span>
                    <span className="text-sm font-mono font-bold text-red-400">{activeCrisis.inflation}</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">BDT Currency</span>
                    <span className="text-sm font-mono font-bold text-amber-400">{activeCrisis.currency}</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">GDP Output</span>
                    <span className="text-sm font-mono font-bold text-cyan-400">{activeCrisis.gdpGrowth}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-xs font-bold text-purple-300 uppercase block mb-1">Delegate Challenge Brief:</span>
                  <p className="text-xs text-slate-300 italic">{activeCrisis.challenge}</p>
                </div>
              </div>

              <div className="text-xs text-slate-400 text-center">
                Press "Generate Crisis" to issue wildcards during cabinet defense rounds.
              </div>
            </div>

          </div>
        )}

      </main>

      {/* MODAL 1: ADD MANUAL DELEGATE */}
      {showAddDelegateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#00F0FF]/40 rounded-3xl p-8 max-w-xl w-full space-y-6 relative shadow-2xl animate-scaleUp">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white flex items-center space-x-2">
                <Plus className="w-5 h-5 text-[#00F0FF]" />
                <span>Add Manual Delegate Entry</span>
              </h3>
              <button onClick={() => setShowAddDelegateModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddDelegateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Team Name</label>
                  <input
                    type="text"
                    required
                    value={newDelegate.teamName}
                    onChange={(e) => setNewDelegate({ ...newDelegate, teamName: e.target.value })}
                    placeholder="Team Name"
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">School / Institution</label>
                  <input
                    type="text"
                    required
                    value={newDelegate.schoolName}
                    onChange={(e) => setNewDelegate({ ...newDelegate, schoolName: e.target.value })}
                    placeholder="School Name"
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Segment</label>
                  <select
                    value={newDelegate.segment}
                    onChange={(e) => setNewDelegate({ ...newDelegate, segment: e.target.value })}
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                  >
                    <option value="sharkTank">Shark Tank</option>
                    <option value="fiscalFrontier">BISC Fiscal Frontier</option>
                    <option value="vcPitch">VC Pitch</option>
                    <option value="caseCrack">Corporate Case Crack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Mode</label>
                  <select
                    value={newDelegate.mode}
                    onChange={(e) => setNewDelegate({ ...newDelegate, mode: e.target.value })}
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                  >
                    <option value="team">Team (2-3 Members)</option>
                    <option value="solo">Solo Delegate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Lead Name</label>
                  <input
                    type="text"
                    required
                    value={newDelegate.leadName}
                    onChange={(e) => setNewDelegate({ ...newDelegate, leadName: e.target.value })}
                    placeholder="Lead Full Name"
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Lead Phone</label>
                  <input
                    type="text"
                    required
                    value={newDelegate.leadPhone}
                    onChange={(e) => setNewDelegate({ ...newDelegate, leadPhone: e.target.value })}
                    placeholder="01712..."
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">TrxID / Payment Proof</label>
                <input
                  type="text"
                  required
                  value={newDelegate.trxId}
                  onChange={(e) => setNewDelegate({ ...newDelegate, trxId: e.target.value })}
                  placeholder="bKash / Nagad TrxID"
                  className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF] font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddDelegateModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00F0FF] text-slate-950 font-black hover:bg-[#33F3FF]"
                >
                  Save Entry
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: GENERATE NEW PASSKEY */}
      {showNewKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#00F0FF]/40 rounded-3xl p-8 max-w-md w-full space-y-6 relative shadow-2xl animate-scaleUp">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white flex items-center space-x-2">
                <Key className="w-5 h-5 text-[#00F0FF]" />
                <span>Create Invite Passkey</span>
              </h3>
              <button onClick={() => setShowNewKeyModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateKeySubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Passkey Code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    required
                    value={newKeyData.code}
                    onChange={(e) => setNewKeyData({ ...newKeyData, code: e.target.value.toUpperCase() })}
                    placeholder="ECOBIZ-XXXX"
                    className="flex-1 bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-[#00F0FF] uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateRandomKey}
                    className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center space-x-1"
                    title="Generate Random"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Role Title</label>
                  <select
                    value={newKeyData.role}
                    onChange={(e) => setNewKeyData({ ...newKeyData, role: e.target.value })}
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                  >
                    <option value="Executive Board">Executive Board</option>
                    <option value="Faculty Advisor">Faculty Advisor</option>
                    <option value="Judges Panel">Judges Panel</option>
                    <option value="Committee Member">Committee Member</option>
                    <option value="Finance Lead">Finance Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Uses Limit</label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={newKeyData.usesLeft}
                    onChange={(e) => setNewKeyData({ ...newKeyData, usesLeft: e.target.value })}
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase font-bold mb-1">Assigned To (Member / Team Name)</label>
                <input
                  type="text"
                  value={newKeyData.assignedTo}
                  onChange={(e) => setNewKeyData({ ...newKeyData, assignedTo: e.target.value })}
                  placeholder="e.g. Finance Sub-committee Desk"
                  className="w-full bg-[#090D16] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewKeyModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00F0FF] text-slate-950 font-black hover:bg-[#33F3FF]"
                >
                  Save Passkey
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
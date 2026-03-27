import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Activity, User, Play, Clock, Network, Link, MonitorPlay, Zap, ArrowRight, Layout, BarChart2, CheckCircle2 } from 'lucide-react';

function App() {
  const { user, logout } = useAuth0();
  const [time, setTime] = useState<string>('--:--:--');
  const [wfActive, setWfActive] = useState<boolean>(false);
  const [logs, setLogs] = useState<{ id: number; time: string; type: string; msg: string; colorClass: string }[]>([
    { id: 1, time: '14:02:11', type: '[OK]', msg: 'WF1 Schedule Trigger fired', colorClass: 'ok' },
    { id: 2, time: '14:02:13', type: '[INF]', msg: 'Apify actor started — 18 videos queued', colorClass: 'info' }
  ]);
  const [pipelineFilter, setPipelineFilter] = useState<string>('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().split(' ')[4] + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerRun = () => {
    setWfActive(true);
    const now = new Date();
    const tStr = now.toTimeString().split(' ')[0];
    setLogs(prev => [...prev, {
      id: Date.now(),
      time: tStr,
      type: '[INF]',
      msg: 'Manual trigger from Dashboard launched by ' + (user?.name || 'Admin'),
      colorClass: 'info'
    }]);
    
    // reset after 5s
    setTimeout(() => setWfActive(false), 5000);
  };

  return (
    <div className="shell">
      {/* TOPBAR */}
      <header className="topbar">
        <div className="logo">
          <div className="logo-mark">
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="#00e5d4" strokeWidth="1.2" fill="rgba(0,229,212,0.06)" />
              <path d="M14 7L14 21M7 10.5L21 17.5M21 10.5L7 17.5" stroke="#00e5d4" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              <circle cx="14" cy="14" r="2.5" fill="#00e5d4" opacity="0.9" />
            </svg>
          </div>
          GET<span>AUTOMATA</span>
        </div>

        <div style={{ width: '1px', height: '22px', background: 'var(--border)', marginLeft: '4px' }}></div>
        <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-code)', letterSpacing: '1px' }}>MISSION CONTROL</span>

        <div className="topbar-status">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '20px' }}>
            <User size={14} color="var(--cyan)" />
            <span>{user?.email}</span>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} style={{ background: 'transparent', border: 'none', color: 'var(--red)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap:'4px' }}>
               <LogOut size={12} /> Exfil
            </button>
          </div>
          <div className="status-pill">
            <div className="status-dot"></div>
            <span>trendivalux:5679 LIVE</span>
          </div>
          <div className="status-pill">
            <div className="status-dot amber"></div>
            <span>freshn8n:5678 IDLE</span>
          </div>
          <div className="topbar-time">{time}</div>
        </div>
      </header>

      {/* SIDEBAR */}
      <nav className="sidebar">
        <div className="nav-section">
          <div className="nav-label">Navigation</div>
          <div className="nav-item active"><Layout size={14} /> Overview</div>
          <div className="nav-item"><Network size={14} /> Workflows</div>
          <div className="nav-item"><BarChart2 size={14} /> Analytics</div>
        </div>
        <div className="nav-section">
          <div className="nav-label">Pipelines</div>
          <div className="nav-item">TikTok Engine</div>
          <div className="nav-item">AURION Monitor</div>
        </div>
        <div className="sidebar-footer">
          <div className="server-status">
            <div>CPU <span className="val">18%</span></div>
            <div>uptime <span className="val">6d 14h</span></div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main">
        <div className="content">
          
          <div className="page-header">
            <div>
              <div className="page-title">CONTENT <span>OPS</span></div>
              <div className="page-subtitle">// unified trendivalux automation engine</div>
            </div>
            <div className="header-actions">
              <motion.button whileTap={{ scale: 0.95 }} className="btn btn-primary" onClick={triggerRun}>
                <Play size={12} /> TRIGGER RUN
              </motion.button>
            </div>
          </div>

          <div className="stats-row">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
              <div className="stat-label">Videos Queued</div>
              <div className="stat-value cyan">14</div>
              <div className="stat-delta">↑ 3 from yesterday</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
              <div className="stat-label">Scripts Generated</div>
              <div className="stat-value">38</div>
              <div className="stat-delta">↑ 8 this week</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card">
              <div className="stat-label">Avg Engagement</div>
              <div className="stat-value green">4.2%</div>
              <div className="stat-delta">↑ 0.6% vs avg</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="stat-card">
              <div className="stat-label">Outlier Formulas</div>
              <div className="stat-value amber">3</div>
              <div className="stat-delta" style={{ color: 'var(--amber)' }}>→ 50k+ views each</div>
            </motion.div>
          </div>

          <div className="pipeline-panel">
            <div className="panel-header">
              <div className="panel-title">LIVE KANBAN PIPELINE</div>
              <div className="tabs">
                 <div className={`tab ${pipelineFilter === 'all' && 'active'}`} onClick={() => setPipelineFilter('all')}>All</div>
                 <div className={`tab ${pipelineFilter === 'mine' && 'active'}`} onClick={() => setPipelineFilter('mine')}>Mine</div>
              </div>
            </div>
            <div className="pipeline">
              <div className="pipeline-stage">
                <div className="stage-header">Trend Mined <span className="stage-count">2</span></div>
                <motion.div whileHover={{ y: -2 }} className="content-card">
                  <span className="card-priority priority-high"></span>
                  <span className="content-card-tag tag-trend">#sealsaltspray</span>
                  <div className="content-card-title">2.1M views, rising</div>
                  <div className="content-card-meta"><span>6h ago</span><span style={{color: 'var(--cyan)'}}>94 score</span></div>
                </motion.div>
                <div className="content-card">
                  <span className="card-priority priority-mid"></span>
                  <span className="content-card-tag tag-trend">#permhair</span>
                  <div className="content-card-title">low comp, high ENG</div>
                  <div className="content-card-meta"><span>1h ago</span><span style={{color: 'var(--cyan)'}}>71 score</span></div>
                </div>
              </div>
              <div className="pipeline-stage">
                <div className="stage-header">Scripted <span className="stage-count">1</span></div>
                <motion.div whileHover={{ y: -2 }} className="content-card">
                  <span className="card-priority priority-high"></span>
                  <span className="content-card-tag tag-scripted">SCRIPTED</span>
                  <div className="content-card-title">"Why your hair looks wet even when it's dry"</div>
                  <div className="content-card-meta"><span>Hook A</span><span>18s</span></div>
                </motion.div>
              </div>
              <div className="pipeline-stage">
                <div className="stage-header">Brief Ready <span className="stage-count">1</span></div>
                <div className="content-card">
                  <span className="content-card-tag tag-brief">BRIEF</span>
                  <div className="content-card-title">"The ingredient most sprays hide"</div>
                  <div className="content-card-meta"><span>3 b-rolls</span><span>16s</span></div>
                </div>
              </div>
              <div className="pipeline-stage">
                 <div className="stage-header">Filmed <span className="stage-count">1</span></div>
                 <div className="content-card">
                  <span className="content-card-tag tag-filmed">FILMED</span>
                  <div className="content-card-title">"Sea salt vs every other spray"</div>
                  <div className="content-card-meta"><span>Ready</span><span>↑ queue</span></div>
                </div>
              </div>
              <div className="pipeline-stage">
                <div className="stage-header">Scheduled <span className="stage-count">1</span></div>
                <div className="content-card">
                  <span className="content-card-tag tag-live">POSTED</span>
                  <div className="content-card-title">"Why I made sea salt spray at 19"</div>
                  <div className="content-card-meta"><span>142K views</span><span style={{color: 'var(--cyan)'}}>OUTLIER</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="two-col">
            <div className="pipeline-panel">
               <div className="panel-header">
                <div className="panel-title">PIPELINE GRAPH</div>
                <span className={`panel-pill ${wfActive ? 'badge-active' : 'pill-active'}`}>
                   {wfActive ? 'RUNNING' : 'LIVE'}
                </span>
               </div>
               <div className="node-canvas">
                 <div className="node-row">
                    <motion.div animate={wfActive ? { scale: [1, 1.05, 1] } : {}} transition={{ repeat: Infinity, duration: 2 }} className={`node ${wfActive ? 'active' : 'done'}`}>
                      <div className="node-box">
                        <MonitorPlay className="node-icon" size={24} color={wfActive ? 'var(--cyan)' : 'var(--green)'} />
                        <div className="node-label">Apify</div>
                      </div>
                    </motion.div>
                    
                    <motion.div animate={wfActive ? { y: [-2, 2, -2] } : {}} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className={`node ${wfActive ? 'active' : 'idle'}`}>
                      <div className="node-box">
                        <Activity className="node-icon" size={24} color={wfActive ? 'var(--cyan)' : 'var(--amber)'} />
                        <div className="node-label">Claude</div>
                      </div>
                    </motion.div>

                    <div className="node idle">
                      <div className="node-box">
                        <MonitorPlay className="node-icon" size={24} color="var(--amber)" />
                        <div className="node-label">Render</div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>

            <div className="pipeline-panel">
              <div className="panel-header">
                <div className="panel-title">LIVE TREND FEED</div>
                <button className="btn btn-outline" style={{padding: '4px 10px', fontSize:'9px'}}>↻ Sync</button>
              </div>
              <div style={{padding: '0 20px'}}>
                <div className="trend-item">
                  <div className="trend-rank hot">01</div>
                  <div className="trend-info">
                    <div className="trend-hashtag">#sealsaltspray</div>
                    <div className="trend-stats"><span>2.1M views</span><span>4.8% ENG</span></div>
                  </div>
                  <div className="trend-action"><ArrowRight size={12}/> Script</div>
                </div>
                <div className="trend-item">
                  <div className="trend-rank hot">02</div>
                  <div className="trend-info">
                    <div className="trend-hashtag">#looksmaxxing</div>
                    <div className="trend-stats"><span>3.4M views</span><span>3.1% ENG</span></div>
                  </div>
                  <div className="trend-action"><ArrowRight size={12}/></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function RunScriptDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem('gemlogin_token') || '');
  const [deviceId, setDeviceId] = useState(() => localStorage.getItem('gemlogin_deviceId') || '');
  const [profileId, setProfileId] = useState(() => localStorage.getItem('gemlogin_profileId') || '');
  const [workflowId, setWorkflowId] = useState(() => localStorage.getItem('gemlogin_workflowId') || '');
  const [softId, setSoftId] = useState(() => localStorage.getItem('gemlogin_softId') || '1');
  const [closeBrowser, setCloseBrowser] = useState(() => {
    const saved = localStorage.getItem('gemlogin_closeBrowser');
    return saved !== null ? saved === 'true' : false;
  });
  const [paramsBody, setParamsBody] = useState(() => localStorage.getItem('gemlogin_paramsBody') || JSON.stringify({ Searching: "Gemlogin", Website: "https://gemlogin.io" }, null, 2));
  
  const [status, setStatus] = useState('Idle'); // Idle, Running, Success, Error
  const [logs, setLogs] = useState([]);
  
  const logsEndRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Save to localStorage whenever inputs change
  useEffect(() => {
    localStorage.setItem('gemlogin_token', token);
    localStorage.setItem('gemlogin_deviceId', deviceId);
    localStorage.setItem('gemlogin_profileId', profileId);
    localStorage.setItem('gemlogin_workflowId', workflowId);
    localStorage.setItem('gemlogin_softId', softId);
    localStorage.setItem('gemlogin_closeBrowser', closeBrowser.toString());
    localStorage.setItem('gemlogin_paramsBody', paramsBody);
  }, [token, deviceId, profileId, workflowId, softId, closeBrowser, paramsBody]);

  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, message, type }]);
  };

  const handleRunScript = async () => {
    setStatus('Running');
    setLogs([]); // Clear logs on new run
    addLog('Starting script execution...', 'info');
    
    addLog('Initializing Cloud Environment...', 'info');
    addLog(`Loading Profile IDs: ${profileId}`, 'info');
    
    try {
      // Parse JSON to ensure it's valid before sending
      let parsedParams = {};
      try {
        parsedParams = JSON.parse(paramsBody);
      } catch (err) {
        throw new Error('Invalid JSON format in Parameter Body');
      }

      const payload = {
        token: token,
        device_id: deviceId,
        profile_id: profileId.split(',').map(id => id.trim()).filter(id => id),
        workflow_id: workflowId,
        parameter: parsedParams,
        soft_id: softId,
        close_browser: closeBrowser
      };

      addLog('Sending POST request to https://app.gemlogin.io/api/v2/execscript...', 'info');
      addLog(`Payload: ${JSON.stringify(payload, null, 2)}`, 'info');

      const response = await fetch('https://app.gemlogin.io/api/v2/execscript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || `API Error (HTTP ${response.status})`);
      }

      addLog(`Response: ${JSON.stringify(data)}`, 'success');
      addLog('Execution completed successfully!', 'success');
      setStatus('Success');
      
    } catch (error) {
      addLog(`Error: ${error.message}`, 'error');
      setStatus('Error');
    }
  };

  const handleStopScript = () => {
    if (status !== 'Running') return;
    setStatus('Error');
    addLog('Script forcefully stopped by user.', 'error');
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(paramsBody);
    alert('JSON Copied to clipboard!');
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const getStatusColor = () => {
    switch(status) {
      case 'Running': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Success': return 'bg-green-100 text-green-800 border-green-300';
      case 'Error': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 font-sans pt-40 pb-12 m-0 mt-0 box-border leading-relaxed relative z-10 block">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 mt-0 pt-0 block">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4 mt-0 leading-tight block">
            Cloud <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">Run Script</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-normal m-0 mt-4 block">
            Execute your GemLogin workflows instantly from the cloud. Monitor live logs and manage your automation seamlessly.
          </p>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Setup */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/60 shadow-blue-500/10 transition-all hover:shadow-blue-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 m-0 p-0 leading-none h-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Payload Configuration
                </h2>
                <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor()}`}>
                  {status}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 mt-0">API Token</label>
                  <input 
                    type="password" 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full px-4 py-3 h-auto bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none m-0 focus:outline-none box-border"
                    placeholder="Enter your API token"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 mt-0">Device ID</label>
                    <input 
                      type="text" 
                      value={deviceId}
                      onChange={(e) => setDeviceId(e.target.value)}
                      className="w-full px-4 py-3 h-auto bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none m-0 focus:outline-none box-border"
                      placeholder="e.g. 445DC6..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 mt-0">Profile IDs (comma separated)</label>
                    <input 
                      type="text" 
                      value={profileId}
                      onChange={(e) => setProfileId(e.target.value)}
                      className="w-full px-4 py-3 h-auto bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none m-0 focus:outline-none box-border"
                      placeholder="e.g. 69b42f..."
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 mt-0">Workflow ID</label>
                    <input 
                      type="text" 
                      value={workflowId}
                      onChange={(e) => setWorkflowId(e.target.value)}
                      className="w-full px-4 py-3 h-auto bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none m-0 focus:outline-none box-border"
                      placeholder="e.g. oigOcuy..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 mt-0">Soft ID</label>
                    <input 
                      type="text" 
                      value={softId}
                      onChange={(e) => setSoftId(e.target.value)}
                      className="w-full px-4 py-3 h-auto bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none m-0 focus:outline-none box-border"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="closeBrowser"
                    checked={closeBrowser}
                    onChange={(e) => setCloseBrowser(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="closeBrowser" className="text-sm font-medium text-slate-700 select-none cursor-pointer">
                    Close Browser execution
                  </label>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-medium text-slate-700 mt-0">Parameter Body (JSON)</label>
                    <button 
                      onClick={handleCopyJson}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors bg-transparent border-none p-0 cursor-pointer"
                    >
                      Copy JSON
                    </button>
                  </div>
                  <textarea 
                    value={paramsBody}
                    onChange={(e) => {
                      const value = e.target.value;
                      setParamsBody(value);
                      
                      try {
                        const parsed = JSON.parse(value);
                        // If pasted JSON has 'token', 'profile_id', etc. extract them
                        if (parsed && typeof parsed === 'object') {
                          let updated = false;
                          if (parsed.token) { setToken(parsed.token); updated = true; }
                          if (parsed.device_id) { setDeviceId(parsed.device_id); updated = true; }
                          if (parsed.profile_id) { 
                            const ids = Array.isArray(parsed.profile_id) ? parsed.profile_id.join(', ') : parsed.profile_id;
                            setProfileId(ids); 
                            updated = true; 
                          }
                          if (parsed.workflow_id) { setWorkflowId(parsed.workflow_id); updated = true; }
                          if (parsed.soft_id) { setSoftId(parsed.soft_id); updated = true; }
                          if (parsed.close_browser !== undefined) { setCloseBrowser(parsed.close_browser === true || parsed.close_browser === 'true'); updated = true; }
                          
                          // Determine what goes back into the text area
                          if (updated) {
                            if (parsed.parameter !== undefined) {
                              // If there's an explicit 'parameter' object, keep only that
                              setParamsBody(typeof parsed.parameter === 'object' ? JSON.stringify(parsed.parameter, null, 2) : String(parsed.parameter));
                            } else {
                              // Otherwise, collect any remaining unmapped keys and keep them as custom parameters
                              const { 
                                token, device_id, profile_id, workflow_id, soft_id, close_browser, 
                                ...rest 
                              } = parsed;
                              
                              if (Object.keys(rest).length > 0) {
                                setParamsBody(JSON.stringify(rest, null, 2));
                              } else {
                                setParamsBody('{\n  \n}');
                              }
                            }
                          }
                        }
                      } catch (err) {
                        // Not valid JSON yet, just let user type normally
                      }
                    }}
                    className="w-full h-32 px-4 py-3 bg-slate-800 text-sky-100 font-mono text-sm border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none m-0 box-border leading-relaxed"
                    spellCheck="false"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3 h-auto">
                <button 
                  onClick={handleRunScript}
                  disabled={status === 'Running'}
                  className={`flex-[3] w-full py-4 px-6 rounded-xl font-semibold text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center gap-2 border-none cursor-pointer m-0 text-base h-auto
                    ${status === 'Running' 
                      ? 'bg-blue-400 cursor-not-allowed opacity-80' 
                      : 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 hover:shadow-lg hover:-translate-y-0.5'}`}
                >
                  {status === 'Running' ? (
                    <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Running...</>
                  ) : (
                    <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg> Run Script</>
                  )}
                </button>
                
                <button 
                  onClick={handleStopScript}
                  disabled={status !== 'Running'}
                  className={`flex-1 w-full px-4 py-4 rounded-xl font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex justify-center items-center cursor-pointer m-0 border h-auto
                    ${status !== 'Running'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                      : 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200 hover:border-red-300'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Log Console */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f111a] rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col h-full min-h-[400px]">
              
              {/* Console Header */}
              <div className="bg-[#1a1d27] px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-slate-400 text-xs font-mono ml-2">Execution Console</span>
                </div>
                <button 
                  onClick={handleClearLogs}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer m-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Clear
                </button>
              </div>

              {/* Console Body */}
              <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-600">
                    No logs to display. Initialize a run.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <div key={index} className="flex gap-3 hover:bg-white/5 px-2 py-0.5 rounded transition-colors">
                        <span className="text-slate-500 shrink-0 select-none">[{log.time}]</span>
                        <span className={`
                          ${log.type === 'error' ? 'text-red-400' : ''}
                          ${log.type === 'success' ? 'text-emerald-400 font-semibold' : ''}
                          ${log.type === 'info' ? 'text-green-400' : ''}
                        `}>
                          {log.message}
                        </span>
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

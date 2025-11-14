(function(){
  const qs = (params) => Object.entries(params).filter(([k,v])=>v!==undefined && v!==null && String(v)!=='').map(([k,v])=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

  const $ = id => document.getElementById(id);
  const status = $('status');
  const out = $('output');
  let lastJson = null;

  document.getElementById('qform').addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    status.textContent = 'Running...';
    out.textContent = '';

    const params = {
      start_date: $('start_date').value,
      end_date: $('end_date').value,
      account_type: $('account_type').value,
      columns: $('columns').value,
      minorversion: $('minorversion').value
    };

    const url = '/reports/general-ledger?' + qs(params);
    try {
      const r = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
      if (!r.ok) {
        const txt = await r.text();
        status.textContent = `Error ${r.status}`;
        out.textContent = txt;
        lastJson = null;
        return;
      }
      const json = await r.json();
      lastJson = json;
      out.textContent = JSON.stringify(json, null, 2);
      status.textContent = 'Done';
    } catch (err) {
      status.textContent = 'Network error';
      out.textContent = String(err);
      lastJson = null;
    }
  });

  document.getElementById('downloadJson').addEventListener('click', ()=>{
    if (!lastJson) return alert('No result to download');
    const blob = new Blob([JSON.stringify(lastJson,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `general-ledger-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });

  document.getElementById('clear').addEventListener('click', ()=>{
    out.textContent = 'No result yet.';
    status.textContent = '';
    lastJson = null;
  });
})();

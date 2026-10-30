export const STORAGE_KEY = 'aquagest-data-v1';
export const SESSION_KEY = 'aquagest-session-v1';
export const number = (v) => new Intl.NumberFormat('pt-BR', {maximumFractionDigits: 1}).format(v);
export const liters = (v) => `${number(v)} L`;
export const monthLabel = (month, short = false) => new Intl.DateTimeFormat('pt-BR', {month: short ? 'short' : 'long', ...(short ? {} : {year: 'numeric'}), timeZone: 'UTC'}).format(new Date(`${month}-02T12:00:00Z`));
export function previousMonth(month) { const [y,m] = month.split('-').map(Number); return `${m === 1 ? y-1 : y}-${String(m === 1 ? 12 : m-1).padStart(2,'0')}`; }
export function variation(current, previous) { return previous == null || previous === 0 || current == null ? null : (current - previous) / previous * 100; }
export function makeSeed() {
  const buildings = [
    {id:'a', name:'Escola A', type:'Escola', location:'Centro', manager:'Ana Ribeiro', goal:11000},
    {id:'b', name:'Escola B', type:'Escola', location:'Jardim das Flores', manager:'Carlos Lima', goal:8500},
    {id:'c', name:'Sede administrativa', type:'Escritório', location:'Centro', manager:'Marina Costa', goal:6500},
    {id:'d', name:'Centro esportivo', type:'Órgão público', location:'Vila Nova', manager:'Pedro Santos', goal:12000},
  ];
  const values = {a:[14200,13500,12800,13100,12000,10500],b:[8700,8100,8300,7900,8000,9200],c:[7800,7200,6900,6800,6500,5800],d:[14500,13800,13200,12900,12500,11000]};
  return {version:1,settings:{institution:'Instituto Horizonte',name:'Visitante',email:'visitante@exemplo.com',type:'Escola',threshold:10},buildings,records:buildings.flatMap(b=>values[b.id].map((value,i)=>({id:`${b.id}-${i}`,buildingId:b.id,month:`2026-${String(i+5).padStart(2,'0')}`,value}))),reviewed:[]};
}
export function consumption(data, id, month) { return data.records.find(r=>r.buildingId===id && r.month===month)?.value ?? null; }
export function rowsFor(data, month) { return data.buildings.map(b=>{ const current=consumption(data,b.id,month), previous=consumption(data,b.id,previousMonth(month)); return {...b,current,previous,change:variation(current,previous)}; }); }
export function alertsFor(data) {
  return data.records.flatMap(r=>{
    const b=data.buildings.find(b=>b.id===r.buildingId); if(!b) return [];
    const prev=consumption(data,b.id,previousMonth(r.month)); const change=variation(r.value,prev);
    if(change===null || change<=data.settings.threshold) return [];
    const key=`${r.id}:${r.value}:${prev}`;
    return [{...r,building:b,previous:prev,change,key,reviewed:data.reviewed.includes(key)}];
  }).sort((a,b)=>b.month.localeCompare(a.month));
}
export function saveRecord(data, input) {
  if(!data.buildings.some(b=>b.id===input.buildingId)) throw new Error('Selecione um prédio cadastrado.');
  if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(input.month)) throw new Error('Informe um mês válido.');
  if(!Number.isFinite(input.value) || input.value<0 || input.value>1e12) throw new Error('Informe um consumo entre 0 e 1 trilhão de litros.');
  const existing=data.records.find(r=>r.buildingId===input.buildingId && r.month===input.month);
  return {...data,records:existing?data.records.map(r=>r.id===existing.id?{...r,value:input.value}:r):[...data.records,{...input,id:crypto.randomUUID()}]};
}
export function deleteBuilding(data,id) { return {...data,buildings:data.buildings.filter(b=>b.id!==id),records:data.records.filter(r=>r.buildingId!==id)}; }
export function csvFor(rows, month) {
  const cell=v=>`"${String(v??'').replace(/^[=+@\-\t\r]/,"'$&").replaceAll('"','""')}"`;
  return '\uFEFF'+[['Prédio','Mês','Consumo anterior (L)','Consumo atual (L)','Variação (%)'],...rows.map(r=>[r.name,month,r.previous,r.current,r.change==null?'':r.change.toFixed(2).replace('.',',')])].map(row=>row.map(cell).join(';')).join('\r\n');
}
export function validateData(d) {
  return d?.version===1 && d.settings && typeof d.settings.institution==='string' && Number.isFinite(d.settings.threshold) && Array.isArray(d.buildings) && d.buildings.every(b=>typeof b.id==='string' && typeof b.name==='string' && Number.isFinite(b.goal)) && Array.isArray(d.records) && d.records.every(r=>typeof r.id==='string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(r.month) && Number.isFinite(r.value) && r.value>=0) && Array.isArray(d.reviewed);
}
export function loadData(storage) { try { const raw=storage.getItem(STORAGE_KEY); if(!raw)return {data:makeSeed(),error:''};const d=JSON.parse(raw); if(!validateData(d))throw Error();return {data:d,error:''}; }catch{return {data:makeSeed(),error:'Não foi possível ler os dados salvos. A demonstração foi carregada; exporte seus registros antes de restaurar.'};} }

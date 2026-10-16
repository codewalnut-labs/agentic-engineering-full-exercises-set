const cell=value=>{
  let text=String(value??'');
  if(/^[\s]*[=+@-]/.test(text))text="'"+text;
  return /[",\r\n]/.test(text)?'"'+text.replaceAll('"','""')+'"':text;
};
export function serializeRecords(records) {
  return [['id','title','status'],...records.map(row=>[row.id,row.title,row.status])].map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
}

export function filterRecords(records,{status='All',query=''}={}) {
  const needle=query.trim().toLocaleLowerCase('en-US');
  return records.filter(row=>(status==='All'||row.status===status)&&(!needle||row.title.toLocaleLowerCase('en-US').includes(needle)));
}

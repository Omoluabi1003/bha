'use client';
import {useState} from 'react';
export default function AccountCreateForm(){const [message,setMessage]=useState('');return <section className="portalCard"><div><h2>Create school account</h2><p>Authorized management can issue student, parent and staff access here.</p><button type="button" onClick={()=>setMessage('Secure account issuance will use the protected server provisioning endpoint.')}>Create account</button>{message&&<p>{message}</p>}</div></section>}

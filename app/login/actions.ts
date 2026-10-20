'use server';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const allowedRoles = new Set(['admin','teacher','parent','student']);
export async function login(formData: FormData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  if (!email || !password) redirect('/login?error=missing');
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect('/login?error=invalid');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
  const role = profile?.role;
  if (!role || !allowedRoles.has(role)) { await supabase.auth.signOut(); redirect('/login?error=access'); }
  redirect(role === 'student' ? '/cbt' : `/dashboard/${role}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

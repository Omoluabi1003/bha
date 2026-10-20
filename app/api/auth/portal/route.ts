import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
export async function GET(req:Request){const url=new URL(req.url);const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.redirect(new URL('/login?next=/portal',url));const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).single();if(!profile)return NextResponse.redirect(new URL('/login',url));return NextResponse.redirect(new URL('/portal',url));}

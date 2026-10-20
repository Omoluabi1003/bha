import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const roles=['proprietor','staff','parent','student'] as const;
type Role=(typeof roles)[number];

export async function middleware(request:NextRequest){
  let response=NextResponse.next({request});
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!url||!key){
    if(request.nextUrl.pathname.startsWith('/dashboard/')) return NextResponse.redirect(new URL('/login?error=configuration',request.url));
    return response;
  }
  const supabase=createServerClient(url,key,{cookies:{getAll(){return request.cookies.getAll()},setAll(items){items.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});items.forEach(({name,value,options})=>response.cookies.set(name,value,options))}}});
  const {data:{user}}=await supabase.auth.getUser();
  const path=request.nextUrl.pathname;
  if(path.startsWith('/dashboard/')){
    if(!user) return NextResponse.redirect(new URL('/login',request.url));
    const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();
    const role=profile?.role as Role|undefined;
    if(!role||!roles.includes(role)) return NextResponse.redirect(new URL('/login?error=access',request.url));
    const requested=path.split('/')[2];
    if(requested&&roles.includes(requested as Role)&&requested!==role) return NextResponse.redirect(new URL(`/dashboard/${role}`,request.url));
  }
  if(path==='/login'&&user){
    const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();
    const role=profile?.role as Role|undefined;
    if(role&&roles.includes(role)) return NextResponse.redirect(new URL(`/dashboard/${role}`,request.url));
  }
  return response;
}

export const config={matcher:['/dashboard/:path*','/login']};

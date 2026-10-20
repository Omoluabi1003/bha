import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Best Home Academy, Eket";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",position:"relative",overflow:"hidden",background:"#F7F5EF",color:"#14213A",fontFamily:"Arial, sans-serif"}}>
      <div style={{position:"absolute",inset:0,display:"flex",background:"linear-gradient(125deg,#F7F5EF 0%,#FFFDF9 58%,#EAD8AA 100%)"}} />
      <div style={{position:"absolute",right:-110,top:-150,width:540,height:540,borderRadius:999,display:"flex",background:"#14213A",opacity:.07}} />
      <div style={{position:"absolute",right:70,bottom:-220,width:520,height:520,borderRadius:999,display:"flex",border:"2px solid #C89B42",opacity:.22}} />
      <div style={{position:"relative",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"68px 78px",width:"100%"}}>
        <div style={{display:"flex",alignItems:"center",gap:22}}>
          <div style={{width:92,height:104,border:"2px solid #C89B42",borderRadius:"10px 10px 34px 34px",display:"flex",alignItems:"center",justifyContent:"center",background:"#14213A",color:"#EAD8AA",fontWeight:900,fontSize:25}}>BHA</div>
          <div style={{display:"flex",flexDirection:"column"}}><div style={{fontWeight:900,fontSize:34,letterSpacing:"-1px"}}>BEST HOME ACADEMY</div><div style={{fontSize:17,letterSpacing:"4px",marginTop:8,color:"#766F62"}}>EKET • AKWA IBOM STATE</div></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",maxWidth:900}}>
          <div style={{fontFamily:"Georgia, serif",fontSize:62,lineHeight:1.04,letterSpacing:"-2px"}}>Preparation that turns <span style={{color:"#9A6B15"}}>ambition</span> into results.</div>
          <div style={{fontSize:22,lineHeight:1.45,marginTop:24,color:"#5B6780"}}>JAMB • WAEC • NECO • University Admission Preparation</div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:17,color:"#766F62"}}><span>16 Umana Ndon, Eket, Nigeria</span><span style={{color:"#9A6B15",fontWeight:800}}>Excellence in every detail.</span></div>
      </div>
    </div>,
    size
  );
}

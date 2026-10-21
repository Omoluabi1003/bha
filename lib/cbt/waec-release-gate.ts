import {auditWaecCatalog} from './waec-catalog-guard';
import {auditWaecReadiness} from './waec-readiness-audit';

/** Consolidated release signal for the WAEC picker. Academic certification is tracked separately. */
export function waecReleaseGate(){
 const catalog=auditWaecCatalog();
 const readiness=auditWaecReadiness();
 const incomplete=readiness.filter(x=>!x.ready);
 return {ready:catalog.valid&&incomplete.length===0,catalog,readiness,incomplete};
}

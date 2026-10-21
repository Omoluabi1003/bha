import {auditWaecCatalog} from './waec-catalog-guard';
import {WAEC_2026_2027_REGULATION_PROFILE} from './waec-regulation-profile';
export function waecProfileIntegrity(){return{catalog:auditWaecCatalog(),regulation:WAEC_2026_2027_REGULATION_PROFILE};}

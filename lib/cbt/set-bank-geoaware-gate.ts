export function assertGeoAwareSetRelease(complete:boolean,distinct:boolean){if(!complete||!distinct)throw new Error('GeoAware CBT gate failed. Do not publish this numbered set.');return true;}

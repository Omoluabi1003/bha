export function setReleaseGate(ready:boolean){if(!ready)throw new Error('GeoAware gate failed: incomplete question set cannot be released.');return true;}

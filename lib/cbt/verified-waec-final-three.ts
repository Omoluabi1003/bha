import type { PracticeQuestion } from './nigerian-subjects';
type Row=[string,string,string[],number];
const make=(subject:string,prefix:string,rows:Row[]):PracticeQuestion[]=>rows.map(([topic,q,o,a],i)=>({id:`${prefix}-${i+1}`,subject,topic,q,o,a}));

export const generalMathematicsFinalGap=make('General Mathematics','waec-general-math-final-gap',[
['Number Bases','Convert 1011₂ to base ten.',['9','10','11','13'],2],
['Construction','The locus of points equidistant from two fixed points is the _____.',['angle bisector','perpendicular bisector','circumference','parallel line'],1],
['Longitude and Time','A difference of 15° in longitude corresponds to a time difference of _____.',['15 minutes','30 minutes','1 hour','2 hours'],2],
['Graphs','The graph of y=2x+3 has y-intercept _____.',['1','2','3','5'],2],
['Statistics','For the values 1,2,3,4,5, the range is _____.',['3','4','5','6'],1],
['Algebra','If 2(x−3)=10, then x equals _____.',['2','5','8','13'],2]
]);

export const furtherMathematicsFinalGap=make('Further Mathematics','waec-further-math-final-gap',[
['Calculus','If y=x³−2x, find dy/dx at x=2.',['6','8','10','12'],2],
['Matrices','For A=[[1,2],[0,3]], the trace of A is _____.',['3','4','5','6'],1],
['Vectors','If a=(2,−1) and b=(3,4), then a·b equals _____.',['−2','2','6','10'],1],
['Complex Numbers','The modulus of 3+4i is _____.',['3','4','5','7'],2],
['Mechanics','A particle moving at constant velocity has acceleration _____.',['zero','constant and non-zero','increasing','undefined'],0]
]);

export const marketingFinalGap=make('Marketing','waec-marketing-final-gap',[
['Marketing Mix','Which element of the marketing mix deals directly with what the customer pays?',['Product','Price','Place','Promotion'],1],
['Distribution','A wholesaler primarily links manufacturers with _____.',['retailers','auditors','employees','regulators'],0],
['Promotion','A short-term incentive designed to encourage immediate purchase is called _____.',['sales promotion','market segmentation','product development','warehousing'],0],
['Consumer Behaviour','A repeat purchase based on satisfaction most directly demonstrates _____.',['customer loyalty','market saturation','industrial action','production loss'],0],
['Branding','A brand name mainly helps consumers to _____.',['identify and distinguish an offering','calculate tax automatically','eliminate distribution','guarantee a monopoly'],0],
['Segmentation','Dividing a market according to age and income uses _____ variables.',['demographic','geological','mechanical','meteorological'],0],
['Pricing','Setting a relatively low introductory price to gain market share is known as _____.',['penetration pricing','skimming','barter pricing','transfer pricing'],0],
['Channels','Selling directly from a producer to the final consumer uses a _____ channel.',['zero-level','two-level','three-level','wholesale-only'],0],
['Research','A questionnaire completed by potential buyers provides _____ data.',['primary','secondary only','archival only','accounting'],0],
['Customer Service','Effective handling of complaints can improve customer _____.',['retention','confusion','switching cost only','production waste'],0]
]);

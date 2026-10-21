import type { PracticeQuestion } from './nigerian-subjects';
type Row=[string,string,string[],number];
const make=(subject:string,prefix:string,rows:Row[]):PracticeQuestion[]=>rows.map(([topic,q,o,a],i)=>({id:`${prefix}-${i+1}`,subject,topic,q,o,a}));

export const generalMathFinal=make('General Mathematics','waec-general-final',[
['Construction','Which instrument is used with a straightedge to construct an angle bisector accurately?',['Pair of compasses','Protractor only','Calculator','Set of logarithm tables'],0],
['Loci','The locus of points equidistant from two fixed points is the _____.',['perpendicular bisector of the joining segment','circle through both points','parallel line through one point','angle bisector at either point'],0],
['Longitude and Latitude','Two places on the same longitude differ principally in their _____.',['latitude','local solar noon','meridian','east-west coordinate'],0],
['Compound Interest','₦10,000 is invested at 10% compound interest per annum. What is its value after two years?',['₦11,000','₦12,000','₦12,100','₦20,000'],2],
['Frequency Distribution','In a frequency table, the total frequency represents the _____.',['number of observations','largest observation','class width','mean value'],0]
]);

export const furtherMathFinal=make('Further Mathematics','waec-further-final',[
['Partial Fractions','Which form is appropriate for decomposing 1/((x+1)(x+2))?',['A/(x+1)+B/(x+2)','A/(x+1)(x+2)+B','A(x+1)+B(x+2)','A/x+B/x²'],0],
['Differential Equations','The general solution of dy/dx=3x² is _____.',['y=x³+C','y=3x³+C','y=6x+C','y=x²+C'],0],
['Numerical Methods','The Newton-Raphson method is primarily used to approximate _____.',['roots of equations','areas of rectangles only','matrix transposes','vector directions'],0],
['Kinematics','For motion with constant acceleration, which relation is correct?',['v²=u²+2as','v=u/as','s=uvt','a=uv+s'],0]
]);

export const marketingFinal=make('Marketing','waec-marketing-final',[
['Product Life Cycle','The stage at which sales rise rapidly and competitors commonly enter the market is the _____ stage.',['growth','decline','pre-production','withdrawal'],0],
['Branding','A major purpose of branding is to _____.',['distinguish a seller’s offering from competing products','remove the need for product quality','guarantee monopoly by law','eliminate distribution'],0],
['Pricing','Penetration pricing involves setting an initially _____ price to gain market share.',['relatively low','random','prohibitively high','unpublished'],0],
['Distribution Channels','A wholesaler primarily links producers with _____.',['retailers and other business buyers','only final household consumers','government tax offices','advertising agencies only'],0],
['Promotion Mix','Personal selling differs from mass advertising because it normally involves _____.',['direct interaction with a prospective buyer','no communication with customers','only unpaid media coverage','automatic price reduction'],0],
['Consumer Behaviour','A purchase made repeatedly with little comparison is commonly classified as _____ buying behaviour.',['habitual','complex industrial tender','organizational restructuring','speculative export'],0],
['Segmentation','Dividing a market by age, income and occupation is _____ segmentation.',['demographic','geographic only','behavioural only','industrial'],0],
['Warehousing','One marketing function of warehousing is to _____.',['hold goods until they are needed','create consumer income','replace transportation completely','set national tax rates'],0],
['Marketing Ethics','A truthful advertisement should avoid _____.',['misleading claims','clear product information','accurate prices','identifying the brand'],0]
]);

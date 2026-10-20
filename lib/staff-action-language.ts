export const staffActionLanguage={
 save:{label:'Save changes',success:'Changes saved.',failure:'We could not save these changes. Your previous information is still available.'},
 review:{label:'Mark as under review',success:'This item is now under review.',failure:'The status could not be changed. Please try again.'},
 approve:{label:'Approve',success:'Approved successfully.',failure:'Approval was not completed. No approval has been recorded.'},
 reject:{label:'Reject',success:'The decision has been recorded as rejected.',failure:'The decision was not recorded. Please try again.'},
 submit:{label:'Submit',success:'Submitted successfully.',failure:'Submission was not completed. Please check the information and try again.'}
} as const;

export const staffUiRules={
 loading:'Use a human action phrase such as Saving changes… instead of technical loading language.',
 empty:'Explain what an empty screen means and what the staff member should do next.',
 error:'State what failed, whether anything changed, and the safest next action. Never expose database or API errors.',
 confirmation:'Confirm sensitive, destructive or financially significant actions before committing them.',
 success:'Confirm the completed school action in plain language.',
 help:'Place contextual guidance beside the workflow where it is needed rather than requiring a separate technical manual.'
} as const;

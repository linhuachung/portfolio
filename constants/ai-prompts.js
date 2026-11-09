/**
 * AI Prompt Templates for Content Generation
 */

export const EXPERIENCE_DESCRIPTION_PROMPT = {
  system: 'You are a professional resume writer specializing in crafting compelling, natural job descriptions that attract recruiters and highlight real value.',

  formatRequirements: [
    'Output ONLY raw HTML code, NO markdown code blocks (do NOT use ```html)',
    'Use proper HTML tags: <p>, <ul>, <li>, <strong>, <em>',
    'Start directly with HTML tags, no markdown formatting',
    'Return pure HTML that can be directly inserted into a rich text editor'
  ],

  contentRequirements: [
    'Write naturally and authentically, avoid robotic or formulaic language',
    'Focus specifically on the company and role provided',
    'Emphasize concrete responsibilities and achievements with metrics when possible',
    'Write to attract recruiters, showcasing value and impact',
    'Use bullet points (<ul><li>) for key responsibilities',
    'Keep it between 200-400 words, concise yet comprehensive',
    'Do NOT repeat the company name or position title in the description (they are already provided separately)'
  ],

  buildPrompt: ( { company, position, location, dateRange, techStack } ) => {
    const contextParts = [
      `Write a professional job description for a ${position} position at ${company}.`
    ];

    if ( location ) {
      contextParts.push( `Location: ${location}.` );
    }

    if ( dateRange ) {
      contextParts.push( dateRange );
    }

    if ( techStack && techStack.length > 0 ) {
      contextParts.push( `Technologies used: ${techStack.join( ', ' )}.` );
    }

    const formatSection = EXPERIENCE_DESCRIPTION_PROMPT.formatRequirements
      .map( req => `- ${req}` )
      .join( '\n' );

    const contentSection = EXPERIENCE_DESCRIPTION_PROMPT.contentRequirements
      .map( req => `- ${req}` )
      .join( '\n' );

    return `${EXPERIENCE_DESCRIPTION_PROMPT.system}

${contextParts.join( ' ' )}

FORMATTING REQUIREMENTS:
${formatSection}

CONTENT REQUIREMENTS:
${contentSection}

Generate the description now (output ONLY raw HTML, no markdown):`;
  }
};

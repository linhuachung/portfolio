import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire( import.meta.url );
const axePath = require.resolve( 'axe-core/axe.min.js' );
const viewports = [
  { width: 320, height: 568 },
  { width: 667, height: 375 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 }
];
const routes = [
  '/',
  '/resume?section=experience&role=mercatus&panel=projects&project=mercatus',
  '/resume?section=experience&role=nab&panel=summary',
  '/resume?section=skills',
  '/resume?section=education',
  '/resume?section=about',
  '/services?service=frontend',
  '/contact'
];
const projectRecords = [
  ['mercatus', 'mercatus', 'Mercatus Grocery Commerce', 'Mercatus Technologies Inc.', null],
  ['nab', 'nab', 'Join NAB Customer Onboarding', 'NAB Innovation Centre Vietnam', 'National Australia Bank (NAB)'],
  ['dronex', 'bap', 'DroneX', 'BAP IT Co., JSC', null],
  ['bintech', 'bap', 'Bintech', 'BAP IT Co., JSC', null],
  ['shinhan', 'fpt', 'Shinhan Bank Operations', 'FPT Software', 'Shinhan Bank']
];
const roleRecords = [
  ['fpt', 'FPT Software', 'Frontend Developer'],
  ['bap', 'BAP IT Co., JSC', 'Full-stack Developer'],
  ['mercatus', 'Mercatus Technologies Inc.', 'Frontend Developer'],
  ['nab', 'NAB Innovation Centre Vietnam', 'Software Engineer (Frontend)']
];
const titleCase = value => value.charAt( 0 ).toUpperCase() + value.slice( 1 );

async function chooseService( page, label ) {
  await page.getByRole( 'combobox', { name: 'Conversation topic' } ).click();
  await page.getByRole( 'option', { name: label } ).click();
}

async function getLayoutState( page ) {
  return page.evaluate( () => ( {
    documentHeight: document.documentElement.scrollHeight,
    bodyHeight: document.body.scrollHeight,
    viewportHeight: window.innerHeight,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    mainScrollHeight: document.querySelector( 'main' ).scrollHeight,
    mainClientHeight: document.querySelector( 'main' ).clientHeight,
    mainOverflow: document.querySelector( 'main' ).scrollHeight > document.querySelector( 'main' ).clientHeight + 1,
    clippedFocusTargets: [...document.querySelectorAll( 'a, button, input, select, textarea, [tabindex="0"]' )]
      .filter( element => element.offsetParent !== null )
      .filter( element => {
        const rect = element.getBoundingClientRect();
        return rect.top < -1 || rect.bottom > window.innerHeight + 1 || rect.left < -1 || rect.right > window.innerWidth + 1;
      } ).map( element => element.textContent?.trim() || element.getAttribute( 'aria-label' ) )
  } ) );
}

async function expectOneScreenLayout( page, label ) {
  const layout = await getLayoutState( page );
  expect.soft( layout.documentHeight, `${label} document height` ).toBeLessThanOrEqual( layout.viewportHeight + 1 );
  expect.soft( layout.bodyHeight, `${label} body height` ).toBeLessThanOrEqual( layout.viewportHeight + 1 );
  expect.soft( layout.horizontalOverflow, `${label} horizontal overflow` ).toBe( false );
  expect.soft( layout.mainOverflow, `${label} internal overflow (${layout.mainScrollHeight}/${layout.mainClientHeight})` ).toBe( false );
  expect.soft( layout.clippedFocusTargets, `${label} clipped focus targets` ).toEqual( [] );
}

for ( const viewport of viewports ) {
  test( `public routes fit ${viewport.width}x${viewport.height}`, async ( { page } ) => {
    await page.setViewportSize( viewport );
    for ( const route of routes ) {
      await page.goto( route );
      await expect( page.locator( 'main' ) ).toBeVisible();
      await expectOneScreenLayout( page, route );
    }
  } );
}

test( 'company project state supports controls and browser history', async ( { page } ) => {
  await page.goto( '/resume?section=experience&role=bap&panel=projects&project=dronex' );
  await page.getByRole( 'link', { name: /04 Bintech/ } ).click();
  await expect( page ).toHaveURL( /role=bap&panel=projects&project=bintech/ );
  await page.goBack();
  await expect( page ).toHaveURL( /role=bap&panel=projects&project=dronex/ );
} );

test( 'legacy work URLs redirect into the matching company project in resume', async ( { page } ) => {
  await page.goto( '/work?project=bintech&panel=context' );
  await expect( page ).toHaveURL( /\/resume\?section=experience&role=bap&panel=projects&project=bintech/ );
  await expect( page.getByRole( 'heading', { name: 'Bintech', level: 3 } ) ).toBeVisible();
  await expect( page.getByRole( 'link', { name: /DroneX/ } ) ).toBeVisible();
  await expect( page.getByRole( 'link', { name: /Bintech/ } ) ).toHaveAttribute( 'aria-current', 'true' );
} );

test( 'home leads with professional identity instead of a project preview', async ( { page } ) => {
  await page.goto( '/' );
  await expect( page.getByRole( 'link', { name: 'View Experience' } ) ).toHaveAttribute( 'href', /\/resume\?section=experience&role=nab&panel=summary/ );
  await expect( page.getByRole( 'link', { name: 'Contact' } ).first() ).toBeVisible();
  await expect( page.getByRole( 'navigation', { name: 'Professional links' } ).getByRole( 'link' ) ).toHaveCount( 3 );
  await expect( page.getByRole( 'link', { name: /GitHub/ } ) ).toHaveAttribute( 'href', 'https://github.com/linhuachung' );
  await expect( page.getByRole( 'complementary', { name: 'Professional identity' } ) ).toBeVisible();
  await expect( page.getByText( 'Software Engineer (Frontend)', { exact: true } ) ).toBeVisible();
  await expect( page.getByText( 'Frontend engineering since 2021', { exact: true } ) ).toBeVisible();
  await expect( page.getByRole( 'heading', { name: 'Mercatus Grocery Commerce' } ) ).toHaveCount( 0 );
  await expect( page.getByRole( 'img', { name: 'Mercatus grocery commerce storefront interface' } ) ).toHaveCount( 0 );
} );

test( 'public navigation presents engineering expertise instead of freelance services', async ( { page } ) => {
  await page.goto( '/' );
  await expect( page.getByRole( 'navigation', { name: 'Primary navigation' } ).getByRole( 'link', { name: 'Expertise' } ) ).toHaveAttribute( 'href', '/services' );
  await expect( page.getByRole( 'navigation', { name: 'Primary navigation' } ).getByRole( 'link', { name: 'Services' } ) ).toHaveCount( 0 );

  await page.goto( '/services' );
  await expect( page.getByRole( 'heading', { name: 'How I contribute to product teams.', level: 1 } ) ).toBeVisible();
} );

test( 'contact asks for a conversation topic with audience-friendly choices', async ( { page } ) => {
  await page.goto( '/contact' );
  const topic = page.getByRole( 'combobox', { name: 'Conversation topic' } );
  await topic.click();
  await expect( page.getByRole( 'option', { name: 'Product interface or workflow' } ) ).toBeVisible();
  await expect( page.getByRole( 'option', { name: 'Design system or UI implementation' } ) ).toBeVisible();
  await expect( page.getByRole( 'option', { name: 'Performance or accessibility review' } ) ).toBeVisible();
  await expect( page.getByRole( 'option', { name: 'Engineering role or collaboration' } ) ).toBeVisible();
} );

test( 'contact intro and form never overlap on compact desktop widths', async ( { page } ) => {
  await page.setViewportSize( { width: 760, height: 502 } );
  await page.goto( '/contact' );

  const heading = await page.getByRole( 'heading', { name: 'Tell me what needs to become clearer.', level: 1 } ).boundingBox();
  const form = await page.getByTestId( 'contact-form-panel' ).boundingBox();
  expect( heading.x + heading.width + 12 ).toBeLessThanOrEqual( form.x );
  await expectOneScreenLayout( page, 'contact compact desktop' );
} );

test( 'public buttons share a softened corner language', async ( { page } ) => {
  const routesAndButtons = [
    ['/', 'link', 'View Experience'],
    ['/resume', 'button', 'NAB'],
    ['/services', 'tab', 'Frontend Engineering'],
    ['/contact', 'button', 'Continue to Message']
  ];

  for ( const [route, role, name] of routesAndButtons ) {
    await page.goto( route );
    const button = page.getByRole( role, { name: new RegExp( name ) } ).first();
    const radius = await button.evaluate( element => parseFloat( getComputedStyle( element ).borderTopLeftRadius ) );
    expect( radius, `${route} button radius` ).toBeGreaterThanOrEqual( 8 );
  }
} );

test( 'desktop routes share one top content anchor', async ( { page } ) => {
  await page.setViewportSize( { width: 1440, height: 900 } );
  const routesAndHeadings = [
    ['/', 'Clear interfaces for complex product systems.'],
    ['/resume', 'Continuous work across product systems.'],
    ['/services', 'How I contribute to product teams.'],
    ['/contact', 'Tell me what needs to become clearer.']
  ];
  const headingTops = [];

  for ( const [route, heading] of routesAndHeadings ) {
    await page.goto( route );
    headingTops.push( ( await page.getByRole( 'heading', { name: heading, level: 1 } ).boundingBox() ).y );
  }

  expect( Math.max( ...headingTops ) - Math.min( ...headingTops ) ).toBeLessThanOrEqual( 40 );
} );

test( 'resume sections start from one shared content rail', async ( { page } ) => {
  await page.setViewportSize( { width: 1440, height: 900 } );
  const sectionAnchors = [
    ['/resume?section=experience', page => page.getByRole( 'list', { name: 'Work history' })],
    ['/resume?section=skills', page => page.getByText( 'Working toolkit', { exact: true })],
    ['/resume?section=education', page => page.getByText( /Education .* 2016.*2022/, { exact: true })],
    ['/resume?section=about', page => page.getByText( /Profile .* 04/, { exact: true }).first()]
  ];
  const anchorTops = [];

  for ( const [route, getAnchor] of sectionAnchors ) {
    await page.goto( route );
    anchorTops.push( ( await getAnchor( page ).boundingBox() ).y );
  }

  expect( Math.max( ...anchorTops ) - Math.min( ...anchorTops ) ).toBeLessThanOrEqual( 32 );
} );

test( 'services selector and detail start directly below the route heading', async ( { page } ) => {
  await page.setViewportSize( { width: 1440, height: 900 } );
  await page.goto( '/services?service=frontend' );

  const headingBox = await page.getByRole( 'heading', { name: 'How I contribute to product teams.', level: 1 } ).boundingBox();
  const headingBottom = headingBox.y + headingBox.height;
  const selectorTop = ( await page.getByRole( 'tab', { name: /Frontend Engineering/ } ).boundingBox() ).y;
  const detailTop = ( await page.getByText( 'Focus 01', { exact: true } ).boundingBox() ).y;

  expect( selectorTop - headingBottom ).toBeLessThanOrEqual( 80 );
  expect( detailTop - headingBottom ).toBeLessThanOrEqual( 80 );
  expect( Math.abs( selectorTop - detailTop ) ).toBeLessThanOrEqual( 32 );
} );

test( 'services selector uses compact single-line labels on mobile', async ( { page } ) => {
  await page.setViewportSize( { width: 320, height: 568 } );
  await page.goto( '/services?service=frontend' );

  const tabs = page.getByRole( 'tab' );
  await expect( tabs ).toHaveCount( 4 );
  const heights = await tabs.evaluateAll( elements => elements.map( element => element.getBoundingClientRect().height ) );

  expect( heights.every( height => height <= 48 ) ).toBe( true );
  await expect( page.getByRole( 'tab', { name: 'Frontend Engineering' } ) ).toBeVisible();
  await expect( page.getByRole( 'tab', { name: 'Full-stack Integration' } ) ).toBeVisible();
} );

test( 'services landscape columns share one top rail', async ( { page } ) => {
  await page.setViewportSize( { width: 667, height: 375 } );
  await page.goto( '/services?service=frontend' );

  const routeTitleTop = ( await page.getByRole( 'heading', { name: 'How I contribute to product teams.', level: 1 } ).boundingBox() ).y;
  const selectorTop = ( await page.getByRole( 'tab', { name: 'Frontend Engineering' } ).boundingBox() ).y;
  const detailTop = ( await page.getByText( 'Frontend Engineering', { exact: true }).last().boundingBox() ).y;

  expect( Math.max( routeTitleTop, selectorTop, detailTop ) - Math.min( routeTitleTop, selectorTop, detailTop ) ).toBeLessThanOrEqual( 40 );
} );

test( 'resume groups projects under the matching employer', async ( { page } ) => {
  await page.setViewportSize( { width: 1440, height: 900 } );
  await page.goto( '/resume?section=experience&role=bap&panel=projects&project=dronex' );
  await expect( page.getByText( 'BAP IT Co., JSC', { exact: false } ).first() ).toBeVisible();
  await expect( page.getByRole( 'list', { name: 'BAP IT Co., JSC projects' } ).getByRole( 'link' ) ).toHaveCount( 2 );
} );

test( 'invalid public URL state resolves to approved defaults', async ( { page } ) => {
  await page.goto( '/work?project=unknown&panel=unknown' );
  await expect( page ).toHaveURL( /role=mercatus&panel=projects&project=mercatus/ );
  await expect( page.getByRole( 'heading', { name: 'Mercatus Grocery Commerce', level: 3 } ) ).toBeVisible();

  await page.goto( '/resume?section=unknown&role=unknown&panel=unknown' );
  await expect( page.getByRole( 'heading', { name: 'Software Engineer (Frontend)', level: 2 } ) ).toBeVisible();

  await page.goto( '/services?service=unknown' );
  await expect( page.getByRole( 'tabpanel' ) ).toContainText( 'Frontend Engineering' );
} );

test( '200% text scaling exposes overflow instead of clipping content', async ( { page } ) => {
  await page.setViewportSize( { width: 1024, height: 768 } );
  await page.goto( '/resume?section=experience&role=nab&panel=contributions' );
  await page.evaluate( () => { document.documentElement.style.fontSize = '200%'; } );
  const overflow = await page.locator( 'main' ).evaluate( main => ( {
    overflowY: getComputedStyle( main ).overflowY,
    scrollHeight: main.scrollHeight,
    clientHeight: main.clientHeight
  } ) );
  expect( overflow.overflowY ).toBe( 'auto' );
  expect( overflow.scrollHeight ).toBeGreaterThanOrEqual( overflow.clientHeight );
} );

test.describe( 'reduced motion', () => {
  test.use( { reducedMotion: 'reduce' } );

  test( 'panel transitions become effectively instant', async ( { page } ) => {
    await page.goto( '/services?service=frontend' );
    const duration = await page.getByRole( 'tabpanel' ).evaluate( element => getComputedStyle( element ).animationDuration );
    expect( parseFloat( duration ) ).toBeLessThan( .01 );
  } );

  test( 'contact step motion becomes effectively instant', async ( { page } ) => {
    await page.goto( '/contact' );
    const duration = await page.getByTestId( 'contact-form-step' ).evaluate( element => getComputedStyle( element ).animationDuration );
    expect( parseFloat( duration ) ).toBeLessThan( .01 );
  } );
} );

test( 'resume timeline supports arrows and moves focus to details', async ( { page } ) => {
  await page.goto( '/resume?section=experience&role=bap&panel=summary' );
  const bap = page.getByRole( 'button', { name: /BAP 2022/ } );
  await bap.focus();
  await bap.press( 'ArrowRight' );
  await expect( page ).toHaveURL( /role=mercatus/ );
  await expect( page.getByRole( 'heading', { name: 'Frontend Developer', level: 2 } ) ).toBeFocused();
} );

test( 'resume skills pair every label with a decorative icon', async ( { page } ) => {
  await page.goto( '/resume?section=skills' );
  const skillItems = page.getByRole( 'list', { name: /skills$/ } ).locator( 'li' );
  const icons = skillItems.locator( 'svg' );
  await expect( skillItems ).toHaveCount( 15 );
  await expect( icons ).toHaveCount( 15 );
  expect( await icons.evaluateAll( elements => elements.every( icon => icon.getAttribute( 'aria-hidden' ) === 'true' ) ) ).toBe( true );
  await expect( page.getByText( 'TypeScript', { exact: true } ) ).toBeVisible();
  await expect( page.getByText( 'Accessibility', { exact: true } ) ).toBeVisible();
} );

test( 'education restores both source records in a semantic timeline', async ( { page } ) => {
  await page.goto( '/resume?section=education' );
  const timeline = page.getByRole( 'list', { name: 'Education history' } );
  await expect( timeline.locator( ':scope > li' ) ).toHaveCount( 2 );
  await expect( page.getByRole( 'heading', { name: 'Ho Chi Minh City Open University', level: 3 } ) ).toBeVisible();
  await expect( page.getByRole( 'heading', { name: 'Cybersoft Academy', level: 3 } ) ).toBeVisible();
  await expect( page.getByText( '2016–2022', { exact: true } ) ).toBeVisible();
  await expect( page.getByText( '2020–2021', { exact: true } ) ).toBeVisible();
  await expect( page.getByRole( 'link', { name: 'Professional Frontend Developer — view credential' } ) ).toBeVisible();
  await expect( page.getByRole( 'link', { name: 'Professional NodeJS Developer — view credential' } ) ).toBeVisible();
} );

test( 'about presents a balanced profile composition with verified facts and domains', async ( { page } ) => {
  await page.setViewportSize( { width: 1160, height: 490 } );
  await page.goto( '/resume?section=about' );
  await expect( page.getByRole( 'heading', { name: 'Clear interfaces for complex workflows.', level: 2 } ) ).toBeVisible();
  await expect( page.getByRole( 'list', { name: 'Profile facts' } ).locator( ':scope > li' ) ).toHaveCount( 4 );
  await expect( page.getByRole( 'list', { name: 'Product domains' } ).locator( ':scope > li' ) ).toHaveCount( 3 );
  await expectOneScreenLayout( page, 'resume about desktop compact' );
} );

test( 'contact validation focuses the first invalid field and back preserves values', async ( { page } ) => {
  await page.setViewportSize( { width: 320, height: 568 } );
  await page.goto( '/contact' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await expect( page.getByLabel( 'Full Name' ) ).toBeFocused();
  await page.getByLabel( 'Full Name' ).fill( 'Ada Lovelace' );
  await page.getByLabel( 'Email' ).fill( 'ada@example.com' );
  await chooseService( page, 'Product interface or workflow' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await page.getByRole( 'button', { name: 'Back' } ).click();
  await expect( page.getByLabel( 'Full Name' ) ).toHaveValue( 'Ada Lovelace' );
} );

test( 'contact keeps one active step in compact landscape', async ( { page } ) => {
  await page.setViewportSize( { width: 667, height: 375 } );
  await page.goto( '/contact' );
  await expect( page.getByTestId( 'contact-form-step' ) ).toHaveCount( 1 );
  await expect( page.getByLabel( 'Message' ) ).toBeHidden();
} );

test( 'contact presents a composed MUI brief with subtle step motion', async ( { page } ) => {
  await page.setViewportSize( { width: 1440, height: 900 } );
  await page.emulateMedia( { reducedMotion: 'no-preference' } );
  await page.goto( '/contact' );

  await expect( page.getByTestId( 'contact-form-panel' ) ).toBeVisible();
  await expect( page.getByLabel( 'Contact form progress' ).locator( '.MuiStep-root' ) ).toHaveCount( 2 );
  await expect( page.getByRole( 'heading', { name: 'Start with the essentials.', level: 2 } ) ).toBeVisible();
  const duration = await page.getByTestId( 'contact-form-step' ).evaluate( element => getComputedStyle( element ).animationDuration );
  expect( parseFloat( duration ) ).toBeGreaterThan( 0 );

  await page.getByLabel( 'Full Name' ).fill( 'Ada Lovelace' );
  await page.getByLabel( 'Email' ).fill( 'ada@example.com' );
  await chooseService( page, 'Product interface or workflow' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await expect( page.getByRole( 'heading', { name: 'Add the context that matters.', level: 2 } ) ).toBeVisible();
  await expect( page.getByTestId( 'contact-form-step' ) ).toHaveCount( 1 );
} );

test( 'contact fields use one MUI focus ring without a native input outline', async ( { page } ) => {
  await page.setViewportSize( { width: 1024, height: 768 } );
  await page.goto( '/contact' );
  const field = page.getByLabel( 'Full Name' );
  await field.focus();

  const focusStyles = await field.evaluate( input => {
    const inputRoot = input.closest( '.MuiOutlinedInput-root' );
    const outline = inputRoot?.querySelector( '.MuiOutlinedInput-notchedOutline' );
    return {
      nativeOutline: getComputedStyle( input ).outlineStyle,
      rootOutline: inputRoot ? getComputedStyle( inputRoot ).outlineStyle : null,
      muiBorderWidth: outline ? getComputedStyle( outline ).borderWidth : null
    };
  } );

  expect( focusStyles.nativeOutline ).toBe( 'none' );
  expect( focusStyles.rootOutline ).toBe( 'none' );
  expect( focusStyles.muiBorderWidth ).toBe( '2px' );
} );

test( 'MUI form controls render only the portfolio semantic palette', async ( { page } ) => {
  await page.addInitScript( () => localStorage.setItem( 'theme', 'dark' ) );
  await page.setViewportSize( { width: 1024, height: 768 } );
  await page.goto( '/admin/login' );
  await expect( page.locator( 'html' ) ).toHaveClass( /dark/ );

  const username = page.getByLabel( 'Username' );
  const password = page.getByLabel( 'Password', { exact: true } );
  await expect.poll( () => password.evaluate( input => getComputedStyle( input.closest( '.MuiOutlinedInput-root' ) ).backgroundColor ) )
    .toBe( 'rgb(26, 30, 26)' );
  await password.focus();

  const focused = await password.evaluate( input => {
    const root = input.closest( '.MuiOutlinedInput-root' );
    const outline = root?.querySelector( '.MuiOutlinedInput-notchedOutline' );
    const icon = root?.querySelector( '.MuiInputAdornment-root svg' );
    return {
      colorScheme: getComputedStyle( document.documentElement ).colorScheme,
      background: getComputedStyle( root ).backgroundColor,
      border: getComputedStyle( outline ).borderColor,
      icon: getComputedStyle( icon ).color
    };
  } );

  expect( focused ).toEqual( {
    colorScheme: 'dark',
    background: 'rgb(26, 30, 26)',
    border: 'rgb(114, 209, 162)',
    icon: 'rgb(114, 209, 162)'
  } );

  await page.getByRole( 'button', { name: 'Sign In' } ).click();
  await expect( username ).toHaveAttribute( 'aria-invalid', 'true' );
  await expect.poll( () => username.evaluate( input => getComputedStyle( input.closest( '.MuiFormControl-root' ).querySelector( '.MuiInputLabel-root' ) ).color ) )
    .toBe( 'rgb(224, 138, 125)' );

  const errorColors = await username.evaluate( input => {
    const field = input.closest( '.MuiFormControl-root' );
    return {
      border: getComputedStyle( field.querySelector( '.MuiOutlinedInput-notchedOutline' ) ).borderColor,
      label: getComputedStyle( field.querySelector( '.MuiInputLabel-root' ) ).color,
      helper: getComputedStyle( field.querySelector( '.MuiFormHelperText-root' ) ).color
    };
  } );

  expect( errorColors ).toEqual( {
    border: 'rgb(224, 138, 125)',
    label: 'rgb(224, 138, 125)',
    helper: 'rgb(224, 138, 125)'
  } );
} );

test( 'public contact fields and portal menus inherit the light form palette', async ( { page } ) => {
  await page.addInitScript( () => localStorage.setItem( 'theme', 'light' ) );
  await page.setViewportSize( { width: 1024, height: 768 } );
  await page.goto( '/contact' );

  const name = page.getByLabel( 'Full Name' );
  await expect.poll( () => name.evaluate( input => getComputedStyle( input.closest( '.MuiOutlinedInput-root' ) ).backgroundColor ) )
    .toBe( 'rgb(248, 245, 237)' );
  await name.focus();
  await expect.poll( () => name.evaluate( input => getComputedStyle( input.closest( '.MuiOutlinedInput-root' ).querySelector( '.MuiOutlinedInput-notchedOutline' ) ).borderColor ) )
    .toBe( 'rgb(11, 101, 71)' );

  const topic = page.getByRole( 'combobox', { name: 'Conversation topic' } );
  await topic.click();
  const menu = page.locator( '.MuiMenu-paper' );
  await expect( menu ).toBeVisible();
  await expect.poll( () => menu.evaluate( element => getComputedStyle( element ).backgroundColor ) )
    .toBe( 'rgb(233, 228, 217)' );
  await expect.poll( () => page.getByRole( 'option' ).first().evaluate( element => getComputedStyle( element ).color ) )
    .toBe( 'rgb(23, 25, 21)' );
} );

test( 'skip navigation and non-auth form fields follow interface guidance', async ( { page } ) => {
  await page.goto( '/' );
  await page.keyboard.press( 'Tab' );
  const skipLink = page.getByRole( 'link', { name: 'Skip to content' } );
  await expect( skipLink ).toBeFocused();
  await skipLink.press( 'Enter' );
  await expect( page.locator( '#main-content' ) ).toBeFocused();
  const outline = await page.locator( '#main-content' ).evaluate( element => getComputedStyle( element ).outlineStyle );
  expect( outline ).not.toBe( 'none' );

  await page.goto( '/contact' );
  await expect( page.locator( 'input[name="service"]' ) ).toHaveAttribute( 'autocomplete', 'off' );
  await page.getByLabel( 'Full Name' ).fill( 'Ada Lovelace' );
  await page.getByLabel( 'Email' ).fill( 'ada@example.com' );
  await chooseService( page, 'Product interface or workflow' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await expect( page.getByLabel( 'Message' ) ).toHaveAttribute( 'autocomplete', 'off' );
} );

test( 'MUI mobile drawer exposes every route and restores focus when closed', async ( { page } ) => {
  await page.setViewportSize( { width: 320, height: 568 } );
  await page.goto( '/' );
  const menuButton = page.getByRole( 'button', { name: 'Open navigation menu' } );
  await menuButton.click();

  const mobileNavigation = page.getByRole( 'navigation', { name: 'Mobile navigation' } );
  await expect( mobileNavigation ).toBeVisible();
  await expect( mobileNavigation.getByRole( 'link' ) ).toHaveCount( 4 );
  await page.getByRole( 'button', { name: 'Close navigation menu' } ).click();
  await expect( mobileNavigation ).toBeHidden();
  await expect( menuButton ).toBeFocused();
} );

test( 'MUI admin login keeps labeled keyboard-accessible fields', async ( { page } ) => {
  await page.setViewportSize( { width: 320, height: 568 } );
  await page.goto( '/admin/login' );
  await expect( page.getByRole( 'heading', { name: 'Portfolio operations', level: 1 } ) ).toBeVisible();
  await expect( page.getByLabel( 'Username' ) ).toBeVisible();
  await expect( page.getByLabel( 'Password', { exact: true } ) ).toHaveAttribute( 'type', 'password' );
  await page.getByRole( 'button', { name: 'Show password' } ).click();
  await expect( page.getByLabel( 'Password', { exact: true } ) ).toHaveAttribute( 'type', 'text' );
  await expect( page.getByRole( 'button', { name: 'Sign In' } ) ).toBeVisible();

  const layout = await page.evaluate( () => ( {
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    clippedFields: [...document.querySelectorAll( 'input, button' )]
      .filter( element => element.offsetParent !== null )
      .filter( element => {
        const rect = element.getBoundingClientRect();
        return rect.left < -1 || rect.right > window.innerWidth + 1;
      } ).map( element => element.getAttribute( 'aria-label' ) || element.textContent?.trim() )
  } ) );
  expect( layout.horizontalOverflow ).toBe( false );
  expect( layout.clippedFields ).toEqual( [] );

  await page.addScriptTag( { path: axePath } );
  const result = await page.evaluate( async () => window.axe.run( document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  } ) );
  expect( result.violations ).toEqual( [] );
} );

for ( const [slug, experienceSlug, title, employer, client] of projectRecords ) {
  test( `resume renders ${slug} under ${experienceSlug}`, async ( { page } ) => {
    await page.setViewportSize( { width: 320, height: 568 } );
    await page.goto( `/resume?section=experience&role=${experienceSlug}&panel=projects&project=${slug}` );
    await expect( page.getByRole( 'heading', { name: title, level: 3 } ) ).toBeVisible();
    await expect( page.getByText( employer, { exact: false } ).first() ).toBeVisible();
    if ( client ) {await expect( page.getByText( client, { exact: true } ) ).toBeVisible();}
    await expect( page.getByRole( 'tab', { name: 'Projects' } ) ).toHaveAttribute( 'aria-selected', 'true' );
    await expectOneScreenLayout( page, `${experienceSlug}/${slug}` );
  } );
}

for ( const [slug, company, role] of roleRecords ) {
  test( `resume renders every panel for ${slug}`, async ( { page } ) => {
    await page.setViewportSize( { width: 667, height: 375 } );
    for ( const panel of ['summary', 'projects', 'contributions', 'stack'] ) {
      await page.goto( `/resume?section=experience&role=${slug}&panel=${panel}` );
      await expect( page.getByText( company, { exact: false } ).first() ).toBeVisible();
      await expect( page.getByRole( 'heading', { name: role, level: 2 } ) ).toBeVisible();
      await expect( page.getByRole( 'tab', { name: titleCase( panel ) } ) ).toHaveAttribute( 'aria-selected', 'true' );
      await expectOneScreenLayout( page, `${slug}/${panel}` );
    }
  } );
}

test( 'all secondary states fit the opposite compact viewport', async ( { page } ) => {
  test.setTimeout( 120_000 );
  await page.setViewportSize( { width: 667, height: 375 } );
  for ( const [slug, experienceSlug] of projectRecords ) {
    await page.goto( `/resume?section=experience&role=${experienceSlug}&panel=projects&project=${slug}` );
    await expectOneScreenLayout( page, `landscape resume project ${slug}` );
  }

  await page.setViewportSize( { width: 320, height: 568 } );
  for ( const [slug] of roleRecords ) {
    for ( const panel of ['summary', 'projects', 'contributions', 'stack'] ) {
      await page.goto( `/resume?section=experience&role=${slug}&panel=${panel}` );
      await expectOneScreenLayout( page, `portrait resume ${slug}/${panel}` );
    }
  }

  for ( const section of ['skills', 'education', 'about'] ) {
    await page.goto( `/resume?section=${section}` );
    await expectOneScreenLayout( page, `portrait resume ${section}` );
  }

  for ( const service of ['frontend', 'ui', 'performance', 'fullstack'] ) {
    await page.goto( `/services?service=${service}` );
    await expect( page.getByRole( 'tabpanel' ) ).toBeVisible();
    await expectOneScreenLayout( page, `portrait service ${service}` );
  }
} );

test( 'contact exposes client validation errors and focuses the invalid field on both steps', async ( { page } ) => {
  await page.setViewportSize( { width: 320, height: 568 } );
  await page.goto( '/contact' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await expect( page.getByText( 'Enter your full name.' ) ).toBeVisible();
  await expect( page.getByText( 'Enter a valid email address.' ) ).toBeVisible();
  await expect( page.getByText( 'Choose a conversation topic.' ) ).toBeVisible();
  await expect( page.getByLabel( 'Full Name' ) ).toBeFocused();

  await page.getByLabel( 'Full Name' ).fill( 'Ada Lovelace' );
  await page.getByLabel( 'Email' ).fill( 'ada@example.com' );
  await chooseService( page, 'Product interface or workflow' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await page.getByRole( 'button', { name: 'Send Message' } ).click();
  await expect( page.getByText( 'Tell me a little more (at least 10 characters).' ) ).toBeVisible();
  await expect( page.getByLabel( 'Message' ) ).toBeFocused();
  await expectOneScreenLayout( page, 'contact client errors' );
} );

test( 'contact recovers from API field errors without hiding the target field', async ( { page } ) => {
  await page.route( '**/api/user/contact', route => route.fulfill( {
    status: 400,
    contentType: 'application/json',
    body: JSON.stringify( { message: 'Validation failed', errors: [{ field: 'email', message: 'This email cannot be used.' }] } )
  } ) );
  await page.setViewportSize( { width: 320, height: 568 } );
  await page.goto( '/contact' );
  await page.getByLabel( 'Full Name' ).fill( 'Ada Lovelace' );
  await page.getByLabel( 'Email' ).fill( 'ada@example.com' );
  await chooseService( page, 'Product interface or workflow' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await page.getByLabel( 'Message' ).fill( 'Please help with this onboarding workflow.' );
  await page.getByRole( 'button', { name: 'Send Message' } ).click();
  await expect( page.getByText( 'This email cannot be used.' ) ).toBeVisible();
  await expect( page.getByLabel( 'Email' ) ).toBeFocused();
  await expect( page.getByTestId( 'contact-form-step' ) ).toHaveCount( 1 );
  await expectOneScreenLayout( page, 'contact API field error' );
} );

test( 'contact handles rate limiting, preserves data, and keeps email fallback available', async ( { page } ) => {
  await page.route( '**/api/user/contact', route => route.fulfill( {
    status: 429,
    contentType: 'application/json',
    body: JSON.stringify( { message: 'Too many messages. Please try again later.' } )
  } ) );
  await page.setViewportSize( { width: 667, height: 375 } );
  await page.goto( '/contact' );
  await page.getByLabel( 'Full Name' ).fill( 'Ada Lovelace' );
  await page.getByLabel( 'Email' ).fill( 'ada@example.com' );
  await chooseService( page, 'Product interface or workflow' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await page.getByLabel( 'Message' ).fill( 'Please help with this onboarding workflow.' );
  await page.getByRole( 'button', { name: 'Send Message' } ).click();
  await expect( page.getByText( /Too many messages were sent/ ) ).toBeVisible();
  await expect( page.getByRole( 'link', { name: 'chunglh1304@gmail.com' } ) ).toBeVisible();
  await page.getByRole( 'button', { name: 'Back' } ).click();
  await expect( page.getByLabel( 'Full Name' ) ).toHaveValue( 'Ada Lovelace' );
  await expectOneScreenLayout( page, 'contact rate limit' );
} );

test( 'contact handles an unexpected server error without losing the message', async ( { page } ) => {
  await page.route( '**/api/user/contact', route => route.fulfill( {
    status: 500,
    contentType: 'application/json',
    body: JSON.stringify( { message: 'Internal server error' } )
  } ) );
  await page.setViewportSize( { width: 320, height: 568 } );
  await page.goto( '/contact' );
  await page.getByLabel( 'Full Name' ).fill( 'Ada Lovelace' );
  await page.getByLabel( 'Email' ).fill( 'ada@example.com' );
  await chooseService( page, 'Performance or accessibility review' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await page.getByLabel( 'Message' ).fill( 'Please review this performance problem.' );
  await page.getByRole( 'button', { name: 'Send Message' } ).click();
  await expect( page.getByText( 'Message could not be sent. Try again or use the direct email link.' ) ).toBeVisible();
  await expect( page.getByLabel( 'Message' ) ).toHaveValue( 'Please review this performance problem.' );
  await expectOneScreenLayout( page, 'contact server error' );
} );

test( 'contact success replaces the form and sends only the public contract', async ( { page } ) => {
  let requestBody;
  await page.route( '**/api/user/contact', async route => {
    requestBody = route.request().postDataJSON();
    await route.fulfill( { status: 200, contentType: 'application/json', body: JSON.stringify( { status: 200 } ) } );
  } );
  await page.goto( '/contact' );
  await page.getByLabel( 'Full Name' ).fill( 'Ada Lovelace' );
  await page.getByLabel( 'Email' ).fill( 'ada@example.com' );
  await chooseService( page, 'Design system or UI implementation' );
  await page.getByRole( 'button', { name: 'Continue to Message' } ).click();
  await page.getByLabel( 'Message' ).fill( 'Please help implement this interface.' );
  await page.getByRole( 'button', { name: 'Send Message' } ).click();
  await expect( page.getByRole( 'heading', { name: 'Thank you, Ada Lovelace.' } ) ).toBeVisible();
  expect( requestBody ).toEqual( { name: 'Ada Lovelace', email: 'ada@example.com', service: 'ui', message: 'Please help implement this interface.' } );
  expect( page.url() ).not.toContain( 'Ada' );
} );

test( 'state matrix produces no browser errors', async ( { page } ) => {
  test.setTimeout( 120_000 );
  const errors = [];
  page.on( 'console', message => { if ( message.type() === 'error' ) {errors.push( message.text() );} } );
  page.on( 'pageerror', error => errors.push( error.message ) );
  for ( const [slug, experienceSlug] of projectRecords ) {await page.goto( `/resume?section=experience&role=${experienceSlug}&panel=projects&project=${slug}` );}
  for ( const [slug] of roleRecords ) {await page.goto( `/resume?section=experience&role=${slug}&panel=contributions` );}
  for ( const service of ['frontend', 'ui', 'performance', 'fullstack'] ) {await page.goto( `/services?service=${service}` );}
  expect( errors ).toEqual( [] );
} );

for ( const route of routes ) {
  test( `${route} has no automated WCAG A/AA violations`, async ( { page } ) => {
    await page.goto( route );
    await page.waitForTimeout( 250 );
    await page.addScriptTag( { path: axePath } );
    const result = await page.evaluate( async () => window.axe.run( document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } } ) );
    expect( result.violations ).toEqual( [] );
  } );
}

test( 'admin APIs reject unauthenticated requests and test routes are disabled', async ( { request } ) => {
  expect( ( await request.get( '/api/admin/dashboard' ) ).status() ).toBe( 401 );
  expect( ( await request.get( '/api/admin/contact' ) ).status() ).toBe( 401 );
  expect( ( await request.post( '/api/admin/auth/logout' ) ).status() ).toBe( 401 );
  expect( ( await request.post( '/api/admin/auth/change-password', { data: {} } ) ).status() ).toBe( 401 );
  expect( ( await request.get( '/api/test-env' ) ).status() ).toBe( 404 );
  expect( ( await request.post( '/api/test-email', { data: {} } ) ).status() ).toBe( 404 );
} );

test( 'public telemetry and tracking pixels stay outside the admin boundary', async ( { request } ) => {
  const startedAt = Date.now();
  const visit = await request.post( '/api/user/analytics/visit', { data: { path: '/resume', userAgent: 'Playwright' } } );
  expect( visit.status() ).toBe( 200 );
  expect( Date.now() - startedAt ).toBeLessThan( 4000 );

  const pixel = await request.get( '/api/user/contact/not-an-object-id/track-email' );
  expect( pixel.status() ).toBe( 200 );
  expect( pixel.headers()['content-type'] ).toContain( 'image/png' );
} );

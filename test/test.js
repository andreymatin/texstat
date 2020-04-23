import componentChart from './components/component-chart.js';


/**
 * Chart
 */
describe('Chart', function() {
  it('componentChart() is existed', function() {
    expect(typeof componentChart === 'function').to.equal(true);
  });
});



/**
 * Helpers
 */
describe('Helpers', function() {
  it('sf_helper_checkVisibility() is existed', function() {
    expect(typeof sf_helper_checkVisibility === 'function').to.equal(true);
  });

  it('sf_helper_sfObject() is existed', function() {
    expect(typeof sf_helper_sfObject === 'function').to.equal(true);
  });

  it('sf_helper_getParents() is existed', function() {
    expect(typeof sf_helper_getParents === 'function').to.equal(true);
  });

  it('sf_helper_scroll() is existed', function() {
    expect(typeof sf_helper_scroll === 'function').to.equal(true);
  });

  it('sf_helper_checkViewport() is existed', function() {
    expect(typeof sf_helper_checkViewport === 'function').to.equal(true);
  });
});

/**
 * General Services
 */
describe('General Services', function() {
  it('sf_action_changeCursor() is existed', function() {
    expect(typeof sf_action_changeCursor === 'function').to.equal(true);
  });

  it('sf_action_highlighLinks() is existed', function() {
    expect(typeof sf_action_highlighLinks === 'function').to.equal(true);
  });

  it('sf_action_readableFonts() is existed', function() {
    expect(typeof sf_action_readableFonts === 'function').to.equal(true);
  });

  it('sf_action_highContrast() is existed', function() {
    expect(typeof sf_action_highContrast === 'function').to.equal(true);
  });

  it('sf_action_biggerFonts() is existed', function() {
    expect(typeof sf_action_biggerFonts === 'function').to.equal(true);
  });


});

/**
 * Keyboard Navigation
 */
describe('Keyboard Navigation', function() {
  it('sf_initKbdNav() is existed', function() {
    expect(typeof sf_initKbdNav === 'function').to.equal(true);
  });

  it('sf_resetKbdNav() is existed', function() {
    expect(typeof sf_resetKbdNav === 'function').to.equal(true);
  });
});

/**
 * Voice Over
 */
describe('Voice Over', function() {
  it('sf_playerStart() is existed', function() {
    expect(typeof sf_playerStart === 'function').to.equal(true);
  });

  it('sf_clearNodes() is existed', function() {
    expect(typeof sf_clearNodes === 'function').to.equal(true);
  });
});






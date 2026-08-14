/* slug, source file (null = already processed), eyebrow, title, alt.
   Order within each category is the display order. */
const B = 'WhatsApp Image 2026-08-12 at ';

module.exports = {
  residential: {
    name: 'Residential',
    cover: 'residential-poolside',
    coverAlt: 'Completed home with a pool and stacking doors',
    items: [
      /* --- completed --- */
      ['residential-poolside', null, 'Completed', 'Poolside living', 'Completed home with stacking doors opening onto a pool and landscaped garden'],
      ['residential-double-storey', null, 'Completed', 'Double storey', 'Double-storey home with stone cladding, full-height glazing and a paved forecourt'],
      ['residential-handover', null, 'Completed', 'Handed over', 'Completed home floodlit at night with a vehicle under the carport'],
      ['residential-terracotta', B + '11.40.04 (1).jpeg', 'Completed', 'Completed home', 'Completed home with a terracotta tiled roof, double-volume glazing and a paved driveway'],
      ['residential-terracotta-street', B + '11.40.05.jpeg', 'Completed', 'Street view', 'Street elevation of a completed home with a terracotta roof and double garage'],
      ['residential-ochre-home', B + '11.39.37 (1).jpeg', 'Completed', 'Contemporary home', 'Completed contemporary home in ochre render with a landscaped entrance driveway'],
      ['residential-pergola', null, 'Completed', 'Pergola & paving', 'Single-storey home with a steel pergola over the garage and block-paved driveway'],
      ['residential-courtyard', null, 'Completed', 'Front courtyard', 'White rendered home with pergola, planted courtyard and double garage'],
      ['residential-dusk', null, 'Completed', 'Completed at dusk', 'Completed single-storey home photographed at dusk with the garage closed'],
      ['residential-contemporary', null, 'Completed', 'Painted façade', 'Double-storey building with a deep red painted façade and decorative balcony screen'],
      ['residential-street', null, 'Completed', 'Street elevation', 'Double-storey home seen from the street with garage and paved apron'],
      ['residential-garage', null, 'Completed', 'Double garage', 'Completed double-storey home with a double garage and paved driveway'],

      /* --- multi-unit developments --- */
      ['development-units', null, 'Development', 'Multi-unit residential', 'Completed multi-unit residential block, plastered and painted'],
      ['development-in-progress', null, 'Development', 'Under construction', 'Multi-unit residential development under construction in face brick'],
      ['development-groundworks', null, 'Development', 'Superstructure rising', 'Face-brick units rising from a sandy platform, first floor under way'],

      /* --- finishes --- */
      ['residential-kitchen-marble', B + '11.40.01.jpeg', 'Finishes', 'Kitchen', 'Fitted kitchen with an island, stone tops and marble-effect floor tiling nearing completion'],
      ['residential-kitchen-navy', B + '11.40.04.jpeg', 'Finishes', 'Kitchen island', 'Kitchen with a navy island, timber joinery and marble-effect tiling being finished'],
      ['residential-staircase', B + '11.40.00 (1).jpeg', 'Finishes', 'Floating staircase', 'Cantilevered timber staircase with a glass balustrade in a double-volume space'],
      ['residential-ensuite', B + '11.40.03.jpeg', 'Finishes', 'En-suite', 'En-suite bathroom with twin basins, a brass-framed mirror and marble-effect tiling'],
      ['residential-bath', B + '11.40.03 (1).jpeg', 'Finishes', 'Main bathroom', 'Main bathroom with a freestanding bath and full-height marble-effect tiling'],
      ['residential-bathroom-mirror', B + '11.40.02 (1).jpeg', 'Finishes', 'Guest bathroom', 'Guest bathroom with a backlit oval mirror and timber vanity on marble-effect tiling'],
      ['residential-wardrobe', B + '11.40.01 (1).jpeg', 'Finishes', 'Dressing room', 'Fitted walk-in wardrobe in white joinery with open shelving and drawers'],
      ['residential-dressing-room', B + '11.40.02.jpeg', 'Finishes', 'Fitted joinery', 'Full-length dressing room with fitted white joinery either side of a timber floor'],

      /* --- structure --- */
      ['residential-slab-steel', B + '11.39.44.jpeg', 'Structure', 'Slab reinforcement', 'Reinforcement laid out across a suspended slab before the pour, coastal estate beyond'],
      ['residential-slab-pour', B + '11.39.45.jpeg', 'Structure', 'Slab pour', 'Concrete pump boom over a reinforced slab with the site team in position'],
      ['residential-pump-pour', B + '11.39.45 (1).jpeg', 'Structure', 'Pumping concrete', 'Site team placing pumped concrete across a suspended slab'],
      ['residential-pour-team', B + '11.39.45 (2).jpeg', 'Structure', 'Pour in progress', 'Concrete being placed and worked across a suspended slab by the site team'],
      ['residential-rib-block', B + '11.39.37.jpeg', 'Structure', 'Rib-and-block slab', 'Rib-and-block suspended slab laid out over the ground floor before the topping'],
      ['residential-props-slab', B + '11.39.36 (1).jpeg', 'Structure', 'Propped soffit', 'Freshly cast slab soffit still on props above a block-walled ground floor'],
      ['residential-propped-interior', B + '11.39.46.jpeg', 'Structure', 'Propped interior', 'Interior of a house under construction with the slab above still fully propped'],
      ['residential-interior-shell', B + '11.39.46 (1).jpeg', 'Structure', 'Internal shell', 'Internal shell of a house with block walls, openings formed and props in place'],
      ['residential-brickwork-estate', B + '11.39.46 (2).jpeg', 'Structure', 'Superstructure brickwork', 'Bricklaying team raising the superstructure on a slab within a coastal estate'],
      ['residential-scaffold-walls', B + '11.39.59.jpeg', 'Structure', 'Walls & scaffold', 'Face-brick walls rising with scaffolding in place and the roof structure starting'],
      ['residential-roof-trusses', B + '11.39.58.jpeg', 'Structure', 'Roof trusses', 'Timber roof trusses erected and braced over a completed brick superstructure'],
      ['residential-roof-tiling', B + '11.40.00.jpeg', 'Structure', 'Roof tiling', 'Roof tiles loaded out and being laid over battens on a new roof'],
      ['residential-site-clearing', B + '11.39.36.jpeg', 'Site', 'Site clearing', 'Backhoe loader clearing and levelling a site platform ahead of foundations'],

      /* --- design --- */
      ['residential-render-aerial', B + '11.39.34 (1).jpeg', 'Design', 'Roof plan visualisation', 'Aerial architectural visualisation of a home showing the roof layout and courtyard'],
      ['residential-render-pool', B + '11.39.38.jpeg', 'Design', 'Design visualisation', 'Architectural visualisation of a large home with a pool and terraced garden']
    ]
  },

  commercial: {
    name: 'Commercial',
    cover: 'commercial-cielo-dusk',
    coverAlt: 'Completed retail centre photographed at dusk',
    items: [
      ['commercial-cielo-dusk', B + '11.39.55 (1).jpeg', 'Completed', 'Retail centre', 'Completed retail centre with a dark glazed frontage lit at dusk'],
      ['commercial-cielo-night', B + '11.39.56.jpeg', 'Completed', 'Evening view', 'Curved retail frontage reflected in wet paving under an evening sky'],
      ['commercial-dealership', B + '11.39.34.jpeg', 'Completed', 'Motor dealership', 'Completed motor dealership with a glazed showroom frontage at sunset'],
      ['commercial-showroom', B + '11.39.31.jpeg', 'Completed', 'Showroom', 'Completed showroom building with full-height glazing and profiled cladding'],
      ['commercial-showroom-angle', B + '11.39.32.jpeg', 'Completed', 'Forecourt', 'Showroom building and paved forecourt seen from the entrance approach'],
      ['commercial-colonnade', B + '11.39.51.jpeg', 'Completed', 'Colonnade & parking', 'Completed commercial building with a covered colonnade and parking bays'],
      ['commercial-retail-paving', B + '11.39.52 (1).jpeg', 'Completed', 'External works', 'Completed retail frontage with the block paving and planting being finished'],
      ['commercial-retail', null, 'Completed', 'Retail development', 'Completed retail building with full-height shopfront glazing and a paved apron'],
      ['industrial-units', null, 'Completed', 'Commercial units', 'Row of completed units with roller shutter doors and a paved yard'],
      ['industrial-cladding', null, 'Completed', 'Cladding complete', 'Long building with dark profile cladding over a face-brick base'],
      ['industrial-steel-frame', null, 'Completed', 'Steel-framed build', 'Steel-framed building with the roof sheeted and a deep canopy'],
      ['commercial-fitout', B + '11.39.50.jpeg', 'Fit-out', 'Internal fit-out', 'Internal fit-out under way in a commercial unit with services exposed overhead'],
      ['commercial-fitout-scaffold', B + '11.39.52.jpeg', 'Fit-out', 'Ceilings & services', 'Mobile scaffold in place for ceiling and services installation in a retail space'],
      ['commercial-paving-team', B + '11.39.55.jpeg', 'On site', 'External paving', 'Paving being laid at the entrance of a newly completed commercial building'],
      ['industrial-steel-erection', null, 'In progress', 'Steel erection', 'Erected steel portal frames over brick columns on a cleared site'],
      ['industrial-frame-brickwork', null, 'In progress', 'Frame & brickwork', 'Steel frame with brickwork under way and site teams at work'],
      ['industrial-interior', null, 'In progress', 'Internal envelope', 'Internal view of a steel-framed building with the brick envelope going up'],
      ['brickwork-on-site', null, 'On site', 'Structural brickwork', 'Bricklaying team working from scaffolding beneath a sheeted steel roof'],
      ['brickwork-scaffold', null, 'On site', 'Working at height', 'Bricklayers in harnesses on scaffolding against a face-brick wall'],
      ['brickwork-team', null, 'On site', 'Bricklaying team', 'Site team laying brickwork from a scaffold platform inside the building envelope']
    ]
  },

  industrial: {
    name: 'Industrial',
    cover: 'industrial-stack-scaffold',
    coverAlt: 'Access scaffold erected around an industrial stack',
    items: [
      ['industrial-stack-scaffold', B + '11.39.47.jpeg', 'On site', 'Stack access scaffold', 'Access scaffold erected around an industrial stack between clad factory buildings'],
      ['industrial-stack-works', B + '11.39.49.jpeg', 'On site', 'Stack works', 'Industrial stack works viewed along the service alley between factory buildings'],
      ['industrial-distribution', null, 'Facility', 'Distribution warehouse', 'Large distribution warehouse with roller shutter loading bays and a concrete yard'],
      ['industrial-warehouse-interior', null, 'Facility', 'Warehouse interior', 'Clear-span warehouse interior with roof lights and a power-floated concrete floor'],
      ['industrial-portal-frame', null, 'In progress', 'Portal frame erection', 'Steel portal frames being lifted into place by a mobile crane at sunset'],
      ['industrial-envelope', null, 'In progress', 'Structural envelope', 'Interior of a partly built industrial unit with steel columns and roof lights']
    ]
  }
};

/* slug, source file (null = already processed), eyebrow, title, alt.
   Order within each category is the display order. */
const B = 'WhatsApp Image 2026-08-12 at ';
/* Later batch, delivered pre-sorted into subfolders (the industrial folder is
   spelled "inbdustrial" on disk — left as-is rather than renaming the client's
   source tree). */
const R = 'residential/WhatsApp Image 2026-08-14 at ';
const C = 'commercial/WhatsApp Image 2026-08-14 at ';
const I = 'inbdustrial/WhatsApp Image 2026-08-14 at ';

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
      ['residential-deck-pour', R + '16.58.05.jpeg', 'Structure', 'Placing concrete', 'Concrete being placed by pump across a rib-and-block deck with the team working it'],
      ['residential-rib-deck', R + '16.58.06.jpeg', 'Structure', 'Rib-and-block deck', 'Rib-and-block deck laid out and reinforced ahead of the topping, coastal estate beyond'],
      ['residential-suspended-slab', R + '16.58.10 (1).jpeg', 'Structure', 'Suspended slab', 'Suspended slab seen from above with the reinforcement and blockwork below'],
      ['residential-excavation', R + '16.58.07.jpeg', 'Structure', 'Excavation', 'Excavation alongside a partly built house with the site team and barrier tape in place'],
      ['residential-foundations', R + '16.58.08.jpeg', 'Structure', 'Foundations', 'Foundation excavation open beside a rising blockwork superstructure'],
      ['residential-boundary-wall', R + '16.58.02 (1).jpeg', 'Structure', 'Boundary walling', 'Face-brick boundary walling under construction alongside a house being built'],
      ['residential-props-slab', B + '11.39.36 (1).jpeg', 'Structure', 'Propped soffit', 'Freshly cast slab soffit still on props above a block-walled ground floor'],
      ['residential-propped-interior', B + '11.39.46.jpeg', 'Structure', 'Propped interior', 'Interior of a house under construction with the slab above still fully propped'],
      ['residential-interior-shell', B + '11.39.46 (1).jpeg', 'Structure', 'Internal shell', 'Internal shell of a house with block walls, openings formed and props in place'],
      ['residential-brickwork-estate', B + '11.39.46 (2).jpeg', 'Structure', 'Superstructure brickwork', 'Bricklaying team raising the superstructure on a slab within a coastal estate'],
      ['residential-scaffold-walls', B + '11.39.59.jpeg', 'Structure', 'Walls & scaffold', 'Face-brick walls rising with scaffolding in place and the roof structure starting'],
      ['residential-roof-trusses', B + '11.39.58.jpeg', 'Structure', 'Roof trusses', 'Timber roof trusses erected and braced over a completed brick superstructure'],
      ['residential-roof-tiling', B + '11.40.00.jpeg', 'Structure', 'Roof tiling', 'Roof tiles loaded out and being laid over battens on a new roof'],
      ['residential-site-clearing', B + '11.39.36.jpeg', 'Site', 'Site clearing', 'Backhoe loader clearing and levelling a site platform ahead of foundations'],

      /* --- pools --- */
      ['residential-pool-brick', R + '16.58.01 (1).jpeg', 'Pools', 'Swimming pool', 'Newly built swimming pool with a paved surround alongside a face-brick home'],
      ['residential-pool-terrace', R + '16.58.01.jpeg', 'Pools', 'Pool & terrace', 'Pool and paved terrace running alongside a modern home with stacking doors'],
      ['residential-lap-pool', R + '16.58.02.jpeg', 'Pools', 'Lap pool & deck', 'Long lap pool with a timber deck edge set into a hedged garden'],

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
      ['commercial-arched-wall', C + '16.58.18.jpeg', 'Completed', 'Arched boundary wall', 'Completed arched boundary wall running along the street frontage of a building'],
      ['commercial-boundary-wall', C + '16.58.15 (1).jpeg', 'Completed', 'Boundary walling', 'New rendered boundary wall and piers completed in front of a street-facing building'],
      ['commercial-rendered-facade', C + '16.58.18 (3).jpeg', 'Completed', 'Rendered façade', 'Completed rendered façade and side elevation facing onto the street'],
      ['commercial-retail', null, 'Completed', 'Retail development', 'Completed retail building with full-height shopfront glazing and a paved apron'],
      ['industrial-units', null, 'Completed', 'Commercial units', 'Row of completed units with roller shutter doors and a paved yard'],
      ['industrial-cladding', null, 'Completed', 'Cladding complete', 'Long building with dark profile cladding over a face-brick base'],
      ['industrial-steel-frame', null, 'Completed', 'Steel-framed build', 'Steel-framed building with the roof sheeted and a deep canopy'],
      ['commercial-fitout', B + '11.39.50.jpeg', 'Fit-out', 'Internal fit-out', 'Internal fit-out under way in a commercial unit with services exposed overhead'],
      ['commercial-fitout-scaffold', B + '11.39.52.jpeg', 'Fit-out', 'Ceilings & services', 'Mobile scaffold in place for ceiling and services installation in a retail space'],
      ['commercial-partitions', C + '16.58.03 (1).jpeg', 'Fit-out', 'Partitions & services', 'Partition boards standing ready in a commercial unit with services exposed overhead'],
      ['commercial-rib-block', B + '11.39.37.jpeg', 'Structure', 'Rib-and-block slab', 'Rib-and-block suspended slab laid out over the ground floor before the topping'],
      ['commercial-suspended-slab', C + '16.58.12.jpeg', 'Structure', 'Suspended slab', 'Rib-and-block suspended slab laid out over a commercial ground floor'],
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
    cover: 'industrial-office-building',
    coverAlt: 'Completed multi-storey office building with banded glazing',
    items: [
      /* --- completed --- */
      ['industrial-office-building', I + '16.49.48 (1).jpeg', 'Completed', 'Office building', 'Completed multi-storey office building with banded glazing and stone cladding'],
      ['industrial-building-entrance', I + '16.49.48.jpeg', 'Completed', 'Building entrance', 'Entrance canopy and landscaped approach to a completed office building'],

      /* --- plant & facilities --- */
      ['industrial-factory-floor', I + '16.49.35 (1).jpeg', 'Facility', 'Factory floor', 'Working factory floor with production machinery and marked traffic routes'],
      ['industrial-stack-scaffold', B + '11.39.47.jpeg', 'On site', 'Stack access scaffold', 'Access scaffold erected around an industrial stack between clad factory buildings'],
      ['industrial-stack-works', B + '11.39.49.jpeg', 'On site', 'Stack works', 'Industrial stack works viewed along the service alley between factory buildings'],

      /* --- electrical --- */
      ['industrial-transformer', I + '16.49.45.jpeg', 'Electrical', 'Transformer installation', 'Medium-voltage transformer installed on a bunded plinth in a substation room'],
      ['industrial-transformer-plinth', I + '16.49.46 (1).jpeg', 'Electrical', 'Transformer plinth', 'Transformer seated on its bunded concrete plinth with clearances set out'],
      ['industrial-substation', I + '16.49.46.jpeg', 'Electrical', 'Substation equipment', 'Substation equipment and switchgear beneath overhead services pipework'],
      ['industrial-transformer-detail', I + '16.49.47.jpeg', 'Electrical', 'Transformer detail', 'Close view of transformer radiators and mountings within the bunded plinth'],

      /* --- office fit-out --- */
      ['industrial-boardroom', I + '16.49.47 (1).jpeg', 'Fit-out', 'Boardroom', 'Completed boardroom with a long table, screen and full-height glazing'],
      ['industrial-glazed-partitions', I + '16.49.36.jpeg', 'Fit-out', 'Glazed partitions', 'Frosted-banded glazed partitions dividing a fitted-out office floor'],
      ['industrial-office-partitioning', I + '16.49.37 (1).jpeg', 'Fit-out', 'Office partitioning', 'Glazed office partitioning installed along a fitted-out floor plate'],
      ['industrial-partitioned-offices', I + '16.49.37 (2).jpeg', 'Fit-out', 'Partitioned offices', 'Run of partitioned offices behind banded glazing on a completed floor'],
      ['industrial-partition-detail', I + '16.49.37.jpeg', 'Fit-out', 'Partition detail', 'Detail of a glazed partition junction and door set in a fitted-out office'],
      ['industrial-meeting-room', I + '16.49.41.jpeg', 'Fit-out', 'Meeting room', 'Glazed meeting room with a wall-mounted screen on a completed office floor'],

      /* --- parking decks & surfacing --- */
      ['industrial-parking-works', I + '16.49.35.jpeg', 'Parking', 'Parking deck works', 'Parking deck under refurbishment with barriers in place and bays being reworked'],
      ['industrial-parking-finishes', I + '16.49.43 (1).jpeg', 'Parking', 'Wall & floor finishes', 'Face-brick wall and painted dado completed alongside a resurfaced parking floor'],
      ['industrial-bay-marking', I + '16.49.43.jpeg', 'Parking', 'Bay marking', 'Parking bays set out and marked against a freshly painted dado'],
      ['industrial-floor-marking', I + '16.49.43 (2).jpeg', 'Parking', 'Floor marking', 'Directional floor marking newly applied across a parking deck'],
      ['industrial-directional-marking', I + '16.49.44.jpeg', 'Parking', 'Directional marking', 'Arrow marking applied to a parking deck floor against a face-brick wall'],
      ['industrial-customer-parking', I + '16.49.44 (1).jpeg', 'Parking', 'Customer parking', 'Completed customer parking deck in use with bays and directional markings'],
      ['industrial-basement-parking', I + '16.49.47 (2).jpeg', 'Parking', 'Basement parking', 'Long run of completed basement parking with lighting and directional markings'],
      ['industrial-asphalt', I + '16.49.44 (2).jpeg', 'Surfacing', 'Asphalt surfacing', 'Newly laid asphalt surfacing with white line marking set out']
    ]
  }
};

/**
 * Energy Management System (EMS) - Industrial Smart Platform
 * Dataset derived exactly from Image 1 & Image 2
 */

const EMS_DATA = {
  overview: {
    totalConnectedLoadKW: 10394,
    contractedMaxDemandKVA: 1400,
    totalConsumptionMonthKWh: 384791,
    totalUnitsMonthKWh: 384791,
    powerFactorAvg: 0.97,
    powerFactorType: "Leading",
    co2SavedTonnesToday: 21.35,
    equivalentTrees: 15.32,
    gridSupplyStatus: "ONLINE",
    solarGenerationStatus: "ON",
    allSystemsStatus: "Normal",
    timestamp: "13 May 2025 Tuesday 11:35:42 AM"
  },
  
  // 12 Industrial Divisions arranged in a clockwise radial loop matching Image 2
  units: [
    {
      id: 1,
      name: "PEB Structure Manufacturing",
      shortName: "PEB Structure",
      maxDemandKVA: 150,
      connectedLoadKW: 679,
      pf: 0.96,
      consumptionPerMonthKWh: 38550,
      badgeColor: "#00e676",
      category: "Heavy Structural Pre-Engineered Buildings",
      angleDeg: 120, // Top-Left (~10 o'clock)
      distance: 210,
      buildingWidth: 54,
      buildingLength: 42,
      buildingHeight: 18,
      solarPanels: true,
      hasGantryCrane: true,
      description: "Heavy structural fabrication workshop specializing in pre-engineered industrial portal frames, built-up I-sections, and heavy roof trusses.",
      majorEquipment: [
        { name: "Overhead Gantry Cranes (2x 25T)", loadKW: 180, status: "Operating" },
        { name: "CNC Submerged Arc Welding Lines", loadKW: 220, status: "Operating" },
        { name: "Hydraulic Plate Shearers & Punching", loadKW: 145, status: "Operating" },
        { name: "Auxiliary Air Compressors & Exhaust", loadKW: 134, status: "Idle" }
      ]
    },
    {
      id: 2,
      name: "ROB Structure Manufacturing",
      shortName: "ROB Structure",
      maxDemandKVA: 100,
      connectedLoadKW: 532,
      pf: 0.95,
      consumptionPerMonthKWh: 10718,
      badgeColor: "#00e676",
      category: "Railway Over Bridge (ROB) & Girder Fabrication",
      angleDeg: 90, // Top (~11 to 12 o'clock)
      distance: 205,
      buildingWidth: 50,
      buildingLength: 40,
      buildingHeight: 16,
      solarPanels: true,
      hasGantryCrane: true,
      description: "Dedicated production facility for high-tolerance Railway Over-Bridge bowstring steel girders, heavy plate box-sections, and bridge bearings.",
      majorEquipment: [
        { name: "Automated Box-Girder Assembly Line", loadKW: 190, status: "Operating" },
        { name: "Heavy Duty Shot Blasting Booth", loadKW: 160, status: "Standby" },
        { name: "MIG / TIG Robotic Welding Stations", loadKW: 110, status: "Operating" },
        { name: "Plasma CNC Profile Cutters", loadKW: 72, status: "Operating" }
      ]
    },
    {
      id: 3,
      name: "CNG Booster compressor manufacturing",
      shortName: "CNG Booster Mfg",
      maxDemandKVA: 40,
      connectedLoadKW: 67,
      pf: 0.99,
      consumptionPerMonthKWh: 5432,
      badgeColor: "#00e676",
      category: "High-Pressure Gas Compressors & Clean Machinery",
      angleDeg: 60, // Top-Right (~1 o'clock)
      distance: 200,
      buildingWidth: 38,
      buildingLength: 36,
      buildingHeight: 14,
      solarPanels: true,
      hasSilos: true,
      description: "High-precision clean machinery assembly plant for multi-stage reciprocating CNG booster compressors and hydraulic dispenser units.",
      majorEquipment: [
        { name: "Precision CNC Turning Centers", loadKW: 25, status: "Operating" },
        { name: "Hydrostatic High-Pressure Test Cell", loadKW: 18, status: "Operating" },
        { name: "Helium Leak Detection System", loadKW: 12, status: "Operating" },
        { name: "Climate Control & Cleanroom Airflow", loadKW: 12, status: "Operating" }
      ]
    },
    {
      id: 4,
      name: "Fastners manufacturing unit",
      shortName: "Fasteners Unit",
      maxDemandKVA: 180,
      connectedLoadKW: 718,
      pf: 0.95,
      consumptionPerMonthKWh: 33059,
      badgeColor: "#00e676",
      category: "High-Tensile Industrial Fasteners & Bolts",
      angleDeg: 30, // Right-Top (~2 o'clock)
      distance: 215,
      buildingWidth: 48,
      buildingLength: 42,
      buildingHeight: 16,
      solarPanels: true,
      hasChimney: true,
      description: "High-speed cold forging, bolt heading, nut tapping, and continuous atmosphere heat-treatment hardening shop.",
      majorEquipment: [
        { name: "Multi-Die Cold Header Forming Presses", loadKW: 260, status: "Operating" },
        { name: "Continuous Mesh Belt Hardening Furnace", loadKW: 240, status: "Operating" },
        { name: "High Speed Thread Rolling Machines", loadKW: 130, status: "Operating" },
        { name: "Centrifugal Oil Separators & Washers", loadKW: 88, status: "Operating" }
      ]
    },
    {
      id: 5,
      name: "Transmision Tower manufacturing unit",
      shortName: "Transmission Tower",
      maxDemandKVA: 250,
      connectedLoadKW: 1523,
      pf: 0.95,
      consumptionPerMonthKWh: 39709,
      badgeColor: "#00e676",
      category: "Extra High Voltage (EHV) Power Transmission Structures",
      angleDeg: 0, // Far-Right (~3 o'clock)
      distance: 225,
      buildingWidth: 56,
      buildingLength: 46,
      buildingHeight: 18,
      solarPanels: true,
      hasTowerMockup: true,
      description: "Large capacity structural angle processing facility featuring automated CNC punching, shearing, and stamping lines for 400kV/765kV lattice towers.",
      majorEquipment: [
        { name: "CNC Angle Iron Punching & Stamping", loadKW: 480, status: "Operating" },
        { name: "High-Capacity Plate Band Saws", loadKW: 360, status: "Operating" },
        { name: "Substation Steel Fabrication Gantry", loadKW: 410, status: "Operating" },
        { name: "Outdoor Material Handling Overhead Cranes", loadKW: 273, status: "Operating" }
      ]
    },
    {
      id: 6,
      name: "Solar Structure Manufacturing",
      shortName: "Solar Structure",
      maxDemandKVA: 120,
      connectedLoadKW: 990,
      pf: 0.99,
      consumptionPerMonthKWh: 20070,
      badgeColor: "#00e676",
      category: "Utility-Scale Solar Ground Mount & Tracker Racking",
      angleDeg: -30, // Right-Bottom (~4 o'clock)
      distance: 215,
      buildingWidth: 52,
      buildingLength: 42,
      buildingHeight: 15,
      solarPanels: true,
      fullSolarRoof: true,
      description: "Continuous roll-forming lines producing cold-formed C/Z purlins, single-axis tracker torque tubes, and hot-dip galvanized mounting brackets.",
      majorEquipment: [
        { name: "Continuous High Speed Roll-Forming Lines", loadKW: 390, status: "Operating" },
        { name: "Automated Tube Piercing & Slotting", loadKW: 280, status: "Operating" },
        { name: "Zinc Primer & Corrosion Coating", loadKW: 180, status: "Operating" },
        { name: "Robotic Stacking & Strapping Line", loadKW: 140, status: "Operating" }
      ]
    },
    {
      id: 7,
      name: "Scaffolding fabrication unit",
      shortName: "Scaffolding Unit",
      maxDemandKVA: 98,
      connectedLoadKW: 453,
      pf: 0.98,
      consumptionPerMonthKWh: 25712,
      badgeColor: "#00e676",
      category: "Cuplock & Ringlock Modular Scaffolding",
      angleDeg: -60, // Bottom-Right (~5 o'clock)
      distance: 205,
      buildingWidth: 46,
      buildingLength: 38,
      buildingHeight: 15,
      solarPanels: true,
      description: "Fabrication workshop for certified modular construction scaffolding, cuplock ledgers, base jacks, and safety shoring props.",
      majorEquipment: [
        { name: "Automatic Pipe Cutting & Chamfering", loadKW: 140, status: "Operating" },
        { name: "Cup Welding Circular Robotic Cells", loadKW: 165, status: "Operating" },
        { name: "Hydraulic Swaging & Thread Rolling", loadKW: 88, status: "Operating" },
        { name: "Dip Painting & Drying Tunnel", loadKW: 60, status: "Operating" }
      ]
    },
    {
      id: 8,
      name: "Signboard manufacturing unit",
      shortName: "Signboard Unit",
      maxDemandKVA: 25,
      connectedLoadKW: 134,
      pf: 0.99,
      consumptionPerMonthKWh: 3426,
      badgeColor: "#00e676",
      category: "Highway & Urban Smart Signage Systems",
      angleDeg: -90, // Bottom (~6 o'clock)
      distance: 195,
      buildingWidth: 40,
      buildingLength: 34,
      buildingHeight: 13,
      solarPanels: true,
      description: "Precision sheet metal fabrication, reflective film thermal vacuum applicator lines, and intelligent LED variable message sign (VMS) assembly.",
      majorEquipment: [
        { name: "Fiber Laser Sheet Cutting Bed", loadKW: 45, status: "Operating" },
        { name: "CNC Hydraulic Press Brake", loadKW: 35, status: "Operating" },
        { name: "Electrostatic Powder Coating Booth", loadKW: 32, status: "Operating" },
        { name: "LED Matrix Burn-in Testing Bay", loadKW: 22, status: "Operating" }
      ]
    },
    {
      id: 9,
      name: "Galvanising Unit",
      shortName: "Galvanising Unit",
      maxDemandKVA: 120,
      connectedLoadKW: 551,
      pf: 0.99,
      consumptionPerMonthKWh: 98437,
      badgeColor: "#00e676",
      category: "Hot-Dip Zinc Galvanizing & Corrosion Metallurgy",
      angleDeg: -125, // Bottom-Left (~7 to 8 o'clock)
      distance: 215,
      buildingWidth: 54,
      buildingLength: 42,
      buildingHeight: 18,
      solarPanels: true,
      hasChimney: true,
      hasSilos: true,
      description: "High-tonnage hot-dip zinc galvanizing facility with 14m molten zinc kettle, automated pre-treatment acid tanks, flux heating, and fume scrubbing towers. Top monthly consumer (98,437 kWh).",
      majorEquipment: [
        { name: "Zinc Bath Heating & Induction Agitator", loadKW: 240, status: "Continuous" },
        { name: "Acid Fume Extraction & Wet Scrubbers", loadKW: 130, status: "Continuous" },
        { name: "Overhead Monorail Transfer Hoists", loadKW: 95, status: "Operating" },
        { name: "Flux Heating Heat-Exchanger System", loadKW: 86, status: "Operating" }
      ]
    },
    {
      id: 10,
      name: "Small arm manufacturing unit",
      shortName: "Small Arm Unit",
      maxDemandKVA: 60,
      connectedLoadKW: 161,
      pf: 0.99,
      consumptionPerMonthKWh: 3487,
      badgeColor: "#00e676",
      category: "Defense Hardware & Precision Machining",
      angleDeg: -155, // Left-Bottom (~8 o'clock)
      distance: 205,
      buildingWidth: 42,
      buildingLength: 36,
      buildingHeight: 14,
      solarPanels: true,
      description: "Secure, climate-controlled defense engineering workshop featuring high-speed 5-axis vertical machining centers, precision EDM, and metrology.",
      majorEquipment: [
        { name: "5-Axis High Precision CNC Centers (x3)", loadKW: 68, status: "Operating" },
        { name: "Wire-Cut EDM & Spark Erosion Machines", loadKW: 38, status: "Operating" },
        { name: "Vacuum Hardening & Nitriding Furnace", loadKW: 32, status: "Operating" },
        { name: "Metrology Lab Clean Air Handling Unit", loadKW: 23, status: "Operating" }
      ]
    },
    {
      id: 11,
      name: "Composite unit",
      shortName: "Composite Unit",
      maxDemandKVA: 100,
      connectedLoadKW: 2188,
      pf: 0.99,
      consumptionPerMonthKWh: 20900,
      badgeColor: "#00e676",
      category: "Advanced Carbon Fiber & High-Performance Polymers",
      angleDeg: 180, // Far-Left (~9 o'clock)
      distance: 225,
      buildingWidth: 56,
      buildingLength: 46,
      buildingHeight: 17,
      solarPanels: true,
      hasSilos: true,
      description: "Advanced composites manufacturing complex housing large aerospace-grade curing autoclaves, CNC automated tape placement, and post-cure thermal ovens.",
      majorEquipment: [
        { name: "Industrial High-Pressure Autoclaves (x2)", loadKW: 920, status: "Operating" },
        { name: "Electrically Heated Curing Ovens", loadKW: 680, status: "Operating" },
        { name: "Automated Ply Cutting & Cleanroom HVAC", loadKW: 350, status: "Operating" },
        { name: "Chilled Water Loop & Vacuum Pumps", loadKW: 238, status: "Operating" }
      ]
    },
    {
      id: 12,
      name: "Shelters manufacturing unit",
      shortName: "Shelters Unit",
      maxDemandKVA: 120,
      connectedLoadKW: 2398,
      pf: 0.98,
      consumptionPerMonthKWh: 37695,
      badgeColor: "#00e676",
      category: "Modular Prefabricated Shelters & Clean Enclosures",
      angleDeg: 150, // Left-Top (~10 o'clock)
      distance: 220,
      buildingWidth: 56,
      buildingLength: 48,
      buildingHeight: 18,
      solarPanels: true,
      description: "Comprehensive manufacturing line for modular military tactical shelters, telecom BTS shelters, and insulated sandwich polyurethane panels (PUF). Highest connected load (2,398 kW).",
      majorEquipment: [
        { name: "Continuous PUF High-Pressure Injection Press", loadKW: 880, status: "Operating" },
        { name: "Hydraulic Heated Platens Press (12-Meter)", loadKW: 750, status: "Operating" },
        { name: "Automated Sheet Metal Forming & Bending", loadKW: 460, status: "Operating" },
        { name: "Overhead Assembly Conveyors & Ventilation", loadKW: 308, status: "Operating" }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EMS_DATA;
}

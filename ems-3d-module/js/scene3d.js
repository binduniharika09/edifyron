/**
 * Energy Management System (EMS) - Industrial Smart Platform
 * Three.js 3D Campus Scene Architecture
 * Modeled faithful to Image 2 with dimensions & metrics from Image 1
 */

class EMSScene {
  constructor(canvasElement, labelsContainer, onUnitSelect) {
    this.canvas = canvasElement;
    this.labelsContainer = labelsContainer;
    this.onUnitSelect = onUnitSelect;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.unitsMeshes = [];
    this.markerElements = [];
    this.hubMarker = null;
    this.energyBeams = [];
    this.energyParticles = [];
    this.rotatingElements = [];

    this.isNightMode = true;
    this.autoRotate = false;
    this.showConduits = true;
    this.selectedUnitId = null;

    this.init();
  }

  init() {
    // 1. SCENE & FOG
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x07111e);
    this.scene.fog = new THREE.FogExp2(0x07111e, 0.0009);

    // 2. CAMERA
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 1, 4000);
    // Initial isometric view matching Image 2
    this.defaultCamPos = new THREE.Vector3(0, 380, 480);
    this.defaultTarget = new THREE.Vector3(0, 10, 0);
    this.camera.position.copy(this.defaultCamPos);

    // 3. RENDERER
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // 4. CONTROLS
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2.15; // Don't clip under ground
    this.controls.minDistance = 60;
    this.controls.maxDistance = 1100;
    this.controls.target.copy(this.defaultTarget);

    // 5. BUILD ENVIRONMENT & OBJECTS
    this.setupLighting();
    this.buildTerrainAndRoads();
    this.buildSurroundingForest();
    this.buildCentralEnergyHub();
    this.buildManufacturingUnits();
    this.buildEnergyConduits();
    this.buildFloatingHTMLMarkers();

    // 6. EVENT LISTENERS
    window.addEventListener('resize', () => this.onResize());
    this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));
    this.canvas.addEventListener('mousemove', (e) => this.onCanvasMouseMove(e));

    // 7. START ANIMATION LOOP
    this.clock = new THREE.Clock();
    this.animate();
  }

  setupLighting() {
    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0x233e5e, 1.4);
    this.scene.add(this.ambientLight);

    // Sun / Main Industrial Light
    this.dirLight = new THREE.DirectionalLight(0xdcf0ff, 1.6);
    this.dirLight.position.set(260, 420, 220);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 100;
    this.dirLight.shadow.camera.far = 1200;
    const d = 380;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.0005;
    this.scene.add(this.dirLight);

    // Cyan/Blue Industrial Fill Light
    this.fillLight = new THREE.DirectionalLight(0x00e5ff, 0.45);
    this.fillLight.position.set(-250, 180, -200);
    this.scene.add(this.fillLight);

    // Central 33kV Green Glow Light
    this.hubPointLight = new THREE.PointLight(0x00e676, 4.5, 400);
    this.hubPointLight.position.set(0, 32, 0);
    this.scene.add(this.hubPointLight);
  }

  buildTerrainAndRoads() {
    // 1. Campus Ground Base (Dark industrial ground)
    const groundGeo = new THREE.PlaneGeometry(1600, 1600, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0a1622,
      roughness: 0.85,
      metalness: 0.15
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // 2. Inner Paved Industrial Campus Platform
    const campusGeo = new THREE.CylinderGeometry(280, 290, 2, 64);
    const campusMat = new THREE.MeshStandardMaterial({
      color: 0x112134,
      roughness: 0.75,
      metalness: 0.25
    });
    const campusMesh = new THREE.Mesh(campusGeo, campusMat);
    campusMesh.position.y = 1;
    campusMesh.receiveShadow = true;
    this.scene.add(campusMesh);

    // 3. Central Substation Plaza Ring
    const subGeo = new THREE.CylinderGeometry(72, 74, 2.5, 48);
    const subMat = new THREE.MeshStandardMaterial({
      color: 0x0b1a2b,
      roughness: 0.6,
      metalness: 0.3
    });
    const subMesh = new THREE.Mesh(subGeo, subMat);
    subMesh.position.y = 2;
    subMesh.receiveShadow = true;
    this.scene.add(subMesh);

    // 4. Concentric Roadway Rings & Radial Lanes
    // Inner Ring Road (between Hub and Units)
    const innerRoadGeo = new THREE.RingGeometry(86, 102, 64);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x182a3d,
      roughness: 0.9,
      side: THREE.DoubleSide
    });
    const innerRoad = new THREE.Mesh(innerRoadGeo, roadMat);
    innerRoad.rotation.x = -Math.PI / 2;
    innerRoad.position.y = 2.2;
    innerRoad.receiveShadow = true;
    this.scene.add(innerRoad);

    // Outer Perimeter Ring Road
    const outerRoadGeo = new THREE.RingGeometry(255, 275, 64);
    const outerRoad = new THREE.Mesh(outerRoadGeo, roadMat);
    outerRoad.rotation.x = -Math.PI / 2;
    outerRoad.position.y = 2.2;
    outerRoad.receiveShadow = true;
    this.scene.add(outerRoad);

    // Glowing Neon Perimeter Border for Substation
    const ringBorderGeo = new THREE.TorusGeometry(74, 0.8, 16, 64);
    const ringBorderMat = new THREE.MeshBasicMaterial({
      color: 0x00e676,
      transparent: true,
      opacity: 0.8
    });
    const ringBorder = new THREE.Mesh(ringBorderGeo, ringBorderMat);
    ringBorder.rotation.x = Math.PI / 2;
    ringBorder.position.y = 3.5;
    this.scene.add(ringBorder);
    this.rotatingElements.push({ mesh: ringBorder, speedY: 0.003 });

    // Radial streets connecting Hub to 12 Units
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const streetGeo = new THREE.PlaneGeometry(12, 165);
      const street = new THREE.Mesh(streetGeo, roadMat);
      street.rotation.x = -Math.PI / 2;
      street.rotation.z = -angle + Math.PI / 2;
      street.position.set(Math.cos(angle) * 175, 2.15, Math.sin(angle) * 175);
      street.receiveShadow = true;
      this.scene.add(street);
    }
  }

  buildSurroundingForest() {
    // Rich forest ring around campus matching Image 2
    const treeGroup = new THREE.Group();
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x2b1e16 });
    const foliageColors = [0x194d27, 0x1e5a2e, 0x276b38, 0x144321, 0x2e7d32];
    
    // Instanced geometry approach or clustered trees
    const treeCount = 380;
    for (let i = 0; i < treeCount; i++) {
      const radius = 295 + Math.random() * 260;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const scale = 0.7 + Math.random() * 0.8;
      const isConifer = Math.random() > 0.4;
      const color = foliageColors[Math.floor(Math.random() * foliageColors.length)];
      const foliageMat = new THREE.MeshLambertMaterial({ color: color });

      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      tree.scale.set(scale, scale, scale);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.8, 1.2, 7, 6);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 3.5;
      trunk.castShadow = true;
      tree.add(trunk);

      // Foliage
      if (isConifer) {
        // Conical pine tree
        const c1Geo = new THREE.ConeGeometry(5.5, 12, 7);
        const c1 = new THREE.Mesh(c1Geo, foliageMat);
        c1.position.y = 11;
        c1.castShadow = true;
        tree.add(c1);

        const c2Geo = new THREE.ConeGeometry(4.2, 9, 7);
        const c2 = new THREE.Mesh(c2Geo, foliageMat);
        c2.position.y = 16;
        c2.castShadow = true;
        tree.add(c2);
      } else {
        // Deciduous round tree
        const sphereGeo = new THREE.DodecahedronGeometry(6.5, 1);
        const sphere = new THREE.Mesh(sphereGeo, foliageMat);
        sphere.position.y = 12;
        sphere.castShadow = true;
        tree.add(sphere);
      }

      treeGroup.add(tree);
    }
    this.scene.add(treeGroup);
  }

  buildCentralEnergyHub() {
    const hubGroup = new THREE.Group();
    hubGroup.position.set(0, 0, 0);

    // 1. Substation Platform Foundation
    const baseGeo = new THREE.CylinderGeometry(42, 45, 4, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x13273e,
      roughness: 0.6,
      metalness: 0.4
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 4;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    hubGroup.add(baseMesh);

    // 2. Central 33kV Energy Core Chamber (Glowing green cylinder)
    const coreGeo = new THREE.CylinderGeometry(10, 10, 22, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00e676,
      emissive: 0x00e676,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 17;
    coreMesh.castShadow = true;
    hubGroup.add(coreMesh);

    // Glass Enclosure for Core
    const glassGeo = new THREE.CylinderGeometry(13, 13, 26, 24);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      transmission: 0.85,
      opacity: 0.6,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.4
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = 17;
    hubGroup.add(glassMesh);

    // 3. Rotating Substation Energy Rings
    const ring1Geo = new THREE.TorusGeometry(18, 0.6, 12, 48);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.position.y = 20;
    hubGroup.add(ring1);
    this.rotatingElements.push({ mesh: ring1, speedX: 0.015, speedY: 0.02 });

    const ring2Geo = new THREE.TorusGeometry(22, 0.6, 12, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00e676 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.position.y = 20;
    hubGroup.add(ring2);
    this.rotatingElements.push({ mesh: ring2, speedX: -0.018, speedY: 0.012 });

    // 4. Substation High-Voltage Transformer Banks & Radiators (Around the core)
    const transformerMat = new THREE.MeshStandardMaterial({
      color: 0x37474f,
      roughness: 0.5,
      metalness: 0.6
    });
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x263238,
      roughness: 0.7,
      metalness: 0.5
    });

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const tx = Math.cos(angle) * 26;
      const tz = Math.sin(angle) * 26;

      const tGroup = new THREE.Group();
      tGroup.position.set(tx, 6, tz);
      tGroup.rotation.y = -angle;

      // Transformer Tank
      const tTankGeo = new THREE.BoxGeometry(10, 12, 8);
      const tTank = new THREE.Mesh(tTankGeo, transformerMat);
      tTank.position.y = 6;
      tTank.castShadow = true;
      tTank.receiveShadow = true;
      tGroup.add(tTank);

      // Bushing Insulators
      for (let b = -3; b <= 3; b += 3) {
        const bushGeo = new THREE.CylinderGeometry(0.5, 0.8, 4.5, 8);
        const bushMat = new THREE.MeshStandardMaterial({ color: 0xb0bec5, roughness: 0.3 });
        const bush = new THREE.Mesh(bushGeo, bushMat);
        bush.position.set(b, 14, 0);
        tGroup.add(bush);
      }

      // Cooling Fin Blocks
      const finGeo = new THREE.BoxGeometry(1.5, 8, 7);
      const fin1 = new THREE.Mesh(finGeo, finMat);
      fin1.position.set(-6, 5, 0);
      tGroup.add(fin1);

      const fin2 = new THREE.Mesh(finGeo, finMat);
      fin2.position.set(6, 5, 0);
      tGroup.add(fin2);

      hubGroup.add(tGroup);
    }

    // 5. High-Voltage Transmission Gantry Towers
    const gantryMat = new THREE.MeshStandardMaterial({
      color: 0x78909c,
      metalness: 0.8,
      roughness: 0.4
    });
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const gx = Math.cos(angle) * 35;
      const gz = Math.sin(angle) * 35;

      const pylon = this.createSubstationPylon(gantryMat);
      pylon.position.set(gx, 6, gz);
      pylon.rotation.y = -angle + Math.PI / 2;
      hubGroup.add(pylon);
    }

    this.scene.add(hubGroup);
    this.hubGroup = hubGroup;
  }

  createSubstationPylon(material) {
    const pylon = new THREE.Group();
    // Two vertical lattice pillars
    const colGeo = new THREE.BoxGeometry(1.2, 34, 1.2);
    const colL = new THREE.Mesh(colGeo, material);
    colL.position.set(-5, 17, 0);
    colL.castShadow = true;
    pylon.add(colL);

    const colR = new THREE.Mesh(colGeo, material);
    colR.position.set(5, 17, 0);
    colR.castShadow = true;
    pylon.add(colR);

    // Cross beam
    const beamGeo = new THREE.BoxGeometry(14, 1.5, 1.5);
    const beam = new THREE.Mesh(beamGeo, material);
    beam.position.set(0, 31, 0);
    beam.castShadow = true;
    pylon.add(beam);

    // Insulator strings
    for (let x = -4; x <= 4; x += 4) {
      const insGeo = new THREE.CylinderGeometry(0.35, 0.45, 5, 8);
      const insMat = new THREE.MeshStandardMaterial({ color: 0x90caf9 });
      const ins = new THREE.Mesh(insGeo, insMat);
      ins.position.set(x, 27, 0);
      pylon.add(ins);
    }

    return pylon;
  }

  buildManufacturingUnits() {
    const units = EMS_DATA.units;

    units.forEach((unit) => {
      // Calculate 3D position from polar coordinates (angleDeg, distance)
      const rad = (unit.angleDeg * Math.PI) / 180;
      const posX = Math.cos(rad) * unit.distance;
      const posZ = -Math.sin(rad) * unit.distance; // Match isometric orientation

      const unitGroup = new THREE.Group();
      unitGroup.position.set(posX, 0, posZ);
      unitGroup.rotation.y = -rad + Math.PI / 2; // Face towards the campus road
      unitGroup.userData = { unitId: unit.id, unitData: unit };

      // 1. Factory Paved Base / Apron
      const padGeo = new THREE.BoxGeometry(unit.buildingWidth + 14, 2, unit.buildingLength + 14);
      const padMat = new THREE.MeshStandardMaterial({
        color: 0x172a3f,
        roughness: 0.8
      });
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.position.y = 1;
      pad.receiveShadow = true;
      unitGroup.add(pad);

      // 2. Main Industrial Factory Shed
      const bColor = 0x223a54;
      const bMat = new THREE.MeshStandardMaterial({
        color: bColor,
        roughness: 0.6,
        metalness: 0.3
      });
      const bodyGeo = new THREE.BoxGeometry(unit.buildingWidth, unit.buildingHeight, unit.buildingLength);
      const body = new THREE.Mesh(bodyGeo, bMat);
      body.position.y = unit.buildingHeight / 2 + 2;
      body.castShadow = true;
      body.receiveShadow = true;
      body.userData = { isBuilding: true, unitId: unit.id };
      unitGroup.add(body);

      // 3. Pitched Industrial Roof
      const roofPeak = 7;
      const roofGeo = new THREE.ConeGeometry((unit.buildingWidth + 2) * 0.72, roofPeak, 4);
      const roofMat = new THREE.MeshStandardMaterial({
        color: 0x192e45,
        roughness: 0.5,
        metalness: 0.4
      });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.rotation.y = Math.PI / 4;
      roof.position.y = unit.buildingHeight + 2 + roofPeak / 2;
      roof.scale.set(1, 1, unit.buildingLength / unit.buildingWidth);
      roof.castShadow = true;
      unitGroup.add(roof);

      // 4. Rooftop Photovoltaic Solar Panel Arrays (Exact match to Image 2!)
      if (unit.solarPanels) {
        const solarGroup = new THREE.Group();
        solarGroup.position.y = unit.buildingHeight + 2 + roofPeak / 2 + 0.5;

        const panelRows = unit.fullSolarRoof ? 5 : 3;
        const panelCols = 6;
        const panelMat = new THREE.MeshStandardMaterial({
          color: 0x0044aa,
          emissive: 0x001a44,
          roughness: 0.2,
          metalness: 0.8
        });

        for (let r = 0; r < panelRows; r++) {
          for (let c = 0; c < panelCols; c++) {
            const pGeo = new THREE.PlaneGeometry(6, 4);
            const panel = new THREE.Mesh(pGeo, panelMat);
            panel.rotation.x = -Math.PI / 3.5;
            panel.position.set(
              (c - (panelCols - 1) / 2) * 7.5,
              1 - r * 0.4,
              (r - (panelRows - 1) / 2) * 5.5
            );
            solarGroup.add(panel);
          }
        }
        unitGroup.add(solarGroup);
      }

      // 5. Loading Bay Doors & Clerestory Window Strips
      const doorMat = new THREE.MeshStandardMaterial({ color: 0x0d1e30, metalness: 0.7, roughness: 0.3 });
      const bayGeo = new THREE.BoxGeometry(9, 9, 0.8);
      const bayDoor1 = new THREE.Mesh(bayGeo, doorMat);
      bayDoor1.position.set(-12, 6.5, unit.buildingLength / 2 + 0.4);
      unitGroup.add(bayDoor1);

      const bayDoor2 = new THREE.Mesh(bayGeo, doorMat);
      bayDoor2.position.set(12, 6.5, unit.buildingLength / 2 + 0.4);
      unitGroup.add(bayDoor2);

      // Glowing Glass Windows
      const winGeo = new THREE.PlaneGeometry(unit.buildingWidth * 0.85, 3);
      const winMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.35 });
      const winFront = new THREE.Mesh(winGeo, winMat);
      winFront.position.set(0, unit.buildingHeight - 2, unit.buildingLength / 2 + 0.5);
      unitGroup.add(winFront);

      // 6. Unit-Specific Props
      if (unit.hasGantryCrane) {
        // High outdoor crane gantry rails
        const craneRailMat = new THREE.MeshStandardMaterial({ color: 0xffab00, metalness: 0.7 });
        const railGeo = new THREE.BoxGeometry(2, 14, unit.buildingLength + 10);
        const rail = new THREE.Mesh(railGeo, craneRailMat);
        rail.position.set(unit.buildingWidth / 2 + 4, 9, 0);
        rail.castShadow = true;
        unitGroup.add(rail);
      }

      if (unit.hasChimney) {
        // Industrial exhaust scrubber stack
        const chimGeo = new THREE.CylinderGeometry(2, 2.8, 28, 16);
        const chimMat = new THREE.MeshStandardMaterial({ color: 0x546e7a, metalness: 0.5 });
        const chimney = new THREE.Mesh(chimGeo, chimMat);
        chimney.position.set(unit.buildingWidth / 2 - 4, 16, -unit.buildingLength / 2 + 6);
        chimney.castShadow = true;
        unitGroup.add(chimney);
      }

      if (unit.hasSilos) {
        // Pressure silos / storage vessels
        const siloMat = new THREE.MeshStandardMaterial({ color: 0xcfd8dc, metalness: 0.8, roughness: 0.2 });
        for (let s = 0; s < 3; s++) {
          const siloGeo = new THREE.CylinderGeometry(3.5, 3.5, 18, 16);
          const silo = new THREE.Mesh(siloGeo, siloMat);
          silo.position.set(-unit.buildingWidth / 2 - 6, 11, -8 + s * 8);
          silo.castShadow = true;
          unitGroup.add(silo);
        }
      }

      if (unit.hasTowerMockup) {
        // 3D Lattice Transmission Tower Model in yard
        const tModel = this.createMiniTower();
        tModel.position.set(unit.buildingWidth / 2 + 10, 2, 0);
        unitGroup.add(tModel);
      }

      // 7. Factory Step-Down Substation Box (Where energy enters the unit)
      const subBoxGeo = new THREE.BoxGeometry(8, 7, 7);
      const subBoxMat = new THREE.MeshStandardMaterial({
        color: 0x00c853,
        emissive: 0x00e676,
        emissiveIntensity: 0.4
      });
      const subBox = new THREE.Mesh(subBoxGeo, subBoxMat);
      subBox.position.set(0, 5.5, -unit.buildingLength / 2 - 4);
      subBox.castShadow = true;
      unitGroup.add(subBox);

      // Store reference
      unitGroup.userData.worldPosition = new THREE.Vector3(posX, unit.buildingHeight + 8, posZ);
      unitGroup.userData.substationPos = new THREE.Vector3(
        posX + Math.cos(unitGroup.rotation.y) * 0 - Math.sin(unitGroup.rotation.y) * (-unit.buildingLength / 2 - 4),
        5,
        posZ + Math.sin(unitGroup.rotation.y) * 0 + Math.cos(unitGroup.rotation.y) * (-unit.buildingLength / 2 - 4)
      );

      this.scene.add(unitGroup);
      this.unitsMeshes.push(unitGroup);
    });
  }

  createMiniTower() {
    const tower = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, metalness: 0.9, roughness: 0.3 });
    const legGeo = new THREE.CylinderGeometry(0.3, 0.5, 26, 6);

    const l1 = new THREE.Mesh(legGeo, mat);
    l1.position.set(-2, 13, -2);
    l1.rotation.z = -0.06;
    tower.add(l1);

    const l2 = new THREE.Mesh(legGeo, mat);
    l2.position.set(2, 13, -2);
    l2.rotation.z = 0.06;
    tower.add(l2);

    const l3 = new THREE.Mesh(legGeo, mat);
    l3.position.set(-2, 13, 2);
    l3.rotation.z = -0.06;
    tower.add(l3);

    const l4 = new THREE.Mesh(legGeo, mat);
    l4.position.set(2, 13, 2);
    l4.rotation.z = 0.06;
    tower.add(l4);

    const armGeo = new THREE.BoxGeometry(10, 0.8, 0.8);
    const arm = new THREE.Mesh(armGeo, mat);
    arm.position.y = 22;
    tower.add(arm);

    return tower;
  }

  buildEnergyConduits() {
    // Glowing neon green energy beams connecting central 33kV hub to all 12 units
    const hubCenter = new THREE.Vector3(0, 16, 0);

    this.unitsMeshes.forEach((unitMesh) => {
      const targetPos = unitMesh.userData.substationPos || unitMesh.position;

      // Create quadratic bezier curve conduit from hub out to unit
      const midPoint = new THREE.Vector3()
        .addVectors(hubCenter, targetPos)
        .multiplyScalar(0.5);
      midPoint.y = 26; // Arch upwards slightly

      const curve = new THREE.QuadraticBezierCurve3(hubCenter, midPoint, targetPos);
      const points = curve.getPoints(36);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.55, 8, false);

      // Glowing Conduit Material
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x00e676,
        transparent: true,
        opacity: 0.85
      });
      const conduit = new THREE.Mesh(tubeGeo, tubeMat);
      this.scene.add(conduit);
      this.energyBeams.push(conduit);

      // Animated Pulsing Energy Particle
      const pGeo = new THREE.SphereGeometry(1.6, 12, 12);
      const pMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95
      });
      const particle = new THREE.Mesh(pGeo, pMat);
      this.scene.add(particle);

      this.energyParticles.push({
        mesh: particle,
        curve: curve,
        progress: Math.random(), // Stagger pulses
        speed: 0.008 + Math.random() * 0.004
      });
    });
  }

  buildFloatingHTMLMarkers() {
    // 1. Central 33kV Energy Hub HTML Marker
    const hubEl = document.createElement('div');
    hubEl.className = 'hub-marker interactive';
    hubEl.innerHTML = `
      <span class="hub-marker-icon">⚡</span>
      <span class="hub-marker-text">33 kV ENERGY HUB</span>
    `;
    hubEl.addEventListener('click', () => {
      this.focusOnHub();
    });
    this.labelsContainer.appendChild(hubEl);
    this.hubMarker = {
      element: hubEl,
      position: new THREE.Vector3(0, 42, 0)
    };

    // 2. 12 Manufacturing Units Interactive Floating Cards (Matching Image 2!)
    this.unitsMeshes.forEach((unitMesh) => {
      const u = unitMesh.userData.unitData;
      const markerEl = document.createElement('div');
      markerEl.className = 'unit-marker';
      markerEl.dataset.unitId = u.id;

      markerEl.innerHTML = `
        <div class="marker-header">
          <div class="marker-badge">${u.id}</div>
          <div class="marker-title" title="${u.name}">${u.shortName || u.name}</div>
        </div>
        <div class="marker-stats">
          <div class="marker-stat-col">
            <span class="marker-stat-label">Max Dem</span>
            <span class="marker-stat-val demand">${u.maxDemandKVA}<span style="font-size:7.5px">kVA</span></span>
          </div>
          <div class="marker-stat-col">
            <span class="marker-stat-label">Load</span>
            <span class="marker-stat-val">${u.connectedLoadKW}<span style="font-size:7.5px">kW</span></span>
          </div>
          <div class="marker-stat-col">
            <span class="marker-stat-label">PF</span>
            <span class="marker-stat-val pf">${u.pf.toFixed(2)}</span>
          </div>
        </div>
      `;

      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectUnit(u.id);
      });

      markerEl.addEventListener('mouseenter', () => {
        this.highlightUnit(u.id, true);
      });

      markerEl.addEventListener('mouseleave', () => {
        if (this.selectedUnitId !== u.id) {
          this.highlightUnit(u.id, false);
        }
      });

      this.labelsContainer.appendChild(markerEl);
      this.markerElements.push({
        element: markerEl,
        unitId: u.id,
        worldPos: new THREE.Vector3(
          unitMesh.position.x,
          u.buildingHeight + 16,
          unitMesh.position.z
        )
      });
    });
  }

  updateMarkersPosition() {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    const tempVec = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    this.camera.getWorldDirection(camDir);

    // Update 33kV Central Hub Marker
    if (this.hubMarker) {
      const toHub = this.hubMarker.position.clone().sub(this.camera.position);
      const isBehind = camDir.dot(toHub) <= 0;

      if (isBehind) {
        this.hubMarker.element.style.display = 'none';
      } else {
        tempVec.copy(this.hubMarker.position).project(this.camera);
        this.hubMarker.element.style.display = 'block';
        const x = (tempVec.x * halfWidth) + halfWidth;
        const y = -(tempVec.y * halfHeight) + halfHeight;
        this.hubMarker.element.style.left = `${x}px`;
        this.hubMarker.element.style.top = `${y}px`;
      }
    }

    // Update 12 Unit Markers
    this.markerElements.forEach((item) => {
      const toUnit = item.worldPos.clone().sub(this.camera.position);
      const isBehind = camDir.dot(toUnit) <= 0;

      if (isBehind) {
        item.element.style.display = 'none';
      } else {
        tempVec.copy(item.worldPos).project(this.camera);
        item.element.style.display = 'block';
        const x = (tempVec.x * halfWidth) + halfWidth;
        const y = -(tempVec.y * halfHeight) + halfHeight;
        item.element.style.left = `${x}px`;
        item.element.style.top = `${y}px`;
      }
    });
  }

  selectUnit(unitId) {
    this.selectedUnitId = unitId;
    const unitMesh = this.unitsMeshes.find((m) => m.userData.unitId === unitId);
    if (!unitMesh) return;

    // Highlight marker active class
    this.markerElements.forEach((m) => {
      if (m.unitId === unitId) {
        m.element.classList.add('active');
      } else {
        m.element.classList.remove('active');
      }
    });

    // Smooth Camera Transition to Unit
    const target = unitMesh.position.clone();
    const offset = new THREE.Vector3(
      Math.cos(unitMesh.userData.unitData.angleDeg * Math.PI / 180) * 80,
      75,
      -Math.sin(unitMesh.userData.unitData.angleDeg * Math.PI / 180) * 80 + 90
    );
    const newCamPos = target.clone().add(offset);

    this.tweenCamera(newCamPos, target, 1200);

    // Trigger dashboard callback
    if (this.onUnitSelect) {
      this.onUnitSelect(unitMesh.userData.unitData);
    }
  }

  highlightUnit(unitId, isHovered) {
    const unitMesh = this.unitsMeshes.find((m) => m.userData.unitId === unitId);
    if (!unitMesh) return;

    unitMesh.traverse((child) => {
      if (child.isMesh && child.userData.isBuilding) {
        if (isHovered) {
          child.material.emissive = new THREE.Color(0x00e5ff);
          child.material.emissiveIntensity = 0.45;
        } else {
          child.material.emissive = new THREE.Color(0x000000);
          child.material.emissiveIntensity = 0;
        }
      }
    });
  }

  focusOnHub() {
    this.selectedUnitId = null;
    this.markerElements.forEach((m) => m.element.classList.remove('active'));
    this.tweenCamera(new THREE.Vector3(0, 110, 160), new THREE.Vector3(0, 15, 0), 1200);
  }

  resetView() {
    this.selectedUnitId = null;
    this.markerElements.forEach((m) => m.element.classList.remove('active'));
    this.tweenCamera(this.defaultCamPos, this.defaultTarget, 1300);
  }

  setCameraPreset(presetName) {
    switch (presetName) {
      case 'isometric':
        this.resetView();
        break;
      case 'topdown':
        this.tweenCamera(new THREE.Vector3(0, 680, 0), new THREE.Vector3(0, 0, 0), 1200);
        break;
      case 'hub':
        this.focusOnHub();
        break;
      case 'front':
        this.tweenCamera(new THREE.Vector3(0, 140, 520), new THREE.Vector3(0, 20, 0), 1200);
        break;
    }
  }

  tweenCamera(targetPosition, targetLookAt, duration = 1200) {
    if (typeof TWEEN === 'undefined') {
      this.camera.position.copy(targetPosition);
      this.controls.target.copy(targetLookAt);
      return;
    }

    new TWEEN.Tween(this.camera.position)
      .to(targetPosition, duration)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(this.controls.target)
      .to(targetLookAt, duration)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
    if (this.isNightMode) {
      // Cyberpunk Night
      this.scene.background.setHex(0x07111e);
      this.scene.fog.color.setHex(0x07111e);
      this.dirLight.intensity = 1.6;
      this.dirLight.color.setHex(0xdcf0ff);
      this.ambientLight.intensity = 1.4;
      this.hubPointLight.intensity = 4.5;
    } else {
      // Bright Industrial Day
      this.scene.background.setHex(0x90caf9);
      this.scene.fog.color.setHex(0x90caf9);
      this.dirLight.intensity = 2.4;
      this.dirLight.color.setHex(0xffffff);
      this.ambientLight.intensity = 1.8;
      this.hubPointLight.intensity = 2.0;
    }
    return this.isNightMode;
  }

  toggleConduits() {
    this.showConduits = !this.showConduits;
    this.energyBeams.forEach((b) => (b.visible = this.showConduits));
    this.energyParticles.forEach((p) => (p.mesh.visible = this.showConduits));
    return this.showConduits;
  }

  onCanvasClick(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (let hit of intersects) {
      let current = hit.object;
      while (current && current !== this.scene) {
        if (current.userData && current.userData.unitId) {
          this.selectUnit(current.userData.unitId);
          return;
        }
        current = current.parent;
      }
    }
  }

  onCanvasMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    // 1. Update Tweens
    if (typeof TWEEN !== 'undefined') {
      TWEEN.update();
    }

    // 2. Rotate rings and substation gadgets
    this.rotatingElements.forEach((item) => {
      if (item.speedY) item.mesh.rotation.y += item.speedY;
      if (item.speedX) item.mesh.rotation.x += item.speedX;
      if (item.speedZ) item.mesh.rotation.z += item.speedZ;
    });

    // 3. Update Animated Energy Particles flowing along conduits
    if (this.showConduits) {
      this.energyParticles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pt = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pt);
      });
    }

    // 4. Auto-rotation mode if enabled
    if (this.autoRotate) {
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.8;
    } else {
      this.controls.autoRotate = false;
    }

    this.controls.update();

    // 5. Update HTML Floating Markers in 3D Space
    this.updateMarkersPosition();

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  }
}

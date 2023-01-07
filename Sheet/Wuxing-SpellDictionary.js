function GetSpellInformation(spell) {
    switch (spell.toLowerCase().replace("'", "")) {
        case "":
            return {
                name: ""
            };
        case "shimmer":
            return {
                name: "Shimmer",
                    traits: "Sustain",
                    power: 2,
                    branch: "light",
                    family: "Blur",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "30 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Light bends around your target creating a shimmering effect. For the duration, any creature has disadvantage on attack rolls against the target. An attacker is immune to this effect if it doesn’t rely on sight, as with blindsight.`,
                    heightenDesc: ``,
            };
        case "distortion":
            return {
                name: "Distortion",
                    traits: "Sustain",
                    power: 2,
                    branch: "time",
                    family: "Blur",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your body appears to waver as images of you appear concurrently and overlap. For the duration, any creature has disadvantage on attack rolls against you.`,
                    heightenDesc: ``,
            };
        case "dust wood":
            return {
                name: "Dust Wood",
                    traits: "Attack, Dust",
                    power: 1,
                    branch: "plantation",
                    family: "Break Material",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 5,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "2d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "2d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You break down wood into dust. The target area must contain non-complex wood aspected material. Make a melee spell attack against the target dealing 2d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 2d12 per level.`,
            };
        case "dust glass":
            return {
                name: "Dust Glass",
                    traits: "Attack, Dust",
                    power: 1,
                    branch: "glass",
                    family: "Break Material",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 5,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "2d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "2d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You break down glass into dust. The target area must contain non-complex fire aspected material. Make a melee spell attack against the target dealing 2d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 2d12 per level.`,
            };
        case "dust earth":
            return {
                name: "Dust Earth",
                    traits: "Attack, Dust",
                    power: 1,
                    branch: "rock",
                    family: "Break Material",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 5,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "2d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "2d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You break down earth into dust. The target area must contain non-complex earth aspected material. Make a melee spell attack against the target dealing 2d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 2d12 per level.`,
            };
        case "dust metal":
            return {
                name: "Dust Metal",
                    traits: "Attack, Dust",
                    power: 1,
                    branch: "forge",
                    family: "Break Material",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 5,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "2d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "2d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You break down metal into dust. The target area must contain non-complex metal aspected material. Make a melee spell attack against the target dealing 2d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 2d12 per level.`,
            };
        case "dust ice":
            return {
                name: "Dust Ice",
                    traits: "Attack, Dust",
                    power: 1,
                    branch: "ice",
                    family: "Break Material",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 5,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "2d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "2d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You break down ice into dust. The target area must contain non-complex earth aspected material. Make a melee spell attack against the target dealing 2d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 2d12 per level.`,
            };
        case "dust ironwood":
            return {
                name: "Dust Ironwood",
                    traits: "Attack, Dust",
                    power: 2,
                    branch: "plantation",
                    family: "Break Material",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 20,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "3d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "1d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down ironwood or ironoak into dust. Make a melee spell attack against the target dealing 3d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 1d12 per level.`,
            };
        case "excavate":
            return {
                name: "Excavate",
                    traits: "Dust",
                    power: 2,
                    branch: "rock",
                    family: "Break Material",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Touch",
                    area: "5-foot-radius, 10-foot-deep cylinder",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause the earth to part and create a trench. You touch loose dirt within an area and crush it into dust. You may then immediately move the dust up to 10 feet in another direction or destroy it completely.`,
                    heightenDesc: ``,
            };
        case "dust glacial":
            return {
                name: "Dust Glacial",
                    traits: "Attack, Dust",
                    power: 2,
                    branch: "ice",
                    family: "Break Material",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 20,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "3d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "1d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down glaceum dust or glacerulum dust to craft objects. Make a melee spell attack against the target dealing 3d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 1d12 per level.`,
            };
        case "dust fireglass":
            return {
                name: "Dust Fireglass",
                    traits: "Attack, Dust",
                    power: 3,
                    branch: "glass",
                    family: "Break Material",
                    element: "Fire",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 35,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "3d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "1d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down fireglass dust or rubrumium dust to craft objects. Make a melee spell attack against the target dealing 3d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 1d12 per level.`,
            };
        case "dust adamantine":
            return {
                name: "Dust Adamantine",
                    traits: "Attack, Dust",
                    power: 4,
                    branch: "glass",
                    family: "Break Material",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "4d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "2d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down adamantine dust to craft objects. Make a melee spell attack against the target dealing 4d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 2d12 per level.`,
            };
        case "dust platinum":
            return {
                name: "Dust Platinum",
                    traits: "Attack, Dust",
                    power: 4,
                    branch: "forge",
                    family: "Break Material",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "4d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "2d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down platinum dust to craft objects. Make a melee spell attack against the target dealing 4d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 2d12 per level.`,
            };
        case "dust viridium":
            return {
                name: "Dust Viridium",
                    traits: "Attack, Dust",
                    power: 5,
                    branch: "corrosion",
                    family: "Break Material",
                    element: "Wood",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 65,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "5d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "3d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down viridium dust to craft objects. Make a melee spell attack against the target dealing 5d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 3d12 per level.`,
            };
        case "dust obsidian":
            return {
                name: "Dust Obsidian",
                    traits: "Attack, Dust",
                    power: 5,
                    branch: "rock",
                    family: "Break Material",
                    element: "Earth",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 65,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "5d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "3d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down obsidian dust to craft objects. Make a melee spell attack against the target dealing 5d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 3d12 per level.`,
            };
        case "dust mithral":
            return {
                name: "Dust Mithral",
                    traits: "Attack, Dust",
                    power: 5,
                    branch: "forge",
                    family: "Break Material",
                    element: "Metal",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 65,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "5d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "3d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down mithral dust to craft objects. Make a melee spell attack against the target dealing 5d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 3d12 per level.`,
            };
        case "dust albryst":
            return {
                name: "Dust Albryst",
                    traits: "Attack, Dust",
                    power: 5,
                    branch: "ice",
                    family: "Break Material",
                    element: "Water",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 65,

                    range: "Touch",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "5d12",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "3d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can break down albryst dust or glacerulum dust to craft objects. Make a melee spell attack against the target dealing 5d12 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 3d12 per level.`,
            };
        case "forest guise":
            return {
                name: "Forest Guise",
                    traits: "Cloak, Sustain",
                    power: 1,
                    branch: "plantation",
                    family: "Cloak",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:While in a forested area, gain advantage on Stealth@e:Caster concentration up to 10 minutes]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You and up to three target creatures become entangled in thick vines. As long as all creatures remain in forested area, they gain advantage on Stealth checks.`,
                    heightenDesc: ``,
            };
        case "light blindness":
            return {
                name: "Light Blindness",
                    traits: "Cloak, Sustain",
                    power: 1,
                    branch: "light",
                    family: "Cloak",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "R",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Invisible@d:Whenever the affected target moves, they become lightly obscurred@e:Caster concentration up to 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Light around you begins to waver as you become invisible. As long as the caster remains in a source of light they remain invisible until the spell ends. Anything the caster is wearing or carrying is invisible as long as it is on the target’s person. If the caster moves from the square they occupy, anyone within line of sight can make a perception check at disadvantage vs. your stealth check to see your true form, ending the invisibility effect for them.`,
                    heightenDesc: ``,
            };
        case "shadow walk":
            return {
                name: "Shadow Walk",
                    traits: "Cloak, Sustain",
                    power: 1,
                    branch: "light",
                    family: "Cloak",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Invisible@e:Effect ends when not in dim or darker light. Effect ends when creature takes any action or when attacked. Caster concentration up to 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your form begins to waver while you're in the shadow soon after disappearing from sight. As long as the target remains in dim or darker light the target become invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. `,
                    heightenDesc: ``,
            };
        case "earth guise":
            return {
                name: "Earth Guise",
                    traits: "Cloak, Sustain",
                    power: 1,
                    branch: "rock",
                    family: "Cloak",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:While in an earthen area, gain advantage on Stealth@e:Caster concentration up to 10 minutes]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You and up to two target creatures become covered in rock that matches the terrain. As long as all creatures remain in an earthen area, they gain a +4 bonus to stealth checks.`,
                    heightenDesc: ``,
            };
        case "shadow steps":
            return {
                name: "Shadow Steps",
                    traits: "Cloak, Sustain",
                    power: 1,
                    branch: "shadow",
                    family: "Cloak",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Invisible@e:Effect ends when not in dim or darker light, Effect ends when creature takes any action, Caster concentration up to 10 minutes]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your form begins to waver while you're in the shadow soon after disappearing from sight. As long as the target remains in dim or darker light the target become invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. `,
                    heightenDesc: ``,
            };
        case "water guise":
            return {
                name: "Water Guise",
                    traits: "Cloak, Sustain",
                    power: 1,
                    branch: "fluid",
                    family: "Cloak",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:While in water, gain advantage on Stealth@e:Caster concentration up to 10 minutes]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You and each creature within a 20 foot radius of you begin to shift and waver within a water bubble. As long as all creatures remains in the radius and under water, they gain a +6 bonus to stealth checks. `,
                    heightenDesc: ``,
            };
        case "cloud of shadow":
            return {
                name: "Cloud of Shadow",
                    traits: "Sustain",
                    power: 2,
                    branch: "shadow",
                    family: "Cloak",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Become heavily obscurred@e:Caster concentration up to 1 hour]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A veil of shadows radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) is heavily obscurred.`,
                    heightenDesc: ``,
            };
        case "shadow stalker":
            return {
                name: "Shadow Stalker",
                    traits: "Sustain",
                    power: 4,
                    branch: "shadow",
                    family: "Cloak",
                    element: "Earth",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Invisible@e:Effect ends when not in dim or darker light. Caster concentration up to 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your form blends into the shadows. As long as the caster remains in dim or darker light the caster become invisible until the spell ends. Anything the caster is wearing or carrying is invisible as long as it is on the caster's person. `,
                    heightenDesc: ``,
            };
        case "wind wall":
            return {
                name: "Wind Wall",
                    traits: "Boundary, Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "wind",
                    family: "Conjure Boundary",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "250 feet",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "2d8",
                    dmgType: "Force",
                    dmgElem: "Wood",
                    hldmg: "1d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The creature is pushed 10 feet into the air and falls. Creatures that take fall damage land prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a powerful torrent of wind that pushes upwards and deals 2d8 force (Wood) damage. You can make the wall up of ten 5 feet long, 15 feet high, and 1 foot thick sections.
    
    The strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can’t pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and automatically miss. (Boulders hurled by siege engines, and similar projectiles, are unaffected.)`,
                    heightenDesc: `Damage increases by 1d8 per level.
    
    At power 3, Small or smaller creatures must make a Strength saving throw to pass through the wall.
    
    At power 4, Medium or smaller creatures must make a Strength saving throw to pass through the wall.
    
    At power 5, Large or smaller creatures must make a Strength saving throw to pass through the wall.`,
            };
        case "wall of fire":
            return {
                name: "Wall of Fire",
                    traits: "Boundary, Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "flame",
                    family: "Conjure Boundary",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "4d8",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You raise a blazing wall that burns creatures passing through it that deals 4d8 burn (Fire) damage. You can make the wall up of ten 5 feet long, 15 feet high, and 1 foot thick sections. You can shape the wall in any way you choose so long as it makes one continuous path along the ground. Everything on each side of the wall is concealed from creatures on the opposite side. `,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "wall of sand":
            return {
                name: "Wall of Sand",
                    traits: "Boundary, Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "sand",
                    family: "Conjure Boundary",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "2d8",
                    dmgType: "Rending",
                    dmgElem: "Earth",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Blinded@e:Ends when the creature exits the wall of sand.]",
                    onFailure: "[Blinded@e:Ends when the creature exits the wall of sand.]",
                    onCritFailure: "",

                    desc: `You conjure up a wall of swirling sand on the ground that deals 2d8 rending (Earth) damage. You can make the wall up of six 5 feet long, 10 feet high, and 10 feet thick sections. Everything on each side of the wall is concealed from creatures on the opposite side. 
    
    A creature is blinded while in the wall’s space and must spend 4 feet of movement for every 1 foot it moves there.`,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "blade barrier":
            return {
                name: "Blade Barrier",
                    traits: "Boundary, Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "forge",
                    family: "Conjure Boundary",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "4d10",
                    dmgType: "Rending",
                    dmgElem: "Metal",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Small blades scatter and slash at any target that tries to enter the boundary you form that deals 4d10 rending (Metal) damage. You can make the wall up of ten 5 feet long, 15 feet high, and 1 foot thick sections. `,
                    heightenDesc: `Damage increases by 2d10 per level.`,
            };
        case "wall of water":
            return {
                name: "Wall of Water",
                    traits: "Boundary, Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "fluid",
                    family: "Conjure Boundary",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "2d8",
                    dmgType: "Force",
                    dmgElem: "Water",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You conjure up a wall of water on the ground that spouts upward and deals 2d8 force (Water) damage. You can make the wall up of ten 5 feet long, 10 feet high, and 1 foot thick sections. Everything on each side of the wall is concealed from creatures on the opposite side. 
    
    The wall’s space is considered difficult terrain. Any ranged weapon attack that enters the wall’s space has disadvantage on the attack roll, and the damage is halved if the projectile passes through the wall to reach its target. Spells that deal cold damage that pass through the wall cause the area of the wall they pass through to freeze solid (at least a 5-foot square section is frozen). Each 5-foot-square frozen section has AC 5 and 15 hit points. Reducing a frozen section to 0 hit points destroys it. When a section is destroyed, the wall’s water doesn’t fill it.`,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "wall of force":
            return {
                name: "Wall of Force",
                    traits: "Environmental, Sustain",
                    power: 4,
                    branch: "force",
                    family: "Conjure Boundary",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You form an invisible wall of pure magical force up to 50 feet long and up to 20 feet high. The wall has no discernible thickness. You must create the wall in an unbroken open space so its edges don't pass through any creatures or objects, or the spell is lost. The wall has AC 10, DT 30, 6 HB, and it's immune to critical hits and precision damage. The wall blocks physical effects from passing through it.`,
                    heightenDesc: ``,
            };
        case "fog cloud":
            return {
                name: "Fog Cloud",
                    traits: "Cloud, Environmental, Sustain",
                    power: 1,
                    branch: "nimbus",
                    family: "Conjure Cloud",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "120 feet",
                    area: "15-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You conjure a thick cloud of vapor and metalic particles.`,
                    heightenDesc: ``,
            };
        case "congregate clouds":
            return {
                name: "Congregate Clouds",
                    traits: "Cloud",
                    power: 1,
                    branch: "nimbus",
                    family: "Conjure Cloud",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "R",
                    trigger: "When a creature within range is falling.",
                    mana: 50,

                    range: "60 feet",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause an incredibly dense cloud to form beneath your targets. This cloud catches anyone within or above it. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage, can land on its feet, and can walk out from the cloud freely.`,
                    heightenDesc: ``,
            };
        case "misty terrain":
            return {
                name: "Misty Terrain",
                    traits: "Cloud, Environmental, Sustain",
                    power: 1,
                    branch: "fluid",
                    family: "Conjure Cloud",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "120 feet",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `From the ground emerges a thick vapour making it difficult to see within. `,
                    heightenDesc: ``,
            };
        case "smoke cloud":
            return {
                name: "Smoke Cloud",
                    traits: "Cloud, Environmental, Sustain",
                    power: 2,
                    branch: "smoke",
                    family: "Conjure Cloud",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "300 feet",
                    area: "10-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A thick cloud of smoke forms and chokes those within. Any creature that is within the smoke has disadvantage on all strength and dexterity based checks and attack rolls.`,
                    heightenDesc: ``,
            };
        case "sandstorm":
            return {
                name: "Sandstorm",
                    traits: "Cloud, Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "sand",
                    family: "Conjure Cloud",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "Field",

                    check: "Constitution",
                    duration: "Up to 1 hour",

                    dmg: "3d6",
                    dmgType: "Rending",
                    dmgElem: "Earth",
                    hldmg: "1d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Whirling sand is formed then whips around in a large area, dealing 3d6 rending (Earth) damage. Creatures are blinded while in the affected area.`,
                    heightenDesc: `Damage increases by 1d6 per level.`,
            };
        case "ashen cloud":
            return {
                name: "Ashen Cloud",
                    traits: "Cloud, Environmental, Onset, Ravage, Sustain",
                    power: 3,
                    branch: "smoke",
                    family: "Conjure Cloud",
                    element: "Fire",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "300 feet",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "Field",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "4d6",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A thick cloud of burning ash forms and chokes those within, dealing 4d6 burn (Fire) damage. Any creature that is within the smoke has disadvantage on all strength and dexterity based checks and attack rolls. `,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "solid smoke":
            return {
                name: "Solid Smoke",
                    traits: "Cloud, Environmental, Sustain",
                    power: 4,
                    branch: "smoke",
                    family: "Conjure Cloud",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "300 feet",
                    area: "30-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A thick cloud of smoke slows those within as the vapors restrict all movement. Any creature that is within the smoke has disadvantage on all strength and dexterity based checks and attack rolls. The area counts as difficult terrain.
    
    Unlike most clouds, solid smoke requires a severe wind (31+ mph) to disperses these vapors.`,
                    heightenDesc: ``,
            };
        case "incendiary cloud":
            return {
                name: "Incendiary Cloud",
                    traits: "Cloud, Environmental, Onset, Ravage, Sustain",
                    power: 5,
                    branch: "smoke",
                    family: "Conjure Cloud",
                    element: "Fire",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "150 feet",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "10d8",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "3d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A swirling cloud of smoke shot through with white-hot embers appears where the caster desires, dealing 10d8 burn (Fire) damage. 
    
    The cloud moves 10 feet in a direction that you choose at the start of each of your turns.`,
                    heightenDesc: `Damage increases by 3d10 per level.`,
            };
        case "produce heat":
            return {
                name: "Produce Heat",
                    traits: "",
                    power: 1,
                    branch: "firefundamental",
                    family: "Conjure Environment",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You produce heat in one of the following ways. 
    • You raise the temperature in a 50 foot radius around you by up to 10°C (18°F).
    • You raise the temperature of an object you touch by 20°C (36°F).
    • You immediately dry a target wet creature or object.
    These effects may cause objects to immediately begin to melt.`,
                    heightenDesc: ``,
            };
        case "static shock":
            return {
                name: "Static Shock",
                    traits: "Environmental, Ravage, Sustain",
                    power: 1,
                    branch: "metalfundamental",
                    family: "Conjure Environment",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "60 feet",
                    area: "",
                    targets: "One target object",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "2d6",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You charge a metalic object with electricity. The first time a creature touches the object the electricity releases and deals 2d6 lighting (metal) damage. The effect on the object then ends.`,
                    heightenDesc: ``,
            };
        case "produce cold":
            return {
                name: "Produce Cold",
                    traits: "",
                    power: 1,
                    branch: "waterfundamental",
                    family: "Conjure Environment",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You produce cold in one of the following ways. 
    • You lower the temperature in a 50 foot radius around you by up to 10°C (18°F).
    • You lower the temperature of an object you touch by 20°C (36°F).
    These effects may cause objects to immediately begin to freeze.`,
                    heightenDesc: ``,
            };
        case "petal storm":
            return {
                name: "Petal Storm",
                    traits: "Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "plantation",
                    family: "Conjure Environment",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "150 feet",
                    area: "15-foot-radius, 20-foot-high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "2d10",
                    dmgType: "Rending",
                    dmgElem: "Wood",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You bring forth a cloud of razor-sharp flower petals that thrash violently in the wind that deal 2d10 rending (Wood) damage.`,
                    heightenDesc: `Damage increases by 2d10 per level.`,
            };
        case "spore":
            return {
                name: "Spore",
                    traits: "Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "toxin",
                    family: "Conjure Environment",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "150 feet",
                    area: "10-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "1d6",
                    dmgType: "Poison",
                    dmgElem: "",
                    hldmg: "1d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Small mushrooms spawn in the area and release toxic spores, dealing 1d6 poison damage.`,
                    heightenDesc: `Damage increases by 1d6 per level.`,
            };
        case "silence":
            return {
                name: "Silence",
                    traits: "Environmental, Sustrain",
                    power: 2,
                    branch: "sound",
                    family: "Conjure Environment",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `No sound can be created within or pass through an area where you snuff out all sound. Any creature or object entirely inside the sphere is immune to thunder damage, and creatures are deafened while entirely inside it.`,
                    heightenDesc: ``,
            };
        case "sleet storm":
            return {
                name: "Sleet Storm",
                    traits: "Environmental, Sustrain",
                    power: 2,
                    branch: "storm",
                    family: "Conjure Environment",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "150 feet",
                    area: "20-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The creature falls prone and slowed for 1 minute.",
                    success: "The creature falls prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Prone][Slowed@e:Ends after 1 minute]",
                    onSuccess: "[Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Freezing rain and sleet fill an area and heavily obscuring it. Exposed flames in the area are doused.
    
    The ground in the area is covered with slick ice, making it difficult terrain. When a creature enters the spell’s area for the first time on a turn or starts its turn there the creature must make a save. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "irradiate":
            return {
                name: "Irradiate",
                    traits: "Environmental, Onset, Ravage, Sustain",
                    power: 3,
                    branch: "radiation",
                    family: "Conjure Environment",
                    element: "Fire",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "60 feet",
                    area: "15-foot-radius, 20-foot-high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "2d10",
                    dmgType: "Radiation",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is staggered (1) for 1 round.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Staggered@d:Staggered 1@e:Ends at the start of the caster's turn]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You irradiate an area to harm those within, dealing 2d10 radiation (Fire) damage. Radiation damage deals half damage to both barrier and hp when a barrier is active on a target.`,
                    heightenDesc: ``,
            };
        case "sound buffer":
            return {
                name: "Sound Buffer",
                    traits: "Environmental, Sustrain",
                    power: 3,
                    branch: "sound",
                    family: "Conjure Environment",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Self",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You ensure those nearby cannot be heard by eavesdroppers by creating an area where no sound can pass through. Any creature or sound entirely inside the area cannot be heard outside of the sphere.`,
                    heightenDesc: ``,
            };
        case "diamond dust":
            return {
                name: "Diamond Dust",
                    traits: "Environmental, Onset, Ravage, Sustain",
                    power: 4,
                    branch: "storm",
                    family: "Conjure Environment",
                    element: "Water",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "300 feet",
                    area: "30-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "9d6",
                    dmgType: "Cold",
                    dmgElem: "Water",
                    hldmg: "5d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create an area of billowing ice and sleet dealing 9d6 cold (Water) damage. The area is considered heavily obscured. `,
                    heightenDesc: `Damage increases by 5d6 per level.`,
            };
        case "updraft":
            return {
                name: "Updraft",
                    traits: "Environmental, Sustrain",
                    power: 2,
                    branch: "wind",
                    family: "Conjure Forces",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "300 feet",
                    area: "100-foot-cube",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause a sustained updraft within an area, rising upward from the area’s bottom edge. When a creature in the area makes a vertical jump, the creature can jump up to 20 feet higher than normal. Creatures that end a fall within the area take only half damage from the fall.`,
                    heightenDesc: ``,
            };
        case "alleviate":
            return {
                name: "Alleviate",
                    traits: "Environmental, Sustrain",
                    power: 2,
                    branch: "gravity",
                    family: "Conjure Forces",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "30 feet",
                    area: "100-foot-cube",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You decrease the effects of gravity within an area. When a creature in the area makes a vertical jump, the creature can jump up to 30 feet higher than normal. Creatures that end a fall within the area take only half damage from the fall.`,
                    heightenDesc: ``,
            };
        case "calm air":
            return {
                name: "Calm Air",
                    traits: "Environmental, Sustrain",
                    power: 3,
                    branch: "storm",
                    family: "Conjure Forces",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "300 feet",
                    area: "100-foot-cube",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell calms the air and disperses fog, dust, and other particles. The wind force in the area is reduced in strength by two steps (to a minimum wind force of light) and clouds are dispersed, although parts of clouds that extend beyond the area are not affected. If a magical cloud or wind’s point of origin is inside the area of a calm air spell, the whole effect is suppressed; otherwise, only the part inside the area is suppressed. Suppression still counts against the duration of a wind or cloud effect.`,
                    heightenDesc: ``,
            };
        case "downdraft":
            return {
                name: "Downdraft",
                    traits: "Environmental, Onset, Sustrain",
                    power: 4,
                    branch: "wind",
                    family: "Conjure Forces",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "300 feet",
                    area: "100-foot-cube",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The creature falls prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause a sustained blast of strong wind to blow downward. Ranged weapon attacks that pass through the cube or that are made against targets within it have disadvantage on their attack rolls.`,
                    heightenDesc: ``,
            };
        case "pressure":
            return {
                name: "Pressure",
                    traits: "Environmental, Onset, Sustrain",
                    power: 4,
                    branch: "gravity",
                    family: "Conjure Forces",
                    element: "Earth",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "100 feet",
                    area: "30-foot-cube",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target is restrained. The creature can make a Strength saving throw at the end of their turn to break from the restrained condition.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Restrained@e:The creature may make a {DC} Strength Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You increase the effects of gravity within an area. The area is considered difficult terrain.`,
                    heightenDesc: ``,
            };
        case "zero gravity":
            return {
                name: "Zero Gravity",
                    traits: "Environmental, Sustrain",
                    power: 4,
                    branch: "gravity",
                    family: "Conjure Forces",
                    element: "Earth",

                    spellslotcost: 4,
                    actionCost: "3",
                    trigger: "",
                    mana: 500,

                    range: "120 feet",
                    area: "20-foot radius, 40-foot-tall cylinder",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You negate gravity's effects in the area. Creatures float in place unless they can Push Off a surface. Pushing Off is a single action which has the move trait, allowing the creature to move half its Speed in a straight line through the area. After Pushing Off a surface, the creature continues to move the same distance at the start of each of its turns until it leaves the area or Pushes Off against something else. A creature pushing against an untethered object of its size or smaller causes both the creature and the object to move at the same speed, but in opposite directions. Creatures who can levitate or fly can use those abilities to move around in the area without having to push off anything. Creatures who can't levitate or fly are usually on the ground, giving them a surface from which to push off.`,
                    heightenDesc: ``,
            };
        case "reverse gravity":
            return {
                name: "Reverse Gravity",
                    traits: "Environmental, Sustrain",
                    power: 5,
                    branch: "gravity",
                    family: "Conjure Forces",
                    element: "Earth",

                    spellslotcost: 5,
                    actionCost: "3",
                    trigger: "",
                    mana: 650,

                    range: "120 feet",
                    area: "20-foot radius, 40-foot-tall cylinder",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You reverse gravity in the area. Creatures and objects that aren't secured to the ground immediately fall upward to the top of the area. A creature might be able to Grab an Edge to arrest its fall if it falls past an appropriate surface. If a creature falls against a solid object (such as a ceiling), it takes the appropriate amount of falling damage and lands on the surface. Once an object or creature reaches the top of the area, it floats, caught between the normal and reversed gravity. The creature can move along the plane where the two forms of gravity meet. Creatures that can levitate or fly can use those abilities to mitigate the effects of reverse gravity.
    
    When reverse gravity ends, all creatures and objects caught in the area fall back down. Likewise, anything that moves beyond the spell's area is subjected to normal gravity again.`,
                    heightenDesc: ``,
            };
        case "light":
            return {
                name: "Light",
                    traits: "Environmental, Sustrain",
                    power: 1,
                    branch: "firefundamental",
                    family: "Conjure Light",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.
    
    If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.`,
                    heightenDesc: ``,
            };
        case "dancing lights":
            return {
                name: "Dancing Lights",
                    traits: "Environmental, Sustrain",
                    power: 1,
                    branch: "light",
                    family: "Conjure Light",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. Each light sheds bright light in a 10-foot radius and dim light for an additional 20 feet.
    
    As an action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 50 feet of another light created by this spell, and a light winks out if it exceeds the spell’s range.`,
                    heightenDesc: ``,
            };
        case "dancing darkness":
            return {
                name: "Dancing Darkness",
                    traits: "Environmental, Sustrain",
                    power: 1,
                    branch: "shadow",
                    family: "Conjure Light",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to four torch-sized spheres of darkness within range. Each sphere lightly obscures its area in a 10-foot radius.
    
    As an action on your turn, you can move the spheres up to 60 feet to a new spot within range. A sphere must be within 50 feet of another sphere created by this spell, and a sphere winks out if it exceeds the spell’s range.`,
                    heightenDesc: ``,
            };
        case "burning light":
            return {
                name: "Burning Light",
                    traits: "Environmental, Onset, Ravage, Sustain",
                    power: 2,
                    branch: "light",
                    family: "Conjure Light",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "5-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "2d10",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A beam of bright, burning light shines down into an area, dealing 2d10 burn (Fire) damage.`,
                    heightenDesc: `Damage increases by 2d10 per level.`,
            };
        case "darkness":
            return {
                name: "Darkness",
                    traits: "Environmental, Sustrain",
                    power: 2,
                    branch: "shadow",
                    family: "Conjure Light",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "15-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Magical darkness spreads around a point you designate. The darkness spreads around corners. Nonmagical light can’t illuminate it.
    
    If the point you choose is on an object you are holding or one that isn’t being worn or carried, the darkness emanates from the object and moves with it. Completely covering the source of the darkness with an opaque object, such as a bowl or a helm, blocks the darkness.
    
    If any of this spell’s area overlaps with an area of light created by a spell of power 2 or lower, the spell that created the light is dispelled.`,
                    heightenDesc: ``,
            };
        case "deeper darkness":
            return {
                name: "Deeper Darkness",
                    traits: "Environmental, Sustrain",
                    power: 3,
                    branch: "shadow",
                    family: "Conjure Light",
                    element: "Earth",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "60 feet",
                    area: "30-foot-radius sphere",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Magical darkness spreads around a point you designate. The darkness spreads around corners. Nonmagical light can’t illuminate it. Creatures with darkvision cannot see within the spell's confines.
    
    If the point you choose is on an object you are holding or one that isn’t being worn or carried, the darkness emanates from the object and moves with it. Completely covering the source of the darkness with an opaque object, such as a bowl or a helm, blocks the darkness.
    
    If any of this spell’s area overlaps with an area of light created by a spell of power 3 or lower, the spell that created the light is dispelled.`,
                    heightenDesc: ``,
            };
        case "dawn":
            return {
                name: "Dawn",
                    traits: "Environmental, Onset, Ravage, Sustain",
                    power: 4,
                    branch: "light",
                    family: "Conjure Light",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "60 feet",
                    area: "30-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "6d10",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "4d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `The light of dawn shines down at your command. This effect deals 6d10 burn (Fire) damage. Creatures are blinded while in the area of the spell.`,
                    heightenDesc: `Damage increases by 3d10 per level.`,
            };
        case "entangle":
            return {
                name: "Entangle",
                    traits: "Environmental, Onset",
                    power: 1,
                    branch: "plantation",
                    family: "Conjure Terrain",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "90 feet",
                    area: "20 foot square area",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is restrained for 1 round. The creature may use the Break Free or Escape Artist action against the spellcasting DC to escape.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Restrained@e:Ends after 1 round. The creature may use the Break Free or Escape Artist action against {DC} to escape]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell creates various vines that reach and grab at those that enter their area. The area is considered difficult terrain. `,
                    heightenDesc: ``,
            };
        case "seism":
            return {
                name: "Seism",
                    traits: "Environmental, Onset, Ravage",
                    power: 2,
                    branch: "tremor",
                    family: "Conjure Terrain",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "10-foot radius area",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "3d6",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The creature is knocked prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause a tremor in the ground that deals 4d6 force (Earth) damage. If the ground in that area is loose earth or stone, it becomes difficult terrain until cleared.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "ice floor":
            return {
                name: "Ice Floor",
                    traits: "Environmental",
                    power: 2,
                    branch: "ice",
                    family: "Conjure Terrain",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "90 feet",
                    area: "15 foot radius area",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The creature falls prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell creates a sheet of ice on the ground. The area is considered difficult terrain. Whenever a creature begins a move action or moves onto this surface they must make a save.`,
                    heightenDesc: ``,
            };
        case "eruption":
            return {
                name: "Eruption",
                    traits: "Environmental, Onset, Ravage",
                    power: 4,
                    branch: "tremor",
                    family: "Conjure Terrain",
                    element: "Earth",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "120 feet",
                    area: "20 foot square area",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "6d12",
                    dmgType: "Burn",
                    dmgElem: "Earth",
                    hldmg: "3d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A fountain of lava and stone erupts in the area, dealing 6d12 burn (Earth) damage. The area is considered difficult terrain.`,
                    heightenDesc: `Damage increases by 3d12 per level.`,
            };
        case "twister":
            return {
                name: "Twister",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 3,
                    branch: "wind",
                    family: "Conjure Vortex",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "300 feet",
                    area: "5 foot radius and 30 feet high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "2d6",
                    dmgType: "Force",
                    dmgElem: "Wood",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is caught in the vortex and restrained for 1 round. ",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a whirlwind that sucks in those nearby and deals 2d6 force (Wood) damage. When a creature starts its turn while caught in the vortex, the creature is pulled 5 feet upwards and 5 feet towards the center of the whirlwind. When a creature escapes from the vortex, they are hurled 3d6 × 10 feet away from it in a random direction.`,
                    heightenDesc: ``,
            };
        case "quicksand":
            return {
                name: "Quicksand",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 3,
                    branch: "sand",
                    family: "Conjure Vortex",
                    element: "Earth",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "90 feet",
                    area: "20 foot radius and 20 feet deep cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "4d6",
                    dmgType: "Rending",
                    dmgElem: "Earth",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is caught in the vortex and restrained for 1 round. ",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `The target area requires a body of sand at least 40 feet square and 20 feet deep. You cause sand to become heavy and force those within to sink, dealing 4d6 rending (Earth) damage. When a creature starts its turn while caught in the vortex, the creature is pulled 5 feet downwards and risks suffocation by the sand.`,
                    heightenDesc: ``,
            };
        case "whirlpool":
            return {
                name: "Whirlpool",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 3,
                    branch: "fluid",
                    family: "Conjure Vortex",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "150 feet",
                    area: "25 foot radius and 25 feet deep cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "2d8",
                    dmgType: "Force",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is caught in the vortex and restrained for 1 round. ",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This effect requires a body of water at least 50 feet square and 25 feet deep. You create a vortex of water, drawing in objects and creatures nearby and dealing 2d8 force (Water) damage. When a creature starts its turn while caught in the vortex, the creature is pulled 10 feet pull towards its centre and risks suffocation by the water.`,
                    heightenDesc: ``,
            };
        case "flame whirl":
            return {
                name: "Flame Whirl",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 4,
                    branch: "flame",
                    family: "Conjure Vortex",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "300 feet",
                    area: "5 foot radius and 30 feet high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "4d6",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is caught in the vortex and restrained for 1 round. ",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a whirling pilar of flame that deals 4d6 burn (Fire) damage. When a creature starts its turn while caught in the vortex, the creature is pulled 5 feet upwards and 5 feet towards the center of the whirlwind. When a creature escapes from the vortex, they are hurled 3d6 × 10 feet away from it in a random direction.`,
                    heightenDesc: ``,
            };
        case "tornado":
            return {
                name: "Tornado",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 5,
                    branch: "wind",
                    family: "Conjure Vortex",
                    element: "Wood",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "300 feet",
                    area: "10 foot radius and 30 feet high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "6d6",
                    dmgType: "Force",
                    dmgElem: "Wood",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A whirlwind howls down to a point on the ground and deals 6d6 force (Wood) damage. When a creature starts its turn while caught in the vortex, the creature is pulled 5 feet upwards and 5 feet towards the center of the whirlwind. A creature caught in a vortex moves with the vortex. When a creature escapes from the vortex, they are hurled 3d6 × 10 feet away from it in a random direction.
    
    Until the spell ends, you can use your action to move the vortex up to 30 feet in any direction along the ground. The vortex sucks up any Medium or smaller objects that aren’t secured to anything and that aren’t worn or carried by anyone.`,
                    heightenDesc: ``,
            };
        case "flame cyclone":
            return {
                name: "Flame Cyclone",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 5,
                    branch: "flame",
                    family: "Conjure Vortex",
                    element: "Fire",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "300 feet",
                    area: "15 foot radius and 30 feet high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "8d6",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You spin fire into a vortex that deals 8d6 burn (Fire) damage. When a creature starts its turn while caught in the vortex, the creature is pulled 5 feet upwards and 5 feet towards the center of the whirlwind. A creature caught in a vortex moves with the vortex. When a creature escapes from the vortex, they are hurled 3d6 × 10 feet away from it in a random direction.
    
    Until the spell ends, you can use your action to move the vortex up to 30 feet in any direction along the ground. The vortex sucks up any Medium or smaller objects that aren’t secured to anything and that aren’t worn or carried by anyone.`,
                    heightenDesc: ``,
            };
        case "antlion pit":
            return {
                name: "Antlion Pit",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 5,
                    branch: "sand",
                    family: "Conjure Vortex",
                    element: "Earth",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "90 feet",
                    area: "10 foot radius and 20 feet deep cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "6d6",
                    dmgType: "Rending",
                    dmgElem: "Earth",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A swirling sand vortex forms that deals 6d8 rending (Earth) damage. If the vortex is formed in sand its radius increases to 25 feet. When a creature starts its turn while caught in the vortex, the creature is pulled 5 feet downward, and 5 feet towards the centre of the vortex and risks suffocation. 
    
    Until the spell ends, you can use your action to move the vortex up to 30 feet in any direction along the ground. The vortex sucks up any Medium or smaller objects that aren’t secured to anything and that aren’t worn or carried by anyone.
    
    The pit is considered difficult terrain for those within and the area is considered lightly obscured.`,
                    heightenDesc: ``,
            };
        case "maelstrom":
            return {
                name: "Maelstrom",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 5,
                    branch: "fluid",
                    family: "Conjure Vortex",
                    element: "Water",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "150 feet",
                    area: "10 foot radius and 25 feet deep cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "5d8",
                    dmgType: "Force",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A storm of water swirls and rages at a point you choose that deals 5d8 force (Water) damage. If the vortex is formed in water its radius increases to 25 feet. When a creature starts its turn while caught in the vortex, the creature is pulled 5 feet upward, and 5 feet towards the centre of the vortex and risks suffocation. 
    
    Until the spell ends, you can use your action to move the vortex up to 30 feet in any direction along the ground. The vortex sucks up any Medium or smaller objects that aren’t secured to anything and that aren’t worn or carried by anyone.`,
                    heightenDesc: ``,
            };
        case "blizzard":
            return {
                name: "Blizzard",
                    traits: "Environmental, Onset, Ravage, Sustain, Vortex",
                    power: 5,
                    branch: "storm",
                    family: "Conjure Vortex",
                    element: "Water",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "150 feet",
                    area: "20 foot radius and 45 feet high cylinder",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "8d6",
                    dmgType: "Cold",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A storm of powerful snow and ice forms and deals 8d6 cold (Water) damage. When a creature starts its turn while caught in the vortex, the creature is pulled 5 feet towards the centre of the vortex.
    
    Until the spell ends, you can use your action to move the vortex up to 30 feet in any direction along the ground. The vortex sucks up any Medium or smaller objects that aren’t secured to anything and that aren’t worn or carried by anyone.`,
                    heightenDesc: ``,
            };
        case "nubikinesis":
            return {
                name: "Nubikinesis",
                    traits: "",
                    power: 1,
                    branch: "nimbus",
                    family: "Control",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You may move clouds and mist with a simple push. You may choose to target any part of a cloud in a 20 foot square and move it up to 20 feet into another space. The space must be able to contain the cloud or be part of the same cloud. `,
                    heightenDesc: ``,
            };
        case "force hand":
            return {
                name: "Force Hand",
                    traits: "",
                    power: 1,
                    branch: "force",
                    family: "Control",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can use your action to extend your reach. You can manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial from 30 feet away. You can move anything up to 30 feet away from its starting position with this spell.
    
    You can’t attack, activate magic items, or carry more than 10 pounds of a material.`,
                    heightenDesc: ``,
            };
        case "catapult":
            return {
                name: "Catapult",
                    traits: "",
                    power: 1,
                    branch: "force",
                    family: "Control",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d8",
                    dmgType: "Force",
                    dmgElem: "Metal",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Choose one object weighing 1 to 5 pounds within range that isn’t being worn or carried. The object flies in a straight line up to 90 feet in a direction you choose before falling to the ground, stopping early if it impacts against a solid surface. If the object would strike a creature, that creature must make a Dexterity saving throw. On a failed save, the object strikes the target and stops moving. When the object strikes something, the object and what it strikes each take 3d8 force (Metal) damage.`,
                    heightenDesc: `The maximum weight of objects that you can target with this spell increases by 5 pounds and the damage increases by 2d8, for each level of power.`,
            };
        case "floating disk":
            return {
                name: "Floating Disk",
                    traits: "",
                    power: 1,
                    branch: "force",
                    family: "Control",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration, and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground.
    
    The disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can move across uneven terrain, up or down stairs, slopes and the like, but it can’t cross an elevation change of 10 feet or more. For example, the disk can’t move across a 10-foot-deep pit, nor could it leave such a pit if it was created at the bottom.
    
    If you move more than 100 feet from the disk (typically because it can’t move around an obstacle to follow you), the spell ends.`,
                    heightenDesc: ``,
            };
        case "gust of wind":
            return {
                name: "Gust of Wind",
                    traits: "Onset, Sustain",
                    power: 2,
                    branch: "wind",
                    family: "Control",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "60 feet long, 10 feet wide, and 10 feet high line",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target is pushed 40 feet from the source.",
                    success: "The target is pushed 30 feet from the source.",
                    failure: "The target is pushed 10 feet from the source",
                    critFailure: "The target is not pushed.",

                    onCritSuccess: "[Pushed@d:40 feet from source]",
                    onSuccess: "[Pushed@d:30 feet from source]",
                    onFailure: "[Pushed@d:10 feet from source]",
                    onCritFailure: "[]",

                    desc: `A powerful wind pushes away from you in one direction. The gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them. Movement while within the area of force is difficult terrain.
    
    As an action on each of your turns before the spell ends, you can change the direction in which the line blasts from you.`,
                    heightenDesc: ``,
            };
        case "part sand":
            return {
                name: "Part Sand",
                    traits: "Environmental, Sustain",
                    power: 2,
                    branch: "sand",
                    family: "Control",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause sand to shift out of your way in a 100-feet-by-10-feet line up to 50 feet deep at a point within range to move apart and create a trench. The trench extends across the spell’s area, and the separated sand forms a wall to either side. The trench remains until the spell ends. The element then slowly fills in the trench over the course of the next round until the normal level is restored.`,
                    heightenDesc: ``,
            };
        case "sand tunnel":
            return {
                name: "Sand Tunnel",
                    traits: "Onset, Sustain",
                    power: 2,
                    branch: "sand",
                    family: "Control",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "60 feet long, 20 feet wide, and 30 feet high line",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target is pushed 30 feet from the source and restrained. The creature can make a Strength saving throw at the end of their turn to break from the restrained condition.",
                    success: "The target is pushed 10 feet from the source and restrained. The creature can make a Strength saving throw at the end of their turn to break from the restrained condition.",
                    failure: "The target is pushed 10 feet from the source",
                    critFailure: "The target is not pushed.",

                    onCritSuccess: "[Pushed@d:30 feet from source][Restrained@e:Ends after 1 minute. The creature may make a {DC} Strength Save at the end of their turn to remove the effect.]",
                    onSuccess: "[Pushed@d:10 feet from source][Restrained@e:Ends after 1 minute. The creature may make a {DC} Strength Save at the end of their turn to remove the effect.]",
                    onFailure: "[Pushed@d:10 feet from source]",
                    onCritFailure: "[]",

                    desc: `A large wave of sand engulfs a large area away from you in one direction. The sand smothers flames and buries those it rolls over.
    
    As an action on each of your turns before the spell ends, you can change the direction in which the line blasts from you.`,
                    heightenDesc: ``,
            };
        case "part water":
            return {
                name: "Part Water",
                    traits: "Environmental, Sustain",
                    power: 2,
                    branch: "fluid",
                    family: "Control",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause water to shift out of your way in a 100-feet-by-10-feet line up to 50 feet deep at a point within range to move apart and create a trench. The trench extends across the spell’s area, and the separated water forms a wall to either side. The trench remains until the spell ends. The element then slowly fills in the trench over the course of the next round until the normal level is restored.`,
                    heightenDesc: ``,
            };
        case "tidal surge":
            return {
                name: "Tidal Surge",
                    traits: "Onset, Sustain",
                    power: 2,
                    branch: "fluid",
                    family: "Control",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "60 feet long, 20 feet wide, and 10 feet high line",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target is pushed 40 feet from the source.",
                    success: "The target is pushed 30 feet from the source.",
                    failure: "The target is pushed 10 feet from the source",
                    critFailure: "The target is not pushed.",

                    onCritSuccess: "[Pushed@d:40 feet from source]",
                    onSuccess: "[Pushed@d:30 feet from source]",
                    onFailure: "[Pushed@d:10 feet from source]",
                    onCritFailure: "[]",

                    desc: `Call forth a continuous blast of water before the caster that pushes forwards knocking back all in its way. The waver douses flames and makes the area difficult terrain due to the slipperiness of the water.
    
    As an action on each of your turns before the spell ends, you can change the direction in which the line blasts from you.`,
                    heightenDesc: ``,
            };
        case "storm gust":
            return {
                name: "Storm Gust",
                    traits: "Onset, Ravage, Sustain",
                    power: 2,
                    branch: "storm",
                    family: "Control",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "60 feet long, 20 feet wide, and 10 feet high line",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "2d8",
                    dmgType: "Cold",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target is pushed 30 feet from the source.",
                    success: "The target is pushed 25 feet from the source.",
                    failure: "The target is pushed 10 feet from the source",
                    critFailure: "The target is not pushed.",

                    onCritSuccess: "[Pushed@d:40 feet from source]",
                    onSuccess: "[Pushed@d:30 feet from source]",
                    onFailure: "[Pushed@d:10 feet from source]",
                    onCritFailure: "[]",

                    desc: `A chilling wind pushes away from you in one direction. The wind deals 2d8 cold (Water) damage in its area. The gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them. Movement while within the area of force is difficult terrain.
    
    As an action on each of your turns before the spell ends, you can change the direction in which the line blasts from you.`,
                    heightenDesc: ``,
            };
        case "kinetic haul":
            return {
                name: "Kinetic Haul",
                    traits: "Sustain",
                    power: 3,
                    branch: "force",
                    family: "Control",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "120 feet",
                    area: "",
                    targets: "One unattended object of up to 1000 lbs. with no dimension longer than 20 feet.",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You move the target up to 20 feet, potentially suspending it in midair. When you Sustain the Spell, you can do so again, or you can choose a different eligible target to move.`,
                    heightenDesc: ``,
            };
        case "create forge duplicate":
            return {
                name: "Create Forge Duplicate",
                    traits: "",
                    power: 4,
                    branch: "reflection",
                    family: "Create Duplicate",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch an object created through a Structure spell that is made of metal-aspected material. This object can fill no larger space than 10 square feet.
    
    An identical but weaker version of the object is created within 5 feet of the caster. The object's materials have -2 AC and half the DT of the original material (minimum 1).`,
                    heightenDesc: `The space the object can fill increase by 10 square feet per level.`,
            };
        case "create glass duplicate":
            return {
                name: "Create Glass Duplicate",
                    traits: "",
                    power: 4,
                    branch: "reflection",
                    family: "Create Duplicate",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch an object created through a Structure spell that is made of fire-aspected material. This object can fill no larger space than 10 square feet.
    
    An identical but weaker version of the object is created within 5 feet of the caster. The object's materials have -2 AC and half the DT of the original material (minimum 1).`,
                    heightenDesc: `The space the object can fill increase by 10 square feet per level.`,
            };
        case "create ice duplicate":
            return {
                name: "Create Ice Duplicate",
                    traits: "",
                    power: 4,
                    branch: "reflection",
                    family: "Create Duplicate",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch an object created through a Structure spell that is made of water-aspected material. This object can fill no larger space than 10 square feet.
    
    An identical but weaker version of the object is created within 5 feet of the caster. The object's materials have -2 AC and half the DT of the original material (minimum 1).`,
                    heightenDesc: `The space the object can fill increase by 10 square feet per level.`,
            };
        case "create plant duplicate":
            return {
                name: "Create Plant Duplicate",
                    traits: "",
                    power: 4,
                    branch: "reflection",
                    family: "Create Duplicate",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch an object created through a Structure spell that is made of wood-aspected material. This object can fill no larger space than 10 square feet.
    
    An identical but weaker version of the object is created within 5 feet of the caster. The object's materials have -2 AC and half the DT of the original material (minimum 1).`,
                    heightenDesc: `The space the object can fill increase by 10 square feet per level.`,
            };
        case "create rock duplicate":
            return {
                name: "Create Rock Duplicate",
                    traits: "",
                    power: 4,
                    branch: "reflection",
                    family: "Create Duplicate",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch an object created through a Structure spell that is made of rock-aspected material. This object can fill no larger space than 10 square feet.
    
    An identical but weaker version of the object is created within 5 feet of the caster. The object's materials have -2 AC and half the DT of the original material (minimum 1).`,
                    heightenDesc: `The space the object can fill increase by 10 square feet per level.`,
            };
        case "quickcraft: wood":
            return {
                name: "Quickcraft: Wood",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "plantation",
                    family: "Create Items",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 10 motes of ethereal maple. You may use this glass to craft an object component and immediately make 100 points of progress. This is all done with the casting of this spell.
    
    If you cast this spell again, any material you made with previous castings are immediately destroyed.`,
                    heightenDesc: `This spell can instead create mapla at power 2 and ironwood at power 3.`,
            };
        case "quickcraft: glass":
            return {
                name: "Quickcraft: Glass",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "glass",
                    family: "Create Items",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 10 motes of ethereal glass. You may use this glass to craft an object component and immediately make 100 points of progress. This is all done with the casting of this spell.
    
    If you cast this spell again, any material you made with previous castings are immediately destroyed.`,
                    heightenDesc: `This spell can instead create tempered glass at power 2 and fireglass at power 3.`,
            };
        case "quickcraft: earth":
            return {
                name: "Quickcraft: Earth",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "rock",
                    family: "Create Items",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 10 motes of ethereal granite. You may use this glass to craft an object component and immediately make 100 points of progress. This is all done with the casting of this spell.
    
    If you cast this spell again, any material you made with previous castings are immediately destroyed.`,
                    heightenDesc: `This spell can instead create crystal at power 2 and crystala at power 3.`,
            };
        case "quickcraft: metal":
            return {
                name: "Quickcraft: Metal",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "forge",
                    family: "Create Items",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 5 motes of ethereal iron. You may use this glass to craft an object component and immediately make 100 points of progress. This is all done with the casting of this spell.
    
    If you cast this spell again, any material you made with previous castings are immediately destroyed.`,
                    heightenDesc: `This spell can instead create steel at power 2 and steela at power 3.`,
            };
        case "quickcraft: ice":
            return {
                name: "Quickcraft: Ice",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "ice",
                    family: "Create Items",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 5 motes of ethereal ice. You may use this glass to craft an object component and immediately make 100 points of progress. This is all done with the casting of this spell.
    
    If you cast this spell again, any material you made with previous castings are immediately destroyed.`,
                    heightenDesc: `This spell can instead create icea at power 2 and glaceum at power 3.`,
            };
        case "create pine":
            return {
                name: "Create Pine",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "woodfundamental",
                    family: "Create Material",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 30 motes of ethereal pine dust.`,
                    heightenDesc: ``,
            };
        case "create cloth":
            return {
                name: "Create Cloth",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "plantation",
                    family: "Create Material",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 30 motes of ethereal cloth or hemp dust.`,
                    heightenDesc: `Motes created increase by 20 per level.`,
            };
        case "create maple":
            return {
                name: "Create Maple",
                    traits: "Boundary, Structure, Sustain",
                    power: 1,
                    branch: "plantation",
                    family: "Create Material",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 60 motes of ethereal maple dust that you can use to create a wall.. The wall is 1 inch thick and is composed of six 5-foot-by-5-foot panels.
    
    Each panel has an AC of 11, a damage threshold of 5, and 1 HB.`,
                    heightenDesc: `Motes created increase by 30 and the number of wall panels increase by 4 per level. Optionally, you may instead create mapla, a magically reinforced maple material. 
    
    Each mapla panel has an AC of 13, a damage threshold of 12, and 1 HB.`,
            };
        case "create clay":
            return {
                name: "Create Clay",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "firefundamental",
                    family: "Create Material",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 30 motes of ethereal clearth or kaolin dust.`,
                    heightenDesc: `Motes created increase by 20 per level.`,
            };
        case "create glass":
            return {
                name: "Create Glass",
                    traits: "Boundary, Structure, Sustain",
                    power: 1,
                    branch: "glass",
                    family: "Create Material",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 60 motes of ethereal glass dust that you can use to create a wall. The wall is 2 inches thick and is composed of five 5-foot-by-5-foot panels.
    
    Each panel has an AC of 10, a damage threshold of 5, and 2 HB.`,
                    heightenDesc: `Motes created increase by 20 and the number of wall panels increase by 4 per level. Optionally, you may instead create tempered, a magically reinforced glass material. 
    
    Each mapla panel has an AC of 12, a damage threshold of 10, and 1 HB.`,
            };
        case "create stone":
            return {
                name: "Create Stone",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "earthfundamental",
                    family: "Create Material",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 30 motes of ethereal granite dust.`,
                    heightenDesc: `Motes created increase by 20 per level.`,
            };
        case "create crystal":
            return {
                name: "Create Crystal",
                    traits: "Boundary, Structure, Sustain",
                    power: 1,
                    branch: "rock",
                    family: "Create Material",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 60 motes of ethereal glass dust that you can use to create a wall. The wall is 1 inch thick and is composed of three 5-foot-by-5-foot panels.
    
    Each panel has an AC of 14, a damage threshold of 14, and 2 HB.`,
                    heightenDesc: `Motes created increase by 30 and the number of wall panels increase by 2 per level. Optionally, you may instead create crystala, a magically reinforced crystal material. 
    
    Each crystala panel has an AC of 15, a damage threshold of 16, and 2 HB.`,
            };
        case "create iron":
            return {
                name: "Create Iron",
                    traits: "Boundary, Structure, Sustain",
                    power: 1,
                    branch: "metalfundamental",
                    family: "Create Material",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 20 motes of ethereal iron dust that you can use to create a wall. The wall is 1 inch thick and is composed of three 5-foot-by-5-foot panels.
    
    Each panel has an AC of 15, a damage threshold of 13, and 1 HB.`,
                    heightenDesc: `Motes created increase by 20 and the number of wall panels increase by 2 per level.`,
            };
        case "create steel":
            return {
                name: "Create Steel",
                    traits: "Boundary, Structure, Sustain",
                    power: 1,
                    branch: "forge",
                    family: "Create Material",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 20 motes of ethereal steel dust that you can use to create a wall. The wall is 1 inch thick and is composed of two 5-foot-by-5-foot panels.
    
    Each panel has an AC of 16, a damage threshold of 16, and 2 HB.`,
                    heightenDesc: `Motes created increase by 20 and the number of wall panels increase by 2 per level. Optionally, you may instead create steela, a magically reinforced steel material. 
    
    Each steela panel has an AC of 17, a damage threshold of 17, and 2 HB.`,
            };
        case "create snow":
            return {
                name: "Create Snow",
                    traits: "Structure, Sustain",
                    power: 1,
                    branch: "waterfundamental",
                    family: "Create Material",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 50 motes of ethereal snow.`,
                    heightenDesc: `Motes created increase by 50 per level.`,
            };
        case "create ice":
            return {
                name: "Create Ice",
                    traits: "Boundary, Structure, Sustain",
                    power: 1,
                    branch: "ice",
                    family: "Create Material",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 30 motes of ethereal steel dust that you can use to create a wall. The wall is 1 inch thick and is composed of five 5-foot-by-5-foot panels. 
    
    Each panel has an AC of 12, a damage threshold of 10, and 1 HB.`,
                    heightenDesc: `Motes created increase by 20 and the number of wall panels increase by 3 per level. Optionally, you may instead create icea, a magically reinforced ice material. 
    
    Each icea panel has an AC of 14, a damage threshold of 13, and 1 HB.`,
            };
        case "create ironwood":
            return {
                name: "Create Ironwood",
                    traits: "Boundary, Structure, Sustain",
                    power: 2,
                    branch: "plantation",
                    family: "Create Material",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 90 motes of ethereal ironwood dust that you can use to create a wall. The wall is 1 inch thick and is composed of ten 5-foot-by-5-foot panels. 
    
    Each panel has an AC of 15, a damage threshold of 16, and 2 HB.`,
                    heightenDesc: `Motes created increase by 30 and the number of wall panels increase by 3 per level. Optionally, you may instead create ironoak, a magically reinforced ironwood material. 
    
    Each ironoak panel has an AC of 16, a damage threshold of 20, and 2 HB.`,
            };
        case "create glacial":
            return {
                name: "Create Glacial",
                    traits: "Boundary, Structure, Sustain",
                    power: 2,
                    branch: "ice",
                    family: "Create Material",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 50 motes of ethereal glaceum dust that you can use to create a wall. The wall is 2 inches thick and is composed of five 5-foot-by-5-foot panels. 
    
    Each panel has an AC of 15, a damage threshold of 16, and 4 HB.`,
                    heightenDesc: `Motes created increase by 30 and the number of wall panels increase by 2 per level. Optionally, you may instead create glacerulum, a magically reinforced glaceum material. 
    
    Each glacerulum panel has an AC of 15, a damage threshold of 16, and 2 HB.`,
            };
        case "create fireglass":
            return {
                name: "Create Fireglass",
                    traits: "Boundary, Structure, Sustain",
                    power: 3,
                    branch: "glass",
                    family: "Create Material",
                    element: "Fire",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 60 motes of ethereal fireglass dust that you can use to create a wall. The wall is 2 inches thick and is composed of five 5-foot-by-5-foot panels.
    
    Each panel has an AC of 13, a damage threshold of 12, and 2 HB.`,
                    heightenDesc: `Motes created increase by 30 and the number of wall panels increase by 2 per level. Optionally, you may instead create rubrumium, a magically reinforced fireglass material. 
    
    Each rubrumium panel has an AC of 16, a damage threshold of 28, and 4 HB.`,
            };
        case "create adamantine":
            return {
                name: "Create Adamantine",
                    traits: "Boundary, Structure, Sustain",
                    power: 4,
                    branch: "glass",
                    family: "Create Material",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 50 motes of ethereal adamantine dust that you can use to create a wall. The wall is 1 inch thick and is composed of five 5-foot-by-5-foot panels.
    
    Each panel has an AC of 17, a damage threshold of 22, and 2 HB.`,
                    heightenDesc: `Motes created increase by 30 and the number of wall panels increase by 2 per level.`,
            };
        case "create platinum":
            return {
                name: "Create Platinum",
                    traits: "Boundary, Structure, Sustain",
                    power: 4,
                    branch: "forge",
                    family: "Create Material",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 50 motes of ethereal platinum dust that you can use to create a wall. The wall is 2 inches thick and is composed of four 5-foot-by-5-foot panels.
    
    Each panel has an AC of 18, a damage threshold of 30, and 4 HB.`,
                    heightenDesc: `Motes created increase by 20 and the number of wall panels increase by 2 per level.`,
            };
        case "create viridium":
            return {
                name: "Create Viridium",
                    traits: "Boundary, Structure, Sustain",
                    power: 5,
                    branch: "corrosion",
                    family: "Create Material",
                    element: "Wood",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 90 motes of ethereal fireglass dust that you can use to create a wall. The wall is 2 inches thick and is composed of seven 5-foot-by-5-foot panels.
    
    Each panel has an AC of 16, a damage threshold of 28, and 4 HB.`,
                    heightenDesc: `Motes created increase by 30 and the number of wall panels increase by 3 per level.`,
            };
        case "create obsidian":
            return {
                name: "Create Obsidian",
                    traits: "Boundary, Structure, Sustain",
                    power: 5,
                    branch: "rock",
                    family: "Create Material",
                    element: "Earth",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 50 motes of ethereal obsidian dust that you can use to create a wall. The wall is 3 inches thick and is composed of two 5-foot-by-5-foot panels.
    
    Each panel has an AC of 21, a damage threshold of 45, and 9 HB.`,
                    heightenDesc: `Motes created increase by 20 and the number of wall panels increase by 1 per level. Optionally, you may instead create white obsidian, a magically reinforced obsidian material. 
    
    Each white obsidian panel has an AC of 21, a damage threshold of 45, and 8 HB.`,
            };
        case "create mithral":
            return {
                name: "Create Mithral",
                    traits: "Structure, Sustain",
                    power: 5,
                    branch: "forge",
                    family: "Create Material",
                    element: "Metal",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 60 motes of ethereal mithral dust.`,
                    heightenDesc: `Motes created increase by 30 per level.`,
            };
        case "create albryst":
            return {
                name: "Create Albryst",
                    traits: "Boundary, Structure, Sustain",
                    power: 5,
                    branch: "ice",
                    family: "Create Material",
                    element: "Water",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "50 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create up to 50 motes of ethereal albryst dust that you can use to create a wall. The wall is 2 inches thick and is composed of four 5-foot-by-5-foot panels.
    
    Each panel has an AC of 19, a damage threshold of 38, and 6 HB.`,
                    heightenDesc: `Motes created increase by 30 per level.`,
            };
        case "stalagmite":
            return {
                name: "Stalagmite",
                    traits: "Platform, Structure, Sustain",
                    power: 2,
                    branch: "rock",
                    family: "Create Pillars",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "5d8",
                    dmgType: "Stab",
                    dmgElem: "Earth",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A pillar of granite erupts from the earth. The stalagmite fits inside of a 5 ft. square and grows to 15 ft in height. Creatures under the stalagmite when it is created may save or take 5d8 Stab (Earth) damage and raise to the top of the stalagmite.`,
                    heightenDesc: ``,
            };
        case "pine spear":
            return {
                name: "Pine Spear",
                    traits: "Platform, Structure, Sustain",
                    power: 3,
                    branch: "plantation",
                    family: "Create Pillars",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "200 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "8d6",
                    dmgType: "Stab",
                    dmgElem: "Wood",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A spear of pine wood sprout from the earth and pierces into the sky. The spear is a 10 ft. cylinder and grows to 30 ft in height. Creatures under the spear when it is created may save or take 8d6 Stab (Wood) damage and raise to the top of the spear.`,
                    heightenDesc: ``,
            };
        case "wildwood":
            return {
                name: "Wildwood",
                    traits: "Platform, Structure, Sustain",
                    power: 4,
                    branch: "plantation",
                    family: "Create Pillars",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "200 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Ten pine trees sprout from the earth and grow into a lush forest. Each tree is a 5 foot cylinder in diameter with a height of up to 30 feet. Creatures under a tree when it is created may save or take 6d6 stab (Wood) damage and raise to the top of the tree.`,
                    heightenDesc: ``,
            };
        case "glacier":
            return {
                name: "Glacier",
                    traits: "Platform, Structure, Sustain",
                    power: 4,
                    branch: "ice",
                    family: "Create Pillars",
                    element: "Water",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "6d6",
                    dmgType: "Stab",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "6d6",
                    dmg2Type: "Cold",
                    dmg2Elem: "Water",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A glacier of pure ice erupts from the earth and pierces into the sky. The glacier is a 10 ft. cylinder and grows to 30 ft in height. Creatures under the glacier when it is created may save or take 6d6 Stab (Water) damage and 6d6 Cold (Water) damage and raise to the top of the glacier.`,
                    heightenDesc: ``,
            };
        case "wood shield":
            return {
                name: "Wood Shield",
                    traits: "",
                    power: 1,
                    branch: "plantation",
                    family: "Create Shield",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Until the start of your next turn",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a small buckler made of wood that springs up to block attacks. This counts as using the Raise a Shield action, giving you a +1 circumstance bonus to AC until the start of your next turn, but it doesn't require a hand to use.`,
                    heightenDesc: ``,
            };
        case "rock cover":
            return {
                name: "Rock Cover",
                    traits: "",
                    power: 1,
                    branch: "rock",
                    family: "Create Shield",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "R",
                    trigger: "",
                    mana: 100,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You raise the earth between you and the attack. You gain a +5 bonus to AC against the triggering attack.`,
                    heightenDesc: ``,
            };
        case "ice block":
            return {
                name: "Ice Block",
                    traits: "",
                    power: 1,
                    branch: "ice",
                    family: "Create Shield",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "R",
                    trigger: "",
                    mana: 100,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Until the start of your next turn",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You solidify the moisture in the air into ice to block the attack then linger around you. You gain a +3 bonus to AC which may make the attack miss.`,
                    heightenDesc: ``,
            };
        case "sicken":
            return {
                name: "Sicken",
                    traits: "Renitence",
                    power: 1,
                    branch: "toxin",
                    family: "Disable",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "120 feet",
                    area: "",
                    targets: "Up to two target creatures",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature takes a 1d4 penalty on all attack rolls and saving throws. The creature may make another Constitution Save at the end of their turn to remove the effect.",
                    success: "The target creature takes a -1 penalty on all attack rolls and saving throws. The creature may make another Constitution Save at the end of their turn to remove the effect.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Spec@d:Take a 1d4 penalty on all attack rolls and saving throws.@e:The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onSuccess: "[Spec@d:Take a -1 penalty on all attack rolls and saving throws.@e:The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You disease your targets with a sickening poison. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "restrain":
            return {
                name: "Restrain",
                    traits: "",
                    power: 1,
                    branch: "earthfundamental",
                    family: "Disable",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "60 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is restrained for 1 minute. The creature may make a Strength saving throw at the end of their turn to remove the effect.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Restrained@e:Ends after 1 minute. The creature may make a {DC} Strength Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You weigh gravity down on a creature to prevent them from moving. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "subdue":
            return {
                name: "Subdue",
                    traits: "Renitence, Sustain",
                    power: 1,
                    branch: "gravity",
                    family: "Disable",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "60 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is staggered (1) and slowed for 1 minute. The creature may make a Strength saving throw at the end of their turn to remove both effects.",
                    failure: "The target creature is staggered (1) until the end of their turn.",
                    critFailure: "No effect.",

                    onCritSuccess: "",
                    onSuccess: "[Staggered@d:Staggered 1@e: Ends after 1 minute. The creature may make a {DC} Strength Save at the end of their turn to remove the effect and the associated Slow effect.][Slowed@e:Ends with the staggered condition]",
                    onFailure: "[Staggered@d:Staggered 1@e: Ends at the start of their turn]",
                    onCritFailure: "[]",

                    desc: `One chosen target within range becomes more sluggish as gravity has a greater effect on them. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "trip":
            return {
                name: "Trip",
                    traits: "",
                    power: 1,
                    branch: "tremor",
                    family: "Disable",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "5 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a small tremor with the stomp of your feet. Choose one creture within range. That creature must make a Dexterity saving throw. On failure, the target is knocked prone.`,
                    heightenDesc: ``,
            };
        case "attenuate":
            return {
                name: "Attenuate",
                    traits: "",
                    power: 1,
                    branch: "blood",
                    family: "Disable",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "30 feet",
                    area: "",
                    targets: "Up to four target creatures",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature takes a 1d4 penalty on all attack rolls and saving throws. The creature may make another Constitution Save at the end of their turn to remove the effect.",
                    success: "The target creature takes a -1 penalty on all attack rolls and saving throws. The creature may make another Constitution Save at the end of their turn to remove the effect.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Spec@d:Take a 1d4 penalty on all attack rolls and saving throws.@e:The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onSuccess: "[Spec@d:Take a -1 penalty on all attack rolls and saving throws@e:The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You thin the target’s blood forcing the body to move more sluggish. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "flash":
            return {
                name: "Flash",
                    traits: "",
                    power: 2,
                    branch: "light",
                    family: "Disable",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "90 feet",
                    area: "15-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature is blinded for 1 minute.",
                    success: "The target creature is blinded for 1 minute. The creature may make a Constitution saving throw at the end of their turn to remove the effect.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Blinded@e:Ends after 1 minute.]",
                    onSuccess: "[Blinded@e:Ends after 1 minute. The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell creates a blinding flash of light. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "ashen veil":
            return {
                name: "Ashen Veil",
                    traits: "",
                    power: 2,
                    branch: "smoke",
                    family: "Disable",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "1d6",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Blinded@e:Ends after 1 minute. The creature may make a {DC} Constitution Save at the end of their turn to remove the effect. Ends after 1 minute][Spec@e:Take 1d6 burn (Fire) damage@e:Ends with the blind effect]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell causes a small cloud of searing, choking ash to appear around the face of the target.
    
    The creature must succeed at a Constitution saving throw or take 1d6 burn (Fire) damage and is blinded. The victim must make a new save against damage and blindness at the end of their turn for each round the spell persists.
    
    A moderate wind (11+ mph) disperses the ash cloud in 1 round.`,
                    heightenDesc: ``,
            };
        case "sandman":
            return {
                name: "Sandman",
                    traits: "",
                    power: 2,
                    branch: "sand",
                    family: "Disable",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "15-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature is blinded for 1 minute.",
                    success: "The target creature is blinded for 1 minute. The creature may make a Constitution saving throw at the end of their turn to remove the effect.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Blinded@e:Ends after 1 minute.]",
                    onSuccess: "[Blinded@e:Ends after 1 minute. The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell whips sand around trying to blind creatures within its area. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "earthbind":
            return {
                name: "Earthbind",
                    traits: "",
                    power: 2,
                    branch: "gravity",
                    family: "Disable",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 150,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature's flying speed (if any) is reduced to 0 feet for 1 minute.",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Spec@d:Fly speed is reduced to 0. @e:Ends after 1 hour]",
                    onSuccess: "[Spec@d:Fly speed is reduced to 0. @e:Ends after 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create forces to lock creatures to the ground. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "encumber":
            return {
                name: "Encumber",
                    traits: "Renitence, Sustain",
                    power: 2,
                    branch: "gravity",
                    family: "Disable",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature is staggered (2) and slowed for 1 minute. The creature may make a Strength saving throw at the end of their turn to remove both effects.",
                    success: "The target creature is staggered (1) and slowed for 1 minute. The creature may make a Strength saving throw at the end of their turn to remove both effects.",
                    failure: "The target creature is staggered (1) until the end of their turn.",
                    critFailure: "No effect.",

                    onCritSuccess: "[Staggered@d:Staggered 2@e: Ends after 1 minute. The creature may make a {DC} Strength Save at the end of their turn to remove the effect and the associated Slow effect.][Slowed@e:Ends with the staggered condition]",
                    onSuccess: "[Staggered@d:Staggered 1@e: Ends after 1 minute. The creature may make a {DC} Strength Save at the end of their turn to remove the effect and the associated Slow effect.][Slowed@e:Ends with the staggered condition]",
                    onFailure: "[Staggered@d:Staggered 1@e: Ends at the start of their turn]",
                    onCritFailure: "[]",

                    desc: `The target becomes more sluggish as gravity has a greater effect on the targets. The effect is determined by the target's save.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "clouded eyes":
            return {
                name: "Clouded Eyes",
                    traits: "Renitence",
                    power: 2,
                    branch: "shadow",
                    family: "Disable",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature is blinded for 1 hour.",
                    success: "The target creature is blinded for 1 minute.",
                    failure: "The target creature is blinded until the start of their turn",
                    critFailure: "No effect.",

                    onCritSuccess: "[Blinded@e: Ends after 1 hour]",
                    onSuccess: "[Blinded@e: Ends after 1 minute]",
                    onFailure: "[Blinded@e: Ends at the start of their turn]",
                    onCritFailure: "[]",

                    desc: `You point at a creature causing magical darkness to shroud their eyes. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "blindness":
            return {
                name: "Blindness",
                    traits: "Renitence",
                    power: 2,
                    branch: "blood",
                    family: "Disable",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature is blinded for 1 hour.",
                    success: "The target creature is blinded for 1 minute.",
                    failure: "The target creature is blinded until the start of their turn",
                    critFailure: "No effect.",

                    onCritSuccess: "[Blinded@e: Ends after 1 hour]",
                    onSuccess: "[Blinded@e: Ends after 1 minute]",
                    onFailure: "[Blinded@e: Ends at the start of their turn]",
                    onCritFailure: "[]",

                    desc: `You cut off blood to the eyes causing temporary blindness. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "freezebind":
            return {
                name: "Freezebind",
                    traits: "",
                    power: 2,
                    branch: "ice",
                    family: "Disable",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is restrained for 1 minute. The creature may make a Strength saving throw at the end of their turn to remove the effect.",
                    failure: "The target creature is restrained until the start of their turn.",
                    critFailure: "No effect.",

                    onCritSuccess: "",
                    onSuccess: "[Restrained@e:Ends after 1 minute. The creature may make a {DC} Strength Save at the end of their turn to remove the effect.]",
                    onFailure: "[Restrained@e: Ends at the start of their turn]",
                    onCritFailure: "[]",

                    desc: `You bind creatures to the ground or another sturdy surface by covering it in ice. The creature must be adjacent to a sturdy surface. The effect is determined by the target's save.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "lethargy":
            return {
                name: "Lethargy",
                    traits: "Renitence, Sustain",
                    power: 2,
                    branch: "time",
                    family: "Disable",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "",
                    targets: "Up to two target creatures",
                    targerCode: "Token",

                    check: "Wisdom",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature is staggered (1) and slowed for 1 minute. ",
                    success: "The target creature is staggered (1) and slowed for 3 rounds. ",
                    failure: "The target creature is staggered (1) until the end of their turn.",
                    critFailure: "No effect.",

                    onCritSuccess: "[Staggered@d:Staggered 1@e: Ends after 1 minute.][Slowed@e:Ends with the staggered condition]",
                    onSuccess: "[Staggered@d:Staggered 1@e: Ends after 3 rounds.][Slowed@e:Ends with the staggered condition]",
                    onFailure: "[Staggered@d:Staggered 1@e: Ends at the start of their turn]",
                    onCritFailure: "[]",

                    desc: `You alter the time of each target and how they perceive what is around them. The effect is determined by the target's save.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "sound boom":
            return {
                name: "Sound Boom",
                    traits: "",
                    power: 2,
                    branch: "sound",
                    family: "Disable",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "15-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target creature is deafened for 1 minute.",
                    success: "The target creature is deafened for 1 minute. The creature may make a Constitution saving throw at the end of their turn to remove the effect.",
                    failure: "The target creature is deafened until the start of their turn.",
                    critFailure: "No effect.",

                    onCritSuccess: "[Deafened@e:Ends after 1 minute.]",
                    onSuccess: "[Deafened@e:Ends after 1 minute. The creature may make a {DC} Strength Save at the end of their turn to remove the effect.]",
                    onFailure: "[Deafened@e: Ends at the start of their turn]",
                    onCritFailure: "[]",

                    desc: `You call down a thunderous boom upon your enemies. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "weight":
            return {
                name: "Weight",
                    traits: "Renitence",
                    power: 3,
                    branch: "gravity",
                    family: "Disable",
                    element: "Earth",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "60 feet",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is knocked prone and is restrained for 1 minute. The creature may use an action to make a Strength saving throw to remove the effect.",
                    failure: "The target creature is knocked prone and restrained until the start of their turn.",
                    critFailure: "No effect.",

                    onCritSuccess: "",
                    onSuccess: "[Prone][Restrained@e:Ends after 1 minute. The creature may use an action to make a {DC} Strength Save to remove the effect.]",
                    onFailure: "[Prone][Restrained@e: Ends at the start of their turn]",
                    onCritFailure: "[]",

                    desc: `As you finish casting your spell you heavily force gravity down on your targets. The effect is determined by the target's save.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "arcane healing":
            return {
                name: "Arcane Healing",
                    traits: "",
                    power: 1,
                    branch: "ethereal",
                    family: "Empower Barrier",
                    element: "Arcana",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d10",
                    dmgType: "Convalescing",
                    dmgElem: "",
                    hldmg: "1d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Drawing upon the ether you force a barrier to restore itself. Choose a target creature within range. That creature gains 1d10 + your spellcasting ability barrier. `,
                    heightenDesc: `Barrier healing increases by 1d10 per level.`,
            };
        case "barrier healer":
            return {
                name: "Barrier Healer",
                    traits: "",
                    power: 1,
                    branch: "health",
                    family: "Empower Barrier",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d4",
                    dmgType: "Convalescing",
                    dmgElem: "",
                    hldmg: "1d4",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You regenerate a barrier. Choose a target creature within range. The target gains 1d4 barrier.`,
                    heightenDesc: `Barrier healing increases by 1d4 per level.`,
            };
        case "wind barrier":
            return {
                name: "Wind Barrier",
                    traits: "",
                    power: 1,
                    branch: "wind",
                    family: "Empower Barrier",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Whenever a creature hits you with a melee attack they are pushed 5 feet away from you and their speed drops to zero until the beginning of their next turn.@e:The effect lasts for 1 minute or until your barrier is shattered.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your barrier creates a gentle breeze around you that bursts outward when it resists an attack. Whenever a creature hits you with a melee attack they are pushed 5 feet away from you and their speed drops to zero until the beginning of their next turn. The effect lasts until the end of the spell's duration or your barrier is shattered.`,
                    heightenDesc: ``,
            };
        case "flame barrier":
            return {
                name: "Flame Barrier",
                    traits: "",
                    power: 1,
                    branch: "flame",
                    family: "Empower Barrier",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Whenever a creature hits you with a melee attack they take 5 burn (Fire) damage.@e:The effect lasts for 1 minute or until your barrier is shattered.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your barrier emanates heat that flares as it takes damage. Whenever a creature hits you with a melee attack they take 5 burn (Fire) damage. The effect lasts until the end of the spell's duration or your barrier is shattered.`,
                    heightenDesc: ``,
            };
        case "ether barrier":
            return {
                name: "Ether Barrier",
                    traits: "",
                    power: 1,
                    branch: "metalfundamental",
                    family: "Empower Barrier",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d6",
                    dmgType: "Convalescing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:At the start of your turn you heal 1d6 barrier.@e:The effect lasts for 1 minute or until your barrier is shattered.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You connect your barrier with a slight amount of ether. At the start of your turn you heal 1d6 barrier. The effect lasts until the end of the spell's duration or your barrier is shattered.`,
                    heightenDesc: ``,
            };
        case "static barrier":
            return {
                name: "Static Barrier",
                    traits: "",
                    power: 1,
                    branch: "nimbus",
                    family: "Empower Barrier",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Whenever a creature hits you with a melee attack they take 1d8 lightning (Metal) damage.@e:The effect lasts for 1 minute or until your barrier is shattered.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A faint hum can be heard radiating from your barrier that shocks anyone attempting to strike you. Whenever a creature hits you with a melee attack they take 1d8 lightning (Metal) damage. The effect lasts until the end of the spell's duration or your barrier is shattered.`,
                    heightenDesc: ``,
            };
        case "cold barrier":
            return {
                name: "Cold Barrier",
                    traits: "",
                    power: 1,
                    branch: "ice",
                    family: "Empower Barrier",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Whenever a creature hits you with a melee attack they take 1d4 cold (Water) damage and their speed is reduced to zero until the beginning of their next turn.@e:The effect lasts for 1 minute or until your barrier is shattered.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `The air around you is faintly colder then drops quickly when your barrier is struck. Whenever a creature hits you with a melee attack they take 1d4 cold (Water) damage and their speed is reduced to zero until the beginning of their next turn. The effect lasts until the end of the spell's duration or your barrier is shattered.`,
                    heightenDesc: ``,
            };
        case "barrier restorer":
            return {
                name: "Barrier Restorer",
                    traits: "",
                    power: 1,
                    branch: "restoration",
                    family: "Empower Barrier",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d10",
                    dmgType: "Convalescing",
                    dmgElem: "",
                    hldmg: "1d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You regenerate a barrier. Choose a target creature within range. The target gains 1d10 + your spellcasting ability modifier barrier.`,
                    heightenDesc: `Barrier healing increases by 1d10 per level.`,
            };
        case "sand barrier":
            return {
                name: "Sand Barrier",
                    traits: "",
                    power: 2,
                    branch: "sand",
                    family: "Empower Barrier",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 100,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:You have partial cover while this spell is active.@e:The effect lasts for 1 minute or until your barrier is shattered.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Sand stirs around you in a haze making you difficult to pinpoint. You have partial cover while this spell is active. The effect lasts until the end of the spell's duration or your barrier is shattered.`,
                    heightenDesc: ``,
            };
        case "ether buffer":
            return {
                name: "Ether Buffer",
                    traits: "",
                    power: 2,
                    branch: "ether",
                    family: "Empower Barrier",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "90 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "3d10",
                    dmgType: "Convalescing",
                    dmgElem: "",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You empower a barrier with ether to grant it additional protection. As long as your target has an active barrier, they gain 3d10 barrier.`,
                    heightenDesc: `Barrier healing increases by 2d10 per level.`,
            };
        case "spirit beacon":
            return {
                name: "Spirit Beacon",
                    traits: "Sustain",
                    power: 2,
                    branch: "ether",
                    family: "Etherealism",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "0",
                    trigger: "",
                    mana: 100,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You meditate for 1 minute to create a beacon of your location in the spirit realm. This allows you to speak to and see spirits out to 150 feet from your location for the duration of the spell. At any time, you may spend 50 Mana to extend your duration by 1 minute.
    
    Spirits aren’t omniscient and only retain information that they themselves know. Most can only communicate with emotional responses and have their own agendas and opinions. In addition, some questions may be difficult to answer at all and the caster will simply receive an unclear message.`,
                    heightenDesc: ``,
            };
        case "spirit walk":
            return {
                name: "Spirit Walk",
                    traits: "",
                    power: 2,
                    branch: "ether",
                    family: "Etherealism",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "0",
                    trigger: "",
                    mana: 200,

                    range: "10 feet",
                    area: "",
                    targets: "Up to three target willing creatures",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You meditate for 1 minute connecting you and your targets' bodies to their essence and transfer it to the spirit realm for the duration of the spell. The body you leave behind is unconscious while you are on the spirit plane.`,
                    heightenDesc: `Increase targets by 3 per level.`,
            };
        case "expel essence":
            return {
                name: "Expel Essence",
                    traits: "Renitence",
                    power: 4,
                    branch: "ether",
                    family: "Etherealism",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "3",
                    trigger: "",
                    mana: 500,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `With your touch you force the target's essence to leave their body and enter the spirit realm. Make a melee spell attack. On success you force the creature to enter the spirit realm for the duration of the spell. If the target has a spirit inside of them, instead the spirit is forced out of the body. The body that is left behind is unconscious while in the spirit plane.`,
                    heightenDesc: ``,
            };
        case "arcane burst":
            return {
                name: "Arcane Burst",
                    traits: "Aspected, Evocation, Ravage",
                    power: 1,
                    branch: "ethereal",
                    family: "Evoke Blast",
                    element: "Arcana",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "120 feet",
                    area: "5-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "1d8",
                    dmgType: "Rending",
                    dmgElem: "Arcana",
                    hldmg: "1d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A burst of arcane energy explodes for 1d8 damage.`,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "wind burst":
            return {
                name: "Wind Burst",
                    traits: "Evocation, Ravage",
                    power: 2,
                    branch: "wind",
                    family: "Evoke Blast",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "250 feet",
                    area: "5-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "",

                    dmg: "2d6",
                    dmgType: "Force",
                    dmgElem: "Wood",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target is pushed 10 feet away from the center point of the spell.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:10 feet from center]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your extended palm causes wind to burst out causing 2d6 force (Wood) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "fireball":
            return {
                name: "Fireball",
                    traits: "Evocation, Ignite, Ravage",
                    power: 2,
                    branch: "flame",
                    family: "Evoke Blast",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "150 feet",
                    area: "10-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "4d6",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You launch a small ball of fire at a point away from you which then explodes into a huge burst of flame for 4d6 burn (Fire) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "flame pyre":
            return {
                name: "Flame Pyre",
                    traits: "Evocation, Ravage",
                    power: 2,
                    branch: "flame",
                    family: "Evoke Blast",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d12",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "1d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `When you cast the spell, choose a point you can see within range. A pillar of flame erupts from the point you specify. Each creature within 5 feet of that point must make a Dexterity saving throw. A creature takes 2d12 burn (Fire) damage on a failed save, or half as much damage on a successful one. On each of your turns until the spell ends, you can use your action to call down energy in this way again, targeting any point within range.`,
                    heightenDesc: `Increase the damage by 1d12 per slot level above 3rd.`,
            };
        case "erupting earth":
            return {
                name: "Erupting Earth",
                    traits: "Environmental, Ignite, Ravage, Sustain",
                    power: 2,
                    branch: "tremor",
                    family: "Evoke Blast",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "20-foot cube",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "2d12",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "1d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: ` A fountain of churned earth and stone erupts dealing 2d12 force (Earth) damage.
    
    Additionally, the ground in that area becomes difficult terrain until cleared away. Each 5-foot-square portion of the area requires at least 1 minute to clear by hand.`,
                    heightenDesc: `Damage increases by 2d12 per level.`,
            };
        case "ball lightning":
            return {
                name: "Ball Lightning",
                    traits: "Evocation, Ignite, Ravage",
                    power: 2,
                    branch: "nimbus",
                    family: "Evoke Blast",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "250 feet",
                    area: "15-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d8",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "1d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You fire a small orb of electricity to a chosen position which explodes for 3d8 Lightning (Metal) damage.`,
                    heightenDesc: `Increase the damage by 1d8 per level.`,
            };
        case "shatter":
            return {
                name: "Shatter",
                    traits: "Evocation, Ravage",
                    power: 2,
                    branch: "sound",
                    family: "Evoke Blast",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "5-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "2d8",
                    dmgType: "Sonic",
                    dmgElem: "Water",
                    hldmg: "1d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A sudden loud ringing noise, painfully intense, erupts for 2d8 sonic (Water) damage. 
    
    A creature made of inorganic material such as stone, crystal, or metal has disadvantage on this saving throw. An object that isn’t being worn or carried also takes the damage if it’s in the spell’s area.`,
                    heightenDesc: `Increase the damage by 2d8 per level.`,
            };
        case "geyser":
            return {
                name: "Geyser",
                    traits: "Evocation, Ravage",
                    power: 3,
                    branch: "fluid",
                    family: "Evoke Blast",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "150 feet",
                    area: "5-foot radius, 50-foot-tall cylinder",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d6",
                    dmgType: "Force",
                    dmgElem: "Water",
                    hldmg: "2d6",
                    dmg2: "2d6",
                    dmg2Type: "Burn",
                    dmg2Elem: "Water",
                    addAbilityScore: false,

                    critSuccess: "The target is pushed 40 feet into the air.",
                    success: "The target is pushed 20 feet into the air.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Pushed@d:40 feet into the air]",
                    onSuccess: "[Pushed@d:20 feet into the air]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A powerful geyser blasts up from the ground, dealing 3d6 force (Water) damage and 2d6 burn (Water) damage. The bottom of this spell's area must be on solid ground. A creature pushed into the air by the geyser can't be pushed beyond the top of the geyser. After being pushed into the air, a creature falls unless it's flying or has some other means of staying aloft, taking falling damage (normally equal to half the distance it fell). 
    
    After the geyser erupts, its area is filled with a cloud of steam for 1 round. All creatures in the steam are concealed, and all creatures outside the steam are concealed to creatures within it.`,
                    heightenDesc: `Force damage increases by 3d6 per level.`,
            };
        case "fireblast":
            return {
                name: "Fireblast",
                    traits: "Evocation, Ignite, Ravage",
                    power: 4,
                    branch: "flame",
                    family: "Evoke Blast",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "150 feet",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "6d6",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "3d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A streak of flame arcs away from your finger tip to a point away from you which then explodes into an enormous burst of flame, dealing 6d6 burn (Fire) damage.`,
                    heightenDesc: `Damage increases by 4d6 per level.`,
            };
        case "plasma blast":
            return {
                name: "Plasma Blast",
                    traits: "Evocation, Ignite, Ravage",
                    power: 4,
                    branch: "nimbus",
                    family: "Evoke Blast",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "250 feet",
                    area: "10-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "8d8",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "3d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `An explosion of white hot plasma arcs out in a sphere burning those within for 8d8 + 10 burn (Metal) damage.`,
                    heightenDesc: `Damage increases by 4d8 per level.`,
            };
        case "caustic eruption":
            return {
                name: "Caustic Eruption",
                    traits: "Evocation, Ravage",
                    power: 5,
                    branch: "corrosion",
                    family: "Evoke Blast",
                    element: "Wood",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "60 feet",
                    area: "30-foot cube",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "8d10",
                    dmgType: "Acid",
                    dmgElem: "Wood",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "At the end of the target's next turn they take an additional 6d10 points of acid (Wood) damage.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Take 6d10 acid (Wood) damage at the end of the turn@e:Effect ends at the end of the creature's turn.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Acid erupts from the ground, dealing 8d10 points of acid (Wood) damage. `,
                    heightenDesc: `Damage increases by 3d10 per level.`,
            };
        case "sunburst":
            return {
                name: "Sunburst",
                    traits: "Evocation, Ravage",
                    power: 5,
                    branch: "light",
                    family: "Evoke Blast",
                    element: "Fire",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "150 feet",
                    area: "40-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "10d6",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "4d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is blinded for 1 minute.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Blinded@e:Ends after 1 minute. The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A small orb of light is released from your palm and explodes with brilliant sunlight at your command. This light burns creatures in the area for 10d6 burn (Fire) damage and may blind them.
    
    A creature blinded by this spell makes another saving throw at the end of each of its turns. On a successful save, it is no longer blinded. This spell dispels any darkness in its area.`,
                    heightenDesc: `Damage increases by 4d6 per level.`,
            };
        case "horrid wilting":
            return {
                name: "Horrid Wilting",
                    traits: "Evocation, Ravage",
                    power: 5,
                    branch: "radiation",
                    family: "Evoke Blast",
                    element: "Fire",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "300 feet",
                    area: "20-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "6d10",
                    dmgType: "Radiation",
                    dmgElem: "Fire",
                    hldmg: "1d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature is staggered (1) for 1 round.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Staggered,Staggered 1@e:Ends at the start of the caster's turn]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell evaporates moisture from the body of living creatures, causing flesh to wither, crack, and crumble to dust, causing 6d10 radiation (Fire) damage. Radiation damage is always halved, dealing damage to both barrier and hp when a barrier is active on a target. 
    
    If you target a plant creature or a magical plant, it makes the saving throw with disadvantage, and the spell deals maximum damage to it.`,
                    heightenDesc: `Damage increases by 1d10 per level.`,
            };
        case "rockslide":
            return {
                name: "Rockslide",
                    traits: "Evocation, Ravage, Terrain",
                    power: 3,
                    branch: "rock",
                    family: "Evoke Bombardment",
                    element: "Earth",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "250 feet",
                    area: "15-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "4d10",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "3d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Rocks form above and fall for 4d10 force (Earth) damage, 
    
    Rocks turn the area of effect into difficult terrain until the start of your next turn.`,
                    heightenDesc: `Increase the damage by 3d10 per level.`,
            };
        case "daggerfall":
            return {
                name: "Daggerfall",
                    traits: "Evocation, Ravage",
                    power: 3,
                    branch: "forge",
                    family: "Evoke Bombardment",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "120 feet",
                    area: "10-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "9d8",
                    dmgType: "Rending",
                    dmgElem: "Metal",
                    hldmg: "4d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Above the spell area forms hundreds of sharp pieces of metal that fall down at great speeds for 9d8 rending (Metal) damage.`,
                    heightenDesc: `Increase the damage by 4d8 per level.`,
            };
        case "hail":
            return {
                name: "Hail",
                    traits: "Evocation, Ravage, Terrain",
                    power: 3,
                    branch: "storm",
                    family: "Evoke Bombardment",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "250 feet",
                    area: "15-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d8",
                    dmgType: "Force",
                    dmgElem: "Water",
                    hldmg: "4d8",
                    dmg2: "4d6",
                    dmg2Type: "Cold",
                    dmg2Elem: "Water",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A hail of rock-hard ice pounds to the ground for 3d8 force (Water) and 4d6 cold (Water) damage.
    
    Hailstones turn the area of effect into difficult terrain until the start of your next turn.`,
                    heightenDesc: `Increase force damage by 4d8 per level.`,
            };
        case "storm of glass":
            return {
                name: "Storm of Glass",
                    traits: "Evocation, Ravage",
                    power: 4,
                    branch: "glass",
                    family: "Evoke Bombardment",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "120 feet",
                    area: "30-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "15d6",
                    dmgType: "Rending",
                    dmgElem: "Fire",
                    hldmg: "8d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Above the spell area forms thousands of sharpened glass that rain down for 15d6 rending (Fire) damage.`,
                    heightenDesc: `Increase the damage by 8d6 per level.`,
            };
        case "dagger storm":
            return {
                name: "Dagger Storm",
                    traits: "Evocation, Ravage",
                    power: 4,
                    branch: "forge",
                    family: "Evoke Bombardment",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "120 feet",
                    area: "25-foot-radius, 40-foot-high cylinder",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "14d8",
                    dmgType: "Rending",
                    dmgElem: "Metal",
                    hldmg: "6d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Thousands of sharpened iron rain down in an area dealing 14d8 rending (Metal) damage.`,
                    heightenDesc: `Increase the damage by 6d8 per level.`,
            };
        case "arcane strike":
            return {
                name: "Arcane Strike",
                    traits: "Aspected",
                    power: 1,
                    branch: "ethereal",
                    family: "Evoke Blow",
                    element: "Arcana",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You imbue your body with elemental energy then strike a target. Make an unarmed Strike against the target. The damage is typed to whichever element you select.`,
                    heightenDesc: ``,
            };
        case "wood burst":
            return {
                name: "Wood Burst",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "plantation",
                    family: "Evoke Emanation",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "5-foot-radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d6",
                    dmgType: "Force",
                    dmgElem: "Woood",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `As you raise your arms then push them to the ground, wood rains down around you dealing 3d6 force (wood) damage to those around you.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "fire burst":
            return {
                name: "Fire Burst",
                    traits: "Evocation, Ravage",
                    power: 2,
                    branch: "flame",
                    family: "Evoke Emanation",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "10-foot-radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "5d6",
                    dmgType: "Rending",
                    dmgElem: "Fire",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause fire to release around you, dealing 5d6 burn (fire) damage to those close to you.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "glass burst":
            return {
                name: "Glass Burst",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "glass",
                    family: "Evoke Emanation",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "5-foot-radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d6",
                    dmgType: "Rending",
                    dmgElem: "Fire",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You surround yourself with pieces of glass then send them flying away from you, dealing 3d6 rending (fire) damage to those beside you.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "quake":
            return {
                name: "Quake",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "earthfundamental",
                    family: "Evoke Emanation",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "10-foot radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d6",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The creature is knocked prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You stomp your feet causing the ground to shake around you and dealing 2d6 force (Earth) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "blade burst":
            return {
                name: "Blade Burst",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "forge",
                    family: "Evoke Emanation",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "5-foot-radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d6",
                    dmgType: "Rending",
                    dmgElem: "Metal",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You surround yourself with iron blades sending them flying away from you, dealing 3d6 rending (metal) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "static burst":
            return {
                name: "Static Burst",
                    traits: "Evocation, Ravage",
                    power: 2,
                    branch: "nimbus",
                    family: "Evoke Emanation",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "10-foot-radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "4d8",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause electricity to spark around you, dealing 4d8 lightning (metal) damage.`,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "lightning pulse":
            return {
                name: "Lightning Pulse",
                    traits: "Evocation, Ravage",
                    power: 3,
                    branch: "nimbus",
                    family: "Evoke Emanation",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Self",
                    area: "15-foot-radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "6d8",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "3d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Lightning erupts quickly from your body, dealing 6d8 lightning (metal) damage.`,
                    heightenDesc: `Damage increases by 3d8 per level.`,
            };
        case "thunderclap":
            return {
                name: "Thunderclap",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "sound",
                    family: "Evoke Emanation",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "5-foot-radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "3d6",
                    dmgType: "Sonic",
                    dmgElem: "Water",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a loud burst of sound around your person, dealing 3d6 sonic (water) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "repelling pulse":
            return {
                name: "Repelling Pulse",
                    traits: "Evocation, Ravage",
                    power: 3,
                    branch: "force",
                    family: "Evoke Emanation",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Self",
                    area: "30-foot-radius",
                    targets: "",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "",

                    dmg: "7d10",
                    dmgType: "Force",
                    dmgElem: "Metal",
                    hldmg: "4d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The creature is pushed 20 feet away from you and knocked prone.",
                    success: "The creature is pushed 10 feet away from you.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Pushed@d:20 feet from source][Prone]",
                    onSuccess: "[Pushed@d:10 feet from source]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You unleash a powerful pulse that violently hurls creatures away from you, dealing 7d10 force (Metal) damage.`,
                    heightenDesc: `Damage increases by 4d10 per level.`,
            };
        case "rolling fire":
            return {
                name: "Rolling Fire",
                    traits: "Evocation, Ignite, Ravage",
                    power: 2,
                    branch: "flame",
                    family: "Evoke Line",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "50 feet long, 5 feet wide, and 5 feet high line",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "6d8",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Fire rises from the ground and rolls out in a line in a direction you choose dealing 6d8 burn (Fire) damage.`,
                    heightenDesc: `Increase the damage by 2d8 per level.`,
            };
        case "glass surge":
            return {
                name: "Glass Surge",
                    traits: "Evocation, Ravage",
                    power: 2,
                    branch: "glass",
                    family: "Evoke Line",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "60 feet long, 20 feet wide, and 5 feet high line",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "5d8",
                    dmgType: "Rending",
                    dmgElem: "Fire",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Shaprened glass flies from your outstretched hand in a direction you choose dealing 5d8 rending (FIre) damage.`,
                    heightenDesc: `Increase the damage by 2d8 per level.`,
            };
        case "defoliate":
            return {
                name: "Defoliate",
                    traits: "Evocation",
                    power: 2,
                    branch: "radiation",
                    family: "Evoke Line",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "30 feet long, 10 feet wide, and 5 feet high line",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You extend your hand towards plantlife and cause it to wither and die. This effect removes the cover and concealment provided by trees and undergrowth, eliminates the movement penalties associated with undergrowth, and so forth.
    
    You may also target a wood aspected-material up to 5 square feet in size with this spell. You must succeed on a ranged touch attack to hit your target. An affected wood-aspected material takes 4d10 radiation (Fire) damage.`,
                    heightenDesc: ``,
            };
        case "lightning bolt":
            return {
                name: "Lightning Bolt",
                    traits: "Evocation, Ignite, Ravage",
                    power: 2,
                    branch: "nimbus",
                    family: "Evoke Line",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "100 feet long, 5 feet wide, and 5 feet high line",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "8d6",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "3d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A stroke of lightning blasts out from your outstretched hand in a direction you choose dealing 8d6 lightning (Metal) damage.`,
                    heightenDesc: `Increase the damage by 3d6 per level.`,
            };
        case "caustic rebuke":
            return {
                name: "Caustic Rebuke",
                    traits: "Evocation, Ravage",
                    power: 3,
                    branch: "corrosion",
                    family: "Evoke Line",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "R",
                    trigger: "When you take damage.",
                    mana: 350,

                    range: "Self",
                    area: "10 feet long, 5 feet wide, and 5 feet high line",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "7d10",
                    dmgType: "Acid",
                    dmgElem: "Wood",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "At the end of the target's next turn they take an additional 3d10 points of acid (Wood) damage.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Take 3d10 acid (Wood) damage at the end of the turn. @e:Ends at the end of the turn.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A spray of acid spurts in the direction of the opponent who inflicted the wound damaging the first creature or object it touches for 7d10 points of acid (Wood) damage. `,
                    heightenDesc: ``,
            };
        case "acid spray":
            return {
                name: "Acid Spray",
                    traits: "Evocation, Ravage",
                    power: 4,
                    branch: "corrosion",
                    family: "Evoke Line",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Self",
                    area: "60 feet long, 5 feet wide, and 5 feet high line",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "10d10",
                    dmgType: "Acid",
                    dmgElem: "Wood",
                    hldmg: "5d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "At the end of the target's next turn they take an additional 5d10 points of acid (Wood) damage.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Take 5d10 acid (Wood) damage at the end of the turn@e:Ends at the end of the turn.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A spray of acid erupts from your outstretched hand, dealing 10d10 points of acid (Wood) damage.`,
                    heightenDesc: `Increase the damage by 5d10 per level.`,
            };
        case "sunbeam":
            return {
                name: "Sunbeam",
                    traits: "Evocation, Ravage",
                    power: 4,
                    branch: "light",
                    family: "Evoke Line",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Self",
                    area: "60 feet long, 5 feet wide, and 5 feet high line",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "12d10",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "4d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The creature is blinded for 1 minute.",
                    success: "The creature is blinded for 1 minute. The creature may make a Constitution saving throw at the end of their turn to remove the effect.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Blinded@e:Ends after 1 minute.]",
                    onSuccess: "[Blinded@e:Ends after 1 minute. The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A beam of brilliant light flashes out from your hand, dealing 12d10 burn (Fire) damage.`,
                    heightenDesc: `Increase the damage by 4d10 per level.`,
            };
        case "tidal wave":
            return {
                name: "Tidal Wave",
                    traits: "Evocation, Ravage",
                    power: 4,
                    branch: "fluid",
                    family: "Evoke Line",
                    element: "Water",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Self",
                    area: "50 feet long, 10 feet wide, and 20 feet high line",
                    targets: "",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "",

                    dmg: "12d8",
                    dmgType: "Force",
                    dmgElem: "Water",
                    hldmg: "6d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target is pushed 40 feet from the source and knocked prone.",
                    success: "The target is pushed 30 feet from the source and knocked prone.",
                    failure: "The target is pushed 10 feet from the source",
                    critFailure: "The target is not pushed.",

                    onCritSuccess: "[Pushed@d:40 feet from source][Prone]",
                    onSuccess: "[Pushed@d:30 feet from source][Prone]",
                    onFailure: "[Pushed@d:10 feet from source]",
                    onCritFailure: "[]",

                    desc: `You conjure up a wave of water that crashes down for 12d8 force (Water) damage.
    
    The water then spreads out across the ground in all directions, extinguishing unprotected flames in its area and within 30 feet of it.`,
                    heightenDesc: `Increase the damage by 6d8 per level.`,
            };
        case "diffuse":
            return {
                name: "Diffuse",
                    traits: "",
                    power: 2,
                    branch: "radiation",
                    family: "Evoke Mark",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "1d10",
                    dmgType: "Radiation",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You remove moisture from a living creature. The target creature must make a Constitution saving throw. On failure, the target takes 1d10 radiation (Fire) damage and the creature is staggered (1) for 1 round. Radiation damage deals half damage to both barrier and hp when a barrier is active on a target.
    
    If you target a plant creature or a magical plant, it makes the saving throw with disadvantage, and the spell deals maximum damage to it.`,
                    heightenDesc: ``,
            };
        case "call lightning":
            return {
                name: "Call Lightning",
                    traits: "",
                    power: 2,
                    branch: "nimbus",
                    family: "Evoke Mark",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "150 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "Up to 10 minutes",

                    dmg: "3d10",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "1d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `When you cast the spell, choose a point you can see within range. A lightning bolt strikes the area of your choice. Each creature within 5 feet of that point must make a Dexterity saving throw. A creature takes 3d10 Lightning (Metal) damage on a failed save, or half as much damage on a successful one. On each of your turns until the spell ends, you can use your action to call down energy in this way again, targeting any point within range. If you are outdoors in stormy conditions when you cast this spell, the spell gives you control over the existing storm instead of creating a new one. Under such conditions, the spell’s damage increases by 1d10.`,
                    heightenDesc: `Increase the damage by 1d10 per slot level above 3rd.`,
            };
        case "wither":
            return {
                name: "Wither",
                    traits: "",
                    power: 3,
                    branch: "toxin",
                    family: "Evoke Mark",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d8",
                    dmgType: "Poison",
                    dmgElem: "",
                    hldmg: "3",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You inflict the target with a poison that sucks moisture from their body. Target creature makes a Dexterity saving throw. On failure, target takes 2d8 poison damage or half as much on a successful one. This damage bypasses barrier.
    
    If you target a plant creature or a magical plant, it makes the saving throw with disadvantage, and the spell deals maximum damage to it. If you target a nonmagical plant that isn’t a creature, such as a tree or shrub, it doesn’t make a saving throw; it simply withers and dies.`,
                    heightenDesc: `Increase damage by 3 per slot level above 4th`,
            };
        case "coagulate":
            return {
                name: "Coagulate",
                    traits: "",
                    power: 3,
                    branch: "blood",
                    family: "Evoke Mark",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "3d6",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "1d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause the blood in the body of the target to clot, preventing blood from passing through vital arteries. Target creature makes a Constitution saving throw. On failure, the target takes 3d6 tension damage or half as much on a successful one. This damage bypasses barrier.`,
                    heightenDesc: `Increase damage by 1d6 per slot level above 4th`,
            };
        case "spirit blast":
            return {
                name: "Spirit Blast",
                    traits: "Ravage",
                    power: 3,
                    branch: "ether",
                    family: "Evoke Mark",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "16d6",
                    dmgType: "Force",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You concentrate ethereal energy and attack a creature's spirit. If the target is possessed by a spirit, is astrally projecting, or is a spirit, the attack deals 16d6 force damage. `,
                    heightenDesc: ``,
            };
        case "harm":
            return {
                name: "Harm",
                    traits: "",
                    power: 4,
                    branch: "toxin",
                    family: "Evoke Mark",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "5d8",
                    dmgType: "Poison",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You unleash a virulent disease on a creature that you can see within range. The target must make a Dexterity saving throw. On a failed save, it takes 5d8 poison damage that bypasses barrier, or half as much damage on a successful save. The damage can’t reduce the target’s hit points below 1.
    
    If the target fails the saving throw, its hit point maximum is reduced for 1 hour by an amount equal to the damage it took. Any effect that removes a disease allows a creature’s hit point maximum to return to normal before that time passes.`,
                    heightenDesc: ``,
            };
        case "atrophy":
            return {
                name: "Atrophy",
                    traits: "",
                    power: 4,
                    branch: "radiation",
                    family: "Evoke Mark",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "4d10",
                    dmgType: "Radiation",
                    dmgElem: "Fire",
                    hldmg: "1d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You radiate heat around a target creature drying them out. The target creature must make a Constitution saving throw. On failure, the target takes 4d10 radiation (Fire) damage and the creature is staggered for 1 round. Radiation damage deals half damage to both barrier and hp when a barrier is active on a target.
    
    If you target a plant creature or a magical plant, it makes the saving throw with disadvantage, and the spell deals maximum damage to it.`,
                    heightenDesc: `Increase damage by 1d10 per slot level above 4th`,
            };
        case "chain lightning":
            return {
                name: "Chain Lightning",
                    traits: "",
                    power: 4,
                    branch: "nimbus",
                    family: "Evoke Mark",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "150 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "10d8",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "1d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a bolt that arcs toward a target of your choice that you can see within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.
    
    Each target of your spell must make a Dexterity saving throw. The target takes 10d8 Lightning (Metal) damage on a failed save, or half as much damage on a successful one.`,
                    heightenDesc: `Increase the damage by 1d8 per slot level above 5th.`,
            };
        case "arcane bolt":
            return {
                name: "Arcane Bolt",
                    traits: "Aspected, Attack",
                    power: 1,
                    branch: "ethereal",
                    family: "Evoke Missile",
                    element: "Arcana",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d10",
                    dmgType: "Rending",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target for 1d10 damage.`,
                    heightenDesc: ``,
            };
        case "wind bullet":
            return {
                name: "Wind Bullet",
                    traits: "Attack",
                    power: 1,
                    branch: "wind",
                    family: "Evoke Missile",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "150 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d6",
                    dmgType: "Rending",
                    dmgElem: "Wood",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated and push the target 5 feet from your position.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:5 feet from source]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause a gust of wind to push at a target for 1d6 rending (Wood) damage.`,
                    heightenDesc: ``,
            };
        case "repulse":
            return {
                name: "Repulse",
                    traits: "Attack",
                    power: 1,
                    branch: "corrosion",
                    family: "Evoke Missile",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d12",
                    dmgType: "Acid",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You hurl a bubble of acid. Make a ranged spell attack against the target for 1d12 acid (wood) damage. `,
                    heightenDesc: ``,
            };
        case "flame arrow":
            return {
                name: "Flame Arrow",
                    traits: "Attack, Ignite",
                    power: 1,
                    branch: "flame",
                    family: "Evoke Missile",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d12",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You pull you arm back as if notching an arrow, causing a streak of fire to soar out to your target. Make a ranged spell attack against the target for 1d12 burn (Fire) damage. `,
                    heightenDesc: ``,
            };
        case "rock bullets":
            return {
                name: "Rock Bullets",
                    traits: "Attack",
                    power: 1,
                    branch: "rock",
                    family: "Evoke Missile",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d12",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Small rocks raise before you then fire out in a volley towards your target. Make a ranged spell attack against the target for 1d12 force (Earth) damage.`,
                    heightenDesc: ``,
            };
        case "lightning shaft":
            return {
                name: "Lightning Shaft",
                    traits: "Attack, Ignite",
                    power: 1,
                    branch: "nimbus",
                    family: "Evoke Missile",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d12",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a bolt of lightning that arc out at a target. Make a ranged spell attack against the target for 1d12 lightning (Metal) damage.`,
                    heightenDesc: ``,
            };
        case "ice darts":
            return {
                name: "Ice Darts",
                    traits: "Attack",
                    power: 1,
                    branch: "ice",
                    family: "Evoke Missile",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d12",
                    dmgType: "Cold",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You form several darts of ice that streak towards your target. Make a ranged spell attack against the target for 1d12 cold (Water) damage.`,
                    heightenDesc: ``,
            };
        case "ray of frost":
            return {
                name: "Ray of Frost",
                    traits: "Attack",
                    power: 1,
                    branch: "storm",
                    family: "Evoke Missile",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d6",
                    dmgType: "Cold",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated and the target is slowed until the start of your next turn.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Slowed@e: Ends after 1 round]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target for 1d6 cold (Water) damage.`,
                    heightenDesc: ``,
            };
        case "acid arrow":
            return {
                name: "Acid Arrow",
                    traits: "Attack",
                    power: 2,
                    branch: "corrosion",
                    family: "Evoke Missile",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "400 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "3d10",
                    dmgType: "Acid",
                    dmgElem: "Wood",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated. At the end of the target's next turn they take an additional 2d10 points of acid (Wood) damage.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Take 2d10 acid (Wood) damage at the end of the turn@e:Ends at the end of the turn.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `An arrow of acid springs from your hand and speeds to its target. Make a ranged attack against the target for 3d10 acid (Wood) damage.`,
                    heightenDesc: `Damage increases by 2d10 per level.`,
            };
        case "fulgor":
            return {
                name: "Fulgor",
                    traits: "Attack, Ignite",
                    power: 4,
                    branch: "nimbus",
                    family: "Evoke Missile",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "150 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "10d6+40",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "6d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A thin bolt of lightning springs from your pointing finger to a target that you can see within range. Make a ranged attack against the target for 10d6 + 40 lightning (Metal) damage.`,
                    heightenDesc: `Damage increases by 6d6 per level.`,
            };
        case "acid blast":
            return {
                name: "Acid Blast",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "woodfundamental",
                    family: "Evoke Salvo",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "20-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d6",
                    dmgType: "Acid",
                    dmgElem: "Wood",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You hold your hand out towards your target causing acid to shoot out for 2d6 acid (Wood) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "brick barrage":
            return {
                name: "Brick Barrage",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "firefundamental",
                    family: "Evoke Salvo",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "15-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d10",
                    dmgType: "Stab",
                    dmgElem: "Fire",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Chunks of hardened clay flies out from your outstretched hand, dealing 2d10 force (Fire) damage.`,
                    heightenDesc: `Damage increases by 2d10 per level.`,
            };
        case "burning hands":
            return {
                name: "Burning Hands",
                    traits: "Evocation, Ignite, Ravage",
                    power: 1,
                    branch: "flame",
                    family: "Evoke Salvo",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "15-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d6",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You hold your hand out towards your target causing flame to shoot out from it in a spread dealing 3d6 burn (Fire) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "glass slasher":
            return {
                name: "Glass Slasher",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "glass",
                    family: "Evoke Salvo",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "25-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d8",
                    dmgType: "Stab",
                    dmgElem: "Fire",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Daggers of glass fly out from your outstretched hand, dealing 2d8 stab (Fire) damage.`,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "sand blast":
            return {
                name: "Sand Blast",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "earthfundamental",
                    family: "Evoke Salvo",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "15-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "",

                    dmg: "2d6",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target is pushed 10 feet away from the caster.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:10 feet from source]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You hold your hand out towards your target causing sand to shoot out from it in a spread dealing 2d6 force (Earth) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "stone shower":
            return {
                name: "Stone Shower",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "rock",
                    family: "Evoke Salvo",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "20-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d8",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Pieces of earth blast out from you causing 2d8 force (Earth) damage.`,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "lightning burst":
            return {
                name: "Lightning Burst",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "metalfundamental",
                    family: "Evoke Salvo",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "20-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d8",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Lightning bursts out in front of you, dealing 2d8 Lightning (Metal) damage.`,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "rain of daggers":
            return {
                name: "Rain of Daggers",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "forge",
                    family: "Evoke Salvo",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "15-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "3d6",
                    dmgType: "Stab",
                    dmgElem: "Metal",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Daggers fly out from your outstretched hand, dealing 3d6 stab (Metal) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "water blast":
            return {
                name: "Water Blast",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "waterfundamental",
                    family: "Evoke Salvo",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "15-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Strength",
                    duration: "",

                    dmg: "2d6",
                    dmgType: "Force",
                    dmgElem: "Water",
                    hldmg: "2d6",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target is pushed 10 feet away from the caster.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:10 feet from source]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You hold your hand out towards your targets the shoot a blast of water dealing 2d6 force (Water) damage.`,
                    heightenDesc: `Damage increases by 2d6 per level.`,
            };
        case "freezing blast":
            return {
                name: "Freezing Blast",
                    traits: "Evocation, Ravage",
                    power: 1,
                    branch: "storm",
                    family: "Evoke Salvo",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "30-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Dexterity",
                    duration: "",

                    dmg: "2d8",
                    dmgType: "Cold",
                    dmgElem: "Water",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You send a wave of chilling air towards your targets, dealing 2d8 Cold (Water) damage.`,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "thunderwave":
            return {
                name: "Thunderwave",
                    traits: "Evocation, Ravage",
                    power: 2,
                    branch: "sound",
                    family: "Evoke Salvo",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "15-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "4d8",
                    dmgType: "Sonic",
                    dmgElem: "Water",
                    hldmg: "3d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target is knocked prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You strike the ground in front of you, filling the area in front of you with thunder that deals 4d8 sonic (Water) damage.`,
                    heightenDesc: `Damage increases by 3d8 per level.`,
            };
        case "cone of cold":
            return {
                name: "Cone of Cold",
                    traits: "Evocation, Ravage",
                    power: 3,
                    branch: "storm",
                    family: "Evoke Salvo",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Self",
                    area: "15-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "6d8",
                    dmgType: "Cold",
                    dmgElem: "Water",
                    hldmg: "4d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You take a deep breath then breath it out in a strong gust of chilling air, dealing 6d8 Cold (Water) damage.`,
                    heightenDesc: `Damage increases by 4d8 per level.`,
            };
        case "boom burst":
            return {
                name: "Boom Burst",
                    traits: "Evocation, Ravage",
                    power: 4,
                    branch: "sound",
                    family: "Evoke Salvo",
                    element: "Water",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Self",
                    area: "50-foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "10d8",
                    dmgType: "Sonic",
                    dmgElem: "Water",
                    hldmg: "6d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Prone][Deafened@e: Ends after 1 minute]",
                    onSuccess: "[Prone][Deafened@e:Ends at the start of the caster's next round]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You shout loudly, filling the area in front of you with thunder. Any creature in the area must make a Constitution saving throw. On failure, a target takes 10d8 sonic (Water) damage and is knocked prone and deafened for 1 round or half as much damage and negates and additional effects on success.`,
                    heightenDesc: `Damage increases by 6d8 per level.`,
            };
        case "kinesis":
            return {
                name: "Kinesis",
                    traits: "Aspected",
                    power: 1,
                    branch: "foundational",
                    family: "Foundational",
                    element: "Arcana",

                    spellslotcost: 0,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "One unattended object within a 5-foot cube",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can easily lift and move objects. The object must not be attached to anything and at least half of which is made of non-complex material aspected to the chosen element. You may move the target up to 10 feet in any direction as long as there is space in the target location and the destination is on the ground. If the way is blocked the object stops as it hits the object.`,
                    heightenDesc: `Distance moved increases by 20 feet per level.`,
            };
        case "diakopy":
            return {
                name: "Diakopy",
                    traits: "Aspected, Attack, Dust",
                    power: 1,
                    branch: "foundational",
                    family: "Foundational",
                    element: "Arcana",

                    spellslotcost: 0,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "Up to a 5-foot square",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "2d8",
                    dmgType: "Tension",
                    dmgElem: "",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You break down material into dust. This spell only targets non-complex material aspected to the chosen element. Make a ranged spell attack against the target dealing 2d8 + Spellcasting Ability Modifier tension damage. `,
                    heightenDesc: `Damage increases by 2d8 per level.`,
            };
        case "katapeltis":
            return {
                name: "Katapeltis",
                    traits: "Aspected, Attack",
                    power: 1,
                    branch: "foundational",
                    family: "Foundational",
                    element: "Arcana",

                    spellslotcost: 0,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "1d8",
                    dmgType: "Acid",
                    dmgElem: "Wood",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "As success, but you double any damage dice.",
                    success: "You deal damage stated.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You hurl a mote of energy at a target. Make a ranged spell attack against the target for 1d8 damage.`,
                    heightenDesc: ``,
            };
        case "chlorotheurgy":
            return {
                name: "Chlorotheurgy",
                    traits: "",
                    power: 1,
                    branch: "wood",
                    family: "Foundational",
                    element: "Wood",

                    spellslotcost: 0,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You manipulate plant matter in a number of ways. 
    • You instantly make a flower blossom, a seed pod open, or a leaf bud bloom.
    • You create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, or a faint odor.`,
                    heightenDesc: ``,
            };
        case "pyrotheurgy":
            return {
                name: "Pyrotheurgy",
                    traits: "Ignite",
                    power: 1,
                    branch: "fire",
                    family: "Foundational",
                    element: "Fire",

                    spellslotcost: 0,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "One active flame within a 5 foot cube",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You affect fire in one of the following ways:
    • You instantaneously expand the flame 5 feet in one direction, provided that wood or other fuel is present in the new location.
    • You instantaneously extinguish the flames.
    • You cause simple shapes to appear within the flames and animate as you like as long as you cast this spell each round.`,
                    heightenDesc: ``,
            };
        case "geotheurgy":
            return {
                name: "Geotheurgy",
                    traits: "",
                    power: 1,
                    branch: "earth",
                    family: "Foundational",
                    element: "Earth",

                    spellslotcost: 0,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "Earthen material within a 5 foot cube",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause shapes, colors, or both to appear on dirt or stone, spelling out words, creating images, or shaping patterns.`,
                    heightenDesc: ``,
            };
        case "ferrotheurgy":
            return {
                name: "Ferrotheurgy",
                    traits: "",
                    power: 1,
                    branch: "metal",
                    family: "Foundational",
                    element: "Metal",

                    spellslotcost: 0,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "Metalic material within a 5 foot cube",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause shapes, colors, or both to appear on the surface of metal, spelling out words, creating images, or shaping patterns. `,
                    heightenDesc: ``,
            };
        case "hydrotheurgy":
            return {
                name: "Hydrotheurgy",
                    traits: "",
                    power: 1,
                    branch: "water",
                    family: "Foundational",
                    element: "Water",

                    spellslotcost: 0,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "Water within a 5 foot cube",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You affect water in one of the following ways:
    • You move the source of water up to 20 feet in any direction.
    • You immediately dry a target wet creature or object.
    • You cause the water to form into simple shapes and animate at your direction as long as you cast this spell each round.`,
                    heightenDesc: ``,
            };
        case "purify food and drink":
            return {
                name: "Purify Food and Drink",
                    traits: "",
                    power: 1,
                    branch: "health",
                    family: "Heal Affliction",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "10 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `All nonmagical food and drink within a 5-foot-radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease.`,
                    heightenDesc: ``,
            };
        case "remove radiation":
            return {
                name: "Remove Radiation",
                    traits: "",
                    power: 1,
                    branch: "radiation",
                    family: "Heal Affliction",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "5 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You remove all ongoing radiation effects in a 5 foot square within range. This includes staggered conditions caused by radiation damage.`,
                    heightenDesc: ``,
            };
        case "poison ward":
            return {
                name: "Poison Ward",
                    traits: "",
                    power: 2,
                    branch: "health",
                    family: "Heal Affliction",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 100,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Advantage on saves against poison effects@e:Ends after 1 hour]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch a creature. If it is poisoned, you neutralize the poison. If more than one poison afflicts the target, you neutralize one poison that you know is present, or you neutralize one at random.
    
    For the duration, the target has advantage on saving throws against being poisoned and effects dealing poison damage, and it has resistance to poison damage.`,
                    heightenDesc: ``,
            };
        case "rejuvenate":
            return {
                name: "Rejuvenate",
                    traits: "",
                    power: 2,
                    branch: "health",
                    family: "Heal Affliction",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned.`,
                    heightenDesc: ``,
            };
        case "radiation ward":
            return {
                name: "Radiation Ward",
                    traits: "",
                    power: 2,
                    branch: "radiation",
                    family: "Heal Affliction",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 100,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Advantage on saves against radiation effects@e:Ends after 1 hour]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A creature warded by this spell has advantage on saving throws against radiation-based effects. In addition, the warded creature is immediately aware when it enters an area of radiation, as well as the radiation level (low, medium, high, or severe) suffusing the area.`,
                    heightenDesc: ``,
            };
        case "cure light trauma":
            return {
                name: "Cure Light Trauma",
                    traits: "",
                    power: 1,
                    branch: "woodfundamental",
                    family: "Heal Injury",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "15 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d4",
                    dmgType: "Trauma",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A poultice is quickly created and applied to the target. Choose an injury on the target to heal 1d4 damage then shift it to its Healed state. If the injury is a trauma all healing is doubled.`,
                    heightenDesc: ``,
            };
        case "passive healing":
            return {
                name: "Passive Healing",
                    traits: "",
                    power: 1,
                    branch: "health",
                    family: "Heal Injury",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "0",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You lay your hands on an injured creature and release small and consistent amounts of healing mana. After 10 minutes of healing, choose an injury on the target. That injury's hp damage is removed and the injury shifts to its recovery state.`,
                    heightenDesc: ``,
            };
        case "cure injury":
            return {
                name: "Cure Injury",
                    traits: "",
                    power: 1,
                    branch: "health",
                    family: "Heal Injury",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "30 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d10",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "1d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A poultice is quickly created and applied to the target. Choose any injury on the target to heal 1d10 + your spellcasting ability modifier damage. The injury then shifts to its healed state.`,
                    heightenDesc: `Healing increases by 1d10 per level.`,
            };
        case "mend light wounds":
            return {
                name: "Mend Light Wounds",
                    traits: "",
                    power: 1,
                    branch: "firefundamental",
                    family: "Heal Injury",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "",

                    dmg: "1d10",
                    dmgType: "Wound",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You focus on your own healing. Choose a wound type injury on yourself to heal 1d10 + your spellcasting ability modifier damage. The injury then shifts to its Healed state.`,
                    heightenDesc: ``,
            };
        case "passive mending":
            return {
                name: "Passive Mending",
                    traits: "",
                    power: 1,
                    branch: "soul",
                    family: "Heal Injury",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "0",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You lay your hands on an injured creature and release small and consistent amounts of healing mana. After 10 minutes of healing, choose an injury on the target. That injury's hp damage is removed and the injury shifts to its recovery state.`,
                    heightenDesc: ``,
            };
        case "mend injuries":
            return {
                name: "Mend Injuries",
                    traits: "",
                    power: 1,
                    branch: "soul",
                    family: "Heal Injury",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "",

                    dmg: "2d10",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "1d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create healing energies that heal your own injuries. Choose any of your own injuries to heal 2d10 + your spellcasting ability modifier damage. The injury then shifts to its healed state.`,
                    heightenDesc: `Healing increases by 1d10 per level.`,
            };
        case "cure light wounds":
            return {
                name: "Cure Light Wounds",
                    traits: "",
                    power: 1,
                    branch: "waterfundamental",
                    family: "Heal Injury",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d10",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Healing water surges from your hands over the target's wounds. Choose an injury on the target to heal 1d10 damage then shift it to its Healed state. If the injury is a wound all healing is doubled.`,
                    heightenDesc: ``,
            };
        case "passive restoration":
            return {
                name: "Passive Restoration",
                    traits: "",
                    power: 1,
                    branch: "restoration",
                    family: "Heal Injury",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "0",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You lay your hands on an injured creature and release small and consistent amounts of healing mana. After 10 minutes of healing, choose an injury on the target. That injury's hp damage is removed and the injury shifts to its recovery state.`,
                    heightenDesc: ``,
            };
        case "cure wounds":
            return {
                name: "Cure Wounds",
                    traits: "",
                    power: 1,
                    branch: "restoration",
                    family: "Heal Injury",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d10",
                    dmgType: "Wound",
                    dmgElem: "",
                    hldmg: "1d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `By laying your hands on a painful wound, you produce healing energy to reduce the pain. Choose an injury on the target to heal 1d10 + your spellcasting ability modifier damage then shift it to its Healed state. If the injury is a wound all healing is doubled.`,
                    heightenDesc: `Healing increases by 1d10 per level.`,
            };
        case "lesser life weave":
            return {
                name: "Lesser Life Weave",
                    traits: "",
                    power: 2,
                    branch: "health",
                    family: "Heal Injury",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You imbue a creature you touch with healing energy to undo a debilitating effect. You can perform one of the following effects on the target:
    
    • Reduce the target’s exhaustion level by one.
    • Remove any wound or trauma type injury in its recovery state.
    • One effect that charmed or petrified the target
    • Any reduction to one of the target’s ability scores`,
                    heightenDesc: ``,
            };
        case "cure fractures":
            return {
                name: "Cure Fractures",
                    traits: "",
                    power: 2,
                    branch: "restoration",
                    family: "Heal Injury",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "2d10",
                    dmgType: "Fracture",
                    dmgElem: "",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `By laying your hands on a a body, you douse the area with healing water. Choose an injury on the target to heal 2d10 + your spellcasting ability modifier damage then shift it to its Healed state. If the injury is a fracture all healing is doubled.`,
                    heightenDesc: `Healing increases by 2d10 per level.`,
            };
        case "cure severs":
            return {
                name: "Cure Severs",
                    traits: "",
                    power: 2,
                    branch: "restoration",
                    family: "Heal Injury",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "2d10",
                    dmgType: "Sever",
                    dmgElem: "",
                    hldmg: "2d10",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `By laying your hands on a severe injury that has severed or completely broken a body part, you close and repair the wound. Choose a sever type injury on the target to heal 2d10 + your spellcasting ability modifier then shift it to its Healed state. If the injury is a sever all healing is doubled.`,
                    heightenDesc: `Healing increases by 2d10 per level.
    
    The target’s severed body members (fingers, legs, tails, and so on), if any, are restored after 2 minutes if the severed body part is placed and held to the stump when this spell is cast.`,
            };
        case "mass cure injuries":
            return {
                name: "Mass Cure Injuries",
                    traits: "",
                    power: 3,
                    branch: "health",
                    family: "Heal Injury",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "90 feet",
                    area: "",
                    targets: "Up to ten target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "3d8",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "2d8",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create pain reducing herbs around those in need of aid. Choose any injury on each target creature to heal 3d8 + your spellcasting ability modifier damage. The chosen injuries then shift to their Healed state.`,
                    heightenDesc: `Healing increases by 2d8 per level.`,
            };
        case "mend":
            return {
                name: "Mend",
                    traits: "",
                    power: 3,
                    branch: "soul",
                    family: "Heal Injury",
                    element: "Fire",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You concentrate on your injuries and imbue them with powerful healing energy. Choose up to three of your own injuries that are active or healed. All of their HP damage is removed and the injuries immediately shift to the Recovery state.`,
                    heightenDesc: ``,
            };
        case "mass cure wounds":
            return {
                name: "Mass Cure Wounds",
                    traits: "",
                    power: 3,
                    branch: "restoration",
                    family: "Heal Injury",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "20 feet",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "2d12",
                    dmgType: "Wound",
                    dmgElem: "",
                    hldmg: "2d12",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: true,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create pain reducing water around those in need of aid. Choose an injury on each target creature to heal 2d12 + your spellcasting ability modifier damage then shift it to its Healed state. Any injury that is a wound has the healing doubled.`,
                    heightenDesc: `Healing increases by 2d12 per level.`,
            };
        case "rhapsody":
            return {
                name: "Rhapsody",
                    traits: "",
                    power: 3,
                    branch: "restoration",
                    family: "Heal Injury",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Wound",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You accelerate the healing of wounds in a target's body. All of the target creature's wound type injuries have their HP damage removed and the injuries immediately shift to the Recovery state.`,
                    heightenDesc: ``,
            };
        case "heal":
            return {
                name: "Heal",
                    traits: "",
                    power: 4,
                    branch: "health",
                    family: "Heal Injury",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You concentrate on a creature's painful injuries and imbue them with a powerful jolt of healing energy. Choose a target creature with active injuries. Choose up to three injuries that are active or healed. All of their HP damage is removed and the injuries immediately shift to the Recovery state. This spell also removes any diseases affecting the target.`,
                    heightenDesc: ``,
            };
        case "life weave":
            return {
                name: "Life Weave",
                    traits: "",
                    power: 4,
                    branch: "health",
                    family: "Heal Injury",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You imbue a creature you touch with powerful healing energy to undo a debilitating effect. You can perform one of the following effects on the target:
    
    • Reduce the target’s exhaustion level by two.
    • Remove any two wound or trauma type injuries in their recovery state.
    • Remove any fracture type injury in their recovery state.
    • Remove any single disease or poison on the target.`,
                    heightenDesc: ``,
            };
        case "purify":
            return {
                name: "Purify",
                    traits: "",
                    power: 4,
                    branch: "soul",
                    family: "Heal Injury",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 500,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cleanse your body of debilitating effects. You can perform one of the following effects on yourself: 
    
    • Remove all exhaustion penalties.
    • Remove any wound, trauma, or fracture type injuries in their recovery state.
    • Remove any single disease or poison.`,
                    heightenDesc: ``,
            };
        case "nightingale":
            return {
                name: "Nightingale",
                    traits: "",
                    power: 5,
                    branch: "health",
                    family: "Heal Injury",
                    element: "Wood",

                    spellslotcost: 5,
                    actionCost: "3",
                    trigger: "",
                    mana: 650,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You imbue the target creature with a massive amount of healing energy. All of the target creature's injuries have their HP damage removed and the injuries immediately shift to the Recovery state. If the creature is charmed, frightened, paralyzed, staggered, or stunned, the condition ends. If the creature is prone, it can use its reaction to stand up.`,
                    heightenDesc: ``,
            };
        case "true restoration":
            return {
                name: "True Restoration",
                    traits: "",
                    power: 5,
                    branch: "restoration",
                    family: "Heal Injury",
                    element: "Water",

                    spellslotcost: 5,
                    actionCost: "3",
                    trigger: "",
                    mana: 650,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "999",
                    dmgType: "Healing",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You imbue the target creature with a massive amount of healing energy. All of the target creature's injuries have their HP damage removed and the injuries immediately shift to the Recovery state. If the creature is charmed, frightened, paralyzed, staggered, or stunned, the condition ends. If the creature is prone, it can use its reaction to stand up.`,
                    heightenDesc: ``,
            };
        case "mirage":
            return {
                name: "Mirage",
                    traits: "Illusion",
                    power: 1,
                    branch: "light",
                    family: "Illusion",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "60 feet",
                    area: "15-foot-cube",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a duplicate of an image of an object, a creature, or some other visible phenomenon that fits within the area. The image must be a duplicate of another image within range. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.`,
                    heightenDesc: ``,
            };
        case "minor reflection":
            return {
                name: "Minor Reflection",
                    traits: "Illusion",
                    power: 1,
                    branch: "reflection",
                    family: "Illusion",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again. The illusion must mimic another object you can see. The object you mimic must be no larger than a 5-foot cube. The image can’t create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.
    
    If a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Investigation (Analyze) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.`,
                    heightenDesc: ``,
            };
        case "mirror image":
            return {
                name: "Mirror Image",
                    traits: "",
                    power: 2,
                    branch: "reflection",
                    family: "Illusion",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Three illusory images of you swirl about your space, potentially causing those who attack you to hit one of the images instead of you. Any attack that would hit you has a random chance of hitting one of your images instead of you. If all three images remain, there is a 1 in 4 chance of hitting you (1 on 1d4). With two images remaining, there is a 1 in 3 chance of hitting you (1–2 on 1d6). With only one image, the chances are 1 in 2 (1–3 on 1d6).
    
    Once an image is hit, it is destroyed. If an attack roll fails to hit your AC but doesn't critically fail, it destroys an image but has no additional effect (even if the attack would normally have an effect on a failure). If an attack roll is a critical success and would hit one of the images, one of the images is destroyed and the attack roll becomes a success against you. Once all the images are destroyed, the spell ends.`,
                    heightenDesc: ``,
            };
        case "greater reflection":
            return {
                name: "Greater Reflection",
                    traits: "Illusion",
                    power: 2,
                    branch: "reflection",
                    family: "Illusion",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "120 feet",
                    area: "30-foot-cube",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a duplicate of an image of an object, a creature, or some other visible phenomenon that fits within the area. The image must be a duplicate of another image within range. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.`,
                    heightenDesc: ``,
            };
        case "instant fake":
            return {
                name: "Instant Fake",
                    traits: "Illusion",
                    power: 3,
                    branch: "reflection",
                    family: "Illusion",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create an illusory duplicate of the target item. If you hold the charge on this spell, you can deliver it while touching an object you steal with Sleight of Hand (Palm); in this case, the illusion phases into existence exactly as you remove the genuine article, allowing you to instantaneously replace a protected or guarded item with no change in appearance, weight, or other factors.
    
    The illusion appears to be a perfect replica. The illusion isn’t a functional item, nor does it have any magical properties of the original. For example, an instant fake of a set of thieves’ tools can’t be used to pick a lock, a false warhammer can’t harm a person or break an object, and a suit of unreal chainmail offers no actual protection.`,
                    heightenDesc: ``,
            };
        case "heat adaption":
            return {
                name: "Heat Adaption",
                    traits: "",
                    power: 1,
                    branch: "firefundamental",
                    family: "Improve Ability",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "10 feet",
                    area: "",
                    targets: "Up to five target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Creature does not take any of the disadvantages for being in an area with a high temperature. This does not provide protection from flame or burn damage.@e:Ends after 8 hours]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You reduce the exhaustive effects of being in high heat environments by regulating temperature. The target does not take any of the disadvantages for being in an area with a high temperature. This does not provide protection from flame or burn damage.`,
                    heightenDesc: `Increase targets by 3 per level.`,
            };
        case "resistance":
            return {
                name: "Resistance",
                    traits: "",
                    power: 1,
                    branch: "soul",
                    family: "Improve Ability",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Once before the spell ends, the caster can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after making the saving throw. The spell then ends.`,
                    heightenDesc: ``,
            };
        case "unencumbered":
            return {
                name: "Unencumbered",
                    traits: "",
                    power: 1,
                    branch: "soul",
                    family: "Improve Ability",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Encumbrance is increased by 5 times their normal value.@e:Ends after 8 hours.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `The caster bolsters their own ability to handle and carry objects. The caster's encumbrance maximums increase by 5 times their normal values.`,
                    heightenDesc: ``,
            };
        case "lift":
            return {
                name: "Lift",
                    traits: "",
                    power: 1,
                    branch: "power",
                    family: "Improve Ability",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "4 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Encumbrance is increased by 4 times their normal value.@e:Ends after 4 hours.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `The caster bolsters the lift capacity of those they touch. Targets of this spell have their encumbrance maximums increase by 4 times their normal values for the duration of the spell.`,
                    heightenDesc: ``,
            };
        case "grasp":
            return {
                name: "Grasp",
                    traits: "",
                    power: 1,
                    branch: "power",
                    family: "Improve Ability",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "R",
                    trigger: "When you critically fail a Climb check and start falling.",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can immediately attempt another Athletics (Climb) check at a –2 penalty. If successful, you don’t fall, but you don’t progress at climbing.`,
                    heightenDesc: ``,
            };
        case "cold adaption":
            return {
                name: "Cold Adaption",
                    traits: "",
                    power: 1,
                    branch: "waterfundamental",
                    family: "Improve Ability",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "10 feet",
                    area: "",
                    targets: "Up to five target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Creature does not take any of the disadvantages for being in an area with a low temperature. This does not provide protection from ice or cold damage.@e:Ends after 8 hours]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You reduce the exhaustive effects of being in cold environments by regulating temperature. The target does not take any of the disadvantages for being in an area with a low temperature. This does not provide protection from ice or cold damage.`,
                    heightenDesc: `Increase targets by 3 per level.`,
            };
        case "true strike":
            return {
                name: "True Strike",
                    traits: "",
                    power: 1,
                    branch: "time",
                    family: "Improve Ability",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 100,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Until the end of your turn",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You prepare a spell to slow down time to line up a perfect shot. The next time you make an attack roll before the end of your turn, you have advantage on that attack. `,
                    heightenDesc: ``,
            };
        case "ashen path":
            return {
                name: "Ashen Path",
                    traits: "Sustain",
                    power: 2,
                    branch: "smoke",
                    family: "Improve Ability",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "10 feet",
                    area: "",
                    targets: "Up to two target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Creature suffers no ill effects from natural airborne irritants or contaminants and gains a +4 bonus on saving throws against magical effects that involve any of these contaminants. In addition, the creature can see through obscuring effects caused by dense ash, smoke, fog, or similar concealment up to a distance of 60 feet, although this spell does nothing to enhance sight in dark or shadowy conditions.@e:Ends after This effect lasts for 1 hour]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You grant the ability to breathe with ease air that is contaminated with ash, spores, smoke, dust, or the like. Target creatures suffers no ill effects from natural airborne irritants or contaminants and gains a +4 bonus on saving throws against magical effects that involve any of these contaminants. In addition, the creature can see through obscuring effects caused by dense ash, smoke, fog, or similar concealment up to a distance of 60 feet, although this spell does nothing to enhance sight in dark or shadowy conditions.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "unburden":
            return {
                name: "Unburden",
                    traits: "Sustain",
                    power: 2,
                    branch: "gravity",
                    family: "Improve Ability",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "30 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Quickened@d:Extra action can only be used for Strike and Stride actions.@e:Ends after 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `The target becomes more nimble as gravity has a reduced effect on the target. It gains the quickened condition and can use the extra action each round only for Strike and Stride actions. The creature's weight is halved.`,
                    heightenDesc: ``,
            };
        case "water breathing":
            return {
                name: "Water Breathing",
                    traits: "",
                    power: 2,
                    branch: "fluid",
                    family: "Improve Ability",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Touch",
                    area: "",
                    targets: "Up to five target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "8 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Creature can freely use any breath weapon, speak, or other abilities while submerged.@e:Ends after 8 hours]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can easily make water breathable with your magic. The target can freely use any breath weapon, speak, or other abilities while submerged.`,
                    heightenDesc: `Increase targets by 3 per level.`,
            };
        case "alacrity":
            return {
                name: "Alacrity",
                    traits: "Sustain",
                    power: 2,
                    branch: "time",
                    family: "Improve Ability",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "30 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Quickened@d:Extra action can only be used for Interact, Step, Strike, and Stride actions@e:Caster concentration up to 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `The target perceives time much slower allowing them to move more effectively during battle. It gains the quickened condition and can use the extra action each round only for Interact, Step, Strike, and Stride actions. `,
                    heightenDesc: ``,
            };
        case "embolden":
            return {
                name: "Embolden",
                    traits: "Sustain",
                    power: 3,
                    branch: "power",
                    family: "Improve Ability",
                    element: "Earth",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Gains a +2 bonus to all Strength, Dexterity, and Constitution based attack rolls, saving throws, and skill checks@e:Ends after 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You bolster the target's physical capabilities. The target gains a +2 bonus to all Strength, Dexterity, and Constitution based attack rolls, saving throws, and skill checks.`,
                    heightenDesc: `Increase bonuses by +1 per level.`,
            };
        case "overcome":
            return {
                name: "Overcome",
                    traits: "",
                    power: 3,
                    branch: "power",
                    family: "Improve Ability",
                    element: "Earth",

                    spellslotcost: 3,
                    actionCost: "1",
                    trigger: "",
                    mana: 350,

                    range: "30 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Until the start of your next turn",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Creature gains a +4 bonus to Strength saving throws@e:Ends after 1 round.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You give a creature the strength to overcome. The creature gains a +4 bonus to Strength saving throws until the start of your next turn.`,
                    heightenDesc: ``,
            };
        case "nimble dodge":
            return {
                name: "Nimble Dodge",
                    traits: "",
                    power: 3,
                    branch: "power",
                    family: "Improve Ability",
                    element: "Earth",

                    spellslotcost: 3,
                    actionCost: "1",
                    trigger: "",
                    mana: 350,

                    range: "30 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Until the start of your next turn",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Creature gains a +4 bonus to Dexterity saving throws @e:Ends after 1 round]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You improve a target's reflexes. The creature gains a +4 bonus to Dexterity saving throws until the start of your next turn.`,
                    heightenDesc: ``,
            };
        case "foresight":
            return {
                name: "Foresight",
                    traits: "Renitence, Sustain",
                    power: 4,
                    branch: "power",
                    family: "Improve Ability",
                    element: "Earth",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 550,

                    range: "30 feet",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "Until the start of your next turn",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:The first time creature makes an attack roll or skill check, they roll with advantage @e:Ends after 1 round] ",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You bolster a creature's focus to allow them to read movements more clearly. The first time each target makes an attack roll or skill check, they roll with advantage. `,
                    heightenDesc: ``,
            };
        case "feather fall":
            return {
                name: "Feather Fall",
                    traits: "",
                    power: 1,
                    branch: "wind",
                    family: "Improve Movement",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "R",
                    trigger: "When a creature within range is falling.",
                    mana: 50,

                    range: "120 feet",
                    area: "",
                    targets: "Up to six falling creatures",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage, can land on its feet, and the spell ends for that creature.`,
                    heightenDesc: ``,
            };
        case "leap":
            return {
                name: "Leap",
                    traits: "",
                    power: 1,
                    branch: "soul",
                    family: "Improve Movement",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:When creture takes the long jump or high jump action action their leap distance is tripled@e:Ends after 1 minute.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your legs surge with strength, ready to leap high and far. You jump 30 feet in any direction without touching the ground. You must land on a space of solid ground within 30 feet of you, or else you fall after using your next action.`,
                    heightenDesc: ``,
            };
        case "feather step":
            return {
                name: "Feather Step",
                    traits: "",
                    power: 1,
                    branch: "soul",
                    family: "Improve Movement",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `For the duration of this spell, you ignores the adverse movement effects of difficult terrain.`,
                    heightenDesc: ``,
            };
        case "ascent":
            return {
                name: "Ascent",
                    traits: "Sustain",
                    power: 1,
                    branch: "power",
                    family: "Improve Movement",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "Up to two target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:When creture takes the long jump or high jump action action their leap distance is doubled@e:Ends after 1 minute.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You imbue a creature with greater jumping power. When targets take the long jump or high jump action action their leap distance is doubled.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "root":
            return {
                name: "Root",
                    traits: "Sustain",
                    power: 1,
                    branch: "gravity",
                    family: "Improve Movement",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "30 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Whenever the target fails a check to resist being pushed, they may attempt the check again in order to resist the forced movement effects of the check. Anything else associated with the effects like damage still apply.@e:Caster concentration up to 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You compel forces to weigh you down when being forced away from their position. Whenever the target fails a check to resist being pushed, they may attempt the check again in order to resist the forced movement effects of the check. Anything else associated with the effects like damage still apply.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "zephyr":
            return {
                name: "Zephyr",
                    traits: "Sustain",
                    power: 2,
                    branch: "soul",
                    family: "Improve Movement",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You move with a sprint. Until the spell ends, your movement doesn’t provoke opportunity attacks. Once before the spell ends, you can give yourself advantage on one weapon attack roll on your turn. That attack deals an extra 1d8 force (fire) damage on a hit. Whether you hit or miss, your walking speed increases by 30 feet until the end of that turn.`,
                    heightenDesc: ``,
            };
        case "reposition":
            return {
                name: "Reposition",
                    traits: "",
                    power: 2,
                    branch: "power",
                    family: "Improve Movement",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "3",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You command magic to hasten your allies. Each target may immediately take one action to either step or stride.`,
                    heightenDesc: ``,
            };
        case "levitate":
            return {
                name: "Levitate",
                    traits: "Sustain",
                    power: 2,
                    branch: "force",
                    family: "Improve Movement",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "",
                    targets: "Targets one unattended object or willing creature.",
                    targerCode: "",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your control over forces allows you to raise or lower targets as you see fit. For the duration of the spell, you can move the target up or down 10 feet with a single action, which has the concentrate trait. A creature floating in the air from levitate takes a –2 circumstance penalty to attack rolls. A floating creature can spend an Interact action to stabilize itself and negate this penalty for the remainder of its turn. If the target is adjacent to a fixed object or terrain of suitable stability, it can move across the surface by climbing (if the surface is vertical, like a wall) or crawling (if the surface is horizontal, such as a ceiling). The GM determines which surfaces can be climbed or crawled across.`,
                    heightenDesc: ``,
            };
        case "air walk":
            return {
                name: "Air Walk",
                    traits: "Sustain",
                    power: 3,
                    branch: "wind",
                    family: "Improve Movement",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Touch",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Creature can walk on air as if it were solid ground. It can ascend and descend in this way at a maximum of a 45-degree angle. @e:Ends after 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `The target can walk on air as if it were solid ground. It can ascend and descend in this way at a maximum of a 45-degree angle.`,
                    heightenDesc: ``,
            };
        case "floating ice":
            return {
                name: "Floating Ice",
                    traits: "",
                    power: 3,
                    branch: "storm",
                    family: "Improve Movement",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a 10 foot cube of ice that floats with controlled bursts of wind beneath it. The ice has a 30 ft. flying speed for the duration. Up to 4 medium sized creatures may comfortably sit on the ice and fly with it. 
    
    If the ice is attacked, all creatures riding on the ice must make a DC 10 Dexterity saving throw or fall off the floating ice.
    
    When the spell ends, the ice falls if it is still aloft, unless it can stop the fall. The ice must remain in the range of the caster to remain in flight or else the spell will end prematurely.`,
                    heightenDesc: ``,
            };
        case "detect radiation":
            return {
                name: "Detect Radiation",
                    traits: "",
                    power: 1,
                    branch: "radiation",
                    family: "Improve Senses",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You detect radiation in the surrounding area. You see radioactive auras as a glowing green shimmer in the air that emanates from radioactive objects; the brighter and more intense the green, the more powerful the radioactivity. This glow does not provide illumination or allow you to see in darkness, apart from being able to see the glow itself. The spell can penetrate barriers, but 3 feet of dirt or wood, 1 foot of stone, 1 inch of common metal, or a thin sheet of lead blocks it—although radiation can seep into such barriers, causing them to become radioactive (and thus visible to the spell) in time.`,
                    heightenDesc: ``,
            };
        case "know weather":
            return {
                name: "Know Weather",
                    traits: "",
                    power: 1,
                    branch: "storm",
                    family: "Improve Senses",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You predict what the weather will be like in 24 hours and know which direction is north.`,
                    heightenDesc: ``,
            };
        case "scent":
            return {
                name: "Scent",
                    traits: "",
                    power: 2,
                    branch: "wind",
                    family: "Improve Senses",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `This spell allows a creature to detect approaching enemies, sniff out hidden foes, and track by sense of smell. The creature can detect opponents within 30 feet by sense of smell. If the opponent is upwind, the range increases to 60 feet; if downwind, it drops to 15 feet. Strong scents, such as smoke or rotting garbage, can be detected at twice the ranges noted above. Overpowering scents, such as skunk musk or troglodyte stench, can be detected at triple normal range. When a creature detects a scent, the exact location of the source is not revealed—only its presence somewhere within range. The creature can take a move action to note the direction of the scent. When the creature is within 5 feet of the source, it pinpoints the source’s location. A creature with the scent ability can follow tracks by smell, making a Survival (Wisdom) check to find or follow a track. The typical DC for a fresh trail is reduced by 10 with the scent ability. Creatures tracking by scent ignore the effects of surface conditions and poor visibility.`,
                    heightenDesc: ``,
            };
        case "darkvision":
            return {
                name: "Darkvision",
                    traits: "",
                    power: 2,
                    branch: "light",
                    family: "Improve Senses",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: " ",
                    duration: "1 day",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your eyes adjust to the absence of light allowing the caster to see in darkness out to a 60 foot range.`,
                    heightenDesc: ` Increase the range of darkvision by 30 feet per slot level above 1st.`,
            };
        case "darksight":
            return {
                name: "Darksight",
                    traits: "",
                    power: 2,
                    branch: "shadow",
                    family: "Improve Senses",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 day",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your eyes adjust to the absence of light allowing the caster to see in darkness out to a 120 foot range.`,
                    heightenDesc: ` Increase the range of darkvision by 30 feet per slot level above 1st.`,
            };
        case "tremorsense":
            return {
                name: "Tremorsense",
                    traits: "",
                    power: 2,
                    branch: "tremor",
                    family: "Improve Senses",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You attune yourself to the subtle fluctuations in the ground around you. For the duration of the spell the caster can automatically pinpoint the location of anything that is in contact with the ground out to 60 feet.`,
                    heightenDesc: ``,
            };
        case "blindsense":
            return {
                name: "Blindsense",
                    traits: "",
                    power: 2,
                    branch: "ether",
                    family: "Improve Senses",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `By opening your senses to the spirit world, you can detect the presence of any physical objects or creatures within 500 feet. Details other than size and count are difficult to discern.`,
                    heightenDesc: ``,
            };
        case "aquasense":
            return {
                name: "Aquasense",
                    traits: "",
                    power: 2,
                    branch: "fluid",
                    family: "Improve Senses",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You attune yourself to the subtle fluctuations in the water around you. For the duration of the spell the caster can automatically pinpoint the location of anything that is in contact with water out to 60 feet.
    
    This also works in mist but to a reduced range, negating any form of obscurity caused by a mist or fog within 10 ft.`,
                    heightenDesc: ``,
            };
        case "true sight":
            return {
                name: "True Sight",
                    traits: "",
                    power: 3,
                    branch: "ether",
                    family: "Improve Senses",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You attune your sight to see past any material ether. You see Illusions and ethereal objects within 120 feet of you with a faint glow. If you concentrate you can see through these objects.`,
                    heightenDesc: ``,
            };
        case "greater tremorsense":
            return {
                name: "Greater Tremorsense",
                    traits: "",
                    power: 4,
                    branch: "tremor",
                    family: "Improve Senses",
                    element: "Earth",

                    spellslotcost: 4,
                    actionCost: "1",
                    trigger: "",
                    mana: 500,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You attune yourself to the subtle fluctuations in the ground around you. The caster can automatically pinpoint the location, shape, and size of anything that is in contact with the ground out to 300 feet. `,
                    heightenDesc: ``,
            };
        case "fleet footed":
            return {
                name: "Fleet Footed",
                    traits: "",
                    power: 1,
                    branch: "soul",
                    family: "Improve Speed",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You quicken your reflexes for the duration of the spell. You gain the quickened condition and can use the extra action each round only for the Stride action.`,
                    heightenDesc: ``,
            };
        case "longstrider":
            return {
                name: "Longstrider",
                    traits: "",
                    power: 1,
                    branch: "earthfundamental",
                    family: "Improve Speed",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "3",
                    trigger: "",
                    mana: 50,

                    range: "10 feet",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "4 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:After 1 minute of running, targets gain 20 feet of movement until they stop striding. @e:Ends after 4 hours]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You enhance a creature's speed so that they may be quicker when sprinting. After 1 minute of running, targets gain 20 feet of movement until they stop striding.`,
                    heightenDesc: ``,
            };
        case "fleet step":
            return {
                name: "Fleet Step",
                    traits: "Sustain",
                    power: 1,
                    branch: "power",
                    family: "Improve Speed",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "30 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: " ",
                    onSuccess: "[Spec@d:Gain +10 to speed. @e:Ends after 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You grant the target a +10 feet bonus to speed.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "swift swim":
            return {
                name: "Swift Swim",
                    traits: "",
                    power: 1,
                    branch: "waterfundamental",
                    family: "Improve Speed",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "up to 4 hours",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Gain 30 foot swim speed or 10 additional swim speed. @e:Ends after 4 hours]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `When you cast this spell you choose up to 3 target creatures who gain a swim speed of 30 feet. If the target creature already has a swim speed, they instead can choose to gain 10 feet of speed on top of their swim speed.`,
                    heightenDesc: `Increase the duration by 2 hours per slot level above 1st.`,
            };
        case "soar":
            return {
                name: "Soar",
                    traits: "Sustain",
                    power: 2,
                    branch: "wind",
                    family: "Improve Speed",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "300 feet",
                    area: "",
                    targets: "Two target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Gain a 30 feet fly speed. Targets must remain in the range of the caster to remain in flight or else the spell will end prematurely. @e:Ends after 10 minutes]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Controlled bursts of wind around the target allow them to fly in the air. Targets gain a 30 feet fly speed. Targets must remain in the range of the caster to remain in flight or else the spell will end prematurely.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "jet":
            return {
                name: "Jet",
                    traits: "Sustain",
                    power: 2,
                    branch: "flame",
                    family: "Improve Speed",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Gain a 40 feet fly speed @e:Ends after 10 minutes]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Using a concentrated burst of fire beneath the user’s feet and hands, the spellcaster is able to achieve flight. You gain a 40 feet fly speed.`,
                    heightenDesc: ``,
            };
        case "fast climb":
            return {
                name: "Fast Climb",
                    traits: "Sustain",
                    power: 2,
                    branch: "soul",
                    family: "Improve Speed",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Gain a climbing speed equal to land speed and can move up, down, and across vertical surfacesand upside down along ceilings, while leaving its hands free @e:Ends after 1 minute.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Using magic, you create anchors in your feet to lock yourself in place when climbing vertical walls. Until the spell ends, the caster gains a climbing speed equal to their movement speed and gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving its hands free. In addition, you have advantage on checks against effects that push you.`,
                    heightenDesc: ``,
            };
        case "group climb":
            return {
                name: "Group Climb",
                    traits: "Sustain",
                    power: 2,
                    branch: "power",
                    family: "Improve Speed",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "30 feet",
                    area: "",
                    targets: "Up to three target creatures",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Gain a climbing speed equal to 15 feet and can move up, down, and across vertical surfaces while leaving its hands free @e:Ends after 1 minute.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Extending magic outward to others, you allow them to stick to vertical walls. Until the spell ends, targets gain a climbing speed equal to 15 feet and can move up, down, and across vertical surfaces while leaving its hands free.`,
                    heightenDesc: `Increase targets by 2 per level.`,
            };
        case "burrow":
            return {
                name: "Burrow",
                    traits: "",
                    power: 2,
                    branch: "tremor",
                    family: "Improve Speed",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You move earth around you so that you can easily traverse through it. The caster gains a 15 feet burrow speed.`,
                    heightenDesc: ``,
            };
        case "sleep":
            return {
                name: "Sleep",
                    traits: "Renitence",
                    power: 1,
                    branch: "toxin",
                    family: "Incapacitate",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 50,

                    range: "30 feet",
                    area: "5-foot-radius sphere",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The creature falls unconscious. If it's still unconscious after 1 hour, it wakes up automatically.",
                    success: "The creature falls unconscious. If it's still unconscious after 1 minute, it wakes up automatically.",
                    failure: "The creature takes a -1 penalty to Perception checks for 1 round.",
                    critFailure: "",

                    onCritSuccess: "[Unconscious@e:Can wake up with a DC 10 sense pressence check. If still unconscious after 1 hour, it wakes up automatically]",
                    onSuccess: "[Unconscious@e:Can wake up with a DC 10 sense pressence check. If still unconscious after 1 minute, it wakes up automatically]",
                    onFailure: "[Spec@d:The creature takes a -1 penalty to Perception checks @e:Ends after 1 round]",
                    onCritFailure: "",

                    desc: `Spores fill the area causing drowziness and might cause sleep. The effect is determined by the target's save.
    
    A creature that falls unconscious from this spell doesn't fall prone or release what it's holding. This spell doesn't prevent creatures from waking up due to a successful Perception check, limiting its utility in combat.`,
                    heightenDesc: ``,
            };
        case "slumber":
            return {
                name: "Slumber",
                    traits: "Renitence",
                    power: 2,
                    branch: "toxin",
                    family: "Incapacitate",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "40 foot cone",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The creature falls unconscious. If it's still unconscious after 1 hour, it wakes up automatically.",
                    success: "The creature becomes staggered (1). At the end of their turn, the creature must make another Constitution saving throw against the caster's spellcasting DC. On a failure the creature falls unconscious.",
                    failure: "The creature takes a -1 penalty to Perception checks for 1 round.",
                    critFailure: "",

                    onCritSuccess: "[Unconscious@e:Ends if it takes any damage or if someone else uses an action to shake the creature. If still unconscious after 1 hour, it wakes up automatically]",
                    onSuccess: "[Staggered, Staggered 1@e: The creature must make a {DC} Constitution Save at the end of their turn. On a failure the creature falls unconscious]",
                    onFailure: "[Spec@d:The creature takes a -1 penalty to Perception checks @e:Ends after 1 round]",
                    onCritFailure: "",

                    desc: `Powerful sleep spores emerge from your finger tips. The effect is determined by the target's save.
    
    The spell ends for an uncnscious creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor.`,
                    heightenDesc: ``,
            };
        case "hold person":
            return {
                name: "Hold Person",
                    traits: "Renitence",
                    power: 2,
                    branch: "blood",
                    family: "Incapacitate",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "60 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target is paralyzed for 1 minute. The creature may make a Constitution saving throw at the end of their turn to remove the effect.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Paralyzed@e:Ends after 1 minute. The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You halt the flow of blood to the target’s muscles causing them to freeze in place. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "seize":
            return {
                name: "Seize",
                    traits: "Renitence",
                    power: 4,
                    branch: "blood",
                    family: "Incapacitate",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "3",
                    trigger: "",
                    mana: 500,

                    range: "60 feet",
                    area: "",
                    targets: "One target creature",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The target is paralyzed for 3 rounds. ",
                    success: "The target is knocked prone and paralyzed for 3 rounds. If the creature is harmed, at the end of each of their turns they may make another Constitution saving throw. On success, the creature is no longer paralyzed.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Prone][Paralyzed@e:Ends after 3 rounds]",
                    onSuccess: "[Paralyzed@e:Ends after 3 rounds. If the target is harmed, the creature may make a {DC} Constitution Save at the end of their turns to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You halt the flow of blood to the target’s body, causing them to collapse to the ground and seize. The effect is determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "cardiac seizure":
            return {
                name: "Cardiac Seizure",
                    traits: "Renitence",
                    power: 5,
                    branch: "blood",
                    family: "Incapacitate",
                    element: "Metal",

                    spellslotcost: 5,
                    actionCost: "3",
                    trigger: "",
                    mana: 650,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Stunned@e:The creature may make a {DC} Constitution Save at the start of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You twist the creature's blood causing them to tense up and freeze in place. If the target has 50 hit points or fewer, it is stunned. Otherwise, the spell has no effect.
    
    The stunned target must make a Constitution saving throw at the end of each of its turns. On a successful save, this stunning effect ends.`,
                    heightenDesc: ``,
            };
        case "calmed surge":
            return {
                name: "Calmed Surge",
                    traits: "",
                    power: 2,
                    branch: "mana",
                    family: "Mana Control",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Perform a Surge action as part of the casting of this spell. Reduce any Vitality damage taken by the surge by 2.`,
                    heightenDesc: ``,
            };
        case "mana release":
            return {
                name: "Mana Release",
                    traits: "",
                    power: 2,
                    branch: "mana",
                    family: "Mana Control",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "3",
                    trigger: "",
                    mana: 400,

                    range: "60 feet",
                    area: "",
                    targets: "One target",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You find lingering magical energy on the target and transform it into ether. If the target is a creature, any spell of power 2 or lower on the target ends. If the target is a terrain or structure and it was created by a spell of power 2 or lower, the effect disappears. `,
                    heightenDesc: `You may end the effects of a spell equal to the power you heighten this spell.`,
            };
        case "ether release":
            return {
                name: "Ether Release",
                    traits: "",
                    power: 2,
                    branch: "ether",
                    family: "Mana Control",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 400,

                    range: "Touch",
                    area: "",
                    targets: "One target",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You find lingering magical energy on the target and transform it into ether. If the target is a terrain or structure and it was created by a spell of power 2 or lower, the effect disappears. `,
                    heightenDesc: `You may end the effects of a spell equal to the power you heighten this spell.`,
            };
        case "duplicate evocation":
            return {
                name: "Duplicate Evocation",
                    traits: "",
                    power: 2,
                    branch: "reflection",
                    family: "Mana Control",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Choose the most recent evocation spell of power 2 or lower that has been cast within the last round and has no duration. You immediately cast the spell.`,
                    heightenDesc: `You may target a spell equal to the power you heighten this spell.`,
            };
        case "counterspell":
            return {
                name: "Counterspell",
                    traits: "",
                    power: 3,
                    branch: "mana",
                    family: "Mana Control",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "R",
                    trigger: "When another creature within range casts a spell.",
                    mana: 450,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of power 2 or lower, make a spell effect check where the DC equals 20 + the target spell’s power. On a success, the creature’s spell fails and has no effect.`,
                    heightenDesc: `You may end the effects of a spell equal to the power you heighten this spell.`,
            };
        case "innervate":
            return {
                name: "Innervate",
                    traits: "",
                    power: 3,
                    branch: "mana",
                    family: "Mana Control",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "R",
                    trigger: "When another creature within range heightens a spell.",
                    mana: 200,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You give the caster back the amount of ki spent to increase the power of the spell.`,
                    heightenDesc: ``,
            };
        case "boost surge":
            return {
                name: "Boost Surge",
                    traits: "",
                    power: 3,
                    branch: "mana",
                    family: "Mana Control",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:Gain an extra 200 ki when surging. @e:Ends after 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `When the target of this spell surges, they gain an additional 200 Ki.`,
                    heightenDesc: ``,
            };
        case "mana battery":
            return {
                name: "Mana Battery",
                    traits: "",
                    power: 4,
                    branch: "mana",
                    family: "Mana Control",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "R",
                    trigger: "When another creature within range casts a spell.",
                    mana: 400,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You transfer your own mana to another creature to help cast a spell. The target of this spell gains 300 Mana that must be used towards the casting of the triggering spell.`,
                    heightenDesc: ``,
            };
        case "mana drain":
            return {
                name: "Mana Drain",
                    traits: "",
                    power: 4,
                    branch: "mana",
                    family: "Mana Control",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "2",
                    trigger: "",
                    mana: 400,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Attack",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Make a melee spell attack against a target. On hit, this spell drains 1d6 x 50 Ki from the target and you restore the same amount.`,
                    heightenDesc: ``,
            };
        case "sustained mana":
            return {
                name: "Sustained Mana",
                    traits: "",
                    power: 4,
                    branch: "mana",
                    family: "Mana Control",
                    element: "Wood",

                    spellslotcost: 4,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "One target",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Choose one spell with a sustained duration that your target has in effect. The target can Sustain the Spell once as a free action, triggered at the start of their next turn.`,
                    heightenDesc: ``,
            };
        case "venom":
            return {
                name: "Venom",
                    traits: "Sustain",
                    power: 1,
                    branch: "toxin",
                    family: "Mark Target",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "60 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:{Name} deals an extra 1d6 damage with strikes@e:Caster concentration up to 1 hour]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You choose a creature you can see within range and imbue them with a small amount of poison that activates upon your strikes. Until the spell ends, you deal an extra 1d6 damage to the target whenever you deal damage with the strike action.`,
                    heightenDesc: ``,
            };
        case "blood mark":
            return {
                name: "Blood Mark",
                    traits: "Sustain",
                    power: 1,
                    branch: "blood",
                    family: "Mark Target",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "100 miles",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:{Name} deals an extra 1d6 damage with strikes@e:Caster concentration up to 1 hour]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You choose a creature who’s blood you have a sample of. The blood rizes before you, pointing in the direction of the creature that was its original owner as long as they are within range. The caster knows how far away the target creature is to the closest 100 foot increment.
    
    Until the spell ends, you deal an extra 1d6 damage to the target whenever you deal damage with the strike action.`,
                    heightenDesc: ``,
            };
        case "ethereal mark":
            return {
                name: "Ethereal Mark",
                    traits: "Sustain",
                    power: 1,
                    branch: "ether",
                    family: "Mark Target",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "90 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:{Name} deals an extra 1d6 damage with strikes@e:Caster concentration up to 1 hour]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You choose a creature you can see within range and mark their ki through the spirit plane. Until the spell ends, you deal an extra 1d6 damage to the target whenever you deal damage with the strike action.
    
    In addition, you have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it.`,
                    heightenDesc: ``,
            };
        case "distant whisper":
            return {
                name: "Distant Whisper",
                    traits: "",
                    power: 1,
                    branch: "woodfundamental",
                    family: "Message",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "100 miles",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You send a message or sound on the wind to a designated spot. The whispering wind travels to a specific location within range that is familiar to you, provided that it can find a way to the location. The whisper can also travel to a specific Ventu stone if the caster knows its resonance frequency. The spell is as gentle and unnoticed as a zephyr until it reaches the location. It then delivers its whisper-quiet message or other sound to the closest person to the location or until a user releases the message in the Ventu stone. The spell then dissipates.
    
    You can prepare the spell to bear a message of no more than 20 words. The spell moves at 100 miles per hour. If the wind cannot reach the destination within the duration, the spell automatically fails.`,
                    heightenDesc: ``,
            };
        case "whisper":
            return {
                name: "Whisper",
                    traits: "",
                    power: 1,
                    branch: "wind",
                    family: "Message",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You whisper a message on the wind to send a short message to a nearby target. The target (and only the target) hears the message and can reply in a whisper that only you can hear.`,
                    heightenDesc: ``,
            };
        case "message":
            return {
                name: "Message",
                    traits: "",
                    power: 1,
                    branch: "ether",
                    family: "Message",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "120 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You manipulate ether to send a short message to a nearby target. The target (and only the target) hears the message and can reply in a whisper that only you can hear.`,
                    heightenDesc: ``,
            };
        case "ghost sound":
            return {
                name: "Ghost Sound",
                    traits: "",
                    power: 1,
                    branch: "sound",
                    family: "Message",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a sound within range that lasts for the duration or until you dismiss it as an action or cast this spell again.
    
    The sound’s volume can range from a whisper to a scream. It can be your voice, someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.
    
    If a creature uses its action to examine the sound, the creature can determine that it is a false effect with a successful Analyze action against your spell save DC.`,
                    heightenDesc: ``,
            };
        case "transmission":
            return {
                name: "Transmission",
                    traits: "",
                    power: 1,
                    branch: "sound",
                    family: "Message",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "3",
                    trigger: "",
                    mana: 50,

                    range: "10 miles",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You send all sounds within a 15 meter radius on the wind to a designated spot. The sound travels to a specific location within range that is familiar to you, provided that it can find a way to the location. The sound can also travel to a specific Ventu stone if the caster knows its resonance frequency. The spell is completely unnoticeable until it reaches the location. It then delivers its recording to the location at the same decibel level as the source sound.
    
    The spell continuously delivers the spell as long as the caster concentrates on the spell. The spell moves at 100 miles per hour.`,
                    heightenDesc: ``,
            };
        case "whispering wind":
            return {
                name: "Whispering Wind",
                    traits: "",
                    power: 2,
                    branch: "wind",
                    family: "Message",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Limitless",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Special",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You send a message or sound on the wind to a designated spot. The whispering wind travels to a specific location within range that is familiar to you, provided that it can find a way to the location. The whispering wind can also travel to a specific Ventu stone if the caster knows its resonance frequency. A whispering wind is as gentle and unnoticed as a zephyr until it reaches the location. It then delivers its whisper-quiet message or other sound regardless of whether a person is there or until a user releases the message in the Ventu stone. The wind then dissipates.
    
    You can prepare the spell to bear a message of no more than 50 words, cause the spell to deliver other sounds for 1 round, or merely have the whispering wind seem to be a faint stirring of the air. You can likewise cause the whispering wind to move as slowly as 1 mile per hour or as quickly as 100 miles per hour.
    
    When the spell reaches its objective, it speaks its message in a whisper to whomever closest to the location. Whispering wind cannot speak verbal components, use command words, or activate magical effects.`,
                    heightenDesc: ``,
            };
        case "skywrite":
            return {
                name: "Skywrite",
                    traits: "",
                    power: 2,
                    branch: "nimbus",
                    family: "Message",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "3",
                    trigger: "",
                    mana: 200,

                    range: "Sight",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause up to ten words to form in a part of the sky you can see. The words appear to be made of cloud and remain in place for the spell’s duration. The words dissipate when the spell ends. A strong wind can disperse the clouds and end the spell early.`,
                    heightenDesc: ``,
            };
        case "sculpt sound":
            return {
                name: "Sculpt Sound",
                    traits: "",
                    power: 2,
                    branch: "sound",
                    family: "Message",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Touch",
                    area: "",
                    targets: "One target creature or object.",
                    targerCode: "",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You change the sounds made by a creature or object. Choose how you're altering the sounds when you Cast the Spell; you can't alter it later. You can cause something that didn't create a sound to make sound, alter the voice of a creature, amplify or deaden a sound, or transform one sound into another. A creature who succeeds at a Perception check against your spell DC can determine that the sound was altered by an illusion, including hearing faint sounds if you deadened the sound, but they can't determine the true sound unless they critically succeed at the Perception check. `,
                    heightenDesc: ``,
            };
        case "telegram":
            return {
                name: "Telegram",
                    traits: "",
                    power: 2,
                    branch: "sound",
                    family: "Message",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Limitless",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Special",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You send a message or sound to a designated spot. The telegram travels to a specific location within range that is familiar to you, provided that it can find a way to the location. The telegram can also travel to a specific Ventu stone if the caster knows its resonance frequency. A telegram is completely quiet until it reaches the location. It then delivers its message or other sound regardless of whether a person is there or until a user releases the message in the Ventu stone. The telegram then dissipates.
    
    You can prepare the spell to bear a message of no more than 200 words, cause the spell to deliver other sounds for 1 round, or merely have the telegram seem to be a faint stirring of the air. The telegram moves at 100 miles per hour.
    
    When the spell reaches its objective, it speaks its message in a whisper to whomever closest to the location. Telegram cannot speak verbal components, use command words, or activate magical effects.`,
                    heightenDesc: ``,
            };
        case "telepathy":
            return {
                name: "Telepathy",
                    traits: "Linguistic",
                    power: 3,
                    branch: "ether",
                    family: "Message",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can communicate on strands of ether with one other creature. Once you establish a connection by communicating with a creature, the communication is two-way. `,
                    heightenDesc: ``,
            };
        case "shape fiber":
            return {
                name: "Shape Fiber",
                    traits: "",
                    power: 1,
                    branch: "plantation",
                    family: "Shape Dust",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 10,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeplants",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate flexible, non-complex, wood-aspected dust to craft objects. You take the Shape Plant action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape wood":
            return {
                name: "Shape Wood",
                    traits: "",
                    power: 1,
                    branch: "plantation",
                    family: "Shape Dust",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 10,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeplants",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate sturdy, non-complex, wood-aspected dust to craft objects. You take the Shape Plant action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape clay":
            return {
                name: "Shape Clay",
                    traits: "",
                    power: 1,
                    branch: "firefundamental",
                    family: "Shape Dust",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 10,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeearth",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate non-transparent, non-complex, fire-aspected dust to craft objects. You take the Shape Earth action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape glass":
            return {
                name: "Shape Glass",
                    traits: "",
                    power: 1,
                    branch: "glass",
                    family: "Shape Dust",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 10,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeglass",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate transparent, non-complex, fire-aspected dust to craft objects. You take the Shape Glass action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape earth":
            return {
                name: "Shape Earth",
                    traits: "",
                    power: 1,
                    branch: "rock",
                    family: "Shape Dust",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 10,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeearth",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate non-complex, earth-aspected dust to craft objects. You take the Shape Earth action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape metal":
            return {
                name: "Shape Metal",
                    traits: "",
                    power: 1,
                    branch: "forge",
                    family: "Shape Dust",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 10,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapemetal",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate non-complex, metal-aspected dust to craft objects. You take the Shape Metal action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape ice":
            return {
                name: "Shape Ice",
                    traits: "",
                    power: 1,
                    branch: "ice",
                    family: "Shape Dust",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 10,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeice",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate non-complex, water-aspected dust to craft objects. You take the Shape Ice action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape ironwood":
            return {
                name: "Shape Ironwood",
                    traits: "",
                    power: 2,
                    branch: "plantation",
                    family: "Shape Dust",
                    element: "Wood",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 40,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapemetal",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate ironwood dust or ironoak dust to craft objects. You take the Shape Metal action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape glacial":
            return {
                name: "Shape Glacial",
                    traits: "",
                    power: 2,
                    branch: "ice",
                    family: "Shape Dust",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 40,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeice",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate glaceum dust or glacerulum dust to craft objects. You take the Shape Ice action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape fireglass":
            return {
                name: "Shape Fireglass",
                    traits: "",
                    power: 3,
                    branch: "glass",
                    family: "Shape Dust",
                    element: "Fire",

                    spellslotcost: 3,
                    actionCost: "1",
                    trigger: "",
                    mana: 70,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeglass",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate fireglass dust or rubrumium dust to craft objects. You take the Shape Glass action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape adamantine":
            return {
                name: "Shape Adamantine",
                    traits: "",
                    power: 4,
                    branch: "glass",
                    family: "Shape Dust",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "1",
                    trigger: "",
                    mana: 100,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeearth",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate adamantine dust to craft objects. You take the Shape Earth action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape platinum":
            return {
                name: "Shape Platinum",
                    traits: "",
                    power: 4,
                    branch: "forge",
                    family: "Shape Dust",
                    element: "Metal",

                    spellslotcost: 4,
                    actionCost: "1",
                    trigger: "",
                    mana: 100,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapemetal",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate platinum dust to craft objects. You take the Shape Metal action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape viridium":
            return {
                name: "Shape Viridium",
                    traits: "",
                    power: 5,
                    branch: "corrosion",
                    family: "Shape Dust",
                    element: "Wood",

                    spellslotcost: 5,
                    actionCost: "1",
                    trigger: "",
                    mana: 130,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeglass",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate viridium dust to craft objects. You take the Shape Glass action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape obsidian":
            return {
                name: "Shape Obsidian",
                    traits: "",
                    power: 5,
                    branch: "rock",
                    family: "Shape Dust",
                    element: "Earth",

                    spellslotcost: 5,
                    actionCost: "1",
                    trigger: "",
                    mana: 130,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeearth",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate obsidian dust to craft objects. You take the Shape Earth action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape mithral":
            return {
                name: "Shape Mithral",
                    traits: "",
                    power: 5,
                    branch: "forge",
                    family: "Shape Dust",
                    element: "Metal",

                    spellslotcost: 5,
                    actionCost: "1",
                    trigger: "",
                    mana: 130,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapemetal",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate mithral dust to craft objects. You take the Shape Metal action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "shape albryst":
            return {
                name: "Shape Albryst",
                    traits: "",
                    power: 5,
                    branch: "ice",
                    family: "Shape Dust",
                    element: "Water",

                    spellslotcost: 5,
                    actionCost: "1",
                    trigger: "",
                    mana: 130,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "shapeice",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You can manipulate albryst dust or glacerulum dust to craft objects. You take the Shape Ice action to increase progress of a component made with this material.`,
                    heightenDesc: ``,
            };
        case "cultivate":
            return {
                name: "Cultivate",
                    traits: "",
                    power: 1,
                    branch: "woodfundamental",
                    family: "Shape Matter",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "3",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "One target plant",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You provide nourishment to a plant and accelerate its growth by one day. This acceleration ages the plant's overall life. If the plant is mature it can bear fruit or flower. Make a DC 15 spell effect check. On success, the plant produces one piece of fruit or flowers.`,
                    heightenDesc: ``,
            };
        case "torch":
            return {
                name: "Torch",
                    traits: "Ignite",
                    power: 1,
                    branch: "firefundamental",
                    family: "Shape Matter",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "One target object that is flammable",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You create a fire with your touch.`,
                    heightenDesc: ``,
            };
        case "drench":
            return {
                name: "Drench",
                    traits: "Environmental, Sustain",
                    power: 1,
                    branch: "fluid",
                    family: "Shape Matter",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "30 feet",
                    area: "5 foot radius, 1/2 foot high cylinder",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "Up to 10 minutes",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `A sudden downpour soaks and area creating a small pool of water. The area created can be made small as the caster desires. If the target area is on fire, the flames are automatically extinguished. If the pool of water created doesn’t have any way to contain the water, the water is absorbed into the ground in 1 round. `,
                    heightenDesc: ``,
            };
        case "earthquake":
            return {
                name: "Earthquake",
                    traits: "Environmental, Onset, Ravage, Sustain",
                    power: 5,
                    branch: "tremor",
                    family: "Shape Matter",
                    element: "Earth",

                    spellslotcost: 5,
                    actionCost: "2",
                    trigger: "",
                    mana: 650,

                    range: "500 feet",
                    area: "60-foot radius area",
                    targets: "",
                    targerCode: "Field",

                    check: "Dexterity",
                    duration: "Up to 1 minute",

                    dmg: "3d10",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "The creature falls into a 40-foot-deep fissures that opened beneath it and lands prone.",
                    success: "The creature falls into a 40-foot-deep fissures that opened beneath it. ",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "[Prone]",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You shake the ground, topple creatures into fissures, and collapse structures. The ground is difficult terrain while the spell is active. Fissures open up beneath creatures on the ground, dealing 3d10 force (Earth) damage. These fissures are permanent.
    
    Structures and ceilings might collapse. This spell deals 3d10 tension damage to structures in the area. If the damage can break through the structure's HB, the structure collapses. Each creature caught in a collapse must save. A collapse deals 11d6 bludgeoning damage.`,
                    heightenDesc: ``,
            };
        case "bleed":
            return {
                name: "Bleed",
                    traits: "",
                    power: 1,
                    branch: "metalfundamental",
                    family: "Stabilization",
                    element: "Metal",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You cause a living creature that is below or at 0 hit points but stabilized to resume dying. Upon casting this spell, you target a living creature that has 0 or fewer hit points. That creature begins dying. The creature can be stabilized later normally.`,
                    heightenDesc: ``,
            };
        case "stabilize":
            return {
                name: "Stabilize",
                    traits: "",
                    power: 1,
                    branch: "restoration",
                    family: "Stabilization",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 0,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Upon casting this spell, you target a living creature that has 0 or fewer hit points. That creature is automatically stabilized and does not lose any further hit points. If the creature later takes damage, it continues dying normally.`,
                    heightenDesc: ``,
            };
        case "revitalize":
            return {
                name: "Revitalize",
                    traits: "",
                    power: 3,
                    branch: "health",
                    family: "Stabilization",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "30 feet",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You target a creature that has died within the last minute. That creature returns to life and stabilizes. This spell can’t return to life a creature that has died of old age, nor can it restore any missing body parts.`,
                    heightenDesc: ``,
            };
        case "resuscitate":
            return {
                name: "Resuscitate",
                    traits: "",
                    power: 3,
                    branch: "blood",
                    family: "Stabilization",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 350,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You target a creature that has died within the last minute. That creature returns to life, stabilizes, and one wound is healed completely. This spell can’t return to life a creature that has died of old age, nor can it restore any missing body parts.`,
                    heightenDesc: ``,
            };
        case "feign death":
            return {
                name: "Feign Death",
                    traits: "",
                    power: 2,
                    branch: "blood",
                    family: "Stabilization",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 200,

                    range: "Touch",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "1 hour",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You touch a willing creature and put it into a cataleptic state that is indistinguishable from death. For the spell’s duration, or until you use an action to touch the target and dismiss the spell, the target appears dead to all outward inspection and to spells used to determine the target’s status. The target is blinded and incapacitated, and its speed drops to 0. The target has resistance to all damage except psychic damage. If the target is diseased or poisoned when you cast the spell, or becomes diseased or poisoned while under the spell’s effect, the disease and poison have no effect until the spell ends.`,
                    heightenDesc: ``,
            };
        case "ensnaring strike":
            return {
                name: "Ensnaring Strike",
                    traits: "Augment, Renitence",
                    power: 1,
                    branch: "plantation",
                    family: "Strike Augmentation",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "1d6",
                    dmgType: "Stab",
                    dmgElem: "Wood",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Restrained@e:At the start of their turm, the creature may make a {DC} Strength Save to end the effect. The creature may use the Break Free or Escape Artist action against {DC} to end the effects of ensnaring vines and no longer be restrained. Ends after 1 minute][Spec@d:At the start of their turn takes 1d6 stab (Wood) damage.@e:Ends with the Restrained Effect]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to cause vines to appear at the impact point and bind the target. When you successfully make a Strike you may expend this augment to affect the target with ensnaring vines. 
    
    Ensnaring vines lasts up to 1 minute, restrains creatures under its effects and deals 1d6 stab (Wood) damage at the start of the creature's turn. At the start of an affected creature's turn, they may make a Strength save against the spellcaster's DC to end the effects. In addition, the creature may use the Break Free or Escape Artist action against the spellcasting DC to end the effects of ensnaring vines.`,
                    heightenDesc: ``,
            };
        case "howling strike":
            return {
                name: "Howling Strike",
                    traits: "Augment",
                    power: 1,
                    branch: "wind",
                    family: "Strike Augmentation",
                    element: "Wood",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "2d6",
                    dmgType: "Force",
                    dmgElem: "Wood",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature takes 2d6 force (Wood) damage and is pushed 20 feet away from you.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:20 feet from source]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to cause a burst of wind. When you successfully make a Strike you may expend this augment to add the following effects, determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "searing strike":
            return {
                name: "Searing Strike",
                    traits: "Augment, Ignite",
                    power: 1,
                    branch: "flame",
                    family: "Strike Augmentation",
                    element: "Fire",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "",
                    duration: "Up to 1 minute",

                    dmg: "1d10",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to flares with white-hot intensity. When you successfully make a Strike you may expend this augment to deal an extra 1d10 burn (Fire) damage.`,
                    heightenDesc: ``,
            };
        case "sand impact":
            return {
                name: "Sand Impact",
                    traits: "Augment",
                    power: 1,
                    branch: "sand",
                    family: "Strike Augmentation",
                    element: "Earth",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "2d6",
                    dmgType: "Force",
                    dmgElem: "Earth",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature takes 2d6 force (Earth) damage, is pushed 10 feet away from you, and knocked prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:10 feet from source][Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to cause a burst of wind. When you successfully make a Strike you may expend this augment to add the following effects, determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "buffeting water":
            return {
                name: "Buffeting Water",
                    traits: "Augment",
                    power: 1,
                    branch: "fluid",
                    family: "Strike Augmentation",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "2d6",
                    dmgType: "Force",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature takes 2d6 force (Water) damage, is pushed 10 feet away from you, and knocked prone.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:10 feet from source][Prone]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to cause a burst of water and push the foe to the ground. When you successfully make a Strike you may expend this augment to add the following effects, determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "freezing strike":
            return {
                name: "Freezing Strike",
                    traits: "Augment, Renitence",
                    power: 1,
                    branch: "ice",
                    family: "Strike Augmentation",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "1d6",
                    dmgType: "Cold",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Restrained@e:At the start of their turm, the creature may make a {DC} Strength Save to end the effect. The creature may use the Break Free or Escape Artist action against {DC} to end the effects of ensnaring vines and no longer be restrained. Ends after 1 minute][Spec@d:At the start of their turn takes 1d6 cold (Water) damage.@e:Ends with the Restrained Effect]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to cause ice to appear at the impact point and bind the target. When you successfully make a Strike you may expend this augment to affect the target with ice snare. 
    
    Ice snare lasts up to 1 minute, restrains creatures under its effects and deals 1d6 cold (Water) damage at the start of the creature's turn. At the start of an affected creature's turn, they may make a Strength save against the spellcaster's DC to end the effects. In addition, the creature may use the Break Free or Escape Artist action against the spellcasting DC to end the effects of ice snare.`,
                    heightenDesc: ``,
            };
        case "thunderous smite":
            return {
                name: "Thunderous Smite",
                    traits: "Augment, Loud",
                    power: 1,
                    branch: "sound",
                    family: "Strike Augmentation",
                    element: "Water",

                    spellslotcost: 1,
                    actionCost: "1",
                    trigger: "",
                    mana: 50,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "2d6",
                    dmgType: "Sonic",
                    dmgElem: "Sound",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "The target creature takes 2d6 sonic (Water) damage, is pushed 20 feet away from you.",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:20 feet from source]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to cause a loud booming noise. When you successfully make a Strike you may expend this augment to add the following effects, determined by the target's save.`,
                    heightenDesc: ``,
            };
        case "heavy blade":
            return {
                name: "Heavy Blade",
                    traits: "Augment, Renitence",
                    power: 2,
                    branch: "gravity",
                    family: "Strike Augmentation",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Field",

                    check: "Strength",
                    duration: "Up to 1 minute",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Restrained@e:At the start of their turn, the creature must make a {DC} Strength Save to end the effect. Ends after 1 minute.][Prone@e:Ends with the Restrained Effect]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to bear down additional weight and force a foe to their knees. When you successfully make a Strike you may expend this augment to affect the target with heavy.
    
    Heavy lasts up to 1 minute, restrains and knocks prone creatures under its effects. At the start of an affected creature's turn, they may make a Strength save against the spellcaster's DC to end the effects. `,
                    heightenDesc: ``,
            };
        case "lightning blade":
            return {
                name: "Lightning Blade",
                    traits: "Augment",
                    power: 2,
                    branch: "nimbus",
                    family: "Strike Augmentation",
                    element: "Metal",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "Constitution",
                    duration: "Up to 1 minute",

                    dmg: "2d6",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Spec@d:At the start of their turn takes 2d6 lightning (Metal) damage. @e: At the start of their turm, the creature may make a {DC} Constitution Save to end the effect. Ends after 1 minute]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You augment a strike to discharge a blast of electricity on contact. When you successfully make a Strike you may expend this augment to affect the target with convulsions. 
    
    Convulsions lasts up to 1 minute and deals 2d6 lightning (Metal) damage at the start of the creature's turn. At the start of an affected creature's turn, they may make a Constitution save against the spellcaster's DC to end the effects.`,
                    heightenDesc: ``,
            };
        case "arcane blade":
            return {
                name: "Arcane Blade",
                    traits: "Aspected, Attack",
                    power: 1,
                    branch: "ethereal",
                    family: "Strike Spell",
                    element: "Arcana",

                    spellslotcost: 1,
                    actionCost: "2",
                    trigger: "",
                    mana: 100,

                    range: "",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d8",
                    dmgType: "Rending",
                    dmgElem: "Arcana",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your attack flares with a burst of magic. Make a melee Strike, dealing an extra 1d8 damage. 
    
    This counts as two attacks when calculating your multiple attack penalty.`,
                    heightenDesc: ``,
            };
        case "flashing blade":
            return {
                name: "Flashing Blade",
                    traits: "Attack",
                    power: 2,
                    branch: "light",
                    family: "Strike Spell",
                    element: "Fire",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 250,

                    range: "",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "3d8",
                    dmgType: "Burn",
                    dmgElem: "Fire",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Blinded@e:Ends after 1 round. The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your attack flares with bright light. Make a melee Strike, dealing an extra 3d8 burn (Fire) damage and the creature is blinded until the end of your next turn. The creature may make a Constitution saving throw at the end of their turn to remove the effect. 
    
    This counts as two attacks when calculating your multiple attack penalty.`,
                    heightenDesc: ``,
            };
        case "sand strike":
            return {
                name: "Sand Strike",
                    traits: "Attack",
                    power: 2,
                    branch: "sand",
                    family: "Strike Spell",
                    element: "Earth",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 250,

                    range: "",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "2d10",
                    dmgType: "Rending",
                    dmgElem: "Earth",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Blinded@e:Ends after 1 round. The creature may make a {DC} Constitution Save at the end of their turn to remove the effect.]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your attack whips up sand at the enemy as you hit. Make a melee Strike, dealing an extra 2d10 rending (Earth) damage and the creature is blinded until the end of your next turn. The creature may make a Constitution saving throw at the end of their turn to remove the effect. 
    
    This counts as two attacks when calculating your multiple attack penalty.`,
                    heightenDesc: ``,
            };
        case "booming strike":
            return {
                name: "Booming Strike",
                    traits: "Attack, Loud",
                    power: 2,
                    branch: "sound",
                    family: "Strike Spell",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "2",
                    trigger: "",
                    mana: 250,

                    range: "",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "3d8",
                    dmgType: "Sonic",
                    dmgElem: "Water",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Pushed@d:20 feet from source]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your attack bursts with thunder as you hit. Make a melee Strike, dealing an extra 3d8 sonic (Water) damage and the creature is pushed 20 feet away from you.
    
    This counts as two attacks when calculating your multiple attack penalty.`,
                    heightenDesc: ``,
            };
        case "toxic strike":
            return {
                name: "Toxic Strike",
                    traits: "Attack",
                    power: 3,
                    branch: "toxin",
                    family: "Strike Spell",
                    element: "Wood",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 400,

                    range: "",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "1d8",
                    dmgType: "Poison",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Staggered@d:Staggered 1@e: Ends after 1 round]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your attack disorients and confuses the target. Make a melee Strike, dealing an extra 1d8 poison damage and the creature is staggered (1) until the end of your next turn.
    
    This counts as two attacks when calculating your multiple attack penalty.`,
                    heightenDesc: ``,
            };
        case "spark blade":
            return {
                name: "Spark Blade",
                    traits: "Attack",
                    power: 3,
                    branch: "nimbus",
                    family: "Strike Spell",
                    element: "Metal",

                    spellslotcost: 3,
                    actionCost: "2",
                    trigger: "",
                    mana: 400,

                    range: "",
                    area: "",
                    targets: "",
                    targerCode: "Token",

                    check: "",
                    duration: "",

                    dmg: "4d6",
                    dmgType: "Lightning",
                    dmgElem: "Metal",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "[Staggered@d:Staggered 1@e: Ends after 1 round]",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Your attack sends a jolt of electricity through the target causing them to convulse. Make a melee Strike, dealing an extra 4d6 lightning (Metal) and the creature is staggered (1) until the end of your next turn.
    
    This counts as two attacks when calculating your multiple attack penalty.`,
                    heightenDesc: ``,
            };
        case "zephyr strike":
            return {
                name: "Zephyr Strike",
                    traits: "Attack",
                    power: 4,
                    branch: "soul",
                    family: "Strike Spell",
                    element: "Fire",

                    spellslotcost: 4,
                    actionCost: "3",
                    trigger: "",
                    mana: 500,

                    range: "30 feet",
                    area: "",
                    targets: "Up to five target creatures",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You enter a low stance then charge at your targets with great speed. Make a melee strike against each target. You then move to an unoccupied space you can see within 5 feet of one of the targets you hit or missed. This movement does not provoke any opportunity attacks.
    
    This counts as three attacks when calculating your multiple attack penalty.`,
                    heightenDesc: ``,
            };
        case "time leap":
            return {
                name: "Time Leap",
                    traits: "Temporal, Renitence",
                    power: 2,
                    branch: "time",
                    family: "Time Stop",
                    element: "Water",

                    spellslotcost: 2,
                    actionCost: "1",
                    trigger: "",
                    mana: 200,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You slow the passage of time allowing you to move easily while others remain in place. Affected creatures have 10 seconds to perform up to 2 actions, each of which must be used to Leap, Stand, Step, or Stride. If you have an appropriate Speed, you can add Burrow, Climb, Fly, or Swim to this list.`,
                    heightenDesc: ``,
            };
        case "quick stop":
            return {
                name: "Quick Stop",
                    traits: "Temporal, Renitence",
                    power: 3,
                    branch: "time",
                    family: "Time Stop",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "3",
                    trigger: "",
                    mana: 350,

                    range: "Touch",
                    area: "",
                    targets: "Up to two target creatures and yourself",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You slow the passage of time for those you touch. Affected creatures have 1 minute to perform up to 30 actions, each of which must be used to Leap, Stand, Step, Stride and the Interact action which can only be used to interact with unattended objects. If you have an appropriate Speed, you can add Burrow, Climb, Fly, or Swim to this list.`,
                    heightenDesc: ``,
            };
        case "rewinding step":
            return {
                name: "Rewinding Step",
                    traits: "",
                    power: 3,
                    branch: "time",
                    family: "Time Stop",
                    element: "Water",

                    spellslotcost: 3,
                    actionCost: "0",
                    trigger: "",
                    mana: 350,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You spend a minute anchoring your location in time so that you can swiftly retrace your steps. The space you're in when you cast the spell becomes a temporal anchor space. While you're within 500 feet of your temporal anchor space, you can spend a single action that has the concentrate trait to instantaneously return to that space (you don't need to have line of effect to the space). The spell then ends. You bring any items that are in your possession with you when you take the action to return. 
    
    When casting a spell with the Temporal trait you may use this spell as a reaction that gets triggered as soon as the temporal spell ends.`,
                    heightenDesc: ``,
            };
        case "blink":
            return {
                name: "Blink",
                    traits: "",
                    power: 4,
                    branch: "time",
                    family: "Time Stop",
                    element: "Water",

                    spellslotcost: 4,
                    actionCost: "R",
                    trigger: "When you are hit by an attack.",
                    mana: 500,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `You freeze time immediately upon impact of an attack and immediately move out of the way, evading all damage. You may then move your speed without provoking attacks of opportunity.`,
                    heightenDesc: ``,
            };
        case "true stop":
            return {
                name: "True Stop",
                    traits: "Temporal",
                    power: 5,
                    branch: "time",
                    family: "Time Stop",
                    element: "Water",

                    spellslotcost: 5,
                    actionCost: "3",
                    trigger: "",
                    mana: 650,

                    range: "Self",
                    area: "",
                    targets: "",
                    targerCode: "",

                    check: "",
                    duration: "",

                    dmg: "",
                    dmgType: "",
                    dmgElem: "",
                    hldmg: "",
                    dmg2: "",
                    dmg2Type: "",
                    dmg2Elem: "",
                    addAbilityScore: false,

                    critSuccess: "",
                    success: "",
                    failure: "",
                    critFailure: "",

                    onCritSuccess: "",
                    onSuccess: "",
                    onFailure: "",
                    onCritFailure: "",

                    desc: `Immediately after casting time stop, you can use up to 9 actions in 3 sets of up to 3 actions each. After each set of actions, 1 round passes, but only for you, effects specifically targeting or affecting you, and effects you create during the stoppage. Once you have finished your actions, time begins to flow again for the rest of the world.`,
                    heightenDesc: ``,
            };
    }
    return {
        name: "",
    };
}

function SearchSpellNames(feature) {
    let featuresList = ["", "Shimmer", "Distortion", "Dust Wood", "Dust Glass", "Dust Earth", "Dust Metal", "Dust Ice", "Dust Ironwood", "Excavate", "Dust Glacial", "Dust Fireglass", "Dust Adamantine", "Dust Platinum", "Dust Viridium", "Dust Obsidian", "Dust Mithral", "Dust Albryst", "Forest Guise", "Light Blindness", "Shadow Walk", "Earth Guise", "Shadow Steps", "Water Guise", "Cloud of Shadow", "Shadow Stalker", "Wind Wall", "Wall of Fire", "Wall of Sand", "Blade Barrier", "Wall of Water", "Wall of Force", "Fog Cloud", "Congregate Clouds", "Misty Terrain", "Smoke Cloud", "Sandstorm", "Ashen Cloud", "Solid Smoke", "Incendiary Cloud", "Produce Heat", "Static Shock", "Produce Cold", "Petal Storm", "Spore", "Silence", "Sleet Storm", "Irradiate", "Sound Buffer", "Diamond Dust", "Updraft", "Alleviate", "Calm Air", "Downdraft", "Pressure", "Zero Gravity", "Reverse Gravity", "Light", "Dancing Lights", "Dancing Darkness", "Burning Light", "Darkness", "Deeper Darkness", "Dawn", "Entangle", "Seism", "Ice Floor", "Eruption", "Twister", "Quicksand", "Whirlpool", "Flame Whirl", "Tornado", "Flame Cyclone", "Antlion Pit", "Maelstrom", "Blizzard", "Nubikinesis", "Force Hand", "Catapult", "Floating Disk", "Gust of Wind", "Part Sand", "Sand Tunnel", "Part Water", "Tidal Surge", "Storm Gust", "Kinetic Haul", "Create Forge Duplicate", "Create Glass Duplicate", "Create Ice Duplicate", "Create Plant Duplicate", "Create Rock Duplicate", "Quickcraft: Wood", "Quickcraft: Glass", "Quickcraft: Earth", "Quickcraft: Metal", "Quickcraft: Ice", "Create Pine", "Create Cloth", "Create Maple", "Create Clay", "Create Glass", "Create Stone", "Create Crystal", "Create Iron", "Create Steel", "Create Snow", "Create Ice", "Create Ironwood", "Create Glacial", "Create Fireglass", "Create Adamantine", "Create Platinum", "Create Viridium", "Create Obsidian", "Create Mithral", "Create Albryst", "Stalagmite", "Pine Spear", "Wildwood", "Glacier", "Wood Shield", "Rock Cover", "Ice Block", "Sicken", "Restrain", "Subdue", "Trip", "Attenuate", "Flash", "Ashen Veil", "Sandman", "Earthbind", "Encumber", "Clouded Eyes", "Blindness", "Freezebind", "Lethargy", "Sound Boom", "Weight", "Arcane Healing", "Barrier Healer", "Wind Barrier", "Flame Barrier", "Ether Barrier", "Static Barrier", "Cold Barrier", "Barrier Restorer", "Sand Barrier", "Ether Buffer", "Spirit Beacon", "Spirit Walk", "Expel Essence", "Arcane Burst", "Wind Burst", "Fireball", "Flame Pyre", "Erupting Earth", "Ball Lightning", "Shatter", "Geyser", "Fireblast", "Plasma Blast", "Caustic Eruption", "Sunburst", "Horrid Wilting", "Rockslide", "Daggerfall", "Hail", "Storm of Glass", "Dagger Storm", "Arcane Strike", "Wood Burst", "Fire Burst", "Glass Burst", "Quake", "Blade Burst", "Static Burst", "Lightning Pulse", "Thunderclap", "Repelling Pulse", "Rolling Fire", "Glass Surge", "Defoliate", "Lightning Bolt", "Caustic Rebuke", "Acid Spray", "Sunbeam", "Tidal Wave", "Diffuse", "Call Lightning", "Wither", "Coagulate", "Spirit Blast", "Harm", "Atrophy", "Chain Lightning", "Arcane Bolt", "Wind Bullet", "Repulse", "Flame Arrow", "Rock Bullets", "Lightning Shaft", "Ice Darts", "Ray of Frost", "Acid Arrow", "Fulgor", "Acid Blast", "Brick Barrage", "Burning Hands", "Glass Slasher", "Sand Blast", "Stone Shower", "Lightning Burst", "Rain of Daggers", "Water Blast", "Freezing Blast", "Thunderwave", "Cone of Cold", "Boom Burst", "Kinesis", "Diakopy", "Katapeltis", "Chlorotheurgy", "Pyrotheurgy", "Geotheurgy", "Ferrotheurgy", "Hydrotheurgy", "Purify Food and Drink", "Remove Radiation", "Poison Ward", "Rejuvenate", "Radiation Ward", "Cure Light Trauma", "Passive Healing", "Cure Injury", "Mend Light Wounds", "Passive Mending", "Mend Injuries", "Cure Light Wounds", "Passive Restoration", "Cure Wounds", "Lesser Life Weave", "Cure Fractures", "Cure Severs", "Mass Cure Injuries", "Mend", "Mass Cure Wounds", "Rhapsody", "Heal", "Life Weave", "Purify", "Nightingale", "True Restoration", "Mirage", "Minor Reflection", "Mirror Image", "Greater Reflection", "Instant Fake", "Heat Adaption", "Resistance", "Unencumbered", "Lift", "Grasp", "Cold Adaption", "True Strike", "Ashen Path", "Unburden", "Water Breathing", "Alacrity", "Embolden", "Overcome", "Nimble Dodge", "Foresight", "Feather Fall", "Leap", "Feather Step", "Ascent", "Root", "Zephyr", "Reposition", "Levitate", "Air Walk", "Floating Ice", "Detect Radiation", "Know Weather", "Scent", "Darkvision", "Darksight", "Tremorsense", "Blindsense", "Aquasense", "True Sight", "Greater Tremorsense", "Fleet Footed", "Longstrider", "Fleet Step", "Swift Swim", "Soar", "Jet", "Fast Climb", "Group Climb", "Burrow", "Sleep", "Slumber", "Hold Person", "Seize", "Cardiac Seizure", "Calmed Surge", "Mana Release", "Ether Release", "Duplicate Evocation", "Counterspell", "Innervate", "Boost Surge", "Mana Battery", "Mana Drain", "Sustained Mana", "Venom", "Blood Mark", "Ethereal Mark", "Distant Whisper", "Whisper", "Message", "Ghost Sound", "Transmission", "Whispering Wind", "Skywrite", "Sculpt Sound", "Telegram", "Telepathy", "Shape Fiber", "Shape Wood", "Shape Clay", "Shape Glass", "Shape Earth", "Shape Metal", "Shape Ice", "Shape Ironwood", "Shape Glacial", "Shape Fireglass", "Shape Adamantine", "Shape Platinum", "Shape Viridium", "Shape Obsidian", "Shape Mithral", "Shape Albryst", "Cultivate", "Torch", "Drench", "Earthquake", "Bleed", "Stabilize", "Revitalize", "Resuscitate", "Feign Death", "Ensnaring Strike", "Howling Strike", "Searing Strike", "Sand Impact", "Buffeting Water", "Freezing Strike", "Thunderous Smite", "Heavy Blade", "Lightning Blade", "Arcane Blade", "Flashing Blade", "Sand Strike", "Booming Strike", "Toxic Strike", "Spark Blade", "Zephyr Strike", "Time Leap", "Quick Stop", "Rewinding Step", "Blink", "True Stop"];
    let searchFeaturesList = ["", "shimmer", "distortion", "dust wood", "dust glass", "dust earth", "dust metal", "dust ice", "dust ironwood", "excavate", "dust glacial", "dust fireglass", "dust adamantine", "dust platinum", "dust viridium", "dust obsidian", "dust mithral", "dust albryst", "forest guise", "light blindness", "shadow walk", "earth guise", "shadow steps", "water guise", "cloud of shadow", "shadow stalker", "wind wall", "wall of fire", "wall of sand", "blade barrier", "wall of water", "wall of force", "fog cloud", "congregate clouds", "misty terrain", "smoke cloud", "sandstorm", "ashen cloud", "solid smoke", "incendiary cloud", "produce heat", "static shock", "produce cold", "petal storm", "spore", "silence", "sleet storm", "irradiate", "sound buffer", "diamond dust", "updraft", "alleviate", "calm air", "downdraft", "pressure", "zero gravity", "reverse gravity", "light", "dancing lights", "dancing darkness", "burning light", "darkness", "deeper darkness", "dawn", "entangle", "seism", "ice floor", "eruption", "twister", "quicksand", "whirlpool", "flame whirl", "tornado", "flame cyclone", "antlion pit", "maelstrom", "blizzard", "nubikinesis", "force hand", "catapult", "floating disk", "gust of wind", "part sand", "sand tunnel", "part water", "tidal surge", "storm gust", "kinetic haul", "create forge duplicate", "create glass duplicate", "create ice duplicate", "create plant duplicate", "create rock duplicate", "quickcraft: wood", "quickcraft: glass", "quickcraft: earth", "quickcraft: metal", "quickcraft: ice", "create pine", "create cloth", "create maple", "create clay", "create glass", "create stone", "create crystal", "create iron", "create steel", "create snow", "create ice", "create ironwood", "create glacial", "create fireglass", "create adamantine", "create platinum", "create viridium", "create obsidian", "create mithral", "create albryst", "stalagmite", "pine spear", "wildwood", "glacier", "wood shield", "rock cover", "ice block", "sicken", "restrain", "subdue", "trip", "attenuate", "flash", "ashen veil", "sandman", "earthbind", "encumber", "clouded eyes", "blindness", "freezebind", "lethargy", "sound boom", "weight", "arcane healing", "barrier healer", "wind barrier", "flame barrier", "ether barrier", "static barrier", "cold barrier", "barrier restorer", "sand barrier", "ether buffer", "spirit beacon", "spirit walk", "expel essence", "arcane burst", "wind burst", "fireball", "flame pyre", "erupting earth", "ball lightning", "shatter", "geyser", "fireblast", "plasma blast", "caustic eruption", "sunburst", "horrid wilting", "rockslide", "daggerfall", "hail", "storm of glass", "dagger storm", "arcane strike", "wood burst", "fire burst", "glass burst", "quake", "blade burst", "static burst", "lightning pulse", "thunderclap", "repelling pulse", "rolling fire", "glass surge", "defoliate", "lightning bolt", "caustic rebuke", "acid spray", "sunbeam", "tidal wave", "diffuse", "call lightning", "wither", "coagulate", "spirit blast", "harm", "atrophy", "chain lightning", "arcane bolt", "wind bullet", "repulse", "flame arrow", "rock bullets", "lightning shaft", "ice darts", "ray of frost", "acid arrow", "fulgor", "acid blast", "brick barrage", "burning hands", "glass slasher", "sand blast", "stone shower", "lightning burst", "rain of daggers", "water blast", "freezing blast", "thunderwave", "cone of cold", "boom burst", "kinesis", "diakopy", "katapeltis", "chlorotheurgy", "pyrotheurgy", "geotheurgy", "ferrotheurgy", "hydrotheurgy", "purify food and drink", "remove radiation", "poison ward", "rejuvenate", "radiation ward", "cure light trauma", "passive healing", "cure injury", "mend light wounds", "passive mending", "mend injuries", "cure light wounds", "passive restoration", "cure wounds", "lesser life weave", "cure fractures", "cure severs", "mass cure injuries", "mend", "mass cure wounds", "rhapsody", "heal", "life weave", "purify", "nightingale", "true restoration", "mirage", "minor reflection", "mirror image", "greater reflection", "instant fake", "heat adaption", "resistance", "unencumbered", "lift", "grasp", "cold adaption", "true strike", "ashen path", "unburden", "water breathing", "alacrity", "embolden", "overcome", "nimble dodge", "foresight", "feather fall", "leap", "feather step", "ascent", "root", "zephyr", "reposition", "levitate", "air walk", "floating ice", "detect radiation", "know weather", "scent", "darkvision", "darksight", "tremorsense", "blindsense", "aquasense", "true sight", "greater tremorsense", "fleet footed", "longstrider", "fleet step", "swift swim", "soar", "jet", "fast climb", "group climb", "burrow", "sleep", "slumber", "hold person", "seize", "cardiac seizure", "calmed surge", "mana release", "ether release", "duplicate evocation", "counterspell", "innervate", "boost surge", "mana battery", "mana drain", "sustained mana", "venom", "blood mark", "ethereal mark", "distant whisper", "whisper", "message", "ghost sound", "transmission", "whispering wind", "skywrite", "sculpt sound", "telegram", "telepathy", "shape fiber", "shape wood", "shape clay", "shape glass", "shape earth", "shape metal", "shape ice", "shape ironwood", "shape glacial", "shape fireglass", "shape adamantine", "shape platinum", "shape viridium", "shape obsidian", "shape mithral", "shape albryst", "cultivate", "torch", "drench", "earthquake", "bleed", "stabilize", "revitalize", "resuscitate", "feign death", "ensnaring strike", "howling strike", "searing strike", "sand impact", "buffeting water", "freezing strike", "thunderous smite", "heavy blade", "lightning blade", "arcane blade", "flashing blade", "sand strike", "booming strike", "toxic strike", "spark blade", "zephyr strike", "time leap", "quick stop", "rewinding step", "blink", "true stop"];
    let foundFeatures = [];

    let arbitrarySearchLimit = 6;
    let searchIndex = -1;
    for (let i = 0; i < searchFeaturesList.length; i++) {
        searchIndex = searchFeaturesList[i].indexOf(feature.toLowerCase());
        if (searchIndex > -1) {
            foundFeatures.push(featuresList[i]);
            if (foundFeatures.length >= arbitrarySearchLimit) {
                break;
            }
        }
    };

    return foundFeatures;
}
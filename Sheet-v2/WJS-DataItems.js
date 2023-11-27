function GetEquipmentInfo(name) {
	switch (name.toLowerCase()) {
		case "battleaxe":
			return { "name": "Battleaxe", "type": "Weapon", "group": "Axe", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 6, "value": 2, "abilities": "AP (2)", "skill": "Brawling", "dmg": "1d; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "club":
			return { "name": "Club", "type": "Weapon", "group": "Hammer", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 4, "value": 2, "abilities": "", "skill": "Brawling", "dmg": "2h; Power", "dmgType": "Force", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "handaxe":
			return { "name": "Handaxe", "type": "Weapon", "group": "Axe", "traits": "Arcing; Thrown", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 4, "value": 2, "abilities": "", "skill": "Brawling", "dmg": "2h; Power", "dmgType": "Piercing", "range": "3", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "longsword":
			return { "name": "Longsword", "type": "Weapon", "group": "Blade", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "Brawling", "dmg": "2d; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "shield":
			return { "name": "Shield", "type": "Weapon", "group": "Shield", "traits": "Shield", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 6, "value": 2, "abilities": "", "skill": "Brawling", "dmg": "1h; Power", "dmgType": "Force", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "dagger":
			return { "name": "Dagger", "type": "Weapon", "group": "Blade", "traits": "Thrown", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 2, "value": 2, "abilities": "Quick", "skill": "Finesse", "dmg": "2h; Power", "dmgType": "Piercing", "range": "3", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "shortsword":
			return { "name": "Shortsword", "type": "Weapon", "group": "Blade", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 3, "value": 2, "abilities": "Quick", "skill": "Finesse", "dmg": "3h; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "warhammer":
			return { "name": "Warhammer", "type": "Weapon", "group": "Hammer", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "Crushing", "skill": "Might", "dmg": "2h; Power", "dmgType": "Force", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "whip":
			return { "name": "Whip", "type": "Weapon", "group": "Whip", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 3, "value": 3, "abilities": "", "skill": "Finesse", "dmg": "2h; Power", "dmgType": "Piercing", "range": "", "threat": "2", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "longbow":
			return { "name": "Longbow", "type": "Weapon", "group": "Bow", "traits": "Arcing; Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "", "skill": "Marksmanship", "dmg": "3h; Power", "dmgType": "Piercing", "range": "4", "threat": "", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "pistol":
			return { "name": "Pistol", "type": "Weapon", "group": "Handgun", "traits": "Loud", "description": "", "complexity": "15:Mechanical", "time": "1", "components": "Component", "bulk": 3, "value": 4, "abilities": "", "skill": "Marksmanship", "dmg": "2d", "dmgType": "Piercing", "range": "4", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "revolver":
			return { "name": "Revolver", "type": "Weapon", "group": "Handgun", "traits": "Loud", "description": "", "complexity": "15:Mechanical", "time": "2", "components": "Component", "bulk": 4, "value": 4, "abilities": "AP (2)", "skill": "Marksmanship", "dmg": "2d", "dmgType": "Piercing", "range": "3", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "rifle":
			return { "name": "Rifle", "type": "Weapon", "group": "Longarm", "traits": "Two-Handed; Loud", "description": "", "complexity": "15:Mechanical", "time": "1", "components": "Component", "bulk": 5, "value": 4, "abilities": "Impact (2d)", "skill": "Marksmanship", "dmg": "1d", "dmgType": "Piercing", "range": "5", "threat": "", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "shortbow":
			return { "name": "Shortbow", "type": "Weapon", "group": "Bow", "traits": "Arcing; Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "Marksmanship", "dmg": "2h; Power", "dmgType": "Piercing", "range": "4", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "shotgun":
			return { "name": "Shotgun", "type": "Weapon", "group": "Longarm", "traits": "Two-Handed; Loud", "description": "", "complexity": "15:Mechanical", "time": "2", "components": "Component", "bulk": 1, "value": 5, "abilities": "Cone (2)", "skill": "Marksmanship", "dmg": "2d", "dmgType": "Piercing", "range": "2", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "sniper rifle":
			return { "name": "Sniper Rifle", "type": "Weapon", "group": "Longarm", "traits": "Two-Handed; Loud", "description": "", "complexity": "15:Mechanical", "time": "2", "components": "2 Component", "bulk": 8, "value": 5, "abilities": "Impact (5h)", "skill": "Marksmanship", "dmg": "0", "dmgType": "Piercing", "range": "8", "threat": "", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "great axe":
			return { "name": "Great Axe", "type": "Weapon", "group": "Axe", "traits": "Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "AP (2)", "skill": "Might", "dmg": "2d; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "great sword":
			return { "name": "Great Sword", "type": "Weapon", "group": "Blade", "traits": "Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "", "skill": "Might", "dmg": "4h; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "maul":
			return { "name": "Maul", "type": "Weapon", "group": "Hammer", "traits": "Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "Crushing", "skill": "Might", "dmg": "2d; Power", "dmgType": "Force", "range": "", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "javelin":
			return { "name": "Javelin", "type": "Weapon", "group": "Spear", "traits": "Arcing; Thrown", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "Lunge", "dmg": "2h; Power", "dmgType": "Piercing", "range": "3", "threat": "1", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "lance":
			return { "name": "Lance", "type": "Weapon", "group": "Spear", "traits": "Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "Line (2)", "skill": "Lunge", "dmg": "2d; Power", "dmgType": "Piercing", "range": "", "threat": "2", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "spear":
			return { "name": "Spear", "type": "Weapon", "group": "Spear", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "Line (2)", "skill": "Lunge", "dmg": "3h; Power", "dmgType": "Piercing", "range": "", "threat": "2", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "staff":
			return { "name": "Staff", "type": "Weapon", "group": "Staff", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "Quick", "skill": "Lunge", "dmg": "2h; Power", "dmgType": "Force", "range": "", "threat": "2", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "blast bomb":
			return { "name": "Blast Bomb", "type": "Weapon", "group": "Bomb", "traits": "Arcing", "description": "", "complexity": "0:Mechanical", "time": "1", "components": "Black Powder", "bulk": 2, "value": 3, "abilities": "Explosive (1/3h)", "skill": "Throw", "dmg": "1h; Power", "dmgType": "Burn", "range": "3", "threat": "", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "impact bomb":
			return { "name": "Impact Bomb", "type": "Weapon", "group": "Bomb", "traits": "Arcing", "description": "", "complexity": "0:Mechanical", "time": "1", "components": "Black Powder", "bulk": 2, "value": 3, "abilities": "Impact (3d)", "skill": "Throw", "dmg": "1h; Power", "dmgType": "Force", "range": "3", "threat": "", "block": "", "armor": "", "flexibility": "", "speedPen": "" }
		case "light breastplate":
			return { "name": "Light Breastplate", "type": "Chest Armor", "group": "Basic", "traits": "", "description": "", "complexity": "15:Artisan", "time": "2", "components": "", "bulk": 15, "value": 3, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "2", "armor": "1", "flexibility": "-2", "speedPen": "" }
		case "heavy breastplate":
			return { "name": "Heavy Breastplate", "type": "Chest Armor", "group": "Basic", "traits": "", "description": "", "complexity": "15:Artisan", "time": "2", "components": "", "bulk": 25, "value": 4, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "4", "armor": "2", "flexibility": "-4", "speedPen": "-1" }
		case "helmet":
			return { "name": "Helmet", "type": "Head Armor", "group": "Basic", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "1", "armor": "", "flexibility": "-1", "speedPen": "" }
		case "vambraces":
			return { "name": "Vambraces", "type": "Arms Armor", "group": "Basic", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "1", "armor": "", "flexibility": "-1", "speedPen": "" }
		case "light greaves":
			return { "name": "Light Greaves", "type": "Legs Armor", "group": "Basic", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 10, "value": 2, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "1", "armor": "", "flexibility": "-1", "speedPen": "" }
		case "heavy greaves":
			return { "name": "Heavy Greaves", "type": "Legs Armor", "group": "Basic", "traits": "", "description": "", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 15, "value": 2, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "2", "armor": "1", "flexibility": "-2", "speedPen": "-1" }
		default:
			return { "name": "", "type": "", "group": "", "traits": "", "description": "", "complexity": "", "time": "", "components": "", "bulk": 0, "value": 0, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "", "armor": "", "flexibility": "", "speedPen": "" }

	}
}


function GetEquipmentInfo(name) {
	switch (name.toLowerCase()) {
		case "battleaxe":
			return { "name": "Battleaxe", "type": "Weapon", "group": "Axe", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 6, "value": 2, "abilities": "AP (2)", "skill": "Brawling", "dmg": "1d; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "club":
			return { "name": "Club", "type": "Weapon", "group": "Hammer", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 4, "value": 2, "abilities": "", "skill": "Brawling", "dmg": "2h; Power", "dmgType": "Force", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "handaxe":
			return { "name": "Handaxe", "type": "Weapon", "group": "Axe", "traits": "Arcing; Thrown", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 4, "value": 2, "abilities": "", "skill": "Brawling", "dmg": "2h; Power", "dmgType": "Piercing", "range": "3", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "longsword":
			return { "name": "Longsword", "type": "Weapon", "group": "Blade", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "Brawling", "dmg": "2d; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "shield":
			return { "name": "Shield", "type": "Weapon", "group": "Shield", "traits": "Shield", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 6, "value": 2, "abilities": "", "skill": "Brawling", "dmg": "1h; Power", "dmgType": "Force", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "dagger":
			return { "name": "Dagger", "type": "Weapon", "group": "Blade", "traits": "Thrown", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 2, "value": 2, "abilities": "Quick", "skill": "Finesse", "dmg": "2h; Power", "dmgType": "Piercing", "range": "3", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "shortsword":
			return { "name": "Shortsword", "type": "Weapon", "group": "Blade", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 3, "value": 2, "abilities": "Quick", "skill": "Finesse", "dmg": "3h; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "warhammer":
			return { "name": "Warhammer", "type": "Weapon", "group": "Hammer", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "Crushing", "skill": "Might", "dmg": "2h; Power", "dmgType": "Force", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "whip":
			return { "name": "Whip", "type": "Weapon", "group": "Whip", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 3, "value": 3, "abilities": "", "skill": "Finesse", "dmg": "2h; Power", "dmgType": "Piercing", "range": "", "threat": "2", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "longbow":
			return { "name": "Longbow", "type": "Weapon", "group": "Bow", "traits": "Arcing; Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "", "skill": "Marksmanship", "dmg": "3h; Power", "dmgType": "Piercing", "range": "4", "threat": "", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "pistol":
			return { "name": "Pistol", "type": "Weapon", "group": "Handgun", "traits": "Loud", "description": "", "complexity": "15:Mechanical", "time": "1", "components": "Component", "bulk": 3, "value": 4, "abilities": "", "skill": "Marksmanship", "dmg": "2d", "dmgType": "Piercing", "range": "4", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "revolver":
			return { "name": "Revolver", "type": "Weapon", "group": "Handgun", "traits": "Loud", "description": "", "complexity": "15:Mechanical", "time": "2", "components": "Component", "bulk": 4, "value": 4, "abilities": "AP (2)", "skill": "Marksmanship", "dmg": "2d", "dmgType": "Piercing", "range": "3", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "rifle":
			return { "name": "Rifle", "type": "Weapon", "group": "Longarm", "traits": "Two-Handed; Loud", "description": "", "complexity": "15:Mechanical", "time": "1", "components": "Component", "bulk": 5, "value": 4, "abilities": "Impact (2d)", "skill": "Marksmanship", "dmg": "1d", "dmgType": "Piercing", "range": "5", "threat": "", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "shortbow":
			return { "name": "Shortbow", "type": "Weapon", "group": "Bow", "traits": "Arcing; Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "Marksmanship", "dmg": "2h; Power", "dmgType": "Piercing", "range": "4", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "shotgun":
			return { "name": "Shotgun", "type": "Weapon", "group": "Longarm", "traits": "Two-Handed; Loud", "description": "", "complexity": "15:Mechanical", "time": "2", "components": "Component", "bulk": 1, "value": 5, "abilities": "Cone (2)", "skill": "Marksmanship", "dmg": "2d", "dmgType": "Piercing", "range": "2", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "sniper rifle":
			return { "name": "Sniper Rifle", "type": "Weapon", "group": "Longarm", "traits": "Two-Handed; Loud", "description": "", "complexity": "15:Mechanical", "time": "2", "components": "2 Component", "bulk": 8, "value": 5, "abilities": "Impact (5h)", "skill": "Marksmanship", "dmg": "0", "dmgType": "Piercing", "range": "8", "threat": "", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "great axe":
			return { "name": "Great Axe", "type": "Weapon", "group": "Axe", "traits": "Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "AP (2)", "skill": "Might", "dmg": "2d; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "great sword":
			return { "name": "Great Sword", "type": "Weapon", "group": "Blade", "traits": "Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "", "skill": "Might", "dmg": "4h; Power", "dmgType": "Piercing", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "maul":
			return { "name": "Maul", "type": "Weapon", "group": "Hammer", "traits": "Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "Crushing", "skill": "Might", "dmg": "2d; Power", "dmgType": "Force", "range": "", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "javelin":
			return { "name": "Javelin", "type": "Weapon", "group": "Spear", "traits": "Arcing; Thrown", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "Lunge", "dmg": "2h; Power", "dmgType": "Piercing", "range": "3", "threat": "1", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "lance":
			return { "name": "Lance", "type": "Weapon", "group": "Spear", "traits": "Two-Handed", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2, "abilities": "Line (2)", "skill": "Lunge", "dmg": "2d; Power", "dmgType": "Piercing", "range": "", "threat": "2", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "spear":
			return { "name": "Spear", "type": "Weapon", "group": "Spear", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "Line (2)", "skill": "Lunge", "dmg": "3h; Power", "dmgType": "Piercing", "range": "", "threat": "2", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "staff":
			return { "name": "Staff", "type": "Weapon", "group": "Staff", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "Quick", "skill": "Lunge", "dmg": "2h; Power", "dmgType": "Force", "range": "", "threat": "2", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "blast bomb":
			return { "name": "Blast Bomb", "type": "Weapon", "group": "Bomb", "traits": "Arcing", "description": "", "complexity": "0:Mechanical", "time": "1", "components": "Black Powder", "bulk": 2, "value": 3, "abilities": "Explosive (1/3h)", "skill": "Throw", "dmg": "1h; Power", "dmgType": "Burn", "range": "3", "threat": "", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "impact bomb":
			return { "name": "Impact Bomb", "type": "Weapon", "group": "Bomb", "traits": "Arcing", "description": "", "complexity": "0:Mechanical", "time": "1", "components": "Black Powder", "bulk": 2, "value": 3, "abilities": "Impact (3d)", "skill": "Throw", "dmg": "1h; Power", "dmgType": "Force", "range": "3", "threat": "", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }
		case "light breastplate":
			return { "name": "Light Breastplate", "type": "Chest Armor", "group": "Basic", "traits": "", "description": "", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 15, "value": 3, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "2", "armor": "1", "reflexPen": "-2", "speedPen": "" }
		case "heavy breastplate":
			return { "name": "Heavy Breastplate", "type": "Chest Armor", "group": "Basic", "traits": "", "description": "", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 25, "value": 4, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "4", "armor": "2", "reflexPen": "-2", "speedPen": "-1" }
		case "helmet":
			return { "name": "Helmet", "type": "Head Armor", "group": "Basic", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "2", "armor": "", "reflexPen": "-1", "speedPen": "" }
		case "vambraces":
			return { "name": "Vambraces", "type": "Arms Armor", "group": "Basic", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "2", "armor": "", "reflexPen": "-1", "speedPen": "" }
		case "light greaves":
			return { "name": "Light Greaves", "type": "Legs Armor", "group": "Basic", "traits": "", "description": "", "complexity": "", "time": "1", "components": "", "bulk": 10, "value": 2, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "2", "armor": "", "reflexPen": "-1", "speedPen": "" }
		case "heavy greaves":
			return { "name": "Heavy Greaves", "type": "Legs Armor", "group": "Basic", "traits": "", "description": "", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 15, "value": 3, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "2", "armor": "1", "reflexPen": "-1", "speedPen": "-1" }
		default:
			return { "name": "", "type": "", "group": "", "traits": "", "description": "", "complexity": "", "time": "", "components": "", "bulk": 0, "value": 0, "abilities": "", "skill": "", "dmg": "", "dmgType": "", "range": "", "threat": "", "block": "", "armor": "", "reflexPen": "", "speedPen": "" }

	}
}

function GetGearInfo(name) {
	switch (name.toLowerCase()) {
		case "bedroll":
			return { "name": "Bedroll", "type": "Gear", "group": "Camping", "traits": "", "description": "This consists of two woolen sheets sewn together along the bottom and one side to create a bag for sleeping in. Some have cloth straps along the open side so the bedroll can be tied closed while you are sleeping. It can be rolled and tied into a tight coil for storage or transport.", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2 }
		case "blanket":
			return { "name": "Blanket", "type": "Gear", "group": "Camping", "traits": "", "description": "This warm, woven blanket has straps so it can be rolled up and tied. Blankets are often used in conjunction with bedrolls to provide additional warmth or a ground cushion.", "complexity": "", "time": "1", "components": "", "bulk": 7, "value": 1 }
		case "cot":
			return { "name": "Cot", "type": "Gear", "group": "Camping", "traits": "", "description": "This elevated camp bed is made of wood and canvas, and is particularly useful when the ground is wet or rocky. It is large enough for a full-grown human, but folds down into a 4-foot-by-9-inch cylindrical bag.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 15, "value": 2 }
		case "hammock":
			return { "name": "Hammock", "type": "Gear", "group": "Camping", "traits": "", "description": "This blanket or net is attached to strong ropes, allowing you to hang it from a heavy branch or two trees and sleep above the ground.", "complexity": "", "time": "1", "components": "", "bulk": 10, "value": 1 }
		case "tent":
			return { "name": "Tent", "type": "Gear", "group": "Camping", "traits": "", "description": "A tent holds two Medium creature and takes 10 minutes to assemble.", "complexity": "15:Artisan", "time": "2", "components": "", "bulk": 25, "value": 3 }
		case "pavillion tent":
			return { "name": "Pavillion Tent", "type": "Gear", "group": "Camping", "traits": "", "description": "A huge open-air canopy, plus stakes, poles, and ropes. A pavilion holds 10 creatures and takes 60 minutes to assemble. Pavilion tents are large enough to accommodate a small fire in the center.", "complexity": "15:Artisan", "time": "8", "components": "", "bulk": 40, "value": 5 }
		case "compass":
			return { "name": "Compass", "type": "Gear", "group": "Camping", "traits": "", "description": "An ordinary compass that points to the magnetic north pole grants you a +2 bonus on Navigate checks.", "complexity": "15:Mechanics", "time": "1", "components": "Magnet", "bulk": 1, "value": 3 }
		case "mirror":
			return { "name": "Mirror", "type": "Gear", "group": "Camping", "traits": "", "description": "A small mirror with a frame to hold it.", "complexity": "15:Artisan", "time": "1", "components": "Glass", "bulk": 1, "value": 2 }
		case "rope (50 ft)":
			return { "name": "Rope (50 ft)", "type": "Gear", "group": "Camping", "traits": "", "description": "Flexible material that can help you climb, tie things up, and other useful things.", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2 }
		case "lanturn":
			return { "name": "Lanturn", "type": "Gear", "group": "Camping", "traits": "", "description": "A common lanturn illuminates a small area, providing normal light in a 30-foot radius and increasing the light level by one step for an additional 30 feet beyond that area. A lanturn burns for 6 hours on 1 pint of oil. You can carry a lanturn in one hand.", "complexity": "15:Mechanics", "time": "2", "components": "", "bulk": 2, "value": 3 }
		case "torch":
			return { "name": "Torch", "type": "Gear", "group": "Camping", "traits": "", "description": "A torch burns for 1 hour, shedding normal light in a 20-foot radius and increasing the light level by one step for an additional 20 feet beyond that area", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 1 }
		case "backpack, common":
			return { "name": "Backpack, common", "type": "Gear", "group": "Container", "traits": "", "description": "This cloth knapsack has one large pocket that closes with a buckled strap and holds about 2 cubic feet of material. Some may have one or more smaller pockets on the sides.", "complexity": "15:Artisan", "time": "2", "components": "", "bulk": 8, "value": 2 }
		case "bag, waterproof":
			return { "name": "Bag, waterproof", "type": "Gear", "group": "Container", "traits": "", "description": "This sack sealed with tar or pitch keeps delicate items from being ruined by water. Items kept inside remain relatively dry, making the bag ideal for carrying maps, scrolls, spellbooks, and the like, although the bag is not impervious and can only be completely immersed for 10 rounds before enough water seeps in to ruin such items.", "complexity": "15:Artisan", "time": "2", "components": "Waterproof Material", "bulk": 8, "value": 1 }
		case "pouch, waist":
			return { "name": "Pouch, waist", "type": "Gear", "group": "Container", "traits": "", "description": "This pack is supported by two straps that can be loosened or tightened to fit most body types. It can be adjusted to any facing along its wearer’s waist. The pack can store up to 1/2 cubic foot of material.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 1, "value": 1 }
		case "sack":
			return { "name": "Sack", "type": "Gear", "group": "Container", "traits": "", "description": "A sack is a cloth bag that weighs 1/2 lb. empty and holds 1 cubic ft. or 60 lbs. of contents full.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 4, "value": 1 }
		case "barrel":
			return { "name": "Barrel", "type": "Gear", "group": "Container", "traits": "", "description": "A common barrel is constructed of wood with metal ring reinforcements and holds 10 cubic ft. or 650 lb. of materials. A barrel filled with liquid holds about 75 gallons.", "complexity": "15:Artisan", "time": "2", "components": "", "bulk": 25, "value": 2 }
		case "basket":
			return { "name": "Basket", "type": "Gear", "group": "Container", "traits": "", "description": "This large basket has a lid and holds about 2 cubic feet.", "complexity": "", "time": "1", "components": "", "bulk": 3, "value": 1 }
		case "box, scroll":
			return { "name": "Box, scroll", "type": "Gear", "group": "Container", "traits": "", "description": "This wooden box easily holds 10 scrolls and has small clips or bookmarks for easier indexing. Retrieving a scroll from a held scroll box is a move action.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 2 }
		case "bucket":
			return { "name": "Bucket", "type": "Gear", "group": "Container", "traits": "", "description": "A simple bucket holds 1 cubic ft. or up to 65 lb. of liquid or material and when full. A bucket filled with liquid holds about 7 gallons.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 2 }
		case "case, scroll":
			return { "name": "Case, scroll", "type": "Gear", "group": "Container", "traits": "", "description": "A leather or wooden scroll case easily holds four scrolls.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 2 }
		case "chest, small":
			return { "name": "Chest, Small", "type": "Gear", "group": "Container", "traits": "", "description": "A common, wooden chest.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 15, "value": 2 }
		case "chest, medium":
			return { "name": "Chest, Medium", "type": "Gear", "group": "Container", "traits": "", "description": "A common, wooden chest.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 25, "value": 3 }
		case "chest, large":
			return { "name": "Chest, Large", "type": "Gear", "group": "Container", "traits": "", "description": "A common, wooden chest.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 35, "value": 4 }
		case "cooler":
			return { "name": "Cooler", "type": "Gear", "group": "Container", "traits": "", "description": "This chest can contain up to 4 cubic feet of goods, and it has a lining of insulating material between two sheets of wood. As long as the chest is partially filled with a cold substance—such as cold water or ice—items stored within decompose at half their regular rate. Ice melts on a consistent basis (typically four to six times in a 24-hour period) and must be regularly replenished to maintain the effectiveness of this chest.", "complexity": "15:Artisan", "time": "3", "components": "Insulation", "bulk": 25, "value": 2 }
		case "pot":
			return { "name": "Pot", "type": "Gear", "group": "Container", "traits": "", "description": "Pots come in a variety of materials, but the most common is formed of iron.", "complexity": "", "time": "1", "components": "", "bulk": 2, "value": 1 }
		case "bottle":
			return { "name": "Bottle", "type": "Gear", "group": "Container", "traits": "", "description": "This glass bottle holds about a pint and includes a cork.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 2 }
		case "canteen":
			return { "name": "Canteen", "type": "Gear", "group": "Container", "traits": "", "description": "This hollow container is made of wood, a gourd, or metal, and carries liquid.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 2 }
		case "cauldron":
			return { "name": "Cauldron", "type": "Gear", "group": "Container", "traits": "", "description": "This larger version of an iron pot holds approximately 1 gallon—enough to fill the bellies of four hungry humans for one meal.", "complexity": "", "time": "1", "components": "", "bulk": 8, "value": 2 }
		case "coffee pot":
			return { "name": "Coffee pot", "type": "Gear", "group": "Container", "traits": "", "description": "This tall, teapot-like device contains a small chamber for coffee grounds and a large chamber for water, connected by a small tube. Heating the pot forces boiling water through the tube and into the grounds. A glass knob at the top of the tube allows you to see the color of the brew and stop when it is sufficiently strong. It can brew up to 4 cups of coffee at a time. It can also be used to make tea, steep medicinal herbs, or just boil water.", "complexity": "15:Artisan", "time": "2", "components": "", "bulk": 3, "value": 2 }
		case "flask":
			return { "name": "Flask", "type": "Gear", "group": "Container", "traits": "", "description": "A flask holds 1 pint of liquid and weighs 1 lb. when full.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 1 }
		case "jug":
			return { "name": "Jug", "type": "Gear", "group": "Container", "traits": "", "description": "This basic jug is fitted with a stopper and holds 1 gallon of liquid.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 1 }
		case "pitcher":
			return { "name": "Pitcher", "type": "Gear", "group": "Container", "traits": "", "description": "A clay pitcher.", "complexity": "", "time": "1", "components": "", "bulk": 3, "value": 1 }
		case "vial":
			return { "name": "Vial", "type": "Gear", "group": "Container", "traits": "", "description": "A vial is made out of glass or steel and holds 1 ounce of liquid.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 2 }
		case "canvas (1 sq. yd)":
			return { "name": "Canvas (1 sq. yd)", "type": "Gear", "group": "Writing", "traits": "", "description": "This square yard of heavy cloth is suitable for painting, for covering items in a rainstorm, for creating a sail, or as an improvised bag. It is not waterproof but can be treated with oil, wax, or resin to make it water-resistant.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 1, "value": 1 }
		case "inkpen":
			return { "name": "Inkpen", "type": "Gear", "group": "Writing", "traits": "", "description": "This is a wooden stylus with a metal tip that retains a small amount of ink after you dip it in a vial of ink.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 1, "value": 1 }
		case "paper (30 sheets)":
			return { "name": "Paper (30 sheets)", "type": "Gear", "group": "Writing", "traits": "", "description": "A sheet of ordinary paper typically measures 9 inches by 6 inches and is unsuitable for making magical scrolls. ", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 1, "value": 1 }
		case "chain (10 ft.)":
			return { "name": "Chain (10 ft.)", "type": "Gear", "group": "Bindings", "traits": "", "description": "This is a 10 ft. length of standard chain.", "complexity": "15:Artisan", "time": "1", "components": "", "bulk": 3, "value": 5 }
		case "magic restraints":
			return { "name": "Magic Restraints", "type": "Gear", "group": "Bindings", "traits": "", "description": "These steel chain bindings wrap around the chest, arms, and legs. These chains are linked to metal bindings meant to clamp around the arms and legs that contain sealing stone. When worn properly, the sealing stone prevents the usage of ki on the wearer, preventing them from casting spells while retaining full body movement. Most magic restraints have locks that seal the chain on the back; add the cost of the lock you want to the cost of the restraints.", "complexity": "15:Mechanics", "time": "4", "components": "Sigillite", "bulk": 1, "value": 8 }
		case "manacles, steel":
			return { "name": "Manacles, steel", "type": "Gear", "group": "Bindings", "traits": "", "description": "Manacles can bind a Medium creature. ", "complexity": "15:Artisan", "time": "2", "components": "", "bulk": 1, "value": 4 }
		case "lock, average":
			return { "name": "Lock, average", "type": "Gear", "group": "Bindings", "traits": "", "description": "A simple lock can be unlocked with a standard Mechanical check.", "complexity": "15:Mechanics", "time": "2", "components": "", "bulk": 1, "value": 8 }
		case "lock, good":
			return { "name": "Lock, good", "type": "Gear", "group": "Bindings", "traits": "", "description": "A good lock can be unlocked with a difficult Mechanical check.", "complexity": "20:Mechanics", "time": "3", "components": "", "bulk": 1, "value": 12 }
		case "lock, superior":
			return { "name": "Lock, superior", "type": "Gear", "group": "Bindings", "traits": "", "description": "A superior lock can be unlocked with a risky Mechanical check.", "complexity": "30:Mechanics", "time": "4", "components": "", "bulk": 1, "value": 16 }
		case "ladder":
			return { "name": "Ladder", "type": "Gear", "group": "Tools", "traits": "", "description": "Ladders can be climbed. Most ladders are 40 feet tall.", "complexity": "", "time": "2", "components": "", "bulk": 10, "value": 5 }
		case "ladder, folding":
			return { "name": "Ladder, folding", "type": "Gear", "group": "Tools", "traits": "", "description": "Ladders can be climbed. Folding ladders are 30 feet tall.", "complexity": "", "time": "3", "components": "", "bulk": 8, "value": 6 }
		case "shovel":
			return { "name": "Shovel", "type": "Gear", "group": "Tools", "traits": "", "description": "A shovel helps with digging.", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2 }
		case "spyglass":
			return { "name": "Spyglass", "type": "Gear", "group": "Tools", "traits": "", "description": "Objects viewed through a spyglass are magnified to twice their size.", "complexity": "", "time": "1", "components": "", "bulk": 1, "value": 2 }
		case "stretcher":
			return { "name": "Stretcher", "type": "Gear", "group": "Tools", "traits": "", "description": "A stretcher allows two people to share the burden of carrying one heavy object. You can also use it to drag a load you couldn’t carry on your own. A stretcher holds up to 300 pounds.", "complexity": "", "time": "1", "components": "", "bulk": 15, "value": 2 }
		case "umbrella":
			return { "name": "Umbrella", "type": "Gear", "group": "Tools", "traits": "", "description": "An umbrella is a heavier, waterproof parasol made of oiled or waxed cloth. It is intended to keep you dry in the rain or snow, but can still protect against sunlight just like a standard parasol.", "complexity": "", "time": "1", "components": "", "bulk": 5, "value": 2 }
		case "outfit, aristocrat’s":
			return { "name": "Outfit, Aristocrat’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "These clothes are designed specifically to be expensive and gaudy. Precious metals and gems are worked into the clothing.", "complexity": "15:Artisan", "time": "", "components": "Gold", "bulk": 3, "value": 7 }
		case "outfit, artisan’s":
			return { "name": "Outfit, Artisan’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This outfit includes a shirt with buttons, a skirt or pants with a drawstring, shoes, and perhaps a cap or hat. It may also include a belt or a leather or cloth apron for carrying tools.", "complexity": "", "time": "", "components": "", "bulk": 1, "value": 2 }
		case "outfit, burglar’s":
			return { "name": "Outfit, Burglar’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This outfit consists of fitted pants, a shirt, a hooded reversible cloak, soft leather boots, and a face mask, all in dark or neutral colors. The outfit’s few buttons and rivets are wrapped in dull, dark cloth to avoid jingling or reflecting light. A number of loops and shallow pockets are also worked into the outfit, providing ample0aces for stashing small tools or weapons.", "complexity": "", "time": "", "components": "", "bulk": 1, "value": 2 }
		case "outfit, cold-weather":
			return { "name": "Outfit, Cold-Weather", "type": "Gear", "group": "Clothing", "traits": "", "description": "This vestment works just like a cold-weather outfit, granting advantage on Constitution saving throws against exposure to cold weather.", "complexity": "", "time": "", "components": "", "bulk": 2, "value": 3 }
		case "outfit, courtesan’s":
			return { "name": "Outfit, Courtesan’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This outfit includes fine silk or satin garments tailored to complement your figure. In addition, the outfit contains a loose shawl or robe with several discreet pockets for items such as perfume, massage oils, or even a small dagger.", "complexity": "", "time": "", "components": "", "bulk": 1, "value": 3 }
		case "outfit, courtier’s":
			return { "name": "Outfit, Courtier’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This outfit includes fancy, tailored clothes in whatever fashion happens to be the current style in the courts of the nobles. Anyone trying to influence nobles or courtiers while wearing street dress will have a hard time of it (–2 penalty on Charisma-based skill checks to influence such individuals).", "complexity": "15:Artisan", "time": "", "components": "", "bulk": 2, "value": 5 }
		case "outfit, entertainer’s":
			return { "name": "Outfit, Entertainer’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This set of flashy—perhaps even gaudy—clothes is for entertaining. While the outfit looks whimsical, its practical design lets you tumble, dance, walk a tightrope, or just run (if the audience turns ugly).", "complexity": "", "time": "", "components": "", "bulk": 1, "value": 2 }
		case "outfit, explorer’s":
			return { "name": "Outfit, Explorer’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This set of clothes is for someone who never knows what to expect. It includes sturdy boots, leather breeches or a skirt, a belt, a shirt (perhaps with a vest or jacket), gloves, and a cloak. Rather than a leather skirt, a leather overtunic may be worn over a cloth skirt. The clothes have plenty of pockets (especially the cloak). The outfit also includes any extra accessories you might need, such as a scarf or a wide-brimmed hat.", "complexity": "", "time": "", "components": "", "bulk": 2, "value": 3 }
		case "outfit, hot weather":
			return { "name": "Outfit, Hot Weather", "type": "Gear", "group": "Clothing", "traits": "", "description": "Covering your body from head to foot in light, airy cloth keeps you cooler than baring your skin to the sun. This outfit typically consists of a loose linen robe and either a turban or loose head covering and veil. The outfit provides advantage on Constitution saving throws to resist warm or hot weather.", "complexity": "", "time": "", "components": "", "bulk": 1, "value": 3 }
		case "outfit, monk’s":
			return { "name": "Outfit, Monk’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This simple outfit includes sandals, loose breeches, and a loose shirt, and is bound together with sashes. The outfit is designed to give you maximum mobility, and it’s made of high-quality fabric. You can conceal small weapons in pockets hidden in the folds, and the sashes are strong enough to serve as short ropes.", "complexity": "", "time": "", "components": "", "bulk": 1, "value": 2 }
		case "outfit, pauper’s":
			return { "name": "Outfit, Pauper’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This set of clothes consists of a loose shirt and baggy breeches, or a loose shirt and skirt or overdress.", "complexity": "", "time": "", "components": "", "bulk": 1, "value": 1 }
		case "outfit, pickpocket’s":
			return { "name": "Outfit, Pickpocket’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "Outfitted with concealed pockets, this clothing gives you a +2 bonus on Sleight of Hand (Conceal) checks.", "complexity": "", "time": "", "components": "", "bulk": 1, "value": 2 }
		case "outfit, scholar’s":
			return { "name": "Outfit, Scholar’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "Perfect for a scholar, this outfit includes a robe, a belt, a cap, soft shoes, and possibly a cloak.", "complexity": "", "time": "", "components": "", "bulk": 2, "value": 2 }
		case "outfit, traveler’s":
			return { "name": "Outfit, Traveler’s", "type": "Gear", "group": "Clothing", "traits": "", "description": "This set of clothes consists of boots, a wool skirt or breeches, a sturdy belt, a shirt (perhaps with a vest or jacket), and an ample cloak with a hood.", "complexity": "", "time": "", "components": "", "bulk": 2, "value": 2 }
		default:
			return { "name": "", "type": "", "group": "", "traits": "", "description": "", "complexity": "", "time": "", "components": "", "bulk": 0, "value": 0 }

	}
}


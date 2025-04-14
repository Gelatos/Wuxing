var WuxGoods = WuxGoods || (function() {
    'use strict';

    var
        keys = ["Materials","Pine","Cotton","Hemp","Glass","Clay","Granite","Iron","Snow","Ice","Ironwood","Fireglass","Crystal","Steel","Glaceum","Viridium","Rubrumium","Platinum","Adamantine","Obsidian","Mithral","White Obsidian","Albryst","Common","Water","Stimulant","Component","Acid","Soap","Earthen Gelatin","Beast Gelatin","Magnet","Bee's wax","Oil","Alcohol","Black Powder","Nickel","Altillite","Mana Gem","Morillite","Sigilite","Gold","Ventu Stone","Pnevmarite","Beast Meat","Bird Meat","Saurian Meat","Beast Bone","Bird Bone","Saurian Bone","Bird Egg","Coastal","Honey Apple","Astragalus","Green Beans","Sea Cabbage","Short Carrot","Thin Cucumber","Doxyl Leaf","Highland Lettuce","Maidenhair","Truffle Mushrooms","Black Olives","Crisp Onion","Coastal Orange","Blue Popato","Sweet Peas","Tart Radish","Sea Salt","Ruby Strawberries","Ruby Tomato","Coastal Wheat","Cold","Brahmi","Winter Broccoli","Cacaold Beans","Long Carrot","Ice Grapes","Paraherb","Schizandra","Blue Spinach","White Popato","Frost Pumpkin","Round Turnip","Blanche Wheat","Desert","Aloe","Sweet Beans","White Cabbage","Spicy Carrot","Chickpeas","Giant Cucumber","White Garlic","Sand Ginger","Ginseng","Lycium","Sand Melon","Sand Onion","Arid Peach","Bleached Pear","Scorcher Pepper","Rhynoseed","Flaked Salt","Crystal Sugarcane","Turmeric","Sunset Wheat","Yidash","Grassland","Camellia Leaves","Caswinnis","Gypsy Caswinnis","Endura","Pearl Ginger","Highland Grapes","Clear Grapes","Honey","Lentils","Button Mushrooms","Sweet Onion","Tall Grain Rice","Tart Strawberries","Thousandcorn","Lowland Wheat","Yeast","Mountains","Fine Apricots","Barley","White Broccoli","Coffee Beans","Earthy Ginger","Joza Leaf","Red Lettuce","Black Mushrooms","Mountain Orange","Vibrant Peach","Long Peas","Bleached Pepper","White Radish","Rage Fruit","Short Grain Rice","Rock Salt","Shepherd's Purse","Soybeans","Green Spinach","Syrup Sugarcane","Sulfur","Hardy Tomato","Purple Turnip","Tropical","Pineapple","Victoria Lily","Coconut","Seafood","Char Eel","Lakebed Carp","Midnight Sardine","Minervan Tuna","Pebble Shrimp","Pink Trout","Rock Clam","Royal Crab","Voyager Salmon"]
        ,
        values = {"Materials":{"name":"Materials","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Pine":{"name":"Pine","fieldName":"","group":"Material","description":"A common type of wood. While Pine is the listed value, these statistics are shared amongst all wood.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"Flammable; Sturdy","affinity":"Wood","location":"Any","rarity":1},
            "Cotton":{"name":"Cotton","fieldName":"","group":"Material","description":"Cotton is a naturally occurring staple fiber. Its flexibility, warmth, and ease to grow makes it popular when used to make clothing and fabric.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"Flammable; Flexible","affinity":"Wood","location":"Any","rarity":1},
            "Hemp":{"name":"Hemp","fieldName":"","group":"Material","description":"This plant is thick and fibrous. It is often used to create durable materials.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"Flammable; Flexible","affinity":"Wood","location":"Any","rarity":1},
            "Glass":{"name":"Glass","fieldName":"","group":"Material","description":"Glass is a non-crystalline, often transparent amorphous solid, that has widespread practical, technological, and decorative use.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"Sharp; Sturdy; Transparent","affinity":"Fire","location":"Any","rarity":1},
            "Clay":{"name":"Clay","fieldName":"","group":"Material","description":"This type of clay hardens into sturdy rock. It is commonly used when making bricks.","variable":"","category":"","itemType":"Goods","bulk":1,"value":10,"traits":"Sturdy","affinity":"Earth","location":"Any","rarity":1},
            "Granite":{"name":"Granite","fieldName":"","group":"Material","description":"Granite is a coarse-grained igneous rock.","variable":"","category":"","itemType":"Goods","bulk":1,"value":10,"traits":"Sturdy","affinity":"Earth","location":"Any","rarity":1},
            "Iron":{"name":"Iron","fieldName":"","group":"Material","description":"Iron is one of the most common metals.","variable":"","category":"","itemType":"Goods","bulk":1,"value":15,"traits":"Sharp; Sturdy","affinity":"Metal","location":"Any","rarity":1},
            "Snow":{"name":"Snow","fieldName":"","group":"Material","description":"Snow is a powdery substance made from solidified water. When this is stored as dust it is typically in water form. Magic can instantly solidify water into snow.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"Flexible; Frozen","affinity":"Water","location":"Any","rarity":1},
            "Ice":{"name":"Ice","fieldName":"","group":"Material","description":"Ice is solid water. When this is stored as dust it is typically in water form. Magic can instantly solidify water into ice.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"Frozen; Sharp; Sturdy; Transparent","affinity":"Water","location":"Any","rarity":1},
            "Ironwood":{"name":"Ironwood","fieldName":"","group":"Material","description":"Ironwood is a sturdy and rare tree that is unnaturally hard as it has grown with iron.","variable":"","category":"","itemType":"Goods","bulk":1,"value":90,"traits":"Flammable; Sturdy","affinity":"Wood; Metal","location":"Any","rarity":2},
            "Fireglass":{"name":"Fireglass","fieldName":"","group":"Material","description":"This glass found near volcanoes has a light red tint. It is stronger than most glass and leaves burns when swung.","variable":"","category":"","itemType":"Goods","bulk":1,"value":60,"traits":"Sharp; Transparent","affinity":"Fire","location":"Any","rarity":2},
            "Crystal":{"name":"Crystal","fieldName":"","group":"Material","description":"This rock has a transparent sheen that hides a strong durability.","variable":"","category":"","itemType":"Goods","bulk":1,"value":30,"traits":"Sturdy; Transparent","affinity":"Earth","location":"Any","rarity":2},
            "Steel":{"name":"Steel","fieldName":"","group":"Material","description":"This enhanced steel is made from ether and does not occur naturally in the world.","variable":"","category":"","itemType":"Goods","bulk":1,"value":30,"traits":"Sharp; Sturdy","affinity":"Metal","location":"Any","rarity":2},
            "Glaceum":{"name":"Glaceum","fieldName":"","group":"Material","description":"This type of ice is incredibly thick and sturdy as the ice has frozen in one large mass all at once. It has become completely opaque with a slight tint of blue.","variable":"","category":"","itemType":"Goods","bulk":1,"value":60,"traits":"Frozen; Sharp; Sturdy","affinity":"Water","location":"Any","rarity":2},
            "Viridium":{"name":"Viridium","fieldName":"","group":"Material","description":"Magically created glass that is tough and sturdy glass has a faint green tint. It burns with acid when it is used to strike.","variable":"","category":"","itemType":"Goods","bulk":1,"value":210,"traits":"Sharp; Transparent","affinity":"Wood; Fire","location":"Any","rarity":3},
            "Rubrumium":{"name":"Rubrumium","fieldName":"","group":"Material","description":"This magically created glass has a light red tint like fireglass. It is stronger than its natural brother and likewise leaves burns when swung.","variable":"","category":"","itemType":"Goods","bulk":1,"value":210,"traits":"Sharp; Transparent","affinity":"Fire; Earth","location":"Any","rarity":3},
            "Platinum":{"name":"Platinum","fieldName":"","group":"Material","description":"Platinum is one of the strongest metals in existance. It is sought for its incredible durability.","variable":"","category":"","itemType":"Goods","bulk":1,"value":150,"traits":"Sharp; Sturdy","affinity":"Metal","location":"Any","rarity":3},
            "Adamantine":{"name":"Adamantine","fieldName":"","group":"Material","description":"A magically created material that is an earthy red in color. It's well known for its incredible durability.\n\nThis material is aspected to Fire but is also resistant to Metal.","variable":"","category":"","itemType":"Goods","bulk":1,"value":150,"traits":"Sturdy","affinity":"Fire; Earth","location":"Any","rarity":3},
            "Obsidian":{"name":"Obsidian","fieldName":"","group":"Material","description":"This black stone is the strongest, naturally occuring, material that is known to man. Incredibly rare, it is sought for its strength.","variable":"","category":"","itemType":"Goods","bulk":1,"value":300,"traits":"Sharp; Sturdy","affinity":"Metal; Earth","location":"Any","rarity":4},
            "Mithral":{"name":"Mithral","fieldName":"","group":"Material","description":"A magically created metal made with water to create a remarkably light material with incredible strength.","variable":"","category":"","itemType":"Goods","bulk":1,"value":240,"traits":"Sharp; Sturdy","affinity":"Metal; Water","location":"Any","rarity":4},
            "White Obsidian":{"name":"White Obsidian","fieldName":"","group":"Material","description":"This obsidian has a white, metallic sheen. It has been created magically and only by the most powerful of mages.","variable":"","category":"","itemType":"Goods","bulk":1,"value":360,"traits":"Sharp; Sturdy","affinity":"Metal; Earth","location":"Any","rarity":4},
            "Albryst":{"name":"Albryst","fieldName":"","group":"Material","description":"This pure white crystal-like substance is cold to the touch like ice but strangely doesn't melt.","variable":"","category":"","itemType":"Goods","bulk":1,"value":300,"traits":"Sharp; Sturdy","affinity":"Water; Earth","location":"Any","rarity":4},
            "Common":{"name":"Common","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Water":{"name":"Water","fieldName":"","group":"Compound","description":"Water","variable":"","category":"","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Water","location":"Any","rarity":1},
            "Stimulant":{"name":"Stimulant","fieldName":"","group":"Compound","description":"A variety of common spices used to enhance the properties of ingredients.","variable":"","category":"","itemType":"Goods","bulk":1,"value":10,"traits":"Edible","affinity":"Wood","location":"Any","rarity":1},
            "Component":{"name":"Component","fieldName":"","group":"Compound","description":"A variety of gears, shaped metals, and widgets to build mechanical devices.","variable":"","category":"","itemType":"Goods","bulk":1,"value":120,"traits":"","affinity":"Metal","location":"Any","rarity":2},
            "Acid":{"name":"Acid","fieldName":"","group":"Compound","description":"A common acid.","variable":"","category":"Acid","itemType":"Goods","bulk":1,"value":15,"traits":"","affinity":"Wood","location":"Any","rarity":1},
            "Soap":{"name":"Soap","fieldName":"","group":"Compound","description":"You can use this thick block of soap to scrub clothes, pots, linens, or anything else that might be dirty. ","variable":"","category":"Gear","itemType":"Goods","bulk":1,"value":15,"traits":"","affinity":"Wood","location":"Any","rarity":1},
            "Earthen Gelatin":{"name":"Earthen Gelatin","fieldName":"","group":"Compound","description":"Created from saurian bones, this protein is squishy with an earthen and crumbly texture.","variable":"","category":"Gelatin","itemType":"Goods","bulk":1,"value":30,"traits":"","affinity":"Wood","location":"Any","rarity":1},
            "Beast Gelatin":{"name":"Beast Gelatin","fieldName":"","group":"Compound","description":"Created from beast bones, this protein is squishy and has a neutral flavor.","variable":"","category":"Gelatin","itemType":"Goods","bulk":1,"value":15,"traits":"","affinity":"Wood","location":"Any","rarity":1},
            "Magnet":{"name":"Magnet","fieldName":"","group":"Compound","description":"This mineral is very attractive.","variable":"","category":"Gear","itemType":"Goods","bulk":1,"value":5,"traits":"","affinity":"Metal","location":"Any","rarity":1},
            "Bee's wax":{"name":"Bee's wax","fieldName":"","group":"Compound","description":"Waxes are a diverse class of organic compounds that are malleable solids.","variable":"","category":"Wax","itemType":"Goods","bulk":1,"value":5,"traits":"","affinity":"Wood","location":"Any","rarity":1},
            "Oil":{"name":"Oil","fieldName":"","group":"Compound","description":"Oil.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"","affinity":"Fire","location":"Any","rarity":1},
            "Alcohol":{"name":"Alcohol","fieldName":"","group":"Compound","description":"A low grade alcohol for disinfecting.","variable":"","category":"","itemType":"Goods","bulk":1,"value":3,"traits":"","affinity":"Water","location":"Any","rarity":1},
            "Black Powder":{"name":"Black Powder","fieldName":"","group":"Compound","description":"A powdery substance that explodes when ignited.","variable":"","category":"Explosive","itemType":"Goods","bulk":1,"value":15,"traits":"","affinity":"Fire","location":"Any","rarity":2},
            "Nickel":{"name":"Nickel","fieldName":"","group":"Compound","description":"Nickel is a slightly golden, common metal.","variable":"","category":"","itemType":"Goods","bulk":1,"value":15,"traits":"Sharp; Sturdy","affinity":"Metal","location":"Any","rarity":1},
            "Altillite":{"name":"Altillite","fieldName":"","group":"Compound","description":"This brittle, orange crystal can hold onto ki-infused magical energy incredibly well.","variable":"","category":"","itemType":"Goods","bulk":1,"value":60,"traits":"Sturdy","affinity":"Earth","location":"Any","rarity":2},
            "Mana Gem":{"name":"Mana Gem","fieldName":"","group":"Compound","description":" In its most pure form, this is a beautiful clear gemstone with an incredible durability. However most often it is most often found in a variety of different colors swirling with a hazy energy within. What is uniquely special about this gemstone is when it is formed it quickly takes on an elemental property of the environment it is placed within. Green mana gems are associated with wood, red with fire, yellow with earth, violet with metal, and blue with water.\n\nMana gems that have a spirit manifest within them have especially interesting qualities. If both the spirit and the mana gem's elemental affinity match, then the gem can glow a soft light at the spirit's whim. More incredibly, an ethereal caster can cast spells through the mana gem if a spirit is within it. See <a href='character-casting.html#gemCasting'>Gem Casting</a> for more information.","variable":"","category":"","itemType":"Goods","bulk":1,"value":90,"traits":"Sturdy","affinity":"Earth","location":"Any","rarity":2},
            "Morillite":{"name":"Morillite","fieldName":"","group":"Compound","description":"Morillite is a crystal that is brittle like glass. It can form in a variety of colors but is most often a soft vermillion. When magical energy flows through it, the crystal will shine. It seems to have properties that allow it to hold ki temporarily.","variable":"","category":"","itemType":"Goods","bulk":1,"value":30,"traits":"Sharp; Transparent","affinity":"Earth","location":"Any","rarity":2},
            "Sigilite":{"name":"Sigilite","fieldName":"","group":"Compound","description":"Sigilite, or more well known as binding stone, is a black stone with a glass-like sheen. When placed in close proximity to a source of ki, it disrupts its creation preventing magical effects from occurring. Because of this property, binding stone is often used in restraints to inhibit the casting of magic while not restricting the wearer's movement.\n\nSigilite's range to disrupt ki is dependant on the amount concentrated in an area. 1 lb. of Sigilite can disrupt ki up to 1 foot away maximizing out to 10 feet for 10 lbs. of Sigilite. Often when making restraints, Sigilite will be used in amounts as small as 0.1 lb as a cost saving alternative due to the closeness of the restraints to the ki source.","variable":"","category":"","itemType":"Goods","bulk":1,"value":60,"traits":"Sturdy","affinity":"Earth","location":"Any","rarity":2},
            "Gold":{"name":"Gold","fieldName":"","group":"Compound","description":"While valuable for its appearance and use as currency, gold has its uses in magical application too. Gold has the unique property of acting as a mana stabilizer, able to prevent mana from separating. This has made gold important in day to day life, used in building and item construction frequently.\n\nOnce gold has been mixed with an object, it masks magical energy making it difficult to detect. The object becomes almost impossible to tell apart from an object made from natural forming substances.\n\nGold formed into a magical item often has the gold deep within the object, stretched thin and weaving all over the interior of the object to ensure a stable material. Skilled artisans may use the gold to create more intricate designs on the surface. Gold has always been a beautiful accent to a piece and to use it creatively in an item is a sign of artistic talent of the craftsman.","variable":"","category":"","itemType":"Goods","bulk":1,"value":30,"traits":"","affinity":"Metal","location":"Any","rarity":2},
            "Ventu Stone":{"name":"Ventu Stone","fieldName":"","group":"Compound","description":"Ventu Stone is a type of green emerald with a swirling, wind-like, core. This wind is ether that creates a unique magical resonance. Those with communication spells can target the ventu stone itself instead of a location to deliver their messages, as long as they are aware of the magical resonance. The holder of the ventu stone can then put a little magical energy into the stone to hear the message. This message is communicated directly to the person that supplies the magic.","variable":"","category":"","itemType":"Goods","bulk":1,"value":60,"traits":"","affinity":"Metal","location":"Any","rarity":2},
            "Pnevmarite":{"name":"Pnevmarite","fieldName":"","group":"Compound","description":"Colloquially called Spirit Stone, Pnevmarite is a violet stone with an amber glow has the unique property of repelling spirits from passing through its aura. It effectively prevents manifestation by spirits.\n\nHowever, while Pnevmarite can prevent spirits from manifesting and possession, it cannot prevent a spirit from entering its aura if a spirit has already manifested in a creature or object that is entering the Pnevmarite protected area.\n\nPnevmarite has a secondary property. It is capable of storing mana within it to release it at a later time. This property is still being explored and as such the limits of pnevarmite are currently unknown.","variable":"","category":"","itemType":"Goods","bulk":1,"value":180,"traits":"Transparent","affinity":"Earth","location":"Any","rarity":3},
            "Beast Meat":{"name":"Beast Meat","fieldName":"","group":"Meat","description":"Red meat from a beast. Savory and rich.","variable":"","category":"Beast","itemType":"Goods","bulk":2,"value":35,"traits":"Edible","affinity":"Earth","location":"Any","rarity":2},
            "Bird Meat":{"name":"Bird Meat","fieldName":"","group":"Meat","description":"White meat from a bird. Slightly sweet with a dry texture.","variable":"","category":"Bird","itemType":"Goods","bulk":1,"value":30,"traits":"Edible","affinity":"Earth","location":"Any","rarity":2},
            "Saurian Meat":{"name":"Saurian Meat","fieldName":"","group":"Meat","description":"Red meat from a saurian. It is tough and difficult to chew.","variable":"","category":"Saurian","itemType":"Goods","bulk":2,"value":15,"traits":"Edible","affinity":"Earth","location":"Any","rarity":2},
            "Beast Bone":{"name":"Beast Bone","fieldName":"","group":"Bone","description":"A large white bone from a beast.","variable":"","category":"Beast","itemType":"Goods","bulk":2,"value":10,"traits":"","affinity":"Metal","location":"Any","rarity":2},
            "Bird Bone":{"name":"Bird Bone","fieldName":"","group":"Bone","description":"A hollow bone of a bird.","variable":"","category":"Bird","itemType":"Goods","bulk":1,"value":10,"traits":"","affinity":"Metal","location":"Any","rarity":2},
            "Saurian Bone":{"name":"Saurian Bone","fieldName":"","group":"Bone","description":"A huge bone from a saurian.","variable":"","category":"Saurian","itemType":"Goods","bulk":4,"value":40,"traits":"","affinity":"Metal","location":"Any","rarity":2},
            "Bird Egg":{"name":"Bird Egg","fieldName":"","group":"Egg","description":"An egg from a bird.","variable":"","category":"Bird","itemType":"Goods","bulk":1,"value":8,"traits":"Edible","affinity":"Fire","location":"Any","rarity":2},
            "Coastal":{"name":"Coastal","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Honey Apple":{"name":"Honey Apple","fieldName":"","group":"Fruit","description":"A tart and sour fruit found near coastal regions.","variable":"","category":"Apple","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Astragalus":{"name":"Astragalus","fieldName":"","group":"Supplement","description":"A powerful coastal herb used to boost immuno-response and reduce fatigue.","variable":"","category":"","itemType":"Goods","bulk":1,"value":8,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Green Beans":{"name":"Green Beans","fieldName":"","group":"Vegetable","description":"Green beans that have grown in areas of high water intake.","variable":"","category":"Beans","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Sea Cabbage":{"name":"Sea Cabbage","fieldName":"","group":"Vegetable","description":"A leafy green vegetable used often in seaside cuisine.","variable":"","category":"Cabbage","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Short Carrot":{"name":"Short Carrot","fieldName":"","group":"Vegetable","description":"A short orange root vegetable sweet to the taste.","variable":"","category":"Carrot","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Thin Cucumber":{"name":"Thin Cucumber","fieldName":"","group":"Vegetable","description":"A thin, green gourd filled with water.","variable":"","category":"Cucumber","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Doxyl Leaf":{"name":"Doxyl Leaf","fieldName":"","group":"Supplement","description":"The leaf of a green shrub on islands. It excretes a substance that has numbing qualities.","variable":"","category":"","itemType":"Goods","bulk":1,"value":20,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":2},
            "Highland Lettuce":{"name":"Highland Lettuce","fieldName":"","group":"Vegetable","description":"A leafy green vegetable known for its crunch.","variable":"","category":"Lettuce","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Maidenhair":{"name":"Maidenhair","fieldName":"","group":"Supplement","description":"A plant leaf taken from the maiden tree commonly seen on the coastline. It is used to treat cognitive disorders, vertigo, and dizziness.","variable":"","category":"","itemType":"Goods","bulk":1,"value":8,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Truffle Mushrooms":{"name":"Truffle Mushrooms","fieldName":"","group":"Vegetable","description":"A mushroom that grows in the shade of the maiden tree. It's known for its unique savory flavor.","variable":"","category":"Mushrooms","itemType":"Goods","bulk":1,"value":5,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Black Olives":{"name":"Black Olives","fieldName":"","group":"Vegetable","description":"A black and salty fruit used often for its oil.","variable":"","category":"Olives","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Crisp Onion":{"name":"Crisp Onion","fieldName":"","group":"Vegetable","description":"A tart layered vegetable often used in Minervan cooking.","variable":"","category":"Onion","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Coastal Orange":{"name":"Coastal Orange","fieldName":"","group":"Fruit","description":"A sour orange fruit found in groves.","variable":"","category":"Orange","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Blue Popato":{"name":"Blue Popato","fieldName":"","group":"Starch","description":"A starchy root plant that fluorishes in high water environments.","variable":"","category":"Popato","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Sweet Peas":{"name":"Sweet Peas","fieldName":"","group":"Vegetable","description":"A long, green leaf containing several small, sweet, green pods.","variable":"","category":"Peas","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Tart Radish":{"name":"Tart Radish","fieldName":"","group":"Vegetable","description":"A purple root vegetable with a slight sweetness.","variable":"","category":"Radish","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Sea Salt":{"name":"Sea Salt","fieldName":"","group":"Supplement","description":"Salt produced by sifting it from the ocean.","variable":"","category":"Salt","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Ruby Strawberries":{"name":"Ruby Strawberries","fieldName":"","group":"Fruit","description":"A bright red berry beloved for its light flavor of sour and sweet.","variable":"","category":"Berries","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Ruby Tomato":{"name":"Ruby Tomato","fieldName":"","group":"Vegetable","description":"A juicy red vegetable grown on a vine.","variable":"","category":"Tomato","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Coastal Wheat":{"name":"Coastal Wheat","fieldName":"","group":"Starch","description":"A low-water grain common around the world.","variable":"","category":"Wheat","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Coastal","rarity":1},
            "Cold":{"name":"Cold","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Brahmi":{"name":"Brahmi","fieldName":"","group":"Supplement","description":"A cold-growing plant with properties to reduce infection and enhance memory.","variable":"","category":"","itemType":"Goods","bulk":1,"value":8,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Winter Broccoli":{"name":"Winter Broccoli","fieldName":"","group":"Vegetable","description":"A green plant that has survived in the harshest of cold weather.","variable":"","category":"Broccoli","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Cacaold Beans":{"name":"Cacaold Beans","fieldName":"","group":"Supplement","description":"This cold bean found in colder climates is often grinded to a powder and ingested for its energizing and mood boosting properties.","variable":"","category":"","itemType":"Goods","bulk":1,"value":15,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Long Carrot":{"name":"Long Carrot","fieldName":"","group":"Vegetable","description":"A long, light orange root vegetable somewhat sweet and bitter.","variable":"","category":"Carrot","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Ice Grapes":{"name":"Ice Grapes","fieldName":"","group":"Fruit","description":"A slow growing fruit that fluorishes in cold temperatures. Is abnormally cold to the touch. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized.","variable":"","category":"Grapes","itemType":"Goods","bulk":1,"value":50,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":2},
            "Paraherb":{"name":"Paraherb","fieldName":"","group":"Supplement","description":"A plant that is known to have powerful healing properties. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized. ","variable":"","category":"","itemType":"Goods","bulk":1,"value":100,"traits":"","affinity":"Wood","location":"Cold","rarity":2},
            "Schizandra":{"name":"Schizandra","fieldName":"","group":"Supplement","description":"A cold growing plant with vibrant red berries. This plant helps speed up recovery of wounds and improves poison recovery.","variable":"","category":"","itemType":"Goods","bulk":1,"value":12,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Blue Spinach":{"name":"Blue Spinach","fieldName":"","group":"Vegetable","description":"A leafy blue-green vegetable common in Libran cuisine.","variable":"","category":"Spinach","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "White Popato":{"name":"White Popato","fieldName":"","group":"Starch","description":"A starchy root plant that fluorishes in cold environments.","variable":"","category":"Popato","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Frost Pumpkin":{"name":"Frost Pumpkin","fieldName":"","group":"Vegetable","description":"A large, light orange gourd popular amongst children for its sweetness.","variable":"","category":"Pumpkin","itemType":"Goods","bulk":2,"value":5,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Round Turnip":{"name":"Round Turnip","fieldName":"","group":"Vegetable","description":"A small, round, root vegetable common in cold locales.","variable":"","category":"Turnip","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Blanche Wheat":{"name":"Blanche Wheat","fieldName":"","group":"Starch","description":"A low-water grain common around the world.","variable":"","category":"Wheat","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Cold","rarity":1},
            "Desert":{"name":"Desert","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Aloe":{"name":"Aloe","fieldName":"","group":"Supplement","description":"An oil from a desert plant used to sooth all sorts of pains.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"","affinity":"Wood","location":"Desert","rarity":1},
            "Sweet Beans":{"name":"Sweet Beans","fieldName":"","group":"Vegetable","description":"Red beans that have grown in arid landscapes.","variable":"","category":"Beans","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "White Cabbage":{"name":"White Cabbage","fieldName":"","group":"Vegetable","description":"A leafy white vegetable often shredded in cuisine.","variable":"","category":"Cabbage","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Spicy Carrot":{"name":"Spicy Carrot","fieldName":"","group":"Vegetable","description":"A long, deep orange root vegetable that is oddly spicy.","variable":"","category":"Carrot","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Chickpeas":{"name":"Chickpeas","fieldName":"","group":"Vegetable","description":"A legume that grows best in arid locales.","variable":"","category":"Chickpeas","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Giant Cucumber":{"name":"Giant Cucumber","fieldName":"","group":"Vegetable","description":"A huge, green gourd filled with water.","variable":"","category":"Cucumber","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "White Garlic":{"name":"White Garlic","fieldName":"","group":"Supplement","description":"A tart cloved vegetable used like a spice in cooking.","variable":"","category":"Garlic","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Sand Ginger":{"name":"Sand Ginger","fieldName":"","group":"Supplement","description":"A root plant used as a natural pain killer and treatment for nausea.","variable":"","category":"Ginger","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Ginseng":{"name":"Ginseng","fieldName":"","group":"Supplement","description":"A common desert spice used to enhance cognition and alertness.","variable":"","category":"","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Lycium":{"name":"Lycium","fieldName":"","group":"Supplement","description":"This common desert herb is used to help treat vision problems and headaches.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Sand Melon":{"name":"Sand Melon","fieldName":"","group":"Fruit","description":"A large green spotted melon filled with water.","variable":"","category":"Melon","itemType":"Goods","bulk":2,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Sand Onion":{"name":"Sand Onion","fieldName":"","group":"Vegetable","description":"A bitter layered vegetable grown in arid climates.","variable":"","category":"Onion","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Arid Peach":{"name":"Arid Peach","fieldName":"","group":"Fruit","description":"A succulent sweet fruit from the desert.","variable":"","category":"Peach","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Bleached Pear":{"name":"Bleached Pear","fieldName":"","group":"Fruit","description":"A white pear common to desert regions.","variable":"","category":"Pear","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Scorcher Pepper":{"name":"Scorcher Pepper","fieldName":"","group":"Supplement","description":"A spicy red and black pepper known for its sting.","variable":"","category":"Pepper","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Rhynoseed":{"name":"Rhynoseed","fieldName":"","group":"Supplement","description":"A seed whose extracts can cause psychoactive effects to induce erratic movement.","variable":"","category":"","itemType":"Goods","bulk":1,"value":40,"traits":"","affinity":"Wood","location":"Desert","rarity":2},
            "Flaked Salt":{"name":"Flaked Salt","fieldName":"","group":"Supplement","description":"Flakey salt produced gathered from crystallized salt in the desert.","variable":"","category":"Salt","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Crystal Sugarcane":{"name":"Crystal Sugarcane","fieldName":"","group":"Supplement","description":"A fragrant grass found in desert regions that is often used to sweeten beverages and meals.","variable":"","category":"Sugar","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Turmeric":{"name":"Turmeric","fieldName":"","group":"Supplement","description":"A yellow spice with a bitter flavor.","variable":"","category":"","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Sunset Wheat":{"name":"Sunset Wheat","fieldName":"","group":"Starch","description":"A low-water grain common around the world.","variable":"","category":"Wheat","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Desert","rarity":1},
            "Yidash":{"name":"Yidash","fieldName":"","group":"Supplement","description":"A plant that is known to incite sudden, involuntary muscle spasms. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized.","variable":"","category":"","itemType":"Goods","bulk":1,"value":90,"traits":"","affinity":"Wood","location":"Desert","rarity":2},
            "Grassland":{"name":"Grassland","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Camellia Leaves":{"name":"Camellia Leaves","fieldName":"","group":"Supplement","description":"A fragrant plant grown in warmer and fertile climates. It is known to have energy boosting properties.","variable":"","category":"","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Caswinnis":{"name":"Caswinnis","fieldName":"","group":"Supplement","description":"A plant with powerful calming traits.","variable":"","category":"Caswinnis","itemType":"Goods","bulk":1,"value":20,"traits":"","affinity":"Wood","location":"Grassland","rarity":2},
            "Gypsy Caswinnis":{"name":"Gypsy Caswinnis","fieldName":"","group":"Supplement","description":"A plant with very strong calming traits.","variable":"","category":"Caswinnis","itemType":"Goods","bulk":1,"value":30,"traits":"","affinity":"Wood","location":"Grassland","rarity":2},
            "Endura":{"name":"Endura","fieldName":"","group":"Supplement","description":"This plant is a poweerful anesthetic. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized.","variable":"","category":"Endura","itemType":"Goods","bulk":2,"value":115,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":2},
            "Pearl Ginger":{"name":"Pearl Ginger","fieldName":"","group":"Supplement","description":"A root plant used as a natural pain killer and treatment for nausea.","variable":"","category":"Ginger","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Highland Grapes":{"name":"Highland Grapes","fieldName":"","group":"Fruit","description":"A red vine growing fruit common in warm climates near Ceres.","variable":"","category":"Grapes","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Clear Grapes":{"name":"Clear Grapes","fieldName":"","group":"Fruit","description":"A green vine growing fruit common in warm climates near Ceres.","variable":"","category":"Grapes","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Honey":{"name":"Honey","fieldName":"","group":"Supplement","description":"A sticky sweet substance created by bees.","variable":"","category":"","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Lentils":{"name":"Lentils","fieldName":"","group":"Vegetable","description":"A grain that is known for its filling nature.","variable":"","category":"Lentils","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Button Mushrooms":{"name":"Button Mushrooms","fieldName":"","group":"Vegetable","description":"A white capped fungus with a distinct savory flavor.","variable":"","category":"Mushrooms","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Sweet Onion":{"name":"Sweet Onion","fieldName":"","group":"Vegetable","description":"A sweet layered vegetable grown in fields.","variable":"","category":"Onion","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Tall Grain Rice":{"name":"Tall Grain Rice","fieldName":"","group":"Starch","description":"A grain grown in abundance that is common to temperate flat lands.","variable":"","category":"Rice","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Tart Strawberries":{"name":"Tart Strawberries","fieldName":"","group":"Fruit","description":"A red berry beloved for its tartness.","variable":"","category":"Berries","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Thousandcorn":{"name":"Thousandcorn","fieldName":"","group":"Starch","description":"A grain common to hilled regions and grassland. A staple to Minervan cuisine.","variable":"","category":"Corn","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Lowland Wheat":{"name":"Lowland Wheat","fieldName":"","group":"Starch","description":"A low-water grain common around the world.","variable":"","category":"Wheat","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Yeast":{"name":"Yeast","fieldName":"","group":"Supplement","description":"A bacteria common to grasslands important in the creation of breads and beers.","variable":"","category":"Yeast","itemType":"Goods","bulk":1,"value":5,"traits":"Edible","affinity":"Wood","location":"Grassland","rarity":1},
            "Mountains":{"name":"Mountains","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Fine Apricots":{"name":"Fine Apricots","fieldName":"","group":"Fruit","description":"A sweet and tart orange fruit common in the mountains.","variable":"","category":"Apricots","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Barley":{"name":"Barley","fieldName":"","group":"Starch","description":"A type of grain common to mountainous regions and often used to make doughs.","variable":"","category":"Barley","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "White Broccoli":{"name":"White Broccoli","fieldName":"","group":"Vegetable","description":"A white plant that has survived in the mountains.","variable":"","category":"Broccoli","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Coffee Beans":{"name":"Coffee Beans","fieldName":"","group":"Supplement","description":"A flavorful bean grown in mountainous regions. It is infused with energy promotional effects.","variable":"","category":"","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Earthy Ginger":{"name":"Earthy Ginger","fieldName":"","group":"Supplement","description":"A root plant used as a natural pain killer and treatment for nausea.","variable":"","category":"Ginger","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Joza Leaf":{"name":"Joza Leaf","fieldName":"","group":"Supplement","description":"A stimulating plant that increases focus in those that consume it.","variable":"","category":"Joza Leaf","itemType":"Goods","bulk":1,"value":25,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":2},
            "Red Lettuce":{"name":"Red Lettuce","fieldName":"","group":"Vegetable","description":"A leafy redish-green vegetable known for its crunch.","variable":"","category":"Lettuce","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Black Mushrooms":{"name":"Black Mushrooms","fieldName":"","group":"Vegetable","description":"A black capped fungus with a distinct savory flavor.","variable":"","category":"Mushrooms","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Mountain Orange":{"name":"Mountain Orange","fieldName":"","group":"Fruit","description":"A sour orange fruit found in groves of the mountains.","variable":"","category":"Orange","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Vibrant Peach":{"name":"Vibrant Peach","fieldName":"","group":"Fruit","description":"A sweet and vibrant pink peach common to the mountains near Apollo.","variable":"","category":"Peach","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Long Peas":{"name":"Long Peas","fieldName":"","group":"Vegetable","description":"A long, green leaf containing several small, tart, green pods.","variable":"","category":"Peas","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Bleached Pepper":{"name":"Bleached Pepper","fieldName":"","group":"Supplement","description":"A spicy white pepper with a medium spice.","variable":"","category":"Pepper","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "White Radish":{"name":"White Radish","fieldName":"","group":"Vegetable","description":"A white root vegetable with a slight sweetness.","variable":"","category":"Radish","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Rage Fruit":{"name":"Rage Fruit","fieldName":"","group":"Supplement","description":"A fruit that causes those who eat it to become enraged. The effect is neutralized when the plant is grown magically. This is priced as if the effect is not neutralized.","variable":"","category":"","itemType":"Goods","bulk":2,"value":155,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":2},
            "Short Grain Rice":{"name":"Short Grain Rice","fieldName":"","group":"Starch","description":"A grain grown in abundance that is common to mountainous regions.","variable":"","category":"Rice","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Rock Salt":{"name":"Rock Salt","fieldName":"","group":"Supplement","description":"Salt ground into tiny pieces produced from rocks made of salt.","variable":"","category":"Salt","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Shepherd's Purse":{"name":"Shepherd's Purse","fieldName":"","group":"Supplement","description":"Taken from mountainous plants, this herb is used to treat wounds and increase blood circulation.","variable":"","category":"","itemType":"Goods","bulk":1,"value":8,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Soybeans":{"name":"Soybeans","fieldName":"","group":"Vegetable","description":"A legume that excretes a white milk enjoyed around the world.","variable":"","category":"Soybeans","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Green Spinach":{"name":"Green Spinach","fieldName":"","group":"Vegetable","description":"A leafy green vegetable common in the mountains.","variable":"","category":"Spinach","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Syrup Sugarcane":{"name":"Syrup Sugarcane","fieldName":"","group":"Supplement","description":"A fragrant grass found in mountainous regions that is often used to sweeten beverages and meals.","variable":"","category":"Sugar","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Sulfur":{"name":"Sulfur","fieldName":"","group":"Compound","description":"A black powder used to create explosions.","variable":"","category":"Explosive","itemType":"Goods","bulk":1,"value":10,"traits":"","affinity":"Fire","location":"Mountain","rarity":1},
            "Hardy Tomato":{"name":"Hardy Tomato","fieldName":"","group":"Vegetable","description":"A strong red vegetable grown on a vine.","variable":"","category":"Tomato","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Purple Turnip":{"name":"Purple Turnip","fieldName":"","group":"Vegetable","description":"A small, purple root vegetable common in the mountains.","variable":"","category":"Turnip","itemType":"Goods","bulk":1,"value":3,"traits":"Edible","affinity":"Wood","location":"Mountain","rarity":1},
            "Tropical":{"name":"Tropical","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Pineapple":{"name":"Pineapple","fieldName":"","group":"Fruit","description":"A large yellow fruit known for its citrus sour flavor and an island favorite","variable":"","category":"","itemType":"Goods","bulk":2,"value":3,"traits":"Edible","affinity":"Wood","location":"Tropical","rarity":1},
            "Victoria Lily":{"name":"Victoria Lily","fieldName":"","group":"Supplement","description":"This water growing plant is common in tropical climates and Juno. It has soothing effects for individuals in emotional distress.","variable":"","category":"","itemType":"Goods","bulk":1,"value":5,"traits":"Edible","affinity":"Wood","location":"Tropical","rarity":1},
            "Coconut":{"name":"Coconut","fieldName":"","group":"Fruit","description":"A large, round, hard fruit known for its sweet flavor","variable":"","category":"","itemType":"Goods","bulk":2,"value":3,"traits":"Edible","affinity":"Wood","location":"Tropical","rarity":1},
            "Seafood":{"name":"Seafood","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"Goods","bulk":null,"value":null,"traits":"","affinity":"","location":"","rarity":null},
            "Char Eel":{"name":"Char Eel","fieldName":"","group":"Fish","description":"A blackened eel commonly found in the ocean. It has a chewy texture when cooked.","variable":"","category":"Eel","itemType":"Goods","bulk":2,"value":10,"traits":"Edible","affinity":"","location":"Water","rarity":1},
            "Lakebed Carp":{"name":"Lakebed Carp","fieldName":"","group":"Fish","description":"A common freshwater fish with an oily flavor.","variable":"","category":"Carp","itemType":"Goods","bulk":2,"value":8,"traits":"Edible","affinity":"","location":"Water","rarity":1},
            "Midnight Sardine":{"name":"Midnight Sardine","fieldName":"","group":"Fish","description":"This saltwater fish is a favorite for anyone that wants to add a bit of salt to their meal.","variable":"","category":"Sardine","itemType":"Goods","bulk":2,"value":8,"traits":"Edible","affinity":"","location":"Water","rarity":1},
            "Minervan Tuna":{"name":"Minervan Tuna","fieldName":"","group":"Fish","description":"A small saltwater fish that has gained popularity for its neutral flavor.","variable":"","category":"Tuna","itemType":"Goods","bulk":2,"value":12,"traits":"Edible","affinity":"","location":"Water","rarity":1},
            "Pebble Shrimp":{"name":"Pebble Shrimp","fieldName":"","group":"Fish","description":"A tiny, sweet, and savory crestacean common in seafood disshes.","variable":"","category":"Shrimp","itemType":"Goods","bulk":1,"value":6,"traits":"Edible","affinity":"","location":"Water","rarity":1},
            "Pink Trout":{"name":"Pink Trout","fieldName":"","group":"Fish","description":"A common freshwater fish used as a centerpiece of a meal in coastal cuisine.","variable":"","category":"Trout","itemType":"Goods","bulk":3,"value":12,"traits":"Edible","affinity":"","location":"Water","rarity":1},
            "Rock Clam":{"name":"Rock Clam","fieldName":"","group":"Fish","description":"A creature that fits within two shells. It has a salty flavor.","variable":"","category":"Clam","itemType":"Goods","bulk":1,"value":
                    6,"traits":"Edible","affinity":"","location":"Water","rarity":1},
            "Royal Crab":{"name":"Royal Crab","fieldName":"","group":"Fish","description":"A large crustacean saught for its savory flavor.","variable":"","category":"Crab","itemType":"Goods","bulk":3,"value":16,"traits":"Edible","affinity":"","location":"Water","rarity":1},
            "Voyager Salmon":{"name":"Voyager Salmon","fieldName":"","group":"Fish","description":"A common fish that can be found in all sorts of water. Popular for its neutral flavor.","variable":"","category":"Salmon","itemType":"Goods","bulk":3,"value":12,"traits":"Edible","affinity":"","location":"Water","rarity":1}},
        sortingGroups = {"group":{"":["Materials","Common","Coastal","Cold","Desert","Grassland","Mountains","Tropical","Seafood"],"Material":["Pine","Cotton","Hemp","Glass","Clay","Granite","Iron","Snow","Ice","Ironwood","Fireglass","Crystal","Steel","Glaceum","Viridium","Rubrumium","Platinum","Adamantine","Obsidian","Mithral","White Obsidian","Albryst"],"Compound":["Water","Stimulant","Component","Acid","Soap","Earthen Gelatin","Beast Gelatin","Magnet","Bee's wax","Oil","Alcohol","Black Powder","Nickel","Altillite","Mana Gem","Morillite","Sigilite","Gold","Ventu Stone","Pnevmarite","Sulfur"],"Meat":["Beast Meat","Bird Meat","Saurian Meat"],"Bone":["Beast Bone","Bird Bone","Saurian Bone"],"Egg":["Bird Egg"],"Fruit":["Honey Apple","Coastal Orange","Ruby Strawberries","Ice Grapes","Sand Melon","Arid Peach","Bleached Pear","Highland Grapes","Clear Grapes","Tart Strawberries","Fine Apricots","Mountain Orange","Vibrant Peach","Pineapple","Coconut"],"Supplement":["Astragalus","Doxyl Leaf","Maidenhair","Sea Salt","Brahmi","Cacaold Beans","Paraherb","Schizandra","Aloe","White Garlic","Sand Ginger","Ginseng","Lycium","Scorcher Pepper","Rhynoseed","Flaked Salt","Crystal Sugarcane","Turmeric","Yidash","Camellia Leaves","Caswinnis","Gypsy Caswinnis","Endura","Pearl Ginger","Honey","Yeast","Coffee Beans","Earthy Ginger","Joza Leaf","Bleached Pepper","Rage Fruit","Rock Salt","Shepherd's Purse","Syrup Sugarcane","Victoria Lily"],"Vegetable":["Green Beans","Sea Cabbage","Short Carrot","Thin Cucumber","Highland Lettuce","Truffle Mushrooms","Black Olives","Crisp Onion","Sweet Peas","Tart Radish","Ruby Tomato","Winter Broccoli","Long Carrot","Blue Spinach","Frost Pumpkin","Round Turnip","Sweet Beans","White Cabbage","Spicy Carrot","Chickpeas","Giant Cucumber","Sand Onion","Lentils","Button Mushrooms","Sweet Onion","White Broccoli","White Cabbage","Red Lettuce","Black Mushrooms","Long Peas","White Radish","Soybeans","Green Spinach","Hardy Tomato","Purple Turnip"],"Starch":["Blue Popato","Coastal Wheat","White Popato","Blanche Wheat","Sunset Wheat","Tall Grain Rice","Thousandcorn","Lowland Wheat","Barley","Short Grain Rice"],"Fish":["Char Eel","Lakebed Carp","Midnight Sardine","Minervan Tuna","Pebble Shrimp","Pink Trout","Rock Clam","Royal Crab","Voyager Salmon"]}},

        get = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new GoodsData(values[key]);
        },
        getValues = function (keyArray, delimiter, prefix) {
            if (keyArray == undefined || keyArray == "") {
                return [];
            }
            if (typeof keyArray == "string") {
                keyArray = keyArray.split(delimiter);
            }
            if (prefix == undefined) {
                prefix = "";
            }

            let output = [];
            let name = "";
            let lookup = "";
            let dataInfo;

            for (let i = 0; i < keyArray.length; i++) {
                name = `${prefix}${keyArray[i].trim()}`;

                lookup = name;
                if (lookup.indexOf("(") >= 0) {
                    lookup = lookup.replace(/\([^)]*\)/g, "(X)");
                }

                dataInfo = get(lookup);
                if (dataInfo != undefined) {
                    dataInfo.name = name;
                    output.push(dataInfo);
                }
            }

            return output;
        },
        has = function (key) {
            return keys.includes(key);
        },
        iterate = function (callback) {
            for (let i = 0; i < keys.length; i++) {
                callback(values[keys[i]]);
            }
        },
        filter = function (filterData) {
            let filteredGroup;
            if (Array.isArray(filterData)) {
                filteredGroup = getSortedGroup(filterData[0].property, filterData[0].value);
                let nextFilter = [];
                for (let i = 1; i < filterData.length; i++) {
                    if (filteredGroup == undefined || filteredGroup.length == 0) {
                        return [];
                    }
                    nextFilter = getSortedGroup(filterData[i].property, filterData[i].value);
                    filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
                }
            } else {
                filteredGroup = getSortedGroup(filterData.property, filterData.value);
            }
            if (filteredGroup == undefined || filteredGroup.length == 0) {
                return [];
            }
            return getGroupData(filteredGroup);
        },
        getSortedGroup = function (property, propertyValue) {
            if (!sortingGroups.hasOwnProperty(property)) {
                let keys = "";
                for (let key in sortingGroups) {
                    keys += `${key}, `;
                }
                Debug.Log (`Tried to find property ${property} but it does not exist in the database. Valid properties are ${keys}`);
            }
            if (!sortingGroups[property].hasOwnProperty(propertyValue)) {
                let keys = "";
                for (let key in sortingGroups[property]) {
                    keys += `${key}, `;
                }
                Debug.Log (`Tried to find sub property ${propertyValue} but it does not exist in the database. Valid properties are ${keys}`);
            }
            return sortingGroups[property][propertyValue];
        },
        getGroupData = function (group) {
            let output = [];
            for (let i = 0; i < group.length; i++) {
                output.push(get(group[i]));
            }
            return output;
        },
        getPropertyValues = function (property) {
            let output = [];
            for (let key in sortingGroups[property]) {
                output.push(key);
            }
            return output;
        }
    ;
    return {
        Get: get,
        GetValues: getValues,
        Has: has,
        Iterate: iterate,
        Filter: filter,
        GetSortedGroup: getSortedGroup
    };
}());

var WuxGear = WuxGear || (function() {
    'use strict';

    var
        keys = ["Weapons","Handaxe","Battleaxe","Great Axe","Club","Warhammer","Maul","Javelin","Spear","Lance","Half-Staff","Full-Staff","Dagger","Rapier","Shortsword","Longsword","Great Sword","Whip","Shortbow","Longbow","Pistol","Revolver","Sniper Rifle","HI. Sniper Rifle","Blunderbuss","Shotgun","Flamethrower","Impact Bomb","Blast Bomb","HI. Blast Bomb","Tool","Medkit","Etherlink","Mirror","Compass","Torch","Lanturn","Light Orb","Rope","Manacles","Magic Restraints","Ladder","Shovel","Spyglass","Umbrella","Chest Slot","Light Breastplate","Heavy Breastplate","Head Slot","Light Helmet","Heavy Helmet","Etherlink Headset","Arms Slot","Light Vambraces","Heavy Vambraces","Legs Slot","Light Greaves","Heavy Greaves","Foot Slot","Boots","Gear","Bedroll","Blanket","Cot","Hammock","Tent","Pavillion Tent","Backpack, common","Pouch, waist","Sack","Barrel","Basket","Box, scroll","Bucket","Case, scroll","Chest, Small","Chest, Medium","Chest, Large","Cooler","Pot","Bottle","Canteen","Cauldron","Coffee pot","Flask","Jug","Pitcher","Vial","Canvas (1 sq. yd)","Inkpen","Paper (30 sheets)","Lock, average","Lock, good","Lock, superior"],
        values = {"Weapons":{"name":"Weapons","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"UsableItem","bulk":null,"value":null,"traits":"","valMod":null,"dc":null,"time":null,"components":"","technique":{"name":"Weapons","fieldName":"weapons","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Handaxe":{"name":"Handaxe","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":5,"value":150,"traits":"Axe; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Handaxe","fieldName":"handaxe","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Skirmish","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Battleaxe":{"name":"Battleaxe","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":8,"value":240,"traits":"Axe; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Battleaxe","fieldName":"battleaxe","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"Skirmish","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"3","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Great Axe":{"name":"Great Axe","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":15,"value":450,"traits":"Axe; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Great Axe","fieldName":"great_axe","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"2 EN","limits":"","skill":"Might","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"4","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":9,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Club":{"name":"Club","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":4,"value":120,"traits":"Hammer","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Club","fieldName":"club","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Skirmish","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Warhammer":{"name":"Warhammer","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":8,"value":240,"traits":"Hammer","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Warhammer","fieldName":"warhammer","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"Skirmish","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"3","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Maul":{"name":"Maul","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":15,"value":null,"traits":"Hammer","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Maul","fieldName":"maul","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"2 EN","limits":"","skill":"Might","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"4","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":9,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Javelin":{"name":"Javelin","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":5,"value":150,"traits":"Polearm; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Javelin","fieldName":"javelin","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Skirmish","range":"1-2","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Spear":{"name":"Spear","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":8,"value":240,"traits":"Polearm; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Spear","fieldName":"spear","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"Skirmish","range":"1-2","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Lance":{"name":"Lance","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":15,"value":450,"traits":"Polearm; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Lance","fieldName":"lance","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"2 EN","limits":"","skill":"Might","range":"1-2","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"3","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":9,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Half-Staff":{"name":"Half-Staff","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":4,"value":120,"traits":"Polearm","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Half-Staff","fieldName":"half-staff","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Skirmish","range":"1-2","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Full-Staff":{"name":"Full-Staff","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":8,"value":240,"traits":"Polearm","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Full-Staff","fieldName":"full-staff","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"Skirmish","range":"1-2","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Dagger":{"name":"Dagger","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":3,"value":null,"traits":"Knife; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Dagger","fieldName":"dagger","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Finesse","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Rapier":{"name":"Rapier","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":5,"value":null,"traits":"Sword; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Rapier","fieldName":"rapier","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"Finesse","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Shortsword":{"name":"Shortsword","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":4,"value":null,"traits":"Sword; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Shortsword","fieldName":"shortsword","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Skirmish","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Longsword":{"name":"Longsword","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":7,"value":null,"traits":"Sword; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Longsword","fieldName":"longsword","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"Skirmish","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":9,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Great Sword":{"name":"Great Sword","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":15,"value":450,"traits":"Sword; Sharp","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Great Sword","fieldName":"great_sword","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"2 EN","limits":"","skill":"Might","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":16,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Whip":{"name":"Whip","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":3,"value":135,"traits":"Whip","valMod":3,"dc":null,"time":1,"components":"","technique":{"name":"Whip","fieldName":"whip","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Finesse","range":"1-3","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-power","definitionName":"Power","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Force","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Shortbow":{"name":"Shortbow","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":5,"value":null,"traits":"Bow; Ammunition","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Shortbow","fieldName":"shortbow","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"Arcing","resourceCost":"","limits":"","skill":"Shoot","range":"2-5","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Longbow":{"name":"Longbow","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":8,"value":null,"traits":"Bow; Ammunition","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Longbow","fieldName":"longbow","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"Arcing","resourceCost":"2 EN","limits":"","skill":"Shoot","range":"2-5","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"4","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":8,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Pistol":{"name":"Pistol","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":3,"value":300,"traits":"Handgun; Ammunition","valMod":4,"dc":12,"time":1,"components":"1 Goods_Component","technique":{"name":"Pistol","fieldName":"pistol","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Shoot","range":"2-6","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":1,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Revolver":{"name":"Revolver","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":4,"value":360,"traits":"Handgun; Ammunition","valMod":4,"dc":12,"time":2,"components":"1 Goods_Component","technique":{"name":"Revolver","fieldName":"revolver","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"Shoot","range":"2-6","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Sniper Rifle":{"name":"Sniper Rifle","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":12,"value":1020,"traits":"Longshot; Ammunition","valMod":5,"dc":12,"time":2,"components":"1 Goods_Component","technique":{"name":"Sniper Rifle","fieldName":"sniper_rifle","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"2 EN","limits":"","skill":"Shoot","range":"3-10","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"5","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "HI. Sniper Rifle":{"name":"HI. Sniper Rifle","fieldName":"","group":"Tool","description":"A High Impact version of the Sniper Rifle. Takes time to setup a shot, but the power is often worth it.","variable":"","category":"Weapon","itemType":"UsableItem","bulk":12,"value":null,"traits":"Longshot; Ammunition","valMod":9,"dc":12,"time":2,"components":"1 Goods_Component","technique":{"name":"HI. Sniper Rifle","fieldName":"hi._sniper_rifle","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"Holdout","resourceCost":"3 EN","limits":"","skill":"Shoot","range":"3-10","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0},
                                        {"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"6","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":10,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Blunderbuss":{"name":"Blunderbuss","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":9,"value":660,"traits":"Scattershot; Ammunition","valMod":4,"dc":12,"time":2,"components":"1 Goods_Component","technique":{"name":"Blunderbuss","fieldName":"blunderbuss","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"2 EN","limits":"","skill":"Shoot","range":"2-3","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"7","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":8,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Shotgun":{"name":"Shotgun","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":10,"value":1020,"traits":"Scattershot; Ammunition","valMod":6,"dc":12,"time":2,"components":"1 Goods_Component","technique":{"name":"Shotgun","fieldName":"shotgun","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"3 EN","limits":"","skill":"Shoot","range":"2-3","target":"Cone","size":3,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"5","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Piercing","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Flamethrower":{"name":"Flamethrower","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":10,"value":1200,"traits":"Scattershot","valMod":6,"dc":12,"time":2,"components":"1 Goods_Component; 1 Goods_Pnevmarite","technique":{"name":"Flamethrower","fieldName":"flamethrower","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"3 EN; 1 WILL","limits":"","skill":"Shoot","range":"2-3","target":"Cone","size":3,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Evasion","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Fire","traits":""},
                            "T1":{"name":"T1","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"4","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":4,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Fire","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Impact Bomb":{"name":"Impact Bomb","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":2,"value":105,"traits":"Bomb","valMod":3,"dc":10,"time":1,"components":"1 Goods_Black Powder","technique":{"name":"Impact Bomb","fieldName":"impact_bomb","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"Throw","range":"2-5","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"Def_Reflex","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0},
                                        {"variableName":"","definitionName":"","value":3,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Fire","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0"]}}}},
                "hasTechnique":true},
            "Blast Bomb":{"name":"Blast Bomb","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":2,"value":135,"traits":"Bomb","valMod":4,"dc":10,"time":1,"components":"1 Goods_Black Powder","technique":{"name":"Blast Bomb","fieldName":"blast_bomb","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"Throw","range":"2-5","target":"Blast","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[]},
                                "effect":"Dmg_Fire","traits":""},
                            "T1":{"name":"T1","defense":"Def_Warding","target":"","type":"HP","subType":"","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Fire","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "HI. Blast Bomb":{"name":"HI. Blast Bomb","fieldName":"","group":"Tool","description":"","variable":"","category":"Weapon","itemType":"UsableItem","bulk":2,"value":165,"traits":"Bomb","valMod":5,"dc":10,"time":1,"components":"1 Goods_Black Powder","technique":{"name":"HI. Blast Bomb","fieldName":"hi._blast_bomb","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"Holdout","resourceCost":"3 EN","limits":"","skill":"Throw","range":"2-5","target":"Blast","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"HP","subType":"","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Fire","traits":""},
                            "T1":{"name":"T1","defense":"Def_Warding","target":"","type":"HP","subType":"","duration":"","dVal":"4","dType":"6","formula":{"workers":[{"variableName":"gen-accuracy","definitionName":"Accuracy","value":0,"multiplier":1,"max":0},
                                        {"variableName":"","definitionName":"","value":4,"multiplier":1,"max":0}]},
                                "effect":"Dmg_Fire","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0","T1"]}}}},
                "hasTechnique":true},
            "Tool":{"name":"Tool","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"UsableItem","bulk":null,"value":null,"traits":"","valMod":null,"dc":null,"time":null,"components":"","technique":{"name":"Tool","fieldName":"tool","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Medkit":{"name":"Medkit","fieldName":"","group":"Tool","description":"A kit full of supplies for performing first aid and preventing others from dying. Expires after 5 uses. ","variable":"","category":"Medkit","itemType":"UsableItem","bulk":3,"value":64,"traits":"","valMod":1,"dc":2,"time":3,"components":"2 Goods_Cotton; 2 Goods_Water; 1 Goods_Alcohol","technique":{"name":"Medkit","fieldName":"medkit","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"","limits":"","skill":"Heal","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":["Stat_Dying"],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"10","target":"","type":"Status","subType":"Remove","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"Stat_Dying","traits":""}},
                        "sortingGroups":{"type":{"Status":["T0"]}}}},
                "hasTechnique":true},
            "Etherlink":{"name":"Etherlink","fieldName":"","group":"Tool","description":"A magitech device that allows one to communicate at great distances with another Etherlink. All Etherlink are callibrated with an ID, a frequency created by the Ventu Stone, to ensure only one device receives messages.","variable":"","category":"","itemType":"UsableItem","bulk":2,"value":885,"traits":"Magitech","valMod":12,"dc":15,"time":12,"components":"2 Goods_Component; 1 Goods_Nickel; 1 Goods_Pnevmarite; 1 Goods_Morillite; 1 Goods_Ventu Stone","technique":{"name":"Etherlink","fieldName":"etherlink","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"Seeking","resourceCost":"1 WILL","limits":"","skill":"","range":"50 miles","target":"Target","size":1,"requirement":"The target must be another Etherlink which you know the frequency ID.","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"The target hears a message you speak.","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":true},
            "Mirror":{"name":"Mirror","fieldName":"","group":"Tool","description":"A small mirror with a frame to hold it.","variable":"","category":"","itemType":"UsableItem","bulk":1,"value":35,"traits":"","valMod":2,"dc":12,"time":1,"components":"1 Goods_Glass","technique":{"name":"Mirror","fieldName":"mirror","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Compass":{"name":"Compass","fieldName":"","group":"Tool","description":"An ordinary compass that points to the magnetic north pole.","variable":"","category":"","itemType":"UsableItem","bulk":1,"value":50,"traits":"","valMod":3,"dc":12,"time":1,"components":"1 Goods_Magnet","technique":{"name":"Compass","fieldName":"compass","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Swift","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"You know which direction is north.","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":true},
            "Torch":{"name":"Torch","fieldName":"","group":"Tool","description":"A torch burns for 1 hour.","variable":"","category":"Light","itemType":"UsableItem","bulk":3,"value":45,"traits":"","valMod":1,"dc":null,"time":1,"components":"","technique":{"name":"Torch","fieldName":"torch","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Swift","traits":"Envoke","resourceCost":"","limits":"","skill":"","range":"","target":"Blast","size":1,"requirement":"The area created is always focused on this item.","itemTraits":"","trigger":"","flavorText":"","definitions":["Ter_Light"],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Terrain","subType":"Add","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"Ter_Light","traits":""}},
                        "sortingGroups":{"type":{"Terrain":["T0"]
                            }}}},
                "hasTechnique":true},
            "Lanturn":{"name":"Lanturn","fieldName":"","group":"Tool","description":"A lanturn burns for 6 hours on 1 pint of oil. You can carry a lanturn in one hand.","variable":"","category":"Light","itemType":"UsableItem","bulk":3,"value":135,"traits":"","valMod":3,"dc":12,"time":2,"components":"","technique":{"name":"Lanturn","fieldName":"lanturn","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Swift","traits":"Envoke","resourceCost":"","limits":"","skill":"","range":"","target":"Blast","size":2,"requirement":"The area created is always focused on this item.","itemTraits":"","trigger":"","flavorText":"","definitions":["Ter_Light"],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Terrain","subType":"Add","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"Ter_Light","traits":""}},
                        "sortingGroups":{"type":{"Terrain":["T0"]}}}},
                "hasTechnique":true},
            "Light Orb":{"name":"Light Orb","fieldName":"","group":"Tool","description":"A magitech device that creates light with a little energy.","variable":"","category":"Light","itemType":"UsableItem","bulk":1,"value":375,"traits":"Magitech","valMod":10,"dc":15,"time":2,"components":"1 Goods_Nickel; 1 Goods_Pnevmarite; 1 Goods_Morillite","technique":{"name":"Light Orb","fieldName":"light_orb","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Swift","traits":"Envoke","resourceCost":"1 WILL","limits":"","skill":"","range":"","target":"Blast","size":2,"requirement":"The area created is always focused on this item.","itemTraits":"","trigger":"","flavorText":"","definitions":["Ter_Light"],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Terrain","subType":"Add","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"Ter_Light","traits":""}},
                        "sortingGroups":{"type":{"Terrain":["T0"]}}}},
                "hasTechnique":true},
            "Rope":{"name":"Rope","fieldName":"","group":"Tool","description":"Flexible material that can help you climb, tie things up, and other useful things. This value represents 10 ft of rope.","variable":"","category":"Bindings","itemType":"UsableItem","bulk":4,"value":120,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Rope","fieldName":"rope","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"","limits":"","skill":"Finesse","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Reflex","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"You bind an end of the rope to the target. This may cause the rope to cause the restrained status if another end of the rope is secured to an immovable object.","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"A knot in the rope can be removed with a successful DC 12 Physique or Agility Quick-skill check.","traits":""}},
                        "sortingGroups":{"type":{"":["T0","T1"]}}}},
                "hasTechnique":true},
            "Manacles":{"name":"Manacles","fieldName":"","group":"Tool","description":"Manacles are a binding tool, usually with two clasps to secure it between two objects or limbs. Usually these clasps are secured by a locking mechanism requiring a key to open them.","variable":"","category":"Bindings","itemType":"UsableItem","bulk":2,"value":120,"traits":"","valMod":4,"dc":12,"time":2,"components":"","technique":{"name":"Manacles","fieldName":"manacles","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"","limits":"","skill":"Finesse","range":"1","target":"Target","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"Def_Reflex","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"You successfully secure one clasp of the manacles. This may cause the manacles to cause the restrained status if a second clasp is secured to an immovable object.","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"One manacle clasp can be removed with access to the key for the restraint or with a successful DC 16 Tinker Quick-skill check.","traits":""}},
                        "sortingGroups":{"type":{"":["T0","T1"]}}}},
                "hasTechnique":true},
            "Magic Restraints":{"name":"Magic Restraints","fieldName":"","group":"Tool","description":"These chain bindings wrap around the chest, arms, and legs. These chains are linked to metal bindings meant to clamp around the arms and legs that contain sealing stone.","variable":"","category":"Bindings","itemType":"UsableItem","bulk":2,"value":210,"traits":"","valMod":5,"dc":12,"time":4,"components":"1 Goods_Sigilite","technique":{"name":"Magic Restraints","fieldName":"magic_restraints","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Full","traits":"","resourceCost":"","limits":"","skill":"Finesse","range":"1","target":"Target","size":1,"requirement":"The target must have the Restrained status.","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1","T2","T3"],
                        "values":{"T0":{"name":"T0","defense":"Def_Reflex","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"You successfully secure one Magic Restraint. This on its own does nothing until five have been secured.","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"A Magic Restraint can be removed with access to the key for the restraint or with a successful DC 16 Tinker Quick-skill check.","traits":""},
                            "T2":{"name":"T2","defense":"TechNewTargets","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"Five magic restraints are secured on one character.","traits":""},
                            "T3":{"name":"T3","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"The target's ki generation is disrupted. The target cannot use any techniques that consume Will as a resource.","traits":""}},
                        "sortingGroups":{"type":{"":["T0","T1","T2","T3"]}}}},
                "hasTechnique":true},
            "Ladder":{"name":"Ladder","fieldName":"","group":"Tool","description":"Ladders can be climbed. Most ladders are 30 feet tall.","variable":"","category":"","itemType":"UsableItem","bulk":15,"value":1125,"traits":"","valMod":5,"dc":null,"time":2,"components":"","technique":{"name":"Ladder","fieldName":"ladder","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Shovel":{"name":"Shovel","fieldName":"","group":"Tool","description":"A shovel helps with digging.","variable":"","category":"","itemType":"UsableItem","bulk":5,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Shovel","fieldName":"shovel","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Spyglass":{"name":"Spyglass","fieldName":"","group":"Tool","description":"Objects viewed through a spyglass are magnified to twice their size.","variable":"","category":"","itemType":"UsableItem","bulk":1,"value":35,"traits":"","valMod":2,"dc":null,"time":1,"components":"1 Goods_Glass","technique":{"name":"Spyglass","fieldName":"spyglass","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Umbrella":{"name":"Umbrella","fieldName":"","group":"Tool","description":"An umbrella is a heavier, waterproof parasol made of waxed cloth. It is intended to keep you dry in the rain or snow, but can still protect against sunlight just like a standard parasol.","variable":"","category":"","itemType":"UsableItem","bulk":5,"value":155,"traits":"","valMod":2,"dc":null,"time":1,"components":"1 Goods_Bee's wax","technique":{"name":"Umbrella","fieldName":"umbrella","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Chest Slot":{"name":"Chest Slot","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"UsableItem","bulk":null,"value":null,"traits":"","valMod":null,"dc":null,"time":null,"components":"","technique":{"name":"Chest Slot","fieldName":"chest_slot","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Light Breastplate":{"name":"Light Breastplate","fieldName":"","group":"Chest Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":15,"value":null,"traits":"","valMod":2,"dc":10,"time":1,"components":"","technique":{"name":"Light Breastplate","fieldName":"light_breastplate","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Passive","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1","T2","T3","T4"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":15,"multiplier":1,"max":0}]},
                                "effect":"HP","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":4,"multiplier":1,"max":0}]},
                                "effect":"Cmb_Armor","traits":""},
                            "T2":{"name":"T2","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Def_Evasion","traits":""},
                            "T3":{"name":"T3","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Def_Reflex","traits":""},
                            "T4":{"name":"T4","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Cmb_Mv","traits":""}},
                        "sortingGroups":{"type":{"Boost":["T0","T1","T2","T3","T4"]}}}},
                "hasTechnique":true},
            "Heavy Breastplate":{"name":"Heavy Breastplate","fieldName":"","group":"Chest Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":25,"value":1125,"traits":"","valMod":3,"dc":10,"time":1,"components":"","technique":{"name":"Heavy Breastplate","fieldName":"heavy_breastplate","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Passive","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1","T2","T3","T4"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":30,"multiplier":1,"max":0}]},
                                "effect":"HP","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":6,"multiplier":1,"max":0}]},
                                "effect":"Cmb_Armor","traits":""},
                            "T2":{"name":"T2","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-4,"multiplier":1,"max":0}]},
                                "effect":"Def_Evasion","traits":""},
                            "T3":{"name":"T3","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-4,"multiplier":1,"max":0}]},
                                "effect":"Def_Reflex","traits":""},
                            "T4":{"name":"T4","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Cmb_Mv","traits":""}},
                        "sortingGroups":{"type":{"Boost":["T0","T1","T2","T3","T4"]}}}},
                "hasTechnique":true},
            "Head Slot":{"name":"Head Slot","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"UsableItem","bulk":null,"value":null,"traits":"","valMod":null,"dc":null,"time":null,"components":"","technique":{"name":"Head Slot","fieldName":"head_slot","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Light Helmet":{"name":"Light Helmet","fieldName":"","group":"Head Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":4,"value":120,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Light Helmet","fieldName":"light_helmet","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Passive","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":15,"multiplier":1,"max":0}]},
                                "effect":"HP","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Def_Evasion","traits":""}},
                        "sortingGroups":{"type":{"Boost":["T0","T1"]}}}},
                "hasTechnique":true},
            "Heavy Helmet":{"name":"Heavy Helmet","fieldName":"","group":"Head Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":7,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Heavy Helmet","fieldName":"heavy_helmet","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Passive","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1","T2","T3"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":15,"multiplier":1,"max":0}]},
                                "effect":"HP","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0}]},
                                "effect":"Cmb_Armor","traits":""},
                            "T2":{"name":"T2","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Def_Evasion","traits":""},
                            "T3":{"name":"T3","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Def_Reflex","traits":""}},
                        "sortingGroups":{"type":{"Boost":["T0","T1","T2","T3"]}}}},
                "hasTechnique":true},
            "Etherlink Headset":{"name":"Etherlink Headset","fieldName":"","group":"Head Gear","description":"A head mounted version of an Etherlink. This is a magitech device that allows one to communicate at great distances with another Etherlink. All Etherlink are callibrated with an ID, a frequency created by the Ventu Stone, to ensure only one device receives messages.","variable":"","category":"","itemType":"UsableItem","bulk":2,"value":null,"traits":"","valMod":30,"dc":15,"time":12,"components":"2 Goods_Component; 1 Goods_Nickel; 1 Goods_Pnevmarite; 1 Goods_Morillite; 1 Goods_Ventu Stone","technique":{"name":"Etherlink Headset","fieldName":"etherlink_headset","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Swift","traits":"Seeking","resourceCost":"1 WILL","limits":"","skill":"","range":"50 miles","target":"Target","size":1,"requirement":"The target must be another Etherlink which you know the frequency ID.","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"The target hears a message you speak.","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":true},
            "Arms Slot":{"name":"Arms Slot","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"UsableItem","bulk":null,"value":null,"traits":"","valMod":null,"dc":null,"time":null,"components":"","technique":{"name":"Arms Slot","fieldName":"arms_slot","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Light Vambraces":{"name":"Light Vambraces","fieldName":"","group":"Arm Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":4,"value":120,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Light Vambraces","fieldName":"light_vambraces","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":15,"multiplier":1,"max":0}]},
                                "effect":"HP","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Def_Evasion","traits":""}},
                        "sortingGroups":{"type":{"Boost":["T0","T1"]}}}},
                "hasTechnique":false},
            "Heavy Vambraces":{"name":"Heavy Vambraces","fieldName":"","group":"Arm Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":7,"value":210,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Heavy Vambraces","fieldName":"heavy_vambraces","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0","T1","T2","T3"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":15,"multiplier":1,"max":0}]},
                                "effect":"HP","traits":""},
                            "T1":{"name":"T1","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0}]},
                                "effect":"Cmb_Armor","traits":""},
                            "T2":{"name":"T2","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Def_Evasion","traits":""},
                            "T3":{"name":"T3","defense":"","target":"","type":"Boost","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"","definitionName":"","value":-1,"multiplier":1,"max":0}]},
                                "effect":"Def_Reflex","traits":""}},
                        "sortingGroups":{"type":{"Boost":["T0","T1","T2","T3"]}}}},
                "hasTechnique":false},
            "Legs Slot":{"name":"Legs Slot","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"UsableItem","bulk":null,"value":null,"traits":"","valMod":null,"dc":null,"time":null,"components":"","technique":{"name":"Legs Slot","fieldName":"legs_slot","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Light Greaves":{"name":"Light Greaves","fieldName":"","group":"Leg Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":10,"value":300,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Light Greaves","fieldName":"light_greaves","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Heavy Greaves":{"name":"Heavy Greaves","fieldName":"","group":"Leg Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":15,"value":675,"traits":"","valMod":3,"dc":10,"time":1,"components":"","technique":{"name":"Heavy Greaves","fieldName":"heavy_greaves","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Foot Slot":{"name":"Foot Slot","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"UsableItem","bulk":null,"value":null,"traits":"","valMod":null,"dc":null,"time":null,"components":"","technique":{"name":"Foot Slot","fieldName":"foot_slot","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Boots":{"name":"Boots","fieldName":"","group":"Foot Gear","description":"","variable":"","category":"Armor","itemType":"UsableItem","bulk":5,"value":150,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Boots","fieldName":"boots","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Gear":{"name":"Gear","fieldName":"","group":"","description":"","variable":"","category":"","itemType":"UsableItem","bulk":null,"value":null,"traits":"","valMod":null,"dc":null,"time":null,"components":"","technique":{"name":"Gear","fieldName":"gear","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Bedroll":{"name":"Bedroll","fieldName":"","group":"Gear","description":"This consists of two woolen sheets sewn together along the bottom and one side to create a bag for sleeping in. Some have cloth straps along the open side so the bedroll can be tied closed while you are sleeping. It can be rolled and tied into a tight coil for storage or transport.","variable":"","category":"Camping","itemType":"UsableItem","bulk":8,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Bedroll","fieldName":"bedroll","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Blanket":{"name":"Blanket","fieldName":"","group":"Gear","description":"This warm, woven blanket has straps so it can be rolled up and tied. Blankets are often used in conjunction with bedrolls to provide additional warmth or a ground cushion.","variable":"","category":"Camping","itemType":"UsableItem","bulk":7,"value":null,"traits":"","valMod":1,"dc":null,"time":1,"components":"","technique":{"name":"Blanket","fieldName":"blanket","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Cot":{"name":"Cot","fieldName":"","group":"Gear","description":"This elevated camp bed is made of wood and canvas, and is particularly useful when the ground is wet or rocky. It is large enough for a full-grown human, but folds down into a 4-foot-by-9-inch cylindrical bag.","variable":"","category":"Camping","itemType":"UsableItem","bulk":15,"value":null,"traits":"","valMod":2,"dc":12,"time":1,"components":"","technique":{"name":"Cot","fieldName":"cot","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Hammock":{"name":"Hammock","fieldName":"","group":"Gear","description":"This blanket or net is attached to strong ropes, allowing you to hang it from a heavy branch or two trees and sleep above the ground.","variable":"","category":"Camping","itemType":"UsableItem","bulk":10,"value":null,"traits":"","valMod":1,"dc":null,"time":1,"components":"","technique":{"name":"Hammock","fieldName":"hammock","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Tent":{"name":"Tent","fieldName":"","group":"Gear","description":"A tent holds two Medium creature and takes 10 minutes to assemble.","variable":"","category":"Camping","itemType":"UsableItem","bulk":25,"value":null,"traits":"","valMod":3,"dc":12,"time":2,"components":"","technique":{"name":"Tent","fieldName":"tent","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Pavillion Tent":{"name":"Pavillion Tent","fieldName":"","group":"Gear","description":"A huge open-air canopy, plus stakes, poles, and ropes. A pavilion holds 10 creatures and takes 60 minutes to assemble. Pavilion tents are large enough to accommodate a small fire in the center.","variable":"","category":"Camping","itemType":"UsableItem","bulk":40,"value":null,"traits":"","valMod":5,"dc":12,"time":8,"components":"","technique":{"name":"Pavillion Tent","fieldName":"pavillion_tent","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Backpack, common":{"name":"Backpack, common","fieldName":"","group":"Gear","description":"This cloth knapsack has one large pocket that closes with a buckled strap and holds about 2 cubic feet of material. Some may have one or more smaller pockets on the sides.","variable":"","category":"Container","itemType":"UsableItem","bulk":8,"value":null,"traits":"","valMod":2,"dc":12,"time":2,"components":"","technique":{"name":"Backpack, common","fieldName":"backpack,_common","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Pouch, waist":{"name":"Pouch, waist","fieldName":"","group":"Gear","description":"This pack is supported by two straps that can be loosened or tightened to fit most body types. It can be adjusted to any facing along its wearer’s waist. The pack can store up to 1/2 cubic foot of material.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":1,"dc":12,"time":1,"components":"","technique":{"name":"Pouch, waist","fieldName":"pouch,_waist","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Sack":{"name":"Sack","fieldName":"","group":"Gear","description":"A sack is a cloth bag that weighs 1/2 lb. empty and holds 1 cubic ft. or 60 lbs. of contents full.","variable":"","category":"Container","itemType":"UsableItem","bulk":4,"value":null,"traits":"","valMod":1,"dc":12,"time":1,"components":"","technique":{"name":"Sack","fieldName":"sack","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Barrel":{"name":"Barrel","fieldName":"","group":"Gear","description":"A common barrel is constructed of wood with metal ring reinforcements and holds 10 cubic ft. or 650 lb. of materials. A barrel filled with liquid holds about 75 gallons.","variable":"","category":"Container","itemType":"UsableItem","bulk":25,"value":null,"traits":"","valMod":2,"dc":12,"time":2,"components":"","technique":{"name":"Barrel","fieldName":"barrel","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Basket":{"name":"Basket","fieldName":"","group":"Gear","description":"This large basket has a lid and holds about 2 cubic feet.","variable":"","category":"Container","itemType":"UsableItem","bulk":3,"value":null,"traits":"","valMod":1,"dc":null,"time":1,"components":"","technique":{"name":"Basket","fieldName":"basket","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Box, scroll":{"name":"Box, scroll","fieldName":"","group":"Gear","description":"This wooden box easily holds 10 scrolls and has small clips or bookmarks for easier indexing. Retrieving a scroll from a held scroll box is a move action.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Box, scroll","fieldName":"box,_scroll","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Bucket":{"name":"Bucket","fieldName":"","group":"Gear","description":"A simple bucket holds 1 cubic ft. or up to 65 lb. of liquid or material and when full. A bucket filled with liquid holds about 7 gallons.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Bucket","fieldName":"bucket","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Case, scroll":{"name":"Case, scroll","fieldName":"","group":"Gear","description":"A leather or wooden scroll case easily holds four scrolls.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Case, scroll","fieldName":"case,_scroll","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Chest, Small":{"name":"Chest, Small","fieldName":"","group":"Gear","description":"A common, wooden chest.","variable":"","category":"Container","itemType":"UsableItem","bulk":15,"value":null,"traits":"","valMod":2,"dc":12,"time":1,"components":"","technique":{"name":"Chest, Small","fieldName":"chest,_small","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Chest, Medium":{"name":"Chest, Medium","fieldName":"","group":"Gear","description":"A common, wooden chest.","variable":"","category":"Container","itemType":"UsableItem","bulk":25,"value":null,"traits":"","valMod":3,"dc":12,"time":1,"components":"","technique":{"name":"Chest, Medium","fieldName":"chest,_medium","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Chest, Large":{"name":"Chest, Large","fieldName":"","group":"Gear","description":"A common, wooden chest.","variable":"","category":"Container","itemType":"UsableItem","bulk":35,"value":null,"traits":"","valMod":4,"dc":12,"time":1,"components":"","technique":{"name":"Chest, Large","fieldName":"chest,_large","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Cooler":{"name":"Cooler","fieldName":"","group":"Gear","description":"This chest can contain up to 4 cubic feet of goods, and it has a lining of insulating material between two sheets of wood. As long as the chest is partially filled with a cold substance—such as cold water or ice—items stored within decompose at half their regular rate. Ice melts on a consistent basis (typically four to six times in a 24-hour period) and must be regularly replenished to maintain the effectiveness of this chest.","variable":"","category":"Container","itemType":"UsableItem","bulk":25,"value":null,"traits":"","valMod":2,"dc":12,"time":3,"components":"1 Insulation","technique":{"name":"Cooler","fieldName":"cooler","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Pot":{"name":"Pot","fieldName":"","group":"Gear","description":"Pots come in a variety of materials, but the most common is formed of iron.","variable":"","category":"Container","itemType":"UsableItem","bulk":2,"value":null,"traits":"","valMod":1,"dc":null,"time":1,"components":"","technique":{"name":"Pot","fieldName":"pot","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Bottle":{"name":"Bottle","fieldName":"","group":"Gear","description":"This glass bottle holds about a pint and includes a cork.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Bottle","fieldName":"bottle","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Canteen":{"name":"Canteen","fieldName":"","group":"Gear","description":"This hollow container is made of wood, a gourd, or metal, and carries liquid.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Canteen","fieldName":"canteen","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Cauldron":{"name":"Cauldron","fieldName":"","group":"Gear","description":"This larger version of an iron pot holds approximately 1 gallon—enough to fill the bellies of four hungry humans for one meal.","variable":"","category":"Container","itemType":"UsableItem","bulk":8,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Cauldron","fieldName":"cauldron","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Coffee pot":{"name":"Coffee pot","fieldName":"","group":"Gear","description":"This tall, teapot-like device contains a small chamber for coffee grounds and a large chamber for water, connected by a small tube. Heating the pot forces boiling water through the tube and into the grounds. A glass knob at the top of the tube allows you to see the color of the brew and stop when it is sufficiently strong. It can brew up to 4 cups of coffee at a time. It can also be used to make tea, steep medicinal herbs, or just boil water.","variable":"","category":"Container","itemType":"UsableItem","bulk":3,"value":null,"traits":"","valMod":2,"dc":12,"time":2,"components":"","technique":{"name":"Coffee pot","fieldName":"coffee_pot","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"]
                        ,
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Flask":{"name":"Flask","fieldName":"","group":"Gear","description":"A flask holds 1 pint of liquid and weighs 1 lb. when full.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":1,"dc":null,"time":1,"components":"","technique":{"name":"Flask","fieldName":"flask","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Jug":{"name":"Jug","fieldName":"","group":"Gear","description":"This basic jug is fitted with a stopper and holds 1 gallon of liquid.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":1,"dc":null,"time":1,"components":"","technique":{"name":"Jug","fieldName":"jug","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Pitcher":{"name":"Pitcher","fieldName":"","group":"Gear","description":"A clay pitcher.","variable":"","category":"Container","itemType":"UsableItem","bulk":3,"value":null,"traits":"","valMod":1,"dc":null,"time":1,"components":"","technique":{"name":"Pitcher","fieldName":"pitcher","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Vial":{"name":"Vial","fieldName":"","group":"Gear","description":"A vial is made out of glass or steel and holds 1 ounce of liquid.","variable":"","category":"Container","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":2,"dc":null,"time":1,"components":"","technique":{"name":"Vial","fieldName":"vial","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Canvas (1 sq. yd)":{"name":"Canvas (1 sq. yd)","fieldName":"","group":"Gear","description":"This square yard of heavy cloth is suitable for painting, for covering items in a rainstorm, for creating a sail, or as an improvised bag. It is not waterproof but can be treated with oil, wax, or resin to make it water-resistant.","variable":"","category":"Writing","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":1,"dc":12,"time":1,"components":"","technique":{"name":"Canvas (1 sq. yd)","fieldName":"canvas_(1_sq._yd)","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Inkpen":{"name":"Inkpen","fieldName":"","group":"Gear","description":"This is a wooden stylus with a metal tip that retains a small amount of ink after you dip it in a vial of ink.","variable":"","category":"Writing","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":1,"dc":12,"time":1,"components":"","technique":{"name":"Inkpen","fieldName":"inkpen","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Paper (30 sheets)":{"name":"Paper (30 sheets)","fieldName":"","group":"Gear","description":"A sheet of ordinary paper typically measures 9 inches by 6 inches and is unsuitable for making magical scrolls. ","variable":"","category":"Writing","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":1,"dc":12,"time":1,"components":"","technique":{"name":"Paper (30 sheets)","fieldName":"paper_(30_sheets)","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Lock, average":{"name":"Lock, average","fieldName":"","group":"Gear","description":"A simple lock can be unlocked with a standard Mechanical check.","variable":"","category":"Bindings","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":8,"dc":12,"time":2,"components":"","technique":{"name":"Lock, average","fieldName":"lock,_average","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Lock, good":{"name":"Lock, good","fieldName":"","group":"Gear","description":"A good lock can be unlocked with a difficult Mechanical check.","variable":"","category":"Bindings","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":12,"dc":15,"time":3,"components":"","technique":{"name":"Lock, good","fieldName":"lock,_good","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false},
            "Lock, superior":{"name":"Lock, superior","fieldName":"","group":"Gear","description":"A superior lock can be unlocked with a risky Mechanical check.","variable":"","category":"Bindings","itemType":"UsableItem","bulk":1,"value":null,"traits":"","valMod":16,"dc":18,"time":4,"components":"","technique":{"name":"Lock, superior","fieldName":"lock,_superior","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"","traits":"","resourceCost":"","limits":"","skill":"","range":"","target":"","size":null,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"","subType":"","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"","traits":""}},
                        "sortingGroups":{"type":{"":["T0"]}}}},
                "hasTechnique":false}},
        sortingGroups = {"group":{"":["Weapons","Tool","Chest Slot","Head Slot","Arms Slot","Legs Slot","Foot Slot","Gear"],"Tool":["Handaxe","Battleaxe","Great Axe","Club","Warhammer","Maul","Javelin","Spear","Lance","Half-Staff","Full-Staff","Dagger","Rapier","Shortsword","Longsword","Great Sword","Whip","Shortbow","Longbow","Pistol","Revolver","Sniper Rifle","HI. Sniper Rifle","Blunderbuss","Shotgun","Flamethrower","Impact Bomb","Blast Bomb","HI. Blast Bomb","Medkit","Etherlink","Mirror","Compass","Torch","Lanturn","Light Orb","Rope","Manacles","Magic Restraints","Ladder","Shovel","Spyglass","Umbrella"],"Chest Gear":["Light Breastplate","Heavy Breastplate"],"Head Gear":["Light Helmet","Heavy Helmet","Etherlink Headset"],"Arm Gear":["Light Vambraces","Heavy Vambraces"],"Leg Gear":["Light Greaves","Heavy Greaves"],"Foot Gear":["Boots"],"Gear":["Bedroll","Blanket","Cot","Hammock","Tent","Pavillion Tent","Backpack, common","Pouch, waist","Sack","Barrel","Basket","Box, scroll","Bucket","Case, scroll","Chest, Small","Chest, Medium","Chest, Large","Cooler","Pot","Bottle","Canteen","Cauldron","Coffee pot","Flask","Jug","Pitcher","Vial","Canvas (1 sq. yd)","Inkpen","Paper (30 sheets)","Lock, average","Lock, good","Lock, superior"]},"subGroup":{},"action":{},"skill":{},"range":{}},

        get = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new UsableItemData(values[key]);
        },
        getValues = function (keyArray, delimiter, prefix) {
            if (keyArray == undefined || keyArray == "") {
                return [];
            }
            if (typeof keyArray == "string") {
                keyArray = keyArray.split(delimiter);
            }
            if (prefix == undefined) {
                prefix = "";
            }

            let output = [];
            let name = "";
            let lookup = "";
            let dataInfo;

            for (let i = 0; i < keyArray.length; i++) {
                name = `${prefix}${keyArray[i].trim()}`;

                lookup = name;
                if (lookup.indexOf("(") >= 0) {
                    lookup = lookup.replace(/\([^)]*\)/g, "(X)");
                }

                dataInfo = get(lookup);
                if (dataInfo != undefined) {
                    dataInfo.name = name;
                    output.push(dataInfo);
                }
            }

            return output;
        },
        has = function (key) {
            return keys.includes(key);
        },
        iterate = function (callback) {
            for (let i = 0; i < keys.length; i++) {
                callback(values[keys[i]]);
            }
        },
        filter = function (filterData) {
            let filteredGroup;
            if (Array.isArray(filterData)) {
                filteredGroup = getSortedGroup(filterData[0].property, filterData[0].value);
                let nextFilter = [];
                for (let i = 1; i < filterData.length; i++) {
                    if (filteredGroup == undefined || filteredGroup.length == 0) {
                        return [];
                    }
                    nextFilter = getSortedGroup(filterData[i].property, filterData[i].value);
                    filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
                }
            } else {
                filteredGroup = getSortedGroup(filterData.property, filterData.value);
            }
            if (filteredGroup == undefined || filteredGroup.length == 0) {
                return [];
            }
            return getGroupData(filteredGroup);
        },
        getSortedGroup = function (property, propertyValue) {
            if (!sortingGroups.hasOwnProperty(property)) {
                let keys = "";
                for (let key in sortingGroups) {
                    keys += `${key}, `;
                }
                Debug.Log (`Tried to find property ${property} but it does not exist in the database. Valid properties are ${keys}`);
            }
            if (!sortingGroups[property].hasOwnProperty(propertyValue)) {
                let keys = "";
                for (let key in sortingGroups[property]) {
                    keys += `${key}, `;
                }
                Debug.Log (`Tried to find sub property ${propertyValue} but it does not exist in the database. Valid properties are ${keys}`);
            }
            return sortingGroups[property][propertyValue];
        },
        getGroupData = function (group) {
            let output = [];
            for (let i = 0; i < group.length; i++) {
                output.push(get(group[i]));
            }
            return output;
        },
        getPropertyValues = function (property) {
            let output = [];
            for (let key in sortingGroups[property]) {
                output.push(key);
            }
            return output;
        }
    ;
    return {
        Get: get,
        GetValues: getValues,
        Has: has,
        Iterate: iterate,
        Filter: filter,
        GetSortedGroup: getSortedGroup
    };
}());

var WuxConsumable = WuxConsumable || (function() {
    'use strict';

    var
        keys = ["Steroid Juice","Steroid Juice HQ","Compress Balm","Compress Balm HQ","Stability"],
        values = {"Steroid Juice":{"name":"Steroid Juice","fieldName":"","group":"Medicine","description":"This stimulant helps to quickly allieviate pain and promote healing.","variable":"","category":"","itemType":"UsableItem","bulk":1,"value":74,"traits":"Ingested","valMod":1,"dc":12,"time":3,"components":"1 Goods_Water; 2 Goods_Schizandra; 4 Goods_Brahmi","technique":{"name":"Steroid Juice","fieldName":"steroid_juice","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"","range":"1","target":"Target or Self","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"HP","subType":"Surge","duration":"","dVal":"","dType":"","formula":{"workers":[{"variableName":"cmb-hv","definitionName":"Cmb_HV","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0"]}}}},
                "hasTechnique":true},
            "Steroid Juice HQ":{"name":"Steroid Juice HQ","fieldName":"","group":"Medicine","description":"This powerful stimulant helps to quickly allieviate pain and promote healing.","variable":"","category":"","itemType":"UsableItem","bulk":1,"value":147,"traits":"Ingested","valMod":4,"dc":15,"time":3,"components":"1 Goods_Water; 3 Goods_Schizandra; 6 Goods_Brahmi","technique":{"name":"Steroid Juice HQ","fieldName":"steroid_juice_hq","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"2 EN","limits":"","skill":"","range":"1","target":"Target or Self","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"HP","subType":"Surge","duration":"","dVal":"2","dType":"6","formula":{"workers":[{"variableName":"cmb-hv","definitionName":"Cmb_HV","value":0,"multiplier":1,"max":0},
                                        {"variableName":"","definitionName":"","value":2,"multiplier":1,"max":0}]},
                                "effect":"Dmg_","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0"]}}}},
                "hasTechnique":true},
            "Compress Balm":{"name":"Compress Balm","fieldName":"","group":"Medicine","description":"A cooling ointment is applied to a compress bandage to quickly heal a wound. ","variable":"","category":"","itemType":"UsableItem","bulk":1,"value":76,"traits":"","valMod":1,"dc":12,"time":3,"components":"1 Goods_Bee's wax; 2 Goods_Schizandra; 4 Goods_Shepherd's Purse","technique":{"name":"Compress Balm","fieldName":"compress_balm","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"1 EN","limits":"","skill":"","range":"1","target":"Target or Self","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"HP","subType":"Surge","duration":"","dVal":"1","dType":"6","formula":{"workers":[{"variableName":"cmb-hv","definitionName":"Cmb_HV","value":0,"multiplier":1,"max":0}]},
                                "effect":"Dmg_","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0"]}}}},
                "hasTechnique":true},
            "Compress Balm HQ":{"name":"Compress Balm HQ","fieldName":"","group":"Medicine","description":"A powerful cooling ointment is applied to a compress bandage to quickly heal a wound. ","variable":"","category":"","itemType":"UsableItem","bulk":1,"value":154,"traits":"","valMod":4,"dc":12,"time":3,"components":"2 Goods_Bee's wax; 3 Goods_Schizandra; 6 Goods_Shepherd's Purse","technique":{"name":"Compress Balm HQ","fieldName":"compress_balm_hq","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"3 EN","limits":"","skill":"","range":"1","target":"Target or Self","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":[],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"HP","subType":"Surge","duration":"","dVal":"3","dType":"6","formula":{"workers":[{"variableName":"cmb-hv","definitionName":"Cmb_HV","value":0,"multiplier":1,"max":0},
                                        {"variableName":"","definitionName":"","value":5,"multiplier":1,"max":0}]},
                                "effect":"Dmg_","traits":""}},
                        "sortingGroups":{"type":{"HP":["T0"]}}}},
                "hasTechnique":true},
            "Stability":{"name":"Stability","fieldName":"","group":"Medicine","description":"This drug eliminates feels of sickness and nausea instantly. ","variable":"","category":"","itemType":"UsableItem","bulk":1,"value":82,"traits":"Inhalent","valMod":1,"dc":12,"time":3,"components":"1 Goods_Water; 2 Goods_Astragalus; 4 Goods_Schizandra","technique":{"name":"Stability","fieldName":"stability","group":"","description":"","variable":"","techSet":"Item","affinity":"","tier":0,"isFree":true,"action":"Quick","traits":"","resourceCost":"","limits":"","skill":"","range":"1","target":"Target or Self","size":1,"requirement":"","itemTraits":"","trigger":"","flavorText":"","definitions":["Stat_Sickened"],
                    "effects":{"keys":["T0"],
                        "values":{"T0":{"name":"T0","defense":"","target":"","type":"Status","subType":"Remove","duration":"","dVal":"","dType":"","formula":{"workers":[]},
                                "effect":"Stat_Sickened","traits":""}},
                        "sortingGroups":{"type":{"Status":["T0"]}}}},
                "hasTechnique":true}},
        sortingGroups = {"group":{"Medicine":["Steroid Juice","Steroid Juice HQ","Compress Balm","Compress Balm HQ","Stability"]},"subGroup":{},"action":{},"skill":{},"range":{}},

        get = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new UsableItemData(values[key]);
        },
        getValues = function (keyArray, delimiter, prefix) {
            if (keyArray == undefined || keyArray == "") {
                return [];
            }
            if (typeof keyArray == "string") {
                keyArray = keyArray.split(delimiter);
            }
            if (prefix == undefined) {
                prefix = "";
            }

            let output = [];
            let name = "";
            let lookup = "";
            let dataInfo;

            for (let i = 0; i < keyArray.length; i++) {
                name = `${prefix}${keyArray[i].trim()}`;

                lookup = name;
                if (lookup.indexOf("(") >= 0) {
                    lookup = lookup.replace(/\([^)]*\)/g, "(X)");
                }

                dataInfo = get(lookup);
                if (dataInfo != undefined) {
                    dataInfo.name = name;
                    output.push(dataInfo);
                }
            }

            return output;
        },
        has = function (key) {
            return keys.includes(key);
        },
        iterate = function (callback) {
            for (let i = 0; i < keys.length; i++) {
                callback(values[keys[i]]);
            }
        },
        filter = function (filterData) {
            let filteredGroup;
            if (Array.isArray(filterData)) {
                filteredGroup = getSortedGroup(filterData[0].property, filterData[0].value);
                let nextFilter = [];
                for (let i = 1; i < filterData.length; i++) {
                    if (filteredGroup == undefined || filteredGroup.length == 0) {
                        return [];
                    }
                    nextFilter = getSortedGroup(filterData[i].property, filterData[i].value);
                    filteredGroup = filteredGroup.filter(item => nextFilter.includes(item))
                }
            } else {
                filteredGroup = getSortedGroup(filterData.property, filterData.value);
            }
            if (filteredGroup == undefined || filteredGroup.length == 0) {
                return [];
            }
            return getGroupData(filteredGroup);
        },
        getSortedGroup = function (property, propertyValue) {
            if (!sortingGroups.hasOwnProperty(property)) {
                let keys = "";
                for (let key in sortingGroups) {
                    keys += `${key}, `;
                }
                Debug.Log (`Tried to find property ${property} but it does not exist in the database. Valid properties are ${keys}`);
            }
            if (!sortingGroups[property].hasOwnProperty(propertyValue)) {
                let keys = "";
                for (let key in sortingGroups[property]) {
                    keys += `${key}, `;
                }
                Debug.Log (`Tried to find sub property ${propertyValue} but it does not exist in the database. Valid properties are ${keys}`);
            }
            return sortingGroups[property][propertyValue];
        },
        getGroupData = function (group) {
            let output = [];
            for (let i = 0; i < group.length; i++) {
                output.push(get(group[i]));
            }
            return output;
        },
        getPropertyValues = function (property) {
            let output = [];
            for (let key in sortingGroups[property]) {
                output.push(key);
            }
            return output;
        }
    ;
    return {
        Get: get,
        GetValues: getValues,
        Has: has,
        Iterate: iterate,
        Filter: filter,
        GetSortedGroup: getSortedGroup
    };
}());


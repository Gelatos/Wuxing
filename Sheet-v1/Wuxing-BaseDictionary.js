function GetKnowledgeInfo(knowledge) {
	switch (knowledge.toLowerCase()) {
		case "":
			return {
				name: ""
			};
		case "academia":
			return {
				name: "Academia",
					spec: `Academia specializations target specific schools and represents knowledge in how that school runs, its educators, and how subjects are taught.`,
					desc: `This knowledge represents information related to schools, famous educators, and forms of education used in the lands.`
			};
		case "apolloculture":
			return {
				name: "Apollo Culture",
					spec: ``,
					desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
			};
		case "apollohistory":
			return {
				name: "Apollo History",
					spec: ``,
					desc: `History knowledges represent known history of a civilization and any legends that may exist.`
			};
		case "apolloregion":
			return {
				name: "Apollo Region",
					spec: ``,
					desc: `Region knowledges represents known geography and points of interest within the civilization.`
			};
		case "aquaticcreatures":
			return {
				name: "Aquatic Creatures",
					spec: ``,
					desc: `This knowledge represents any life that dwells in the water.`
			};
		case "aquaticterrain":
			return {
				name: "Aquatic Terrain",
					spec: ``,
					desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
			};
		case "architecture":
			return {
				name: "Architecture",
					spec: ``,
					desc: `This knowledge represents a general knowledge about building design, general points of entry, and potential weaknesses.`
			};
		case "arcticterrain":
			return {
				name: "Arctic Terrain",
					spec: ``,
					desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
			};
		case "art":
			return {
				name: "Art",
					spec: `Art specializations target specific artist or artistic scenes and the works created from them.`,
					desc: `Art knowledge details information on the world of art and the artists behind famous works of art.`
			};
		case "aviancreatures":
			return {
				name: "Avian Creatures",
					spec: ``,
					desc: `This knowledge represents any life that flies.`
			};
		case "ceresculture":
			return {
				name: "Ceres Culture",
					spec: ``,
					desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
			};
		case "cereshistory":
			return {
				name: "Ceres History",
					spec: ``,
					desc: `History knowledges represent known history of a civilization and any legends that may exist.`
			};
		case "ceresregion":
			return {
				name: "Ceres Region",
					spec: ``,
					desc: `Region knowledges represents known geography and points of interest within the civilization.`
			};
		case "concept":
			return {
				name: "Concept",
					spec: `Concept specializations represent knowledge in a specific topic that is otherwise intangible. These can be understanding of accounting or geometry from mathematics or the concept of the ethereal well or pocket realities from ethereal plane knowledge.`,
					desc: ``
			};
		case "creature":
			return {
				name: "Creature",
					spec: `Specializations in creature knowledge target a specific type of creature and its permutations. This knowledge can then be used to identify information about that creature such as anatomy, special qualities, weaknesses, and common behaviors.`,
					desc: ``
			};
		case "cuisine":
			return {
				name: "Cuisine",
					spec: `Cuisine specializations target a culture or class of people's foods and techniques used in that society. One might gain a knowledge in Minervan aristocrating cuisine or the food of a sailor.`,
					desc: `Cuisine knowledge represents an understand of food preparation, recipes, and cooking techniques.`
			};
		case "desertterrain":
			return {
				name: "Desert Terrain",
					spec: ``,
					desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
			};
		case "engineering":
			return {
				name: "Engineering",
					spec: `Engineering specializations target specific types of engineering projects such as bridges or weaponry.`,
					desc: `Engineering knowledge represents an understanding of mechanics and systems to build complex structures and items.`
			};
		case "etherealplane":
			return {
				name: "Ethereal Plane",
					spec: `Ethereal Plane specializations target concepts and points of interest related to the spirit plane.`,
					desc: `Ethereal Plane knowledge represents known methods of entering the plane, its dangers, qualities, and points of interest within the plane.`
			};
		case "event":
			return {
				name: "Event",
					spec: `Event specializations target a specific event. This can be a specific festival within a civilization, a major situation form the past like a war or monumental change in society, or a story told through legend.`,
					desc: ``
			};
		case "farming":
			return {
				name: "Farming",
					spec: ``,
					desc: `Farming knowledge covers all aspects of growing and nurturing plantlife in order to provide food`
			};
		case "fashion":
			return {
				name: "Fashion",
					spec: `Fashion specializations target a culture or class of people's clothing and popular appearances in that society.`,
					desc: `Fashion knowledge focuses on keeping up with clothing and physical beatuy products.`
			};
		case "fishing":
			return {
				name: "Fishing",
					spec: ``,
					desc: `Fishing knowledge covers all aspects of fishing.`
			};
		case "forestterrain":
			return {
				name: "Forest Terrain",
					spec: ``,
					desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
			};
		case "fossoriancreatures":
			return {
				name: "Fossorian Creatures",
					spec: ``,
					desc: `This knowledge represents any life that burrows.`
			};
		case "games":
			return {
				name: "Games",
					spec: `Games specializations target specific games of chance and skill.`,
					desc: `Games knowledge covers general understanding of how many games are played whether they are reliant on cards, dice, or other kinds of chance.`
			};
		case "guidancereligion":
			return {
				name: "Guidance Religion",
					spec: ``,
					desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
			};
		case "herbalism":
			return {
				name: "Herbalism",
					spec: `Herbalism specializations target categories of herbs such as spices for foods, medicinal remedies, and poisons.`,
					desc: `Herbalism knowledge grants an understanding of various types of small plant life and their uses.`
			};
		case "history":
			return {
				name: "History",
					spec: `History specializations target a small known collective area within the world such as a specific society, forest, or other body of land. This knowledge can then be used to recall knowledge related to historical events of that area and how major events may have impacted the area.`,
					desc: ``
			};
		case "hunting":
			return {
				name: "Hunting",
					spec: `Hiunting specializations target classes of creatures. Choose from Aquatic, Avian, Fossorian, Humanoid, Terran, or Saurian.`,
					desc: `Hunting knowledge imparts wisdom related to tracking, catching, and killing various creatures.`
			};
		case "junoculture":
			return {
				name: "Juno Culture",
					spec: ``,
					desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
			};
		case "junohistory":
			return {
				name: "Juno History",
					spec: ``,
					desc: `History knowledges represent known history of a civilization and any legends that may exist.`
			};
		case "junoregion":
			return {
				name: "Juno Region",
					spec: ``,
					desc: `Region knowledges represents known geography and points of interest within the civilization.`
			};
		case "kongkweireligion":
			return {
				name: "Kongkwei Religion",
					spec: ``,
					desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
			};
		case "legal":
			return {
				name: "Legal",
					spec: `Legal specializations target civilizations of the world and their specific laws.`,
					desc: `Legal knowledge imparts a knowledge of general laws common amongst civilizations and the penalties that may be gained from disobeying them.`
			};
		case "liberculture":
			return {
				name: "Liber Culture",
					spec: ``,
					desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
			};
		case "liberhistory":
			return {
				name: "Liber History",
					spec: ``,
					desc: `History knowledges represent known history of a civilization and any legends that may exist.`
			};
		case "liberregion":
			return {
				name: "Liber Region",
					spec: ``,
					desc: `Region knowledges represents known geography and points of interest within the civilization.`
			};
		case "mathematics":
			return {
				name: "Mathematics",
					spec: `Mathematics specializations target specific mathematical concepts such as geometry or arithmetic.`,
					desc: `Mathematics knowledge represents an understanding of math and calculations.`
			};
		case "mercantile":
			return {
				name: "Mercantile",
					spec: ``,
					desc: `Mercantile knowledge grants wisdom related to the buying and selling of goods.`
			};
		case "minervaculture":
			return {
				name: "Minerva Culture",
					spec: ``,
					desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
			};
		case "minervahistory":
			return {
				name: "Minerva History",
					spec: ``,
					desc: `History knowledges represent known history of a civilization and any legends that may exist.`
			};
		case "minervaregion":
			return {
				name: "Minerva Region",
					spec: ``,
					desc: `Landscape knowledges represents known geography and points of interest within the civilization.`
			};
		case "mining":
			return {
				name: "Mining",
					spec: ``,
					desc: `Mining knowledge represents information related to breaking apart rock for material.`
			};
		case "mountainterrain":
			return {
				name: "Mountain Terrain",
					spec: ``,
					desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
			};
		case "music":
			return {
				name: "Music",
					spec: `Music specializations target types of music and those that perform in these genres.`,
					desc: `Music knowledge represents general understanding of sheet music, famous songs and the artists behind them, and an understanding of the industry.`
			};
		case "novusculture":
			return {
				name: "Novus Culture",
					spec: ``,
					desc: `Culture knowledges represent societal etiquette, knowledge of the government, and any class systems that may exist and how to behave within them.`
			};
		case "novushistory":
			return {
				name: "Novus History",
					spec: ``,
					desc: `History knowledges represent known history of a civilization and any legends that may exist.`
			};
		case "novusregion":
			return {
				name: "Novus Region",
					spec: ``,
					desc: `Region knowledges represents known geography and points of interest within the civilization.`
			};
		case "oceancourtreligion":
			return {
				name: "Ocean Court Religion",
					spec: ``,
					desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
			};
		case "organization":
			return {
				name: "Organization",
					spec: `Organization specializations target a specific group of people or cause. This knowledge is used for information related to the organization, its causes, and what it may have done.`,
					desc: ``
			};
		case "plainsterrain":
			return {
				name: "Plains Terrain",
					spec: ``,
					desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
			};
		case "person":
			return {
				name: "Person",
					spec: `Person specializations target a specific individual. This knowledge is used to bring up any information known about the person in specific.`,
					desc: ``
			};
		case "region":
			return {
				name: "Region",
					spec: `Region specializations target a small known collective area within the world such as a specific town, forest, or other body of land. These knowledges are used for geography in the area, any secrets or shortcuts within the landscape, and survival in the area.`,
					desc: ``
			};
		case "religion":
			return {
				name: "Religion",
					spec: `Religion specializations come in a few forms. They can represent specific rituals or hierarchies within a religion. They can also be used to represent either a specific subset of a religion or any smaller religions formed independent of any other globally known religion.`,
					desc: ``
			};
		case "sauriancreatures":
			return {
				name: "Saurian Creatures",
					spec: ``,
					desc: `This knowledge represents the creatures known as saurians - life of earth.`
			};
		case "sailing":
			return {
				name: "Sailing",
					spec: ``,
					desc: `Sailing knowledge imparts a knowledge of seafaring, the dangers of the sea, and an understanding of potential pitfalls at sea.`
			};
		case "scribing":
			return {
				name: "Scribing",
					spec: ``,
					desc: `Scribing knowledge represents an understanding of how to communicate with the written word and techniques used to write.`
			};
		case "society":
			return {
				name: "Society",
					spec: `Society specializations target a collection of people such as a small culture, a region of a nation, or a class of people within a civilization. This knowledge is used to represent societal customs, behaviors, and etiquette within the society.`,
					desc: ``
			};
		case "spirits":
			return {
				name: "Spirits",
					spec: ``,
					desc: `Spirit knowledge represents an understanding of how spirits behave, their various forms, their interactions with magic and ether, and their abilities to manifest into the material plane.`
			};
		case "swampterrain":
			return {
				name: "Swamp Terrain",
					spec: ``,
					desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
			};
		case "sylvanreligion":
			return {
				name: "Sylvan Religion",
					spec: ``,
					desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
			};
		case "tanning":
			return {
				name: "Tanning",
					spec: ``,
					desc: `Tanning knowledge imparts an understanding of techniques used to properly cure and work with leather.`
			};
		case "terrancreatures":
			return {
				name: "Terran Creatures",
					spec: ``,
					desc: `This knowledge represents any creatures that live on and are bound by the earth.`
			};
		case "theater":
			return {
				name: "Theater",
					spec: `Theater specializations target specific plays and their adaptations.`,
					desc: `Theater knowledge is the knowledge of the stage, techniques to tell a story, and famous plays.`
			};
		case "undergroundterrain":
			return {
				name: "Underground Terrain",
					spec: ``,
					desc: `Terrain knowledges represents an ability to assess dangers within the terrain methods of survival while dwelling within it.`
			};
		case "warfare":
			return {
				name: "Warfare",
					spec: ``,
					desc: `Warfare knowledge covers various tactics used in war and the management of an army.`
			};
		case "zushaonreligion":
			return {
				name: "Zushaon Religion",
					spec: ``,
					desc: `Religion knowledges represent known tenets, famous people and creatures of the religion, and information about legends, beliefs, and organizations within the religion.`
			};
	}
	return {
		name: "",
	};
}

function GetLanguageInfo(language) {
	switch (language.toLowerCase()) {
		case "":
			return {
				name: ""
			};
		case "apollen / mons":
			return {
				name: "Apollen / Mons",
					category: "Common",
					region: "",
					desc: `The common tongue of Apollo, this language uses a variety of symbols in written works. It is one of the oldest languages still in use in modern times. In the Blessed lands it is known as Mons, the language of the mountainous people, the Monsen.`
			};
		case "cert":
			return {
				name: "Cert",
					category: "Common",
					region: "",
					desc: `The most commonly spoken language in all of Ceres, this language is the original tongue used by the Choi clan. To most in modern times, this connection to the Choi clan is lost but it can often be made clear in the company of those of the clan.`
			};
		case "junal":
			return {
				name: "Junal",
					category: "Common",
					region: "",
					desc: `Juno's major language and the official language of the Guidance. Those who live within or below the city of Juno are expected to learn and speak this language to fully integrate into society.`
			};
		case "lib":
			return {
				name: "Lib",
					category: "Common",
					region: "",
					desc: `This language is commonly used in Liber. Its roots seem entirely locked to the region, however the age of the language itself are unclear due to it not being used in written form until much later than its equivalents.`
			};
		case "minere":
			return {
				name: "Minere",
					category: "Common",
					region: "",
					desc: `The common language used in Minerva and the lands surrounding it. Minere is made up of three root languages that were once spoken commonly amongst the coastal civilizations of the area.`
			};
		case "byric":
			return {
				name: "Byric",
					category: "Regional",
					region: "Baryan Ascent",
					desc: `The dialect of the tribes of people that live in the Baryan Ascent, north of the Aridsha Desert. It has many common traits with the neighboring dialect of Dustell.`
			};
		case "ciel":
			return {
				name: "Ciel",
					category: "Regional",
					region: "Ceres",
					desc: `This language is used almost exclusively by Clan Par, the historians of Ceres. Those who learn the language often do so to share in the clan's protection and love of the stories and values of Ceres.`
			};
		case "citeq":
			return {
				name: "Citeq",
					category: "Regional",
					region: "South West Ceres",
					desc: `A spoken language used mostly by the Ceresian tribes that roam the south western plains of Ceres. `
			};
		case "dustell":
			return {
				name: "Dustell",
					category: "Regional",
					region: "Aridsha Desert",
					desc: `This language has many derrivatives across the tribes of the desert. However each version, while distinct in its pronunciations, share a common written form derrived from the Shira language. Due to its use throughout the desert, it is Juno's second most common language.`
			};
		case "kleikan":
			return {
				name: "Kleikan",
					category: "Regional",
					region: "Klef and Kremgao regions",
					desc: `This spoken language was once the language of the Suntouched people that lived west of the Khembalung Mountain range. It's largely fallen out of favor but pockets of people still try to keep the language alive.`
			};
		case "manstan":
			return {
				name: "Manstan",
					category: "Regional",
					region: "Southern Ceres",
					desc: `The spoken language used in Southern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language.`
			};
		case "muralic":
			return {
				name: "Muralic",
					category: "Regional",
					region: "Aridsha Desert",
					desc: `The language of the Murali people in the deserts of Aridsha. Its roots in Shira are clear and may be even closer to the ancient language than Junal.`
			};
		case "palmic":
			return {
				name: "Palmic",
					category: "Regional",
					region: "Tropical Seas",
					desc: `This spoken language is used exclusively in tropical island nations. In modern times it only sees common use by tribes in the region, however its language is often used in the tourism industry to imbue a sense of exoticism.`
			};
		case "salkan":
			return {
				name: "Salkan",
					category: "Regional",
					region: "North West Ceres",
					desc: `An entirely spoken language used by the Ceresian tribes located in the North west Salkandu region. It is most commonly known as the language of Clan Han.`
			};
		case "sansic":
			return {
				name: "Sansic",
					category: "Regional",
					region: "Eastern Ceres",
					desc: `The spoken language used in Eastern Ceresian tribes. It has mostly fallen out of favor due to many of the tribes in this location having settled into Sanctum life, however many who wish to remember older times still speak this language.`
			};
		case "shorespeak":
			return {
				name: "Shorespeak",
					category: "Regional",
					region: "East Sea",
					desc: `A spoken language used by those living along the east coast and in island nations across the sea. While it has no written language, its similarities to both Minere and ancient Vulca make it easy to communicate across cultures regardless.`
			};
		case "silq":
			return {
				name: "Silq",
					category: "Regional",
					region: "Western Ceres",
					desc: `The spoken language used in Western Ceresian forest tribes. This language is not often heard due to the forest peoples' exclusion from most of Ceres society in modern times.`
			};
		case "verdeni":
			return {
				name: "Verdeni",
					category: "Regional",
					region: "Verdant Key",
					desc: `The spoken language of the island of Verdant Key. Its peoples' isolation from most of modern society has kept this language in tact to ancient times.`
			};
		case "wolfwarg":
			return {
				name: "Wolfwarg",
					category: "Regional",
					region: "Cesplangrah Societies",
					desc: `The spoken language of the bestial people, the Cesplangrah. Much of the language is spoken through grunts and growls.`
			};
		case "crinere":
			return {
				name: "Crinere",
					category: "Ancient",
					region: "",
					desc: `The ancient language of the civilization of Metis. It has fallen out of favor for the modern Minere and is the basis for said language. Due to how similar the two languages are, many who speak Minere find themselves able to understand the scriptures of Crinere.`
			};
		case "shira":
			return {
				name: "Shira",
					category: "Ancient",
					region: "",
					desc: `An old language that evolved into both the Junal and Muralic languages. Usage can still be found in ancient Guidance relics.`
			};
		case "vulca":
			return {
				name: "Vulca",
					category: "Ancient",
					region: "",
					desc: `The ancient language of the civilization of Vulcan. It shares a lot of common traits of Shorespeak and may be its root language. The language has fallen out of favor for both Minere and Shorespeak but can still be found on ancient, Ocean Court relics and Vulcan texts.`
			};
		case "emotion":
			return {
				name: "Emotion",
					category: "Special",
					region: "Spirit",
					desc: `The language of the spirits. This language is incredibly simplistic as it is communicated entirely through emotions.`
			};
		case "empathy":
			return {
				name: "Empathy",
					category: "Special",
					region: "Spirit",
					desc: `A language of the spirits. This language is communicated through thought and ether, allowing creatures of any type to understand.`
			};
		case "novan / jovean":
			return {
				name: "Novan / Jovean",
					category: "Special",
					region: "Ancient",
					desc: `The common language of Novus, this language has been used across the blessed lands for as long as its people were aware. In the mainland, it is known as the language of the civilization of Jove and has largely fallen out of use.`
			};
		case "mytikan":
			return {
				name: "Mytikan",
					category: "Special",
					region: "Ancient",
					desc: `The root language of both Novan and Apollen, Mytikan is a language lost to time in the mainland. Ancient relics still use the language in the Blessed Lands and as such isn't surprising to find it still learned by scholars in Novus society.`
			};
	}
	return {
		name: "",
	};
}

function GetHumanEthnicityInfo(ethnicity) {
	switch (ethnicity.toLowerCase()) {
		case "":
			return {
				name: ""
			};
		case "coastborne":
			return {
				name: "Coastborne",
					desc: `Coastborne originated along the east coast and islands of Wuxing but have moved in land occupying the plains and hills of the Khem and Walthai regions. The coastborne are known to be a clever people who are quick to find solutions to whatever problem that harries them.`,
					score: `Increase any two ability scores by one, then increase Constitution or Intelligence by one.`,
					skill: `Become trained in the Perception or Investigation skill.`,
					skillPoints: 1,
					feat: "Coastborne gain the Specialized Training feat to represent their varied skills and ingenuity.",
					featName: "Specialized Training"
			};
		case "suntouched":
			return {
				name: "Suntouched",
					desc: `Suntounched can most commonly be found in the northern Khembalung mountain range. They are bulky and tall race known for their strength and imposing nature.`,
					score: `Increase any two ability scores by one, then increase Strength or Charisma by one.`,
					skill: `Become trained in the Athletics or Intimidation skill.`,
					skillPoints: 1,
					feat: "Suntouched gain the Relentless Endurance feat to represent their strength and determination.",
					featName: "Relentless Endurance"
			};
		case "sandfolk":
			return {
				name: "Sandfolk",
					desc: `Sandfolk origins place them in the western Aridsha desert but much like many ethnicities in modern times they can be found all over the world. These people tend to have keen senses, able to react faster than the average person. `,
					score: `Increase any two ability scores by one, then increase Dexterity or Wisdom by one.`,
					skill: `Become trained in the Insight or Survival skill.`,
					skillPoints: 1,
					feat: "Sandfolk gain the Keen Instinct feat to represent their alert nature.",
					featName: "Keen Instinct"
			};
		case "plains-kin":
			return {
				name: "Plains-kin",
					desc: `Plains-kin are found all over the world due to their exploratory nature but originated in the flat lands to the north. They are lithe and quick on their feet, able to pounce at a moment's notice.`,
					score: `Increase any two ability scores by one, then increase Dexterity or Charisma by one.`,
					skill: `Become trained in the Acrobatics or Investigation skill.`,
					skillPoints: 1,
					feat: "Plains-kin gain the Pounce feat to represent their finesse and speed.",
					featName: "Pounce"
			};
		case "frostcloaked":
			return {
				name: "Frostcloaked",
					desc: `Frostcloaked are an isolated race that originate in the frozen tundras of the south. While their bodies are pale and thin, they are known to be a very hardy people with thick skin and a high tolerance for both temperature and pain.`,
					score: `Increase any two ability scores by one, then increase Constitution or Wisdom by one.`,
					skill: `Become trained in the Perception or Stealth skill.`,
					skillPoints: 1,
					feat: "Frostcloaked gain the Thick Skin feat to represent their durability.",
					featName: "Thick Skin"
			};
		case "earthblood":
			return {
				name: "Earthblood",
					desc: `Earthblood are a race not seen on the main land of Wuxing but rather hail from the land of Novus across the East Sea. They are known to be equal parts clever and strong and a people devoted to self improvement.`,
					score: `Increase any two ability scores by one, then increase Strength or Intelligence by one.`,
					skill: `Become trained in the Arcana or Athletics skill.`,
					skillPoints: 1,
					feat: "Earthblood gain the Ki Battery feat as they all are able to generate ki with ease.",
					featName: "Ki Battery"
			};
	}
	return {
		name: "",
	};
}

function GetBeastAncestryInfo(beast) {
	switch (beast.toLowerCase()) {
		case "":
			return {
				name: ""
			};
		case "caranu":
			return {
				name: "Caranu",
					desc: `Also known as a Shell Bear, the caranu is a ferocious carnivore that is often found in areas of dense trees or rivers. Most caranu are of the grasslands variation however a variant called the snow caranu can be found in colder environments. The caranu is often a solitary creature that prefers to venture on its own. When one is seen with others of its kind this is typically a family that is raising young.`,
					score: `They gain a +6 bonus to Strength, a +2 bonus to Dexterity, a +6 bonus to Constitution, a -4 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All caranu start with a 25 foot land speed and a 15 foot swim speed.`,
					class: `Caranu are of the Brute class. `,
					features: [{
							name: "Large Creature",
							desc: `This creature is large sized. It gains a +2 bonus to Strength and a +2 bonus to Constitution, but suffers a -1 penalty to AC.`,
							featName: "Large Creature",
						},
						{
							name: "Carapice Armor",
							desc: `This creature has a hardened shell to fend off attacks. It gains a +4 bonus to AC.`,
							featName: "Carapice Armor",
						}
					]
			};
		case "cashmechong":
			return {
				name: "Cashmechong",
					desc: `Also known as a Sheep Beetle, the cashmechong is commonly a normal creature sized armored insect. It is usually found in areas where it can easily burrow as it tends to live beneath the earth. While intimidating in appearance, the creature is often passive and easily spooked, causing it to burrow away to protect itself. The Cashmechong often pair up with other cashmechong however rarely more than two are seen together. Their young will typically remain in subterranian nests.`,
					score: `They gain a +4 bonus to Strength, a +8 bonus to Constitution, a -4 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All cashmechong start with a 15 foot land speed and a 30 foot burrow speed.`,
					class: `Cashmechong are of the Bulwark class. `,
					features: [{
							name: "Rolling Tackle",
							desc: `You spring yourself into a ball and slam your body into another creature. As an action, move up to your speed in a straight line. If you move at least 10 feet and end your movement beside a creature, you may immediately attack that creature. This attack is an unarmed strike that deals 1d10 bludgeoning damage.`,
							featName: "Rolling Tackle",
						},
						{
							name: "Bite",
							desc: `You dig your teeth into a target. This is an unarmed melee strike that deals 1d8 piercing damage.`,
							featName: "Bite",
						},
						{
							name: "Claws",
							desc: `You swipe two claws at a target. This is an unarmed melee strike that deals 1d6 slashing damage.`,
							featName: "Claws",
						},
						{
							name: "Carapice Armor",
							desc: `This creature has a hardened shell to fend off attacks. It gains a +4 bonus to AC.`,
							featName: "Carapice Armor",
						},
						{
							name: "Horn Ram",
							desc: `You ram a target with horns. This is an unarmed melee strike that deals 1d6 piercing damage.`,
							featName: "Horn Ram",
						}
					]
			};
		case "cesplang":
			return {
				name: "Cesplang",
					desc: `Also known as a Feathered Wolf, the cesplang is a canine that often hunts throughout forested environments. It's known for its keen senses and uncanny ability to turn its head a full 360 degrees. The cesplang hunts in packs of anywhere between four and twelve wolves however variations or even solo cesplang can be found.`,
					score: `They gain a +6 bonus to Strength, a +6 bonus to Dexterity, a +4 bonus to Constitution, a -4 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All cesplang start with a 35 foot land speed.`,
					class: `Cesplaing are of the Prowler class. `,
					features: [{
							name: "Improved Scent",
							desc: `This feature allows a creature to detect approaching enemies, sniff out hidden foes, and track by sense of smell. The creature can detect creatures within 60 feet by sense of smell. If the creature is upwind, the range increases to 120 feet; if downwind, it drops to 30 feet. Strong scents, such as smoke or rotting garbage, can be detected at twice the ranges noted above. Overpowering scents, such as skunk musk or troglodyte stench, can be detected at triple normal range. When a creature detects a scent, the exact location of the source is not revealed—only its presence somewhere within range. The creature can take a move action to note the direction of the scent. When the creature is within 5 feet of the source, it pinpoints the source’s location. A creature with the scent ability can follow tracks by smell. The typical DC for a fresh trail is reduced by 10 with the scent ability. Creatures tracking by scent ignore the effects of surface conditions and poor visibility.`,
							featName: "Improved Scent",
						},
						{
							name: "Improved Sight",
							desc: `This creature has improved eyesight. While this creature can see, this creature gains a +4 bonus to Sense Pressence.`,
							featName: "Improved Sight",
						},
						{
							name: "Bite",
							desc: `You dig your teeth into a target. This is an unarmed melee strike that deals 1d8 piercing damage.`,
							featName: "Bite",
						},
						{
							name: "Claws",
							desc: `You swipe two claws at a target. This is an unarmed melee strike that deals 1d6 slashing damage.`,
							featName: "Claws",
						}
					]
			};
		case "colosshu":
			return {
				name: "Colosshu",
					desc: `Also known as an Elephant Mouse, the colloshu is an enormous creature that roams large open fields and landscapes for trees and nuts to feed off of. The colloshu often group together in large herds of ten or more, every member considered part of its family.`,
					score: `They gain a +6 bonus to Strength, a -2 penalty to Dexterity, a +6 bonus to Constitution, a -4 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All colloshu start with a 30 foot land speed.`,
					class: `Colloshu are of the Bulwark class. `,
					features: [{
							name: "Huge Creature",
							desc: `This creature is huge sized. It gains a +4 bonus to Strength and a +2 bonus to Constitution, but suffers a -2 penalty to AC.`,
							featName: "Huge Creature",
						},
						{
							name: "Slam",
							desc: `You swing two limbs, a powerful tail, or your body into a target. This is an unarmed melee strike that deals 1d8 bludgeoning damage.`,
							featName: "Slam",
						},
						{
							name: "Stomp",
							desc: `You stomp at a creature beneath you. This can only target creatures two sizes below you or if the target is prone. This is an unarmed melee strike that deals 1d12 bludgeoning damage.`,
							featName: "Stomp",
						},
						{
							name: "Thick Skin",
							desc: `This creature has a hardened skin that is difficult to puncture. This creature gains a +2 bonus to AC.`,
							featName: "Thick Skin",
						}
					]
			};
		case "dekying":
			return {
				name: "Dekying",
					desc: `Also known as a Carrion Eagle, the dekying soars the sky looking for dead animals to feed itself. It can often be found in mountainous areas where it can fly above its threats or in open plains where food can avoid hiding. This creature is often timid in nature when a creature is larger than this enormous bird, but becomes a menace to anything smaller. `,
					score: `They gain a +4 bonus to Strength, a +6 bonus to Dexterity, a +2 bonus to Constitution, a -4 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All dekying start with a 10 foot land speed and a 30 foot fly speed.`,
					class: `Dekying are of the Prowler class. `,
					features: [{
							name: "Small Creature",
							desc: `This creature is small sized. `,
							featName: "Small Creature",
						},
						{
							name: "Improved Sight",
							desc: `This creature has improved eyesight. While this creature can see, this creature gains a +4 bonus to Sense Pressence.`,
							featName: "Improved Sight",
						},
						{
							name: "Talons",
							desc: `You dig two talons into a target. This is an unarmed melee strike that deals 1d6 piercing damage.`,
							featName: "Talons",
						}
					]
			};
		case "geltingwa":
			return {
				name: "Geltingwa",
					desc: `Also known as a Slime Frog, the geltingwa is a jellyfish-like amphibian can be found in large bodies of water or deep caves. While it is often associated with water or acid, the flame geltingwa variant can often be found in volcanoes where it lingers amongst magma and fire.`,
					score: `They gain a +2 bonus to Strength, a +4 bonus to Dexterity, a +12 bonus to Constitution, a -6 penalty to Intelligence, and a -6 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All geltingwa start with a 10 foot land speed and a 20 foot swim speed.`,
					class: `Geltingwa are of the Bulwark class. `,
					features: [{
							name: "Tiny Creature",
							desc: `This creature is tiny sized. It gains a -2 penalty to Strength, a +2 bonus to Dexterity, and a +1 to AC.`,
							featName: "Tiny Creature",
						},
						{
							name: "Acid Sling",
							desc: `You sling acid at a creature. This is an unarmed ranged strike with a range of 15/60 that deals 1d6 acid damage.`,
							featName: "Acid Sling",
						},
						{
							name: "Clear Body",
							desc: `This creature's body is semi-translucent. When in water, the creature gains the invisible condition.`,
							featName: "Clear Body",
						},
						{
							name: "Acid Body",
							desc: `This creature's body is highly acidic. This creature is immune to all acid damage. In addition, creatures that make contact with this creature take 1d6 acid damage. This creature can make an unarmed melee strike against a creature by slamming its body into them for 1d6 acid damage.`,
							featName: "Acid Body",
						}
					]
			};
		case "holjo":
			return {
				name: "Holjo",
					desc: `Alse known as a Mole Pig, this small and rotund creature burrows through the earth to jump out and surprise potential prey. The holjo is a solitary creature preferring to hunt on its own in environments where the earth is soft so that it can easily dig. The mountain holjo variant with heavy, steel claws can sometimes be found in mountainous environments.`,
					score: `They gain a +6 bonus to Strength, a +2 bonus to Dexterity, a +4 bonus to Constitution, a -2 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All holjo start with a 20 foot land speed and a 20 foot burrow speed.`,
					class: `Holjo are of the Brute class. `,
					features: [{
							name: "Small Creature",
							desc: `This creature is small sized. `,
							featName: "Small Creature",
						},
						{
							name: "Tremorsense",
							desc: `This creature can automatically pinpoint the location of anything that is in contact with the ground out to 60 feet.`,
							featName: "Tremorsense",
						},
						{
							name: "Claws",
							desc: `You swipe two claws at a target. This is an unarmed melee strike that deals 1d6 slashing damage.`,
							featName: "Claws",
						}
					]
			};
		case "hookma":
			return {
				name: "Hookma",
					desc: `Also known as a Rhino Horse, this territorial beast is known for its fights in the plains where it will aggressively run down any creature it deems a threat. Hookma are found wherever leaves and grass can be found in plenty and preferably in open fields.`,
					score: `They gain a +6 bonus to Strength, a +2 bonus to Dexterity, a +6 bonus to Constitution, a -4 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All hookma start with a 35 foot land speed.`,
					class: `Hookma are of the Brute class. `,
					features: [{
							name: "Large Creature",
							desc: `This creature is large sized. It gains a +2 bonus to Strength and a +2 bonus to Constitution, but suffers a -1 penalty to AC.`,
							featName: "Large Creature",
						},
						{
							name: "Thick Skin",
							desc: `This creature has a hardened skin that is difficult to puncture. This creature gains a +2 bonus to AC.`,
							featName: "Thick Skin",
						},
						{
							name: "Horn Ram",
							desc: `You ram a target with horns. This is an unarmed melee strike that deals 1d6 piercing damage.`,
							featName: "Horn Ram",
						},
						{
							name: "Stomp",
							desc: `You stomp at a creature beneath you. This can only target creatures two sizes below you or if the target is prone. This is an unarmed melee strike that deals 1d12 bludgeoning damage.`,
							featName: "Stomp",
						}
					]
			};
		case "plumhou":
			return {
				name: "Plumhou",
					desc: `Also known as a Glide Monkey, this creature often ventures in large groups of twenty or more. The creature eats mostly nuts, tree sap, and fruit wherever it can. Known to be territorial, the plumhou is known to chuck rocks and hard seeds at those that approach their habitat by gliding over them between trees or other high locations. They are often found in mountains and warm climate forests where they can remain warm.`,
					score: `They gain a +2 bonus to Strength, a +8 bonus to Dexterity, a +2 bonus to Constitution, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All plumhou start with a 20 foot land speed.`,
					class: `Plumhou are of the Prowler class. `,
					features: [{
							name: "Small Creature",
							desc: `This creature is small sized. `,
							featName: "Small Creature",
						},
						{
							name: "Aimed Throw",
							desc: `You have a good throwing arm and can aim for weak points regardless of what you throw. When you throw a weapon, the minimum damage you deal with a weapon is 1d6. You now can add your Dexterity modifer instead of your Strength modifier to damage with thrown weapons.`,
							featName: "Aimed Throw",
						},
						{
							name: "Glide",
							desc: `This creature can glide and stay aloft while in the air. The creature is treated as flying while in the air and moves at its normal speed. Every turn it decends at a rate of 10 feet per round. The creature can never gain altitude while gliding.`,
							featName: "Glide",
						},
						{
							name: "Talons",
							desc: `You dig two talons into a target. This is an unarmed melee strike that deals 1d6 piercing damage.`,
							featName: "Talons",
						}
					]
			};
		case "rackshur":
			return {
				name: "Rackshur",
					desc: `Also known as a Horned Lion, this feline often travels on its own to hunt for prey. The rackshur is most common in mountainous regions but the jungle rackshur variant can be found in dense forested areas where it has plenty of locations it can hide and climb.`,
					score: `They gain a +4 bonus to Strength, a +8 bonus to Dexterity, a +4 bonus to Constitution, a -2 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All rakshur start with a 30 foot land speed and a 20 foot climb speed.`,
					class: `Rackshur are of the Prowler class. `,
					features: [{
							name: "Improved Sight",
							desc: `This creature has improved eyesight. While this creature can see, this creature gains a +4 bonus to Sense Pressence.`,
							featName: "Improved Sight",
						},
						{
							name: "Claws",
							desc: `You swipe two claws at a target. This is an unarmed melee strike that deals 1d6 slashing damage.`,
							featName: "Claws",
						},
						{
							name: "Horn Ram",
							desc: `You ram a target with horns. This is an unarmed melee strike that deals 1d6 piercing damage.`,
							featName: "Horn Ram",
						},
						{
							name: "Hunter's Pounce",
							desc: `You leap at a foe in an attempt to knock them to the ground. Move 10 feet. If you end your movement within melee reach of at least one enemy, you can make a melee Strike against that enemy. If you hit you may then push the target to the ground. Attempt an Athletics check against your target's Strength Saving Throw. On success they are knocked prone.`,
							featName: "Hunter's Pounce",
						}
					]
			};
		case "serpelu":
			return {
				name: "Serpelu",
					desc: `Also known as a Deer Snake, the serpelu is known to enjoys sunbathing with its enormous herds. The serpelu has few threats in its ocean dwellings and as such is often considered peaceful natured. However, angering a serpelu will often see a threat poisoned by this creature's stinger and coiled into a choking grab.`,
					score: `They gain a +6 bonus to Strength, a +4 bonus to Dexterity, a +6 bonus to Constitution, a -2 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All serpelu start with a 10 foot land speed and a 30 foot swim speed.`,
					class: `Serpelu are of the Brute class. `,
					features: [{
							name: "Large Creature",
							desc: `This creature is large sized. It gains a +2 bonus to Strength and a +2 bonus to Constitution, but suffers a -1 penalty to AC.`,
							featName: "Large Creature",
						},
						{
							name: "Constrict",
							desc: `You squeeze a grabbed foe tightly with your body. This is an unarmed melee strike that deals 1d6 bludgeoning damage. If the Strike hits, you grab the target. The creature remains grabbed until the end of your next turn or until it Escapes, whichever comes first.`,
							featName: "Constrict",
						},
						{
							name: "Slam",
							desc: `You swing two limbs, a powerful tail, or your body into a target. This is an unarmed melee strike that deals 1d8 bludgeoning damage.`,
							featName: "Slam",
						},
						{
							name: "Poison Sting",
							desc: `You sting a target with a sharpened stinger. This is an unarmed melee strike that deals 1d4 piercing damage. If the creature has no barrier, it also deals 1d4 poison damage.`,
							featName: "Poison Sting",
						}
					]
			};
		case "stinbian":
			return {
				name: "Stinbian",
					desc: `Also known as a Sting Bat, the stinbian is a hunter of small insects and drinker of sap. It often hunts in caves or forested areas, looking for any prey in the cloak of darkness. It often hunts on its own but always returns to one place to stay amongst its own kind. While it has a poisonous stinger it rarely uses it while hunting but instead is used as a defensive tool to fend off would be attackers.`,
					score: `They gain a +8 bonus to Dexterity, a +2 bonus to Constitution, a -2 penalty to Intelligence, and a -4 penalty to Charisma. A penalty can never reduce a creature's ability score below 1.`,
					speed: `All caranu start with a 20 foot land speed.`,
					class: `Stinbian are of the Prowler class. `,
					features: [{
							name: "Tiny Creature",
							desc: `This creature is tiny sized. It gains a -2 penalty to Strength, a +2 bonus to Dexterity, and a +1 to AC.`,
							featName: "Tiny Creature",
						},
						{
							name: "Echolocation",
							desc: `This creature is unaffected by the blinded condition.`,
							featName: "Echolocation",
						},
						{
							name: "Claws",
							desc: `You swipe two claws at a target. This is an unarmed melee strike that deals 1d6 slashing damage.`,
							featName: "Claws",
						},
						{
							name: "Poison Sting",
							desc: `You sting a target with a sharpened stinger. This is an unarmed melee strike that deals 1d4 piercing damage. If the creature has no barrier, it also deals 1d4 poison damage.`,
							featName: "Poison Sting",
						}
					]
			};
		case "soma":
			return {
				name: "Soma",
					desc: `The soma, derrived from the ancient Shira word for body, are automatons that are developed in Juno as a method to provide spirits a way to interact with the living world without possessing a living being. What began as an experiment with Managem grew into an expansive project involving the nature of chakras, ki, and control over magic itself. The soma are now the first constructed beings able to house a spirit and perform magic as well as any other. `,
					score: `Soma are made to be strong and durable. They gain a +4 bonus to Strength, a +2 bonus to Dexterity, a +6 bonus to Constitution, and a +2 bonus to Intelligence.`,
					speed: `All soma start with a 25 foot land speed.`,
					class: `All Soma are of the Automaton class. `,
					features: [{
							name: "Soma Armor",
							desc: `All soma have a hard plating made from sturdy material to help protect their interior components. The plating is kept light to allow mobility in the soma and to avoid interference with barriers.
	
	When creating a soma, choose a sturdy material. The soma's natural armor bonus is equal to 1 + the armor bonus of the chosen material. When a soma is unarmored they add their natural armor bonus to their AC. This does not block barrier AC from applying to a soma.`,
							featName: "Soma Armor",
						},
						{
							name: "Clumsy",
							desc: `This creature lacks nimbleness to perform precision actions. They suffer a -2 penalty to acrobatics, disable device, and thievery checks.`,
							featName: "Clumsy",
						},
						{
							name: "Slam",
							desc: `You swing two limbs, a powerful tail, or your body into a target. This is an unarmed melee strike that deals 1d8 bludgeoning damage.`,
							featName: "Slam",
						}
					]
			};
	}
	return {
		name: "",
	};
}

function GetBackgroundInfo(background) {
	switch (background.toLowerCase()) {
		case "":
			return {
				name: ""
			};
		case "acolyte":
			return {
				name: "Acolyte",
					desc: `You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine.`,
					gear: `A holy symbol of your religion, vestments, a set of common clothes, and a wallet containing 6,000 CP.`,
					skill: `Become Adept in two skills from Arcana, Insight, Medicne, or Persuasion. 
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `You gain a vocation based on a position within your religion. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `As an acolyte you command the respect of those who share your faith, and you can perform the religious ceremonies of your religion. When performing the Community Service downtime activity with the vocation gained from your lifestyle bonus, you have advantage on your checks.`,
					featName: "Spiritual Guidance"
			};
		case "aristocrat":
			return {
				name: "Aristocrat",
					desc: `You understand wealth, power, and privilege. This background represents a person in a powerful position with a powerful name which may include nobility. You might be a pampered aristocrat unfamiliar with work or discomfort, a former merchant just elevating themselves to fortunes, or a disinherited scoundrel with a disproportionate sense of entitlement.
	
	Work with your DM to come up with an appropriate position of power and determine how much authority that title carries. A title doesn’t stand on its own—it’s connected to an entire family, and whatever title you hold, you will pass it down to your own children. Not only do you need to determine your title, but you should also work with the DM to describe your family and their influence on you.
	
	Due to the nature of adventuring while living in a powerful city, you may be starting with significantly fewer funds than this background may suggest. Work with your DM to determine a reason for your lack of funds.`,
					gear: `A set of fine clothes, a signet ring, and a wallet containing 10,000 CP.`,
					skill: `Become Adept in one skill from Deception, Insight, or Persuasion. 
	Become Adept in two knowledges based on your background.
	Become Expert in one language.`,
					skillPoints: 2,
					knowledgePoints: 7,
					lifestyle: `You may immediately own a residence. The residence must fall within these restrictions:
	Base Value is maximized to 300,000 CP.
	You can only take rooms in the Living Space, Storage Rooms, Building Components, or Room Augmentation categories. Other rooms may be taken at the DM’s discretion.`,
					featDesc: `You have the service of three retainers loyal to your family. These retainers can be attendants or messengers, and one might be a majordomo. Your retainers are commoners who can perform mundane tasks for you, but they do not fight for you and will leave if they are frequently endangered or abused.
	
	You may lose access to a retainer to gain 3,000 Jin per week. This 3,000 Jin may only be spent on travel, clothing, food, and lodging expenses. You may gain an extra 3,000 Jin for each retainer you do not maintain. This Jin is lost at the end of each week.`,
					featName: "Retainers"
			};
		case "artisan":
			return {
				name: "Artisan",
					desc: `You are skilled in a particular field and closely associated with other artisans. You are a well-established part of the mercantile world, freed by talent and wealth. You may have learned your skills as an apprentice to a master artisan, under the sponsorship of a guild, or by your own natural talent.`,
					gear: `A set of artisan’s tools (your choice), A set of fine clothes, and a wallet containing 8,000 CP.`,
					skill: `Become Adept in any three crafting skills.
	Become Adept in two knowledges based on your background.`,
					skillPoints: 6,
					knowledgePoints: 4,
					lifestyle: `There are many types of artisans in existence, from cobblers to chefs. Work with your GM to determine your type of craftsmanship. You may select your craft from the table to the left or roll randomly from the table.
	
	You gain a vocation based on your artistic talents. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `You are well versed in the making of a specific kind of structure or consumable. Choose one item related to your chosen craft from your lifestyle. When making this item you reduce all crafting time by half.`,
					featName: "Practiced Craftsman"
			};
		case "charlatan":
			return {
				name: "Charlatan",
					desc: `You have always had a way with people. You know what makes them tick, you can tease out their hearts’ desires after a few minutes of conversation, and with a few leading questions you can read them like they were children’s books. It’s a useful talent, and one that you’re perfectly willing to use for your advantage.`,
					gear: `A set of fine clothes, a disguise kit, and a wallet containing 6,000 CP.`,
					skill: `Become Adept in two skill from Deception, Disguise, Perception, or Thievery. 
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `You gain a vocation based on your type of deception. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. `,
					featName: "False Identity"
			};
		case "criminal":
			return {
				name: "Criminal",
					desc: `You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld. You’re far closer than most people to the world of murder, theft, and violence that pervades the underbelly of civilization, and you have survived up to this point by flouting the rules and regulations of society.`,
					gear: `A crowbar, a set of dark common clothes including a hood, and a wallet containing 6,000 CP.`,
					skill: `Become Adept in two skill from Deception, Disable Device, Stealth, or Thievery. 
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `There are many kinds of criminals, and within a thieves’ guild or similar criminal organization, individual members have particular specialties. Even criminals who operate outside of such organizations have strong preferences for certain kinds of crimes over others. Choose the role you played in your criminal life, or roll on the table.
	
	You gain a vocation based on your type of criminal activity. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `Having been a criminal for most of your life, you have grown accustomed to many of the complications that can occur while on criminal activity. When using the Crime Downtime activity, you gain one retry when failing a skill check. `,
					featName: "Life of Crime"
			};
		case "entertainer":
			return {
				name: "Entertainer",
					desc: `You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them. Your poetics can stir the hearts of those who hear you, awakening grief or joy, laughter or anger. Your music raises their spirits or captures their sorrow. Your dance steps captivate, your humor cuts to the quick. Whatever techniques you use, your art is your life.`,
					gear: `A musical instrument (one of your choice), the favor of an admirer (love letter, lock of hair, or trinket), a costume, and a wallet containing 6,000 CP.`,
					skill: `Become Adept in two skill from Acrobatics, Athletics, Disguise, or Performance
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `A good entertainer is versatile, spicing up every performance with a variety of different routines. Choose one to three routines or roll on the table below to define your expertise as an entertainer.
	
	You gain a vocation based on your type of entertainment. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble’s court. Your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you.`,
					featName: "By Popular Demand"
			};
		case "mercenary":
			return {
				name: "Mercenary",
					desc: `As a sell-sword who fought battles for coin, you’re well acquainted with risking life and limb for a chance at a share of treasure. Now, you look forward to fighting foes and reaping even greater rewards as an adventurer. Your experience makes you familiar with the ins and outs of mercenary life, and you likely have harrowing stories of events on the battlefield. You might have served with a large outfit such as the Zhentarim or the soldiers of Mint- arn, or a smaller band of sell-swords, maybe even more than one. (See the “Mercenaries of the North” sidebar for a collection of possibilities.)`,
					gear: `A uniform of your company (traveler’s clothes in quality), an insignia of your rank, and a wallet containing 8,000 CP.`,
					skill: `Become Adept in two skill from Athletics, Perception, Persuasion, or Pilot. 
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `You gain a vocation based on your type of mercenary work. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `You are able to identify mercenary companies by their emblems, and you know a little about any such company, such as the names and reputations of its commanders and leaders.
	
	You become Expert in the Mercenary Companies general knowledge.`,
					featName: "Mercenary Life"
			};
		case "merchant":
			return {
				name: "Merchant",
					desc: `You are a member of a guild of traders, caravan masters, or shopkeepers. You don’t craft items yourself but earn a living by buying and selling the works of others (or the raw materials artisans need to practice their craft). Your guild might be a large merchant consortium (or family) with interests across the region. Perhaps you transported goods from one place to another, by ship, wagon, or caravan, or bought them from traveling traders and sold them in your own little shop. In some ways, the traveling merchant’s life lends itself to adventure.`,
					gear: `A set of navigator’s tools and a wheeled cart, A set of fine clothes, and a wallet containing 8,000 CP.`,
					skill: `Become Adept in two skill from Insight, Performance, Persuasion, or Survival.
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `There are many types of merchants in the world, however most specialized in a type of item to sell. Work with your GM to determine your ware specialization. You may select your specialization from the table to the left or roll randomly from the table.
	
	You gain a vocation based on your mercantile specialization. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `Due to business relationships with a variety of different businesspeople, the merchant can draw on these connections to obtain discounts on goods and services and acquire knowledge of local events and personages.`,
					featName: "Networking"
			};
		case "outlander":
			return {
				name: "Outlander",
					desc: `You grew up in the wilds, far from civilization and the comforts of town and technology. You’ve witnessed the migration of herds larger than forests, survived weather more extreme than any city-dweller could comprehend, and enjoyed the solitude of being the only thinking creature for miles in any direction. The wilds are in your blood, whether you were a nomad, an explorer, a recluse, a hunter-gatherer, or even a marauder. Even in places where you don’t know the specific features of the terrain, you know the ways of the wild.`,
					gear: `A hunting trap, a trophy from an animal you killed, a set of traveler’s clothes, and a wallet containing 5,000 CP.`,
					skill: `Become Adept in two skill from Athletics, Gathering, Nature, or Survival.
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `You’ve been to strange places and seen things that others cannot begin to fathom. Consider some of the distant lands you have visited, and how they impacted you. You can roll on the following table to determine your occupation during your time in the wild, or choose one that best fits your character.
	
	You gain a vocation based on your origin. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. `,
					featName: "Wanderer"
			};
		case "sailor":
			return {
				name: "Sailor",
					desc: `You sailed on a seagoing vessel for years. In that time, you faced down mighty storms, monsters of the deep, and those who wanted to sink your craft to the bottomless depths. Your first love is the distant line of the horizon, but the time has come to try your hand at something new.`,
					gear: `50 feet of silk rope, a set of common clothes, and a wallet containing 6,000 CP.`,
					skill: `Become Adept in two skill from Athletics, Nature, Perception, or Pilot. 
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `You gain a vocation based on your type of sailing work. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions. You might sail on the ship you served on, or another ship you have good relations with (perhaps one captained by a former crewmate). Because you’re calling in a favor, you can’t be certain of a schedule or route that will meet your every need. Your Dungeon Master will determine how long it takes to get where you need to go. In return for your free passage, you and your companions are expected to assist the crew during the voyage.`,
					featName: "Ship’s Passage"
			};
		case "scholar":
			return {
				name: "Scholar",
					desc: `You have a knack for learning, and sequestered yourself from the outside world to learn all you could. You read about so many wondrous places and things in your books, and always dreamed about one day seeing the real things. Eventually, that curiosity led you to leave your studies and become an adventurer.`,
					gear: `A bottle of black ink, a quill, a small knife, a set of common clothes, and a wallet containing 5,000 CP.`,
					skill: `Become Adept in one skill from Arcana, Health, or Nature.
	Become Adept in five knowledges.
	Become Expert in one language.`,
					skillPoints: 2,
					knowledgePoints: 13,
					lifestyle: `Most scholars are placed in a position where they may have learned their scholarly pursuits. Work with your GM to determine your source. You may select your source from the table to the left or roll randomly from the table.
	
	You gain a vocation based on your source. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `Due to years of researching various subjects, you've learned ways to accelerate your study. Whenever performing the Research downtime activity, you always gain one additional skill increase.`,
					featName: "Fast Research"
			};
		case "soldier":
			return {
				name: "Soldier",
					desc: `Guarding has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, learned basic survival techniques, including how to stay alive on the battlefield. You might have been part of a standing national army or perhaps a member of a local militia who rose to prominence during a recent war.`,
					gear: `An insignia of rank, a set of bone dice or deck of cards, a set of common clothes, and a wallet containing 5,000 CP.`,
					skill: `Become Adept in two skill from Athletics, Insight, Intimidation, or Pilot. 
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `During your time as a soldier, you had a specific role to play in your unit or army. Roll a d8 or choose from the options in the table to determine your role.
	
	You gain a vocation based on your rank. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `You have an officer rank from your career as a guard. Guards loyal to your former organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other guards and requisition simple equipment for temporary use. You can also usually gain access to friendly guard encampments and fortresses where your rank is recognized.`,
					featName: "Officer Rank"
			};
		case "urchin":
			return {
				name: "Urchin",
					desc: `You grew up on the streets alone, orphaned, and poor. You had no one to watch over you or to provide for you, so you learned to provide for yourself. You fought fiercely over food and kept a constant watch out for other desperate souls who might steal from you. You slept on rooftops and in alleyways, exposed to the elements, and endured sickness without the advantage of medicine or a place to recuperate. You’ve survived despite all odds, and did so through cunning, strength, speed, or some combination of each.`,
					gear: `A map of the city you grew up in, a token to remember your parents by, a set of common clothes, and a wallet containing 4,000 CP.`,
					skill: `Become Adept in two skill from Athletics, Gathering, Stealth, or Thievery. 
	Become Adept in two knowledges based on your background.`,
					skillPoints: 4,
					knowledgePoints: 4,
					lifestyle: `Having grown up in a life of poverty you are well suited to roughing it outside. You gain no morale penalty when not sleeping in propper lodgings and having no home as a lifestyle.
	
	In addition, you gain a vocation based on your history of living the streets. The vocation's core skill must be the skill you chose from this background.`,
					featDesc: `You know the secret patterns and flow to cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.`,
					featName: "City Secrets"
			};
	}
	return {
		name: "",
	};
}
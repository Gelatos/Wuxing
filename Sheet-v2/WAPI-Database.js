// ====== Section Ids

function GetSectionIdName(sectionName, currentID, variableName) {

    if (variableName.startsWith("attr")) {
        variableName = variableName.substr(4);
    }
    if (!variableName.startsWith("_")) {
        variableName = "_" + variableName;
    }
    if (!sectionName.endsWith("_")) {
        sectionName += "_";
    }
    return sectionName + currentID + variableName;
}

// ====== Language

function GetLanguageName(language) {

    switch (language.toLowerCase()) {
        case "minere":
        case "min":
        case "m":
            return "Minere";
        case "apollen":
        case "apo":
        case "apol":
        case "a":
            return "Apollen";
        case "junal":
        case "jun":
        case "j":
            return "Junal";
        case "cert":
        case "cer":
        case "c":
            return "Cert";
        case "lib":
        case "l":
            return "Lib";
        case "jovean":
        case "novan":
            return "Jovean";

        case "byric":
            return "Byric";
        case "ciel":
            return "Ciel";
        case "citeq":
            return "Citeq";
        case "crinere":
            return "Crinere";
        case "dustell":
            return "Dustell";
        case "kleikan":
            return "Kleikan";
        case "manstan":
            return "Manstan";
        case "muralic":
            return "Muralic";
        case "mytikan":
            return "Mytikan";
        case "palmic":
            return "Palmic";
        case "salkan":
            return "Salkan";
        case "sansic":
            return "Sansic";
        case "shira":
            return "Shira";
        case "shorespeak":
            return "Shorespeak";
        case "silq":
            return "Silq";
        case "spirit":
            return "Spirit";
        case "verdeni":
            return "Verdeni";
        case "vulca":
            return "Vulca";
        case "wolfwarg":
            return "Wolfwarg";
        case "beast":
            return "Beast";
        case "emotion":
            return "Emotion";
        case "empathy":
            return "Empathy";

        default:
            return "";
    }
}

function GetLanguageTag(language) {

    if (language == undefined) {
        return "{{language-default=1}}";
    }

    switch (language.toLowerCase()) {
        case "minere":
            return "{{language-coastal=1}}";
        case "apollen":
            return "{{language-mountain=1}}";
        case "junal":
            return "{{language-desert=1}}";
        case "cert":
            return "{{language-plains=1}}";
        case "lib":
            return "{{language-rare=1}}";


        case "palmic":
        case "shorespeak":
        case "verdeni":
            return "{{language-coastal=1}}{{language-regional=1}}";
        case "crinere":
        case "vulca":
            return "{{language-coastal=1}}{{language-ancient=1}}";

        case "kleikan":
            return "{{language-mountain=1}}{{language-regional=1}}";

        case "byric":
        case "dustell":
        case "muralic":
            return "{{language-desert=1}}{{language-regional=1}}";
        case "shira":
            return "{{language-desert=1}}{{language-ancient=1}}";

        case "ciel":
        case "citeq":
        case "manstan":
        case "salkan":
        case "sansic":
        case "silq":
            return "{{language-plains=1}}{{language-regional=1}}";

        case "jovean":
            return "{{language-rare=1}}{{language-regional=1}}";
        case "mytikan":
            return "{{language-rare=1}}{{language-ancient=1}}";

        case "wolfwarg":
        case "beast":
        case "empathy":
        case "emotion":
        case "spirit":
            return "{{language-special=1}}";

        default:
            return "{{language-default=1}}";
    }
}

function GetTraitInfo(trait) {
    switch (trait.toLowerCase()) {
        case "":
            return {
                name: ""
            };
        case "aspected":
            return {
                name: "Aspected",
                    desc: `This feature becomes aspected to the caster's elemental affinity or no affinity at all. If the caster has multiple affinities, you may choose one when casting. If the effect deals damage, the damage type changes based on the element chosen. Wood becomes acid, fire becomes burn, earth becomes force, metal becomes lightning, water becomes cold, and nothing become rending.`
            };
        case "attack":
            return {
                name: "Attack",
                    desc: `An ability with this trait involves an attack. For each attack you make beyond the first on your turn, you take a multiple attack penalty.`
            };
        case "auditory":
            return {
                name: "Auditory",
                    desc: `Auditory actions and effects rely on sound. An action with the auditory trait can be successfully performed only if the creature using the action can speak or otherwise produce the required sounds. An effect with the auditory trait has its effect only if the target can hear it. This applies only to sound-based parts of the effect, as determined by the GM. This is different from a sonic effect, which still affects targets who can't hear it (such as deaf targets) as long as the effect itself makes sound.`
            };
        case "augment":
            return {
                name: "Augment",
                    desc: `This effect modifies another action. One action can only be modified by one augment effect. If a creature has multiple augments active upon them, they must choose which augment affects their action they wish to augment. Once an augment is used on an action the augment is expended.`
            };
        case "concentrate":
            return {
                name: "Concentrate",
                    desc: `An action with this trait requires a degree of mental concentration and discipline.`
            };
        case "daily":
            return {
                name: "Daily",
                    desc: `This feature has a limited number of uses. All of its uses recover once you complete a long rest.`
            };
        case "dust":
            return {
                name: "Dust",
                    desc: `This feature targets an object with the intention of breaking down its material components into dust. If the object has multiple component materials, you can only affect the components that match the material you are dusting. When attempting to dust an object you typically can only target materials in your effective area on the surface and up to 1 inch deep unless otherwise noted. When attacking an object you target the object's AC or the wearer's AC, whichever is higher. `
            };
        case "emotion":
            return {
                name: "Emotion",
                    desc: `This effect alters a creature's emotions. Effects with this trait always have the mental trait as well. Creatures with special training or that have mechanical or artificial intelligence are immune to emotion effects.`
            };
        case "encounter":
            return {
                name: "Encounter",
                    desc: `This feature has a limited number of uses. All of its uses recover once you complete a brief rest.`
            };
        case "extrasensory":
            return {
                name: "Extrasensory",
                    desc: `This feature requires attunement to the Ethereal plane in order to be properly utilized. `
            };
        case "favor":
            return {
                name: "Favor",
                    desc: `This feature requires a favor point to be generated and expended to be used.`
            };
        case "fear":
            return {
                name: "Fear",
                    desc: `Fear effects evoke the emotion of fear. Effects with this trait always have the mental and emotion traits as well.`
            };
        case "flourish":
            return {
                name: "Flourish",
                    desc: `Actions with this trait are special techniques that require too much exertion for you to perform frequently. You can use only 1 action with the flourish trait per turn.`
            };
        case "focus":
            return {
                name: "Focus",
                    desc: `Actions with this trait are special techniques that require too much exertion for you to perform frequently. You can use only 1 action with the focus trait per turn. Effects with this trait always have the concentrate trait as well.`
            };
        case "fortune":
            return {
                name: "Fortune",
                    desc: `A fortune effect beneficially alters how you roll your dice. You can never have more than one fortune effect alter a single roll. If multiple fortune effects would apply, you have to pick which to use. If a fortune effect and a misfortune effect would apply to the same roll, the two cancel each other out, and you roll normally.`
            };
        case "ignite":
            return {
                name: "Ignite",
                    desc: `This effect causes flammable material to catch fire. If a creature ends their turn while in fire they take 1d6 burn damage.`
            };
        case "knowledge":
            return {
                name: "Knowledge",
                    desc: `This action allows you to attempt a knowledge skill check to try to remember a bit of knowledge regarding a topic related to that skill. The GM determines the DCs for such checks and which skills apply.`
            };
        case "limited":
            return {
                name: "Limited",
                    desc: `This feature has a limited number of uses. All of its uses recover once you complete a short rest.`
            };
        case "linguistic":
            return {
                name: "Linguistic",
                    desc: `An effect with this trait depends on language comprehension. A linguistic effect that targets a creature works only if the target understands the language you are using.`
            };
        case "loud":
            return {
                name: "Loud",
                    desc: `The action creates a loud booming noise, audible to those within 300 feet of the source.`
            };
        case "maneuver":
            return {
                name: "Maneuver",
                    desc: `In order to use this action you must expend a superiority die. If you have no superiority dice remaining then this action has no effect.`
            };
        case "manifest":
            return {
                name: "Manifest",
                    desc: `This action allows a spirit to manifest into the material plane. The spirit must choose a target that doesn't already have a spirit within it. A creature or object a spirit is manifesting into is referred to as a host. During the manifestation time, a spirit must remain in the same location as their host's position from the spirit plane. Once a spirit has manifested into the material plane they leave the spirit plane and move with the target of their manifestation. Maintaining a manifestation takes as much effort from them as their host. As such, a spirit's ability to rest is shared with their host.`
            };
        case "manipulate":
            return {
                name: "Manipulate",
                    desc: `You must physically manipulate an item or make gestures to use an action with this trait. Creatures without a suitable appendage can’t perform actions with this trait. Manipulate actions often trigger reactions.`
            };
        case "mental":
            return {
                name: "Mental",
                    desc: `A mental effect can alter the target's mind. It has no effect on an object or a mindless creature.`
            };
        case "metamagic":
            return {
                name: "Metamagic",
                    desc: `Metamagic actions usually require that you use metamagic charges in order to use them. Metamagic charges can be created when using a metamagic action by spending 100 Ki per charge. You must use a metamagic action directly before Casting the Spell you want to alter. If you use any action (including free actions and reactions) other than Cast a Spell directly after, you waste the benefits of the metamagic action. `
            };
        case "misfortune":
            return {
                name: "Misfortune",
                    desc: `A misfortune effect detrimentally alters how you roll your dice. You can never have more than one misfortune effect alter a single roll. If multiple misfortune effects would apply, the GM decides which is worse and applies it. If a fortune effect and a misfortune effect would apply to the same roll, the two cancel each other out, and you roll normally.`
            };
        case "move":
            return {
                name: "Move",
                    desc: `An action with this trait involves moving from one space to another.`
            };
        case "onset":
            return {
                name: "Onset",
                    desc: `This feature is always a part of an area effect. When a creature enters the effect's area for the first time on a turn or starts its turn there the creature must make a save as determined by the effect. This feature cannot be activated multiple times on the same creature per round.`
            };
        case "open":
            return {
                name: "Open",
                    desc: `These actions work only as the first salvo in the attacks you make on your turn. You can use an action with the open trait only if you haven't used an action with the attack or open trait yet this turn.`
            };
        case "press":
            return {
                name: "Press",
                    desc: `Actions with this trait allow you to follow up earlier attacks. An action with the press trait can be used only if you are currently affected by a multiple attack penalty. You can't use a press action when it's not your turn, even if you use the Ready activity.`
            };
        case "renitence":
            return {
                name: "Renitence",
                    desc: `Actions with this trait typically cause some kind of debilitating effect that becomes ineffective if used frequently. Creatures cannot be targetted by this action for 1 minute after they have been targetted by this action.`
            };
        case "round":
            return {
                name: "Round",
                    desc: `This action can only be performed once per round. The action recovers at the start of your turn.`
            };
        case "secret":
            return {
                name: "Secret",
                    desc: `The GM rolls the check for this ability in secret.`
            };
        case "stance":
            return {
                name: "Stance",
                    desc: `A stance is a general combat strategy that you enter by using an action with the stance trait, and you remain in for some time. A stance lasts until you get knocked unconscious, until its requirements (if any) are violated, until the encounter ends, or until you enter a new stance, whichever comes first. After you take an action with the stance trait, you can't take another one for 1 round.`
            };
        case "visual":
            return {
                name: "Visual",
                    desc: `A visual effect can affect only creatures that can see it. This applies only to visible parts of the effect, as determined by the GM.`
            };
        case "vortex":
            return {
                name: "Vortex",
                    desc: `This feature is always a part of an area effect. The effect will always attempt to restrain those within its area. If it successfully restrains a creature, at the start of the creature's turn the vortex will act on the creature as determined by the effect. A restrained creature may use the Break Free or Escape Artist action against the effect's DC to escape the vortex. Many vortexes have additional effects that may trigger on a creature's escape.`
            };
        case "archetype":
            return {
                name: "Archetype",
                    desc: `This feat is usually tied to an archetype or a class. These feats will sometimes require an archetype to be of a certain level instead of a class. A feat with this trait can be selected when a class grants an archetype feat. `
            };
        case "ascension":
            return {
                name: "Ascension",
                    desc: `This feat helps develop capabilities of Espers. These feats can be selected when a class grants an ascension feat.`
            };
        case "combat":
            return {
                name: "Combat",
                    desc: `A feat with the combat trait improves your battle prowess or gives you new actions for a skill. A feat with this trait can be selected when a class grants a combat feat or general feat. `
            };
        case "dedication":
            return {
                name: "Dedication",
                    desc: `A dedication feat is often the first feat required for a variety of feats. They represent focus into a type of fighting style, technique, magic, or something else. `
            };
        case "forma":
            return {
                name: "Forma",
                    desc: `A forma feat allow Espers and Eidolons to manifest their forma. These feats are typically granted when an Esper or Eidolon are created.`
            };
        case "general":
            return {
                name: "General",
                    desc: `A type of feat that any character can select, regardless of ancestry and class, as long as they meet the prerequisites. You can select a feat with this trait when your class grants a general feat.`
            };
        case "skill":
            return {
                name: "Skill",
                    desc: `A feat with the skill trait improves your skills and their actions or gives you new actions for a skill. A feat with this trait can be selected when a class grants a skill feat or general feat. `
            };
        case "spell":
            return {
                name: "Spell",
                    desc: `A feat with the spell trait focuses on increasing your mastery over spellcasting. A feat with this trait can be selected when a class grants a spell feat or general feat. `
            };
        case "spirit":
            return {
                name: "Spirit",
                    desc: `This feat helps spirits develop their abilities. These feats can be selected when a class grants a spirit feat.`
            };
        case "boundary":
            return {
                name: "Boundary",
                    desc: `This spell causes a wall to manifest at a point within range. The spell will always state the dimensions of the panels. When making the wall, each panel must be contiguous with at least one other panel. The wall can have any shape you desire. The wall doesn’t need to be vertical or rest on any firm foundation. However, it must be supported by existing solid material.`
            };
        case "cloak":
            return {
                name: "Cloak",
                    desc: `This spell cloaks the creature with magic in some way. While under the effects of a cloak spell, a creature can only take actions that have the move trait or are specializations of the Insight or Perception skill. Taking any other action, or being damaged, will end the effects of the cloak spell.`
            };
        case "cloud":
            return {
                name: "Cloud",
                    desc: `This spell creates a cloud made of solidified ether particles. The cloud spreads around corners, and its area is considered heavily obscured. It lasts for the duration of the spell or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.`
            };
        case "environmental":
            return {
                name: "Environmental",
                    desc: `This spell alters the environment in some way by creating temporary ethereal matter. Any environmental changes this spell creates maintains form for the duration of the spell or until the caster dismisses it as a free action.`
            };
        case "evocation":
            return {
                name: "Evocation",
                    desc: `This spell creates an instantaneous effect from ether that immediately disipates once the spell completes.`
            };
        case "illusion":
            return {
                name: "Illusion",
                    desc: `This spell creates an illusion to hide what is truly there. Actively examining the illusion with an Investigation (Analyze) check grants a creature a Wisdom saving throw against the caster's spellcasting DC. But on spellcaster's success, it concludes that the illusion is the genuine article.`
            };
        case "platform":
            return {
                name: "Platform",
                    desc: `This spell creates a platform that raises out from a solid surface within range. The spell will always state the dimensions of the platform. If the platform deals damage to creatures the platform can always be slowed to instead deal no damage. If a platform is prevented from reaching its full height because of a ceiling or other obstacle, any creature on the platform takes 3d6 bludgeoning damage and is restrained, pinched between the platform and the obstacle. The creature can use the Break Free or Escape Artist action against the spellcaster's spellcasting DC. `
            };
        case "ravage":
            return {
                name: "Ravage",
                    desc: `This spell deals damage to targets affected by the spell, either by being in the area or being targetted by the caster. When saving against a spell of this type, a target takes the listed damage when the spell is successful. On critical success, all damage dice of the spell is doubled. On failure all damage is halved and on critical failure the target takes no damage.`
            };
        case "structure":
            return {
                name: "Structure",
                    desc: `This spell manipulates ether to form it into a solid material. The material maintains form for the duration of the spell or until the caster dismisses it as a free action. If, on creation, the material cuts through a creature’s space when it appears, the creature is pushed to one side of the material (your choice). If a creature would be surrounded on all sides by the structure (or the structure and another solid surface), that creature can make a Dexterity saving throw against the caster's spellcasting DC. On a success, it can use its reaction to move up to its speed so that it is no longer enclosed by the structure.`
            };
        case "sustain":
            return {
                name: "Sustain",
                    desc: `This spell requires focus to maintain. You can always freely have a single sustain spell active, however maintaining more than one requires you to sustain each spell after the first. When a sustain spell is forced to end, all effects it has created immediately end.`
            };
        case "temporal":
            return {
                name: "Temporal",
                    desc: `This spell affects time in a local area and grants actions to the caster. Whenever a spell with this trait is used, those who are trained in the Time branch and are within 2 miles of the source become aware that time magic was used. Those within 500 feet of the caster also gain all of the effects of the spell that was cast. Regardless of the spell's effects, all other creatures and objects are invulnerable to your attacks, and you can't target or affect them with anything.`
            };
        case "arcane":
            return {
                name: "Arcane",
                    desc: `This feature is tied to magic and requires a source of mana in order to be properly utilized. To use the feature does not necessarily mean they need to have a resource to create mana but rather the user must be able to manipulate mana at all.`
            };
        case "cerebrate":
            return {
                name: "Cerebrate",
                    desc: `This is an arcane trait that is unique amongst cerebrate casters. To use this feature, the user must be a cerebrate caster.`
            };
        case "ethereal":
            return {
                name: "Ethereal",
                    desc: `This is an arcane trait that is unique amongst ethereal casters. To use this feature, the user must be an ethereal caster.`
            };
        case "kinetic":
            return {
                name: "Kinetic",
                    desc: `This is an arcane trait that is unique amongst kinetic casters. To use this feature, the user must be a kinetic caster.`
            };
        case "martial":
            return {
                name: "Martial",
                    desc: `This feature is tied to martial techniques learned through continuous training. `
            };
        case "spirit":
            return {
                name: "Spirit",
                    desc: `This feature is unique to spirits and those that can take a spirit within them.`
            };
    }
    return {
        name: "",
    };
}
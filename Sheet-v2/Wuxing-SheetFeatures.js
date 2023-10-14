function GetCasterPointsByLevel(style, level) {
    let growth = GetCasterPointGrowthData(style);
    let levelBonus = 0;
    if (growth.level > 0) {
        levelBonus = Math.floor(level * growth.level);
        if (levelBonus < 1) {
            levelBonus = 1;
        }
    }
    return growth.base + levelBonus;
}

function GetCasterPointGrowthData(growthValue) {

    var growths = {
        base: 0,
        level: 0
    };
    switch (growthValue) {
        case "1":
            growths.base = 2;
            break;
        case "2":
            growths.base = 1;
            growths.level = 0.25;
            break;
        case "3":
            growths.base = 2;
            growths.level = 0.25;
            break;
        case "4":
            growths.base = 2;
            growths.level = 0.34;
            break;
        case "5":
            growths.base = 3;
            growths.level = 0.5;
            break;
        case "6":
            growths.base = 3;
            growths.level = 0.67;
            break;
        case "7":
            growths.base = 3;
            growths.level = 1;
            break;
    }

    return growths;
}

function GetSpiritPointsByLevel(style, classType, level) {
    let growth = GetSpiritPointGrowthData(style, classType);
    let levelBonus = 0;
    if (level == 1 && classType == "Spirit") {
        return growth.initial
    } else {
        if (growth.level > 0) {
            levelBonus = Math.floor(level * growth.level);
            if (levelBonus < 1) {
                levelBonus = 1;
            }
        }
        return growth.base + levelBonus;
    }
}

function GetSpiritPointGrowthData(growthValue, classType) {

    var growths = {
        initial: 20,
        base: 0,
        level: 0
    };

    switch (growthValue) {
        case "1":
            growths.base = 2;
            break;
        case "2":
            growths.base = 3;
            break;
        case "3":
            growths.base = 5;
            break;
        case "4":
            growths.base = 2;
            growths.level = 1;
            break;
        case "5":
            growths.base = 4;
            growths.level = 1;
            break;
        case "6":
            growths.base = 2;
            growths.level = 2;
            break;
        case "7":
            growths.base = 4;
            growths.level = 2;
            break;
    }

    return growths;
}

function GetHealthByLevel(style, classType) {
    return GetHealthGrowthData(style, classType);
}

function GetHealthGrowthData(growthValue, classType) {

    if (classType == "Class" || classType == "Beast" || classType == "Archetype") {
        switch (growthValue) {
            case "0":
                return 1;
            case "1":
                return 1.5;
            case "2":
                return 2;
            case "3":
                return 3;
            case "4":
                return 4;
            case "5":
                return 4.5;
            case "6":
                return 5;
            case "7":
                return 7;
        }
    }
    return 0;
}

function GetBarrierByLevel(style) {

    let growth = GetBarrierGrowthData(style);
    return growth;
}

function GetBarrierGrowthData(growthValue) {

    switch (growthValue) {
        case "0":
            return 0;
        case "1":
            return 1;
        case "2":
            return 1.5;
        case "3":
            return 2.5;
        case "4":
            return 3.5;
        case "5":
            return 4.5;
        case "6":
            return 5.5;
        case "7":
            return 7;
    }
    return 0;
}

function GetProficiencyRankTitle(rank) {
    switch (rank) {
        case 0:
            return "Untrained";
        case 1:
            return "Trained";
        case 2:
            return "Adept";
        case 3:
            return "Expert";
        case 4:
            return "Elite";
        case 5:
            return "Master";
        case 6:
            return "Legendary";
    }
    return "Trained";
}

function GetLevelHence(number) {
    switch (number) {
        case 1:
            return "1st";
        case 2:
            return "2nd";
        case 3:
            return "3rd";
    }
    return number + "th";
}

function GetSavingThrowProficiencyGrowth(growthValue) {

    var profGrowth = [21];

    switch (growthValue) {
        case "major":
            profGrowth[1] = 2;
            profGrowth[5] = 3;
            profGrowth[10] = 4;
            profGrowth[15] = 5;
            break;
        case "minor":
            profGrowth[1] = 1;
            profGrowth[5] = 2;
            profGrowth[10] = 3;
            profGrowth[15] = 4;
            break;
    }

    return profGrowth;
}

function GetSkillsProficiencyGrowth(growthValue) {

    let profGrowth = {
        init: {
            startingCount: 0,
            startRank: 1,
            startingSkills: "",
            additionalSkills: 0,
            bonusKnowledge: 0,
            specializationCount: 0
        },
        growthRate: {
            startLevel: 0,
            iteration: 0,
            ranks: [0]
        },
        increase: []
    };

    if (growthValue != undefined) {

        // get growth style and starting skills
        let growthStyle = growthValue;
        if (growthStyle.indexOf("$") >= 0) {
            let stSplit = growthValue.split("$");
            growthStyle = ("" + stSplit[0]).trim();
            profGrowth.init.startingSkills = ("" + stSplit[1]).trim();
        }

        switch (growthStyle) {
            case "0":
                profGrowth.growthRate.ranks[1] = 1;
                break;
            case "1":
                profGrowth.init.startingCount = 2;
                profGrowth.init.specializationCount = 2;
                profGrowth.growthRate.startLevel = 2;
                profGrowth.growthRate.iteration = 4;
                profGrowth.growthRate.ranks[1] = 1;
                profGrowth.growthRate.ranks[7] = 2;
                profGrowth.growthRate.ranks[11] = 3;
                break;
            case "2":
                profGrowth.init.startingCount = 2;
                profGrowth.init.bonusKnowledge = 2;
                profGrowth.init.specializationCount = 2;
                profGrowth.growthRate.startLevel = 2;
                profGrowth.growthRate.iteration = 3;
                profGrowth.growthRate.ranks[1] = 1;
                profGrowth.growthRate.ranks[7] = 2;
                profGrowth.growthRate.ranks[11] = 3;
                break;
            case "3":
                profGrowth.init.startingCount = 2;
                profGrowth.init.additionalSkills = 2;
                profGrowth.init.bonusKnowledge = 2;
                profGrowth.init.specializationCount = 2;
                profGrowth.growthRate.startLevel = 2;
                profGrowth.growthRate.iteration = 4;
                profGrowth.growthRate.ranks[1] = 1;
                profGrowth.growthRate.ranks[7] = 2;
                profGrowth.growthRate.ranks[11] = 3;
                profGrowth.growthRate.ranks[15] = 4;
                break;
            case "4":
                profGrowth.init.startingCount = 3;
                profGrowth.init.additionalSkills = 2;
                profGrowth.init.bonusKnowledge = 2;
                profGrowth.init.specializationCount = 3;
                profGrowth.growthRate.startLevel = 2;
                profGrowth.growthRate.iteration = 3;
                profGrowth.growthRate.ranks[1] = 1;
                profGrowth.growthRate.ranks[7] = 2;
                profGrowth.growthRate.ranks[11] = 3;
                profGrowth.growthRate.ranks[15] = 4;
                break;
            case "5":
                profGrowth.init.startingCount = 3;
                profGrowth.init.startRank = 2;
                profGrowth.init.additionalSkills = 2;
                profGrowth.init.bonusKnowledge = 3;
                profGrowth.init.specializationCount = 3;
                profGrowth.growthRate.startLevel = 2;
                profGrowth.growthRate.iteration = 3;
                profGrowth.growthRate.ranks[1] = 1;
                profGrowth.growthRate.ranks[6] = 2;
                profGrowth.growthRate.ranks[10] = 3;
                profGrowth.growthRate.ranks[14] = 4;
                break;
            case "6":
                profGrowth.init.startingCount = 3;
                profGrowth.init.startRank = 2;
                profGrowth.init.additionalSkills = 3;
                profGrowth.init.bonusKnowledge = 3;
                profGrowth.init.specializationCount = 4;
                profGrowth.growthRate.startLevel = 2;
                profGrowth.growthRate.iteration = 2;
                profGrowth.growthRate.ranks[1] = 2;
                profGrowth.growthRate.ranks[8] = 3;
                profGrowth.growthRate.ranks[14] = 4;
                profGrowth.growthRate.ranks[18] = 5;
                break;
            case "7":
                profGrowth.init.startingCount = 4;
                profGrowth.init.startRank = 2;
                profGrowth.init.additionalSkills = 3;
                profGrowth.init.bonusKnowledge = 3;
                profGrowth.init.specializationCount = 4;
                profGrowth.growthRate.startLevel = 2;
                profGrowth.growthRate.iteration = 2;
                profGrowth.growthRate.ranks[1] = 2;
                profGrowth.growthRate.ranks[6] = 3;
                profGrowth.growthRate.ranks[11] = 4;
                profGrowth.growthRate.ranks[16] = 5;
                break;
        }

        // set the increase rate
        if (profGrowth.growthRate.startLevel > 0) {
            let rank = profGrowth.growthRate.ranks[1];
            let iterator = 0;
            for (let i = profGrowth.growthRate.startLevel; i <= 20; i++) {
                iterator--;
                if (profGrowth.growthRate.ranks[i] != undefined) {
                    rank = profGrowth.growthRate.ranks[i];
                }
                if (iterator <= 0) {
                    profGrowth.increase[i] = rank;
                    iterator = profGrowth.growthRate.iteration;
                }
            }
        }
    }
    return profGrowth;
}

function GetWeaponProficiencyGrowth(growthValue, classType) {

    let profGrowth = {
        init: {
            startRank: 0,
            startingWeaponGroups: "",
            startingWeaponPoints: 0,
        },
        growthRate: {
            startLevel: 0,
            iteration: 0,
            ranks: [0]
        },
        increase: []
    };

    if (growthValue != undefined) {
        var growthStyle = growthValue;

        switch (classType) {
            case "Beast":
                if (growthStyle != "0") {
                    profGrowth.init.startingWeaponGroups = "brawling weapon group";
                    profGrowth.init.startingWeaponPoints = 1;
                }
                switch (growthStyle) {
                    case "0":
                        profGrowth.growthRate.ranks[1] = 1;
                        break;
                    case "1":
                        profGrowth.init.startRank = 1;
                        profGrowth.growthRate.startLevel = 10;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[10] = 2;
                        profGrowth.growthRate.ranks[15] = 3;
                        break;
                    case "2":
                        profGrowth.init.startRank = 1;
                        profGrowth.growthRate.startLevel = 7;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[7] = 2;
                        profGrowth.growthRate.ranks[12] = 3;
                        break;
                    case "3":
                        profGrowth.init.startRank = 1;
                        profGrowth.growthRate.startLevel = 6;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[6] = 2;
                        profGrowth.growthRate.ranks[11] = 3;
                        break;
                    case "4":
                        profGrowth.init.startRank = 1;
                        profGrowth.growthRate.startLevel = 6;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[6] = 2;
                        profGrowth.growthRate.ranks[11] = 3;
                        profGrowth.growthRate.ranks[16] = 4;
                        break;
                    case "5":
                        profGrowth.init.startRank = 2;
                        profGrowth.growthRate.startLevel = 8;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[8] = 3;
                        profGrowth.growthRate.ranks[13] = 4;
                        break;
                    case "6":
                        profGrowth.init.startRank = 2;
                        profGrowth.growthRate.startLevel = 6;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[6] = 3;
                        profGrowth.growthRate.ranks[11] = 4;
                        profGrowth.growthRate.ranks[16] = 5;
                        break;
                    case "7":
                        profGrowth.init.startRank = 2;
                        profGrowth.growthRate.startLevel = 6;
                        profGrowth.growthRate.iteration = 4;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[6] = 3;
                        profGrowth.growthRate.ranks[10] = 4;
                        profGrowth.growthRate.ranks[14] = 5;
                        break;
                }

                break;
            default:
                switch (growthStyle) {
                    case "0":
                        profGrowth.growthRate.ranks[1] = 1;
                        break;
                    case "1":
                        profGrowth.init.startRank = 1;
                        profGrowth.init.startingWeaponGroups = "any single weapon group";
                        profGrowth.init.startingWeaponPoints = 1;
                        profGrowth.growthRate.startLevel = 5;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[10] = 2;
                        profGrowth.growthRate.ranks[15] = 3;
                        break;
                    case "2":
                        profGrowth.init.startRank = 1;
                        profGrowth.init.startingWeaponGroups = "any two weapon groups";
                        profGrowth.init.startingWeaponPoints = 2;
                        profGrowth.growthRate.startLevel = 5;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[10] = 2;
                        profGrowth.growthRate.ranks[15] = 3;
                        break;
                    case "3":
                        profGrowth.init.startRank = 1;
                        profGrowth.init.startingWeaponGroups = "any three weapon groups";
                        profGrowth.init.startingWeaponPoints = 3;
                        profGrowth.growthRate.startLevel = 5;
                        profGrowth.growthRate.iteration = 4;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[9] = 2;
                        profGrowth.growthRate.ranks[13] = 3;
                        break;
                    case "4":
                        profGrowth.init.startRank = 1;
                        profGrowth.init.startingWeaponGroups = "any four weapon groups";
                        profGrowth.init.startingWeaponPoints = 4;
                        profGrowth.growthRate.startLevel = 3;
                        profGrowth.growthRate.iteration = 4;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[7] = 2;
                        profGrowth.growthRate.ranks[11] = 3;
                        profGrowth.growthRate.ranks[15] = 4;
                        break;
                    case "5":
                        profGrowth.init.startRank = 2;
                        profGrowth.init.startingWeaponGroups = "any four weapon groups";
                        profGrowth.init.startingWeaponPoints = 4;
                        profGrowth.growthRate.startLevel = 1;
                        profGrowth.growthRate.iteration = 3;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[4] = 2;
                        profGrowth.growthRate.ranks[10] = 3;
                        profGrowth.growthRate.ranks[13] = 4;
                        break;
                    case "6":
                        profGrowth.init.startRank = 2;
                        profGrowth.init.startingWeaponGroups = "any six weapon groups";
                        profGrowth.init.startingWeaponPoints = 6;
                        profGrowth.growthRate.startLevel = 1;
                        profGrowth.growthRate.iteration = 2;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[3] = 2;
                        profGrowth.growthRate.ranks[7] = 3;
                        profGrowth.growthRate.ranks[13] = 4;
                        profGrowth.growthRate.ranks[17] = 5;
                        break;
                    case "7":
                        profGrowth.init.startRank = 2;
                        profGrowth.init.startingWeaponGroups = "any nine weapon groups";
                        profGrowth.init.startingWeaponPoints = 9;
                        profGrowth.growthRate.startLevel = 1;
                        profGrowth.growthRate.iteration = 2;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[3] = 2;
                        profGrowth.growthRate.ranks[7] = 3;
                        profGrowth.growthRate.ranks[13] = 4;
                        profGrowth.growthRate.ranks[15] = 5;
                        break;
                }
                break;
        }

        // set the increase rate
        if (profGrowth.growthRate.startLevel > 0) {
            let rank = profGrowth.growthRate.ranks[1];
            let iterator = 0;
            for (let i = profGrowth.growthRate.startLevel; i <= 20; i++) {
                iterator--;
                if (profGrowth.growthRate.ranks[i] != undefined) {
                    rank = profGrowth.growthRate.ranks[i];
                }
                if (iterator <= 0) {
                    profGrowth.increase[i] = rank;
                    iterator = profGrowth.growthRate.iteration;
                }
            }
        }
    }

    return profGrowth;
}

function GetArmorProficiencyGrowth(growthValue, classType) {

    let profGrowth = {
        init: {
            startRank: 0,
            unarmored: false,
            light: false,
            medium: false,
            heavy: false,
        },
        growthRate: {
            startLevel: 0,
            iteration: 0,
            ranks: [0]
        },
        increase: []
    };

    if (growthValue != undefined) {
        var growthStyle = growthValue;

        switch (classType) {
            case "Beast":
                if (growthStyle != "0") {
                    profGrowth.init.unarmored = true;
                }
                switch (growthStyle) {
                    case "0":
                        profGrowth.growthRate.ranks[1] = 1;
                        break;
                    case "1":
                        profGrowth.init.startRank = 1;
                        profGrowth.growthRate.startLevel = 9;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[9] = 2;
                        profGrowth.growthRate.ranks[14] = 3;
                        break;
                    case "2":
                        profGrowth.init.startRank = 1;
                        profGrowth.growthRate.startLevel = 9;
                        profGrowth.growthRate.iteration = 4;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[9] = 2;
                        profGrowth.growthRate.ranks[14] = 3;
                        break;
                    case "3":
                        profGrowth.init.startRank = 1;
                        profGrowth.growthRate.startLevel = 8;
                        profGrowth.growthRate.iteration = 4;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[8] = 2;
                        profGrowth.growthRate.ranks[12] = 3;
                        break;
                    case "4":
                        profGrowth.init.startRank = 1;
                        profGrowth.growthRate.startLevel = 7;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[7] = 2;
                        profGrowth.growthRate.ranks[12] = 3;
                        profGrowth.growthRate.ranks[17] = 4;
                        break;
                    case "5":
                        profGrowth.init.startRank = 2;
                        profGrowth.growthRate.startLevel = 8;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[8] = 3;
                        profGrowth.growthRate.ranks[13] = 4;
                        break;
                    case "6":
                        profGrowth.init.startRank = 2;
                        profGrowth.growthRate.startLevel = 7;
                        profGrowth.growthRate.iteration = 5;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[7] = 3;
                        profGrowth.growthRate.ranks[12] = 4;
                        profGrowth.growthRate.ranks[17] = 5;
                        break;
                    case "7":
                        profGrowth.init.startRank = 2;
                        profGrowth.growthRate.startLevel = 6;
                        profGrowth.growthRate.iteration = 4;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[6] = 3;
                        profGrowth.growthRate.ranks[10] = 4;
                        profGrowth.growthRate.ranks[14] = 5;
                        break;
                }
                break;
            default:
                switch (growthStyle) {
                    case "0":
                        profGrowth.growthRate.ranks[1] = 1;
                        break;
                    case "1":
                        profGrowth.init.startRank = 1;
                        profGrowth.init.unarmored = true;
                        profGrowth.growthRate.startLevel = 5;
                        profGrowth.growthRate.iteration = 4;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[9] = 2;
                        profGrowth.growthRate.ranks[13] = 3;
                        break;
                    case "2":
                        profGrowth.init.startRank = 1;
                        profGrowth.init.unarmored = true;
                        profGrowth.init.light = true;
                        profGrowth.growthRate.startLevel = 5;
                        profGrowth.growthRate.iteration = 4;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[9] = 2;
                        profGrowth.growthRate.ranks[13] = 3;
                        break;
                    case "3":
                        profGrowth.init.startRank = 1;
                        profGrowth.init.unarmored = true;
                        profGrowth.init.light = true;
                        profGrowth.init.medium = true;
                        profGrowth.growthRate.startLevel = 5;
                        profGrowth.growthRate.iteration = 3;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[8] = 2;
                        profGrowth.growthRate.ranks[11] = 3;
                        break;
                    case "4":
                        profGrowth.init.startRank = 1;
                        profGrowth.init.unarmored = true;
                        profGrowth.init.light = true;
                        profGrowth.init.medium = true;
                        profGrowth.init.heavy = true;
                        profGrowth.growthRate.startLevel = 4;
                        profGrowth.growthRate.iteration = 3;
                        profGrowth.growthRate.ranks[1] = 1;
                        profGrowth.growthRate.ranks[7] = 2;
                        profGrowth.growthRate.ranks[10] = 3;
                        profGrowth.growthRate.ranks[16] = 4;
                        break;
                    case "5":
                        profGrowth.init.startRank = 2;
                        profGrowth.init.unarmored = true;
                        profGrowth.init.light = true;
                        profGrowth.growthRate.startLevel = 4;
                        profGrowth.growthRate.iteration = 3;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[7] = 3;
                        profGrowth.growthRate.ranks[13] = 4;
                        break;
                    case "6":
                        profGrowth.init.startRank = 2;
                        profGrowth.init.unarmored = true;
                        profGrowth.init.light = true;
                        profGrowth.init.medium = true;
                        profGrowth.growthRate.startLevel = 4;
                        profGrowth.growthRate.iteration = 3;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[6] = 3;
                        profGrowth.growthRate.ranks[12] = 4;
                        profGrowth.growthRate.ranks[18] = 5;
                        break;
                    case "7":
                        profGrowth.init.startRank = 2;
                        profGrowth.init.unarmored = true;
                        profGrowth.init.light = true;
                        profGrowth.init.medium = true;
                        profGrowth.init.heavy = true;
                        profGrowth.growthRate.startLevel = 3;
                        profGrowth.growthRate.iteration = 2;
                        profGrowth.growthRate.ranks[1] = 2;
                        profGrowth.growthRate.ranks[5] = 3;
                        profGrowth.growthRate.ranks[11] = 4;
                        profGrowth.growthRate.ranks[15] = 5;
                        break;
                }
                break;
        }

        // set the increase rate
        if (profGrowth.growthRate.startLevel > 0) {
            let rank = profGrowth.growthRate.ranks[1];
            let iterator = 0;
            for (let i = profGrowth.growthRate.startLevel; i <= 20; i++) {
                iterator--;
                if (profGrowth.growthRate.ranks[i] != undefined) {
                    rank = profGrowth.growthRate.ranks[i];
                }
                if (iterator <= 0) {
                    profGrowth.increase[i] = rank;
                    iterator = profGrowth.growthRate.iteration;
                }
            }
        }
    }

    return profGrowth;
}

function GetSpellProficiencyGrowth(growthValue) {

    let profGrowth = {
        startRank: 0,
        ranks: [0]
    };

    if (growthValue != undefined) {
        var growthStyle = growthValue;

        switch (growthStyle) {
            case "0":
                profGrowth.ranks[1] = 1;
                break;
            case "1":
                profGrowth.startRank = 1;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[5] = 2;
                profGrowth.ranks[11] = 3;
                break;
            case "2":
                profGrowth.startRank = 1;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[5] = 2;
                profGrowth.ranks[11] = 3;
                profGrowth.ranks[15] = 4;
                break;
            case "3":
                profGrowth.startRank = 1;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[4] = 2;
                profGrowth.ranks[7] = 3;
                profGrowth.ranks[13] = 4;
                break;
            case "4":
                profGrowth.startRank = 1;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[4] = 2;
                profGrowth.ranks[7] = 3;
                profGrowth.ranks[13] = 4;
                profGrowth.ranks[17] = 5;
                break;
            case "5":
                profGrowth.startRank = 2;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[5] = 3;
                profGrowth.ranks[11] = 4;
                profGrowth.ranks[15] = 5;
                break;
            case "6":
                profGrowth.startRank = 2;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[4] = 3;
                profGrowth.ranks[9] = 4;
                profGrowth.ranks[13] = 5;
                profGrowth.ranks[18] = 6;
                break;
            case "7":
                profGrowth.startRank = 2;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[4] = 3;
                profGrowth.ranks[8] = 4;
                profGrowth.ranks[12] = 5;
                profGrowth.ranks[15] = 6;
                break;
        }
    }

    return profGrowth;
}

function GetSpiritProficiencyGrowth(growthValue) {

    let profGrowth = {
        startRank: 0,
        ranks: [0]
    };

    if (growthValue != undefined) {
        var growthStyle = growthValue;

        switch (growthStyle) {
            case "0":
                profGrowth.ranks[1] = 0;
                break;
            case "1":
                profGrowth.startRank = 1;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[5] = 2;
                profGrowth.ranks[11] = 3;
                break;
            case "2":
                profGrowth.startRank = 1;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[5] = 2;
                profGrowth.ranks[11] = 3;
                profGrowth.ranks[15] = 4;
                break;
            case "3":
                profGrowth.startRank = 1;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[4] = 2;
                profGrowth.ranks[7] = 3;
                profGrowth.ranks[13] = 4;
                break;
            case "4":
                profGrowth.startRank = 1;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[4] = 2;
                profGrowth.ranks[7] = 3;
                profGrowth.ranks[13] = 4;
                profGrowth.ranks[17] = 5;
                break;
            case "5":
                profGrowth.startRank = 2;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[5] = 3;
                profGrowth.ranks[11] = 4;
                profGrowth.ranks[15] = 5;
                break;
            case "6":
                profGrowth.startRank = 2;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[4] = 3;
                profGrowth.ranks[9] = 4;
                profGrowth.ranks[13] = 5;
                profGrowth.ranks[18] = 6;
                break;
            case "7":
                profGrowth.startRank = 2;
                profGrowth.ranks[1] = 1;
                profGrowth.ranks[4] = 3;
                profGrowth.ranks[8] = 4;
                profGrowth.ranks[12] = 5;
                profGrowth.ranks[15] = 6;
                break;
        }
    }

    return profGrowth;
}

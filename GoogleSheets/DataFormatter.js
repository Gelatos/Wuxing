function SetTechniquesDatabase(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9) {
    arr0 = ConcatSheetsDatabase(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9);
    let techniqueDatabase = CreateSheetsDatabase.CreateTechniques(arr0);
    return PrintLargeEntry(JSON.stringify(techniqueDatabase), "t");
}

function ConcatSheetsDatabase(arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9) {
    if (arr1 != undefined) {
        arr0 = arr0.concat(arr1);
    }
    if (arr2 != undefined) {
        arr0 = arr0.concat(arr2);
    }
    if (arr3 != undefined) {
        arr0 = arr0.concat(arr3);
    }
    if (arr4 != undefined) {
        arr0 = arr0.concat(arr4);
    }
    if (arr5 != undefined) {
        arr0 = arr0.concat(arr5);
    }
    if (arr6 != undefined) {
        arr0 = arr0.concat(arr6);
    }
    if (arr7 != undefined) {
        arr0 = arr0.concat(arr7);
    }
    if (arr8 != undefined) {
        arr0 = arr0.concat(arr8);
    }
    if (arr9 != undefined) {
        arr0 = arr0.concat(arr9);
    }
    return arr0;
}

var CreateSheetsDatabase = CreateSheetsDatabase || (function () {
    'use strict';

    var
        createDatabaseCollection = function(skillsArray, languageArray, loreArray, jobsArray, rolesArray, definitionsArray, techniqueDatabaseString) {
            return {
                techniques: new Database(techniqueDatabaseString),
	            skills: createSkills(skillsArray),
                language: createLanguages(languageArray),
                lore: createLores(loreArray),
		        job: createJobs(jobsArray),
		        role: createRoles(rolesArray),
			    definitions: createDefinitions(definitionsArray)
            }
        },
        
        createTechniques = function (arr) {
            return new Database(["augmentBase", "techniqueGroup"], arr, function (arr) {
                return new TechniqueData(arr);
            });
        },

        createSkills = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new SkillData(arr);
            });
        },

        createLanguages = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new LanguageData(arr);
            });
        },

        createLores = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new LoreData(arr);
            });
        },

        createJobs = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new JobData(arr);
            });
        },

        createRoles = function (arr) {
            return new Database(["group"], arr, function (arr) {
                return new RoleData(arr);
            });
        },

        createDefinitions = function (arr) {
            return new DefinitionDatabase(["group"], arr, function (arr) {
                return new DefinitionData(arr);
            });
        }
        ;
    return {
        CreateDatabaseCollection: createDatabaseCollection,
        CreateTechniques: createTechniques,
        CreateSkills: createSkills,
        CreateLanguages: createLanguages,
        CreateLores: createLores,
        CreateJobs: createJobs,
        CreateRoles: createRoles,
        CreateDefinitions: createDefinitions
    }
}());

var FormatTechniques = FormatTechniques || (function () {
    'use strict';

    var

        get = function (featureArray, source) {
            let feature = createFeatureData();

            if (featureArray != undefined) {
                feature = populateFeatureData(feature, featureArray);
            }
            if (source != undefined) {
                feature.techniqueSource = source;
                feature.techniqueType = source;
            }

            return feature;
        },

        createFeatureData = function () {
            return {
                name: "",
                augmentBase: "",
                techniqueSource: "",
                techniqueGroup: "",
                family: "",
                techniqueType: "",
                action: "",
                traits: "",
                limits: "",
                resourceCost: "",
                flavorText: "",
                description: "",
                onSuccess: "",
                dConditions: "",
                tEffect: "",
                ongDesc: "",
                ongSave: "",
                ongEft: "",
                trigger: "",
                requirement: "",
                item: "",
                prerequisite: {},
                skill: "",
                defense: "",
                range: "",
                rType: "",
                target: "",
                targetCode: "",
                dVal: "",
                dType: "",
                dBonus: "",
                damageType: "",
                element: "",
                augments: []
            };
        },

        populateFeatureData = function (feature, featureArray) {
            var i = 0;
            feature.name = "" + featureArray[i]; i++;
            feature.augmentBase = "" + featureArray[i]; i++;
            feature.techniqueGroup = "" + featureArray[i]; i++;
            feature.family = "" + featureArray[i]; i++;
            feature.techniqueType = "" + featureArray[i]; i++;
            feature.action = "" + featureArray[i]; i++;
            feature.traits = "" + featureArray[i]; i++;
            feature.limits = "" + featureArray[i]; i++;
            feature.resourceCost = "" + featureArray[i]; i++;
            feature.flavorText = "" + featureArray[i]; i++;
            feature.description = "" + featureArray[i]; i++;
            feature.onSuccess = "" + featureArray[i]; i++;
            feature.dConditions = "" + featureArray[i]; i++;
            feature.tEffect = "" + featureArray[i]; i++;
            feature.ongDesc = "" + featureArray[i]; i++;
            feature.ongSave = "" + featureArray[i]; i++;
            feature.ongEft = "" + featureArray[i]; i++;
            feature.trigger = "" + featureArray[i]; i++;
            feature.requirement = "" + featureArray[i]; i++;
            feature.item = "" + featureArray[i]; i++;
            feature.prerequisite = createFeaturePrerequisite(featureArray, i); i += 4;
            feature.skill = "" + featureArray[i]; i++;
            feature.defense = "" + featureArray[i]; i++;
            feature.range = "" + featureArray[i]; i++;
            feature.rType = "" + featureArray[i]; i++;
            feature.target = "" + featureArray[i]; i++;
            feature.targetCode = "" + featureArray[i]; i++;
            feature.dVal = "" + featureArray[i]; i++;
            feature.dType = "" + featureArray[i]; i++;
            feature.dBonus = "" + featureArray[i]; i++;
            feature.damageType = "" + featureArray[i]; i++;
            feature.element = "" + featureArray[i]; i++;

            return feature;
        },

        createFeaturePrerequisite = function (featureArray, incrementer) {
            return {
                lv: featureArray[incrementer],
                ap: featureArray[incrementer + 1],
                tr: featureArray[incrementer + 2],
                ot: featureArray[incrementer + 3]
            }
        },

        setTechniquesDatabase = function (standardArr, heroArr, creatureArr, jobArr, roleArr, itemArr, activeArr, supportArr) {
            var techDictionary = new Dictionary();
            techDictionary.add("Standard", getTechniqueGroupData(standardArr, "Standard"));
            techDictionary.add("Hero", getTechniqueGroupData(heroArr, "Hero"));
            techDictionary.add("Creature", getTechniqueGroupData(creatureArr, "Creature"));
            techDictionary.add("Job", getTechniqueGroupData(jobArr, "Job"));
            techDictionary.add("Role", getTechniqueGroupData(roleArr, "Role"));
            techDictionary.add("Item", getTechniqueGroupData(itemArr, "Item"));
            techDictionary.add("Active", getTechniqueGroupData(activeArr, "Active"));
            techDictionary.add("Support", getTechniqueGroupData(supportArr, "Support"));
            return techDictionary;
        },

        parseTechniquesDatabase = function (techniqueDatabaseData) {
            let output = "";
            for (let i = 0; i < techniqueDatabaseData.length; i++) {
                output += techniqueDatabaseData[i];
            }
            return JSON.parse(output);
        },

        setAugmentTechnique = function (augmentTechnique, baseTechnique) {

            if (augmentTechnique == undefined) {
                return baseTechnique;
            }

            if (augmentTechnique.techniqueGroup == "") {
                augmentTechnique.techniqueGroup = "Augment";
            }
            augmentTechnique.family = setAugmentTechValue(augmentTechnique.family, baseTechnique.family);
            augmentTechnique.techniqueType = setAugmentTechValue(augmentTechnique.techniqueType, baseTechnique.techniqueType);
            augmentTechnique.action = setAugmentTechValue(augmentTechnique.action, baseTechnique.action);
            augmentTechnique.traits = setAugmentTechValue(augmentTechnique.traits, baseTechnique.traits);
            augmentTechnique.limits = setAugmentTechValue(augmentTechnique.limits, baseTechnique.limits);
            augmentTechnique.resourceCost = setAugmentTechValue(augmentTechnique.resourceCost, baseTechnique.resourceCost);
            augmentTechnique.trigger = setAugmentTechValue(augmentTechnique.trigger, baseTechnique.trigger);
            augmentTechnique.requirement = setAugmentTechValue(augmentTechnique.requirement, baseTechnique.requirement);
            augmentTechnique.item = setAugmentTechValue(augmentTechnique.item, baseTechnique.item);
            augmentTechnique.prerequisite.lv = setAugmentTechValue(augmentTechnique.prerequisite.lv, baseTechnique.prerequisite.lv);
            augmentTechnique.prerequisite.ap = setAugmentTechValue(augmentTechnique.prerequisite.ap, baseTechnique.prerequisite.ap);
            augmentTechnique.prerequisite.tr = setAugmentTechValue(augmentTechnique.prerequisite.tr, baseTechnique.prerequisite.tr);
            augmentTechnique.prerequisite.ot = setAugmentTechValue(augmentTechnique.prerequisite.ot, baseTechnique.prerequisite.ot);
            augmentTechnique.skill = setAugmentTechValue(augmentTechnique.skill, baseTechnique.skill);
            augmentTechnique.defense = setAugmentTechValue(augmentTechnique.defense, baseTechnique.defense);
            augmentTechnique.range = setAugmentTechValue(augmentTechnique.range, baseTechnique.range);
            augmentTechnique.rType = setAugmentTechValue(augmentTechnique.rType, baseTechnique.rType);
            augmentTechnique.target = setAugmentTechValue(augmentTechnique.target, baseTechnique.target);
            augmentTechnique.targetCode = setAugmentTechValue(augmentTechnique.targetCode, baseTechnique.targetCode);
            augmentTechnique.dVal = setAugmentTechValue(augmentTechnique.dVal, baseTechnique.dVal);
            augmentTechnique.dType = setAugmentTechValue(augmentTechnique.dType, baseTechnique.dType);
            augmentTechnique.dBonus = setAugmentTechValue(augmentTechnique.dBonus, baseTechnique.dBonus);
            augmentTechnique.damageType = setAugmentTechValue(augmentTechnique.damageType, baseTechnique.damageType);
            augmentTechnique.element = setAugmentTechValue(augmentTechnique.element, baseTechnique.element);
            augmentTechnique.description = setAugmentTechValue(augmentTechnique.description, baseTechnique.description);
            augmentTechnique.onSuccess = setAugmentTechValue(augmentTechnique.onSuccess, baseTechnique.onSuccess);
            augmentTechnique.tEffect = setAugmentTechValue(augmentTechnique.tEffect, baseTechnique.tEffect);
            augmentTechnique.rEffect = setAugmentTechValue(augmentTechnique.rEffect, baseTechnique.rEffect);
            augmentTechnique.dConditions = setAugmentTechValue(augmentTechnique.dConditions, baseTechnique.dConditions);

            return augmentTechnique;
        },

        setAugmentTechValue = function (augmentValue, baseValue) {
            if (augmentValue == "-") {
                return "";
            }
            else if (augmentValue == "") {
                return baseValue;
            }
            return augmentValue;
        },

        getTechniqueGroupData = function (modArray, source) {
            var output = new Dictionary();
            var technique = {};
            for (var i = 0; i < modArray.length; i++) {
                technique = get(modArray[i], source);

                if (technique.augmentBase != "" && output.has(technique.augmentBase)) {
                    output.values[technique.augmentBase].augments.push(technique);
                }
                else {
                    output.add(technique.name, technique);
                }
            }

            return output;
        },

        getTechniqueGroupDataByAction = function (modArray, source) {
            var output = CreateArrayDataObject();

            var technique = {};
            var groupName = "";
            var groupIndex = 0;
            var techniqueIndex = 0;
            for (var i = 0; i < modArray.length; i++) {
                technique = get(modArray[i], source);
                groupName = technique.action;

                // Get the group index
                if (output.createNewGroupEntry(groupName)) {
                    groupIndex = output.getGroupIndex(groupName);
                    output.groups[groupIndex] = CreateArrayDataObject();
                }
                else {
                    groupIndex = output.getGroupIndex(groupName);
                }

                if (technique.augmentBase != "") {
                    techniqueIndex = output.groups[groupIndex].getGroupIndex(technique.augmentBase);
                    if (techniqueIndex >= 0) {
                        output.groups[groupIndex].groups[techniqueIndex].augments.push(technique);
                    }
                }
                else {
                    output.groups[groupIndex].names.push(technique.name);
                    output.groups[groupIndex].groups.push(technique);
                }
            }

            return output;
        },

        createTechniqueFilterData = function () {
            let filterData = {
                uniqueSource: new Dictionary(),
                uniqueGroup: new Dictionary(),
                uniqueType: new Dictionary(),
                uniqueAction: new Dictionary(),
                uniqueTraits: new Dictionary(),
                uniqueReqWeapon: new Dictionary(),
                uniqueBranch: new Dictionary(),
                uniqueSkill: new Dictionary(),
                uniqueDefense: new Dictionary(),
                uniqueRange: new Dictionary(),
                includeBaseSource: new Dictionary(),
                includeBaseGroup: new Dictionary(),
                includeBaseType: new Dictionary(),
                includeBaseAction: new Dictionary(),
                includeBaseTraits: new Dictionary(),
                includeBaseReqWeapon: new Dictionary(),
                includeBaseBranch: new Dictionary(),
                includeBaseSkill: new Dictionary(),
                includeBaseDefense: new Dictionary(),
                includeBaseRange: new Dictionary(),

                add: function (technique) {

                    this.addSource(technique);
                    this.addGroup(technique);
                    this.addType(technique);
                    this.addAction(technique);
                    this.addTrait(technique);
                    this.addreqWeapon(technique);
                    this.addbranch(technique);
                    this.addSkill(technique);
                    this.addDefense(technique);
                    this.addRange(technique);
                },

                sort: function () {
                    this.uniqueType.keys.sort();
                    this.uniqueGroup.keys.sort();
                    this.uniqueAction.keys.sort();
                    this.uniqueTraits.keys.sort();
                    this.uniqueReqWeapon.keys.sort();
                    this.uniqueBranch.keys.sort();
                    this.uniqueSkill.keys.sort();
                    this.uniqueRange.keys.sort();
                    this.includeBaseType.keys.sort();
                    this.includeBaseGroup.keys.sort();
                    this.includeBaseAction.keys.sort();
                    this.includeBaseTraits.keys.sort();
                    this.includeBaseReqWeapon.keys.sort();
                    this.includeBaseBranch.keys.sort();
                    this.includeBaseSkill.keys.sort();
                    this.includeBaseRange.keys.sort();
                },

                addSource: function (technique) {
                    let key = technique.techniqueSource;
                    this.addTechnique([this.uniqueSource, this.includeBaseSource], key, technique);
                    for (let i = 0; i < technique.augments.length; i++) {
                        this.augmentCheck(technique, technique.augments[i], this.uniqueSource, this.includeBaseSource, key, technique.augments[i].techniqueSource);
                    }
                },

                addGroup: function (technique) {
                    let key = technique.techniqueGroup;
                    this.addTechnique([this.uniqueGroup, this.includeBaseGroup], key, technique);
                    for (let i = 0; i < technique.augments.length; i++) {
                        this.augmentCheck(technique, technique.augments[i], this.uniqueGroup, this.includeBaseGroup, key, technique.augments[i].techniqueGroup);
                    }
                },

                addType: function (technique) {
                    let key = technique.techniqueType;
                    this.addTechnique([this.uniqueType, this.includeBaseType], key, technique);
                    for (let i = 0; i < technique.augments.length; i++) {
                        this.augmentCheck(technique, technique.augments[i], this.uniqueType, this.includeBaseType, key, technique.augments[i].techniqueType);
                    }
                },

                addAction: function (technique) {
                    let key = technique.action;
                    this.addTechnique([this.uniqueAction, this.includeBaseAction], key, technique);
                    for (let i = 0; i < technique.augments.length; i++) {
                        this.augmentCheck(technique, technique.augments[i], this.uniqueAction, this.includeBaseAction, key, technique.augments[i].action);
                    }
                },

                addTrait: function (technique) {

                    let traitsDictionary = GetTraitDataFromString(technique.traits);
                    for (let j = 0; j < traitsDictionary.length; j++) {
                        this.addTechnique([this.uniqueTraits, this.includeBaseTraits], traitsDictionary[j].keyword, technique);
                    }

                    if (Array.isArray(technique.augments)) {
                        for (let i = 0; i < technique.augments.length; i++) {

                            if (technique.augments[i].traits != undefined) {
                                traitsDictionary = GetTraitDataFromString(technique.augments[i].traits);
                                for (let j = 0; j < traitsDictionary.length; j++) {
                                    this.augmentCheck(technique, technique.augments[i], this.uniqueTraits, this.includeBaseTraits, "", traitsDictionary[j].keyword);
                                }
                            }
                        }
                    }
                },

                addreqWeapon: function (technique) {
                    if (technique.requirement == null) {
                        return;
                    }
                    let items = technique.item.split(";");
                    let item = "";
                    for (let j = 0; j < items.length; j++) {
                        item = items[j].trim();
                        this.addTechnique([this.uniqueReqWeapon, this.includeBaseReqWeapon], item, technique);
                    }

                    if (Array.isArray(technique.augments)) {
                        for (let i = 0; i < technique.augments.length; i++) {

                            if (technique.augments[i].requirement != undefined) {
                                items = technique.augments[i].item.split(";");
                                for (let j = 0; j < items.length; j++) {
                                    item = items[j].trim();
                                    this.augmentCheck(technique, technique.augments[i], this.uniqueReqWeapon, this.includeBaseReqWeapon, "", item);
                                }
                            }
                        }
                    }
                },

                addbranch: function (technique) {
                    let items = technique.prerequisite.ap.split(";");
                    let item = "";
                    for (let j = 0; j < items.length; j++) {
                        item = items[j].trim();
                        this.addTechnique([this.uniqueBranch, this.includeBaseBranch], item, technique);
                    }

                    if (Array.isArray(technique.augments)) {
                        for (let i = 0; i < technique.augments.length; i++) {

                            if (technique.augments[i].prerequisite != undefined) {
                                items = technique.augments[i].prerequisite.ap.split(";");
                                for (let j = 0; j < items.length; j++) {
                                    item = items[j].trim();
                                    this.augmentCheck(technique, technique.augments[i], this.uniqueBranch, this.includeBaseBranch, "", item);
                                }
                            }
                        }
                    }
                },

                addSkill: function (technique) {
                    let key = technique.skill;
                    this.addTechnique([this.uniqueSkill, this.includeBaseSkill], key, technique);
                    for (let i = 0; i < technique.augments.length; i++) {
                        this.augmentCheck(technique, technique.augments[i], this.uniqueSkill, this.includeBaseSkill, key, technique.augments[i].skill);
                    }
                },

                addDefense: function (technique) {
                    let key = technique.defense;
                    this.addTechnique([this.uniqueDefense, this.includeBaseDefense], key, technique);
                    for (let i = 0; i < technique.augments.length; i++) {
                        this.augmentCheck(technique, technique.augments[i], this.uniqueDefense, this.includeBaseDefense, key, technique.augments[i].defense);
                    }
                },

                addRange: function (technique) {
                    let key = technique.rType;
                    this.addTechnique([this.uniqueRange, this.includeBaseRange], key, technique);
                    for (let i = 0; i < technique.augments.length; i++) {
                        this.augmentCheck(technique, technique.augments[i], this.uniqueRange, this.includeBaseRange, key, technique.augments[i].rType);
                    }
                },

                dictionaryCheck: function (dictionary, key) {
                    if (!dictionary.has(key)) {
                        dictionary.add(key, []);
                    }
                },

                addTechnique: function (dictionaries, key, technique) {
                    if (key != "") {
                        for (let i = 0; i < dictionaries.length; i++) {
                            this.dictionaryCheck(dictionaries[i], key);
                            if (!dictionaries[i].get(key).includes(technique.name)) {
                                dictionaries[i].get(key).push(technique.name);
                            }
                        }
                    }
                },

                augmentCheck: function (baseTechnique, technique, branchDictionary, includeBaseDictionary, mainKey, compareKey) {
                    if (compareKey == "") {
                        compareKey == mainKey;
                    }
                    this.addTechnique([includeBaseDictionary], compareKey, baseTechnique);
                    this.addTechnique([branchDictionary, includeBaseDictionary], compareKey, technique);
                }
            }

            filterData.dictionaryCheck(filterData.uniqueDefense, "BP DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "BR DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "PR DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "Presence DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "Brace DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "Presence DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "Insight DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "Notice DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "Resolve DC");
            filterData.dictionaryCheck(filterData.uniqueDefense, "Fortitude DC");

            return filterData;
        },

        iterateOverTechArrays = function (data, callback, techniqueDatabase, sources) {
            let techData;
            for (let i = 0; i < sources.length; i++) {
                techData = new Dictionary();
                techData.importJson(techniqueDatabase.values[sources[i]]);
                data = callback(data, techData);
            }
            return data;
        },

        getTechFilterData = function (techniqueDatabaseData, sources) {
            // create tech data
            let data = createTechniqueFilterData();
            let techniqueDatabase = parseTechniquesDatabase(techniqueDatabaseData);
            data = iterateOverTechArrays(data, createTechFilterData, techniqueDatabase, sources);
            return data;
        },

        createTechFilterData = function (techFilterData, techData) {

            techData.iterate(function (technique) {
                techFilterData.add(technique);
            });

            return techFilterData;
        },

        getTechDatabaseData = function (techniqueDatabaseData, sources) {
            // create tech data
            var data = {
                databaseNameData: [],
                databaseTechniqueData: [],
                techFilterData: createTechniqueFilterData()
            }
            let techniqueDatabase = parseTechniquesDatabase(techniqueDatabaseData);
            data = iterateOverTechArrays(data, createTechDatabaseData, techniqueDatabase, sources);
            return data;
        },

        createTechDatabaseData = function (techniqueData, techData) {

            var customDataListNames = [];
            var customData = [];
            var augmentData = [];
            var augmentList = [];
            var augmentTechnique = {};

            techData.iterate(function (technique) {
                techniqueData.techFilterData.add(technique);
                augmentData = technique.augments;
                augmentList = [];
                for (var l = 0; l < augmentData.length; l++) {
                    augmentList.push(augmentData[l].name);
                }
                technique.augments = augmentList;
                customDataListNames.push(technique.name);
                customData.push(technique);

                for (var k = 0; k < augmentData.length; k++) {
                    augmentTechnique = setAugmentTechnique(augmentData[k], technique);

                    customDataListNames.push(augmentTechnique.name);
                    customData.push(augmentTechnique);
                }
            });

            // create the main database
            techniqueData.databaseNameData = techniqueData.databaseNameData.concat(customDataListNames);
            techniqueData.databaseTechniqueData = techniqueData.databaseTechniqueData.concat(customData);

            return techniqueData;
        }

        ;
    return {
        Get: get,
        SetTechniquesDatabase: setTechniquesDatabase,
        ParseTechniquesDatabase: parseTechniquesDatabase,
        SetAugmentTechnique: setAugmentTechnique,
        GetTechniqueGroupData: getTechniqueGroupData,
        GetTechniqueGroupDataByAction: getTechniqueGroupDataByAction,
        CreateTechniqueFilterData: createTechniqueFilterData,
        IterateOverTechArrays: iterateOverTechArrays,
        GetTechFilterData: getTechFilterData,
        GetTechDatabaseData: getTechDatabaseData
    };
}());

var DisplayTechniqueHtml = DisplayTechniqueHtml || (function () {
    'use strict';

    var
        getDisplayOptions = function () {
            return {
                sectionName: "",
                autoExpand: false,
                hasCSS: false,
                hasUseInteraction: false,
                showSelect: false,
                showTrigger: false,
                showKiCharge: false
            }
        },

        get = function (technique, displayOptions) {
            if (displayOptions == undefined) {
                displayOptions = getDisplayOptions();
                displayOptions.hasCSS = true;
            }
            let techDisplayData = FeatureService.GetTechniqueDisplayData(technique);
            return setTechniqueDisplayHtml(techDisplayData, displayOptions);
        },

        setTechniqueDisplayHtml = function (techDisplayData, displayOptions) {
            let output = "";
            output += setTechniqueDisplayHeader(techDisplayData, displayOptions);
            output += setTechniqueDisplayExpandData(techDisplayData, displayOptions);

            return setTechniqueDisplayFeatureDiv(techDisplayData, displayOptions, output);
        },

        setTechniqueDisplayFeatureDiv = function (techDisplayData, displayOptions, contents) {

            let prequel = "";
            if (displayOptions.showSelect) {
                prequel = `<input type="hidden" class="wuxFeature-flag"name="attr_${displayOptions.sectionName}-select-${techDisplayData.fieldName}">`;
            }

            return `${prequel}<div ${setFeatureStyle("wuxFeature", displayOptions)}>${contents}</div>\n`;
        },

        setTechniqueDisplayHeader = function (techDisplayData, displayOptions) {
            let output = "";
            output += setTechniqueDisplayHeaderSlotBox(techDisplayData, displayOptions);
            output += setTechniqueDisplayHeaderExpandSection(techDisplayData, displayOptions);
            output += setTechniqueDisplayHeaderSelectSection(techDisplayData, displayOptions);
            output += setTechniqueDisplayHeaderUseSection(techDisplayData, displayOptions);
            output += setTechniqueDisplayHeaderNameFields(techDisplayData, displayOptions);

            output = `<div ${setFeatureStyle(["wuxFeatureHeader", `wuxFeatureHeader-${techDisplayData.actionType}`], displayOptions)}>
  ${output}
  </div>
  `;
            output += setTechniqueDisplayHeaderExtentFeatures(techDisplayData, displayOptions);
            return output;
        },

        setTechniqueDisplayHeaderSlotBox = function (techDisplayData, displayOptions) {
            let slotStyling = ["wuxFeatureType", `wuxFeatureType-${techDisplayData.slotType}`];
            if (techDisplayData.slotIsPath) {
                slotStyling.push("wuxFeatureType-IsPath");
            }
            return `<div ${setFeatureStyle(slotStyling, displayOptions)}>
  <span ${setFeatureStyle("wuxFeatureTypeHeader", displayOptions)}>${techDisplayData.slotSource}</span>
  <span ${setFeatureStyle("wuxFeatureTypeFooter", displayOptions)}>${techDisplayData.slotFooter}</span>
  </div>`;
        },

        setTechniqueDisplayHeaderExpandSection = function (techDisplayData, displayOptions) {
            if (displayOptions.hasCSS) {
                // add the collapsible field
                let attributeName = `attr_${displayOptions.sectionName}-expand-${techDisplayData.fieldName}`;
                let isChecked = displayOptions.autoExpand ? `checked value="on"` : "";

                return `<div class="wuxFeatureHeaderInteractBlock">
  <div class="wuxFeatureHeaderInteractInnerBlock">
  <input class="wuxFeatureHeaderInteractBlock-flag" type="checkbox" name="${attributeName}" ${isChecked}>
  <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="${attributeName}" ${isChecked}>
  <span class="wuxFeatureHeaderInteractiveIcon">&#9662;</span>
  <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="${attributeName}" ${isChecked}>
  <span class="wuxFeatureHeaderInteractiveAuxIcon">&#9656;</span>
  </div>
  </div>`;
            }
            return "";
        },

        setTechniqueDisplayHeaderSelectSection = function (techDisplayData, displayOptions) {
            if (displayOptions.showSelect) {
                return `
  <div class="wuxFeatureHeaderInteractBlock">
  <input class="wuxFeatureHeaderInteractBlock-flag" type="checkbox" name="attr_${displayOptions.sectionName}-select-${techDisplayData.fieldName}">
  <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="attr_${displayOptions.sectionName}-select-${techDisplayData.fieldName}">
  <span class="wuxFeatureHeaderInteractiveIcon">&#9635;</span>
  <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="attr_${displayOptions.sectionName}-select-${techDisplayData.fieldName}">
  <span class="wuxFeatureHeaderInteractiveAuxIcon">&#9634;</span>
  </div>`;
            }
            return "";
        },

        setTechniqueDisplayHeaderUseSection = function (techDisplayData, displayOptions) {

            if (displayOptions.hasUseInteraction) {
                // add technique data for the api
                techDisplayData.technique.username = "@{character_name}";
                let usedTechData = JSON.stringify(techDisplayData.technique);

                if (techDisplayData.technique.traits.indexOf("Armament") >= 0 || techDisplayData.technique.traits.indexOf("Arsenal") >= 0) {
                    usedTechData += `##@{technique-equippedWeapon-${techDisplayData.fieldName}}`;
                }
                usedTechData = Format.SanitizeSheetRollAction(usedTechData);

                return `<div class="wuxFeatureHeaderInteractBlock">
  <button class="wuxFeatureHeaderInteractiveButton" type="roll" value="${FeatureService.GetRollTemplate(techDisplayData)}">i</button><button class="wuxFeatureHeaderInteractiveButton" type="roll" value="!ctech ${usedTechData}">9</button>
  </div>`;
            }

            return "";
        },

        setTechniqueDisplayHeaderNameFields = function (techDisplayData, displayOptions) {
            let armamentData = "";
            if (displayOptions.hasUseInteraction && techDisplayData.isArmament) {
                armamentData = `<div class="wuxFeatureHeaderInfo">
  <select class='wuxFeatureHeaderInfoType' name='attr_${displayOptions.sectionName}-equippedWeapon-${techDisplayData.fieldName}' value="@{equipment-main}">
  <option value="@{equipment-main}">Main Weapon</option>
  <option value="@{equipment-sub}">Sub Weapon</option>
  <option value="@{equipment-support}">Support Weapon</option>
  </select>
  </div>`;
            }

            return `<div ${setFeatureStyle("wuxFeatureHeaderDisplayBlock", displayOptions)}>
  <span ${setFeatureStyle("wuxFeatureHeaderName", displayOptions)}>${techDisplayData.name}</span>
  <div ${setFeatureStyle("wuxFeatureHeaderInfo", displayOptions)}>${techDisplayData.usageInfo}</div>
  ${armamentData}
  </div>`;
        },

        setTechniqueDisplayHeaderExtentFeatures = function (techDisplayData, displayOptions) {
            if (displayOptions.showSelect && techDisplayData.prerequisite != "") {
                return `
  <div class="wuxFeatureHeaderInfoPrereq">
  <span><strong>Prerequisites: </strong></span>
  <span>${techDisplayData.prerequisite}</span>
  </div>`;
            }
            return "";
        },

        setTechniqueDisplayExpandData = function (techDisplayData, displayOptions) {
            let output = "";

            output += setTechniqueDisplayFunctionBlock(techDisplayData, displayOptions);
            output += setTechniqueDisplayCheckBlock(techDisplayData, displayOptions);
            output += setTechniqueDisplayDescriptionBlock(techDisplayData, displayOptions);

            if (displayOptions.hasCSS) {
                let attributeName = `attr_${displayOptions.sectionName}-expand-${techDisplayData.fieldName}`;
                let isChecked = displayOptions.autoExpand ? `checked value="on"` : "";

                return `<input type="hidden" class="wuxFeatureHeaderInteractBlock-flag" name="${attributeName}" ${isChecked}>
  <div class="wuxFeatureExpandingContent">
  ${output}
  </div>`;
            }
            else {
                return output;
            }
        },

        setTechniqueDisplayFunctionBlock = function (techDisplayData, displayOptions) {

            if (techDisplayData.isFunctionBlock) {
                let output = "";
                output += setTechniqueDisplayFunctionBlockTraits(techDisplayData, displayOptions);
                output += setTechniqueDisplayFunctionBlockLine(techDisplayData.requirement, "Requirement", displayOptions);
                output += setTechniqueDisplayFunctionBlockLine(techDisplayData.trigger, "Trigger", displayOptions);

                return `<div ${setFeatureStyle("wuxFeatureFunctionBlock", displayOptions)}>
  ${output}
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayFunctionBlockLine = function (dataObject, sectionName, displayOptions) {
            if (dataObject != "") {
                return `<div ${setFeatureStyle("wuxFeatureFunctionBlockRow", displayOptions)}>
  <span><strong>${sectionName}: </strong></span>
  <span>${dataObject}</span>
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayFunctionBlockTraits = function (techDisplayData, displayOptions) {
            if (techDisplayData.traits.length > 0) {
                let traitsData = "";
                for (var i = 0; i < techDisplayData.traits.length; i++) {
                    if (displayOptions.hasCSS) {
                        traitsData += `<div class="wuxTrait">
  <span class="wuxTraitText">${techDisplayData.traits[i].name}</span>
  <span class="wuxTooltiptext">${techDisplayData.traits[i].description}</span>
  </div>`;
                    }
                    else {
                        traitsData += `<a style="margin-right: 10px; text-decoration: underline dotted;" title="${techDisplayData.traits[i].description}">${techDisplayData.traits[i].name}</a>`;
                    }
                }
                return `<div ${setFeatureStyle("wuxFeatureFunctionBlockRow", displayOptions)}>
  <span><strong>Traits: </strong></span>
  <span class="wuxShownTraits">${traitsData}</span>
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayCheckBlock = function (techDisplayData, displayOptions) {

            if (techDisplayData.isCheckBlock) {
                let output = "";
                output += setTechniqueDisplayCheckBlockTarget(techDisplayData, displayOptions);
                output += setTechniqueDisplayCheckBlockLine(techDisplayData.skill, "Check", displayOptions);
                output += setTechniqueDisplayCheckBlockLine(techDisplayData.damage, "Damage", displayOptions);

                return `<div ${setFeatureStyle("wuxFeatureCheckBlock", displayOptions)}>
  ${output}
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayCheckBlockTarget = function (techDisplayData, displayOptions) {
            if (techDisplayData.isCheckBlockTarget) {
                let output = "";
                if (techDisplayData.range != "") {
                    output += `<div ${setFeatureStyle("wuxFeatureCheckBlockRange", displayOptions)}>
  <span><strong>${techDisplayData.rType}: </strong></span>
  <span>${techDisplayData.range}</span>
  </div>`;
                }
                if (techDisplayData.target != "") {
                    output += `<div ${setFeatureStyle("wuxFeatureCheckBlockTarget", displayOptions)}>
  <span><strong>Target: </strong></span>
  <span>${techDisplayData.target}</span>
  </div>`;
                }
                return `<div ${setFeatureStyle("wuxFeatureCheckBlockRow", displayOptions)}>
  ${output}
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayCheckBlockLine = function (dataObject, sectionName, displayOptions) {
            if (dataObject != "") {
                return `<div ${setFeatureStyle("wuxFeatureCheckBlockRow", displayOptions)}>
  <span><strong>${sectionName}: </strong></span>
  <span>${dataObject}</span>
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayDescriptionBlock = function (techDisplayData, displayOptions) {

            if (techDisplayData.isDescBlock) {
                let output = "";
                output += setTechniqueDisplayDescriptionBlockLine(techDisplayData.description, displayOptions);
                output += setTechniqueDisplayDescriptionBlockOnHit(techDisplayData, displayOptions);
                output += setTechniqueDisplayDescriptionBlockLine(techDisplayData.conditions, displayOptions);
                output += setTechniqueDisplayDescriptionBlockSurge(techDisplayData, displayOptions);

                return `<div ${setFeatureStyle("wuxFeatureDescriptionBlock", displayOptions)}>
  <div>
  ${output}
  </div>
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayDescriptionBlockLine = function (dataObject, displayOptions) {
            if (dataObject != "") {
                return `<div>
  <span ${setFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions)}>${FormatBlock(dataObject)}</span>
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayDescriptionBlockOnHit = function (techDisplayData, displayOptions) {
            if (techDisplayData.onHit != "") {
                return `<div>
  <strong ${setFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions)}>On Hit: </strong>
  <span ${setFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions)}>${FormatBlock(techDisplayData.onHit)}</span>
  </div>
  `;
            }
            return "";
        },

        setTechniqueDisplayDescriptionBlockSurge = function (techDisplayData, displayOptions) {
            if (displayOptions.showKiCharge && techDisplayData.technique.tEffect.indexOf("Surge") >= 0) {
                return `<div>
  <span><strong>Ki Charge: </strong></span>
  <span name="attr_kiCharge_max" value="0">0</span>
  </div>`;
            }
            return "";
        },

        setFeatureStyle = function (style, displayOptions) {
            if (displayOptions.hasCSS) {
                if (Array.isArray(style)) {
                    let output = "";
                    for (var i = 0; i < style.length; i++) {
                        if (output != "") {
                            output += " ";
                        }
                        output += style[i];
                    }
                    return `class="${output}"`;
                }
                else {
                    return `class="${style}"`;
                }
            }
            else {
                if (Array.isArray(style)) {
                    let output = "";
                    for (var i = 0; i < style.length; i++) {
                        if (output != "") {
                            output += " ";
                        }
                        output += getFeatureStyleSheetStyle(style[i]);
                    }
                    return `style="${output}"`;
                }
                else {
                    return `style="${getFeatureStyleSheetStyle(style)}"`;
                }
            }
        },

        getFeatureStyleSheetStyle = function (style) {
            switch (style) {
                case "wuxFeature":
                    return `position: relative;
  display: inline-block;
  min-width: 300px; 
  max-width: 500px; 
  width: calc(100% - 10px);
  
  font-size: 12px;
  
  border: 3px solid black; 
  background: #cacbcf;
  
  flex: 1;`;
                case "wuxFeatureHeader":
                    return `position: relative;
  display: block; 
  width: calc(100% - 10px);
  padding: 0px 0px 5px 10px; 
  background: #c0e7d5;
  border-bottom: 1px solid #efefef; `;
                case "wuxFeatureHeader-Quick":
                    return `background-color: #fbe5e5;`;
                case "wuxFeatureHeader-Full":
                    return `background-color: #d7a0a0;`;
                case "wuxFeatureHeader-Reaction":
                    return `background-color: #e5eafb;`;
                case "wuxFeatureHeader-Free":
                    return `background-color: #e5fbf1;`;
                case "wuxFeatureHeader-None":
                    return `background-color: #f0e5fb;`;
                case "wuxFeatureHeader-Augment":
                    return `background-color: #acacac;`;
                case "wuxFeatureType":
                    return `position: absolute;
  display: inline-block;
  right: 0px;
  width: 55px; 
  padding: 5px; 
  
  vertical-align: top; 
  text-align: center; 
  
  color: #FFF; 
  
  background: #000000;`;
                case "wuxFeatureType-Active":
                    return `background-color: #b60003;`;
                case "wuxFeatureType-Passive":
                    return `background-color: #4db600;`;
                case "wuxFeatureType-Support":
                    return `background-color: #00b0b6;`;
                case "wuxFeatureType-Job":
                    return `background-color: #7800b6;`;
                case "wuxFeatureType-Permanent":
                    return `background-color: #b66f00;`;
                case "wuxFeatureTypeHeader":
                    return `position: relative;
  display: block;
  
  font-size: 9px; 
  font-weight: bold;`;
                case "wuxFeatureTypeFooter":
                    return `position: relative;
  display: block;
  font-size: 7px;`;
                case "wuxFeatureHeaderDisplayBlock":
                    return `position: relative;
  display:inline-block; 
  width: calc(100% - 115px);`;
                case "wuxFeatureHeaderName":
                    return `position: relative;
  display: block; 
  
  width: 100%;
  margin-top: 5px; 
  
  font-size: 13px; 
  font-weight: bold;`;
                case "wuxFeatureHeaderInfo":
                    return `position: relative;
  display: block; 
  
  font-size: 11px;`;
                case "wuxFeatureHeaderInfoType":
                    return `position: relative;
  font-weight: bold;`;
                case "wuxFeatureExpandingContent":
                    return `position: relative;`;
                case "wuxFeatureFunctionBlock":
                    return `position: relative;
  display: block;
  
  width: calc(100% - 22px);
  padding: 5px 10px; 
  
  line-height: 14px; 
  font-size: 11px; 
  
  border-bottom: 1px solid #c6c6c6; 
  background: #fbf9e5;`;
                case "wuxFeatureFunctionBlockRow":
                    return `position: relative;
  display: block;`;
                case "wuxFeatureCheckBlock":
                    return ``;
                case "wuxFeatureCheckBlockRow":
                    return `position: relative;
  display: inline-block;
  
  width: calc(100% - 22px);`;
                case "wuxFeatureCheckBlockRange":
                    return `position: relative;
  display: inline-block;
  
  padding-right: 10px;`;
                case "wuxFeatureCheckBlockTarget":
                    return `position: relative;
  display: inline-block;
  
  width: calc(65% - 5px);`;
                case "wuxFeatureDescriptionBlock":
                    return `position: relative;
  display: block;
  width: calc(100% - 20px);
  padding: 5px 10px; 
  
  font-size: 11px;`;
                case "wuxFeatureDescriptionBlockDesc":
                    return `display: inline-block;
  white-space: pre-line;
  word-break: break-word;`;
                default:
                    return "";
            }
        }
        ;
    return {
        GetDisplayOptions: getDisplayOptions,
        Get: get
    };
}());

var FormatSkills = FormatSkills || (function () {
    'use strict';

    var
        createSkillsDictionary = function (modArray) {
            var output = new Dictionary();
            var skill = {};
            var data = [];

            // create the groups dictionary
            let groups = getSkillGroupList();
            for (let i = 0; i < groups.length; i++) {

                // populate the groups
                data = [];
                for (let j = 0; j < modArray.length; j++) {
                    skill = get(modArray[j]);
                    if (skill.group == groups[i]) {
                        data.push(skill);
                    }
                }
                output.add(groups[i], data);
            }

            return output;
        },

        get = function (modArray) {

            var output = {
                name: "",
                group: "",
                abilityScore: "",
                description: "",
            };

            if (modArray != undefined) {
                let i = 0;
                output.name = "" + modArray[i]; i++;
                output.group = "" + modArray[i]; i++;
                output.abilityScore = "" + modArray[i]; i++;
                output.description = "" + modArray[i]; i++;
            };

            return output;
        },

        getSkillGroupList = function () {
            return ["Athletics", "Combat", "Creation", "Manipulate", "Sensing", "Social"];
        }
        ;
    return {
        CreateSkillsDictionary: createSkillsDictionary,
        Get: get,
        GetSkillGroupList: getSkillGroupList
    };
}());

var FormatKnowledge = FormatKnowledge || (function () {
    'use strict';

    var
        createLanguageDictionary = function (modArray) {
            var output = new Dictionary();
            var skill = {};
            var data = [];

            // create the groups dictionary
            let groups = getLanguageGroupList();
            for (let i = 0; i < groups.length; i++) {

                // populate the groups
                data = [];
                for (let j = 0; j < modArray.length; j++) {
                    skill = createLanguageData(modArray[j]);
                    if (skill.group == groups[i]) {
                        data.push(skill);
                    }
                }
                output.add(groups[i], data);
            }

            return output;
        },

        createLanguageData = function (modArray) {

            var output = {
                name: "",
                group: "",
                location: "",
                description: "",
            };

            if (modArray != undefined) {
                let i = 0;
                output.name = "" + modArray[i]; i++;
                output.group = "" + modArray[i]; i++;
                output.location = "" + modArray[i]; i++;
                output.description = "" + modArray[i]; i++;
            };

            return output;
        },

        createLoreDictionary = function (modArray) {
            var output = new Dictionary();
            var skill = {};
            var data = [];

            // create the groups dictionary
            let groups = getLoreGroupList();
            for (let i = 0; i < groups.length; i++) {

                // populate the groups
                data = [];
                for (let j = 0; j < modArray.length; j++) {
                    skill = createLoreData(modArray[j]);
                    if (skill.group == groups[i]) {
                        data.push(skill);
                    }
                }
                output.add(groups[i], data);
            }

            return output;
        },

        createLoreData = function (modArray) {

            var output = {
                name: "",
                group: "",
                description: "",
            };

            if (modArray != undefined) {
                let i = 0;
                output.name = "" + modArray[i]; i++;
                output.group = "" + modArray[i]; i++;
                output.description = "" + modArray[i]; i++;
            };

            return output;
        },

        getLanguageGroupList = function () {
            return ["Walthair", "Aridsha", "Khem", "Colswei", "Ceres", "Special"];
        },

        getLoreGroupList = function () {
            return ["Academics", "Profession", "Craftmanship", "Geography", "History", "Culture", "Religion"];
        }
        ;
    return {
        CreateLanguageDictionary: createLanguageDictionary,
        CreateLoreDictionary: createLoreDictionary,
        GetLanguageGroupList: getLanguageGroupList,
        GetLoreGroupList: getLoreGroupList
    };
}());

var FormatJobs = FormatJobs || (function () {
    'use strict';

    var
        createDictionary = function (modArray) {
            var output = new Dictionary();
            let job = {};

            // create the groups dictionary
            for (let i = 0; i < modArray.length; i++) {
                job = get(modArray[i]);
                output.add(job.name, job);
            }

            return output;
        },

        get = function (modArray) {

            var output = {
                name: "",
                group: "",
                description: "",
                attributes: {},
                roles: {},
                prereq: "",
                techniques: []
            };

            if (modArray != undefined) {
                let i = 0;
                output.name = "" + modArray[i]; i++;
                output.group = "" + modArray[i]; i++;
                output.description = "" + modArray[i]; i++;
                output.attributes = FormatStatBlock.CreateAttributesArray(modArray, i); i += 7;
                output.roles = FormatStatBlock.CreateRolesArray(modArray, i); i += 5;
                output.prereq = "" + modArray[i]; i++;
                output.techniques = createJobTechnique(modArray, i); i++;
            };

            return output;
        },

        createJobTechnique = function (modArray, startingIndex) {
            var output = [];
            let i = startingIndex;
            let data = "";
            let dataSplit = {};
            while (true) {
                if (modArray[i] == undefined || modArray[i] == "") {
                    break;
                }
                data = "" + modArray[i];
                dataSplit = data.split(";");
                output.push({ name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0 });
                i++;
            }
            return output;
        },

        getGroupList = function () {
            return ["Athletics", "Combat", "Focus", "Social", "Technical"];
        }
        ;
    return {
        CreateDictionary: createDictionary,
        Get: get,
        GetGroupList: getGroupList
    };
}());

var FormatRoles = FormatRoles || (function () {
    'use strict';

    var
        createDictionary = function (modArray) {
            var output = new Dictionary();
            let role = {};

            // create the groups dictionary
            for (let i = 0; i < modArray.length; i++) {
                role = get(modArray[i]);
                output.add(role.name, role);
            }

            return output;
        },

        get = function (modArray) {

            var output = {
                name: "",
                group: "",
                description: "",
                techniques: []
            };

            if (modArray != undefined) {
                let i = 0;
                output.name = "" + modArray[i]; i++;
                output.group = "" + modArray[i]; i++;
                output.description = "" + modArray[i]; i++;
                output.techniques = createTechnique(modArray, i); i++;
            };

            return output;
        },

        createTechnique = function (modArray, startingIndex) {
            var output = [];
            let i = startingIndex;
            let data = "";
            let dataSplit = {};
            while (true) {
                if (modArray[i] == undefined || modArray[i] == "") {
                    break;
                }
                data = "" + modArray[i];
                dataSplit = data.split(";");
                output.push({ name: dataSplit[0], level: dataSplit.length > 1 ? dataSplit[1] : 0 });
                i++;
            }
            return output;
        },

        getGroupList = function () {
            return ["Athletics", "Combat", "Focus", "Social", "Technical"];
        }
        ;
    return {
        CreateDictionary: createDictionary,
        Get: get,
        GetGroupList: getGroupList
    };
}());

var FormatStatBlock = FormatStatBlock || (function () {
    'use strict';

    var
        createAttributesArray = function (modArray, startingIndex) {

            var output = {
                bod: 0,
                prc: 0,
                qck: 0,
                cnv: 0,
                int: 0,
                rsn: 0
            };

            if (modArray != undefined) {
                let i = startingIndex;
                output.bod = parseInt(modArray[i]); i++;
                output.prc = parseInt(modArray[i]); i++;
                output.qck = parseInt(modArray[i]); i++;
                output.cnv = parseInt(modArray[i]); i++;
                output.int = parseInt(modArray[i]); i++;
                output.rsn = parseInt(modArray[i]); i++;
                removeAttributeNaN(output);
            };

            return output;
        },

        removeAttributeNaN = function (attributeObj) {
            if (isNaN(attributeObj.bod)) {
                attributeObj.bod = 0;
            }
            if (isNaN(attributeObj.prc)) {
                attributeObj.prc = 0;
            }
            if (isNaN(attributeObj.qck)) {
                attributeObj.qck = 0;
            }
            if (isNaN(attributeObj.cnv)) {
                attributeObj.cnv = 0;
            }
            if (isNaN(attributeObj.int)) {
                attributeObj.int = 0;
            }
            if (isNaN(attributeObj.rsn)) {
                attributeObj.rsn = 0;
            }
        },

        getAttributeNames = function () {
            return ["Body", "Precision", "Quickness", "Conviction", "Intuition", "Reason"];
        },

        getAttributeAbrNames = function () {
            return ["BOD", "PRC", "QCK", "CNV", "INT", "RSN"];
        },

        convertAttributesToArr = function (attributeObj) {
            let output = [];
            output.push(attributeObj.bod);
            output.push(attributeObj.prc);
            output.push(attributeObj.qck);
            output.push(attributeObj.cnv);
            output.push(attributeObj.int);
            output.push(attributeObj.rsn);
            return output;
        },

        createRolesArray = function (modArray, startingIndex) {

            var output = {
                generalist: 0,
                athlete: 0,
                defender: 0,
                marksman: 0,
                skirmisher: 0
            };

            if (modArray != undefined) {
                let i = startingIndex;
                output.generalist = parseInt(modArray[i]); i++;
                output.athlete = parseInt(modArray[i]); i++;
                output.defender = parseInt(modArray[i]); i++;
                output.marksman = parseInt(modArray[i]); i++;
                output.skirmisher = parseInt(modArray[i]); i++;
            };

            return output;
        }
        ;
    return {
        CreateAttributesArray: createAttributesArray,
        GetAttributeNames: getAttributeNames,
        GetAttributeAbrNames: getAttributeAbrNames,
        ConvertAttributesToArr: convertAttributesToArr,
        CreateRolesArray: createRolesArray
    };
}());

var FormatDefinitions = FormatDefinitions || (function () {
    'use strict';

    var
        createDictionary = function (modArray) {
            var output = new Dictionary();
            let definition = {};
            // create the groups dictionary
            for (let i = 0; i < modArray.length; i++) {
                if (output.has(modArray[i])) {
                    output[modArray[i]].descriptions.push(modArray[i]);
                }
                else {
                    definition = get(modArray[i]);
                    output.add(definition.name, definition);
                }
            }

            return output;
        },

        get = function (modArray) {

            var output = {
                name: "",
                group: "",
                descriptions: [],
                abbreviation: "",
                variable: "",
                formula: ""
            };

            if (modArray != undefined) {
                let i = 0;
                output.name = "" + modArray[i]; i++;
                output.group = "" + modArray[i]; i++;
                output.descriptions.push("" + modArray[i]); i++;
                output.abbreviation = "" + modArray[i]; i++;
                output.variable = "" + modArray[i]; i++;
                output.formula = "" + modArray[i]; i++;
            };

            return output;
        },

        getGroup = function (dictionary, group) {
            let output = [];
            dictionary.iterate(function (definition) {
                if (definition.group == group) {
                    output.push(definition);
                }
            });
            return output;
        },

        getVariable = function (dictionary, key) {
            return `attr_${dictionary.get(key).variable}`;
        },

        displayEntry = function (dictionary, key) {
            let output = "";
            let entryData = dictionary.get(key).descriptions;

            output += FormatCharacterSheetMain.Header(key);
            for (let i = 0; i < entryData.length; i++) {
                output += "\n" + FormatCharacterSheetMain.Desc(entryData[i]);
            }

            return output;
        },

        displayCollapsibleTitle = function (dictionary, key, fieldName) {
            let expandContents = "";
            let entryData = dictionary.get(key).descriptions;
            for (let i = 0; i < entryData.length; i++) {
                expandContents += "\n" + FormatCharacterSheetMain.Desc(entryData[i]);
            }

            let expandFieldName = `${fieldName}-expand`;

            let output = `${FormatCharacterSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
  ${FormatCharacterSheetMain.Header(key, "span")}
  ${FormatCharacterSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

            return FormatCharacterSheetMain.InteractionElement.Build(true, output);
        }
        ;
    return {
        CreateDictionary: createDictionary,
        Get: get,
        GetGroup: getGroup,
        GetVariable: getVariable,
        DisplayEntry: displayEntry,
        DisplayCollapsibleTitle: displayCollapsibleTitle
    }
}());

var FormatCharacterSheetSidebar = FormatCharacterSheetSidebar || (function () {
    'use strict';

    var
        build = function (contents) {
            return `<div class="wuxFloatSidebar">${contents}</div>`;
        },

        attributeSection = function (name, contents) {
            return `<div class="wuxDistinctSection wuxSizeInverse">
  <div class="wuxDistinctField">
  <span class="wuxDistinctSubtitle">${name}</span>
  <span class='wuxDistinctSubdata'>
  ${contents}
  </span>
  </div>
  </div>`;
        },

        collapsibleHeader = function (categoryName, sectionName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxHeader">${categoryName}</div>`, sectionName, contents, defaultOpen);
        },

        collapsibleSubheader = function (categoryName, sectionName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxSubheader">${categoryName}</div>`, sectionName, contents, defaultOpen);
        },

        collapsibleSection = function (titleContent, sectionName, contents, defaultOpen) {
            return `<div class="wuxInteractiveBlock wuxSizeTiny">
  ${collapsibleSectionTitle(titleContent, sectionName)}
  ${collapsibleSectionContent(contents, sectionName, defaultOpen)}
  
  
  </div>`;
        },

        collapsibleSectionTitle = function (titleContent, sectionName) {
            return `<div class="wuxInteractiveInnerBlock">
  <input class="wuxInteractiveContent-flag" type="checkbox" name="attr_${sectionName}-expandButton">
  <div class="wuxInteractiveContent">
  <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_${sectionName}-expandButton">
  <span class="wuxInteractiveIcon">&#9662;</span>
  <input type="hidden" class="wuxInteractiveIcon-flag" name="attr_${sectionName}-expandButton">
  <span class="wuxInteractiveAuxIcon">&#9656;</span>
  
  ${titleContent}
  </div>
  </div>`;
        },

        collapsibleSectionContent = function (contents, sectionName, defaultOpen) {
            return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="attr_${sectionName}-expandButton">
  <div class="${defaultOpen ? "wuxInteractiveExpandingAuxContent" : "wuxInteractiveExpandingContent"}">
  ${contents}
  </div>`;
        },

        buildPointsSection = function (attrName, header) {
            if (header == undefined) {
                header = `Build`;
            }
            let name = `Pts`;
            let output = `<span name='${attrName}' value="0">0</span>
  <span class="wuxFontSize7">/ </span>
  <span class="wuxFontSize7" name='${attrName}_max' value="0">0</span>`;

            return `<div class="wuxHeader">&nbsp;${header}</div>
  ${FormatCharacterSheetSidebar.AttributeSection(name, output)}`;
        }

        ;
    return {
        Build: build,
        AttributeSection: attributeSection,
        CollapsibleHeader: collapsibleHeader,
        CollapsibleSubheader: collapsibleSubheader,
        BuildPointsSection: buildPointsSection
    };
}());

var FormatCharacterSheetMain = FormatCharacterSheetMain || (function () {
    'use strict';

    var
        build = function (contents) {
            return `<div class="wuxMainContent">
  ${contents}
  </div>`;
        },

        tab = function (contents) {
            return `<div class="wuxTab">
  ${contents}
  </div>`;
        },

        collapsibleTab = function (sectionName, title, contents) {
            return `<div class="wuxSegment">
  <input class="wuxTab-flag" type="checkbox" name="attr_${sectionName}-expand" checked="checked">
  <div class="wuxTabHeader">
  <span class="wuxInnerHeader">
  <input type="hidden" class="wuxSectionExpandIcon-flag" name="attr_${sectionName}-expand">
  <span class="wuxSectionExpandIcon">&#9662;</span>
  <input type="hidden" class="wuxSectionExpandIcon-flag" name="attr_${sectionName}-expand">
  <span class="wuxSectionExpandAuxIcon">&#9656;</span>
  ${title}
  </span>
  </div>
  
  <div class="wuxTab">
  ${contents}
  </div>
  </div>`;
        },

        collapsibleSection = function (sectionName, title, contents) {
            return `<div class="wuxSectionBlock wuxLayoutItem">
  <input class="wuxSectionContent-flag" type="checkbox" checked="checked" name="attr_${sectionName}-expand" style="display: block">
  <div class="wuxSectionHeader">
  <input type="hidden" class="wuxSectionExpandIcon-flag" name="attr_${sectionName}-expand">
  <span class="wuxSectionExpandIcon">&#9662;</span>
  <input type="hidden" class="wuxSectionExpandIcon-flag" name="attr_${sectionName}-expand">
  <span class="wuxSectionExpandAuxIcon">&#9656;</span>
  <span>${title}</span>
  </div>
  <div class="wuxSectionHeaderFooter"></div>
  
  <div class="wuxSectionContent">
  ${contents}
  </div>
  </div>`;
        },

        // string formatting
        header = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxHeader">${contents}</${htmlType}>`;
        },

        header2 = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxHeader2">${contents}</${htmlType}>`;
        },

        subheader = function (contents, htmlType) {
            if (htmlType == undefined) {
                htmlType = "div";
            }
            return `<${htmlType} class="wuxSubheader">${contents}</${htmlType}>`;
        },

        desc = function (contents) {
            return `<span class="wuxDescription">${contents}</span>`;
        },

        input = function (type, fieldName, value, placeholder) {
            value = value == undefined ? "" : ` value="${value}"`;
            placeholder = placeholder == undefined ? "" : ` placeholder="${placeholder}"`;
            return `<input type="${type}" class="wuxInput" name="${fieldName}"${value}${placeholder} />`
        },

        select = function (fieldName, definitionGroup) {
            let output = `<select class="wuxInput" name="${fieldName}" value="0">`;
            output += `\n<option value="0">-</option>`;

            for (let i = 0; i < definitionGroup.length; i++) {
                output += `\n<option value="${definitionGroup[i].variable}">${definitionGroup[i].name}</option>`;
            }
            output += `\n</select>`;
            return output;
        },

        table = table || (function () {
            'use strict';

            var
                build = function (headers, data) {
                    let output = ``;
                    for (let i = 0; i < headers.length; i++) {
                        output += flextTableGroup(`${flexTableHeader(headers[i])}
  ${flexTableData(data[i])}
  `);
                    }
                    return flexTable(output);
                },

                flexTable = function (contents) {
                    return `<div class="wuxFlexTable">
  ${contents}
  </div>`;
                },

                flextTableGroup = function (contents) {
                    return `<div class="wuxFlexTableItemGroup">
  ${contents}
  </div>`;
                },

                flexTableHeader = function (data) {
                    return `<span class="wuxFlexTableItemHeader">${data}</span>`;
                },

                flexTableSubheader = function (data) {
                    return `<span class="wuxFlexTableItemSubheader">${data}</span>`;
                },

                flexTableData = function (data) {
                    return `<span class="wuxFlexTableItemData">${data}</span>`;
                },

                flexTableInput = function (type, fieldName, placeholder) {
                    return `<input type="${type}" class="wuxFlexTableItemData wuxSizeSmall" name="${fieldName}" placeholder="${placeholder}">`;
                }

            return {
                Build: build,
                FlexTable: flexTable,
                FlextTableGroup: flextTableGroup,
                FlexTableHeader: flexTableHeader,
                FlexTableSubheader: flexTableSubheader,
                FlexTableData: flexTableData,
                FlexTableInput: flexTableInput
            };
        }()),

        distinctSection = distinctSection || (function () {
            'use strict';
            var
                build = function (contents) {
                    return `<div class="wuxDistinctSection">${contents}</div>`;
                },

                field = function (title, contents) {
                    return `<div class="wuxDistinctField">
  <span class="wuxDistinctTitle">${title}</span>
  <span class="wuxDistinctData">${contents}</span>
  </div>`;
                },

                inputField = function (title, contentType, contentName, placeholder) {
                    return `<div class="wuxDistinctField">
  <span class="wuxDistinctTitle">${title}</span>
  <input class="wuxDistinctData" type="${contentType}" name="${contentName}" ${placeholder ? `placeholder="${placeholder}"` : ""}>
  </div>`;
                }
            return {
                Build: build,
                Field: field,
                InputField: inputField
            };
        }()),

        interactionElement = interactionElement || (function () {
            'use strict';
            var
                build = function (isExpanding, contents) {
                    return `<div class="wuxInteractiveBlock${isExpanding ? " wuxInteractiveExpandingBlock" : ""}">
  ${contents}
  </div>`;
                },

                expandableBlockIcon = function (fieldName) {
                    return `<div class="wuxInteractiveInnerExpandBlock">
  <input class="wuxInteractiveExpandingContent-flag" type="checkbox" name="${fieldName}">
  <input type="hidden" class="wuxInteractiveExpandIcon-flag" name="${fieldName}">
  <span class="wuxInteractiveExpandIcon">&#9662;</span>
  <input type="hidden" class="wuxInteractiveExpandIcon-flag" name="${fieldName}">
  <span class="wuxInteractiveExpandAuxIcon">&#9656;</span>
  </div>`;
                },

                expandableBlockEmptyIcon = function () {
                    return `<div class="wuxInteractiveInnerExpandBlock">
  <span class="wuxInteractiveExpandIcon">&nbsp;</span>
  </div>`;
                },

                expandableBlockContents = function (fieldName, contents) {
                    return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="${fieldName}">
  <div class="wuxInteractiveExpandingContent">
  ${contents}
  </div>`;
                },

                checkboxBlockIcon = function (fieldName, contents) {
                    return `<div class="wuxInteractiveInnerBlock">
  <input class="wuxInteractiveContent-flag" type="checkbox" name="${fieldName}">
  <div class="wuxInteractiveContent">
  <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
  <span class="wuxInteractiveIcon">&#9635;</span>
  <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
  <span class="wuxInteractiveAuxIcon">&#9634;</span>
  <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
  ${contents}
  </div>
  </div>`;
                }

            return {
                Build: build,
                ExpandableBlockIcon: expandableBlockIcon,
                ExpandableBlockEmptyIcon: expandableBlockEmptyIcon,
                ExpandableBlockContents: expandableBlockContents,
                CheckboxBlockIcon: checkboxBlockIcon
            }
        }())


        ;
    return {
        Build: build,
        Tab: tab,
        CollapsibleTab: collapsibleTab,
        CollapsibleSection: collapsibleSection,
        Header: header,
        Header2: header2,
        Subheader: subheader,
        Desc: desc,
        Input: input,
        Select: select,
        Table: table,
        DistinctSection: distinctSection,
        InteractionElement: interactionElement
    };
}());

var FormatCharacterSheetNavigation = FormatCharacterSheetNavigation || (function () {
    'use strict';

    var

        buildSection = function (contents) {
            return `<div class="wuxFloatHeader wuxStickyHeader">
  <div class="wuxSectionBlock wuxLargeLayoutItem">
  ${contents}
  </div>
  </div>`;
        },

        buildCharacterCreationSplit = function (mainContents, characterCreationContents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="attr_finishedCharacterCreation" value="0">
  <div class="wuxHiddenBlockField">
  ${mainContents}
  </div>
  <input type="hidden" class="wuxHiddenField-flag" name="attr_finishedCharacterCreation" value="0">
  <div class="wuxHiddenBlockAuxField">
  ${characterCreationContents}
  </div>`;
        },

        buildStickySideTab = function (contents) {
            return `<div class="wuxStickySideTab">
  ${contents}
  </div>`;
        },

        buildTabButtonRow = function (contents) {
            return `<div class="wuxTabButtonRow">
  ${contents}
  </div>`;
        },

        buildTabButton = function (type, fieldName, value, name, isSelected, buttonClasses) {
            return `<div class="wuxTabButton ${isSelected ? "wuxTabButtonSelected" : ""}">
  <input type="${type}" class="wuxTabButton ${buttonClasses}" name="${fieldName}" value="${value}"><span>${name}</span>
  </div>`;
        },

        buildTabs = function (sheetName, fieldName, tabNames) {
            let output = "";
            for (let i = 0; i < tabNames.length; i++) {
                output += buildTabButton("radio", fieldName, tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
            }
            output = buildTabButtonRow(output);

            return output;
        },

        buildHeader = function (header, subheader) {
            return `<div class="wuxHeader2">${subheader}</div>
  <div class="wuxHeader">${header}</div>`;
        },

        buildTechniquesNavigation = function () {
            let sideBarContents = buildTabs("Learn", "attr_tab-techniques", ["Active", "Slot", "Learn"]);
            let mainContents = buildMainPageTabs("Techniques", sideBarContents);
            let characterCreationContents = buildCharacterCreationNavigation("Techniques");
            let output = buildCharacterCreationSplit(mainContents, characterCreationContents);

            return buildSection(output);
        },

        buildMainPageTabs = function (sheetName, sideBarButtons) {
            let mainContents = "";
            mainContents += buildTabs(sheetName, "attr_tab-characterSheet", ["Gear", "Techniques", "Chat", "Character"]);
            mainContents += sideBarButtons;
            mainContents += buildMainSheetHeader();

            return mainContents;
        },

        buildMainSheetHeader = function () {
            let header = `<input type="text" name="attr_nickname" placeholder="Display Name" />`;
            let subheader = `<span>Lv.</span>
  <span name="attr_base_level">1</span>
  <span style="width: 5px;">&nbsp;</span>
  <span class="wuxFullName" name="attr_full_name" placeholder="Full Name"></span>`;
            return buildHeader(header, subheader);
        },

        buildOriginPageNavigation = function (sheetName) {
            return buildSection(buildCharacterCreationNavigation(sheetName));
        },

        buildTrainingPageNavigation = function (sheetName) {
            let mainContents = "";
            mainContents += buildTabs(sheetName, "attr_tab-training", ["Knowledge", "Skills", "Training"]);
            mainContents += buildExitStickyButtons("attr_tab-training");
            mainContents += buildHeader("Training", sheetName);

            let characterCreationContents = buildCharacterCreationNavigation(sheetName);
            let output = buildCharacterCreationSplit(mainContents, characterCreationContents);
            return buildSection(output);
        },

        buildAdvancementPageNavigation = function (sheetName) {
            let mainContents = "";
            mainContents += buildTabs(sheetName, "attr_tab-advancement", ["Attributes", "Jobs", "Advancement"]);
            mainContents += buildExitStickyButtons("attr_tab-advancement");
            mainContents += buildHeader("Advancement", sheetName);

            let characterCreationContents = buildCharacterCreationNavigation(sheetName);
            let output = buildCharacterCreationSplit(mainContents, characterCreationContents);
            return buildSection(output);
        },

        buildCharacterCreationNavigation = function (sheetName) {
            let output = "";
            output += buildCharacterCreationTabs(sheetName);
            output += buildExitStickyButtons("attr_tab-characterCreation");
            output += buildHeader("Character Creation", sheetName);
            return output;
        },

        buildCharacterCreationTabs = function (sheetName) {
            let output = "";
            let fieldName = "attr_page-characterCreation";
            let tabNames = ["Techniques", "Attributes", "Knowledge", "Skills", "Jobs", "Origin"];

            for (let i = 0; i < tabNames.length; i++) {
                output += buildTabButton("radio", fieldName, tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
            }
            output = buildTabButtonRow(output);

            return output;
        },

        buildExitStickyButtons = function (fieldName) {
            let output = "";
            output += buildTabButton("checkbox", `${fieldName}-exit`, "Exit", "Exit", false, "") + "\n";
            output += buildTabButton("checkbox", `${fieldName}-finish`, "Finish", "Finish", false, "") + "\n";
            output = buildTabButtonRow(output);

            return buildStickySideTab(output);
        }
        ;
    return {
        BuildOriginPageNavigation: buildOriginPageNavigation,
        BuildTechniquesNavigation: buildTechniquesNavigation,
        BuildTrainingPageNavigation: buildTrainingPageNavigation,
        BuildAdvancementPageNavigation: buildAdvancementPageNavigation
    };

}());

var FormatCharacterSheet = FormatCharacterSheet || (function () {
    'use strict';

    var
        setDisplayStyle = function (sectionName, contents) {
            return `<div class="wuxCharacterSheetDisplayStyle-${sectionName}">
  ${contents}
  </div>`;
        }
        ;
    return {
        SetDisplayStyle: setDisplayStyle
    };
}());

var FormatCharacterSheetBackend = FormatCharacterSheetBackend || (function () {
    'use strict';

    var
        createSheetWorker = function (variables, contents, hasEvents) {
            let output = "";
            for (let i = 0; i < variables.length; i++) {
                if (output != "") {
                    output += " ";
                }
                output += `change:${variables[i]}`;
            }
            return `on("${output}", function (${hasEvents != undefined ? "eventinfo" : ""}) {
  ${contents}
  });
  `;
        }
        ;
    return {
        CreateSheetWorker: createSheetWorker
    };
}());











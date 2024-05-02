function SetTechniquesDatabase(standardArr, heroArr, creatureArr, jobArr, roleArr, aptitudeArr) {
  return PrintLargeEntry(
    JSON.stringify(
      FormatTechniques.SetTechniquesDatabase(standardArr, heroArr, creatureArr, jobArr, roleArr, aptitudeArr)
    ), "t"
  );
}

var FormatTechniques = FormatTechniques || (function() {
    'use strict';

    var 
        setTechniquesDatabase = function(standardArr, heroArr, creatureArr, jobArr, roleArr, aptitudeArr) {
          var techDictionary = CreateDictionary();
          techDictionary.add("Standard", getTechniqueGroupData(standardArr, "Standard"));
          techDictionary.add("Hero", getTechniqueGroupData(heroArr, "Hero"));
          techDictionary.add("Creature", getTechniqueGroupData(creatureArr, "Creature"));
          techDictionary.add("Job", getTechniqueGroupData(jobArr, "Job"));
          techDictionary.add("Role", getTechniqueGroupData(roleArr, "Role"));
          techDictionary.add("Aptitude", getTechniqueGroupData(aptitudeArr, "Aptitude"));
          return techDictionary;
        },

        parseTechniquesDatabase = function(techniqueDatabaseData) {
          let output = "";
          for (let i = 0; i < techniqueDatabaseData.length; i++) {
            output += techniqueDatabaseData[i];
          }
          return JSON.parse(output);
        },

        setAugmentTechnique = function(augmentTechnique, baseTechnique) {
        
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
            augmentTechnique.prerequisite.wr = setAugmentTechValue(augmentTechnique.prerequisite.wr, baseTechnique.prerequisite.wr);
            augmentTechnique.prerequisite.tl = setAugmentTechValue(augmentTechnique.prerequisite.tl, baseTechnique.prerequisite.tl);
            augmentTechnique.prerequisite.ac = setAugmentTechValue(augmentTechnique.prerequisite.ac, baseTechnique.prerequisite.ac);
            augmentTechnique.prerequisite.mg = setAugmentTechValue(augmentTechnique.prerequisite.mg, baseTechnique.prerequisite.mg);
            augmentTechnique.prerequisite.br = setAugmentTechValue(augmentTechnique.prerequisite.br, baseTechnique.prerequisite.br);
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

        setAugmentTechValue = function(augmentValue, baseValue) {
          if (augmentValue == "-") {
            return "";
          }
          else if (augmentValue == "") {
            return baseValue;
          }
          return augmentValue;
        },

        getTechniqueGroupData = function(modArray, source) {
          var output = CreateDictionary();
          var technique = {};
          for (var i = 0; i < modArray.length; i++) {
            technique = CreateFeatureData(modArray[i], source);

            if (technique.augmentBase != "" && output.has(technique.augmentBase)) {
              output.values[technique.augmentBase].augments.push(technique);
            }
            else {
              output.add(technique.name, technique);
            }
          }

          return output;
        },

        getTechniqueGroupDataByAction = function(modArray, source) {
          var output = CreateArrayDataObject();
          
          var technique = {};
          var groupName = "";
          var groupIndex = 0;
          var techniqueIndex = 0;
          for (var i = 0; i < modArray.length; i++) {
            technique = CreateFeatureData(modArray[i], source);
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

        createTechniqueFilterData = function() {
          let filterData = {
            uniqueSource: CreateDictionary(),
            uniqueGroup: CreateDictionary(),
            uniqueType: CreateDictionary(),
            uniqueAction: CreateDictionary(),
            uniqueTraits: CreateDictionary(),
            uniqueReqWeapon: CreateDictionary(),
            uniqueBranch: CreateDictionary(),
            uniqueSkill: CreateDictionary(),
            uniqueDefense: CreateDictionary(),
            uniqueRange: CreateDictionary(),
            includeBaseSource: CreateDictionary(),
            includeBaseGroup: CreateDictionary(),
            includeBaseType: CreateDictionary(),
            includeBaseAction: CreateDictionary(),
            includeBaseTraits: CreateDictionary(),
            includeBaseReqWeapon: CreateDictionary(),
            includeBaseBranch: CreateDictionary(),
            includeBaseSkill: CreateDictionary(),
            includeBaseDefense: CreateDictionary(),
            includeBaseRange: CreateDictionary(),

            add: function(technique) {

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

            sort: function() {
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

            addSource: function(technique) {
              let key = technique.techniqueSource;
              this.addTechnique([this.uniqueSource, this.includeBaseSource], key, technique);
              for (let i = 0; i < technique.augments.length; i++) {
                this.augmentCheck(technique, technique.augments[i], this.uniqueSource, this.includeBaseSource, key, technique.augments[i].techniqueSource);
              }
            },

            addGroup: function(technique) {
              let key = technique.techniqueGroup;
              this.addTechnique([this.uniqueGroup, this.includeBaseGroup], key, technique);
              for (let i = 0; i < technique.augments.length; i++) {
                this.augmentCheck(technique, technique.augments[i], this.uniqueGroup, this.includeBaseGroup, key, technique.augments[i].techniqueGroup);
              }
            },

            addType: function(technique) {
              let key = technique.techniqueType;
              this.addTechnique([this.uniqueType, this.includeBaseType], key, technique);
              for (let i = 0; i < technique.augments.length; i++) {
                this.augmentCheck(technique, technique.augments[i], this.uniqueType, this.includeBaseType, key, technique.augments[i].techniqueType);
              }
            },

            addAction: function(technique) {
              let key = technique.action;
              this.addTechnique([this.uniqueAction, this.includeBaseAction], key, technique);
              for (let i = 0; i < technique.augments.length; i++) {
                this.augmentCheck(technique, technique.augments[i], this.uniqueAction, this.includeBaseAction, key, technique.augments[i].action);
              }
            },

            addTrait: function(technique) {

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

            addreqWeapon: function(technique) {
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

            addbranch: function(technique) {
              let items = technique.prerequisite.br.split(";");
              let item = "";
              for (let j = 0; j < items.length; j++) {
                  item = items[j].trim();
                  this.addTechnique([this.uniqueBranch, this.includeBaseBranch], item, technique);
              }
              
              if (Array.isArray(technique.augments)) {
                for (let i = 0; i < technique.augments.length; i++) {

                  if (technique.augments[i].prerequisite != undefined) {
                    items = technique.augments[i].prerequisite.br.split(";");
                    for (let j = 0; j < items.length; j++) {
                        item = items[j].trim();
                        this.augmentCheck(technique, technique.augments[i], this.uniqueBranch, this.includeBaseBranch, "", item);
                    }
                  }
                }
              }
            },

            addSkill: function(technique) {
              let key = technique.skill;
              this.addTechnique([this.uniqueSkill, this.includeBaseSkill], key, technique);
              for (let i = 0; i < technique.augments.length; i++) {
                this.augmentCheck(technique, technique.augments[i], this.uniqueSkill, this.includeBaseSkill, key, technique.augments[i].skill);
              }
            },

            addDefense: function(technique) {
              let key = technique.defense;
              this.addTechnique([this.uniqueDefense, this.includeBaseDefense], key, technique);
              for (let i = 0; i < technique.augments.length; i++) {
                this.augmentCheck(technique, technique.augments[i], this.uniqueDefense, this.includeBaseDefense, key, technique.augments[i].defense);
              }
            },

            addRange: function(technique) {
              let key = technique.rType;
              this.addTechnique([this.uniqueRange, this.includeBaseRange], key, technique);
              for (let i = 0; i < technique.augments.length; i++) {
                this.augmentCheck(technique, technique.augments[i], this.uniqueRange, this.includeBaseRange, key, technique.augments[i].rType);
              }
            },

            dictionaryCheck: function(dictionary, key) {
              if (!dictionary.has(key)) {
                dictionary.add(key, []);
              }
            },

            addTechnique: function(dictionaries, key, technique) {
              if (key != "") {
                for (let i = 0; i < dictionaries.length; i++) {
                  this.dictionaryCheck(dictionaries[i], key);
                  if (!dictionaries[i].get(key).includes(technique.name)) {
                    dictionaries[i].get(key).push(technique.name);
                  }
                }
              }
            },

            augmentCheck: function(baseTechnique, technique, branchDictionary, includeBaseDictionary, mainKey, compareKey) {
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

        iterateOverTechArrays = function(data, callback, techniqueDatabase, sources) {
          let techData;
          for(let i = 0; i < sources.length; i++) {
            techData = CreateDictionary();
            techData.importJson(techniqueDatabase.values[sources[i]]);
            data = callback(data, techData);
          }
          return data;
        },

        getTechFilterData = function(techniqueDatabaseData, sources) {
          // create tech data
          let data = createTechniqueFilterData();
          let techniqueDatabase = parseTechniquesDatabase(techniqueDatabaseData);
          data = iterateOverTechArrays(data, createTechFilterData, techniqueDatabase, sources);
          return data;
        },

        createTechFilterData = function (techFilterData, techData) {

          techData.iterate(function(technique) {
            techFilterData.add(technique);
          });

          return techFilterData;
        },

        getTechDatabaseData = function(techniqueDatabaseData, sources) {
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

          techData.iterate(function(technique) {
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

var DisplayTechniqueHtml = DisplayTechniqueHtml || (function() {
    'use strict';

    var 
        getDisplayOptions = function() {
          return {
            sectionName: "",
            hasCSS: false,
            hasUseInteraction: false,
            showSelect: false,
            showTrigger: false,
            showKiCharge: false
          }
        },

        get = function(technique, displayOptions) {
          if (displayOptions == undefined) {
            displayOptions = getDisplayOptions();
            displayOptions.hasCSS = true;
          }
          let techDisplayData = FeatureService.GetTechniqueDisplayData(technique);
          return setTechniqueDisplayHtml(techDisplayData, displayOptions);
        },

        setTechniqueDisplayHtml = function(techDisplayData, displayOptions) {
          let output = "";
          output += setTechniqueDisplayHeader(techDisplayData, displayOptions);
          output += setTechniqueDisplayExpandData(techDisplayData, displayOptions);

          return setTechniqueDisplayFeatureDiv(techDisplayData, displayOptions, output);
        },

        setTechniqueDisplayFeatureDiv = function(techDisplayData, displayOptions, contents) {

          let prequel = "";
          if (displayOptions.showSelect) {
            prequel = `<input type="hidden" class="wuxFeature-flag"name="attr_${displayOptions.sectionName}-select-${techDisplayData.fieldName}">`;
          }

          return `${prequel}<div ${setFeatureStyle("wuxFeature", displayOptions)}>${contents}</div>\n`;
        },

        setTechniqueDisplayHeader = function(techDisplayData, displayOptions) {
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

        setTechniqueDisplayHeaderSlotBox = function(techDisplayData, displayOptions) {
          let slotStyling = ["wuxFeatureType", `wuxFeatureType-${techDisplayData.slotType}`];
          if (techDisplayData.slotIsPath) {
            slotStyling.push("wuxFeatureType-IsPath");
          }
          return `<div ${setFeatureStyle(slotStyling, displayOptions)}>
            <span ${setFeatureStyle("wuxFeatureTypeHeader", displayOptions)}>${techDisplayData.slotSource}</span>
            <span ${setFeatureStyle("wuxFeatureTypeFooter", displayOptions)}>${techDisplayData.slotFooter}</span>
          </div>`;
        },

        setTechniqueDisplayHeaderExpandSection = function(techDisplayData, displayOptions) {
          if (displayOptions.hasCSS) {
            // add the collapsible field
            return `<div class="wuxFeatureHeaderInteractBlock">
              <div class="wuxFeatureHeaderInteractInnerBlock">
                <input class="wuxFeatureHeaderInteractBlock-flag" type="checkbox" name="attr_${displayOptions.sectionName}-expand-${techDisplayData.fieldName}">
                <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="attr_${displayOptions.sectionName}-expand-${techDisplayData.fieldName}">
                <span class="wuxFeatureHeaderInteractiveIcon">&#9662;</span>
                <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="attr_${displayOptions.sectionName}-expand-${techDisplayData.fieldName}">
                <span class="wuxFeatureHeaderInteractiveAuxIcon">&#9656;</span>
              </div>
            </div>`;
          }
          return "";
        },

        setTechniqueDisplayHeaderSelectSection = function(techDisplayData, displayOptions) {
          if (displayOptions.showSelect) {
            return `<div class="wuxTechniqueDisplayStyle-Learn>"
                <div class="wuxFeatureHeaderInteractBlock">
                  <input class="wuxFeatureHeaderInteractBlock-flag" type="checkbox" name="attr_${displayOptions.sectionName}-select-${techDisplayData.fieldName}">
                  <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="attr_${displayOptions.sectionName}-select-${techDisplayData.fieldName}">
                  <span class="wuxFeatureHeaderInteractiveIcon">&#9635;</span>
                  <input type="hidden" class="wuxFeatureHeaderInteractiveIcon-flag" name="attr_${displayOptions.sectionName}-select-${techDisplayData.fieldName}">
                  <span class="wuxFeatureHeaderInteractiveAuxIcon">&#9634;</span>
                </div>
              </div>`;
          }
          return "";
        },

        setTechniqueDisplayHeaderUseSection = function(techDisplayData, displayOptions) {

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

        setTechniqueDisplayHeaderNameFields = function(techDisplayData, displayOptions) {
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

        setTechniqueDisplayHeaderExtentFeatures = function(techDisplayData, displayOptions) {
          if (displayOptions.showSelect && techDisplayData.prerequisite != "") {
            return `<div class="wuxTechniqueDisplayStyle-Learn>
                <div class="wuxFeatureHeaderInfoPrereq">
                  <span><strong>Prerequisites: </strong></span>
                  <span>${techDisplayData.prerequisite}</span>
                </div>
              </div>`;
          }
          return "";
        },

        setTechniqueDisplayExpandData = function(techDisplayData, displayOptions) {
          let output = "";

          output += setTechniqueDisplayFunctionBlock(techDisplayData, displayOptions);
          output += setTechniqueDisplayCheckBlock(techDisplayData, displayOptions);
          output += setTechniqueDisplayDescriptionBlock(techDisplayData, displayOptions);

          if (displayOptions.hasCSS) {
            return `<input type="hidden" class="wuxFeatureHeaderInteractBlock-flag" name="attr_${displayOptions.sectionName}-expand-${techDisplayData.fieldName}">
            <div class="wuxFeatureExpandingContent">
              ${output}
            </div>`;
          }
          else {
            return output;
          }
        },

        setTechniqueDisplayFunctionBlock = function(techDisplayData, displayOptions) {

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

        setTechniqueDisplayFunctionBlockLine = function(dataObject, sectionName, displayOptions) {
          if (dataObject != "") {
            return `<div ${setFeatureStyle("wuxFeatureFunctionBlockRow", displayOptions)}>
              <span><strong>${sectionName}: </strong></span>
              <span>${dataObject}</span>
            </div>
            `;
          }
          return "";
        },

        setTechniqueDisplayFunctionBlockTraits = function(techDisplayData, displayOptions) {
          if (techDisplayData.traits.length > 0) {
            let traitsData = "";
            for(var i = 0; i < techDisplayData.traits.length; i++) {
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

        setTechniqueDisplayCheckBlock = function(techDisplayData, displayOptions) {

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

        setTechniqueDisplayCheckBlockTarget = function(techDisplayData, displayOptions) {
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

        setTechniqueDisplayCheckBlockLine = function(dataObject, sectionName, displayOptions) {
          if (dataObject != "") {
            return `<div ${setFeatureStyle("wuxFeatureCheckBlockRow", displayOptions)}>
              <span><strong>${sectionName}: </strong></span>
              <span>${dataObject}</span>
            </div>
            `;
          }
          return "";
        },

        setTechniqueDisplayDescriptionBlock = function(techDisplayData, displayOptions) {

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

        setTechniqueDisplayDescriptionBlockLine = function(dataObject, displayOptions) {
          if (dataObject != "") {
            return `<div>
              <span ${setFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions)}>${FormatBlock(dataObject)}</span>
            </div>
            `;
          }
          return "";
        },

        setTechniqueDisplayDescriptionBlockOnHit = function(techDisplayData, displayOptions) {
          if (techDisplayData.onHit != "") {
            return `<div>
              <strong ${setFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions)}>On Hit: </strong>
              <span ${setFeatureStyle("wuxFeatureDescriptionBlockDesc", displayOptions)}>${FormatBlock(techDisplayData.onHit)}</span>
            </div>
            `;
          }
          return "";
        },

        setTechniqueDisplayDescriptionBlockSurge = function(techDisplayData, displayOptions) {
          if (displayOptions.showKiCharge && techDisplayData.technique.tEffect.indexOf("Surge") >= 0) {
            return `<div>
              <span><strong>Ki Charge: </strong></span>
              <span name="attr_kiCharge_max" value="0">0</span>
            </div>`;
          }
          return "";
        },

        setFeatureStyle = function(style, displayOptions) {
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
          else {if (Array.isArray(style)) {
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

        getFeatureStyleSheetStyle = function(style) {
          switch(style){
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

var FormatSkills = FormatSkills || (function() {
    'use strict';

    var
      createSkillsDictionary = function(modArray) {
        var output = CreateDictionary();
        var skill = {};
        var data = [];

        // create the groups dictionary
        let groups = getSkillGroupList();
        for (let i = 0; i < groups.length; i++) {

          // populate the groups
          data = [];
          for (let j = 0; j < modArray.length; j++) {
            skill = createSkillsData(modArray[j]);
            if (skill.group == groups[i]) {
              data.push(skill);
            }
          }
          output.add(groups[i], data);
        }
        
        return output;
      },

      createSkillsData = function(modArray) {

        var output = {
          name: "",
          group: "",
          abilityScore: "",
          description: "",
        };
        
        if (modArray != undefined) {
          let i = 0;
          output.name = "" + modArray[i]; i++;
          output.group = ""  + modArray[i]; i++;
          output.abilityScore = ""  + modArray[i]; i++;
          output.description = ""  + modArray[i]; i++;
        };

        return output;
      },

      getSkillGroupList = function() {
        return ["Athletics", "Combat", "Focus", "Social", "Technical"];
      }
    ;
    return {
      CreateSkillsDictionary: createSkillsDictionary,
      GetSkillGroupList: getSkillGroupList
    };
}());

var FormatKnowledge = FormatKnowledge || (function() {
    'use strict';

    var
      createLanguageDictionary = function(modArray) {
        var output = CreateDictionary();
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

      createLanguageData = function(modArray) {

        var output = {
          name: "",
          group: "",
          location: "",
          description: "",
        };
        
        if (modArray != undefined) {
          let i = 0;
          output.name = "" + modArray[i]; i++;
          output.group = ""  + modArray[i]; i++;
          output.location = ""  + modArray[i]; i++;
          output.description = ""  + modArray[i]; i++;
        };

        return output;
      },

      createLoreDictionary = function(modArray) {
        var output = CreateDictionary();
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

      createLoreData = function(modArray) {

        var output = {
          name: "",
          group: "",
          description: "",
        };
        
        if (modArray != undefined) {
          let i = 0;
          output.name = "" + modArray[i]; i++;
          output.group = ""  + modArray[i]; i++;
          output.description = ""  + modArray[i]; i++;
        };

        return output;
      },

      getLanguageGroupList = function() {
        return ["Walthair", "Aridsha", "Khem", "Colswei", "Ceres", "Special"];
      },

      getLoreGroupList = function() {
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

var FormatJobs = FormatJobs || (function() {
    'use strict';

    var
      createDictionary = function(modArray) {
        var output = CreateDictionary();
        var job = {};
        var data = [];

        // create the groups dictionary
        let groups = getGroupList();
        for (let i = 0; i < groups.length; i++) {

          // populate the groups
          data = [];
          for (let j = 0; j < modArray.length; j++) {
            job = get(modArray[j]);
            if (job.group == groups[i] && job.name != "") {
              data.push(job);
            }
          }
          output.add(groups[i], data);
        }
        
        return output;
      },

      get = function(modArray) {

        var output = {
          name: "",
          group: "",
          description: "",
          attributes: {},
          roles: {},
          aptitudes: {},
          prereq: "",
          techniques: []
        };
        
        if (modArray != undefined) {
          let i = 0;
          output.name = "" + modArray[i]; i++;
          output.group = ""  + modArray[i]; i++;
          output.description = ""  + modArray[i]; i++;
          output.attributes = FormatStatBlock.CreateAttributesArray(modArray, i); i+=7;
          output.roles = FormatStatBlock.CreateRolesArray(modArray, i); i+=2;
          output.prereq = "" + modArray[i]; i++;
          output.techniques = createJobTechnique(modArray, i); i++;
        };

        return output;
      },
      
      createJobTechnique = function(modArray, startingIndex) {
        var output = [];
        let i = startingIndex;
        let data = "";
        let dataSplit = {};
        while (true) {
          data = "" + modArray[i];
          if (data = "") {
            break;
          }
          dataSplit = data.split(";");
          output.push({name:dataSplit[0], level:dataSplit[1]});
        }
        return output;
      },

      getGroupList = function() {
        return ["Athletics", "Combat", "Focus", "Social", "Technical"];
      }
    ;
    return {
      CreateDictionary: createDictionary,
      Get: get,
      GetGroupList: getGroupList
    };
}());

var FormatStatBlock = FormatStatBlock || (function() {
    'use strict';

    var
      createAttributesArray = function(modArray, startingIndex) {

        var output = {
          bod: 0,
          prc: 0,
          qck: 0,
          awr: 0,
          int: 0,
          rsn: 0
        };
        
        if (modArray != undefined) {
          let i = startingIndex;
          output.bod = "" + modArray[i]; i++;
          output.prc = "" + modArray[i]; i++;
          output.qck = "" + modArray[i]; i++;
          output.awr = "" + modArray[i]; i++;
          output.int = "" + modArray[i]; i++;
          output.rsn = "" + modArray[i]; i++;
        };

        return output;
      },

      getAttributeNames = function() {
        return ["Body", "Precision", "Quickness", "Awareness", "Intuition", "Reason"];
      },

      getAttributeAbrNames = function() {
        return ["BOD", "PRC", "QCK", "AWR", "INT", "RSN"];
      },
      
      createRolesArray = function(modArray, startingIndex) {

        var output = {
          athlete: 0,
          defender: 0
        };
        
        if (modArray != undefined) {
          let i = startingIndex;
          output.athlete = "" + modArray[i]; i++;
          output.defender = "" + modArray[i]; i++;
        };

        return output;
      }
    ;
    return {
      CreateAttributesArray: createAttributesArray,
      GetAttributeNames: getAttributeNames,
      GetAttributeAbrNames: getAttributeAbrNames,
      CreateRolesArray: createRolesArray
    };
}());

var FormatCharacterSheetSidebar = FormatCharacterSheetSidebar || (function() {
    'use strict';

    var
      build = function (contents) {
        return `<div class="wuxFloatSidebar">${contents}</div>`;
      },

      attributeSection = function(name, contents) {
        return `<div class="wuxDistinctSection wuxSizeInverse">
            <div class="wuxDistinctField">
              <span class="wuxDistinctSubtitle">${name}</span>
              <span class='wuxDistinctSubdata'>
                ${contents}
              </span>
            </div>
          </div>`;
      },

      collapsibleHeader = function(categoryName, sectionName, contents, defaultOpen) {
        return collapsibleSection(`<div class="wuxHeader">${categoryName}</div>`, sectionName, contents, defaultOpen);
      },

      collapsibleSubheader = function(categoryName, sectionName, contents, defaultOpen) {
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
      }

    ;
    return {
        Build: build,
        AttributeSection: attributeSection,
        CollapsibleHeader: collapsibleHeader,
        CollapsibleSubheader: collapsibleSubheader
    };
}());

var FormatCharacterSheetMain = FormatCharacterSheetMain || (function() {
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

      header = function(contents) {
        return `<div class="wuxHeader">${contents}</div>`;
      },

      desc = function(contents) {
        return `<span class="wuxDescription">${contents}</span>`;
      },

      table = function(headers, data) {
        let tableData = ``;
        for (let i = 0; i < headers.length; i++) {
          tableData += `<div class="wuxFlexTableItemGroup">
            <span class="wuxFlexTableItemHeader">${headers[i]}</span>
            <span class="wuxFlexTableItemData">${data[i]}</span>
          </div>
          `;
        }
        return `<div class="wuxFlexTable">
          ${tableData}
        </div>`;
      }
    ;
    return {
        Build: build,
        Tab: tab,
        CollapsibleSection: collapsibleSection,
        Header: header,
        Desc: desc,
        Table: table
    };
}());

var FormatCharacterSheetBackend = FormatCharacterSheetBackend || (function() {
    'use strict';

    var
      createSheetWorker = function(variables, contents, hasEvents) {
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











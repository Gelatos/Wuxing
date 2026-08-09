var WuxSheetMain = WuxSheetMain || (function () {
    const sectionBlockHeaderFooter = function () {
        return `<div class="wuxSectionHeaderFooter"></div>`;
    };
    const customInput = function (type, fieldName, className, extras) {
        if (extras == undefined) {
            extras = "";
        }
        return `<input type="${type}" class="${className}" name="${fieldName}"${extras} />`
    };

    var interactionElement = interactionElement || (function () {
        'use strict';
        var
            build = function (isExpanding, contents) {
                return `<div class="wuxInteractiveBlock${isExpanding ? " wuxInteractiveExpandingBlock" : ""}">\n${contents}\n</div>`;
            },

            buildCheckboxInput = function (fieldName, contents) {
                return `<div class="wuxInteractiveBlock">
                ${checkboxBlockIcon(fieldName, contents)}
                </div>`;
            },

            buildTooltipCheckboxInput = function (fieldName, infoFieldName, contents, infoContents) {

                return `<div class="wuxInteractiveBlock wuxTooltip">
                <span class="wuxTooltipText">${checkboxBlockIcon(fieldName, contents)}</span>
                <div class="wuxTooltipContent">\n${infoContents}\n</div>
                </div>`;
            },

            buildTooltipRadioInput = function (fieldName, infoFieldName, value, contents, infoContents) {
                return `<div class="wuxInteractiveBlock">
                ${WuxSheetMain.Info.Button(infoFieldName)}
                ${radioBlockIcon(fieldName, value, contents)}
                ${WuxSheetMain.HiddenField(infoFieldName, `<div class="wuxInfoContent">\n${infoContents}\n</div>`)}
                </div>`;
            },

            buildTooltipSelectInput = function (fieldName, infoFieldName, definitionGroup, showEmpty, className, contents, infoContents) {
                return `<div class="wuxInteractiveBlock">
                ${WuxSheetMain.Info.Button(infoFieldName)}
                ${select(fieldName, definitionGroup, showEmpty, className)}
                <div class="wuxInteractiveSelectContent">
                ${contents}
                </div>
                ${WuxSheetMain.HiddenField(infoFieldName, `<div class="wuxInfoContent">\n${infoContents}\n</div>`)}
                </div>`;

            },

            expandableBlockIcon = function (fieldName) {
                let flagName = "wuxInteractiveExpandIcon-flag";
                return `<div class="wuxInteractiveInnerExpandBlock">\n${customInput("checkbox", fieldName, "wuxInteractiveExpandingContent-flag")}
                ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveExpandIcon">&#9662;</span>
                ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveExpandAuxIcon">&#9656;</span>
                </div>`;
            },

            expandableBlockEmptyIcon = function () {
                return `<div class="wuxInteractiveInnerExpandBlock">\n<span class="wuxInteractiveExpandIcon">&nbsp;</span>\n</div>`;
            },

            innerBlock = function (contents) {
                return `<div class="wuxInteractiveInnerBlock">\n${contents}\n</div>`;
            },

            expandableBlockContents = function (fieldName, contents) {
                return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="${fieldName}">\n<div class="wuxInteractiveExpandingContent">\n${contents}\n</div>`;
            },

            checkboxBlockIcon = function (fieldName, contents, extras) {
                let flagName = "wuxInteractiveIcon-flag";
                return `<div class="wuxInteractiveInnerBlock">
                ${customInput("checkbox", fieldName, "wuxInteractiveContent-flag", extras)}
                    <div class="wuxInteractiveContent">
                    ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveIcon">&#9635;</span>
                    ${customInput("hidden", fieldName, flagName)}\n<span class="wuxInteractiveAuxIcon">&#9634;</span>
                    ${customInput("hidden", fieldName, flagName)}\n${contents != undefined ? contents : ""}
                    </div>
                </div>`;
            },

            radioBlockIcon = function (fieldName, value, contents) {
                let flagName = "wuxInteractiveIcon-flag";
                return `<div class="wuxInteractiveInnerBlock">
                ${customInput("radio", fieldName, "wuxInteractiveContent-flag", ` value="${value}"`)}
                    <div class="wuxInteractiveContent">
                    ${customInput("radio", fieldName, "wuxInput", ` value="${value}"`)}
                    ${customInput("hidden", fieldName, flagName)}\n${contents != undefined ? contents : ""}
                    </div>
                </div>`;
            }

        return {
            Build: build,
            BuildCheckboxInput: buildCheckboxInput,
            BuildTooltipCheckboxInput: buildTooltipCheckboxInput,
            BuildTooltipRadioInput: buildTooltipRadioInput,
            BuildTooltipSelectInput: buildTooltipSelectInput,
            ExpandableBlockIcon: expandableBlockIcon,
            ExpandableBlockEmptyIcon: expandableBlockEmptyIcon,
            InnerBlock: innerBlock,
            ExpandableBlockContents: expandableBlockContents,
            CheckboxBlockIcon: checkboxBlockIcon,
            RadioBlockIcon: radioBlockIcon
        }
    }());
    'use strict';

    const build = function (contents) {
            return `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}" />
        <div class="wuxMainContent">
        <div class="wuxMainContentScroll">
        ${contents}
        </div>
        ${WuxSheet.PageSetPageDisplayInput()}
        ${WuxSheet.PageDisplay("Builder", buildMainFooter())}
        </div>`;
        },

        buildMainFooter = function () {
            let nextSectionDef = WuxDef.Get("Title_NextSection");
            let nextSectionButton = `<div class="wuxMainFooter">
            ${WuxSheetNavigation.BuildTabButton("checkbox", nextSectionDef.getAttribute(), nextSectionDef.getTitle(), nextSectionDef.getTitle(), false, "")}
            </div>`;

            let finishFieldName = `${WuxDef.GetAttribute("PageSet_Character Creator")}${WuxDef._finish}`;
            let finishButton = `<div class="wuxMainFooter">
            ${WuxSheetNavigation.BuildTabButton("checkbox", finishFieldName, "Finish", "Finish", false, "")}
            </div>`;

            return `${WuxSheet.MainPageDisplayInput()}
            ${WuxSheet.PageDisplay("Origin", nextSectionButton)}
            ${WuxSheet.PageDisplay("Jobs", nextSectionButton)}
            ${WuxSheet.PageDisplay("Attributes", nextSectionButton)}
            ${WuxSheet.PageDisplay("Knowledge", nextSectionButton)}
            ${WuxSheet.PageDisplay("Gear", nextSectionButton)}
            ${WuxSheet.PageDisplay("StylesData", nextSectionButton)}
            ${WuxSheet.PageDisplay("Advancement", finishButton)}`;
        },

        tab = function (contents) {
            return `<div class="wuxTab">\n${contents}\n</div>`;
        },

        tabHeader = function (contents) {
            return `<div class="wuxTabHeader">\n${contents}\n</div>`;
        },

        collapsibleTab = function (fieldName, title, contents, infoDefinition) {
            let infoButton = infoDefinition != undefined ? WuxSheetMain.Info.Button(infoDefinition.getAttribute(WuxDef._info)) : "";
            let infoContents = infoDefinition != undefined ? WuxSheetMain.Info.DefaultContents(infoDefinition) : "";
            return `<div class="wuxSegment">
            ${tabHeader(infoButton + (title.startsWith("<") ? title : `<span>${title}</span>`))}
            ${infoContents}
            ${tab(contents)}
            </div>`;
        },

        tabBlock = function (contents) {
            return `<div class="wuxSectionBlock wuxLayoutItem">\n<div class="wuxTabContent">\n${contents}\n</div>\n</div>`;
        },

        collapsibleHeader = function (headerName, hiddenField, additionalButtons) {
            let headerButtons = `<span class="wuxStyleHeaderButtonContainer">
                        ${additionalButtons != undefined ? additionalButtons : ""}
                        ${WuxSheetMain.HiddenSpanFieldToggle(hiddenField,
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8857;</span> Show", "wuxStyleHeaderButton"),
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8853;</span> Hide", "wuxStyleHeaderButton")
            )}
            </span>`;
            return headerButtons + headerName;
        },
        collapsibleHeaderInverse = function (headerName, hiddenField, additionalButtons) {
            let headerButtons = `<span class="wuxStyleHeaderButtonContainer">
                        ${additionalButtons != undefined ? additionalButtons : ""}
                        ${WuxSheetMain.HiddenSpanFieldToggle(hiddenField,
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8853;</span> Hide", "wuxStyleHeaderButton"),
                WuxSheetMain.Button(hiddenField, "<span class='wuxStyleHeaderButtonIcon'>&#8857;</span> Show", "wuxStyleHeaderButton")
            )}
            </span>`;
            return headerButtons + headerName;
        },

        sectionBlock = function (contents) {
            return `<div class="wuxSectionBlock">\n${contents}\n</div>`;
        },

        sectionBlockHeader = function (contents) {
            return `<div class="wuxSectionHeader">\n${contents}\n</div>\n${sectionBlockHeaderFooter()}`;
        },

        sectionBlockStyleHeader = function (contents) {
            return `<div class="wuxStyleSectionHeader">\n${contents}\n</div>\n${sectionBlockHeaderFooter()}`;
        },

        sectionBlockContents = function (contents) {
            return `<div class="wuxSectionContent">\n${contents}\n</div>`;
        },

        collapsibleSection = function (fieldName, title, contents) {
            return sectionBlock(`${customInput("checkbox", fieldName, "wuxSectionContent-flag")}
            ${sectionBlockHeader(interactionElement.ExpandableBlockIcon(fieldName) + `<span>${title}</span>`)}
            ${sectionBlockContents(contents)}`);
        },

        collapsibleStyleSection = function (fieldName, title, contents) {
            return sectionBlock(`${customInput("checkbox", fieldName, "wuxSectionContent-flag")}
            ${sectionBlockStyleHeader(interactionElement.ExpandableBlockIcon(fieldName) + title)}
            ${sectionBlockContents(contents)}`);
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

        descField = function (fieldName) {
            return `<span class="wuxDescription" name="${fieldName}"></span>`;
        },

        span = function (fieldName, contents) {
            if (contents == undefined) {
                contents = "";
            }
            return `<span name="${fieldName}">${contents}</span>`;
        },

        evaluatedSpan = function (fieldName, evaluationFieldName) {
            return `<input type="hidden" class="wuxStatSummary-flag" name="${evaluationFieldName}" value="0">
            <span class="wuxStatSummary-value" name="${fieldName}"></span>`;
        },

        row = function (contents) {
            return `<div class="wuxRow">${contents}</div>`;
        },

        multiRow = function (contents) {
            return `<div class="wuxMultiRow">${contents}</div>`;
        },

        input = function (type, fieldName, value, placeholder) {
            value = value == undefined ? "" : ` value="${value}"`;
            placeholder = placeholder == undefined ? "" : ` placeholder="${placeholder}"`;
            return customInput(type, fieldName, "wuxInput", value + placeholder);
        },

        inputLabel = function (contents) {
            return `<div class="wuxInputLabel">${contents}</div>`;
        },

        textarea = function (fieldName, className, placeholder) {
            if (className == undefined) {
                className = "";
            } else {
                className = ` class="${className}"`;
            }
            placeholder = placeholder == undefined ? "" : ` placeholder="${placeholder}"`;
            return `<textarea${className} name="${fieldName}"${placeholder}></textarea>`;
        },

        select = function (fieldName, definitionGroup, showEmpty, className) {
            if (className == undefined) {
                className = "wuxInput";
            } else {
                className = `wuxInput ${className}`;
            }

            let output = `<select class="${className}" name="${fieldName}" value="0">`;

            if (showEmpty == undefined || showEmpty) {
                output += `\n<option value="0">-</option>`;
            }

            for (let i = 0; i < definitionGroup.length; i++) {
                output += `\n<option value="${definitionGroup[i].variable}">${definitionGroup[i].title}</option>`;
            }
            output += `\n</select>`;
            return output;
        },

        button = function (fieldName, contents, className, value) {
            className = className == undefined ? "" : ` ${className}`;
            value = value == undefined ? "" : ` value="${value}"`;
            return `<div class="wuxButton${className}">
            <input type="checkbox" name="${fieldName}"${value}>
            <span>${contents}</span>
            </div>`;
        },

        pictosButton = function (fieldName, contents, className) {
            if (className == undefined) {
                className = "";
            } else {
                className = " " + className;
            }
            return `<div class="wuxPictosButton${className}">\n<input type="checkbox" name="${fieldName}">\n<span>${contents}</span>\n </div>`;
        },

        multiRowGroup = function (contents, containerCallback, rowSize) {
            let output = "";
            let rowContents = "";
            for (let i = 0; i < contents.length; i++) {
                rowContents += contents[i];
                if (i % rowSize == rowSize - 1) {
                    output += containerCallback(rowContents);
                    rowContents = "";
                }
            }
            if (rowContents != "") {
                output += containerCallback(rowContents);
            }

            return output;
        },

        hiddenField = function (fieldName, contents, defaultValue) {
            if (defaultValue == undefined) {
                defaultValue = "0";
            }
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="${defaultValue}">
            <div class="wuxHiddenField">\n${contents}\n</div>\n`;
        },

        hiddenAuxField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenAuxField">\n${contents}\n</div>\n`;
        },

        hiddenFieldToggle = function (fieldName, onContents, offContents) {
            return `${hiddenField(fieldName, onContents)}
                ${hiddenAuxField(fieldName, offContents)}`;
        },

        hiddenIndexField = function (fieldName, index, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenIndexField${index}">\n${contents}\n</div>\n`;
        },

        hiddenIndexFieldWithVariable = function (fieldName, indexFieldName, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenIndexField" name="${indexFieldName}">\n${contents}\n</div>\n`;
        },

        hiddenUniqueIndexField = function (fieldName, index, contents) {
            return `<input type="hidden" class="wuxHiddenIndexField-flag" name="${fieldName}" value="0">
            <div class="wuxHiddenUniqueIndexField${index}">\n${contents}\n</div>\n`;
        },

        hiddenAncestryField = function (ancestryType, contents) {
            let fieldName = "";
            switch (ancestryType) {
                case "Spirit":
                    fieldName = "wuxHiddenAncestrySpirit";
                    break;
            }
            return `<input type="hidden" class="wuxHiddenAncestry-flag" name="${WuxDef.GetAttribute("Ancestry")}" value="0">
            <div class="${fieldName}">\n${contents}\n</div>\n`;
        },

        hiddenSpanField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <span class="wuxHiddenInlineField">\n${contents}\n</span>\n`;
        },

        hiddenAuxSpanField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
            <span class="wuxHiddenInlineAuxField">\n${contents}\n</span>\n`;
        },

        hiddenSpanFieldToggle = function (fieldName, onContents, offContents) {
            return `${hiddenSpanField(fieldName, onContents)}
                ${hiddenAuxSpanField(fieldName, offContents)}`;
        },

        subMenuButton = function (fieldName, contents) {
            return `<div class="wuxSubMenuButton">
                <input type="checkbox" name="${fieldName}">
                <span class="wuxSubMenuText">l</span>
                <input type="hidden" class="wuxSubMenu-flag" name="${fieldName}" value="0">
                <div class="wuxSubMenuContent">\n${contents}\n</div>
            </div>`;
        },

        subMenuOptionButton = function (fieldName, contents, checkboxValue) {
            return `<div class="wuxButton wuxSubMenuOptionButton">
                <input type="checkbox" name="${fieldName}"${checkboxValue != undefined ? ` value="${checkboxValue}"` : ""}>
                ${contents}
            </div>`;
        },

        subMenuOptionRollButton = function (fieldName, contents, value) {
            return `<button class="wuxButton wuxSubMenuOptionButton" type="roll" value="${value}">
                <span>${contents}</span>
            </button>`;
        },

        subMenuOptionRollButtonWithVariableInput = function (fieldName, contents, variableName) {
            return `<input type="hidden" name="${fieldName}" value="0"/>
            <button class="wuxButton wuxSubMenuOptionButton" type="roll" value="@{${variableName}}">
                <span name="${WuxDef.GetAttribute("Chat_PostName")}">${contents}</span>
            </button>`;
        },

        subMenuOptionText = function (fieldName, placeholder) {
            return `<div class="wuxButton wuxSubMenuOptionButton">
                <input type="text" name="${fieldName}"${placeholder != undefined ? ` placeholder="${placeholder}"` : ""}>
            </div>`;
        };

    var info = info || (function () {
            'use strict';

            var
                button = function (fieldName, extras) {
                    return `<div class="wuxInfoButton"><input type="checkbox" name="${fieldName}" ${extras}><span>?</span></div>`;
                },

                contents = function (fieldName, contents) {
                    let output = `<div class="wuxInfoContent">\n${contents}\n</div>`;
                    return WuxSheetMain.HiddenField(fieldName, output);
                },

                defaultContents = function (definition) {
                    let output = "";
                    output += WuxDefinition.TooltipDescription(definition);
                    return contents(definition.getAttribute(WuxDef._info), output);
                }

            return {
                Button: button,
                Contents: contents,
                DefaultContents: defaultContents
            };
        }()),

        tooltip = tooltip || (function () {
            'use strict';

            var
                button = function (fieldName, contents) {
                    return `<div class="wuxTooltipButtonContainer">
                <div class="wuxTooltipButton wuxFloatRight">
                <input type="checkbox" name="${fieldName}">
                <div class="wuxTooltipText">i</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>
                </div>`;
                },

                icon = function (contents) {
                    return `<div class="wuxTooltipButtonContainer">
                <div class="wuxTooltipButton wuxFloatRight">
                <div class="wuxTooltipText">i</div>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </div>
                </div>`;
                },

                text = function (text, contents) {
                    return `<span class="wuxTooltip">
                <span class="wuxTooltipText">\n${text}\n</span>
                <div class="wuxTooltipContent">\n${contents}\n</div>
                </span>`;
                },

                inline = function (text, contents) {
                    return `<span class="wuxTooltip"><span class="wuxTooltipText">${text}</span><span class="wuxTooltipContent">${contents}</span></span>`;
                }

            return {
                Button: button,
                Icon: icon,
                Text: text,
                Inline: inline
            };
        }()),

        table = table || (function () {
            'use strict';

            var
                build = function (headers, data) {
                    let output = ``;
                    for (let i = 0; i < headers.length; i++) {
                        output += flexTableGroup(`${flexTableHeader(headers[i])}\n${flexTableData(data[i])}\n`);
                    }
                    return flexTable(output);
                },

                flexTable = function (contents) {
                    return `<div class="wuxFlexTable">\n${contents}\n</div>`;
                },

                flexTableReverse = function (contents) {
                    return `<div class="wuxFlexTable wuxFlexTableReverse">\n${contents}\n</div>`;
                },

                flexTableGroup = function (contents, className) {
                    return `<div class="wuxFlexTableItemGroup${className != undefined ? `${className}` : ""}">\n${contents}\n</div>`;
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
                FlexTableReverse: flexTableReverse,
                FlexTableGroup: flexTableGroup,
                FlexTableHeader: flexTableHeader,
                FlexTableSubheader: flexTableSubheader,
                FlexTableData: flexTableData,
                FlexTableInput: flexTableInput
            };
        }()),

        slotDisplay = function (label, stateAttrName, currentAttrName, maxAttrName) {
            return `<div class="wuxSlotSection"><span class="wuxSlotLabel">${label}</span><input type="hidden" class="wuxSlotStateFlag" name="${stateAttrName}" value="0"><span class="wuxSlotData"><span name="${currentAttrName}" value="0">0</span> / <span name="${maxAttrName}">0</span></span></div>`;
        },

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

        chat = chat || (function () {
            'use strict';
            var
                build = function () {
                    let contents = "";

                    contents += tags();
                    contents += WuxSheetMain.Row(`<div class="wuxChatSelectRow">${chatType()}${chatPostTarget()}</div>`);
                    contents += WuxSheetMain.Row("&nbsp;");
                    contents += textArea();

                    let postTargetAttr = WuxDef.GetAttribute("Chat_PostTarget");
                    contents += WuxSheetMain.HiddenAuxField(postTargetAttr,
                        repeatingEmoteButtons("RepeatingActiveEmotes"));
                    contents += WuxSheetMain.HiddenField(postTargetAttr,
                        repeatingEmoteButtons("RepeatingActiveEmotesNotes"));

                    return contents;
                },

                tags = function () {
                    return WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_Target"));
                },

                chatType = function () {
                    return WuxSheetMain.Select(WuxDef.GetAttribute("Chat_Type"),
                        WuxDef.Filter([new DatabaseFilterData("group", "ChatType")]), false);
                },

                chatPostTarget = function () {
                    return WuxSheetMain.Select(WuxDef.GetAttribute("Chat_PostTarget"),
                        WuxDef.Filter([new DatabaseFilterData("group", "EmotePostType")]), false);
                },

                textArea = function () {
                    return WuxSheetMain.Textarea(WuxDef.GetAttribute("Chat_Message"), "wuxInput wuxHeight60");
                },

                repeatingEmoteButtons = function (groupName) {
                    return `<div class="wuxNoRepControl wuxEmotePostGroup">
                        <fieldset class="${WuxDef.GetVariable(groupName)}">
                            ${groupName == "RepeatingActiveEmotes" ? emotePostButton() : emoteNotePostButton()}
                            <input type="hidden" name="${WuxDef.GetAttribute("Chat_PostURL")}">
                        </fieldset>
                    </div>`;
                },

                emotePostButton = function () {
                    return `<button class="wuxPostButton" type="roll" value="${senderPostMessage()}">
                    <span name="${WuxDef.GetAttribute("Chat_PostName")}">emote</span>
                    </button>`;
                },

                emoteNotePostButton = function () {
                    return WuxSheetMain.Button(WuxDef.GetAttribute("Chat_PostEmoteNote"),
                        `<span name="${WuxDef.GetAttribute("Chat_PostName")}">emote</span>`, "wuxPostButton");
                },

                senderPostMessage = function () {
                    let chatMessage = `&{template:@{${WuxDef.GetVariable("Chat_Type")}}} `;
                    chatMessage += `{{url=@{${WuxDef.GetVariable("Chat_PostURL")}}}} `;
                    chatMessage += `{{emote=@{${WuxDef.GetVariable("Chat_PostName")}}}} `;
                    chatMessage += `{{name=@{${WuxDef.GetVariable("DisplayName")}}}} `;
                    chatMessage += `{{title=@{${WuxDef.GetVariable("DisplayName")}}@{${WuxDef.GetVariable("Chat_Target")}}}} `;
                    chatMessage += `{{language=@{${WuxDef.GetVariable("Chat_Language")}}}} `;
                    chatMessage += `{{message=@{${WuxDef.GetVariable("Chat_Message")}}}} `;
                    chatMessage += `@{${WuxDef.GetVariable("Chat_LanguageTag")}}`;
                    return chatMessage;
                }
            return {
                Build: build
            }
        }()),

        language = language || (function () {
            'use strict';
            var
                build = function () {
                    let contents = "";
                    contents += WuxSheetMain.Input("hidden", WuxDef.GetAttribute("Chat_LanguageTag"), "wuxInput");

                    let languageAttr = WuxDef.GetAttribute("Chat_Language");
                    let languageFilters = WuxDef.Filter([new DatabaseFilterData("group", "Language")]);
                    for (let i = 0; i < languageFilters.length; i++) {
                        contents += WuxSheetMain.HiddenField(languageFilters[i].getAttribute(WuxDef._filter),
                            WuxSheetMain.InteractionElement.RadioBlockIcon(languageAttr, languageFilters[i].title,
                                WuxSheetMain.Header2(languageFilters[i].title))
                        );
                    }
                    return contents;
                }
            return {
                Build: build
            }

        }())

    ;
    return {
        Build: build,
        Tab: tab,
        TabHeader: tabHeader,
        CollapsibleTab: collapsibleTab,
        TabBlock: tabBlock,
        CollapsibleHeader: collapsibleHeader,
        CollapsibleHeaderInverse: collapsibleHeaderInverse,
        SectionBlock: sectionBlock,
        SectionBlockHeader: sectionBlockHeader,
        SectionBlockHeaderFooter: sectionBlockHeaderFooter,
        SectionBlockContents: sectionBlockContents,
        CollapsibleSection: collapsibleSection,
        CollapsibleStyleSection: collapsibleStyleSection,
        Header: header,
        Header2: header2,
        Subheader: subheader,
        Desc: desc,
        DescField: descField,
        Span: span,
        EvaluatedSpan: evaluatedSpan,
        Row: row,
        MultiRow: multiRow,
        Input: input,
        CustomInput: customInput,
        InputLabel: inputLabel,
        Textarea: textarea,
        Select: select,
        Button: button,
        PictosButton: pictosButton,
        MultiRowGroup: multiRowGroup,
        HiddenField: hiddenField,
        HiddenAuxField: hiddenAuxField,
        HiddenFieldToggle: hiddenFieldToggle,
        HiddenIndexField: hiddenIndexField,
        HiddenIndexFieldWithVariable: hiddenIndexFieldWithVariable,
        HiddenUniqueIndexField: hiddenUniqueIndexField,
        HiddenAncestryField: hiddenAncestryField,
        HiddenSpanField: hiddenSpanField,
        HiddenAuxSpanField: hiddenAuxSpanField,
        HiddenSpanFieldToggle: hiddenSpanFieldToggle,
        SubMenuButton: subMenuButton,
        SubMenuOptionButton: subMenuOptionButton,
        SubMenuOptionRollButton: subMenuOptionRollButton,
        SubMenuOptionRollButtonWithVariableInput: subMenuOptionRollButtonWithVariableInput,
        SubMenuOptionText: subMenuOptionText,
        Info: info,
        Tooltip: tooltip,
        Table: table,
        DistinctSection: distinctSection,
        InteractionElement: interactionElement,
        Chat: chat,
        Language: language,
        SlotDisplay: slotDisplay
    };
}());

var WuxDefinition = WuxDefinition || (function () {
    const definitionContents = function (definitionData) {
        let expandContents = "";
        if (definitionData.subGroup != "") {
            expandContents += WuxSheetMain.Desc(`<em>${definitionData.subGroup}</em>`);
        }
        expandContents += `\n${WuxSheetMain.Desc(definitionData.getDescription(`</span><span class="wuxDescription">`))}`;
        return expandContents;
    };
    const values = {};
    'use strict';

    const get = function () {
            return undefined;
        },
        getDefinition = function (key) {
            if (values[key] == undefined) {
                let definition = new DefinitionData();
                definition.name = `${key} Not Found`;
                return definition;
            }
            switch (values[key]["group"]) {
                case "Technique":
                    return new TechniqueDefinitionData(values[key]);
                case "Style":
                    return new TechniqueStyleDefinitionData(values[key]);
                case "Language":
                    return new LanguageDefinitionData(values[key]);
                case "Job":
                    return new JobDefinitionData(values[key]);
                case "Status":
                    return new StatusDefinitionData(values[key]);
                case "Goods":
                case "Gear":
                case "Consumable":
                    return new ItemDefinitionData(values[key]);
                default:
                    return new DefinitionData(values[key]);
            }
        },
        getStyle = function (key) {
            if (values[key] == undefined) {
                return undefined;
            }
            return new TechniqueStyle(values[key]);
        },
        getTechnique = function (key) {
            if (values[key] == undefined) {
                return undefined;
            }
            return new TechniqueData(values[key]);
        },
        getItem = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new UsableItemData(values[key]);
        },
        getGoods = function (key) {
            if (values[key] == undefined) {
                let itemData = new ItemData();
                itemData.name = `${key} Not Found`;
                return itemData;
            }
            return new GoodsData(values[key]);
        },
        getBasicPerk = function (key) {
            if (values[key] == undefined) {
                return undefined;
            }
            return new PerkData(values[key]);
        },
        getAttribute = function (key, mod, mod1) {
            let data = get(key);
            return data.getAttribute(mod, mod1);
        },
        getVariable = function (key, mod, mod1) {
            let data = get(key);
            return data.getVariable(mod, mod1);
        },
        getUntypedAttribute = function (baseKey, key, mod, mod1) {
            let baseDefinition = get(baseKey);
            return baseDefinition.getAttribute(`-${getVariable(key, mod, mod1)}`);
        },
        getUntypedVariable = function (baseKey, key, mod, mod1) {
            let baseDefinition = get(baseKey);
            return baseDefinition.getVariable(`-${getVariable(key, mod, mod1)}`);
        },
        getAbbreviation = function (key) {
            let data = get(key);
            if (data.abbreviation == "") {
                return data.title;
            } else {
                return data.abbreviation;
            }
        },
        getVariables = function (key, array, mod1) {
            let output = [];
            let data = get(key);
            for (let i = 0; i < array.length; i++) {
                output.push(data.getVariable(array[i], mod1));
            }
            return output;
        },
        getGroupVariables = function (filterData, mod1, mod2) {
            let data = filter(filterData);
            let output = [];
            for (let i = 0; i < data.length; i++) {
                output.push(data[i].getVariable(mod1, mod2));
            }
            return output;
        },
        getGroupVariablesTechnique = function (filterData, mod1, mod2) {
            let data = filter(filterData);
            let output = [];
            for (let i = 0; i < data.length; i++) {
                let definition = data[i].createDefinition(WuxDef.Get("Technique"));
                output.push(definition.getVariable(mod1, mod2));
            }
            return output;
        },
        getGroupVariablesStyle = function (filterData, mod1, mod2) {
            let data = filter(filterData);
            let output = [];
            for (let i = 0; i < data.length; i++) {
                let definition = data[i].createDefinition(WuxDef.Get("Style"));
                output.push(definition.getVariable(mod1, mod2));
            }
            return output;
        },
        getTitle = function (key) {
            let data = get(key);
            return data.title;
        },
        getDescription = function (key) {
            let data = get(key);
            return data.getDescription();
        },
        getName = function (name, baseDefinition) {
            return baseDefinition.isResource ? `${name}` : `${baseDefinition.abbreviation}_${name}`;
        },
        
        sortFilteredTechniquesByRequirement = function (techniquesFilter) {
            let technique = {};

            let techniquesByRequirements = new Dictionary();
            for (let i = 0; i <= 9; i++) {
                techniquesByRequirements.add(i, new Dictionary());
            }

            for (let i = 0; i < techniquesFilter.length; i++) {
                technique = new TechniqueData(techniquesFilter[i]);
                if (techniquesByRequirements.get(technique.tier) != undefined) {
                    if (!techniquesByRequirements.get(technique.tier).has(technique.affinity)) {
                        techniquesByRequirements.get(technique.tier).add(technique.affinity, []);
                    }
                    techniquesByRequirements.get(technique.tier).get(technique.affinity).push(technique);
                }
            }

            return techniquesByRequirements;
        },
        getByVariable = function (key) {

        },

        displayEntry = function (dictionary, key) {
            let output = "";
            let entryData = dictionary.get(key).descriptions;

            output += WuxSheetMain.Header2(key);
            for (let i = 0; i < entryData.length; i++) {
                output += "\n" + WuxSheetMain.Desc(entryData[i]);
            }

            return output;
        },
        tooltipDescription = function (definitionData) {
            return `${WuxSheetMain.Header2(definitionData.title)}\n${definitionContents(definitionData)}`;
        },
        displayCollapsibleTitle = function (definitionData) {
            if (definitionData == undefined) {
                return "";
            }
            let expandContents = definitionContents(definitionData);
            let expandFieldName = definitionData.getVariable(WuxDef._expand);

            let output = `${WuxSheetMain.InteractionElement.ExpandableBlockIcon(expandFieldName)}
            ${WuxSheetMain.Header(definitionData.name, "span")}
            ${WuxSheetMain.InteractionElement.ExpandableBlockContents(expandFieldName, expandContents)}`;

            return WuxSheetMain.InteractionElement.Build(true, output);
        },
        infoHeader = function (definition) {
            return `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(definition.getAttribute(WuxDef._info))}${definition.title}`)}
            ${WuxSheetMain.Info.DefaultContents(definition)}`;
        },

        buildHeader = function (definition) {
            return WuxSheetMain.Header2(`${WuxSheetMain.Tooltip.Text(definition.title, WuxDefinition.TooltipDescription(definition))}`);
        },

        buildText = function (definition, textContents) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Desc(textContents);
        },

        buildTextInput = function (definition, fieldName, className) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.CustomInput("text", fieldName, className);
        },

        buildTextarea = function (definition, fieldName, className, placeholder) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Textarea(fieldName, className, placeholder);
        },

        buildNumberInput = function (definition, fieldName, defaultValue) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Input("number", fieldName, defaultValue);
        },

        buildNumberLabelInput = function (definition, fieldName, labelContent) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.MultiRow(WuxSheetMain.Input("number", fieldName, "", "0") + WuxSheetMain.InputLabel(labelContent));
        },

        buildSelect = function (definition, fieldName, definitionGroup, showEmpty) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Select(fieldName, definitionGroup, showEmpty);
        }
    ;
    return {
        GetDefinition: getDefinition,
        GetStyle: getStyle,
        GetTechnique: getTechnique,
        GetItem: getItem,
        GetGoods: getGoods,
        GetBasicPerk: getBasicPerk,
        GetAttribute: getAttribute,
        GetVariable: getVariable,
        GetUntypedAttribute: getUntypedAttribute,
        GetUntypedVariable: getUntypedVariable,
        GetAbbreviation: getAbbreviation,
        GetVariables: getVariables,
        GetGroupVariables: getGroupVariables,
        GetGroupVariablesTechnique: getGroupVariablesTechnique,
        GetGroupVariablesStyle: getGroupVariablesStyle,
        GetTitle: getTitle,
        GetDescription: getDescription,
        GetName: getName,
        SortFilteredTechniquesByRequirement: sortFilteredTechniquesByRequirement,
        DisplayEntry: displayEntry,
        TooltipDescription: tooltipDescription,
        DefinitionContents: definitionContents,
        DisplayCollapsibleTitle: displayCollapsibleTitle,
        InfoHeader: infoHeader,
        BuildHeader: buildHeader,
        BuildText: buildText,
        BuildTextInput: buildTextInput,
        BuildTextarea: buildTextarea,
        BuildNumberInput: buildNumberInput,
        BuildNumberLabelInput: buildNumberLabelInput,
        BuildSelect: buildSelect
    }
}());

var WuxSheetSidebar = WuxSheetSidebar || (function () {
    // Always-visible header (both collapsed 15px sliver and expanded 240px) - the whole bar
    // is a <label> wrapping a plain checkbox, so it's a natural two-way toggle: click to pull
    // out while collapsed, click again to close while expanded. This is in addition to the
    // nav header's own hamburger toggle (WuxSheetNavigation.buildSidebarToggleButton) - both
    // are bound to the same Page_Sidebar attribute.
    const tabHeader = function () {
        return `<label class="wuxFloatSidebarHeader">
        <input type="checkbox" name="${WuxDef.GetAttribute("Page_Sidebar")}">
        <span>&#10217;&#10217;</span>
        </label>`;
    };
    // Covers the whole panel so the entire 15px sliver is clickable to expand, not just the
    // header - hidden again once expanded (see CSS) so it doesn't sit on top of the real
    // content and swallow clicks meant for Roll Skill/Chat/etc. Placed before tabHeader in the
    // markup so the header still paints on top of it and keeps its own hover behavior.
    const pullOutHandle = function () {
        return `<label class="wuxSidebarPullOutHandle">
        <input type="checkbox" name="${WuxDef.GetAttribute("Page_Sidebar")}">
        </label>`;
    };
    const expandableTab = function (contents) {
        return `<div class="wuxSegment">
        ${pullOutHandle()}
        ${tabHeader()}
        ${WuxSheetMain.Tab(`<div class="wuxFloatSidebarContents">${contents}</div>`)}
        </div>`;
    };
    const collapsibleSection = function (header, fieldName, contents, defaultOpen) {
        return `<div class="wuxInteractiveBlock wuxSizeTiny">
        ${collapsibleSectionTitle(header, fieldName)}
        ${collapsibleSectionContent(contents, fieldName, defaultOpen)}
        </div>`;
    };
    const collapsibleSectionTitle = function (titleContent, fieldName) {
        return `<div class="wuxInteractiveInnerBlock">
            <input class="wuxInteractiveContent-flag" type="checkbox" name="${fieldName}">
            <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
            <span class="wuxInteractiveIcon">&#9656;</span>
            <input type="hidden" class="wuxInteractiveIcon-flag" name="${fieldName}">
            <span class="wuxInteractiveAuxIcon">&#9662;</span>
            
            ${titleContent}
        </div>`;
    };
    const collapsibleSectionContent = function (contents, fieldName, defaultOpen) {
        return `<input class="wuxInteractiveExpandingContent-flag" type="hidden" name="${fieldName}">
            <div class="${defaultOpen ? "wuxInteractiveExpandingAuxContent" : "wuxInteractiveExpandingContent"}">
            ${contents}
        </div>`;
    };
    const buildStatusNames = function (statusDefs) {
        let output = "";
        for (let i = 0; i < statusDefs.length; i++) {
            // output += WuxSheetMain.InteractionElement.BuildTooltipCheckboxInput(statusDefs[i].getAttribute(),
            //     statusDefs[i].getAttribute(WuxDef._info), WuxSheetMain.Header2(statusDefs[i].title), WuxSheetMain.Desc(statusDefs[i].shortDescription));

            // output += WuxSheetMain.HiddenField(statusDefs[i].getAttribute(),
            //     collapsibleSubheader(WuxSheetMain.Header2(statusDefs[i].title), statusDefs[i].getAttribute(WuxDef._info), WuxSheetMain.Desc(statusDefs[i].shortDescription), false));

            output += WuxSheetMain.HiddenField(statusDefs[i].getAttribute(),
                `<div class="wuxInteractiveBlock wuxInteractiveExpandingBlock wuxSizeTiny">
                ${collapsibleSectionTitle(
                    WuxSheetMain.Subheader(WuxSheetMain.InteractionElement.CheckboxBlockIcon(statusDefs[i].getAttribute(), WuxSheetMain.Header2(statusDefs[i].title))),
                    statusDefs[i].getAttribute(WuxDef._info)
                )}
                ${collapsibleSectionContent(WuxSheetMain.Desc(statusDefs[i].shortDescription), statusDefs[i].getAttribute(WuxDef._info), false)}
                </div>`
            );
        }
        return output;
    };
    'use strict';

    const build = function (contents) {
            // Full-screen click-to-close backdrop, shown only in the narrow-window overlay
            // mode (see the media query in WCSS-Base.css) while the sidebar is expanded -
            // same invisible-checkbox-over-a-dimmed-div convention as the item popups'
            // wuxPopupOverlay/wuxPopupOverlayClose, value="0" so a single click sets
            // Page_Sidebar back to its "off" state.
            let overlayBackdrop = `<div class="wuxSidebarOverlayBackdrop">
        <input type="checkbox" name="${WuxDef.GetAttribute("Page_Sidebar")}" value="0">
        </div>`;
            return `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}" />
        ${overlayBackdrop}
        <div class="wuxFloatSidebar">
        ${expandableTab(contents)}
        </div>`;
        },

        attributeSection = function (name, contents) {
            return `<div class="wuxDistinctSection wuxSizeInverse">\n<div class="wuxDistinctField">
            <span class="wuxDistinctSubtitle">${name}</span>
            <span class='wuxDistinctSubdata'>\n${contents}\n</span>
            </div>\n</div>`;
        },

        attributeSectionWithError = function (name, contents, errorFieldName) {
            return `<div class="wuxDistinctSection wuxSizeInverse">\n<div class="wuxDistinctField">
            <input type="hidden" class="wuxErrorField-flag" name="${errorFieldName}" value="0">
            <span class="wuxDistinctSubtitle">${name}</span>
            <span class='wuxDistinctSubdata'>\n${contents}\n</span>
            </div>\n</div>`;
        },

        collapsibleHeader = function (header, fieldName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxHeader">${header}</div>`, fieldName, contents, defaultOpen);
        },

        collapsibleSubheader = function (header, fieldName, contents, defaultOpen) {
            return collapsibleSection(`<div class="wuxSubheader">${header}</div>`, fieldName, contents, defaultOpen);
        },

        buildPointsSection = function (attrName, header) {
            if (header == undefined) {
                header = `Build`;
            }
            let currentValue = `<span name='${attrName}' value="0">0</span>`;
            let maxValue = `/ <span name='${attrName}_max' value="0">0</span>`;
            return `<div class="wuxPointsItem"><div class="wuxHeader">&nbsp;${header}</div>\n${attributeSectionWithError(currentValue, maxValue, `${attrName}_error`)}</div>`;
        },

        buildChatSection = function () {
            let titleDefinition = WuxDef.Get("Title_Chat");
            // The chat controls (type/target selects, message box, emote buttons) are
            // unusable at the sidebar's collapsed width - show a placeholder message there
            // instead, and only render the real controls once expanded. Needs its own local
            // copy of the sidebar-extend flag: the global one (emitted once by
            // WuxSheetSidebar.build) is several DOM levels above this section, out of reach
            // of the CSS sibling-selector match.
            let contents = `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}">
                <div class="wuxSidebarCollapsedOnly" style="color:#d0d0d0;">Expand the side bar to use chat features</div>
                <div class="wuxSidebarExpandedOnly">${WuxSheetMain.Chat.Build()}</div>`;
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), contents, true);
        },

        buildLanguageSection = function () {
            let titleDefinition = WuxDef.Get("Title_LanguageSelect");
            // "Language Select" doesn't fit the collapsed sidebar's width (unlike Chat/Checks/
            // Boons) - show the shorter abbreviation there instead, full title once expanded.
            // Needs its own local copy of the sidebar-extend flag: the global one (emitted once
            // by WuxSheetSidebar.build) is several DOM levels above this header, out of reach
            // of the CSS sibling-selector match.
            let header = `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}">
                <span class="wuxSidebarExpandedOnly">${titleDefinition.getTitle()}</span>
                <span class="wuxSidebarCollapsedOnly">${titleDefinition.abbreviation}</span>`;
            return collapsibleHeader(header, titleDefinition.getAttribute(), WuxSheetMain.Language.Build(), true);
        },

        // Bare button only, no "Checks" title/collapsible wrapper - reused directly by other
        // pages (Character Core's Resources section, Details page's Skills section) that want
        // just the button without a redundant second "Checks" header of their own.
        buildRollSkillButtonBare = function () {
            let subGroups = WuxDef.Filter([new DatabaseFilterData("group", "SkillGroup")]);
            let skillGroupText = "";
            for (let i = 0; i < subGroups.length; i++) {
                if (skillGroupText != "") {
                    skillGroupText += "|";
                }
                skillGroupText += subGroups[i].getTitle();
            }
            let rollSkillValue = `!cskillgroupcheck @{${WuxDef.GetVariable("SheetName")}}@@@?{Choose a Skill Group to Roll|${skillGroupText}|Lore};?{Advantage|0}`;
            return `<button class="wuxButton wuxSizePercent" type="roll" value="${rollSkillValue}"><span>Roll Skill</span></button>`;
        },

        buildRollSkillButton = function () {
            let titleDefinition = WuxDef.Get("Check");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), buildRollSkillButtonBare(), true);
        },

        buildBoonSection = function () {
            let boons = [];
            let boonsDefs = WuxDef.Filter([new DatabaseFilterData("group", "Boon")]);
            for (let i = 0; i < boonsDefs.length; i++) {
                boons.push(WuxSheetMain.InteractionElement.CheckboxBlockIcon(boonsDefs[i].getAttribute(), WuxSheetMain.Header2(boonsDefs[i].title)));
            }
            let output = WuxSheetMain.MultiRowGroup(boons, WuxSheetMain.Table.FlexTable, 3);

            let titleDefinition = WuxDef.Get("Title_Boon");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), output, true);
        },

        buildTechDebugSection = function () {
            let contents = "";
            let deleteAllStylesDef = WuxDef.Get("Forme_DeleteAllStyles");
            let deleteAllStylesButton = WuxSheetMain.Button(deleteAllStylesDef.getAttribute(), deleteAllStylesDef.getTitle(), "wuxSizePercent");
            contents += `<input type="hidden" class="wuxDebugNotCore-flag" name="${WuxDef.GetAttribute("PageSet")}" value="Core">
                <div class="wuxDebugNotCoreField">${deleteAllStylesButton}</div>`;
            let refreshTechDef = WuxDef.Get("RefreshTech");
            contents += WuxSheetMain.Button(refreshTechDef.getAttribute(), refreshTechDef.getTitle(), "wuxSizePercent");
            let sectionDefinition = WuxDef.Get("Action_FormeTechniques");
            let refreshField = sectionDefinition.getAttribute(WuxDef._refresh);
            contents += WuxSheetMain.Button(refreshField, "Update Techniques", "wuxSizePercent");

            let titleDefinition = WuxDef.Get("Title_Debug");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), contents, true);
        },

        buildGearDebugSection = function () {
            let contents = "";
            let updateDef = WuxDef.Get("Gear_UpdateEquipment");
            contents += WuxSheetMain.Button(updateDef.getAttribute(), updateDef.getTitle(), "wuxSizePercent");
            let removeDef = WuxDef.Get("Gear_RemoveEquipment");
            contents += WuxSheetMain.Button(removeDef.getAttribute(), removeDef.getTitle(), "wuxSizePercent");
            let updateConsuDef = WuxDef.Get("Gear_UpdateConsumables");
            contents += WuxSheetMain.Button(updateConsuDef.getAttribute(), updateConsuDef.getTitle(), "wuxSizePercent");
            let removeConsuDef = WuxDef.Get("Gear_RemoveConsumables");
            contents += WuxSheetMain.Button(removeConsuDef.getAttribute(), removeConsuDef.getTitle(), "wuxSizePercent");

            let titleDefinition = WuxDef.Get("Title_Debug");
            return collapsibleHeader(`${titleDefinition.getTitle()}`, titleDefinition.getAttribute(), contents, true);
        },

        // ONE sidebar shell, built once. Every sub-component below is always present in the
        // DOM and individually shown/hidden via the same Page/PageSet PageDisplay CSS
        // convention used everywhere else - so anything that must exist exactly once on the
        // sheet (e.g. the Language Select radio group, which is a single mutually-exclusive
        // radio input group by name and breaks if duplicated) can safely live in here.
        buildAll = function () {
            let contents = "";

            contents += WuxSheet.MainPageDisplayInput();

            // Roll Skill: normal play only (PageSet=="Core"), always the very first thing in
            // the sidebar, bare (no title/collapsible wrapper). Own isolated PageSet flag
            // copy, scoped to just this block, so it can't collide with the Page-only
            // widgets below (Page and PageSet share value names - see comment there).
            contents += `<div>
                ${WuxSheet.PageSetPageDisplayInput()}
                <div class="wuxPageDisplay-Core">${buildRollSkillButton()}</div>
            </div>`;

            // Page-scoped points widgets. Deliberately NOT given a PageSet flag as a
            // sibling anywhere in this section: Page and PageSet share value names
            // ("Training"/"Advancement"), and wuxPageDisplay-X's CSS class-naming is purely
            // value-based, not attribute-scoped - a PageSet flag sitting here would let
            // PageSet=="Advancement"/"Training" (true for the whole Jobs/Attributes/
            // Knowledge/Advancement or the whole Styles/Training build flow) incorrectly
            // reveal a single specific sub-page's own widget everywhere in that flow.
            contents += WuxSheet.PageDisplay("Training",
                `<div class="wuxPointsRow">${buildPointsSection(WuxDef.GetAttribute("Training"))}</div>`);
            contents += WuxSheet.PageDisplay("Advancement", `<div class="wuxPointsRow">
                ${buildPointsSection(WuxDef.GetAttribute("Advancement"), "Adv. Pts")}
                ${buildPointsSection(WuxDef.GetAttribute("Perk"), "Perk Pts")}
            </div>`);
            contents += WuxSheet.PageDisplay("Jobs",
                `<div class="wuxPointsRow">${buildPointsSection(WuxDef.GetAttribute("Job"), "Job Pts")}</div>`);
            contents += WuxSheet.PageDisplay("Attributes", `<div class="wuxPointsRow">
                ${buildPointsSection(WuxDef.GetAttribute("Attribute"), "Attr. Pts")}
                ${buildPointsSection(WuxDef.GetAttribute("Skill"), "Skill Pts")}
            </div>`);
            contents += WuxSheet.PageDisplay("Knowledge",
                `<div class="wuxPointsRow">${buildPointsSection(WuxDef.GetAttribute("Knowledge"), "Know. Pts")}</div>`);
            contents += WuxSheet.PageDisplay("Styles",
                `<div class="wuxPointsRow">${buildPointsSection(WuxDef.GetAttribute("Technique"), "Style Pts")}</div>`);
            contents += WuxSheet.PageDisplay("StylesData",
                `<div class="wuxPointsRow">${buildPointsSection(WuxDef.GetAttribute("Technique"), "Style Pts")}</div>`);

            // Chat + Language Select + Boon: normal play only - shown exclusively
            // when PageSet=="Core", never while inside any build flow (Builder/Training/
            // Advancement). Its own isolated PageSet flag copy, scoped to just this block,
            // so it can't collide with the Page-only widgets above.
            contents += `<div>
                ${WuxSheet.PageSetPageDisplayInput()}
                <div class="wuxPageDisplay-Core">
                    ${buildChatSection()}
                    ${buildLanguageSection()}
                    ${buildBoonSection()}
                </div>
            </div>`;

            // Debug sections: always last, regardless of Page/PageSet, so they never crowd
            // out Chat/Language/Boon above them.
            contents += WuxSheet.PageDisplay("Gear", buildGearDebugSection());
            let techDebugClasses = ["ActionsData", "StylesData"].map(name => `wuxPageDisplay-${name}`).join(" ");
            contents += `<div class="${techDebugClasses}">${buildTechDebugSection()}</div>`;

            return build(contents);
        };
    return {
        Build: build,
        AttributeSection: attributeSection,
        CollapsibleHeader: collapsibleHeader,
        CollapsibleSubheader: collapsibleSubheader,
        BuildPointsSection: buildPointsSection,
        BuildBoonSection: buildBoonSection,
        BuildChatSection: buildChatSection,
        BuildLanguageSection: buildLanguageSection,
        BuildRollSkillButton: buildRollSkillButton,
        BuildRollSkillButtonBare: buildRollSkillButtonBare,
        BuildTechDebugSection: buildTechDebugSection,
        BuildGearDebugSection: buildGearDebugSection,
        BuildAll: buildAll
    };
}());

var WuxSheetNavigation = WuxSheetNavigation || (function () {
    const mainPageNavigation = function (tabTitle, subheader, sideBarButtons) {
        let mainContents = ""
        mainContents += buildTabs(WuxDef.GetAttribute("Page"), ["Actions", "Gear", "Character"]);
        mainContents += sideBarButtons;
        mainContents += buildMainSheetHeader(subheader);

        return mainContents;
    };
    const buildMainSheetHeader = function (subheader) {
        let header = `<input type="text" name="${WuxDef.GetAttribute("DisplayName")}" placeholder="Display Name" />`;
        return buildHeader(header, subheader);
    };
    const trainingPageNavigation = function (definition, subheader) {
        let fieldName = WuxDef.GetAttribute("PageSet_Training");
        let mainContents = "";
        mainContents += buildTabs(WuxDef.GetAttribute("Page"), ["Knowledge", "Styles", "Training"]);
        mainContents += buildExitStickyButtons(fieldName, true);
        mainContents += buildHeader("Training", subheader);
        return mainContents;
    };
    const advancementPageNavigation = function (definition, subheader) {
        let fieldName = WuxDef.GetAttribute("PageSet_Advancement");
        let mainContents = buildTabs(WuxDef.GetAttribute("Page"), ["Styles", "Knowledge", "Attributes", "Jobs", "Advancement"]);
        mainContents += buildExitStickyButtons(fieldName, true);
        mainContents += buildHeader("Advancement", subheader);
        return mainContents;
    };
    const techniquesCorePageNavigation = function () {
        let tabFieldName = WuxDef.GetAttribute("Page");
        let setStyleDefinition = WuxDef.Get("Page_SetStyles");
        let actionsDefinition = WuxDef.Get("Page_Actions");
        return `${WuxSheet.PageDisplayInput(tabFieldName, "Styles")}
        ${WuxSheet.PageDisplay("Styles", mainPageNavigation(setStyleDefinition.title, setStyleDefinition.title, ""))}
        ${WuxSheet.PageDisplay("Actions", mainPageNavigation(actionsDefinition.title, actionsDefinition.title, ""))}`;
    };
    const characterCreationNavigation = function (definition, subheader) {
        let mainContents = buildCharacterCreationTabs(definition.title);
        mainContents += buildExitStickyButtons(WuxDef.GetAttribute("PageSet_Character Creator"), false);
        mainContents += buildHeader("Character Creation", subheader);
        return mainContents;
    };
    const buildCharacterCreationTabs = function (sheetName) {
        let output = "";
        let tabNames = ["Advancement",  "Styles", "Gear", "Knowledge", "Attributes", "Jobs", "Origin"];
        let fieldName = WuxDef.GetAttribute("Page");

        for (let i = 0; i < tabNames.length; i++) {
            output += buildTabButton("radio", fieldName, tabNames[i], tabNames[i], "") + "\n";
        }
        return buildNavRow(buildTabButtonRow(output), buildTabDropdown(fieldName, tabNames));
    };
    const buildExitStickyButtons = function (fieldName, showExit) {
        let output = "";
        // if (showExit) {
        //     output += buildTabButton("checkbox", `${fieldName}${WuxDef._exit}`, "Exit", "Exit", false, "") + "\n";
        // }
        output += buildTabButton("checkbox", `${fieldName}${WuxDef._finish}`, "Finish", "Finish", "") + "\n";
        output = buildTabButtonRow(output);

        return buildStickySideTab(output);
    };
    const partyManagerNavigation = function (tabTitle, subheader, sideBarButtons) {
        let mainContents = ""
        mainContents += buildTabs(WuxDef.GetAttribute("Page"), ["NPC", "Notes"]);
        mainContents += sideBarButtons;
        mainContents += buildMainSheetHeader(subheader);

        return mainContents;
    };
    'use strict';

    const buildSection = function (contents) {
            return `<div class="wuxFloatHeader wuxStickyHeader">\n<div class="wuxSectionBlock wuxLargeLayoutItem">
        ${contents}
        </div>\n</div>`;
        },

        buildCharacterCreationSplit = function (fieldName, mainContents, characterCreationContents) {
            return `${WuxSheet.PageSetPageDisplayInput()}
            ${WuxSheet.PageDisplay(fieldName, mainContents)}
            ${WuxSheet.PageDisplay("Builder", characterCreationContents)}`;
        },

        buildStickySideTab = function (contents) {
            return `<div class="wuxStickySideTab">\n${contents}\n</div>`;
        },

        buildTabButtonRow = function (contents) {
            return `<div class="wuxTabButtonRow">\n${contents}\n</div>`;
        },

        // Wraps the sidebar toggle alongside (not inside) .wuxTabButtonRow, so the toggle
        // stays fixed and always visible even when the tab row itself scrolls horizontally
        // (.wuxTabButtonRow has its own overflow-x:auto for when there isn't room for every
        // tab button) - previously the toggle was the row's own last child, and would scroll
        // out of view along with everything else. The dropdown lives here too (as a flex
        // sibling, not an absolutely-positioned overlay) so it stretches to fill whatever
        // space is left next to the toggle, rather than being capped to some fixed width.
        buildNavRow = function (tabButtonRowContents, dropdownContents) {
            return `<div class="wuxNavRow">${buildSidebarToggleButton()}${tabButtonRowContents}${dropdownContents}</div>`;
        },

        // Below wuxNavCollapseWidth (see WCSS-Base.css), the individual tab buttons hide and
        // this dropdown takes over instead - same fieldName/options as the button row it
        // stands in for, so picking an option here drives the exact same attribute. A plain
        // <select> already shows whichever option matches the attribute's current value, so
        // "display the active page" comes for free.
        buildTabDropdown = function (fieldName, tabNames) {
            // Reversed from the button row's own order - the row is row-reverse (see
            // .wuxTabButtonRow), so this puts the dropdown's top-to-bottom order in line with
            // the row's actual left-to-right visual order instead of its underlying array order.
            let options = tabNames.slice().reverse().map(name => `<option value="${name}">${name}</option>`).join("\n");
            return `<select class="wuxInput wuxNavDropdown" name="${fieldName}">${options}</select>`;
        },

        // Size/highlight is driven by WCSS-Base.css matching this button's own
        // wuxTabButtonValue-<value> class against the live wuxTabHighlight-Flag/
        // wuxTabHighlight-CoreTabFlag value, not by this radio's own :checked state - Roll20
        // doesn't reliably keep every duplicate copy of a same-named radio's checked state in
        // sync the instant the attribute changes (this same "Page"/"Character" tab button
        // exists in 5+ separate nav blocks), so the button one click away from active would
        // stay visually unselected until a second interaction forced a fuller resync. The
        // single global flag input doesn't have that problem, so keying off it instead
        // sidesteps the issue entirely.
        buildTabButton = function (type, fieldName, value, name, buttonClasses) {
            return `<div class="wuxTabButton wuxTabButtonValue-${value}">
            <input type="${type}" class="wuxTabButton ${buttonClasses}" name="${fieldName}" value="${value}"><span>${name}</span>
            </div>`;
        },

        // Sidebar show/hide toggle, bound to the same attribute the sidebar itself watches
        // (WuxSheetSidebar's wuxSideBarExtend-flag). Lives in the nav header (via buildNavRow)
        // instead of the sidebar so it still works once the sidebar is fully hidden
        // (display:none) rather than just shrunk.
        buildSidebarToggleButton = function () {
            // New-character default for Page_Sidebar is seeded in WJS-Loader.js's
            // upgrade_to_1_0_0 (brand-new sheets only), not via a checked="checked" default
            // here - with multiple same-named checkboxes for this one attribute scattered
            // across the sidebar/nav, relying on this markup's own default was unreliable.
            return `<div class="wuxSidebarToggleButton">
            <input type="checkbox" name="${WuxDef.GetAttribute("Page_Sidebar")}"><span>&#9776;</span>
            </div>`;
        },

        buildTabs = function (fieldName, tabNames) {
            let output = "";
            for (let i = 0; i < tabNames.length; i++) {
                output += buildTabButton("radio", fieldName, tabNames[i], tabNames[i], "") + "\n";
            }
            return buildNavRow(buildTabButtonRow(output), buildTabDropdown(fieldName, tabNames));
        },

        buildHeader = function (header, subheader) {
            return `<div class="wuxHeader2">${subheader}</div>\n<div class="wuxHeader">${header}</div>`;
        },

        buildOverviewPageNavigation = function (selectedTab) {
            let sideBarButtons = "";
            let tabFieldName = WuxDef.GetAttribute("PageSet_Core", WuxDef._tab);
            // sideBarButtons += buildTabButton("radio", tabFieldName, "Options", "Options", selectedTab == "Options", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Post", "Post", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Details", "Details", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Overview", "Overview", "") + "\n";

            let definition = WuxDef.Get("Page_Character");
            return buildSection(mainPageNavigation(definition.title, WuxDef.GetTitle(`Page_${selectedTab}`), buildStickySideTab(buildTabButtonRow(sideBarButtons))));
        },

        buildGearPageNavigation = function () {
            let definition = WuxDef.Get("Page_Gear");
            let jinDisplay = `<div class="wuxSlotSection"><span class="wuxSlotLabel">${WuxDef.GetTitle("Title_YourJin")}</span><span class="wuxSlotData"><span name="${WuxDef.GetAttribute("Jin")}"></span><span> J</span></span></div>`;

            let finishButton = buildTabButton("checkbox", `${WuxDef.GetAttribute("PageSet_Character Creator")}${WuxDef._finish}`, "Finish", "Finish", "") + "\n";
            let gearCharacterCreationContents = buildCharacterCreationTabs(definition.title) +
                buildStickySideTab(jinDisplay + buildTabButtonRow(finishButton)) +
                buildHeader("Character Creation", definition.title);

            let output = buildCharacterCreationSplit("Core",
                mainPageNavigation(definition.title, definition.title, buildStickySideTab(jinDisplay)),
                gearCharacterCreationContents);
            return buildSection(output);
        },

        buildActionsPageNavigation = function () {
            let actionsDefinition = WuxDef.Get("Page_Actions");
            let techniquesDefinition = WuxDef.Get("Page_Styles");
            let output = `${WuxSheet.PageSetPageDisplayInput()}
            ${WuxSheet.PageDisplay("Core",
                mainPageNavigation(actionsDefinition.title, actionsDefinition.title, ""))}
            ${WuxSheet.PageDisplay("Builder",
                characterCreationNavigation(techniquesDefinition, techniquesDefinition.title))}
            ${WuxSheet.PageDisplay("Advancement",
                advancementPageNavigation(techniquesDefinition, techniquesDefinition.title))}`;
            return buildSection(output);
        },

        buildNpcPageNavigation = function () {
            let definition = WuxDef.Get("Page_NPC");
            return buildSection(partyManagerNavigation(definition.title, definition.title, ""));
        },

        buildNotesPageNavigation = function () {
            let definition = WuxDef.Get("Page_Notes");
            return buildSection(partyManagerNavigation(definition.title, definition.title, ""));
        },

        buildOriginPageNavigation = function (definition) {
            return buildSection(characterCreationNavigation(definition, definition.title));
        },

        buildTrainingPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Training", trainingPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output);
        },

        buildAdvancementPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Advancement", advancementPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output);
        },

        buildTechniquesNavigation = function () {
            let learnDefinition = WuxDef.Get("Page_LearnTechniques");
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let learnSubtitle = learnDefinition.title;
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Core", techniquesCorePageNavigation())}`;

            return buildSection(output);
        },

        buildStylesNavigation = function (styleDefinitionName) {
            let styleDefinition = WuxDef.Get(styleDefinitionName);
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let learnSubtitle = styleDefinition.title;
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(styleDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(styleDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(styleDefinition, learnSubtitle))}`;

            return buildSection(output);
        },

        // Dedicated flag (own class, not the shared "wuxPageDisplay-Flag") for driving tab
        // button highlighting off the live "Page" value - see the .wuxTabHighlight-Flag rules
        // in WCSS-Base.css for why this needs to be separate from a tab button's own :checked
        // state, and why it needs its OWN class rather than reusing wuxPageDisplay-Flag (Page
        // and PageSet share value names like "Training"/"Advancement", so matching purely on
        // value against the generic, widely-reused flag class risks a PageSet flag elsewhere
        // in the DOM falsely satisfying the same selector).
        buildTabHighlightFlag = function () {
            return `<input type="hidden" class="wuxTabHighlight-Flag" name="${WuxDef.GetAttribute("Page")}" />`;
        },

        // Consolidates every page's navigation header into one shared block, built once and
        // shown/hidden per page via the existing Page/PageSet PageDisplay CSS convention,
        // instead of each Display*Sheet module independently re-invoking these same builders.
        buildAll = function () {
            let output = buildTabHighlightFlag();
            output += WuxSheet.PageDisplay("Origin", buildOriginPageNavigation(WuxDef.Get("Page_Origin")));
            output += WuxSheet.PageDisplay("Training", buildTrainingPageNavigation(WuxDef.Get("Page_Training")));
            output += WuxSheet.PageDisplay("Advancement", buildAdvancementPageNavigation(WuxDef.Get("Page_Advancement")));
            output += WuxSheet.PageDisplay("Jobs", buildAdvancementPageNavigation(WuxDef.Get("Page_Jobs")));
            output += WuxSheet.PageDisplay("Attributes", buildAdvancementPageNavigation(WuxDef.Get("Page_Attributes")));
            output += WuxSheet.PageDisplay("Knowledge", buildAdvancementPageNavigation(WuxDef.Get("Page_Knowledge")));
            output += WuxSheet.PageDisplay("Styles", buildStylesNavigation("Page_LearnTechniques"));
            output += WuxSheet.PageDisplay("Gear", buildGearPageNavigation());
            output += WuxSheet.PageDisplay("Actions", buildActionsPageNavigation());

            // Overview/Details/Post are keyed off PageSet_Core_tab (not the global Page
            // attribute), nested inside Page=="Character" - mirrors DisplayCoreCharacterSheet's
            // own content-side nesting. Re-emitting this flag here is a deliberate, necessary
            // exception - it's a single hidden input, not meaningful duplication. The second,
            // dedicated-class copy alongside it drives THIS sub-tab row's own button
            // highlighting the same way buildTabHighlightFlag does for Page - own class since
            // "PageSet_Core_tab" is a different attribute than "Page".
            let corePlayNav = `${WuxSheet.PageDisplayInput(WuxDef.GetAttribute("PageSet_Core", WuxDef._tab))}
                <input type="hidden" class="wuxTabHighlight-CoreTabFlag" name="${WuxDef.GetAttribute("PageSet_Core", WuxDef._tab)}" />
                ${WuxSheet.PageDisplay("Overview", buildOverviewPageNavigation("Overview"))}
                ${WuxSheet.PageDisplay("Details", buildOverviewPageNavigation("Details"))}
                ${WuxSheet.PageDisplay("Post", buildOverviewPageNavigation("Post"))}`;
            output += WuxSheet.PageDisplay("Character", corePlayNav);

            return output;
        };
    return {
        BuildOverviewPageNavigation: buildOverviewPageNavigation,
        BuildGearPageNavigation: buildGearPageNavigation,
        BuildActionsPageNavigation: buildActionsPageNavigation,
        BuildOriginPageNavigation: buildOriginPageNavigation,
        BuildNpcPageNavigation: buildNpcPageNavigation,
        BuildNotesPageNavigation: buildNotesPageNavigation,
        BuildTechniquesNavigation: buildTechniquesNavigation,
        BuildStylesNavigation: buildStylesNavigation,
        BuildTrainingPageNavigation: buildTrainingPageNavigation,
        BuildAdvancementPageNavigation: buildAdvancementPageNavigation,
        BuildTabButton: buildTabButton,
        BuildAll: buildAll
    };

}());

var WuxSheet = WuxSheet || (function () {
    'use strict';

    const pageDisplayInput = function (fieldName, value) {
        if (value == undefined) {
            value = "";
        } else {
            value = ` value="${value}"`;
        }
        return `<input type="hidden" class="wuxPageDisplay-Flag" name="${fieldName}"${value} />`
    },
        mainPageDisplayInput = function () {
            return pageDisplayInput(WuxDef.GetAttribute("Page"), "Origin");
        },
        pageSetPageDisplayInput = function () {
            return pageDisplayInput(WuxDef.GetAttribute("PageSet"), "Builder");
        },
        notePageDisplayInput = function () {
            return pageDisplayInput(WuxDef.GetAttribute("Note_PageDisplay"), "0");
        },
        pageDisplay = function (fieldName, contents) {
            return `<div class="wuxPageDisplay-${fieldName.replace(/[ .]/g, '')}">\n${contents}\n</div>`;
        }
    ;
    return {
        PageDisplayInput: pageDisplayInput,
        MainPageDisplayInput: mainPageDisplayInput,
        PageSetPageDisplayInput: pageSetPageDisplayInput,
        NotePageDisplayInput: notePageDisplayInput,
        PageDisplay: pageDisplay
    };
}());

var WuxCharacterSheetBuilders = WuxCharacterSheetBuilders || (function () {
    'use strict';

    var
        buildInfluences = function () {
            let contents = "";
            let influenceDef = WuxDef.Get("Soc_Influence");

            let influenceInfo = WuxDefinition.TooltipDescription(influenceDef);
            influenceInfo = WuxSheetMain.Info.Contents(influenceDef.getAttribute(WuxDef._info), influenceInfo);

            contents += `${WuxSheetMain.Header(`${WuxSheetMain.Info.Button(influenceDef.getAttribute(WuxDef._info))}${influenceDef.title}`)}
                ${influenceInfo}`;

            contents += buildInfluenceTypeSelect(WuxDef.Get("Soc_Personality"), "PersonalityType");
            contents += buildInfluenceTypeSelect(WuxDef.Get("Soc_Motivation"), "MotivationType");

            return WuxSheetMain.Table.FlexTableGroup(contents);
        },

        buildInfluenceTypeSelect = function (selectDef, groupName) {
            let options = WuxDef.Filter([new DatabaseFilterData("group", groupName)]);
            let optionsHtml = `<option value="0">-</option>`;
            for (let i = 0; i < options.length; i++) {
                optionsHtml += `\n<option value="${options[i].name}">${options[i].subGroup} - ${options[i].title}</option>`;
            }

            return `${WuxDefinition.BuildHeader(selectDef)}
                <select class="wuxInput" name="${selectDef.getAttribute()}" value="0">${optionsHtml}
                </select>
                ${WuxSheetMain.DescField(selectDef.getAttribute(WuxDef._db))}`;
        },

        buildBackgroundBasics = function () {
            let contents = "";
            contents += WuxDefinition.BuildTextInput(WuxDef.Get("DisplayName"), WuxDef.GetAttribute("DisplayName"));
            contents += WuxDefinition.BuildTextInput(WuxDef.Get("FullName"), WuxDef.GetAttribute("FullName"));
            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Title"), WuxDef.GetAttribute("Title"));
            contents += WuxDefinition.BuildTextInput(WuxDef.Get("Age"), WuxDef.GetAttribute("Age"));
            contents += WuxDefinition.BuildSelect(WuxDef.Get("Gender"), WuxDef.GetAttribute("Gender"),
                WuxDef.Filter([new DatabaseFilterData("group", "GenderType")]), true);
            contents += WuxDefinition.BuildSelect(WuxDef.Get("HomeRegion"), WuxDef.GetAttribute("HomeRegion"),
                WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
            contents += WuxDefinition.BuildSelect(WuxDef.Get("Ethnicity"), WuxDef.GetAttribute("Ethnicity"),
                WuxDef.Filter([new DatabaseFilterData("group", "RaceType")]), true);
            return WuxSheetMain.Table.FlexTableGroup(contents);
        },

        buildBackgroundBackstory = function () {
            let contents = "";
            contents += WuxDefinition.BuildTextarea(WuxDef.Get("QuickDescription"), WuxDef.GetAttribute("QuickDescription"),
                "wuxInput wuxHeight30");
            contents += WuxDefinition.BuildTextarea(WuxDef.Get("Backstory"), WuxDef.GetAttribute("Backstory"),
                "wuxInput wuxHeight150");
            return WuxSheetMain.Table.FlexTableGroup(contents);
        },

        buildBackgroundGenerator = function () {
            let leftColumn = "";
            leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenName"), WuxDef.GetAttribute("Note_GenName"));
            leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenFullName"), WuxDef.GetAttribute("Note_GenFullName"));
            leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenGender"), WuxDef.GetAttribute("Note_GenGender"));
            leftColumn += WuxDefinition.BuildSelect(WuxDef.Get("Note_GenHomeRegion"), WuxDef.GetAttribute("Note_GenHomeRegion"),
                WuxDef.Filter([new DatabaseFilterData("group", "RegionType")]));
            leftColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenRace"), WuxDef.GetAttribute("Note_GenRace"));
            leftColumn = WuxSheetMain.Table.FlexTableGroup(leftColumn);

            let rightColumn = "";
            let generatorDefinition = WuxDef.Get("Note_GenerateCharacter");
            let useDefinition = WuxDef.Get("Note_UseGeneration");
            let clearDefinition = WuxDef.Get("Note_ClearBackground");
            rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenPersonality"), WuxDef.GetAttribute("Note_GenPersonality"));
            rightColumn += WuxDefinition.BuildTextInput(WuxDef.Get("Note_GenMotivation"), WuxDef.GetAttribute("Note_GenMotivation"));
            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(generatorDefinition.getAttribute(), generatorDefinition.getTitle()));
            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(useDefinition.getAttribute(), useDefinition.getTitle()));
            rightColumn += WuxSheetMain.MultiRow(WuxSheetMain.Button(clearDefinition.getAttribute(), clearDefinition.getTitle()));
            rightColumn = WuxSheetMain.Table.FlexTableGroup(rightColumn);

            return `${WuxSheetMain.MultiRowGroup([leftColumn, rightColumn], WuxSheetMain.Table.FlexTable, 2)}`;
        },

        buildBackground = function () {
            let contents = "";
            contents += WuxSheetMain.Header("Basics");
            contents += `${WuxSheetMain.MultiRowGroup([buildBackgroundBasics(), buildBackgroundBackstory()], WuxSheetMain.Table.FlexTable, 2)}`;
            contents += WuxSheetMain.Header("Background Generator");
            contents += buildBackgroundGenerator();

            let definition = WuxDef.Get("Title_Background");
            return WuxSheetMain.CollapsibleTab(definition.getAttribute(WuxDef._tab, WuxDef._expand), definition.title, WuxSheetMain.TabBlock(contents), definition);
        }

    ;
    return {
        BuildInfluences: buildInfluences,
        BuildBackgroundBasics: buildBackgroundBasics,
        BuildBackgroundBackstory: buildBackgroundBackstory,
        BuildBackgroundGenerator: buildBackgroundGenerator,
        BuildBackground: buildBackground
    };
}());


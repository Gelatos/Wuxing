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
            CheckboxBlockIcon: checkboxBlockIcon
        }
    }());
    'use strict';

    const build = function (contents) {
            return `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}" />
        <div class="wuxMainContent">
        ${contents}
        </div>`;
        },

        tab = function (contents) {
            return `<div class="wuxTab">\n${contents}\n</div>`;
        },

        tabHeader = function (contents) {
            return `<div class="wuxTabHeader">\n${contents}\n</div>`;
        },

        collapsibleTab = function (fieldName, title, contents) {
            return `<div class="wuxSegment">
            ${customInput("checkbox", fieldName, "wuxTab-flag", ` checked="checked"`)}
            ${tabHeader(interactionElement.ExpandableBlockIcon(fieldName) + (title.startsWith("<") ? title : `<span>${title}</span>`))}
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

        hiddenField = function (fieldName, contents) {
            return `<input type="hidden" class="wuxHiddenField-flag" name="${fieldName}" value="0">
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
                }

            return {
                Button: button,
                Icon: icon,
                Text: text
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
                FlexTableGroup: flexTableGroup,
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

        chat = chat || (function () {
            'use strict';
            var
                build = function () {
                    let contents = "";

                    contents += tags();
                    contents += chatType();
                    contents += chatPostTarget();
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
                    return WuxSheetMain.Row(WuxSheetMain.Select(WuxDef.GetAttribute("Chat_Type"),
                        WuxDef.Filter([new DatabaseFilterData("group", "ChatType")]), false));
                },

                chatPostTarget = function () {
                    return WuxSheetMain.Row(WuxSheetMain.Select(WuxDef.GetAttribute("Chat_PostTarget"),
                        WuxDef.Filter([new DatabaseFilterData("group", "EmotePostType")]), false));
                },

                textArea = function () {
                    return WuxSheetMain.Textarea(WuxDef.GetAttribute("Chat_Message"), "wuxInput wuxHeight150");
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
                            WuxSheetMain.InteractionElement.BuildTooltipRadioInput(languageAttr, languageFilters[i].title,
                                languageTitle(languageFilters[i]), WuxDefinition.TooltipDescription(languageFilters[i]))
                        );
                    }
                    return contents;
                },

                languageTitle = function (languageDef) {
                    return `<span class="wuxHeader2">${languageDef.title}</span><span class="wuxSubheader"> - ${languageDef.location}</span>`;
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
        Language: language
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


        filterAndSortTechniquesByRequirement = function (techniquesFilterData) {
            let techniquesFilter = filter(techniquesFilterData);
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

        buildTextInput = function (definition, fieldName) {
            return buildHeader(definition) + "\n" +
                WuxSheetMain.Input("text", fieldName);
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
        FilterAndSortTechniquesByRequirement: filterAndSortTechniquesByRequirement,
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
    const expandableTab = function (title, contents) {
        return `<div class="wuxSegment">
        ${WuxSheetMain.CustomInput("checkbox", WuxDef.GetAttribute("Page_Sidebar"), "wuxSideBarExtend", ` checked="checked"`)}
        ${tabHeader(`<span>&#10217&#10217 ${title}</span>`)}
        ${WuxSheetMain.Tab(`<div class="wuxFloatSidebarContents">${contents}</div>`)}
        </div>`;
    };
    const tabHeader = function (contents) {
        return `<div class="wuxFloatSidebarHeader">\n${contents}\n</div>`;
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

    const build = function (title, contents) {
            return `<input type="hidden" class="wuxSideBarExtend-flag" name="${WuxDef.GetAttribute("Page_Sidebar")}" />
        <div class="wuxFloatSidebar">
        ${expandableTab(title, contents)}
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
            <span class="wuxDistinctSubtitle">${name}</span>
            <input type="hidden" class="wuxErrorField-flag" name="${errorFieldName}" value="0">
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
            let name = `Pts`;
            let output = `<span name='${attrName}' value="0">0</span>\n<span class="wuxFontSize7">/ </span>\n<span class="wuxFontSize7" name='${attrName}_max' value="0">0</span>`;
            return `<div class="wuxHeader">&nbsp;${header}</div>\n${attributeSectionWithError(name, output, `${attrName}_error`)}`;
        },

        buildChatSection = function () {
            let titleDefinition = WuxDef.Get("Title_Chat");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), WuxSheetMain.Chat.Build(), true);
        },

        buildLanguageSection = function () {
            let titleDefinition = WuxDef.Get("Title_LanguageSelect");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), WuxSheetMain.Language.Build(), true);
        },

        buildChecksSection = function () {
            let contents = "";

            let subGroups = WuxDef.Filter([new DatabaseFilterData("group", "SkillGroup")]);
            let skillGroupText = "";
            for (let i = 0; i < subGroups.length; i++) {
                if (skillGroupText != "") {
                    skillGroupText += "|";
                }
                skillGroupText += subGroups[i].getTitle();
            }
            let showStatValue = `!cshowgroup @{${WuxDef.GetVariable("SheetName")}}@@@?{What will you show?|Defenses|Senses}`;
            let rollSkillValue = `!cskillgroupcheck @{${WuxDef.GetVariable("SheetName")}}@@@?{Choose a Skill Group to Roll|${skillGroupText}|Lore};?{Advantage|0}`;
            contents += `<button class="wuxButton wuxSizePercent" type="roll" value="${showStatValue}"><span>Show Stat</span></button>`;
            contents += `<button class="wuxButton wuxSizePercent" type="roll" value="${rollSkillValue}"><span>Roll Skill</span></button>`;

            let titleDefinition = WuxDef.Get("Check");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), contents, true);
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

        buildTechSection = function () {
            let contents = "";
            let refreshTechDef = WuxDef.Get("RefreshTech");
            contents += WuxSheetMain.Button(refreshTechDef.getAttribute(), refreshTechDef.getTitle(), "wuxSizePercent");
            let sectionDefinition = WuxDef.Get("Action_FormeTechniques");
            let refreshField = sectionDefinition.getAttribute(WuxDef._refresh);
            contents += WuxSheetMain.Button(refreshField, "Update Techniques", "wuxSizePercent");

            let titleDefinition = WuxDef.Get("Action_Techniques");
            return collapsibleHeader(titleDefinition.getTitle(), titleDefinition.getAttribute(), contents, true);
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
        BuildChecksSection: buildChecksSection,
        BuildTechSection: buildTechSection
    };
}());

var WuxSheetNavigation = WuxSheetNavigation || (function () {
    const overviewInfoContents = function (fieldName, tabFieldName) {
        let output = "";
        output += WuxSheet.PageDisplayInput(tabFieldName, "Overview");
        output += WuxSheet.PageDisplay("Overview", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Overview")));
        output += WuxSheet.PageDisplay("Details", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Details")));
        output += WuxSheet.PageDisplay("Post", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Post")));
        // output += WuxSheet.PageDisplay("Options", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Options")));
        return WuxSheetMain.Info.Contents(fieldName, output);
    };
    const mainPageNavigation = function (tabTitle, subheader, infoAttribute, sideBarButtons) {
        let mainContents = ""
        mainContents += buildTabs(tabTitle, WuxDef.GetAttribute("Page"), ["Actions", "Gear", "Forme", "Character"]);
        mainContents += sideBarButtons;
        mainContents += buildMainSheetHeader(subheader, infoAttribute);

        return mainContents;
    };
    const buildMainSheetHeader = function (subheader, infoFieldName) {
        let header = `<input type="text" name="${WuxDef.GetAttribute("DisplayName")}" placeholder="Display Name" />`;
        return buildHeader(header, subheader, infoFieldName);
    };
    const trainingPageNavigation = function (definition, subheader) {
        let fieldName = WuxDef.GetAttribute("PageSet_Training");
        let mainContents = "";
        mainContents += buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Knowledge", "Styles", "Training"]);
        mainContents += buildExitStickyButtons(fieldName, true);
        mainContents += buildHeader("Training", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const advancementPageNavigation = function (definition, subheader) {
        let fieldName = WuxDef.GetAttribute("PageSet_Advancement");
        let mainContents = buildTabs(definition.title, WuxDef.GetAttribute("Page"), ["Knowledge", "Styles", "Attributes", "Jobs", "Advancement"]);
        mainContents += buildExitStickyButtons(fieldName, true);
        mainContents += buildHeader("Advancement", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const techniquesCorePageNavigation = function () {
        let tabFieldName = WuxDef.GetAttribute("Page");
        let learnDefinition = WuxDef.Get("Page_LearnTechniques");
        let setStyleDefinition = WuxDef.Get("Page_SetStyles");
        let actionsDefinition = WuxDef.Get("Page_Actions");
        return `${WuxSheet.PageDisplayInput(tabFieldName, "Styles")}
        ${WuxSheet.PageDisplay("Styles", mainPageNavigation(setStyleDefinition.title, setStyleDefinition.title, learnDefinition.getAttribute(WuxDef._info), ""))}
        ${WuxSheet.PageDisplay("Actions", mainPageNavigation(actionsDefinition.title, actionsDefinition.title, learnDefinition.getAttribute(WuxDef._info), ""))}`;
    };
    const techniquesInfoContents = function (infoFieldName, tabFieldName, pageFieldName) {
        let coreOutput = "";
        coreOutput += WuxSheet.PageDisplayInput(pageFieldName, "Styles");
        coreOutput += WuxSheet.PageDisplay("Styles", WuxDefinition.TooltipDescription(WuxDef.Get("Page_SetStyles")));
        coreOutput += WuxSheet.PageDisplay("Actions", WuxDefinition.TooltipDescription(WuxDef.Get("Page_Actions")));

        let output = "";
        output += WuxSheet.PageDisplayInput(tabFieldName, "Builder");
        output += WuxSheet.PageDisplay("Builder", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Training", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Advancement", WuxDefinition.TooltipDescription(WuxDef.Get("Page_LearnTechniques")));
        output += WuxSheet.PageDisplay("Core", coreOutput);
        return WuxSheetMain.Info.Contents(infoFieldName, output);
    };
    const characterCreationNavigation = function (definition, subheader) {
        let mainContents = buildCharacterCreationTabs(definition.title);
        mainContents += buildExitStickyButtons(WuxDef.GetAttribute("PageSet_Character Creator"), false);
        mainContents += buildHeader("Character Creation", subheader, definition.getAttribute(WuxDef._info));
        return mainContents;
    };
    const buildCharacterCreationTabs = function (sheetName) {
        let output = "";
        let tabNames = ["Gear", "Knowledge", "Styles", "Attributes", "Jobs", "Origin"];

        for (let i = 0; i < tabNames.length; i++) {
            output += buildTabButton("radio", WuxDef.GetAttribute("Page"), tabNames[i], tabNames[i], tabNames[i] == sheetName, "") + "\n";
        }
        output = buildTabButtonRow(output);

        return output;
    };
    const buildExitStickyButtons = function (fieldName, showExit) {
        let output = "";
        // if (showExit) {
        //     output += buildTabButton("checkbox", `${fieldName}${WuxDef._exit}`, "Exit", "Exit", false, "") + "\n";
        // }
        output += buildTabButton("checkbox", `${fieldName}${WuxDef._finish}`, "Finish", "Finish", false, "") + "\n";
        output = buildTabButtonRow(output);

        return buildStickySideTab(output);
    };
    const partyManagerNavigation = function (tabTitle, subheader, infoAttribute, sideBarButtons) {
        let mainContents = ""
        mainContents += buildTabs(tabTitle, WuxDef.GetAttribute("Page"), ["NPC", "Notes"]);
        mainContents += sideBarButtons;
        mainContents += buildMainSheetHeader(subheader, infoAttribute);

        return mainContents;
    };
    'use strict';

    const buildSection = function (contents, infoContents) {
            return `<div class="wuxFloatHeader wuxStickyHeader">\n<div class="wuxSectionBlock wuxLargeLayoutItem">
        ${contents}
        ${infoContents}
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

        buildHeader = function (header, subheader, infoFieldName) {
            return `<div class="wuxHeader2">${WuxSheetMain.Info.Button(infoFieldName)}${subheader}</div>\n<div class="wuxHeader">${header}</div>`;
        },

        buildOverviewPageNavigation = function (selectedTab) {
            let sideBarButtons = "";
            let tabFieldName = WuxDef.GetAttribute("PageSet_Core", WuxDef._tab);
            // sideBarButtons += buildTabButton("radio", tabFieldName, "Options", "Options", selectedTab == "Options", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Post", "Post", selectedTab == "Post", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Details", "Details", selectedTab == "Details", "") + "\n";
            sideBarButtons += buildTabButton("radio", tabFieldName, "Overview", "Overview", selectedTab == "Overview", "") + "\n";

            let definition = WuxDef.Get("Page_Character");
            return buildSection(mainPageNavigation(definition.title, WuxDef.GetTitle(`Page_${selectedTab}`), definition.getAttribute(WuxDef._info), buildStickySideTab(buildTabButtonRow(sideBarButtons))),
                overviewInfoContents(definition.getAttribute(WuxDef._info), tabFieldName));
        },

        buildFormePageNavigation = function () {
            let definition = WuxDef.Get("Page_Forme");
            return buildSection(mainPageNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildGearPageNavigation = function () {
            let definition = WuxDef.Get("Page_Gear");
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Core",
                mainPageNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), 
                characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        buildActionsPageNavigation = function () {
            let actionsDefinition = WuxDef.Get("Page_Actions");
            let techniquesDefinition = WuxDef.Get("Page_Styles");
            let output = `${WuxSheet.PageSetPageDisplayInput()}
            ${WuxSheet.PageDisplay("Core", 
                mainPageNavigation(actionsDefinition.title, actionsDefinition.title, actionsDefinition.getAttribute(WuxDef._info), ""))}
            ${WuxSheet.PageDisplay("Builder",
                characterCreationNavigation(techniquesDefinition, techniquesDefinition.title))}
            ${WuxSheet.PageDisplay("Advancement",
                advancementPageNavigation(techniquesDefinition, techniquesDefinition.title))}`;
            return buildSection(output, WuxSheetMain.Info.DefaultContents(actionsDefinition));
        },

        buildNpcPageNavigation = function () {
            let definition = WuxDef.Get("Page_NPC");
            return buildSection(partyManagerNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildNotesPageNavigation = function () {
            let definition = WuxDef.Get("Page_Notes");
            return buildSection(partyManagerNavigation(definition.title, definition.title, definition.getAttribute(WuxDef._info), ""), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildOriginPageNavigation = function (definition) {
            return buildSection(characterCreationNavigation(definition, definition.title), WuxSheetMain.Info.DefaultContents(definition));
        },

        buildTrainingPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Training", trainingPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        buildAdvancementPageNavigation = function (definition) {
            let characterCreationContents = characterCreationNavigation(definition, definition.title);
            let output = buildCharacterCreationSplit("Advancement", advancementPageNavigation(definition, definition.title), characterCreationContents);
            return buildSection(output, WuxSheetMain.Info.DefaultContents(definition));
        },

        buildTechniquesNavigation = function () {
            let learnDefinition = WuxDef.Get("Page_LearnTechniques");
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let pageFieldName = WuxDef.GetAttribute("Page");
            let learnSubtitle = learnDefinition.title;
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(learnDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Core", techniquesCorePageNavigation())}`;

            return buildSection(output, techniquesInfoContents(learnDefinition.getAttribute(WuxDef._info), tabFieldName, pageFieldName));
        },

        buildStylesNavigation = function (styleDefinitionName) {
            let styleDefinition = WuxDef.Get(styleDefinitionName);
            let tabFieldName = WuxDef.GetAttribute("PageSet");
            let pageFieldName = WuxDef.GetAttribute("Page");
            let learnSubtitle = styleDefinition.title;
            let output = `${WuxSheet.PageDisplayInput(tabFieldName, "Builder")}
            ${WuxSheet.PageDisplay("Builder", characterCreationNavigation(styleDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Training", trainingPageNavigation(styleDefinition, learnSubtitle))}
            ${WuxSheet.PageDisplay("Advancement", advancementPageNavigation(styleDefinition, learnSubtitle))}`;

            return buildSection(output, techniquesInfoContents(styleDefinition.getAttribute(WuxDef._info), tabFieldName, pageFieldName));
        };
    return {
        BuildOverviewPageNavigation: buildOverviewPageNavigation,
        BuildFormePageNavigation: buildFormePageNavigation,
        BuildGearPageNavigation: buildGearPageNavigation,
        BuildActionsPageNavigation: buildActionsPageNavigation,
        BuildOriginPageNavigation: buildOriginPageNavigation,
        BuildNpcPageNavigation: buildNpcPageNavigation,
        BuildNotesPageNavigation: buildNotesPageNavigation,
        BuildTechniquesNavigation: buildTechniquesNavigation,
        BuildStylesNavigation: buildStylesNavigation,
        BuildTrainingPageNavigation: buildTrainingPageNavigation,
        BuildAdvancementPageNavigation: buildAdvancementPageNavigation
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


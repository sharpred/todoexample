var overlayOpen = false;
Alloy.Collections.todoItems.fetch();
function doTransform(model) {
    "use strict";
    var transform = model.toJSON(),
        initial = transform.todoText.substring(0, 1).toUpperCase();
        console.log(initial);
        console.log(Alloy.Globals.palette);
    transform.template = "basic";
    transform.bgColor = Alloy.Globals.palette[initial];
    transform.selectionStyle = OS_IOS ? Ti.UI.iPhone.ListViewCellSelectionStyle.NONE : null;
    transform.iconInitial = initial;
    transform.title = transform.todoText;
    return transform;

}

function onTextFieldChange() {
    "use strict";
    if ($.textField.value.length > 1) {
        $.okbutton.show();
    } else {
        $.okbutton.hide();
    }
}

function onOkClick() {
    var newItem,
        obj = {},
        moment = require("alloy/moment");
    overlayOpen = !overlayOpen;
    newItem = Alloy.createModel("todoItems", {
        creationDate : moment().valueOf(),
        todoText : $.textField.value
    });
    newItem.save();
    $.button.title = Alloy.Globals.fontMap.plus;
    $.overlay.hide();
    updateUi();
}

function onClick() {
    "use strict";
    overlayOpen = !overlayOpen;
    console.log("onClick: " + overlayOpen);
    if (overlayOpen) {
        $.button.title = Alloy.Globals.fontMap.cross;
        $.overlay.show();
    } else {
        $.button.title = Alloy.Globals.fontMap.plus;
        $.overlay.hide();
    }
}

function updateUi() {
    "use strict";
    console.log("updateUi");
    Alloy.Collections.todoItems.fetch();
    updateListViewUi();
}

function doPull() {
    "use strict";
    console.log("doPull");
    updateUi();
}

function cleanUp() {
    $.destroy();
}

Alloy.Collections.todoItems.on("change", function(){
    "use strict";
    console.log("changed");
});

$.container.open();

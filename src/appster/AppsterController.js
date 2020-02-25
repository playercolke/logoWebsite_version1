import {AppsterCallback, AppsterGUIId, AppsterHTML, AppsterGUIClass} from './AppsterConstants.js'
import { GoLogoLoGUIId } from '../gologolo/GoLogoLoConstants.js';

export default class AppsterController {
    constructor() {
        this.model = null;
    }

    setModel(initModel) {
        this.model = initModel;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {AppsterGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {AppsterHTML} eventName The type of control for which to respond.
     * @param {AppsterCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        if (control)
            control.addEventListener(eventName, callback);
    }

    registerAppsterEventHandlers() {
        // FIRST THE NEW WORK BUTTON ON THE HOME SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_HOME_NEW_WORK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CREATE_NEW_WORK]);

        // THEN THE CONTROLS ON THE EDIT SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_HOME_LINK, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_GO_HOME]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TRASH, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DELETE_WORK]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(AppsterGUIId.DIALOG_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_DELETE_WORK]);
        this.registerEventHandler(AppsterGUIId.DIALOG_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_DELETE_WORK]);

        // naming box
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_TEXT_INPUT_MODAL_ENTER_BUTTON]);
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_TEXT_INPUT_MODAL_CANCEL_BUTTON]);

        // duplicate box and length box
        this.registerEventHandler(AppsterGUIId.APPSTER_CONFIRM_MODAL_OK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DUPLICATE_OK_BUTTON]);
        this.registerEventHandler(AppsterGUIId.APPSTER_LENGTH_MODAL_OK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_LENGTH_OK_BUTTON]);

        // delete box
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_YES_NO_MODAL_YES_BUTTON]);
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_YES_NO_MODAL_NO_BUTTON]);

        // Rename work
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_RENAME_BUTTON]);
        this.registerEventHandler(AppsterGUIId.APPSTER_RENAME_MODAL_ENTER_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_RENAME_CONFIRM_BUTTON]);
        this.registerEventHandler(AppsterGUIId.APPSTER_RENAME_MODAL_CANCEL_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_RENAME_CANCEL_BUTTON]);

        // Edit work
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_EDIT_FONT_SIDE]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER, AppsterHTML.INPUT, this[AppsterCallback.APPSTER_PROCESS_EDIT_TEXT_COLOR]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER, AppsterHTML.INPUT, this[AppsterCallback.APPSTER_PROCESS_EDIT_BACKGROUND_COLOR]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER, AppsterHTML.INPUT, this[AppsterCallback.APPSTER_PROCESS_EDIT_BORDER_COLOR]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_EDIT_BORDER_RADIUS]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_EDIT_BORDER_THICKNESS]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_EDIT_PADDING]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_EDIT_MARGIN]);
    }

    /**
    * This method sets up a callback method for an element, registering the
    * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
    * callbackFunctionName as the method to be called when that event occurs. The
    * args array is used to pass needed data to the callback.
    * 
    * @param {Element} element 
    * @param {String} elementCallbackName 
    * @param {String} callbackFunctionName 
    * @param {String[]} args 
    */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = "this." + callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    registerRecentWorkEventHandler(element) {
        element.addEventListener(AppsterHTML.CLICK, this.processEditWork);
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome = () => {
        console.log("processGoHome");
        this.model.goHome();
    }

    processGoEdit = (workToEdit) => {
        console.log("processGoEdit");
        this.model.goEdit(workToEdit);
    }

    /**
     * This function is called when the user requests to create
     * new work.
     */
    processCreateNewWork = () => {
        console.log("processCreateNewWork");

        // PROMPT FOR THE NAME OF THE NEW LIST
        let textWindow = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        textWindow.classList.add(AppsterGUIClass.IS_VISIBLE);
    }

    /**
     * This function is called when the user clicks the confirm button
     * to name the new work
     */
    processConfirmNaming = () => {
        console.log("processConfirmNaming");
        var textfield = document.getElementById("appster_text_input_modal_textfield");
        console.log(textfield.value);

        //check if the name is duplicate
        var duplicate = this.model.getRecentWork(textfield.value);
        if (duplicate) {
            let textWindow = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
            textWindow.classList.remove(AppsterGUIClass.IS_VISIBLE);
            let confirmWindow = document.getElementById(AppsterGUIId.APPSTER_CONFIRM_MODAL);
            confirmWindow.classList.add(AppsterGUIClass.IS_VISIBLE);
        }
        // name is invalid if length is less than one character
        else if (textfield.value.length < 1) {
            let textWindow = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
            textWindow.classList.remove(AppsterGUIClass.IS_VISIBLE);
            let lengthWindow = document.getElementById(AppsterGUIId.APPSTER_LENGTH_MODAL);
            lengthWindow.classList.add(AppsterGUIClass.IS_VISIBLE);
        }
        else {
        let textWindow = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        textWindow.classList.remove(AppsterGUIClass.IS_VISIBLE);

        // MAKE A BRAND NEW LIST
        this.model.goList(textfield.value);
        }

        // clear the textfield
        textfield.value = null;
    }

    /**
     * this function is called when the user click the ok button 
     * of the length confirm window
     */
    processLengthConfirm = () => {
        console.log("processLengthConfirm");

        let textWindow = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        textWindow.classList.add(AppsterGUIClass.IS_VISIBLE);
        let lengthWindow = document.getElementById(AppsterGUIId.APPSTER_LENGTH_MODAL);
        lengthWindow.classList.remove(AppsterGUIClass.IS_VISIBLE);
    }

    /**
     * this function is called when the user clicks the OK button 
     * of the duplicate window
     * the program will go back to the naming window
     */
    processDuplicateConfirm = () => {
        console.log("processDuplicateConfirm");

        
        let textWindow = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        textWindow.classList.add(AppsterGUIClass.IS_VISIBLE);
        let confirmWindow = document.getElementById(AppsterGUIId.APPSTER_CONFIRM_MODAL);
        confirmWindow.classList.remove(AppsterGUIClass.IS_VISIBLE);
    }

    /**
     * This function is called when the user clicks the cancel button 
     * at new work window
     */
    processCancelNaming = () => {
        console.log("processCancelNaming");

        //Close the naming window
        let textWindow = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        textWindow.classList.remove(AppsterGUIClass.IS_VISIBLE);
    }

    /**
     * This function responds to when the user clicks on a link
     * for recent work on the home screen.
     * 
     * @param {String} workName The name of the work to load into
     * the controls on the edit screen.
     */
    processEditWork = (event) => {
        console.log("processEditWork");

        // GET THE WORK THAT THE USER WANTS TO LOAD
        let clickedElement = event.target;
        let workName = clickedElement.workId;
        console.log(workName + " clicked");

        // START EDITING THE SELECTED WORK
        this.model.editWork(workName);
    }

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processCancelDeleteWork = () => {
        console.log("processCancelDeleteWork");
        // JUST HIDE THE DIALOG
        this.model.view.hideDialog();
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName = () =>  {
        console.log("processChangeName");

        let textfield = document.getElementById("appster_rename_modal_textfield");
        textfield.value = this.model.workToEdit.text;
        let nameTextWindow = document.getElementById(AppsterGUIId.APPSTER_RENAME_MODAL);
        nameTextWindow.classList.add(AppsterGUIClass.IS_VISIBLE);
    }

    /**
     * This function is called when the user click the rename button
     * of the rename window
     */
    processConfirmChangeName = () => {
        console.log("processConfirmChangeName");

        let textfield = document.getElementById("appster_rename_modal_textfield");
        this.model.workToEdit.setText(textfield.value);
        let nameTextWindow = document.getElementById(AppsterGUIId.APPSTER_RENAME_MODAL);
        nameTextWindow.classList.remove(AppsterGUIClass.IS_VISIBLE);
        this.model.updateText();
    }

    /**
     * This function is called when the user click the cancel button 
     * of the rename window
     */
    processCancelChangeName = () => {
        console.log("processCancelChangeName");

        let nameTextWindow = document.getElementById(AppsterGUIId.APPSTER_RENAME_MODAL);
        nameTextWindow.classList.remove(AppsterGUIClass.IS_VISIBLE);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processConfirmDeleteWork = () => {
        console.log("processConfirmDeleteWork");
        // DELETE THE WORK
        this.model.removeWork(this.model.getWorkToEdit());
        this.model.view.hideDialog();

        // GO BACK TO THE HOME SCREEN
        this.model.goHome();
    }

    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteWork = () => {
        console.log("processDeleteWork");
        // VERIFY VIA A DIALOG BOX
        this.model.view.showDialog();
    }

    /**
     * This Function is call when the user click on the 
     * font size bar
     */
    processEditFontSize = () => {
        console.log("processEditFontSize");

        let fontSize = document.getElementById("gologolo_font_size_slider");
        this.model.workToEdit.setFontSize(fontSize.value + "pt");

        this.model.updateEdit();
    }

    /**
     * This function is for text color changing
     */
    processEditTextColor = () => {
        console.log("processEditTextColor");

        let textColor = document.getElementById("gologolo_text_color_picker");
        this.model.workToEdit.setTextColor(textColor.value);

        this.model.updateEdit();
    }

    /**
     * This function is for background color changing
     */
    processEditBackgroundColor = () => {
        console.log("processEditBackgroundColor");

        let backgroundColor = document.getElementById("gologolo_background_color_picker");
        this.model.workToEdit.setBackgroundColor(backgroundColor.value);

        this.model.updateEdit();
    }

    /**
     * This function is for border color changing
     */
    processEditBorderColor = () => {
        console.log("processEditBorderColor");

        let borderColor = document.getElementById("gologolo_border_color_picker");
        this.model.workToEdit.setBorderColor(borderColor.value);

        this.model.updateEdit();
    }

    /**
     * This function is for border radius changing
     */
    processEditBorderRadius = () => {
        console.log("processEditBorderRadius");

        let borderRadius = document.getElementById("gologolo_border_radius_slider");
        this.model.workToEdit.setBorderRadius(borderRadius.value + "pt");

        this.model.updateEdit();
    }

    /**
     * This function is for border thickness changing
     */
    processEditBorderThickness = () => {
        console.log("processEditBorderThickness");

        let borderThickness = document.getElementById("gologolo_border_thickness_slider");
        this.model.workToEdit.setBorderThickness(borderThickness.value + "pt");

        this.model.updateEdit();
    }

    /**
     * This function is for Padding changing
     */
    processEditPadding = () => {
        console.log("processEditPadding");

        let padding = document.getElementById("gologolo_padding_slider");
        this.model.workToEdit.setPadding(padding.value + "px");

        this.model.updateEdit();
    }

    /**
     * This function is for Margin Changing
     */
    processEditMargin = () => {
        console.log("processEditMargin");

        let margin = document.getElementById("gologolo_margin_slider");
        this.model.workToEdit.setMargin(margin.value + "pt");

        this.model.updateEdit();
    }
}
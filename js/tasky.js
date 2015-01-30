//----------------------------------------------------------
// Author: Andres Guzman 
// Date: Sat Jan 31 2015 
//----------------------------------------------------------

//----------------------------------------------------------
// Global vars
//----------------------------------------------------------

/**
 * CSS Class for selected item
 */
var selectedItemDisplay = "selected-item";

/** 
 * JSON with all tasks
 */
var allTasks = "";

//----------------------------------------------------------
// Page on load
//----------------------------------------------------------

/**
 * Initializes the page
 * Loads all tasks from JSON file and shows all tasks
 */
window.onload = function () {
    loadTasks();
    showInbox();
}

//----------------------------------------------------------
// UI Functions
//----------------------------------------------------------

/**
 * Shows to-do tasks
 */
function showToDoTasks() {
    changeDisplayedElement();
    $("#todo").addClass(selectedItemDisplay);
    var process = "";
    var activityId = "";
    var activityName = "";
    var requestDate = "";
    var employee = "";
    var approved = "";
    var cnt = "";
    for (i = 0; i < allTasks.length; i++) {
        approved = allTasks[i].approved;
        if (approved == "") {
            process = allTasks[i].process;
            activityId = allTasks[i].activityId;
            activityName = allTasks[i].activity;
            requestDate = dateToString(allTasks[i].requestDate);
            employee = allTasks[i].employee;
            cnt = "<div class='email-item email-item-unread pure-g' id='" + "item" + activityId + "' onclick=" + '"' + "showTaskDetails('" + activityId + "')" + '"' + "><div class='pure-u'><img class='email-avatar' height='64' width='64' src='img/generic-profile.png'></div><div class='pure-u-3-4'><h5 class='email-name'>" + employee + "</h5> <h4 class='email-subject'>" + process + " - " + activityName + "</h4> <p class='email-desc'>" + requestDate + "</p></div></div>";

            $("#list").append(cnt);
            cnt = "";
        }
    }
}

/**
 * Shows completed tasks
 */
function showCompletedTasks() {
    changeDisplayedElement();
    $("#completed").addClass(selectedItemDisplay);
    var process = "";
    var activityId = "";
    var activityName = "";
    var requestDate = "";
    var employee = "";
    var approved = "";
    var cnt = "";
    for (i = 0; i < allTasks.length; i++) {
        approved = allTasks[i].approved;
        if (approved != "") {
            process = allTasks[i].process;
            activityId = allTasks[i].activityId;
            activityName = allTasks[i].activity;
            requestDate = dateToString(allTasks[i].requestDate);
            employee = allTasks[i].employee;
            if (approved == "approve") {
                cnt = "<div class='email-item email-item-aprovado pure-g' id='" + "item" + activityId + "' onclick=" + '"' + "showTaskDetails('" + activityId + "')" + '"' + "><div class='pure-u'><img class='email-avatar' height='64' width='64' src='img/generic-profile.png'></div><div class='pure-u-3-4'><h5 class='email-name'>" + employee + "</h5> <h4 class='email-subject'>" + process + " - " + activityName + "</h4> <p class='email-desc'>" + requestDate + "</p></div></div>";
            } else {
                cnt = "<div class='email-item email-item-negado pure-g' id='" + "item" + activityId + "' onclick=" + '"' + "showTaskDetails('" + activityId + "')" + '"' + "><div class='pure-u'><img class='email-avatar' height='64' width='64' src='img/generic-profile.png'></div><div class='pure-u-3-4'><h5 class='email-name'>" + employee + "</h5> <h4 class='email-subject'>" + process + " - " + activityName + "</h4> <p class='email-desc'>" + requestDate + "</p></div></div>";
            }
            $("#list").append(cnt);
            cnt = "";
        }

    }
}

/**
 * Shows all tasks
 */
function showInbox() {
    changeDisplayedElement();
    $("#inbox").addClass(selectedItemDisplay);
    var process = "";
    var activityId = "";
    var activityName = "";
    var requestDate = "";
    var employee = "";
    var approved = "";
    var cnt = "";
    for (i = 0; i < allTasks.length; i++) {
        process = allTasks[i].process;
        activityId = allTasks[i].activityId;
        activityName = allTasks[i].activity;
        requestDate = dateToString(allTasks[i].requestDate);
        employee = allTasks[i].employee;
        approved = allTasks[i].approved;
        if (approved == "approve") {
            cnt = "<div class='email-item email-item-aprovado pure-g' id='" + "item" + activityId + "' onclick=" + '"' + "showTaskDetails('" + activityId + "')" + '"' + "><div class='pure-u'><img class='email-avatar' height='64' width='64' src='img/generic-profile.png'></div><div class='pure-u-3-4'><h5 class='email-name'>" + employee + "</h5> <h4 class='email-subject'>" + process + " - " + activityName + "</h4> <p class='email-desc'>" + requestDate + "</p></div></div>";
        } else if (approved == "reject") {
            cnt = "<div class='email-item email-item-negado pure-g' id='" + "item" + activityId + "' onclick=" + '"' + "showTaskDetails('" + activityId + "')" + '"' + "><div class='pure-u'><img class='email-avatar' height='64' width='64' src='img/generic-profile.png'></div><div class='pure-u-3-4'><h5 class='email-name'>" + employee + "</h5> <h4 class='email-subject'>" + process + " - " + activityName + "</h4> <p class='email-desc'>" + requestDate + "</p></div></div>";
        } else {
            cnt = "<div class='email-item email-item-unread pure-g' id='" + "item" + activityId + "' onclick=" + '"' + "showTaskDetails('" + activityId + "')" + '"' + "><div class='pure-u'><img class='email-avatar' height='64' width='64' src='img/generic-profile.png'></div><div class='pure-u-3-4'><h5 class='email-name'>" + employee + "</h5> <h4 class='email-subject'>" + process + " - " + activityName + "</h4> <p class='email-desc'>" + requestDate + "</p></div></div>";
        }
        $("#list").append(cnt);
    }

}

/**
 * Resets all items in view
 */
function changeDisplayedElement() {
    $('div').removeClass("email-item-selected");
    $("#list").empty();
    $("#currentTaskDetail").empty();
    $("#inbox").removeClass(selectedItemDisplay);
    $("#todo").removeClass(selectedItemDisplay);
    $("#completed").removeClass(selectedItemDisplay);
}

//----------------------------------------------------------
// Core Functions
//----------------------------------------------------------

/**
 * Loads all tasks from JSON file
 */
function loadTasks() {
    var url = "https://api.myjson.com/bins/3ffh3";
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    allTasks = JSON.parse(request.responseText);
}

/**
 * Shows detailed information on selected task
 */
function showTaskDetails(activityId) {
    $('div').removeClass("email-item-selected");
    $('#item' + activityId).addClass("email-item-selected");
    $("#main").empty();
    var id = parseInt(activityId) - 1;
    var process = allTasks[id].process;
    var activityName = allTasks[id].activity;
    var requestDate = dateToString(allTasks[id].requestDate);
    var employee = allTasks[id].employee;
    var approved = allTasks[id].approved;
    if (approved == "") {
        approved = "To-Review";
    }
    var beginDate = dateToString(allTasks[id].beginDate);
    var endDate = dateToString(allTasks[id].endDate);
    var lastVacation = dateToString(allTasks[id].lastVacationOn);
    var nDays = getRequestedDays(allTasks[id].beginDate, allTasks[id].endDate);
    var cnt = "";
    if (approved == "To-Review") {
        cnt = "<div id='currentTaskDetail' class='email-content'><div class='email-content-header pure-g'> <div class='pure-u-1-2'><h1 class='email-content-title'>" + process + " - " + activityName + "</h1> <p class='email-content-subtitle'> From <a>" + employee + "</a> at <span>" + requestDate + "</span></p></div><div class='email-content-controls pure-u-1-2'><button class='secondary-button pure-button' onclick=" + '"' + "completeTask('" + id + "', 'approve')" + '"' + "><i class='fa fa-check-circle-o'></i> Approve</button><button class='secondary-button pure-button' onclick=" + '"' + "completeTask('" + id + "', 'reject')" + '"' + "><i class='fa fa-minus-circle'></i> Reject</button></div></div><div class='email-content-body'><p><i class='fa fa-star'></i> State: " + approved + "</p> <p><i class='fa fa-cogs'></i> Process: " + process + "</p> <p><i class='fa fa-cog'></i> Activity: " + activityName + "</p><p><i class='fa fa-dot-circle-o'></i> Requested: " + requestDate + "</p><p><i class='fa fa-calendar'></i> Begin date: " + beginDate + "</p> <p><i class='fa fa-calendar'></i> End date: " + endDate + "</p><p><i class='fa fa-book'></i> Last vacation: " + lastVacation + "</p> <p><i class='fa fa-calendar'></i> Requested days: " + nDays + " days</p></div></div>";
    } else {
        cnt = "<div id='currentTaskDetail' class='email-content'><div class='email-content-header pure-g'> <div class='pure-u-1-2'><h1 class='email-content-title'>" + process + " - " + activityName + "</h1> <p class='email-content-subtitle'> From <a>" + employee + "</a> at <span>" + requestDate + "</span></p></div><div class='email-content-controls pure-u-1-2'><button disabled class='secondary-button pure-button' onclick=" + '"' + "completeTask('" + id + "', 'approve')" + '"' + "><i class='fa fa-check-circle-o'></i> Approve</button><button disabled class='secondary-button pure-button' onclick=" + '"' + "completeTask('" + id + "', 'reject')" + '"' + "><i class='fa fa-minus-circle'></i> Reject</button></div></div><div class='email-content-body'><p><i class='fa fa-star'></i> State: " + approved + "</p> <p><i class='fa fa-cogs'></i> Process: " + process + "</p> <p><i class='fa fa-cog'></i> Activity: " + activityName + "</p><p><i class='fa fa-dot-circle-o'></i> Requested: " + requestDate + "</p><p><i class='fa fa-calendar'></i> Begin date: " + beginDate + "</p> <p><i class='fa fa-calendar'></i> End date: " + endDate + "</p><p><i class='fa fa-book'></i> Last vacation: " + lastVacation + "</p> <p><i class='fa fa-calendar'></i> Requested days: " + nDays + " days</p></div></div>";
    }

    $("#main").append(cnt);
}

/**
 * Changes the state of the request upon the answer
 */
function completeTask(task, answer) {
    var id = parseInt(task);
    allTasks[id].approved = answer;
    id = id + 1;
    if (answer == 'approve') {
        $("#item" + id).addClass("email-item-aprovado");
    } else {
        $("#item" + id).addClass("email-item-negado");
    }
    showTaskDetails(id + "");
    sendDataToServer(allTasks[id - 1]);
}

/**
* Sends JSON data on modified object to server 
*/
function sendDataToServer(data) {
    //Change server url 
    /*
    var url = "http://localhost:8080/Bizagi"
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json'
    });
    */
}

/**
 * Returns the number of requested days
 */
function getRequestedDays(start, end) {
    var dStart = new Date(start);
    var dEnd = new Date(end);
    var ONE_DAY = 1000 * 60 * 60 * 24;
    var dStartMS = dStart.getTime();
    var dEndMS = dEnd.getTime();
    var differenceMS = Math.abs(dStartMS - dEndMS);
    return Math.round(differenceMS / ONE_DAY);
}

/**
 * Returns a date in format I.E Fri Jan 30 2015
 */
function dateToString(date) {
    var nDate = new Date(date);
    return nDate.toDateString();
}

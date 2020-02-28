var ACTIVITIES = document.getElementsByClassName("panel_container");

function choose_activity(activity) {
    for (var i = 0; i < ACTIVITIES.length; i++) {
        if (ACTIVITIES[i].id != activity) {
            ACTIVITIES[i].style.display = "none";
        }
        else {
            ACTIVITIES[i].style.display = "block";
        }
    }
}
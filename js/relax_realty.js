var ACTIVITIES = document.getElementsByClassName("panel_container");
var DISPLAYEDLISTING = null;

// show and hide activity panels
function chooseActivity(activity) {
    for (var i = 0; i < ACTIVITIES.length; i++) {
        if (ACTIVITIES[i].id != activity) {
            if (ACTIVITIES[i].style.display != "none") {
                ACTIVITIES[i].style.display = "none";
            }
        }
        else {
            ACTIVITIES[i].style.display = "block";
        }
    }
}

// system determines new listing number
function startNewListing() {
    chooseActivity('new_listing');

    document.getElementById("listingNum").value = MockDatabase.newListingNum();
}

// create new listing in mock database
function createNewListing() {
    var newListing = Listing.new();

    MockDatabase.push(newListing);

    chooseActivity('what_to_do');
}

// search database by agent name
function agentSearch() {
    clearAgentSearch();

    var searchKey = document.getElementById("agentSearchInput").value;
    var listings = MockDatabase.agentNameSearch(searchKey);

    if (listings != null) {
        displaySelect(listings);
    }
}

// search database by listing number
function numberSearch() {
    clearSearchResults();

    var searchKey = document.getElementById("listingSearchInput").value;
    var listing = MockDatabase.listingNumSearch(searchKey);

    if (listing != null) {
        DISPLAYEDLISTING = listing;
        var output = document.getElementById("searchResults");

        for (var key in listing) {
            output.value = output.value + key + ": " + listing[key] + "\n";
        }
    }
}

// clear search results
function clearSearchResults() {
    document.getElementById("searchResults").value = "";

    DISPLAYEDLISTING = null;
}

// display selected listing in search box
function selectSelect() {
    var selectedListing = document.getElementById("listingSelect");
    var selected = selectedListing.options[selectedListing.selectedIndex].value;

    document.getElementById("listingSearchInput").value = selected;
    numberSearch();
}

// clear agent listing search
function clearAgentSearch() {
    var toRemove = document.getElementById("listingSelect");

    if (toRemove != null) {
        document.getElementById("agentListingList").removeChild(toRemove);
    }
}

// display select with agent listings
function displaySelect(listings) {
    var myDiv = document.getElementById("agentListingList");

    if (listings.length < 2) {
        var size = 2;
    } else if (listings.length > 5) {
        var size = 5;
    } else {
        var size = listings.length;
    }

    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "listingSelect");
    selectList.setAttribute("size", size);
    myDiv.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < listings.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", listings[i].listingNum);
        option.text = listings[i].listingNum;
        selectList.appendChild(option);
    }
}
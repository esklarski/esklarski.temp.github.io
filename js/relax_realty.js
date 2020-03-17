// pull in all activities panels
var ACTIVITIES = document.getElementsByClassName("panel_container");
// determined by login page
var LOGGED_IN_AGENT = "demo_agent";
// storage for passing listing between panels
var DISPLAYED_LISTING = null;


// ************************************ General Page Functions ************************************

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


// *********************************** Create Listing Functions ***********************************

// system determines new listing number
function startNewListing() {
    chooseActivity('new_listing');

    document.getElementById("listingNum").value = MockDatabase.newListingNum();
    document.getElementById("agent").value = LOGGED_IN_AGENT;
}

// create new listing in mock database
function createNewListing() {
    var newListing = Listing.new();

    MockDatabase.push(newListing);
    chooseActivity('what_to_do');
}

// cancels creation and returns to main panel
function cancelNewListingButton() {
    clearNewListingForm();
    chooseActivity('what_to_do');
}

// clear clear new listing form fields
function clearNewListingForm() {
    document.getElementById("clientName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("clientPhone").value = "";
    document.getElementById("clientEmail").value = "";
    document.getElementById("mlsNum").value = "";
    document.getElementById("propertyDescription").value = "";
    document.getElementById("askingPrice").value = "";
    document.getElementById("propertyType").selectedIndex = 0;
    document.getElementById("titleType").selectedIndex = 0;
    document.getElementById("storeys").value = "";
    document.getElementById("year").value = "";
    document.getElementById("floorSpace").value = "";
    document.getElementById("bedroomNum").value = "";
    document.getElementById("bathroomNum").value = "";
    document.getElementById("propertyTaxes").value = "";
    document.getElementById("strataFees").value = "";
    document.getElementById("landSize").value = "";
    document.getElementById("basement").selectedIndex = 0;
    document.getElementById("interiorFeatures").value = "";
    document.getElementById("buildingFeatures").value = "";
    document.getElementById("propertyFeatures").value = "";
    document.getElementById("neighborhoodFeatures").value = "";
    document.getElementById("sellingPrice").value = "";
    document.getElementById("offerHx").value = "";
    document.getElementById("listingNotes").value = "";
}


// *********************************** Listing Search Functions ***********************************

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
        DISPLAYED_LISTING = listing;
        var output = document.getElementById("searchResults");

        for (var key in listing) {
            output.value = output.value + key + ": " + listing[key] + "\n";
        }
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

// display selected listing in search box
function selectSelect() {
    var selectedListing = document.getElementById("listingSelect");
    var selected = selectedListing.options[selectedListing.selectedIndex].value;

    document.getElementById("listingSearchInput").value = selected;
    numberSearch();
}

// clear agent listing results
function clearAgentSearch() {
    var toRemove = document.getElementById("listingSelect");

    if (toRemove != null) {
        document.getElementById("agentListingList").removeChild(toRemove);
    }
}

// clear search results
function clearSearchResults() {
    document.getElementById("searchResults").value = "";
    DISPLAYED_LISTING = null;
}

// clear button clicked
function clearSearchButton() {
    document.getElementById("agentSearchInput").value = "";
    document.getElementById("listingSearchInput").value = "";
    clearSearchResults();
    clearAgentSearch();
}


// ************************************ View Records Functions ************************************


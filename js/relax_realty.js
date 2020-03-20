// pull in all activities panels
var ACTIVITIES = document.getElementsByClassName("panel_container");
// determined by login page
var LOGGED_IN_AGENT = setUsername();
// storage for passing listing between panels
var DISPLAYED_LISTING = null;

function initializePage() {
    clearNewListingForm();
    clearSearchButton();
    chooseActivity('what_to_do');
}


// *********************************** General Page Functions ***********************************

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

// checks for saved username, passes back a value
function setUsername() {
    if (sessionStorage.username != undefined && sessionStorage.username != "") {
        return sessionStorage.username;
    } else {
        return "demo_agent";
    }
}


// ********************************** Create Listing Functions **********************************

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
    document.getElementById("client").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mlsNum").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("propertyType").selectedIndex = 0;
    document.getElementById("titleType").selectedIndex = 0;
    document.getElementById("storeys").value = "";
    document.getElementById("year").value = "";
    document.getElementById("floorSpace").value = "";
    document.getElementById("bedrooms").value = "";
    document.getElementById("bathrooms").value = "";
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
    document.getElementById("notes").value = "";
}


// ********************************** Listing Search Functions **********************************

// search database by agent name
function agentSearch() {
    clearAgentSearch();

    var searchKey = document.getElementById("agentSearchInput").value;
    var listings = MockDatabase.agentNameSearch(searchKey);

    if (listings.length != 0) {
        displaySelect(listings);
    } else {
        alert("Agent name not found.");
    }
}

// search database by listing number
function numberSearch() {
    clearSearchResults();

    var searchKey = document.getElementById("listingSearchInput").value;
    var listing = MockDatabase.listingNumSearch(searchKey);

    if (listing != null) {
        displaySearchResults(listing);
    } else {
        alert("Listing number not found.");
    }
}

// display search results omitting sensitive data
function displaySearchResults(listing) {
    DISPLAYED_LISTING = listing;
    var output = document.getElementById("searchResults");

    for (var key in listing) {
        if (key == "client" || key == "phone" || key == "email" || key == "notes") {
            if (LOGGED_IN_AGENT == listing.agent) {
                output.value = output.value + key + ": " + listing[key] + "\n";
            } else {
                continue;
            }
        } else {
            output.value = output.value + key + ": " + listing[key] + "\n";
        }
    }
}

// display select with agent listings
function displaySelect(listings) {
    var myDiv = document.getElementById("agentListingList");

    if (listings.length > 5) {
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

// clear button
function clearSearchButton() {
    document.getElementById("agentSearchInput").value = "";
    document.getElementById("listingSearchInput").value = "";
    clearSearchResults();
    clearAgentSearch();
}

// check authorization to edit, then display in create panel
function updateListingButton() {
    if (DISPLAYED_LISTING != null) {
        if (DISPLAYED_LISTING.agent == LOGGED_IN_AGENT) {
            for (var key in DISPLAYED_LISTING) {
                document.getElementById(key).value = DISPLAYED_LISTING[key];
            }

            chooseActivity('new_listing');
        } else {
            alert("You may only update your own records.\nPlease speak to management, to report\nany inconsistencies or errors found.");
        }
    } else {
        alert("Please find a record to update via the search functions.");
    }
}


// *********************************** View Records Functions ***********************************

// display fee summary - **button on listing search page**
function viewRecordsButton() {
    if (DISPLAYED_LISTING != null) {
        if (parseInt(DISPLAYED_LISTING.sellingPrice)) {
            chooseActivity('print_records');

            // calculate totals
            var sellingPrice = parseInt(DISPLAYED_LISTING.sellingPrice);
            var agentCommission = calcAgentComm(sellingPrice);
            var sellerFee = calcSellerFee(agentCommission);
    
            // output to page
            document.getElementById("sellingPriceOutput").value = sellingPrice;
            document.getElementById("agentCommission").value    = agentCommission;
            document.getElementById("sellerFee").value          = sellerFee;
        } else {
            alert("no selling price available for listing");
        }
    } else {
        alert("Please find a record to view via the search functions.");
    }
}

// calculate agent's commission
function calcAgentComm(sellingPrice) {
    var commision = 0;
    var listingFee = 400;

    if (sellingPrice - 100000 <= 0) {
        commision = sellingPrice * 0.06;
    } else {
        sellingPrice = sellingPrice - 100000;
        commision = (sellingPrice * 0.03) + 6000 - listingFee;
    }

    return commision;
}

// calculate seller's fee
function calcSellerFee(agentCommission) {
    return agentCommission * 1.05;
}
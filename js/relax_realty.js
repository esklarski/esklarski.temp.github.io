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

// convert number to currency for display
function toCurrency(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}


// ********************************** Create Listing Functions **********************************

function editListing(newListing) {
    if (newListing) {
        document.getElementById("createUpdateTitle").textContent = "Create Listing";
        document.getElementById("createUpdateButton").value = "create listing";
        document.getElementById("listingNum").value = MockDatabase.newListingNum();
        document.getElementById("agent").value = LOGGED_IN_AGENT;
    } else {
        document.getElementById("createUpdateTitle").textContent = "Update Listing";
        document.getElementById("createUpdateButton").value = "update listing";

        for (var key in DISPLAYED_LISTING) {
            document.getElementById(key).value = DISPLAYED_LISTING[key];
        }

        window.scrollTo(0,0);
    }

    chooseActivity('new_listing');
}

// create new listing in mock database
function createNewListing() {
    var newListing = Listing.new();

    MockDatabase.push(newListing);

    chooseActivity('what_to_do');
    clearNewListingForm();
}

// cancels creation and returns to main panel
function cancelNewListingButton() {
    chooseActivity('what_to_do');
    clearNewListingForm();
}

// clear new listing form fields
function clearNewListingForm() {
    document.getElementById("client").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mlsNum").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("propertyType").selectedIndex = 0;
    document.getElementById("titleType").selectedIndex    = 0;
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

// insert username as default search key
function lookupListing() {
    document.getElementById("agentSearchInput").value = LOGGED_IN_AGENT;
    chooseActivity('lookup_listing')
}

// search database by agent name
function agentSearch() {
    clearAgentSearch();

    var search    = document.getElementById("agentSearchInput");
    var searchKey = search.value;

    if (searchKey != "") {
        var listings = MockDatabase.agentNameSearch(searchKey);

        if (listings != null) {
            displaySelect(listings);
        } else {
            alert("Agent name not found.");
            search.focus();
        }
    } else {
        alert("Please enter a name to search.");
        search.focus();
    }
}

// search database by listing number
function numberSearch() {
    clearSearchResults();

    var search    = document.getElementById("listingSearchInput");
    var searchKey = parseInt(search.value);

    if (searchKey != NaN) {
        var listing = MockDatabase.listingNumSearch(searchKey);

        if (listing != null) {
            displaySearchResults(listing);
        } else {
            alert("Listing number not found.");
            search.focus();
        }
    } else {
        alert("Please enter a number to search.");
        search.focus();
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
        } else if (key == "price" || key == "sellingPrice") {
            output.value = output.value + key + ": " + toCurrency(listing[key]) + "\n";
        } else {
            output.value = output.value + key + ": " + listing[key] + "\n";
        }
    }
}

// display select with agent listings
function displaySelect(listings) {
    var agentListings = document.getElementById("agentListingList");

    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "listingSelect");
    selectList.setAttribute("size", 1);
    agentListings.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < listings.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", listings[i].listingNum);
        option.text = "#" + listings[i].listingNum
                  + " - " + listings[i].propertyType
                  +  " "  + toCurrency(listings[i].sellingPrice);
        selectList.appendChild(option);
    }

    document.getElementById("listingSelect").selectedIndex = 0;
    selectSelect();
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
    document.getElementById("agentSearchInput").value   = "";
    document.getElementById("listingSearchInput").value = "";
    clearSearchResults();
    clearAgentSearch();
}

// check authorization to edit, then display in create panel
function updateListingButton() {
    if (DISPLAYED_LISTING != null) {
        if (DISPLAYED_LISTING.agent == LOGGED_IN_AGENT) {
            editListing(false);
            clearSearchButton();
        } else {
            alert("You may only update your own records. Please speak to management, to report any inconsistencies or errors found.");
        }
    } else {
        alert("Please find a record to update via the search functions.");
    }
}

function viewRecordsButton() {
    if (DISPLAYED_LISTING != null) {
        if (DISPLAYED_LISTING.sellingPrice != "") {
            calcRecords();
            chooseActivity('print_records');
        } else {
            alert("no selling price available for listing");
        }
    } else {
        alert("Please find a record to view via the search functions.");
    }
}


// *********************************** View Records Functions ***********************************

// calculate and display fee summary
function calcRecords() {
    var sellingPrice          = DISPLAYED_LISTING.sellingPrice;
    var agentCommissionTotal  = calcTotalComm(sellingPrice);
    var singleAgentCommission = calcAgentComm(agentCommissionTotal);
    var sellerFee             = calcSellerFee(agentCommissionTotal);

    document.getElementById("sellingPriceOutput").value    = toCurrency(sellingPrice);
    document.getElementById("agentCommissionTotal").value  = toCurrency(agentCommissionTotal);
    document.getElementById("agentCommissionSingle").value = toCurrency(singleAgentCommission);
    document.getElementById("sellerFee").value             = toCurrency(sellerFee);
    document.getElementById("sellerNet").value             = toCurrency(sellingPrice - sellerFee);
}

function printClientRecord() {
    if (DISPLAYED_LISTING.agent == LOGGED_IN_AGENT) {
        alert("Feature not yet implemented.\nImagine I gave you a pdf...")
    } else {
        alert("You may only print records for your clients.");
    }
}

// calculate sale total commission
function calcTotalComm(sellingPrice) {
    if (sellingPrice <= 100000) {
        return sellingPrice * 0.06;
    } else {
        return ((sellingPrice - 100000) * 0.03) + 6000;
    }
}

// caclulate individual agent commission
function calcAgentComm(agentCommissionTotal) {
    return (agentCommissionTotal / 2) - 400;
}

// calculate seller's fee
function calcSellerFee(agentCommissionTotal) {
    return agentCommissionTotal * 1.05;
}
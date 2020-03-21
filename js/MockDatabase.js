// global variable to emulate database
var listingArray = [
    new Listing(0, "agent1", "blah", "blah", "blah", "blah",
                "blah", "blah", 850000,
                "single family", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                800000, "blah", "blah"),

    new Listing(1, "agent2", "blah", "blah", "blah", "blah",
                "blah", "blah", 450000,
                "condo", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                450000, "blah", "blah"),

    new Listing(2, "agent2", "blah", "blah", "blah", "blah",
                "blah", "blah", 500000,
                "condo", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                600000, "blah", "blah"),

    new Listing(3, "agent1", "blah", "blah", "blah", "blah",
                "blah", "blah", 735000,
                "townhouse", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                725000, "blah", "blah"),

    new Listing(4, "agent3", "blah", "blah", "blah", "blah",
                "blah", "blah", 500000,
                "condo", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                450000, "blah", "blah"),

    new Listing(5, "agent1", "blah", "blah", "blah", "blah",
                "blah", "blah", 850000,
                "single family", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                850000, "blah", "blah"),

    new Listing(6, "agent1", "blah", "blah", "blah", "blah",
                "blah", "blah", 950000,
                "single family", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                1000000, "blah", "blah"),

    new Listing(7, "agent2", "blah", "blah", "blah", "blah",
                "blah", "blah", 650000,
                "apartment", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                640000, "blah", "blah"),

    new Listing(8, "agent2", "blah", "blah", "blah", "blah",
                "blah", "blah", 500000,
                "condo", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                500000, "blah", "blah"),

    new Listing(9, "agent3", "blah", "blah", "blah", "blah",
                "blah", "blah", 300000,
                "apartment", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                300000, "blah", "blah")
];

// database object to simulate query and reply
class MockDatabase {
    // send back next listing number
    static newListingNum() {
        return listingArray.length;
    }

    // search listings by number, return appropriate listing
    static listingNumSearch(number) {
        if (!listingArray[number]) {
            return null;
        } else {
            return listingArray[number];
        }
    }

    // search by agent name, return array of matching listings
    static agentNameSearch(name) {
        var results = [];
    
        for (var i = 0; i < listingArray.length; i++) {
            if (listingArray[i].agent == name) {
                results.push(listingArray[i]);
            }
        }

        return results;
    }

    // add or update listing
    static push(newListing) {
        var index = newListing.listingNum

        if (!listingArray[index]) {
            listingArray.push(newListing);
        } else {
            listingArray[index] = newListing;
        }
    }
}
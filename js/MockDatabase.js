// global variable to emulate database
var listingArray = [
    new Listing( 1, "agent1", "blah", "blah", "blah", "blah",
                "blah", "blah", 850000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                800000, "blah", "blah"),

    new Listing( 2, "agent2", "blah", "blah", "blah", "blah",
                "blah", "blah", 450000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                450000, "blah", "blah"),

    new Listing( 3, "agent2", "blah", "blah", "blah", "blah",
                "blah", "blah", 500000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                600000, "blah", "blah"),

    new Listing( 4, "agent1", "blah", "blah", "blah", "blah",
                "blah", "blah", 735000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                725000, "blah", "blah"),

    new Listing( 5, "agent3", "blah", "blah", "blah", "blah",
                "blah", "blah", 500000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                450000, "blah", "blah"),

    new Listing( 6, "agent1", "blah", "blah", "blah", "blah",
                "blah", "blah", 850000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                850000, "blah", "blah"),

    new Listing( 7, "agent1", "blah", "blah", "blah", "blah",
                "blah", "blah", 950000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                1000000, "blah", "blah"),

    new Listing( 8, "agent2", "blah", "blah", "blah", "blah",
                "blah", "blah", 650000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                640000, "blah", "blah"),

    new Listing( 9, "agent2", "blah", "blah", "blah", "blah",
                "blah", "blah", 500000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                500000, "blah", "blah"),

    new Listing(10, "agent3", "blah", "blah", "blah", "blah",
                "blah", "blah", 300000,
                "blah", "blah", "blah", "blah", "blah", "blah", "blah",
                0, 0, "blah", "blah",
                "blah", "blah", "blah", "blah",
                300000, "blah", "blah")
];

// database object to simulate query and reply
class MockDatabase {

    // send back next listing number
    static newListingNum() {
        var nextListing = listingArray.length + 1;
        return nextListing;
    }

    // search listings by number, return appropriate listing
    static listingNumSearch(number) {
        var found = false;
    
        for (var i = 0; i < listingArray.length; i++) {
            if (listingArray[i].listingNum == number) {
                found = true;
                number = i;
                break;
            }
        }
    
        if (found) {
            return listingArray[number];
        } else {
            alert("Listing number not found.");
            return null;
        }
    }

    // search by agent name, return array of matching listings
    static agentNameSearch(name) {
        var found = false;
        var results = [];
    
        for (var i = 0; i < listingArray.length; i++) {
            if (listingArray[i].agent == name) {
                found = true;
                results.push(listingArray[i]);
            }
        }
    
        if (found) {
            return results;
        } else {
            alert("Agent name not found.");
            return null;
        }
    }

    // add new listing to database array
    static push(newListing) {
        listingArray.push(newListing);
    }
}
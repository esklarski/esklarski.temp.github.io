class Listing {
    // listingNum;
    // agent;
    // client;
    // address;
    // phone;
    // email;

    // mlsNum;
    // description;
    // price;

    // propertyType;
    // titleType;
    // storeys;
    // year;
    // floorSpace;
    // bedrooms;
    // bathrooms;

    // propertyTaxes;
    // strataFees;
    // landSize;
    // basement;

    // interiorFeatures;
    // buildingFeatures;
    // propertyFeatures;
    // neighborhoodFeatures;

    // sellingPrice;
    // offerHx;
    // notes;

    constructor (
        _listingNum, _agent, _client, _address, _phone, _email,
        _mlsNum, _description, _price,
        _propertyType, _titleType, _storeys, _year, _floorSpace, _bedrooms, _bathrooms,
        _propertyTaxes, _strataFees, _landSize, _basement,
        _interiorFeatures, _buildingFeatures, _propertyFeatures, _neighborhoodFeatures,
        _sellingPrice, _offerHx, _notes
    ) {
        this.listingNum = _listingNum;
        this.agent      = _agent;
        this.client     = _client;
        this.address    = _address;
        this.phone      = _phone;
        this.email      = _email;

        this.mlsNum      = _mlsNum;
        this.description = _description;
        this.price       = _price;

        this.propertyType = _propertyType;
        this.titleType    = _titleType;
        this.storeys      = _storeys;
        this.year         = _year;
        this.floorSpace   = _floorSpace;
        this.bedrooms     = _bedrooms;
        this.bathrooms    = _bathrooms;

        this.propertyTaxes = _propertyTaxes;
        this.strataFees    = _strataFees;
        this.landSize      = _landSize;
        this.basement      = _basement;

        this.interiorFeatures     = _interiorFeatures;
        this.buildingFeatures     = _buildingFeatures;
        this.propertyFeatures     = _propertyFeatures;
        this.neighborhoodFeatures = _neighborhoodFeatures;

        this.sellingPrice = _sellingPrice;
        this.offerHx      = _offerHx;
        this.notes        = _notes;
    }

    // gather page data -- return new Listing
    static new() {
        // TODO: input validation
        var _listingNum = document.getElementById("listingNum").value;
        var _agent      = document.getElementById("agent").value;
        var _client     = document.getElementById("clientName").value;
        var _address    = document.getElementById("address").value;
        var _phone      = document.getElementById("clientPhone").value;
        var _email      = document.getElementById("clientEmail").value;

        var _mlsNum      = document.getElementById("mlsNum").value;
        var _description = document.getElementById("propertyDescription").value;
        var _price       = document.getElementById("askingPrice").value;

        var _propertyType = document.getElementById("propertyType").value;
        var _titleType    = document.getElementById("titleType").value;
        var _storeys      = document.getElementById("storeys").value;
        var _year         = document.getElementById("year").value;
        var _floorSpace   = document.getElementById("floorSpace").value;
        var _bedrooms     = document.getElementById("bedroomNum").value;
        var _bathrooms    = document.getElementById("bathroomNum").value;

        var _propertyTaxes = document.getElementById("propertyTaxes").value;
        var _strataFees    = document.getElementById("strataFees").value;
        var _landSize      = document.getElementById("landSize").value;
        var _basement      = document.getElementById("basement").value;

        var _interiorFeatures     = document.getElementById("interiorFeatures").value;
        var _buildingFeatures     = document.getElementById("buildingFeatures").value;
        var _propertyFeatures     = document.getElementById("propertyFeatures").value;
        var _neighborhoodFeatures = document.getElementById("neighborhoodFeatures").value;

        var _sellingPrice = document.getElementById("sellingPrice").value;
        var _offerHx      = document.getElementById("offerHx").value;
        var _notes        = document.getElementById("listingNotes").value;
        
        return new Listing(
            _listingNum, _agent, _client, _address, _phone, _email,
            _mlsNum, _description, _price,
            _propertyType, _titleType, _storeys, _year,
            _floorSpace, _bedrooms, _bathrooms,
            _propertyTaxes, _strataFees, _landSize, _basement,
            _interiorFeatures, _buildingFeatures,
            _propertyFeatures, _neighborhoodFeatures,
            _sellingPrice, _offerHx, _notes
        );
    }

}
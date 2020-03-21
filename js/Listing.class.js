// example data model, should include pictures but it doesn't
class Listing {
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
        var _client     = document.getElementById("client").value;
        var _address    = document.getElementById("address").value;
        var _phone      = document.getElementById("phone").value;
        var _email      = document.getElementById("email").value;

        var _mlsNum      = document.getElementById("mlsNum").value;
        var _description = document.getElementById("description").value;
        var _price       = parseInt(document.getElementById("price").value);

        var _propertyType = document.getElementById("propertyType").value;
        var _titleType    = document.getElementById("titleType").value;
        var _storeys      = document.getElementById("storeys").value;
        var _year         = document.getElementById("year").value;
        var _floorSpace   = document.getElementById("floorSpace").value;
        var _bedrooms     = document.getElementById("bedrooms").value;
        var _bathrooms    = document.getElementById("bathrooms").value;

        var _propertyTaxes = document.getElementById("propertyTaxes").value;
        var _strataFees    = document.getElementById("strataFees").value;
        var _landSize      = document.getElementById("landSize").value;
        var _basement      = document.getElementById("basement").value;

        var _interiorFeatures     = document.getElementById("interiorFeatures").value;
        var _buildingFeatures     = document.getElementById("buildingFeatures").value;
        var _propertyFeatures     = document.getElementById("propertyFeatures").value;
        var _neighborhoodFeatures = document.getElementById("neighborhoodFeatures").value;

        var _sellingPrice = parseInt(document.getElementById("sellingPrice").value);
        var _offerHx      = document.getElementById("offerHx").value;
        var _notes        = document.getElementById("notes").value;
        
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
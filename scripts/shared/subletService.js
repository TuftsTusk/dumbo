angular.module('dumboApp')
.service('subletService', function(localStorageService) {
	var localStorageKey = 'SubletListing'
	var emptyData = {
		view: {
			general: {
				open: false
			},
			bedrooms: {
				open: false
			}
		},
		form: {
			type: 'SubletListing',
			apt_info: {
				op_details: {}
			},
			bedrooms: [],
			common_area_photos: {
				living_room: [],
				kitchen: [],
				bathroom: [],
				other: []
			}
		}
	};

	var validation = {
		apt_info: {
			op_details: {
				required: false,
				recommended: false
			},
			address: {
				required: true,
				recommended: true
			},
			num_occupants: {
				required: true,
				recommended: true
			}
		},
		room: {
			date_start: {
				required: true,
				recommended: true
			},
			date_end: {
				required: true,
				recommended: true
			},
			rent: {
				required: true,
				recommended: true
			},
			title: {
				required: true,
				recommended: true
			},
			photos: {
				required: false,
				recommended: true
			},
			op_details: {
				required: false,
				recommended: false
			},
			date_start_is_flexible: {
				required: false,
				recommended: false
			},
			date_end_is_flexible: {
				required: false,
				recommended: false
			}
		},
		common_area_photos: {
			kitchen: {
				required: false,
				recommended: true
			},
			living_room: {
				required: false,
				recommended: true
			},
			bathroom: {
				required: false,
				recommended: true
			},
			other: {
				required: false,
				recommended: false
			}
		}
	};

	var fieldMaps = {
		apt_op_details: [
			{ name: 'Furnished', 			variable: 'pre_furnished' },
			{ name: 'Pets allowed',			variable: 'pets_permitted'},
			{ name: 'Air conditioning',		variable: 'incl_air_conditioning'},
			{ name: 'Parking',				variable: 'on_premises_parking'},
			{ name: 'Washing machine', 		variable: 'incl_washing_machine'},
			{ name: 'Handicap accessible',	variable: 'handicap_accessible'},
			{ name: 'Dryer',				variable: 'incl_dryer'},
			{ name: 'Smoking permitted', 	variable: 'smoking_permitted'},
			{ name: 'Dishwasher',			variable: 'incl_dishwasher'}
		],
		room_op_details: [
			{ name: 'Furnished',			variable: 'pre_furnished'},
			{ name: 'Air conditioning', 	variable: 'incl_air_conditioning'}
		],
		common_area_photos: [
			{ name: 'Living Room',			variable: 'living_room'},
			{ name: 'Kitchen',				variable: 'kitchen'},
			{ name: 'Bathroom(s)',			variable: 'bathroom'},
			{ name: 'Other',				variable: 'other'}
		]
	}

	this.getEmptyData = function() {
		return emptyData;
	}

	this.loadLocalData = function() {
		var savedData = localStorageService.get(localStorageKey);
		if (savedData) {
			if (savedData.form) {
				processRooms(savedData.form.bedrooms);
			}
			return savedData;
		} else {
			return emptyData;
		}
	}

	this.removeLocalData = function() {
		localStorageService.remove(localStorageKey);
	}

	this.setLocalData = function(lsObject) {
		localStorageService.set(localStorageKey, lsObject);
	}

	this.prepareView = function(data) {
		var listing = data.listing;
		var owner = data.owner;
		var returnData = {
			listingData: {},
			owner: ''
		}
		if (listing && listing.type == 'SubletListing') {
			// check owner
			returnData.listingData = {};
			returnData.listingData.apt_info = listing.apt_info;
			returnData.listingData.bedrooms = listing.bedrooms;
			returnData.listingData.common_area_photos = listing.common_area_photos;
			returnData.listingData.id = listing._id;
			returnData.listingData.type = 'SubletListing';

			processRooms(returnData.listingData.bedrooms);

			returnData.owner = owner;

			return returnData;
		} else {
			// listing not found
		}
	}

	this.getValidationData = function() {
		return validation;
	}

	this.getFieldMap = function() {
		return fieldMaps;
	}

	function processRooms(bedrooms) {
		$.each(bedrooms, function(index, room) {
			$.each(room, function(key, value) {
				if (key == 'date_start' || key == 'date_end') {
					room[key] = new Date(value);
				}
			});
		});
	}


});

var ip = localStorage.getItem('user_ip');
var lat = parseFloat(localStorage.getItem('lat'));
var lng = parseFloat(localStorage.getItem('lng'));
var center = {
    lat: lat,
    lng: lng
};
// var map;
// var infowindow;
var places;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addEventListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addEventListener('places_changed', function() {
        places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: center,
//         zoom: 12,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });
//
//     // var marker = new google.maps.Marker({
//     //     position: {
//     //         lat: lat,
//     //         lng: lng
//     //     },
//     //     map: map
//     // });
//
//     // infowindow = new google.maps.InfoWindow();
//     //
//     // var request = {
//     //     query: 'library',
//     //     fields: ['name', 'geometry'],
//     //     type: 'libraries'
//     // };
//     //
//     // var service = new google.maps.places.PlacesService(map);
//     //
//     // service.findPlaceFromQuery(request, function(results, status) {
//     //     if (status === google.maps.places.PlacesServiceStatus.OK) {
//     //         for (var i = 0; i < results.length; i++) {
//     //             createMarker(results[i]);
//     //         }
//     //         map.setCenter(results[0].geometry.location);
//     //     }
//     // });
//     //
//     // function createMarker(place) {
//     //     var marker = new google.maps.Marker({
//     //         map: map,
//     //         position: place.geometry.location
//     //     });
//     //
//     //     google.maps.event.addEventListener(marker, 'click', function () {
//     //         infowindow.setContent(place.name);
//     //         infowindow.open(map, this);
//     //     });
//     // }
//
//     infowindow = new google.maps.InfoWindow();
//
//     var request = {
//         location: center,
//         radius: '500',
//         type: ['lodging'],
//         query: 'libraries'
//     };
//
//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }
//
// function callback(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             place = results[i];
//             createMarker(results[i]);
//         }
//     }
// }
//
// function createMarker(place) {
//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//     });
//
//     google.maps.event.addEventListener(marker, 'click', function () {
//         infowindow.setContent(place.name);
//         infowindow.open(map, this);
//     });
// }

var fn = {
	ready: function(){
		document.addEventListener("deviceready", fn.init, false);
	},
	init: function(){
		//fn.startMonitoringASingleiBeacon();
		fn.advertising();
	},
	startMonitoringASingleiBeacon: function(){
		var logToDom = function (message) {
			var e = document.createElement('label');
			e.innerText = message;

			var br = document.createElement('br');
			var br2 = document.createElement('br');
			document.body.appendChild(e);
			document.body.appendChild(br);
			document.body.appendChild(br2);

			window.scrollTo(0, window.document.height);
		};

		var delegate = new cordova.plugins.locationManager.Delegate();

		delegate.didDetermineStateForRegion = function (pluginResult) {

			logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

			cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
				+ JSON.stringify(pluginResult));
		};

		delegate.didStartMonitoringForRegion = function (pluginResult) {
			logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
		};

		delegate.didRangeBeaconsInRegion = function (pluginResult) {
			logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
		};

		var uuid = '23A01AF0-232A-4518-9C0E-323FB773F5EF';
		var identifier = 'prue';
		var minor = 1000;
		var major = 5;
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

		cordova.plugins.locationManager.setDelegate(delegate);

		// required in iOS 8+
		cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
		// or cordova.plugins.locationManager.requestAlwaysAuthorization()

		cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
			.fail(console.error)
			.done();
	},
	otro: function(){
		var logToDom = function (message) {
            var e = document.createElement('label');
            e.innerText = message;

            var br = document.createElement('br');
            var br2 = document.createElement('br');
            document.body.appendChild(e);
            document.body.appendChild(br);
            document.body.appendChild(br2);
        };

        var delegate = new cordova.plugins.locationManager.Delegate().implement({

            didDetermineStateForRegion: function (pluginResult) {

                logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

                cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                    + JSON.stringify(pluginResult));
            },

            didStartMonitoringForRegion: function (pluginResult) {
                console.log('didStartMonitoringForRegion:', pluginResult);

                logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
            },

            didRangeBeaconsInRegion: function (pluginResult) {
                logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
            }

        });

        var uuid = '23A01AF0-232A-4518-9C0E-323FB773F5EF';
        var identifier = 'beaconOnTheMacBooksShelf';
        var minor = 1000;
        var major = 5;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        cordova.plugins.locationManager.setDelegate(delegate);
        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
            .fail(console.error)
            .done();
	},
	advertising: function(){
		var uuid = '00000000-0000-0000-0000-000000000000';
		var identifier = 'advertisedBeacon';
		var minor = 2000;
		var major = 5;
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

		// The Delegate is optional
		var delegate = new cordova.plugins.locationManager.Delegate();

		// Event when advertising starts (there may be a short delay after the request)
		// The property 'region' provides details of the broadcasting Beacon
		delegate.peripheralManagerDidStartAdvertising = function(pluginResult) {
			console.log('peripheralManagerDidStartAdvertising: '+ JSON.stringify(pluginResult.region));
		};
		// Event when bluetooth transmission state changes 
		// If 'state' is not set to BluetoothManagerStatePoweredOn when advertising cannot start
		delegate.peripheralManagerDidUpdateState = function(pluginResult) {
			console.log('peripheralManagerDidUpdateState: '+ pluginResult.state);
		};

		cordova.plugins.locationManager.setDelegate(delegate);

		// Verify the platform supports transmitting as a beacon
		cordova.plugins.locationManager.isAdvertisingAvailable()
			.then(function(isSupported){

				if (isSupported) {
					cordova.plugins.locationManager.startAdvertising(beaconRegion)
						.fail(conole.error)
						.done();
				} else {
					console.log("Advertising not supported");
				}
			})
			.fail(function(e) { console.error(e); })
			.done();
	}
};
window.addEventListener("load",fn.ready,false);
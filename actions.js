var fn = {
	ready: function(){
		document.addEventListener("load",fn.init,false);
	},
	init: function(){
		var region = new ibeacon.Region({
		  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
		});

		ibeacon.startRangingBeaconsInRegion({
		  region: region,
		  didRangeBeacons: function(result) {
			alert('I see ' + result.beacons.length + ' beacons');
		  }
		});
	}
}
window.addEventListener("load",fn.ready,false);
<template>
	<div :id="id"></div>
</template>

<script>
import MapMixin from '../MapMixin.vue';

import AreaSelect from '../openlayers/areaselect';

export default {
	name: 'MapAreaSelect',
	mixins: [MapMixin],
	props: {
		// Either Object or Array.
		// Array is always in WGS84 with the following elements: 0 => west, 1 => south, 2 => east, 3 => north
		// Object is an bbox object as defined by the openEO API (with west, south, east, north properties).
		value: {
			type: [Object, Array],
			default: () => null
		}
	},
	data() {
		return {
			callback: null
		};
	},
	computed: {
		asArray() {
			return Array.isArray(this.value);
		}
	},
	beforeDestroy() {
		this.areaSelect.tearDown();
		this.map.un('change', this.callback);
		this.map.getView().un('change', this.callback);
		this.map.un('propertychange', this.callback);
	},
	methods: {
		renderMap() {
			this.createMap(true, 'EPSG:4326');

			this.areaSelect = new AreaSelect(this.map, this.editable);
			if (this.value !== null) {
				this.areaSelect.setBounds(this.value);
			}

			if (this.editable) {
				this.callback = () => this.$emit('input', this.areaSelect.getBounds(this.asArray));
				this.areaSelect.setInteractionListener(this.callback);
				this.map.on('change', this.callback);
				this.map.getView().on('change', this.callback);
				this.map.on('propertychange', this.callback);
			}
		}
	}

}
</script>

<style src="../MapMixin.css"></style>

<style>
/* Area selector */
.ol-areaselect {
	position: absolute;
    left: 0;
    top: 0;
}
.ol-areaselect-shade {
    position: absolute;
	background: rgba(0,0,0, 0.4);
	z-index: 0;
}
.ol-areaselect-handle {
    position: absolute;
    background: #fff;
    border: 1px solid #666;
    -moz-box-shadow: 1px 1px rgba(0,0,0, 0.2);
    -webkit-box-shadow: 1px 1px rgba(0,0,0, 0.2);
    box-shadow: 1px 1px rgba(0,0,0, 0.2);
    width: 14px;
    height: 14px;
	cursor: move;
	z-index: 1;
}
</style>
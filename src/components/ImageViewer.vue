<template>
	<div class="imageViewer" ref="imageViewer" :class="{'fullscreen': fullScreen}">
		<div class="toolbar">
			<span class="value" :title="valueTitle">{{ valueText }}</span>
			<FullscreenButton class="fullscreen-button" :element="() => $refs.imageViewer" @changed="fullscreenToggled" />
		</div>
		<div v-show="!loaded" class="noDataMessage"><i class="fas fa-spinner fa-spin"></i> Loading image...</div>
		<canvas ref="canvas" :class="{'fullsize': fullSize}" :title="title" @click="resize" @mousemove="getPixelValue" @mouseout="resetPixelValue" @load="imageLoaded" />
	</div>
</template>

<script>
import FullscreenButton from './FullscreenButton.vue';
import Utils from '../utils';

export default {
	name: 'ImageViewer',
	components: {
		FullscreenButton
	},
	props: {
		data: {
			required: true
		}
	},
	data() {
		return {
			fullScreen: false,
			fullSize: false,
			img: null,
			loaded: false,
			context: null,
			value: '-'
		};
	},
	mounted() {
		if (this.data.blob) {
			this.showImageBlob(this.data.blob);
		}
		else if (this.data.url) {
			this.showImage(this.data.url);
		}
	},
	computed: {
		title() {
			if (this.fullScreen) {
				return "";
			}
			return this.fullSize ? "Click to shrink (fit to screen)" : "Click to enlarge (full size)";
		},
		valueTitle() {
			return (this.fullScreen || this.fullSize) ? "" : "Show in full size to get precise values";
		},
		valueText() {
			if (this.fullScreen || this.fullSize) {
				return `Pixel Value: ${this.value}`;
			}
			else {
				return `Estimated Pixel Value: ${this.value}`;
			}
		}
	},
	methods: {
		showImage(src) {
			this.loaded = false;
			this.img = new Image();
			this.img.crossOrigin = "Anonymous";
			this.img.onload = this.imageLoaded.bind(this)
			this.img.src = src;
		},
		showImageBlob(data) {
			this.showImage(URL.createObjectURL(data));
		},
		imageLoaded() {
			this.loaded = true;
			
			this.$refs.canvas.width = this.img.naturalWidth;
			this.$refs.canvas.height = this.img.naturalHeight;
			this.context = this.$refs.canvas.getContext('2d');
			this.context.drawImage(this.img, 0, 0);
		},
		fullscreenToggled(open) {
			this.fullScreen = open;
		},
		resize() {
			if (!this.fullScreen) {
				this.fullSize = !this.fullSize;
			}
		},
		resetPixelValue() {
			this.value = '-';
		},
		getPixelValue(event) {
			try {
				let size = this.$refs.canvas.getBoundingClientRect();
				let xScale = this.img.naturalWidth / size.width;
				let yScale = this.img.naturalHeight / size.height;
				let x = event.offsetX * xScale;
				let y = event.offsetY * yScale;
				let [r,g,b,a] = this.context.getImageData(Math.ceil(x), Math.ceil(y), 1, 1).data;
				if (a === 0) {
					// Transparent (no-data?)
					this.value = 'no data';
				}
				else if (r == g && g === b) {
					if (a === 255) {
						// Grayscale
						this.value = r;
					}
					else {
						// Grayscale with Alpha
						this.value = `${r}, Alpha: ${a}`;
					}
				}
				else {
					this.value = `Red: ${r}, Green: ${g}, Blue: ${b}, Alpha: ${a}`;
				}
			} catch (error) {
				this.value = 'n/a';
				console.log(error);
			}
		}
	}
};
</script>

<style scoped>
.imageViewer {
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	background-color: #eee;
	overflow: auto;
}
.toolbar {
	z-index: 1;
    position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	padding: 1em;
	box-sizing: border-box;
	text-align: left;
}
.fullscreen-button {
	float: right;
}
.value {
	display: inline-block;
	background-color: rgba(255,255,255, 0.5);
	border-radius: 5px;
	padding: 5px;
	margin: -5px;
}
canvas {
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	cursor: zoom-in;
	object-fit: contain;
	box-sizing: border-box;
	background-color: white;
}
canvas.fullsize, .fullscreen canvas {
	max-width: none;
	max-height: none;
	object-fit: none;
	cursor: zoom-out;
}
.fullscreen canvas {
	cursor: auto;
}
</style>
<template>
	<div class="home">
		<div>{{ getCoord }}</div>
		<canvas 
			ref="canvasElem" 
			id="c1"
			@mousemove="draw" 
			@mousedown="beginDrawing" 
			@mouseup="stopDrawing" 
			width="500" 
			height="400" 
			class="canvas"
		></canvas>
		<button class="clear" @click="clearCanvas">Clear</button>
		<canvas 
			ref="canvasDobule" 
			class="canvas" 
			id="c2"
			width="500" 
			height="400"
		></canvas>
		<button @click="save(mainData, 'original')" class="save">Сохранить оригинал</button>
		<button @click="save(mainData, 'copy')" class="save">Сохранить копию</button>
		<button @click="check" class="save">Сверка</button>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'HomeView',
	components: {
		HelloWorld
	},
	data() {
		return {
			canvas: null,
			x: 0,
			y: 0,
			isDrawing: false,
			pointsArr: [],
			summ: 0,
			mainData: null
		}
	},
	mounted() {
		this.canvas = this.$refs.canvasElem.getContext('2d');
		this.canvasDouble = this.$refs.canvasDobule.getContext('2d');
	},
	methods: {
		drawLine(x1, y1, x2, y2) {
			let ctx = this.canvas;
			ctx.beginPath();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 1;
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.closePath();
		},
		draw(e) {
			if (this.isDrawing) {
				this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
				this.x = e.offsetX;
				this.y = e.offsetY;

				this.pointsArr.push({
					x: e.offsetX,
					y: e.offsetY
				})

				this.repeatCanvas();
			}
		},
		beginDrawing(e) {
			this.x = e.offsetX;
			this.y = e.offsetY;
			this.isDrawing = true;
		},
		stopDrawing(e) {
			if (this.isDrawing) {
				this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
				this.x = 0;
				this.y = 0;
				this.isDrawing = false;
			}
		},
		clearCanvas() {
			const Cwidth = this.$refs.canvasElem.width,
				CHeight = this.$refs.canvasElem.height;

			let ctx = this.canvas;
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, Cwidth, CHeight);
			ctx.restore();

			this.pointsArr = [];
		},
		repeatCanvas() {
			let ctx = this.canvasDouble;
			
			ctx.beginPath();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 1;

			let tempData = []

			for (let i = 0; i < this.pointsArr.length - 1; i++) {
				const coordsBefore = this.pointsArr[i],
					coordsAfter = this.pointsArr[i + 1];

				ctx.moveTo(coordsBefore.x, coordsBefore.y);
				ctx.lineTo(coordsAfter.x, coordsAfter.y);

				// Евклидово расстояние между 2-мя точками на плоскости
				const evklid = Math.sqrt(Math.pow((coordsBefore.x-coordsAfter.x), 2) + Math.pow((coordsBefore.y-coordsAfter.y), 2));
				tempData.push({
					xB: coordsBefore.x,
					yB: coordsBefore.y,
					xA: coordsAfter.x,
					yA: coordsAfter.y,
					evklid: evklid
				})
				// this.summ = this.summ + evklid;
				// console.log(coordsBefore, coordsAfter, evklid);
			}

			this.mainData = [...tempData];

			ctx.stroke();
			ctx.closePath();
		},
		save(data, nameLocal) {
			localStorage.setItem(nameLocal, JSON.stringify(data));
		},
		check() {
			const orig = JSON.parse(localStorage.getItem('original')),
				copy = JSON.parse(localStorage.getItem('copy'));

			let checkData = {
				summ: 0,
				length: 0
			}

			for(let i = 0; i < orig.length; i++) {
				const origItem = orig[i];
				const copyItem = copy[i];
				if (!origItem || !copyItem) break;

				const diffEvklid = Math.sqrt(Math.pow((origItem.xB-copyItem.xA), 2) + Math.pow((origItem.yB-copyItem.yA), 2)); 

				checkData.summ += diffEvklid;
				checkData.length++;

				// console.log(diffEvklid);
			}

			console.log(`Размерность: ${orig.length}, ${copy.length}`);
			const deffLength = Math.abs(orig.length - copy.length);
			console.log('Разница размеростей: ', deffLength);
			
			console.log('CheckData = ', checkData);

			const avrDest = checkData.summ / checkData.length
			console.log('Среднее расстояние = ', avrDest);

			if (avrDest <= 50 && deffLength <= 50)
				console.log('Доступ разрешён..');
			else
				console.log('Доступ запрещён!');
		}
	},
	computed: {
		getCoord() {
			return [this.x, this.y];
		}
	}
}
</script>

<style lang="sass" scoped>
.canvas
	background: rgba(grey, .2)

.clear, .save
	display: block
	margin: 0 auto
</style>
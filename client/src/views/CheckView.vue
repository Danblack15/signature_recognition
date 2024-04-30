<template>
    <div class="check page">
        <h1>Введите свою фигуру/подпись</h1>
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
        <button @click="clearCanvas" class="clear" v-if="pointsArr.length">Очистить</button>
        <button @click="check" v-if="pointsArr.length">Отправить</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            canvas: null,
            x: 0,
			y: 0,
            isDrawing: false,
            pointsArr: [],
            mainData: null
        }
    },
    mounted() {
        this.canvas = this.$refs.canvasElem.getContext('2d');
    },
    methods: {
        drawLine(x1, y1, x2, y2) {
			let ctx = this.canvas;
			ctx.beginPath();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 5;
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

				this.calculateParams();
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
        calculateParams() {
            let tempData = []

			for (let i = 0; i < this.pointsArr.length - 1; i++) {
				const coordsBefore = this.pointsArr[i],
					coordsAfter = this.pointsArr[i + 1];

				// Евклидово расстояние между 2-мя точками на плоскости
				const evklid = Math.sqrt(Math.pow((coordsBefore.x-coordsAfter.x), 2) + Math.pow((coordsBefore.y-coordsAfter.y), 2));
				tempData.push({
					xB: coordsBefore.x,
					yB: coordsBefore.y,
					xA: coordsAfter.x,
					yA: coordsAfter.y,
					evklid: evklid
				})
			}

            this.mainData = [...tempData];
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
		check() {
			this.checkSignature(this.mainData);
			this.clearCanvas();
		},
        ...mapActions({
            checkSignature: 'signatures/checkSignature'
        })
    }
}
</script>

<style lang="sass" scoped>
h1
	margin-bottom: 20px

.clear
	margin-bottom: 15px

.canvas
	background: rgba(grey, .2)
	margin-bottom: 20px
	border-radius: 8px
	&--disabled
		display: none
</style>
class LineChart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

        var aXdata = [];
        this.myDataBinding.data.forEach(row => {
            aXdata.push(row.measures_0.raw)
        })
        var aYdata = [];
        this.myDataBinding.data.forEach(row => {
            aYdata.push(row.dimension_0.id)
        })

        const xData = JSON.parse(this.getAttribute('x-data'));
        const yData = JSON.parse(this.getAttribute('y-data'));

        const canvas = document.createElement('canvas');
        this.shadowRoot.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;

        this.drawAxes(ctx, canvas.width, canvas.height);
        this.drawLineChart(ctx, aXdata, aYdata, canvas.width, canvas.height);
    }

    drawAxes(ctx, width, height) {
        ctx.beginPath();
        ctx.moveTo(30, height - 30);
        ctx.lineTo(width - 30, height - 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(30, height - 30);
        ctx.stroke();
    }

    drawLineChart(ctx, xData, yData, width, height) {
        const dataPoints = xData.length;
        const xSpacing = (width - 60) / (dataPoints - 1);
        const yScale = (height - 60) / Math.max(...yData);

        ctx.beginPath();
        ctx.moveTo(30, height - 30 - yData[0] * yScale);

        for (let i = 1; i < dataPoints; i++) {
            ctx.lineTo(30 + i * xSpacing, height - 30 - yData[i] * yScale);
        }

        ctx.strokeStyle = '#007BFF';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

customElements.define('line-chart', LineChart);
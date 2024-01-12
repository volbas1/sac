// Define the LineChart component
class LineChart extends HTMLElement {
    constructor() {
        super();
        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

        console.log("customWidget connectedCallback")
        // Retrieve data attribute and parse it as an array
        const data = JSON.parse(this.getAttribute('data'));

        // Create a canvas element
        const canvas = document.createElement('canvas');
        this.shadowRoot.appendChild(canvas);

        // Get the canvas 2d context
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 400;
        canvas.height = 300;

        // Draw axes
        this.drawAxes(ctx, canvas.width, canvas.height);
        // Draw the line chart
        var aData = [];
        this.myDataBinding.data.forEach(row => {
            aData.push(row.measures_0.raw)
        })

        this.drawLineChart(ctx, aData, canvas.width, canvas.height);

    }

    drawAxes(ctx, width, height) {
        // X-axis
        ctx.beginPath();
        ctx.moveTo(30, height - 30);
        ctx.lineTo(width - 30, height - 30);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(30, height - 30);
        ctx.stroke();
    }

    drawLineChart(ctx, data, width, height) {
        const dataPoints = data.length;

        const xSpacing = (width - 60) / (dataPoints - 1);
        const yScale = (height - 60) / Math.max(...data);

        // Draw the line
        ctx.beginPath();
        ctx.moveTo(30, height - 30 - data[0] * yScale);

        for (let i = 1; i < dataPoints; i++) {
            ctx.lineTo(30 + i * xSpacing, height - 30 - data[i] * yScale);
        }

        ctx.strokeStyle = '#007BFF'; // Line color
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Define the custom element
customElements.define('line-chart', LineChart);
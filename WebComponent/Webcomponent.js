// Define the LineChart component
class LineChart extends HTMLElement {
    constructor() {
        super();
        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Retrieve data and x-axis labels attributes
        const data = [] //JSON.parse(this.getAttribute('data'));
        this.myDataBinding.data.forEach(row => {
            data.push(row.measures_0.raw)
        })

        const xLabels = []//JSON.parse(this.getAttribute('x-labels'));
        this.myDataBinding.data.forEach(row => {
            xLabels.push(row.dimensions_0.id)
        })
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

        // Draw the line chart with x-axis labels
        this.drawLineChart(ctx, data, xLabels, canvas.width, canvas.height);

        // Apply background image
        const backgroundImage = "https://upload.wikimedia.org/wikipedia/commons/d/d9/Kodaki_fuji_frm_shojinko.jpg";
        if (backgroundImage) {
            this.style.backgroundImage = `url('${backgroundImage}')`;
        }
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

    drawLineChart(ctx, data, xLabels, width, height) {
        const dataPoints = data.length;
        const xSpacing = (width - 60) / (dataPoints - 1);
        const yScale = (height - 60) / Math.max(...data);

        // Draw the line
        ctx.beginPath();
        ctx.moveTo(30, height - 30 - data[0] * yScale);

        for (let i = 0; i < dataPoints; i++) {
            ctx.lineTo(30 + i * xSpacing, height - 30 - data[i] * yScale);
            // Display x-axis labels
            ctx.fillStyle = '#000';
            ctx.fillText(xLabels[i], i * xSpacing, height - 15);
        }

        ctx.strokeStyle = '#007BFF'; // Line color
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Define the custom element
customElements.define('line-chart', LineChart);
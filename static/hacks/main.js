var app;
App = function(){
    this.init = function(){
        this.mask = document.querySelector('.mask');
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.layers = 175;
        this.squares = [];
        this.alternateColors = false;
        this.DEFAULT_RATE = 0.05;
        this.MAX_RATE = this.DEFAULT_RATE * 2.5;
        this.MIN_RATE = this.DEFAULT_RATE / 1.5;
        this.MUTATION_FACTOR = 0.005;
        this.ANGLE_MUTATION_FACTOR = 0.03;
        this.COLOR_MUTATION_FACTOR = 40;
        this.angle = 0;
        this.angle_delta = -Math.PI / 128;
        this.min_delta = -Math.PI / 8;
        this.max_delta = -Math.PI / 128;
        this.gradientColor = 'black';

        this.FRAME_RATE = 20;

        this.context.strokeStyle = '#000';
        this.context.lineWidth = 40;

        window.addEventListener('keydown', function(evt){
            if (evt.keyCode === 32){
                this.animating ? this.stopAnimation() : this.startAnimation();
            }
        }.bind(this));

        var previousRate = this.DEFAULT_RATE;
        var prevPrimeColor = getRandomColor();
        var prevAltColor = getRandomColor();

        for (i = 0; i < this.layers; i++){
            var primary = i % 2 === 0;
            var rate = this.mutateRate(previousRate, this.MUTATION_FACTOR);
            previousRate = rate;
            if (primary){
                var color = this.mutateColor(prevPrimeColor);
                prevPrimeColor = color;
            } else {
                var color = this.mutateColor(prevAltColor);
                prevAltColor = color;
            }
            var square = {
                rate: rate,
                primeColor: prevPrimeColor,
                altColor: prevAltColor,
                isPrimary: primary
            };
            this.squares.push(square);
        }

        this.resize();
        this.startAnimation();
    },

    this.startAnimation = function(){
        this.animation = setInterval(this.draw, this.FRAME_RATE);
        this.animating = true;
    },

    this.stopAnimation = function(){
        clearInterval(this.animation);
        this.animating = false;
    },

    this.resize = function(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.size = Math.max(this.width, this.height);

        this.expandBy = (Math.sqrt(2*this.size*this.size) - this.size) / 2;

        this.xOffset = (this.size - this.width) / 2;
        this.yOffset = (this.size - this.height) / 2;

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        this.draw();
    },

    this.clear = function(){
        this.context.clearRect(0, 0, this.size, this.size);
    },

    this.draw = function(){
        this.angle_delta = this.angle_delta + (Math.random() - 0.5) * this.ANGLE_MUTATION_FACTOR;
        this.angle_delta = Math.max(this.min_delta, Math.min(this.angle_delta, this.max_delta));
        this.angle = this.angle + this.angle_delta;
        if (this.angle > Math.PI){
            this.angle = this.angle - Math.PI;
        } else if (this.angle < -Math.PI){
            this.angle = this.angle + Math.PI;
        }
        this.clear();

        var square = this.squares[this.layers - 1];
        var isPrimary = square.isPrimary;
        var prevRate = square.rate;
        var prevPrimeColor = square.primeColor;
        var prevAltColor = square.altColor;
        if (isPrimary){
            prevPrimeColor = this.mutateColor(prevPrimeColor);
        } else {
            prevAltColor = this.mutateColor(prevAltColor);
        }
        var newSquare = {
            rate: this.mutateRate(prevRate, this.MUTATION_FACTOR),
            primeColor: prevPrimeColor,
            altColor: prevAltColor,
            isPrimary: !isPrimary
        };
        this.squares.shift();
        this.squares.push(newSquare);

        var rect = this.getInitialRectangle();
        rect = this.rotateRectangle(rect, this.angle);
        this.drawRectangle(rect, prevAltColor);

        for(i = 0; i < this.layers; i++){
            var square = this.squares[i];
            rect = this.getChildRectangle(rect, square.rate);
            var color = square.isPrimary ? square.primeColor : square.altColor;
            this.drawRectangle(rect, color);
        }
        this.drawCoveringCircle(rect, this.gradientColor);
    }.bind(this),

    this.getInitialRectangle = function(){
        var pt1 = new Point(-this.xOffset - this.expandBy, -this.yOffset - this.expandBy);
        var pt2 = new Point(this.size - this.xOffset + this.expandBy, -this.yOffset - this.expandBy);
        var pt3 = new Point(this.size - this.xOffset + this.expandBy, this.size - this.yOffset + this.expandBy);
        var pt4 = new Point(-this.xOffset - this.expandBy, this.size - this.yOffset + this.expandBy);
        return new Rectangle(pt1, pt2, pt3, pt4);
    },

    this.rotateRectangle = function(rect, angle){
        var center = new Point((rect.pt1.x + rect.pt2.x + rect.pt3.x + rect.pt4.x) / 4, (rect.pt1.y + rect.pt2.y + rect.pt3.y + rect.pt4.y) / 4);
        var pt1 = this.getRotatedPoint(rect.pt1, center, angle);
        var pt2 = this.getRotatedPoint(rect.pt2, center, angle);
        var pt3 = this.getRotatedPoint(rect.pt3, center, angle);
        var pt4 = this.getRotatedPoint(rect.pt4, center, angle);
        return new Rectangle(pt1, pt2, pt3, pt4);
    },

    this.getRotatedPoint = function(pt, ctr, angle){
        var x = Math.cos(angle) * (pt.x - ctr.x) - Math.sin(angle) * (pt.y - ctr.y) + ctr.x;
        var y = Math.sin(angle) * (pt.x - ctr.x) + Math.cos(angle) * (pt.y - ctr.y) + ctr.y;
        return new Point(x,y);
    },

    this.getChildRectangle = function(rect, proportion){
        var pt1 = this.getMidwayPoint(rect.pt1, rect.pt2, proportion);
        var pt2 = this.getMidwayPoint(rect.pt2, rect.pt3, proportion);
        var pt3 = this.getMidwayPoint(rect.pt3, rect.pt4, proportion);
        var pt4 = this.getMidwayPoint(rect.pt4, rect.pt1, proportion);
        return new Rectangle(pt1, pt2, pt3, pt4);
    },

    this.getMidwayPoint = function(from, to, proportion){
        var x = from.x + (to.x - from.x) * proportion;
        var y = from.y + (to.y - from.y) * proportion;
        return new Point(x, y);
    },

    this.getDistance = function(from, to){
        var x = to.x - from.x;
        var y = to.y - from.y;
        return Math.sqrt(x*x + y*y);
    },

    this.drawRectangle = function(rect, color){
        this.context.fillStyle = color;
        this.context.beginPath();
        this.moveTo(rect.pt1);
        this.lineTo(rect.pt2);
        this.lineTo(rect.pt3);
        this.lineTo(rect.pt4);
        this.lineTo(rect.pt1);
        this.context.fill();
    },

    this.drawCoveringCircle = function(rect, color){
        this.context.beginPath();
        var center = this.getMidwayPoint(rect.pt1, rect.pt3, 0.5);
        var radius = this.getDistance(rect.pt1, rect.pt3) / 2;
        this.context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    },

    this.moveTo = function(point){
        this.context.moveTo(point.x, point.y);
    },

    this.lineTo = function(point){
        this.context.lineTo(point.x, point.y);
    },

    this.mutateRate = function(rate, mutationFactor){
        var mutation = (Math.random() - 0.5) * mutationFactor;
        return Math.max(Math.min(rate + mutation, this.MAX_RATE), this.MIN_RATE);
    },

    this.mutateColor = function(color){
        var r = this.mutateHex(color.substr(1, 2));
        var g = this.mutateHex(color.substr(3, 2));
        var b = this.mutateHex(color.substr(5, 2));
        var newColor = '#' + r + g + b;
        return newColor;
    },

    this.mutateHex = function(hex){
        var mutatedHex = parseInt(hex, 16) + Math.round((Math.random() - 0.5) * this.COLOR_MUTATION_FACTOR);
        mutatedHex = Math.max(0, Math.min(255, mutatedHex));
        mutatedHex = mutatedHex.toString(16);
        return mutatedHex.length === 1 ? '0' + mutatedHex : mutatedHex;
    }
};

getRandomColor = function(){
    var color = '#';
    for (var i = 0; i < 3; i++){
        color += getRandomHex();
    }
    return color;
};

getRandomHex = function(){
    var hex = Math.floor(Math.random() * 256).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};

Rectangle = function(pt1, pt2, pt3, pt4){
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.pt3 = pt3;
    this.pt4 = pt4;
};

Point = function(x, y){
    this.x = x;
    this.y = y;
};

window.onload = function(){
    app = new App();
    app.init();
    app.resize();

    window.onresize = function(){
        app.resize();
    };
};
var CELL_SIZE = 32;
var MENU_HEIGHT = 50;
var COLOR_MAP = {
    1: '#1e90ff',
    2: '#228b22',
    3: '#b22222',
    4: '#0000cd',
    5: '#8b4513',
    6: '#00ced1',
    7: '#000000',
    8: '#777777'
};

var CellView = Backbone.View.extend({
    className: 'cell',
    model: null,

    events: {
        'click': 'clickEvt_',
        'contextmenu': 'flagEvt_'
    },

    initialize: function(){
        this.listenTo(this.model, 'change:revealed', this.reveal.bind(this));
        this.listenTo(this.model, 'change:flagged', this.changeFlag_.bind(this));
    },

    render: function(){
        var x = this.model.get('x');
        var y = this.model.get('y');

        this.el.style.left = (CELL_SIZE * x) + 'px';
        this.el.style.top = (CELL_SIZE * y) + 'px';
        this.el.style.width = CELL_SIZE + 'px';
        this.el.style.height = CELL_SIZE + 'px';
        this.el.style.lineHeight = CELL_SIZE + 'px';
    },

    reveal: function(){
        if (this.model.get('isMine')){
            this.$el.addClass('mine');
        } else {
            var number = this.model.get('adjacentMines');
            if (number > 0) this.el.innerHTML = number;
            this.el.style.color = COLOR_MAP[number];
        }
        this.$el.removeClass('flagged');
        this.$el.addClass('revealed');
    },

    clickEvt_: function(){
        if (!Minesweeper.model.get('playing')) return;
        if (this.model.get('flagged')) return;

        if (this.model.get('isMine')){
            Minesweeper.explode();
        } else {
            Minesweeper.revealCell(this.model);
        }
    },

    flagEvt_: function(evt){
        evt.preventDefault();
        if (this.model.get('flagged')){
            this.model.unflag();
        } else {
            this.model.flag();
        }
    },

    changeFlag_: function(){
        if (this.model.get('flagged')){
            this.$el.addClass('flagged');
        } else {
            this.$el.removeClass('flagged');
        }
    }
});

var CellModel = Backbone.Model.extend({
    defaults: {
        x: null,
        y: null,
        isMine: null,
        adjacentMines: null,
        revealed: false,
        flagged: false
    },

    initialize: function(){
        this.set('isMine', Math.random() < Minesweeper.model.get('mineFrequency'));
    },

    reveal: function(){
        this.unflag();
        this.set('revealed', true);
    },

    flag: function(){
        if (!this.get('revealed')) this.set('flagged', true);
    },

    unflag: function(){
        this.set('flagged', false);
    }
});

var BoardView = Backbone.View.extend({
    cellViews_: null,

    initialize: function(){

    },

    render: function(){
        this.populateCells_();
        this.renderCells_();
    },

    populateCells_: function(){
        this.cellViews_ = [];
        var size = Minesweeper.model.get('size');
        for (var i = 0; i < size; i++){
            for (var j = 0; j < size; j++){
                var cellModel = Minesweeper.model.get('cells')[i][j];
                var cellView = new CellView({
                    model: cellModel
                });
                this.cellViews_.push(cellView);
            }
        }
    },

    renderCells_: function(){
        this.el.style.display = 'none';
        this.el.innerHTML = '';
        this.cellViews_.forEach(function(cellView){
            cellView.render();
            this.el.appendChild(cellView.el);
        }.bind(this));
        this.el.style.display = '';
    }
});

var MenuView = Backbone.View.extend({
    events: {
        'click .new-game': 'newGameEvt_'
    },

    render: function(){
        this.el.style.height = MENU_HEIGHT + 'px';
        $(this.el.querySelector('.new-game')).removeClass('lost');

    },

    showLostButton: function(){
        $(this.el.querySelector('.new-game')).addClass('lost');
    },

    newGameEvt_: function(){
        Minesweeper.render();
    }
});

var GameView = Backbone.View.extend({
    menuView_: null,
    boardView_: null,

    initialize: function(){
        this.menuView_ = new MenuView({
            el: this.el.querySelector('.menu')
        });
        this.boardView_ = new BoardView({
            el: this.el.querySelector('.board')
        });
    },

    render: function(){
        this.model.createCells();
        this.$el.removeClass('lost');
        this.$el.removeClass('won');

        this.el.style.width = (this.model.get('size') * CELL_SIZE) + 'px';
        this.el.style.height = (this.model.get('size') * CELL_SIZE + MENU_HEIGHT) + 'px';

        this.menuView_.render();
        this.boardView_.render();
        this.model.set('playing', true);
    },

    explode: function(){
        this.$el.addClass('lost');
        this.menuView_.showLostButton();
        this.model.endGame();
    },

    revealCell: function(cellModel){
        cellModel.reveal();
        if (cellModel.get('adjacentMines') === 0){
            this.model.revealAdjacentCells(cellModel);
        }

        if (this.model.checkWin()){
            this.model.flagAllMines();
            this.$el.addClass('won');
        }
    }
});

var GameModel = Backbone.Model.extend({
    defaults: {
        size: 8,
        // Default frequency is ~10 mines for an 8x8 board.
        mineFrequency: 0.15625,
        cells: [],
        playing: false
    },

    initialize: function(options){
        this.set('size', options.size);
    },

    endGame: function(){
        this.revealAll();
        this.set('playing', false);
    },

    revealAll: function(){
        var size = this.get('size');
        for (var i = 0; i < size; i++){
            for (var j = 0; j < size; j++){
                this.get('cells')[i][j].reveal();
            }
        }
    },

    checkWin: function(){
        var size = this.get('size');
        for (var i = 0; i < size; i++){
            for (var j = 0; j < size; j++){
                var cell = this.get('cells')[i][j]
                if (!cell.get('isMine') && !cell.get('revealed')) return false;
            }
        }
        return true;
    },

    createCells: function(){
        var size = this.get('size');
        for (var i = 0; i < size; i++){
            this.get('cells')[i] = [];
            for (var j = 0; j < size; j++){
                this.get('cells')[i][j] = new CellModel({
                    x: i,
                    y: j
                });
            }
        }

        for (var i = 0; i < size; i++){
            for (var j = 0; j < size; j++){
                var cell = this.get('cells')[i][j];
                var adjacentMines = this.getNumMinesAdjacent(cell)
                cell.set('adjacentMines', adjacentMines);
            }
        }
    },

    getNumMinesAdjacent: function(cellModel){
        var numAdjacent = 0;
        this.getAdjacentCells(cellModel).forEach(function(cell){
            if (cell.get('isMine')) numAdjacent++;
        })
        return numAdjacent;
    },

    getAdjacentCells: function(cellModel){
        var adjacentCells = [];
        var xMin = Math.max(cellModel.get('x') - 1, 0);
        var yMin = Math.max(cellModel.get('y') - 1, 0);
        var xMax = Math.min(cellModel.get('x') + 1, this.get('size') - 1);
        var yMax = Math.min(cellModel.get('y') + 1, this.get('size') - 1);

        for (var i = xMin; i <= xMax; i++){
            for (var j = yMin; j <= yMax; j++){
                if (i === cellModel.get('x') && j === cellModel.get('y')) continue
                adjacentCells.push(this.get('cells')[i][j]);
            }
        }
        return adjacentCells;
    },

    revealAdjacentCells: function(cellModel){
        var cellsToReveal = this.getAdjacentCells(cellModel);

        while (_.find(cellsToReveal, function(cell){ return cell.get('adjacentMines') === 0})){

            var zeroCells = _.filter(cellsToReveal, function(cell){
                return cell.get('adjacentMines') === 0 && !cell.get('revealed');
            });
            var newCellsToCheck = [];
            zeroCells.forEach(function(cell){
                newCellsToCheck = _.union(newCellsToCheck, this.getAdjacentCells(cell));
            }, this);

            cellsToReveal.forEach(function(cell){
                cell.reveal();
            });
            cellsToReveal = newCellsToCheck;
        }
        cellsToReveal.forEach(function(cell){
            cell.reveal();
        });
    },

    flagAllMines: function(){
        var size = this.get('size');
        for (var i = 0; i < size; i++){
            for (var j = 0; j < size; j++){
                var cell = this.get('cells')[i][j]
                if (cell.get('isMine') && !cell.get('flagged')) cell.flag();
            }
        }
    }
});

var Minesweeper;
$(function(){
    Minesweeper = new GameView({
        el: document.querySelector('.minesweeper'),
        model: new GameModel({
            size: 8
        })
    });

    Minesweeper.render();
});
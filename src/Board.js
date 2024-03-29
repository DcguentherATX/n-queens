// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var pieceCount = 0;
      var row = this.attributes[rowIndex];
      for (var i = 0; i < row.length; i++) {
        pieceCount += row[i];
        if (pieceCount > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var key in this.attributes) {
        if (this.hasRowConflictAt(key) === true) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var pieceCount = 0;
      for (var keys in this.attributes) {
        if (keys !== 'n') {
          var row = this.attributes[keys];
          pieceCount += row[colIndex];
          if (pieceCount > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var key in this.attributes) {
        if (this.hasColConflictAt(key) === true) {
          return true;
        }
      }
      return false;
    },

    // Major Diagonals - go from bottom-left to top-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      console.log(majorDiagonalColumnIndexAtFirstRow);
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var storeArray = [];
      var rowStore = [];//becomes an array of arrays
      pieceCount = 0;
      
      for (var keys in this.attributes) {
        if (keys !== 'n') {
          rowStore.push(this.attributes[keys]);
        }
      }

      for(var i = 0; i < rowStore.length - 1; i ++){//loops through rows
        for(var j = 0; j < rowStore[i].length - 1; j ++){
          if (rowStore[i][j] === 1) {
            var tuple = [i, j];
            // console.log(rowStore[i][j], i, j);
            storeArray.push([i, j]);
            // console.log(tuple, storeArray, rowStore.length);
          }
        }
      }

      var storageArray = [];
      for(var t = 0; t < storeArray.length-1; t ++){
        storageArray.push(storeArray[t])
      }
      console.log('copy', storageArray, 'original', storeArray)
      // console.log('storeArray', storeArray);
      for(var k = 0; k < storeArray.length - 1; k ++){
        var tupleToCheck = storageArray[k];
        // console.log(tupleToCheck);
        for(var j = 0; j < rowStore.length - 1; j ++){
          var row = tupleToCheck[0]++;
          var col = tupleToCheck[1]++;
          // console.log('current', tupleToCheck, row, col);
          for (var m = 0; m < storeArray.length - 1; m ++){
            // console.log(storeArray[m], tupleToCheck)
            if (storageArray[m] === tupleToCheck) {
              pieceCount++;
              // console.log(pieceCount);
            }
          }
        }
        tupleToCheck = [];
      }

      if(pieceCount > 0){
        return true;
      }
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // var storeArray = [];
      // var rowStore = [];
      // pieceCount = 0;
      // for (var keys in this.attributes) {
      //   if (keys !== 'n') {
      //     rowStore.push(this.attributes[keys]);
      //   }
      // }
      
      // for(var i = 0; i < rowStore.length; i++){//loops through rows
      //   for(var j = 0; j < rowStore[i].length; j++){
      //     if (rowStore[i][j] === 1) {
      //       storeArray.push([i, j]);
      //     }
      //   }
      // }
      
      // for(var k = 0; k < storeArray.length; k ++){
      //   var tupleToCheck = storeArray[k];
      //   for(var j = 0; j < rowStore.length - 1; j++){
      //     tupleToCheck[0]++;
      //     tupleToCheck[1]++;
      //     console.log(tupleToCheck);
      //     for (var it of storeArray){
      //       console.log('hi');
      //       if (tupleToCheck == storeArray[it]) {
      //         console.log('hi')
      //         pieceCount ++;
      //       }
      //     }
      //   }
      //   tupleToCheck = [];
      // }

      // if(pieceCount > 0){
      //   return true;
      // }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

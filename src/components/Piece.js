const r = {a:0, b:1, c:2, d:3, e:4, f:5, g:6, h:7};
const c = {1:7, 2:6, 3:5, 4:4, 5:3, 6:2, 7:1, 8:0}
const p = {pawn:0, knight:1, bishop:2, rook:3, queen:4, king:5};

class Piece {
    constructor(piece, color){
        this.piece = piece;
        this.color = color;
    }
}

export {Piece, p, r, c}
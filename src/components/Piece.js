const r = {a:0, b:1, c:2, d:3, e:4, f:5, g:6, h:7};
const c = {1:7, 2:6, 3:5, 4:4, 5:3, 6:2, 7:1, 8:0}
const p = {pawn:0, knight:1, bishop:2, rook:3, queen:4, king:5};

class Piece {
    constructor(piece, color){
        this.piece = piece;
        this.color = color;
    }

    validateMove(prevI, prevJ, currI, currJ, target){
        switch(this.piece){
            case p.pawn:
                //Functionality after the OR is saying that if a pawn is in its home row of 6, then it can move two places forward
                return ((target === null) && (currJ === prevJ) && ((currI - prevI) === 1 || (target === null && currI === 6 && currI - prevI === 2))) || (target != null && (currI - prevI === 1) && Math.abs(currJ - prevJ) === 1);
            case p.knight:
                return (Math.abs(prevI - currI) === 1 && Math.abs(prevJ - currJ) === 2) || (Math.abs(prevJ - currJ) === 1 && Math.abs(prevI - currI) === 2);
            case p.bishop:
                return (Math.abs(prevI - currI) === Math.abs(prevJ - currJ));
            case p.rook:
                //Rook has been moved to either a place on the same row, or the same column
                return (prevI === currI || prevJ === currJ);
            case p.queen:
                return (prevI === currI || prevJ === currJ) || (Math.abs(prevI - currI) === Math.abs(prevJ - currJ));
            case p.king:
                return (Math.abs(prevI - currI) === 1 || Math.abs(prevI - currI) === 0) && (Math.abs(prevJ - currJ) === 1 || Math.abs(prevJ - currJ) === 0);
            default:
                console.log("Invalid piece");
        }
    }
}

export {Piece, p, r, c}
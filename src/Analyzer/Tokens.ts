enum Type {
    UNKNOW,
    PAR_OPEN, // (
    PAR_CLOSE, // )
    SEMICOLON, // ;
    COLON, // :
    RESERVERD_WORD,
    NUMBER, // number
    STRING, // string
    BRACK_OPEN, // [
    BRACK_CLOSE, // ]
    BRACE_OPEN, // {
    BRACE_CLOSE, // }
    COMMA, // ,
}

class Token {
    private row: number;
    private column: number;
    private lexeme: string;
    private typeToken: Type;
    private typeTokenString: string;

    constructor(typeToken: Type, lexeme: string, row: number, column: number) {
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken];
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }
    getLexeme(): string {
        return this.lexeme;
    }
    
    getType(): Type {
        return this.typeToken;
    }

    
}



export { Type, Token };
import { Token, Type } from "./Tokens";

interface Carrera {
    nombre: string;
    semestres: Semestre[];
}

interface Semestre {
    numero: number;
    cursos: Curso[];
}

interface Curso {
    codigo: number;
    nombre: string;
    area: number;
    prerrequisitos: number[];
}

export function parsePensum(tokens: Token[]): Carrera[] {
    let index = 0;
    const carreras: Carrera[] = [];

    while (index < tokens.length) {
        const token = tokens[index];

        if (token.getLexeme() === "Carrera") {
            index += 2;
            const nombreCarrera = tokens[index++].getLexeme().replace(/"/g, "");
            const carrera: Carrera = { nombre: nombreCarrera, semestres: [] };

            if (tokens[index].getType() === Type.BRACK_OPEN) index++;

            while (tokens[index] && tokens[index].getLexeme() === "Semestre") {
                index += 2; // Semestre + ':'
                const numeroSemestre = parseInt(tokens[index++].getLexeme());

                if (tokens[index].getType() === Type.BRACE_OPEN) index++; // '{'

                const semestre: Semestre = { numero: numeroSemestre, cursos: [] };

                while (tokens[index] && tokens[index].getLexeme() === "Curso") {
                    index += 2; // Curso + ':'
                    const codigoCurso = parseInt(tokens[index++].getLexeme());
                    if (tokens[index].getType() === Type.BRACE_OPEN) index++; // '{'

                    index += 2; // Nombre + ':'
                    const nombreCurso = tokens[index++].getLexeme().replace(/"/g, "");
                    if (tokens[index].getType() === Type.SEMICOLON) index++; // ';'

                    index += 2; // Area + ':'
                    const areaCurso = parseInt(tokens[index++].getLexeme());
                    if (tokens[index].getType() === Type.SEMICOLON) index++; // ';'

                    index += 2; // Prerrequisitos + ':'
                    if (tokens[index].getType() === Type.PAR_OPEN) index++; // '('

                    const prerrequisitos: number[] = [];

                    while (tokens[index].getType() !== Type.PAR_CLOSE) {
                        if (tokens[index].getType() === Type.NUMBER) {
                            prerrequisitos.push(parseInt(tokens[index].getLexeme()));
                        }
                        index++;
                    }

                    if (tokens[index].getType() === Type.PAR_CLOSE) index++; // ')'
                    if (tokens[index].getType() === Type.SEMICOLON) index++; // ';'
                    if (tokens[index].getType() === Type.BRACE_CLOSE) index++; // '}'

                    semestre.cursos.push({ codigo: codigoCurso, nombre: nombreCurso, area: areaCurso, prerrequisitos });
                }

                if (tokens[index].getType() === Type.BRACE_CLOSE) index++; // '}'

                carrera.semestres.push(semestre);
            }

            if (tokens[index].getType() === Type.BRACK_CLOSE) index++;
            carreras.push(carrera);
        } else {
            index++;
        }
    }

    return carreras;
}
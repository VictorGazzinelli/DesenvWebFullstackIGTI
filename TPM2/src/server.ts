import express from 'express'
import fs from 'fs'

import { Cidade, Estado, NumeroCidadeUF } from './interfaces/interfaces'

const app : express.Application = express();

parseCidadesPorEstado();

function readFile<T> (path: string): Array<T> {
    const dataBuffer : Buffer = fs.readFileSync(__dirname + path.replace('/','\\'))
    const stringData : string = dataBuffer.toString('utf8');
    return JSON.parse(stringData);
}

function writeFile<T> (fileName: string, content: Array<T>): void {
    const path = __dirname + '\\assets\\' + fileName;
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
    }
    fs.writeFileSync(path, JSON.stringify(content, null, "\t"))
}

function parseCidadesPorEstado() {
    const arrEstado : Array<Estado> = readFile<Estado>('/assets/Estados.json')
    const arrCidade : Array<Cidade> = readFile<Cidade>('/assets/Cidades.json');
    let fileName : string,
        content : Array<Cidade>,
        arrNumeroCidadeUF : Array<NumeroCidadeUF> = [],
        numeroCidadeUF : any = {};
    arrEstado.forEach( (estado: Estado) => {
        fileName = estado.Sigla + '.json'
        content = arrCidade.filter( (cidade : Cidade) => cidade.Estado === estado.ID);
        writeFile<Cidade>(fileName, content);
        numeroCidadeUF[estado.Sigla] = content.length
        arrNumeroCidadeUF.push(numeroCidadeUF)
        writeFile<NumeroCidadeUF>('NumeroCidadeUF.json', arrNumeroCidadeUF);
        arrNumeroCidadeUF = [];
    });
}

app.get('/', (req, res) => {

})

export default app;
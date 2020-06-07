import express from 'express'
import fs from 'fs'
import bodyParser  from 'body-parser'

import { Grade, CriarGradeInput} from './interfaces/interfaces'

const app : express.Application = express();

function readFile (path: string): any {
    const dataBuffer : Buffer = fs.readFileSync(__dirname + path.replace('/','\\'))
    const stringData : string = dataBuffer.toString('utf8');
    return JSON.parse(stringData);
}

function writeFile (fileName: string, content: any): void {
    const path = __dirname + '\\assets\\' + fileName;
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
    }
    fs.writeFileSync(path, JSON.stringify(content, null, "\t"))
}

function criarGrade( dto : CriarGradeInput) : number {
    let jsonGrades : any = readFile('/assets/grades.json')
    let idProxGrade : number = jsonGrades.nextId;
    let arrGrade : Grade[] = jsonGrades.grades;
    let novaGrade : Grade = {
        id: idProxGrade,
        ...dto,
        timestamp: new Date().toISOString()
    }
    arrGrade.push(novaGrade);
    idProxGrade++;
    let novoJson : any = {
        nextId: idProxGrade,
        grades: arrGrade
    };
    writeFile('grades.json', novoJson);
    return idProxGrade;
}

function notaTotal( subject: string, student: string){
    let jsonGrades : any = readFile('/assets/grades.json')
    let idProxGrade : number = jsonGrades.nextId;
    let arrGrade : Grade[] = jsonGrades.grades;
    let somaValue : number = 0;
    for(let i = 0; i < arrGrade.length ; i++){
        if(arrGrade[i].student === student && arrGrade[i].subject === subject){
            somaValue += arrGrade[i].value
        }
    }
    console.log("somaValue",somaValue)
}

function media( subject: string, type: string){
    let jsonGrades : any = readFile('/assets/grades.json')
    let idProxGrade : number = jsonGrades.nextId;
    let arrGrade : Grade[] = jsonGrades.grades;
    let media : number = -1;
    arrGrade = arrGrade.filter( (grade: Grade) => grade.subject === subject && grade.type === type )
    media = arrGrade.reduce( (a: Grade,b : Grade) => {return {...b, value: a.value + b.value} } ).value / arrGrade.length;
    console.log("media", media);
}

function top3(subject: string, type: string){
    let jsonGrades : any = readFile('/assets/grades.json')
    let idProxGrade : number = jsonGrades.nextId;
    let arrGrade : Grade[] = jsonGrades.grades;
    arrGrade = arrGrade.filter( (grade: Grade) => grade.subject === subject && grade.type === type )
    arrGrade = arrGrade.sort( (a: Grade,b : Grade) => {return a.value > b.value ? -1 : b.value > a.value ? 1 : 0} )
    arrGrade = arrGrade.slice(0,3);
    console.log("arrGrade", arrGrade);
}


//Rodrigo Branas
//04 - MongoDB
//Fórum
//notaTotal("02 - Node","Loiane Groner");
media("04 - MongoDB","Trabalho Prático");
//top3("03 - React","Trabalho Prático");
// let dto :CriarGradeInput = {
//     student: "Roberto Achar",
//     subject: "03 - React",
//     type: "Fórum",
//     value: 10,
// }
// criarGrade(dto);
// notaTotal("03 - React","Roberto Achar");


app.use(bodyParser.json());

app.post('/', (req, res) => {
    let body : CriarGradeInput = req.body;
    let id : number = criarGrade(body);
    res.send({id});
})

// app.get('/', (req, res) => {
//     const jsonGrades : any = readFile('/assets/grades.json')
//     const idProxGrade : number = jsonGrades.nextId;
//     const arrGrade : Grade[] = jsonGrades.grades;
//     writeFile("outro.json", {nextId: idProxGrade, grades: arrGrade})
// })

export default app;
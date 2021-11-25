const fs = require('fs')
const http = require('http')
const url = require('url')
    const replaceTemplate = (template, studentDetails) => {
        let output = template.replace(/{%NAME%}/g, studentDetails.name).replace(/{%AGE%}/g, studentDetails.age).replace(/{%GENDER%}/g, studentDetails.gender)
        // let output = template.replace(/{%AGE%}/g, studentDetails.age)
        // let output = template.replace(/{%GENDER%}/g, studentDetails.gender)
        return output
    }
    const studentPage = fs.readFileSync('/Users/99485/Desktop/New folder/node js/index.html','utf-8')
    const singleStudent = fs.readFileSync('/Users/99485/Desktop/New folder/node js/student.html','utf-8')
    const data = fs.readFileSync('/Users/99485/Desktop/New folder/node js/data.json','utf-8')
    const studentsData = JSON.parse(data)

const server = http.createServer((req,res) => {
    const reqPath = req.url
    if(reqPath === '/students'){
    const studentCard = studentsData.map(el => replaceTemplate(singleStudent,el)).join()
    console.log(studentCard)
    const output = studentPage.replace(/{%STUDENTS_DATA%}/g, studentCard)
    res.end(output)
    }
    else{
        res.end("<h1>Null<\h1>")
    }
})

server.listen(8080)

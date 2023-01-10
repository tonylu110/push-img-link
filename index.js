const fsPromises = require('fs/promises')
const { Schema } = require('mongoose')
const db = require('./util/db')

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const modelPc = db.model("pc", new Schema({
    img: {type: String}
}))
const modelMp = db.model("mp", new Schema({
    img: {type: String}
}))

const readFileAsync = async () => {
    try {
        rl.question('Please input devices: ', async function(answer){
            const contents = await fsPromises.readFile(`./txt/${answer}.txt`, 'utf-8')
            const arr = contents.split(/\r?\n/)
            if (answer === 'pc') {
                arr.forEach((item, index) => {
                    const insertObj = new modelPc({img: `http://${item}`})

                    insertObj.save()
                })
                return
            }
            arr.forEach((item, index) => {
                const insertObj = new modelMp({img: `http://${item}`})

                insertObj.save()
            })
        });
    } catch (err) {
        console.error(err)
    }
}

readFileAsync()
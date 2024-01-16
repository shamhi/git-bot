const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const FILE_PATH = "./data.json";


function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


const makeCommit = (n) => {
    if (n === 0) return simpleGit().push();
    const x = getRandomNumber(0, 56);
    const y = getRandomNumber(0, 6);
    const DATE = moment().subtract(1, "y")
        .add(1, "d").add(x, "w")
        .add(y, "d")
        .format();

    const data = {
        date: DATE
    };

    console.log(DATE)

    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit()
            .add([FILE_PATH])
            .commit(DATE, { "--date": DATE}, makeCommit.bind(this, --n))
            .push()
    });
};
makeCommit(1)

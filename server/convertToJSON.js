const fs=require("fs");
let path;
const jsonData=[];
function convert(path)
{
    const data=fs.readFileSync(path,'utf-8');
    const lines=data.split(",");
    // console.log(line);
    lines.forEach(line=>{
        // console.log(value);
        const jsonObj={};
        const cleanLine=line.replace(/\\|"/g, '');
        // console.log(cleanLine);
        const [key,value]=cleanLine.split('-')
        jsonObj["trainNumber"]=key.trim();
        jsonObj["trainName"]=value.trim();
        jsonData.push(jsonObj);
    })
    console.log(jsonData)
    // const data=file.replace()
}
convert("./trainList.json");
fs.writeFile("trainData.json",JSON.stringify(jsonData),
        err => {
            // Checking for errors 
            if (err) throw err;
            // Success 
            console.log("Done writing");
        }); 
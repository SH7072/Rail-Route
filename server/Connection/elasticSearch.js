const { Client, errors } = require("@elastic/elasticsearch");

const client= new Client({
    node:'http://192.168.0.107:9200'
})

module.exports={client};
